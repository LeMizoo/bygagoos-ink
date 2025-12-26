import axios from 'axios';

// Configuration de l'API pour ByGagoos Ink
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Créer une instance axios avec export par défaut
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    // Ajouter le token d'authentification familial
    const token = localStorage.getItem('family_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Headers spécifiques à l'atelier
    config.headers['X-Atelier'] = 'ByGagoos-Ink-Textile';
    config.headers['X-Location'] = 'Antananarivo-MG';
    config.headers['X-Family-Business'] = 'true';
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Non autorisé - Déconnexion
      localStorage.removeItem('family_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Fonctions utilitaires simples
export const formatCurrency = (amount, currency = 'MGA') => {
  return new Intl.NumberFormat('fr-MG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getProductionStatus = (status) => {
  const statuses = {
    'pending': { label: 'En Attente', color: '#8b5cf6', icon: '⏳' },
    'design': { label: 'Design', color: '#3b82f6', icon: '🎨' },
    'screen_prep': { label: 'Préparation Écran', color: '#f59e0b', icon: '🖼️' },
    'printing': { label: 'Impression', color: '#10b981', icon: '🖨️' },
    'drying': { label: 'Séchage', color: '#06d6a0', icon: '🌞' },
    'packaging': { label: 'Emballage', color: '#8b5cf6', icon: '📦' },
    'completed': { label: 'Terminé', color: '#10b981', icon: '✅' },
    'delivered': { label: 'Livré', color: '#3b82f6', icon: '🚚' },
  };
  
  return statuses[status] || { label: status, color: '#6b7280', icon: '📋' };
};

// Export par défaut de l'instance API
export default api;

// Exports nommés pour les endpoints (simulés pour le moment)
export const authAPI = {
  login: async (credentials) => {
    // Simulation de login
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.username === 'famille' && credentials.password === 'gagoos2024') {
          resolve({
            data: {
              user: {
                id: 1,
                name: 'Famille Gagoos',
                role: 'admin',
                email: 'famille@bygagoos.mg'
              },
              token: 'demo-token-12345'
            }
          });
        } else {
          resolve({ error: 'Identifiants incorrects' });
        }
      }, 500);
    });
  }
};

export const ordersAPI = {
  getAll: () => api.get('/orders'),
  create: (orderData) => api.post('/orders', orderData),
};

export const clientsAPI = {
  getAll: () => api.get('/clients'),
};

export const productionAPI = {
  getQueue: () => api.get('/production/queue'),
};