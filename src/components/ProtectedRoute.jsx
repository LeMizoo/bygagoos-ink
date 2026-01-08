import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loading from './Loading/Loading';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children, requiredPermissions = [] }) => {
  const { 
    isAuthenticated, 
    loading, 
    user, 
    logoutRequested,
    hasPermission,
    refreshAuth 
  } = useContext(AuthContext);
  
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  // Effet pour vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      if (!loading) {
        // Vérifier l'authentification
        if (!isAuthenticated) {
          // Essayer de rafraîchir depuis localStorage
          const refreshed = refreshAuth();
          if (!refreshed) {
            console.log('Non authentifié, redirection vers login');
          }
        }
        
        // Vérifier si une déconnexion a été demandée
        if (logoutRequested) {
          console.log('Logout détecté dans ProtectedRoute');
        }
        
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [loading, isAuthenticated, logoutRequested, refreshAuth]);

  // Effet pour surveiller les changements d'authentification
  useEffect(() => {
    const token = localStorage.getItem('family_token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      console.log('Token ou user manquant dans localStorage');
    }
  }, [location.pathname]);

  // Afficher le loading pendant la vérification
  if (loading || isChecking) {
    return <Loading message="Vérification de l'accès..." />;
  }

  // Vérification d'authentification robuste
  const token = localStorage.getItem('family_token');
  const storedUser = localStorage.getItem('user');
  const authState = localStorage.getItem('bygagoos_auth_state');

  // Vérifier que TOUTES les conditions sont remplies
  const isFullyAuthenticated = 
    isAuthenticated && 
    token && 
    storedUser && 
    authState &&
    user; // Vérifie aussi le contexte

  // Si déconnexion demandée ou non authentifié, rediriger
  if (logoutRequested || !isFullyAuthenticated) {
    console.log('Accès refusé - redirection vers login');
    
    // Nettoyer les données invalides
    if (!token || !storedUser) {
      localStorage.removeItem('family_token');
      localStorage.removeItem('user');
      localStorage.removeItem('bygagoos_auth_state');
    }
    
    // Sauvegarder la page actuelle pour redirection après login
    if (location.pathname !== '/login') {
      localStorage.setItem('redirectAfterLogin', location.pathname);
    }
    
    return <Navigate to="/login" replace />;
  }

  // Vérifier les permissions si nécessaire
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(permission => 
      hasPermission(permission)
    );
    
    if (!hasAllPermissions) {
      return (
        <div className="permission-denied">
          <h2>Accès refusé</h2>
          <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
          <Navigate to="/app/dashboard" replace />
        </div>
      );
    }
  }

  // Vérifier le rôle de l'utilisateur si nécessaire
  if (location.pathname.includes('/admin') && user?.role !== 'admin') {
    return <Navigate to="/app/dashboard" replace />;
  }

  // Si tout est ok, afficher le contenu protégé
  return children;
};

export default ProtectedRoute;