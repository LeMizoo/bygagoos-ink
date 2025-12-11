// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FamilyPage from './pages/FamilyPage';
import ProfilePage from './pages/ProfilePage';
import ClientsPage from './pages/ClientsPage';
import OrdersPage from './pages/OrdersPage';
import ClientDetail from './pages/ClientDetail';
import OrderDetail from './pages/OrderDetail';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Composant de chargement
const LoadingScreen = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}
  >
    <CircularProgress size={60} sx={{ color: '#2E7D32' }} />
  </Box>
);

// Route protégée
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Thème Material-UI personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9C27B0',
      light: '#BA68C8',
      dark: '#7B1FA2',
      contrastText: '#fff',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    error: {
      main: '#F44336',
      light: '#E57373',
      dark: '#D32F2F',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: 'clamp(1.5rem, 5vw, 3rem)',
    },
    h2: {
      fontWeight: 600,
      fontSize: 'clamp(1.25rem, 4vw, 2rem)',
    },
    h3: {
      fontWeight: 600,
      fontSize: 'clamp(1.1rem, 3.5vw, 1.75rem)',
    },
    h4: {
      fontWeight: 600,
      fontSize: 'clamp(1rem, 3vw, 1.5rem)',
    },
    h5: {
      fontWeight: 600,
      fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)',
    },
    h6: {
      fontWeight: 600,
      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    },
    body1: {
      fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
    },
    body2: {
      fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: 'clamp(0.8rem, 1.2vw, 0.9375rem)',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.2)',
    '0px 3px 1px -2px rgba(0,0,0,0.2)',
    '0px 3px 3px -2px rgba(0,0,0,0.2)',
    '0px 2px 4px -1px rgba(0,0,0,0.2)',
    '0px 4px 5px 0px rgba(0,0,0,0.2)',
    '0px 6px 10px 0px rgba(0,0,0,0.2)',
    '0px 8px 10px 1px rgba(0,0,0,0.2)',
    '0px 9px 12px 1px rgba(0,0,0,0.2)',
    '0px 12px 17px 2px rgba(0,0,0,0.2)',
    '0px 16px 24px 2px rgba(0,0,0,0.2)',
    '0px 24px 38px 3px rgba(0,0,0,0.2)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2)',
          '&:hover': {
            boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '3px solid #fff',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router 
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            v7_normalizeFormMethod: true
          }}
        >
          <Toaster 
            position="top-right"
            gutter={8}
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                borderRadius: '8px',
                fontSize: '14px',
              },
              success: {
                style: {
                  background: '#2E7D32',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#2E7D32',
                },
              },
              error: {
                style: {
                  background: '#D32F2F',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#D32F2F',
                },
              },
              loading: {
                style: {
                  background: '#FF9800',
                },
              },
            }}
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/family" 
              element={
                <ProtectedRoute>
                  <FamilyPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/clients"
              element={
                <ProtectedRoute>
                  <ClientsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clients/:id"
              element={
                <ProtectedRoute>
                  <ClientDetail />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            {/* Redirection pour les routes inconnues */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;