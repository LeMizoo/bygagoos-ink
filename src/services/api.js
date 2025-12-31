// frontend/src/services/api.js
import axios from 'axios';

// Configuration intelligente de l'URL API
const getApiConfig = () => {
  const isDev = import.meta.env.DEV;
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const isVercel = window.location.hostname.includes('vercel.app');
  
  // URL par défaut
  let baseURL = import.meta.env.VITE_API_URL || 'https://bygagoos-ink-backend.vercel.app/api';
  
  // Mode développement local
  if (isDev && isLocalhost) {
    baseURL = 'http://localhost:3001/api';
    
    // Vérifier si le backend local est disponible
    fetch('http://localhost:3001/health')
      .then(() => console.log('✅ Backend local détecté sur http://localhost:3001'))
      .catch(() => {
        console.warn('⚠️ Backend local non disponible. Utilisation du backend distant.');
        baseURL = 'https://bygagoos-ink-backend.vercel.app/api';
      });
  }
  
  // Mode Vercel - utiliser le même domaine
  if (isVercel && !isDev) {
    baseURL = '/api'; // Proxy via Vercel
  }
  
  return { baseURL, isDev, isLocalhost };
};

const config = getApiConfig();

// Créer une instance axios
const api = axios.create({
  baseURL: config.baseURL,
  timeout: 30000, // 30 secondes pour les uploads
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

// Cache pour éviter les requêtes répétitives
const requestCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    // Ajouter le token d'authentification
    const token = localStorage.getItem('bygagoos_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Headers métiers
    config.headers['X-Atelier'] = 'ByGagoos-Ink-Textile';
    config.headers['X-Location'] = 'Antananarivo-MG';
    config.headers['X-Family-Business'] = 'true';
    config.headers['X-App-Version'] = import.meta.env.VITE_APP_VERSION || '1.0.0';
    
    // Cache GET requests
    if (config.method === 'get') {
      const cacheKey = `${config.url}-${JSON.stringify(config.params)}`;
      const cached = requestCache.get(cacheKey);
      
      if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
        console.log(`[Cache] Utilisation du cache pour: ${config.url}`);
        return Promise.reject({
          config,
          response: { data: cached.data, status: 200, headers: {}, config },
          isCache: true,
        });
      }
    }
    
    // Ajouter un timestamp pour éviter le cache du navigateur
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }
    
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API] Erreur requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => {
    // Mettre en cache les réponses GET réussies
    if (response.config.method === 'get' && response.data) {
      const cacheKey = `${response.config.url}-${JSON.stringify(response.config.params)}`;
      requestCache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });
      
      // Nettoyer le vieux cache
      cleanupCache();
    }
    
    return response;
  },
  (error) => {
    // Gérer le cache
    if (error.isCache) {
      return Promise.resolve(error.response);
    }
    
    console.error('[API] Erreur:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    });
    
    // Gestion des erreurs spécifiques
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Non autorisé - Déconnexion
          localStorage.removeItem('bygagoos_token');
          localStorage.removeItem('bygagoos_user');
          
          // Ne rediriger que si on n'est pas déjà sur la page de login
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login?session=expired';
          }
          break;
          
        case 403:
          // Interdit
          console.warn('Accès refusé:', data.message);
          break;
          
        case 404:
          // Non trouvé
          console.warn('Ressource non trouvée:', error.config.url);
          break;
          
        case 429:
          // Trop de requêtes
          console.warn('Trop de requêtes, veuillez patienter');
          break;
          
        case 500:
          // Erreur serveur
          console.error('Erreur serveur:', data.message);
          break;
          
        default:
          console.warn(`Erreur ${status}:`, data.message);
      }
    } else if (error.request) {
      // Erreur réseau
      console.error('Erreur réseau - Vérifiez votre connexion internet');
      
      if (config.isDev && config.isLocalhost) {
        console.warn('⚠️ Assurez-vous que le backend est démarré sur localhost:3001');
        console.warn('   Lancer le backend: npm run dev dans le dossier backend/');
      }
    }
    
    // Retourner une structure d'erreur uniforme
    return Promise.reject({
      status: error.response?.status,
      message: error.response?.data?.message || error.message || 'Une erreur est survenue',
      data: error.response?.data,
      isNetworkError: !error.response,
    });
  }
);

// Nettoyer le cache
function cleanupCache() {
  const now = Date.now();
  for (const [key, value] of requestCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      requestCache.delete(key);
    }
  }
}

// Nettoyer le cache toutes les 10 minutes
setInterval(cleanupCache, 10 * 60 * 1000);

