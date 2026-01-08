// src/services/api.js
import axios from 'axios';

// Déterminer l'URL de base selon l'environnement
const getBaseURL = () => {
  // Mode production sur Vercel
  if (import.meta.env.PROD) {
    return 'https://bygagoos-api.vercel.app/api';
  }
  
  // Mode développement avec variable d'environnement
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Fallback local
  return 'http://localhost:3001/api';
};

// Configuration de base d'Axios
const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000, // 15 secondes timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log de configuration (seulement en développement)
if (import.meta.env.DEV) {
  console.log('[API] Configuration:', api.defaults.baseURL);
  console.log('[API] Environnement:', import.meta.env.MODE);
  console.log('[API] Localhost:', window.location.hostname === 'localhost');
}

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    // Ajouter le token d'authentification si disponible
    const token = localStorage.getItem('bygagoos_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log en développement
    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
    }
    
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
    // Log en développement
    if (import.meta.env.DEV) {
      console.log(`[API] ${response.status} ${response.config.url}`, response.data);
    }
    return response;
  },
  (error) => {
    // Log d'erreur
    console.error('[API] Erreur réponse:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    
    // Gérer les erreurs 401 (non autorisé)
    if (error.response && error.response.status === 401) {
      console.log('[API] Session expirée, déconnexion...');
      localStorage.removeItem('bygagoos_token');
      localStorage.removeItem('bygagoos_user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;
