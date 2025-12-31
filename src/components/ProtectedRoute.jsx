import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loading from './Loading/Loading';

const ProtectedRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  // Vérification simple
  const token = localStorage.getItem('family_token');
  const userData = localStorage.getItem('user');
  
  if (!token || !userData) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;