import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api'; // Import par défaut

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('family_token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          // Pour le moment, validation simple
          if (token.length > 10) {
            setUser(JSON.parse(userData));
            setIsAuthenticated(true);
            // Set default headers pour toutes les requêtes API
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          } else {
            logout();
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulation de login
      if (username === 'famille' && password === 'gagoos2024') {
        const userData = {
          id: 1,
          username: 'famille',
          name: 'Famille Gagoos',
          email: 'famille@bygagoos.mg',
          role: 'admin',
          avatar: '👨‍👩‍👧‍👦',
          permissions: ['read', 'write', 'delete', 'admin']
        };
        
        const token = 'demo-family-token-' + Date.now();
        
        // Stocker dans localStorage
        localStorage.setItem('family_token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Mettre à jour le contexte
        setUser(userData);
        setIsAuthenticated(true);
        
        // Set default headers pour toutes les requêtes API
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return true;
      } else {
        setError('Identifiants incorrects. Essayez: famille / gagoos2024');
        return false;
      }
    } catch (err) {
      setError('Échec de connexion. Veuillez réessayer.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Nettoyer le localStorage
    localStorage.removeItem('family_token');
    localStorage.removeItem('user');
    
    // Réinitialiser le contexte
    setUser(null);
    setIsAuthenticated(false);
    
    // Supprimer le header Authorization
    delete api.defaults.headers.common['Authorization'];
    
    setError(null);
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        updateUser,
        hasPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};