// Données de démo pour le développement
const DEMO_DATA = {
  orders: [
    {
      id: 1,
      orderNumber: 'CMD-2024-001',
      client: {
        id: 1,
        name: 'Marie RAKOTO',
        company: 'TechMad SARL',
        email: 'marie@techmad.mg',
        phone: '+261 34 12 345 67',
      },
      totalAmount: 1200000,
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      deliveryDate: '2024-01-25',
      createdAt: '2024-01-15T08:30:00',
      orderItems: [
        {
          id: 1,
          quantity: 100,
          product: {
            id: 1,
            name: 'T-Shirts Blancs Premium',
            price: 8000,
            category: 'T-SHIRTS',
          },
          design: 'Logo TechMad',
          colors: ['Blanc', 'Bleu'],
        },
      ],
      notes: 'Impression recto-verso',
    },
    {
      id: 2,
      orderNumber: 'CMD-2024-002',
      client: {
        id: 2,
        name: 'Jean RAZAFY',
        company: 'Fashion MG',
        email: 'jean@fashionmg.mg',
        phone: '+261 33 98 765 43',
      },
      totalAmount: 750000,
      status: 'PENDING',
      priority: 'MEDIUM',
      deliveryDate: '2024-01-30',
      createdAt: '2024-01-14T14:20:00',
      orderItems: [
        {
          id: 2,
          quantity: 50,
          product: {
            id: 2,
            name: 'Sweatshirts Noir',
            price: 15000,
            category: 'SWEATSHIRTS',
          },
          design: 'Logo FashionMG',
          colors: ['Noir'],
        },
      ],
      notes: 'Livraison express',
    },
  ],
  stats: {
    totalOrders: 48,
    totalRevenue: 24850000,
    pending: 8,
    inProgress: 15,
    completed: 25,
    activeClients: 42,
    monthlyRevenue: [
      { month: 'Jan', revenue: 4500000 },
      { month: 'Fév', revenue: 5200000 },
      { month: 'Mar', revenue: 6100000 },
      { month: 'Avr', revenue: 4900000 },
      { month: 'Mai', revenue: 6800000 },
      { month: 'Juin', revenue: 7300000 },
    ],
  },
  clients: [
    {
      id: 1,
      name: 'Marie RAKOTO',
      company: 'TechMad SARL',
      email: 'marie@techmad.mg',
      phone: '+261 34 12 345 67',
      address: 'Lot II A 165 Anosimasina, Antananarivo',
      totalOrders: 12,
      totalSpent: 8500000,
      lastOrder: '2024-01-15',
      status: 'ACTIVE',
    },
    {
      id: 2,
      name: 'Jean RAZAFY',
      company: 'Fashion MG',
      email: 'jean@fashionmg.mg',
      phone: '+261 33 98 765 43',
      address: 'IVG 67 A Ambohibao, Antananarivo',
      totalOrders: 8,
      totalSpent: 4200000,
      lastOrder: '2024-01-14',
      status: 'ACTIVE',
    },
  ],
};

// Services API avec fallback et cache
export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem('bygagoos_token', token);
        localStorage.setItem('bygagoos_user', JSON.stringify(user));
        
        // Ajouter le token à toutes les futures requêtes
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      return response.data;
    } catch (error) {
      if (config.isDev) {
        console.warn('Utilisation des données de démo pour la connexion');
        
        // Données de démo pour le développement
        const demoUser = {
          id: 1,
          name: 'Tovoniaina RAHENDRISON',
          email: 'tovoniaina.rahendrison@gmail.com',
          role: 'ADMIN',
          avatar: '/profiles/tovoniaina.jpg',
        };
        
        const demoToken = 'demo_token_' + Date.now();
        
        localStorage.setItem('bygagoos_token', demoToken);
        localStorage.setItem('bygagoos_user', JSON.stringify(demoUser));
        
        return {
          success: true,
          token: demoToken,
          user: demoUser,
          message: 'Connexion réussie (mode démo)',
        };
      }
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('bygagoos_token');
    localStorage.removeItem('bygagoos_user');
    delete api.defaults.headers.common['Authorization'];
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('bygagoos_user');
    return user ? JSON.parse(user) : null;
  },
  
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      if (response.data.user) {
        localStorage.setItem('bygagoos_user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      if (config.isDev) {
        console.warn('Utilisation des données de démo pour la mise à jour du profil');
        return { success: true, user: userData };
      }
      throw error;
    }
  },
};

