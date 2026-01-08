import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AuthChecker = ({ children }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Vérifier l'authentification quand la route change
    if (location.pathname.startsWith('/app/')) {
      const token = localStorage.getItem('family_token');
      const user = localStorage.getItem('user');
      const authState = localStorage.getItem('bygagoos_auth_state');
      
      // Si manque des données d'authentification
      if (!token || !user || !authState) {
        console.log('Données auth manquantes, déconnexion...');
        logout();
        navigate('/login');
        return;
      }
      
      // Vérifier la cohérence des données
      try {
        const parsedAuth = JSON.parse(authState);
        if (!parsedAuth.isAuthenticated || parsedAuth.token !== token) {
          console.log('Données auth incohérentes, déconnexion...');
          logout();
          navigate('/login');
        }
      } catch (error) {
        console.log('Erreur parsing auth, déconnexion...');
        logout();
        navigate('/login');
      }
    }
  }, [location.pathname, logout, navigate]);

  return children;
};

export default AuthChecker;