// frontend/src/context/AuthContext.jsx - VERSION CORRIGÉE
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { loginUser, getCurrentUser, logoutUser, testDockerConnection } from '../services/api';
import { toast } from 'react-hot-toast';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dockerStatus, setDockerStatus] = useState({
    connected: false,
    checking: true,
    message: 'Vérification en cours...'
  });

  // Tester la connexion Docker
  const checkDockerConnection = useCallback(async () => {
    try {
      setDockerStatus(prev => ({ ...prev, checking: true }));
      const result = await testDockerConnection();
      
      setDockerStatus({
        connected: result.connected,
        checking: false,
        message: result.message
      });
      
      if (result.connected) {
        console.log('✅ Docker backend connecté');
      } else {
        console.warn('⚠️ Docker backend non disponible');
        toast.warning('Mode local activé - Docker non disponible');
      }
      
      return result.connected;
    } catch (error) {
      console.error('Erreur vérification Docker:', error);
      setDockerStatus({
        connected: false,
        checking: false,
        message: 'Erreur de connexion'
      });
      toast.error('Impossible de se connecter au backend');
      return false;
    }
  }, []);

  // Fonction de login
  const login = async (email, password) => {
    try {
      setLoading(true);
      console.log('🔐 Tentative de connexion pour:', email);
      
      const result = await loginUser(email, password);
      
      if (result.success) {
        const userData = result.user;
        
        setUser(userData);
        setIsAuthenticated(true);
        
        const message = result.message || `Bienvenue ${userData.name || email} !`;
        toast.success(message);
        
        return { success: true, user: userData };
      }
      
      toast.error(result.error || 'Échec de la connexion');
      return { success: false, error: result.error || 'Échec de la connexion' };
      
    } catch (error) {
      console.error('❌ Erreur login:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Erreur de connexion';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Fonction de logout
  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Déconnexion réussie');
  }, []);

  // Vérifier l'authentification au chargement
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      
      // Vérifier Docker en arrière-plan (pas bloquant)
      checkDockerConnection().then(connected => {
        if (!connected) {
          console.log('🔄 Utilisation du mode local');
        }
      }).catch(() => {
        // Ignorer les erreurs silencieusement
      });
      
      // Vérifier l'utilisateur
      const userData = await getCurrentUser();
      
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
        console.log('👤 Utilisateur trouvé:', userData.name);
      } else {
        // Vérifier les anciennes clés de stockage
        const oldToken = localStorage.getItem('bygagoos_token');
        const oldUser = localStorage.getItem('bygagoos_user');
        
        if (oldToken && oldUser) {
          try {
            const parsedUser = JSON.parse(oldUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
            console.log('📝 Utilisation des anciennes données');
          } catch (parseError) {
            console.warn('Erreur parsing ancien utilisateur:', parseError);
          }
        } else {
          console.log('🔍 Aucun utilisateur connecté');
        }
      }
    } catch (error) {
      console.warn('⚠️ Erreur vérification auth:', error.message);
      // Ne pas bloquer l'application en cas d'erreur
    } finally {
      setLoading(false);
    }
  }, [checkDockerConnection]);

  // Effet pour vérifier l'authentification au montage
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value = {
    user,
    loading,
    isAuthenticated,
    dockerStatus,
    login,
    logout,
    checkAuth,
    checkDockerConnection
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;