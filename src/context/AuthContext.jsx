import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

// Créer le contexte d'authentification
export const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logoutRequested, setLogoutRequested] = useState(false);

  // Fonction pour vérifier l'authentification depuis localStorage
  const checkAuthFromStorage = useCallback(() => {
    try {
      const token = localStorage.getItem('family_token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Erreur vérification auth depuis storage:', err);
      return false;
    }
  }, []);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // D'abord essayer de récupérer depuis localStorage
        if (!checkAuthFromStorage()) {
          // Mode démo : auto-login pour le développement
          const demoUser = {
            id: 1,
            username: 'famille',
            name: 'Famille Gagoos Ink',
            email: 'contact@bygagoos-ink.mg',
            role: 'admin',
            avatar: '👨‍👩‍👧‍👦',
            permissions: ['read', 'write', 'delete', 'admin'],
            familyMembers: [
              { name: 'Tovoniaina', role: 'Fondateur' },
              { name: 'Volatiana', role: 'Directrice Générale' },
              { name: 'Miantsatiana', role: 'Directrice Opérations' },
              { name: 'Tia Faniry', role: 'Directrice Administrative' }
            ]
          };

          const demoToken = 'demo-token-' + Date.now();
          localStorage.setItem('family_token', demoToken);
          localStorage.setItem('user', JSON.stringify(demoUser));
          setUser(demoUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Erreur vérification auth:', err);
        setError('Erreur lors de la vérification de l\'authentification');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [checkAuthFromStorage]);

  // Écouter les changements de localStorage (pour les autres onglets)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'family_token' || e.key === 'user') {
        checkAuthFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkAuthFromStorage]);

  // Fonction de connexion
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulation de login avec identifiants de démo
      if (username === 'famille' && password === 'gagoos2024') {
        const userData = {
          id: 1,
          username: 'famille',
          name: 'Famille Gagoos Ink',
          email: 'contact@bygagoos-ink.mg',
          role: 'admin',
          avatar: '👨‍👩‍👧‍👦',
          permissions: ['read', 'write', 'delete', 'admin'],
          familyMembers: [
            { name: 'Tovoniaina', role: 'Fondateur' },
            { name: 'Volatiana', role: 'Directrice Générale' },
            { name: 'Miantsatiana', role: 'Directrice Opérations' },
            { name: 'Tia Faniry', role: 'Directrice Administrative' }
          ],
          lastLogin: new Date().toISOString()
        };
        
        const token = 'family-token-' + Date.now();
        
        // Stocker dans localStorage
        localStorage.setItem('family_token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Mettre à jour le contexte
        setUser(userData);
        setIsAuthenticated(true);
        setError(null);
        
        return { 
          success: true, 
          user: userData,
          redirectTo: '/app/dashboard'
        };
      } else if (username === 'demo' && password === 'demo') {
        // Mode démo avec moins de permissions
        const demoUser = {
          id: 2,
          username: 'demo',
          name: 'Utilisateur Démo',
          email: 'demo@bygagoos-ink.mg',
          role: 'user',
          avatar: '👤',
          permissions: ['read'],
          familyMembers: [],
          lastLogin: new Date().toISOString()
        };
        
        const token = 'demo-token-' + Date.now();
        localStorage.setItem('family_token', token);
        localStorage.setItem('user', JSON.stringify(demoUser));
        
        setUser(demoUser);
        setIsAuthenticated(true);
        setError(null);
        
        return { 
          success: true, 
          user: demoUser,
          redirectTo: '/app/dashboard'
        };
      } else {
        const errorMsg = 'Identifiants incorrects. Essayez: famille / gagoos2024 ou demo / demo';
        setError(errorMsg);
        return { 
          success: false, 
          error: errorMsg 
        };
      }
    } catch (err) {
      console.error('Erreur login:', err);
      const errorMsg = 'Échec de connexion. Veuillez réessayer.';
      setError(errorMsg);
      return { 
        success: false, 
        error: errorMsg 
      };
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion - marque la demande de déconnexion
  const logout = useCallback(() => {
    try {
      // Nettoyer le localStorage
      localStorage.removeItem('family_token');
      localStorage.removeItem('user');
      
      // Réinitialiser le contexte
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      
      // Marquer qu'une déconnexion a été demandée
      setLogoutRequested(true);
      
      console.log('Déconnexion demandée');
      
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    }
  }, []);

  // Fonction pour réinitialiser la demande de déconnexion
  const resetLogoutRequest = useCallback(() => {
    setLogoutRequested(false);
  }, []);

  // Rafraîchir l'authentification
  const refreshAuth = useCallback(() => {
    return checkAuthFromStorage();
  }, [checkAuthFromStorage]);

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission) || user.permissions.includes('admin');
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  // Fonction pour vérifier si le token existe
  const checkTokenExists = () => {
    return !!localStorage.getItem('family_token');
  };

  // Vérifier périodiquement l'authentification
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) {
        const tokenExists = !!localStorage.getItem('family_token');
        if (!tokenExists) {
          console.warn('Token perdu, rafraîchissement de l\'authentification...');
          refreshAuth();
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated, refreshAuth]);

  // Valeurs du contexte
  const contextValue = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    logoutRequested,
    resetLogoutRequest,
    updateUser,
    hasPermission,
    hasRole,
    checkTokenExists,
    refreshAuth
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};