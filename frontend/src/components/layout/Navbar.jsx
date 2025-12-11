// frontend/src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleMenuClose();
  };

  // Masquer la navbar sur la page de login
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#2E7D32' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box
          onClick={() => navigate('/')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            '&:hover': { opacity: 0.8 }
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            🎨 ByGagoos Ink
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isAuthenticated && (
            <>
              <Button
                color="inherit"
                onClick={() => navigate('/dashboard')}
                sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                Tableau de bord
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate('/family')}
                sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                Équipe
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate('/clients')}
                sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                Clients
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate('/orders')}
                sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                Commandes
              </Button>
            </>
          )}
        </Box>

        {/* User Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isAuthenticated ? (
            <>
              <IconButton
                onClick={handleMenuOpen}
                sx={{ p: 0 }}
              >
                <Avatar
                  sx={{
                    backgroundColor: '#FF9800',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {user?.name
                    ?.split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2) || '?'}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem disabled>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {user?.name}
                  </Typography>
                </MenuItem>
                <MenuItem disabled>
                  <Typography variant="caption" color="textSecondary">
                    {user?.email}
                  </Typography>
                </MenuItem>
                <hr style={{ margin: '8px 0' }} />
                <MenuItem onClick={() => handleNavigate('/profile')}>
                  👤 Mon Profil
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/dashboard')}>
                  📊 Tableau de bord
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/family')}>
                  👨‍👩‍👧‍👦 Équipe
                </MenuItem>
                <hr style={{ margin: '8px 0' }} />
                <MenuItem onClick={handleLogout} sx={{ color: '#D32F2F' }}>
                  🚪 Se déconnecter
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={() => navigate('/login')}
              variant="outlined"
              sx={{ borderColor: 'white', color: 'white' }}
            >
              Connexion
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
