// frontend/src/services/api.js
import axios from 'axios';

// Configuration intelligente de l'URL API
const getApiConfig = () => {
  const isDev = import.meta.env.DEV;
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const isVercel = window.location.hostname.includes('vercel.app');
  
  // URL par défaut pour le mode démo
  let baseURL = 'http://localhost:3001/api';
  
  // Mode production - utiliser le backend démo
  if (!isDev && !isLocalhost) {
    baseURL = 'https://bygagoos-ink-backend.vercel.app/api';
  }
  
  console.log(`[API] Configuration: ${baseURL}`);
  console.log(`[API] Environnement: ${isDev ? 'dev' : 'prod'}, Localhost: ${isLocalhost}`);
  
  return { baseURL, isDev, isLocalhost };
};

const config = getApiConfig();

// Créer une instance axios
const api = axios.create({
  baseURL: config.baseURL,
  timeout: 15000, // 15 secondes
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

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
    config.headers['X-App-Version'] = '1.0.0';
    
    // Ajouter un timestamp pour éviter le cache du navigateur
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }
    
    console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
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
    return response;
  },
  (error) => {
    console.error('[API] Erreur:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
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
          
        case 404:
          console.warn('Ressource non trouvée:', error.config.url);
          break;
          
        case 500:
          console.error('Erreur serveur:', data.message);
          break;
          
        default:
          console.warn(`Erreur ${status}:`, data.message);
      }
    } else if (error.request) {
      // Erreur réseau
      console.error('Erreur réseau - Vérifiez votre connexion internet');
      console.warn('Le backend semble être hors ligne');
      
      if (config.isDev && config.isLocalhost) {
        console.warn('⚠️ Assurez-vous que le backend est démarré sur localhost:3001');
        console.warn('   Lancer le backend: cd backend && npm run dev');
      }
    }
    
    return Promise.reject(error);
  }
);

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
      items: [
        {
          product: 'T-shirt 100% Coton Premium',
          quantity: 100,
          unitPrice: 8000,
          colors: ['Blanc', 'Bleu'],
          design: 'Logo TechMad',
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
      items: [
        {
          product: 'Sweatshirts Noir',
          quantity: 50,
          unitPrice: 15000,
          colors: ['Noir'],
          design: 'Logo FashionMG',
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

// Services API avec fallback en mode démo
export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem('bygagoos_token', token);
        localStorage.setItem('bygagoos_user', JSON.stringify(user));
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      return response.data;
    } catch (error) {
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
  },
  
  register: async (clientData) => {
    try {
      const response = await api.post('/auth/register', clientData);
      return response.data;
    } catch (error) {
      console.warn('Inscription client en mode démo');
      
      const newClient = {
        id: Date.now(),
        ...clientData,
        role: 'CLIENT',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        totalOrders: 0,
        totalSpent: 0,
      };
      
      const demoToken = 'demo_client_token_' + Date.now();
      localStorage.setItem('bygagoos_token', demoToken);
      localStorage.setItem('bygagoos_user', JSON.stringify(newClient));
      
      return {
        success: true,
        token: demoToken,
        user: newClient,
        message: 'Inscription réussie (mode démo)',
      };
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
      console.warn('Mise à jour du profil en mode démo');
      return { success: true, user: userData };
    }
  },
};

export const ordersService = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/orders', { params });
      return response.data;
    } catch (error) {
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
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Utilisation des données de démo pour la commande');
      const order = DEMO_DATA.orders.find(o => o.id === parseInt(id)) || DEMO_DATA.orders[0];
      return { success: true, data: order };
    }
  },
  
  create: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
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
  },
  
  update: async (id, orderData) => {
    try {
      const response = await api.put(`/orders/${id}`, orderData);
      return response.data;
    } catch (error) {
      console.warn('Mise à jour de commande en mode démo');
      return { success: true, data: { ...orderData, id } };
    }
  },
  
  delete: async (id) => {
    try {
      const response = await api.delete(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Suppression de commande en mode démo');
      return { success: true, message: 'Commande supprimée' };
    }
  },
  
  getStats: async () => {
    try {
      const response = await api.get('/orders/stats');
      return response.data;
    } catch (error) {
      console.warn('Utilisation des stats de démo');
      return { success: true, data: DEMO_DATA.stats };
    }
  },
};

