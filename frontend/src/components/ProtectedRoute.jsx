import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Vérification de l'authentification...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="unauthorized-container">
        <div className="unauthorized-content">
          <h2>⛔ Accès interdit</h2>
          <div className="error-icon">🚫</div>
          <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
          <div className="role-info">
            <p><strong>Rôle requis :</strong> {requiredRole}</p>
            <p><strong>Votre rôle :</strong> {user?.role}</p>
          </div>
          <p className="contact-admin">
            Contactez l'administrateur (Structure) pour obtenir les permissions nécessaires.
          </p>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="back-button"
          >
            ← Retour au dashboard
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;