// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { IMAGES_CONFIG } from '../config/images';

// Créer le contexte
const AuthContext = createContext();

// Hook personnalisé
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('bygagoos_token'));

  // Configuration d'axios
  const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Intercepteur pour ajouter le token
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

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const storedUser = localStorage.getItem('bygagoos_user');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      const response = await api.post('/api/auth/login', {
        email,
        password
      });

      if (response.data.token && response.data.user) {
        // Stocker les informations
        localStorage.setItem('bygagoos_token', response.data.token);
        localStorage.setItem('bygagoos_user', JSON.stringify(response.data.user));
        
        // Mettre à jour l'état
        setToken(response.data.token);
        setUser(response.data.user);
        
        toast.success(`Bienvenue ${response.data.user.name} !`);
        return { success: true, user: response.data.user };
      } else {
        const message = response.data.message || 'Identifiants incorrects';
        toast.error(message);
        return { success: false, message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur de connexion au serveur';
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
    toast.success('Déconnexion réussie');
  };

  // Méthodes pour récupérer des données
  const getFamilyMembers = async () => {
    try {
      const response = await api.get('/api/family/members');
      return response.data || [];
    } catch (error) {
      console.error('Erreur récupération famille:', error);
      return [];
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    getFamilyMembers,
    isAuthenticated: !!user,
    api
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};