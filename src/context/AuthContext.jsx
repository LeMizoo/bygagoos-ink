// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('bygagoos_token');
      const userData = localStorage.getItem('bygagoos_user');

      console.log('🔍 Auth check:', { token, userData });

      if (token && userData) {
        // Utiliser directement les données locales (mode démo)
        console.log('✅ Utilisation des données locales');
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
        
        // Configurer Axios avec le token
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        console.log('🔐 Pas de token trouvé');
      }
    } catch (error) {
      console.error('❌ Auth check error:', error);
      logout();
    } finally {
      setLoading(false);
      console.log('✅ Auth check terminé, loading:', false);
    }
  };

  const login = async (token, userData) => {
    console.log('🔑 Login:', { token, userData });
    try {
      // Stocker le token et les données utilisateur
      localStorage.setItem('bygagoos_token', token);
      localStorage.setItem('bygagoos_user', JSON.stringify(userData));
      
      // Configurer Axios pour les requêtes futures
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Mettre à jour l'état
      setUser(userData);
      setIsAuthenticated(true);
      
      console.log('✅ Login réussi');
      return true;
    } catch (error) {
      console.error('❌ Login error:', error);
      return false;
    }
  };

  const logout = () => {
    console.log('🚪 Logout');
    // Supprimer les données d'authentification
    localStorage.removeItem('bygagoos_token');
    localStorage.removeItem('bygagoos_user');
    
    // Supprimer l'en-tête Authorization
    delete api.defaults.headers.common['Authorization'];
    
    // Réinitialiser l'état
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem('bygagoos_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};