export const ordersService = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/orders', { params });
      return response.data;
    } catch (error) {
      if (config.isDev) {
        console.warn('Utilisation des données de démo pour les commandes');
        return {
          success: true,
          data: DEMO_DATA.orders,
          pagination: {
            total: DEMO_DATA.orders.length,
            page: params.page || 1,
            pages: 1,
            limit: params.limit || 10,
          },
        };
      }
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      if (config.isDev) {
        console.warn('Utilisation des données de démo pour la commande');
        const order = DEMO_DATA.orders.find(o => o.id === parseInt(id)) || DEMO_DATA.orders[0];
        return { success: true, data: order };
      }
      throw error;
    }
  },
  
  create: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      // Invalider le cache des commandes
      requestCache.clear();
      return response.data;
    } catch (error) {
      if (config.isDev) {
        console.warn('Création de commande en mode démo');
        const newOrder = {
          ...orderData,
          id: Date.now(),
          orderNumber: `CMD-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
          createdAt: new Date().toISOString(),
          status: 'PENDING',
        };
        return { success: true, data: newOrder };
      }
      throw error;
    }
  },
  
  update: async (id, orderData) => {
    try {
      const response = await api.put(`/orders/${id}`, orderData);
      requestCache.clear();
      return response.data;
    } catch (error) {
      if (config.isDev) {
        console.warn('Mise à jour de commande en mode démo');
        return { success: true, data: { ...orderData, id } };
      }
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      const response = await api.delete(`/orders/${id}`);
      requestCache.clear();
      return response.data;
    } catch (error) {
      if (config.isDev) {
        console.warn('Suppression de commande en mode démo');
        return { success: true, message: 'Commande supprimée' };
      }
      throw error;
    }
  },
  
  getStats: async () => {
    try {
      const response = await api.get('/orders/stats');
      return response.data;
    } catch (error) {
      if (config.isDev) {
        console.warn('Utilisation des stats de démo');
        return { success: true, data: DEMO_DATA.stats };
      }
      throw error;
    }
  },
  
  updateStatus: async (id, status) => {
    try {
      const response = await api.patch(`/orders/${id}/status`, { status });
      requestCache.clear();
      return response.data;
    } catch (error) {
      if (config.isDev) {
        console.warn('Mise à jour de statut en mode démo');
        return { success: true, data: { id, status } };
      }
      throw error;
    }
  },
};

export const clientsService = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/clients', { params });
      return response.data;
    } catch (error) {
      if (config.isDev) {
        console.warn('Utilisation des données de démo pour les clients');
        return {
          success: true,
          data: DEMO_DATA.clients,
          pagination: {
            total: DEMO_DATA.clients.length,
            page: 1,
            pages: 1,
          },
        };
      }
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/clients/${id}`);
      return response.data;
    } catch (error) {
      if (config.isDev) {
        console.warn('Utilisation des données de démo pour le client');
        const client = DEMO_DATA.clients.find(c => c.id === parseInt(id)) || DEMO_DATA.clients[0];
        return { success: true, data: client };
      }
      throw error;
    }
  },
  
  create: async (clientData) => {
    try {
      const response = await api.post('/clients', clientData);
      requestCache.clear();
      return response.data;
    } catch (error) {
      if (config.isDev) {
        console.warn('Création de client en mode démo');
        const newClient = {
          ...clientData,
          id: Date.now(),
          totalOrders: 0,
          totalSpent: 0,
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
        };
        return { success: true, data: newClient };
      }
      throw error;
    }
  },
  
  update: async (id, clientData) => {
    try {
      const response = await api.put(`/clients/${id}`, clientData);
      requestCache.clear();
      return response.data;
    } catch (error) {
      if (config.isDev) {
        console.warn('Mise à jour de client en mode démo');
        return { success: true, data: { ...clientData, id } };
      }
      throw error;
    }
  },
};

export const dashboardService = {
  getStats: async () => {
    try {
      const response = await api.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      if (config.isDev) {
        console.warn('Utilisation des stats dashboard de démo');
        return { success: true, data: DEMO_DATA.stats };
      }
      throw error;
    }
  },
  
  getRecentActivity: async () => {
    try {
      const response = await api.get('/dashboard/activity');
      return response.data;
    } catch (error) {
      if (config.isDev) {
        console.warn('Utilisation des activités de démo');
        return {
          success: true,
          data: [
            { type: 'ORDER_CREATED', description: 'Nouvelle commande #CMD-2024-003', date: '2024-01-16T10:30:00' },
            { type: 'ORDER_UPDATED', description: 'Statut mis à jour pour #CMD-2024-001', date: '2024-01-15T16:45:00' },
            { type: 'CLIENT_ADDED', description: 'Nouveau client ajouté', date: '2024-01-15T14:20:00' },
          ],
        };
      }
      throw error;
    }
  },
};

export const stockService = {
  getConsumables: async () => {
    try {
      const response = await api.get('/stock/consumables');
      return response.data;
    } catch (error) {
      if (config.isDev) {
        console.warn('Utilisation des consommables de démo');
        return {
          success: true,
          data: [
            { id: 1, name: 'Encre Noir', category: 'ENCRE', quantity: 15, unit: 'L', minQuantity: 5 },
            { id: 2, name: 'Encre Blanc', category: 'ENCRE', quantity: 8, unit: 'L', minQuantity: 5 },
            { id: 3, name: 'Tissu Coton 150g', category: 'TISSU', quantity: 120, unit: 'm', minQuantity: 50 },
            { id: 4, name: 'Écrans Sérigraphie', category: 'MATERIEL', quantity: 25, unit: 'unité', minQuantity: 10 },
          ],
        };
      }
      throw error;
    }
  },
};

// Utilitaires
export const clearCache = () => {
  requestCache.clear();
  console.log('[API] Cache nettoyé');
};

// Export par défaut
export default api;