// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

// Création du contexte d'authentification
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
  const [error, setError] = useState(null);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('bygagoos_token');
      const userData = localStorage.getItem('bygagoos_user');

      console.log('��� Vérification d\'authentification');

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
          
          // Configurer Axios avec le token pour les requêtes futures
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          console.log('✅ Session restaurée:', parsedUser.email);
        } catch (parseError) {
          console.error('❌ Erreur de parsing des données utilisateur:', parseError);
          logout();
        }
      } else {
        console.log('��� Aucune session active trouvée');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la vérification d\'authentification:', error);
      setError('Erreur de vérification d\'authentification');
    } finally {
      setLoading(false);
    }
  };

  // Fonction de connexion avec support du mode démo
  const login = async (credentials) => {
    setError(null);
    console.log('��� Tentative de connexion avec:', credentials.email);

    try {
      // MODE DÉMO - Utilisateur de test
      if (credentials.email === 'demo@bygagoos.com' && credentials.password === 'demo123') {
        
        console.log('��� Mode démo activé');
        
        const demoUser = {
          id: 1,
          email: 'demo@bygagoos.com',
          name: 'Utilisateur Démo',
          role: 'admin',
          avatar: null,
          phone: '+261 34 00 000 00',
          address: 'Antananarivo, Madagascar',
          memberSince: '2023-05-18',
          permissions: ['dashboard', 'orders', 'clients', 'stock', 'production', 'settings']
        };

        const demoToken = 'demo-jwt-token-' + Date.now();
        
        // Stocker les données
        localStorage.setItem('bygagoos_token', demoToken);
        localStorage.setItem('bygagoos_user', JSON.stringify(demoUser));
        
        // Configurer Axios
        api.defaults.headers.common['Authorization'] = `Bearer ${demoToken}`;
        
        // Mettre à jour l'état
        setUser(demoUser);
        setIsAuthenticated(true);
        
        console.log('✅ Connexion démo réussie');
        return { success: true, user: demoUser, token: demoToken };
      }

      // MODE PRODUCTION - Connexion réelle avec l'API
      console.log('��� Tentative de connexion avec l\'API');
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.success) {
        const { token, user: userData } = response.data;
        
        // Stocker les données
        localStorage.setItem('bygagoos_token', token);
        localStorage.setItem('bygagoos_user', JSON.stringify(userData));
        
        // Configurer Axios pour les requêtes futures
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Mettre à jour l'état
        setUser(userData);
        setIsAuthenticated(true);
        
        console.log('✅ Connexion API réussie');
        return { success: true, user: userData, token };
      } else {
        setError(response.data.message || 'Échec de connexion');
        return { success: false, error: response.data.message };
      }
      
    } catch (error) {
      console.error('❌ Erreur de connexion:', error);
      
      // Gestion des erreurs spécifiques
      let errorMessage = 'Erreur de connexion';
      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage = 'Email ou mot de passe incorrect';
            break;
          case 404:
            errorMessage = 'Service d\'authentification indisponible';
            break;
          case 500:
            errorMessage = 'Erreur serveur, veuillez réessayer plus tard';
            break;
          default:
            errorMessage = error.response.data?.message || 'Erreur inconnue';
        }
      } else if (error.request) {
        errorMessage = 'Impossible de contacter le serveur. Vérifiez votre connexion.';
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Fonction d'inscription
  const register = async (userData) => {
    setError(null);
    console.log('��� Tentative d\'inscription:', { email: userData.email });

    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.success) {
        const { token, user: newUser } = response.data;
        
        // Stocker les données
        localStorage.setItem('bygagoos_token', token);
        localStorage.setItem('bygagoos_user', JSON.stringify(newUser));
        
        // Configurer Axios
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Mettre à jour l'état
        setUser(newUser);
        setIsAuthenticated(true);
        
        console.log('✅ Inscription réussie');
        return { success: true, user: newUser, token };
      } else {
        setError(response.data.message || 'Échec d\'inscription');
        return { success: false, error: response.data.message };
      }
      
    } catch (error) {
      console.error('❌ Erreur d\'inscription:', error);
      
      let errorMessage = 'Erreur d\'inscription';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    console.log('��� Déconnexion en cours...');
    
    // Supprimer les données d'authentification
    localStorage.removeItem('bygagoos_token');
    localStorage.removeItem('bygagoos_user');
    
    // Supprimer l'en-tête Authorization
    delete api.defaults.headers.common['Authorization'];
    
    // Réinitialiser l'état
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    
    console.log('✅ Déconnexion réussie');
    
    // Rediriger vers la page de connexion
    window.location.href = '/login';
  };

  // Mettre à jour les informations utilisateur
  const updateUser = (newUserData) => {
    try {
      const updatedUser = { ...user, ...newUserData };
      setUser(updatedUser);
      localStorage.setItem('bygagoos_user', JSON.stringify(updatedUser));
      console.log('✅ Utilisateur mis à jour');
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour:', error);
      return { success: false, error: 'Erreur de mise à jour' };
    }
  };

  // Vérifier les permissions
  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission) || user.role === 'admin';
  };

  // Vérifier le rôle
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Valeur du contexte
  const value = {
    user,
    loading,
    isAuthenticated,
    error,
    login,
    register,
    logout,
    updateUser,
    checkAuth,
    hasPermission,
    hasRole,
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
