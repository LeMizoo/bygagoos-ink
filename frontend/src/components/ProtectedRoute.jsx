import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress, Alert, Button, Typography } from '@mui/material';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="body1" color="text.secondary">
          Vérification de l'authentification...
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          flexDirection: 'column',
          gap: 3,
          p: 3,
        }}
      >
        <Alert 
          severity="error" 
          sx={{ 
            width: '100%', 
            maxWidth: 600,
            '& .MuiAlert-icon': { fontSize: 40 }
          }}
        >
          <Typography variant="h5" gutterBottom>
            ⛔ Accès interdit
          </Typography>
          <Typography variant="body1" paragraph>
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Rôle requis :</strong> {requiredRole}
            </Typography>
            <Typography variant="body2">
              <strong>Votre rôle :</strong> {user?.role}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
            Contactez l'administrateur (Structure) pour obtenir les permissions nécessaires.
          </Typography>
        </Alert>
        <Button
          variant="contained"
          onClick={() => window.location.href = '/dashboard'}
          sx={{ mt: 2 }}
        >
          ← Retour au tableau de bord
        </Button>
      </Box>
    );
  }

  return children;
};

export default ProtectedRoute;