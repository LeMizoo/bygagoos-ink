// frontend/src/services/api.js - VERSION DOCKER CORRIGÉE
import axios from 'axios';

// Configuration - Docker backend sur port 3001
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
console.log('🐳 API URL Docker configurée:', API_URL);

// Créer l'instance axios avec configuration optimisée
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: false,
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token') || localStorage.getItem('bygagoos_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log de débogage
    console.log(`📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    
    return config;
  },
  (error) => {
    console.error('❌ Erreur requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    
    console.error('❌ Erreur réponse:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message
    });
    
    // Gestion des erreurs 401 (token expiré/invalide)
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      
      console.log('🔐 Token expiré ou invalide - Déconnexion');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('bygagoos_token');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('bygagoos_user');
      
      // Rediriger vers login si pas déjà sur /login
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    // Gestion des erreurs réseau
    if (!error.response) {
      console.error('🌐 Erreur réseau - Backend inaccessible');
    }
    
    return Promise.reject(error);
  }
);

// Test de connexion Docker
export const testDockerConnection = async () => {
  try {
    console.log('🐳 Test de connexion Docker backend...');
    const response = await api.get('/api/health');
    
    console.log('✅ Docker backend connecté:', response.data);
    return {
      connected: true,
      docker: true,
      data: response.data,
      status: response.status,
      message: 'Docker backend connecté'
    };
    
  } catch (error) {
    console.error('❌ Docker backend non disponible:', error.message);
    
    // Essayer avec un timeout plus court
    try {
      console.log('🔄 Essai avec timeout court...');
      const quickTest = await axios.get(`${API_URL}/api/health`, { timeout: 3000 });
      if (quickTest.data) {
        return {
          connected: true,
          docker: true,
          data: quickTest.data,
          status: quickTest.status,
          message: 'Docker backend connecté (timeout court)'
        };
      }
    } catch (quickError) {
      console.error('❌ Échec même avec timeout court:', quickError.message);
    }
    
    return {
      connected: false,
      docker: true,
      error: error.message,
      message: 'Backend Docker non disponible'
    };
  }
};

export const testConnection = testDockerConnection;

// Fonction de login
export const loginUser = async (email, password) => {
  try {
    console.log('🔐 Tentative de connexion Docker pour:', email);
    
    const response = await api.post('/api/auth/login', { 
      email, 
      password 
    });
    
    console.log('✅ Réponse login Docker:', response.data);
    
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('auth_user', JSON.stringify(response.data.user));
      
      return {
        success: true,
        token: response.data.token,
        user: response.data.user,
        message: 'Connexion réussie (Docker)'
      };
    }
    
    throw new Error('Token non reçu');
    
  } catch (error) {
    console.error('❌ Erreur login Docker:', error.response?.data || error.message);
    
    // Fallback local uniquement si Docker échoue
    if (error.response?.status === 0 || !error.response) {
      console.log('🔄 Fallback vers mode local...');
      
      const localUsers = [
        {
          email: 'tovoniaina.rahendrison@gmail.com',
          password: 'ByGagoos2025!',
          name: 'Tovoniaina RAHENDRISON',
          role: 'SUPER_ADMIN',
          color: '#2E7D32',
          description: 'Responsable Structure & Organisation'
        },
        {
          email: 'dedettenadia@gmail.com',
          password: 'ByGagoos2025!',
          name: 'Volatiana RANDRIANARISOA',
          role: 'FAMILY_MEMBER',
          color: '#9C27B0',
          description: 'Responsable Inspiration & Design'
        },
        {
          email: 'miantsatianarahendrison@gmail.com',
          password: 'ByGagoos2025!',
          name: 'Miantsatiana RAHENDRISON',
          role: 'FAMILY_MEMBER',
          color: '#FF9800',
          description: 'Responsable Création & Production'
        },
        {
          email: 'fanirytia17@gmail.com',
          password: 'ByGagoos2025!',
          name: 'Tia Faniry RAHENDRISON',
          role: 'FAMILY_MEMBER',
          color: '#2196F3',
          description: 'Responsable Communication & Marketing'
        }
      ];
      
      const user = localUsers.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password
      );
      
      if (user) {
        const token = 'local-token-' + Date.now();
        const userData = {
          id: 'local-' + user.email,
          name: user.name,
          email: user.email,
          role: user.role,
          color: user.color,
          description: user.description,
          token: token,
          image: null
        };
        
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_user', JSON.stringify(userData));
        
        return {
          success: true,
          token: token,
          user: userData,
          message: 'Connexion réussie (mode local - Docker échoué)'
        };
      }
    }
    
    throw new Error(error.response?.data?.message || 'Email ou mot de passe incorrect');
  }
};

// Fonction pour récupérer les membres de la famille
export const getFamilyMembers = async () => {
  try {
    const response = await api.get('/api/family/members');
    return response.data.members || response.data;
  } catch (error) {
    console.warn('❌ Docker API non disponible, données locales:', error.message);
    
    // Fallback local
    return [
      {
        id: '1',
        name: 'Tovoniaina RAHENDRISON',
        email: 'tovoniaina.rahendrison@gmail.com',
        role: 'SUPER_ADMIN',
        color: '#2E7D32',
        description: 'Responsable Structure & Organisation',
        image: null
      },
      {
        id: '2',
        name: 'Volatiana RANDRIANARISOA',
        email: 'dedettenadia@gmail.com',
        role: 'FAMILY_MEMBER',
        color: '#9C27B0',
        description: 'Responsable Inspiration & Design',
        image: null
      },
      {
        id: '3',
        name: 'Miantsatiana RAHENDRISON',
        email: 'miantsatianarahendrison@gmail.com',
        role: 'FAMILY_MEMBER',
        color: '#FF9800',
        description: 'Responsable Création & Production',
        image: null
      },
      {
        id: '4',
        name: 'Tia Faniry RAHENDRISON',
        email: 'fanirytia17@gmail.com',
        role: 'FAMILY_MEMBER',
        color: '#2196F3',
        description: 'Responsable Communication & Marketing',
        image: null
      }
    ];
  }
};

// Fonction pour récupérer les statistiques dashboard
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/api/dashboard/stats');
    return response.data.stats || response.data;
  } catch (error) {
    console.warn('❌ Statistiques Docker non disponibles:', error.message);
    return {
      totalMembers: 4,
      totalClients: 12,
      totalOrders: 24,
      activeProjects: 3,
      upcomingEvents: 2,
      totalDocuments: 15,
      completionRate: 75,
      revenue: 1250000
    };
  }
};

// Fonction pour récupérer les commandes récentes
export const getRecentOrders = async (limit = 5) => {
  try {
    const response = await api.get('/api/orders', { params: { limit } });
    return response.data.orders || response.data;
  } catch (error) {
    console.warn('❌ Commandes Docker non disponibles:', error.message);
    return [
      { 
        id: 'CMD-001', 
        clientName: 'Client Test 1', 
        orderDate: new Date(), 
        totalQty: 10, 
        unitPrice: 5000, 
        totalPrice: 50000, 
        status: 'En cours' 
      },
      { 
        id: 'CMD-002', 
        clientName: 'Client Test 2', 
        orderDate: new Date(Date.now() - 86400000), 
        totalQty: 5, 
        unitPrice: 8000, 
        totalPrice: 40000, 
        status: 'Terminé' 
      },
    ];
  }
};

// Fonction pour récupérer le profil utilisateur
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/api/auth/me');
    return response.data.user || response.data;
  } catch (error) {
    console.warn('❌ Profil Docker non disponible:', error.message);
    
    // Récupérer depuis localStorage
    const storedUser = localStorage.getItem('auth_user') || localStorage.getItem('bygagoos_user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error('Erreur parsing user:', e);
      }
    }
    
    return null;
  }
};

// Fonction de déconnexion
export const logoutUser = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('bygagoos_token');
  localStorage.removeItem('auth_user');
  localStorage.removeItem('bygagoos_user');
};

// Export par défaut
export default api;