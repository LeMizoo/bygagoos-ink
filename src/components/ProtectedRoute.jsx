import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loading from './Loading/Loading';

const ProtectedRoute = ({ requiredPermission = null, redirectTo = '/login' }) => {
  const { isAuthenticated, loading, user, hasPermission } = useContext(AuthContext);

  if (loading) {
    return <Loading type="spinner" fullscreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Vérifier les permissions si nécessaire
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Vérifier les rôles si nécessaire
  // if (requiredRole && user?.role !== requiredRole) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;