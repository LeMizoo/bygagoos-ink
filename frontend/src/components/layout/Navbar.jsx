// frontend/src/components/layout/Navbar.jsx - VERSION CORRIGÉE
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CelebrationIcon from '@mui/icons-material/Celebration';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { getLogoUrl } from '../../config/images';

const pages = [
  { name: 'Tableau de bord', path: '/dashboard', icon: <DashboardIcon /> },
  { name: 'Équipe Familiale', path: '/family', icon: <FamilyRestroomIcon /> },
  { name: '🎉 Inauguration', path: '/gallery', icon: <CelebrationIcon /> },
  { name: 'Équipe Production', path: '/production', icon: <FamilyRestroomIcon /> },
  { name: 'Comptabilité', path: '/accounting', icon: <DashboardIcon /> },
  { name: 'Logistique', path: '/logistics', icon: <DashboardIcon /> },
  { name: 'Stocks', path: '/stock', icon: <DashboardIcon /> },
];

const settings = [
  { name: 'Profil', path: '/profile' },
  { name: 'Paramètres', path: '/settings', icon: <SettingsIcon /> },
  { name: 'Déconnexion', action: 'logout', icon: <LogoutIcon /> },
];

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (setting) => {
    handleCloseUserMenu();
    
    if (setting.action === 'logout') {
      logout();
      navigate('/login');
    } else if (setting.path) {
      navigate(setting.path);
    }
  };

  const handlePageClick = (path) => {
    handleCloseNavMenu();
    navigate(path);
  };

  if (!user) {
    return null; // Ne pas afficher la navbar si non connecté
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a237e' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo pour desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
            <img 
              src={getLogoUrl()} 
              alt="ByGagoos Logo" 
              style={{ 
                height: '40px',
                width: 'auto',
                borderRadius: '4px'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/40x40/1a237e/ffffff?text=BG';
              }}
            />
          </Box>

          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/dashboard"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BYGAGOOS INK
          </Typography>

          {/* Menu mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.name} 
                  onClick={() => handlePageClick(page.path)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {page.icon}
                    <Typography textAlign="center">{page.name}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
            <img 
              src={getLogoUrl()} 
              alt="ByGagoos Logo" 
              style={{ 
                height: '30px',
                width: 'auto',
                marginRight: '8px'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/30x30/1a237e/ffffff?text=BG';
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to="/dashboard"
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              BYGAGOOS
            </Typography>
          </Box>

          {/* Pages pour desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handlePageClick(page.path)}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'flex', // CORRECTION: supprimé 'display: 'block',' dupliqué
                  alignItems: 'center',
                  gap: 1
                }}
              >
                {page.icon}
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Menu utilisateur */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Ouvrir le menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: user?.color || '#1976d2',
                    width: 40,
                    height: 40
                  }}
                >
                  {user?.name?.charAt(0) || 'U'}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem sx={{ pointerEvents: 'none' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Connecté en tant que
                </Typography>
              </MenuItem>
              <MenuItem sx={{ pointerEvents: 'none' }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {user?.name}
                </Typography>
              </MenuItem>
              <Divider />
              
              {settings.map((setting) => (
                <MenuItem 
                  key={setting.name} 
                  onClick={() => handleSettingClick(setting)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                    {setting.icon}
                    <Typography textAlign="center">
                      {setting.name}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;