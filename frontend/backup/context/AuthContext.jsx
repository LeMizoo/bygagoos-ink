// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Créer une instance axios configurée
const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('bygagoos_token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Intercepteur pour ajouter le token automatiquement
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('bygagoos_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  // Vérifier le token au démarrage
  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async () => {
    try {
      // Ici tu peux appeler un endpoint de vérification si tu l'as
      // Pour l'instant, on va simplement vérifier que le backend répond
      const response = await api.get('/api/health');
      
      if (response.status === 200) {
        // Récupérer l'utilisateur depuis le localStorage
        const storedUser = localStorage.getItem('bygagoos_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    } catch (error) {
      console.error('Erreur vérification token:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    
    try {
      console.log('🔐 Tentative de connexion avec:', email);
      
      // Ton backend utilise /api/auth/login avec {email, password}
      const response = await api.post('/api/auth/login', {
        email,
        password
      });

      console.log('📨 Réponse du serveur:', response.data);

      if (response.data.token && response.data.user) {
        // Stocker les informations
        localStorage.setItem('bygagoos_token', response.data.token);
        localStorage.setItem('bygagoos_user', JSON.stringify(response.data.user));
        
        // Mettre à jour l'état
        setToken(response.data.token);
        setUser(response.data.user);
        
        // Configurer axios pour les prochaines requêtes
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        toast.success(`Bienvenue ${response.data.user.name} !`);
        return { success: true, user: response.data.user };
      } else {
        const message = response.data.message || 'Identifiants incorrects';
        setError(message);
        toast.error(message);
        return { success: false, message };
      }
    } catch (error) {
      console.error('❌ Erreur de connexion:', error);
      const message = error.response?.data?.message || 'Erreur de connexion au serveur';
      setError(message);
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('bygagoos_token');
    localStorage.removeItem('bygagoos_user');
    delete api.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
    setError(null);
    toast.success('Déconnexion réussie');
  };

  // Fonctions pour interagir avec le backend
  const getDashboardData = async () => {
    try {
      const response = await api.get('/api/dashboard');
      return response.data;
    } catch (error) {
      console.error('Erreur récupération dashboard:', error);
      toast.error('Erreur lors de la récupération des données');
      return null;
    }
  };

  const getFamilyMembers = async () => {
    try {
      const response = await api.get('/api/family/members');
      return response.data;
    } catch (error) {
      console.error('Erreur récupération famille:', error);
      return null;
    }
  };

  const checkPermission = (permission) => {
    return user?.role === 'SUPER_ADMIN' || user?.permissions?.includes(permission) || false;
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    getDashboardData,
    getFamilyMembers,
    checkPermission,
    isAuthenticated: !!user,
    api // Exposer l'instance axios configurée
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};