export const clientsService = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/clients', { params });
      return response.data;
    } catch (error) {
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
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/clients/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Utilisation des données de démo pour le client');
      const client = DEMO_DATA.clients.find(c => c.id === parseInt(id)) || DEMO_DATA.clients[0];
      return { success: true, data: client };
    }
  },
  
  create: async (clientData) => {
    try {
      const response = await api.post('/clients', clientData);
      return response.data;
    } catch (error) {
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
  },
  
  update: async (id, clientData) => {
    try {
      const response = await api.put(`/clients/${id}`, clientData);
      return response.data;
    } catch (error) {
      console.warn('Mise à jour de client en mode démo');
      return { success: true, data: { ...clientData, id } };
    }
  },
};

export const dashboardService = {
  getStats: async () => {
    try {
      const response = await api.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.warn('Utilisation des stats dashboard de démo');
      return { success: true, data: DEMO_DATA.stats };
    }
  },
};

export const productsService = {
  getAll: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.warn('Utilisation des produits de démo');
      return {
        success: true,
        data: [
          {
            id: 1,
            name: 'T-shirt 100% Coton Premium',
            category: 'T-SHIRTS',
            price: 12500,
            stock: 1500,
          },
          {
            id: 2,
            name: 'Sweat à capuche',
            category: 'SWEATSHIRTS',
            price: 25000,
            stock: 800,
          },
        ],
      };
    }
  },
};

export const stockService = {
  getConsumables: async () => {
    try {
      const response = await api.get('/stock');
      return response.data;
    } catch (error) {
      console.warn('Utilisation des consommables de démo');
      return {
        success: true,
        data: [
          { id: 1, name: 'Encre Noir', category: 'ENCRE', quantity: 15, unit: 'L', minQuantity: 5 },
          { id: 2, name: 'Encre Blanc', category: 'ENCRE', quantity: 8, unit: 'L', minQuantity: 5 },
        ],
      };
    }
  },
};

export const publicService = {
  getGallery: async (category = 'all') => {
    try {
      const response = await api.get('/public/gallery', { params: { category } });
      return response.data;
    } catch (error) {
      console.warn('Utilisation de la galerie de démo');
      return {
        success: true,
        data: {
          images: [
            {
              id: 1,
              url: '/profiles/miantsatiana.jpg',
              title: 'Miantso',
              category: 'team',
              description: 'Directeur & Designer principal',
            },
            {
              id: 2,
              url: '/profiles/tia-faniry.jpg',
              title: 'Faniry',
              category: 'team',
              description: 'Responsable Production',
            },
          ],
          categories: [
            { id: 'all', name: 'Toutes les images', count: 2 },
            { id: 'team', name: 'L\'Équipe', count: 2 },
          ],
        },
      };
    }
  },
  
  getCompanyInfo: async () => {
    try {
      const response = await api.get('/public/company-info');
      return response.data;
    } catch (error) {
      console.warn('Utilisation des infos société de démo');
      return {
        success: true,
        data: {
          name: 'ByGagoos Ink',
          tagline: 'Sérigraphie Textile d\'Excellence',
          description: 'Entreprise familiale malgache',
        },
      };
    }
  },
};

// Vérification de la santé du backend
export const checkBackendHealth = async () => {
  try {
    const response = await api.get('/health');
    return {
      healthy: true,
      data: response.data,
    };
  } catch (error) {
    console.warn('Backend non disponible - mode démo activé');
    return {
      healthy: false,
      message: 'Backend non disponible, utilisation du mode démo',
    };
  }
};

// Export par défaut
export default api;