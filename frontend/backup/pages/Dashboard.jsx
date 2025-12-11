// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Tab,
  Tabs,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  FamilyRestroom as FamilyIcon,
  ExitToApp as LogoutIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
  Description as DocumentIcon,
  Groups as GroupsIcon,
  Build as BuildIcon,
} from '@mui/icons-material';
import { toast } from 'react-hot-toast';

// Données factices pour l'exemple (à remplacer par des appels API réels)
const FAMILY_MEMBERS_DATA = [
  {
    id: 1,
    name: 'Tovoniaina Rahendrison',
    email: 'tovoniaina.rahendrison@gmail.com',
    role: 'STRUCTURE',
    color: '#2E7D32',
    emoji: '👑',
    description: 'Direction stratégique et décisions',
    department: 'Direction',
    permissions: ['view_dashboard', 'manage_users', 'view_reports', 'admin_access']
  },
  {
    id: 2,
    name: 'Dedettenadia',
    email: 'dedettenadia@gmail.com',
    role: 'INSPIRATION',
    color: '#9C27B0',
    emoji: '💡',
    description: 'Innovation et nouvelles idées',
    department: 'Design & Innovation',
    permissions: ['view_dashboard', 'manage_designs', 'view_creations', 'creative_access']
  },
  {
    id: 3,
    name: 'Miantsatiana Rahendrison',
    email: 'miantsatianarahendrison@gmail.com',
    role: 'CREATION',
    color: '#FF9800',
    emoji: '🎨',
    description: 'Production et réalisation concrète',
    department: 'Production',
    permissions: ['view_dashboard', 'manage_production', 'view_orders', 'production_access']
  },
  {
    id: 4,
    name: 'Faniry Tia',
    email: 'fanirytia17@gmail.com',
    role: 'COMMUNICATION',
    color: '#2196F3',
    emoji: '📢',
    description: 'Marketing et relations externes',
    department: 'Communication',
    permissions: ['view_dashboard', 'manage_clients', 'view_communications', 'client_access']
  },
];

const Dashboard = () => {
  const { user, logout, api } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    totalMembers: 4,
    activeProjects: 12,
    upcomingEvents: 5,
    totalDocuments: 24
  });

  useEffect(() => {
    // Charger les données du dashboard
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Essayer de récupérer des données du backend si l'endpoint existe
      // Pour l'instant, on utilise des données factices
      const mockStats = {
        totalMembers: 4,
        activeProjects: 12,
        upcomingEvents: 5,
        totalDocuments: 24
      };
      
      setDashboardStats(mockStats);
      
    } catch (error) {
      console.error('Erreur lors du chargement du dashboard:', error);
      toast.error('Impossible de charger les données du dashboard');
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'SUPER_ADMIN':
      case 'STRUCTURE': return '#2E7D32';
      case 'INSPIRATION': return '#9C27B0';
      case 'CREATION': return '#FF9800';
      case 'COMMUNICATION': return '#2196F3';
      case 'FAMILY_MEMBER': return '#757575';
      default: return '#666';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'SUPER_ADMIN':
      case 'STRUCTURE': return '👑';
      case 'INSPIRATION': return '💡';
      case 'CREATION': return '🎨';
      case 'COMMUNICATION': return '📢';
      case 'FAMILY_MEMBER': return '👤';
      default: return '👤';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'Super Admin';
      case 'STRUCTURE': return 'Structure';
      case 'INSPIRATION': return 'Inspiration';
      case 'CREATION': return 'Création';
      case 'COMMUNICATION': return 'Communication';
      case 'FAMILY_MEMBER': return 'Membre Familial';
      default: return role;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading && !user) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <LinearProgress sx={{ width: '50%' }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ 
              bgcolor: getRoleColor(user?.role),
              width: 60,
              height: 60,
              fontSize: '1.5rem'
            }}>
              {getRoleIcon(user?.role)}
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                Bienvenue, {user?.name} !
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Chip 
                  label={getRoleLabel(user?.role)} 
                  sx={{ 
                    bgcolor: `${getRoleColor(user?.role)}20`,
                    color: getRoleColor(user?.role),
                    fontWeight: 600,
                  }}
                  size="small"
                />
                <Typography variant="body2" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<FamilyIcon />}
              onClick={() => setActiveTab(1)}
            >
              Voir la famille
            </Button>
            <Button
              variant="outlined"
              startIcon={<SettingsIcon />}
              onClick={() => navigate('/settings')}
            >
              Paramètres
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Déconnexion
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Tabs Navigation */}
      <Paper elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            icon={<DashboardIcon />} 
            label="Vue d'ensemble" 
            iconPosition="start"
            sx={{ py: 2 }}
          />
          <Tab 
            icon={<FamilyIcon />} 
            label="Équipe Familiale" 
            iconPosition="start"
            sx={{ py: 2 }}
          />
          <Tab 
            icon={<BuildIcon />} 
            label="Outils" 
            iconPosition="start"
            sx={{ py: 2 }}
          />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {/* Stats Grid */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.light' }}>
                        <GroupsIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" color="text.secondary">
                          Membres
                        </Typography>
                        <Typography variant="h4">
                          {dashboardStats.totalMembers}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'success.light' }}>
                        <WorkIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" color="text.secondary">
                          Projets
                        </Typography>
                        <Typography variant="h4">
                          {dashboardStats.activeProjects}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'warning.light' }}>
                        <CalendarIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" color="text.secondary">
                          Événements
                        </Typography>
                        <Typography variant="h4">
                          {dashboardStats.upcomingEvents}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'info.light' }}>
                        <DocumentIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" color="text.secondary">
                          Documents
                        </Typography>
                        <Typography variant="h4">
                          {dashboardStats.totalDocuments}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Welcome Message */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                🎉 Bienvenue sur votre tableau de bord
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body1" paragraph>
                Vous faites partie de l'équipe familiale <strong>ByGagoos-Ink</strong>. 
                En tant que <strong>{getRoleLabel(user?.role)}</strong>, vous avez accès à des fonctionnalités spécifiques 
                pour contribuer au succès de notre entreprise familiale.
              </Typography>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Votre rôle :</strong> {getRoleLabel(user?.role)}<br />
                  <strong>Votre email :</strong> {user?.email}<br />
                  <strong>Accès complet :</strong> Vous pouvez accéder à toutes les fonctionnalités de votre rôle
                </Typography>
              </Alert>
            </Paper>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FamilyIcon /> Équipe Familiale
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Découvrez les membres de l'équipe familiale et leurs rôles
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={3}>
                {FAMILY_MEMBERS_DATA.map((member) => (
                  <Grid item xs={12} sm={6} md={3} key={member.id}>
                    <Card sx={{ height: '100%', borderLeft: `4px solid ${member.color}` }}>
                      <CardContent>
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                          <Avatar sx={{ 
                            bgcolor: member.color, 
                            width: 60, 
                            height: 60,
                            fontSize: '1.5rem',
                            margin: '0 auto'
                          }}>
                            {member.emoji}
                          </Avatar>
                        </Box>
                        
                        <Typography variant="h6" component="div" align="center" gutterBottom>
                          {member.name}
                        </Typography>
                        
                        <Chip 
                          label={getRoleLabel(member.role)}
                          size="small"
                          sx={{ 
                            bgcolor: `${member.color}20`,
                            color: member.color,
                            fontWeight: 600,
                            mb: 1,
                            width: '100%'
                          }}
                        />
                        
                        <Typography variant="body2" color="text.secondary" align="center" paragraph>
                          {member.description}
                        </Typography>
                        
                        <Typography variant="body2" align="center">
                          <strong>Email :</strong> {member.email}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}

      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BuildIcon /> Outils disponibles
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Accédez aux outils spécifiques à votre rôle
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={3}>
                {/* Outils communs */}
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Avatar sx={{ 
                        bgcolor: 'primary.light', 
                        width: 60, 
                        height: 60,
                        fontSize: '1.5rem',
                        margin: '0 auto 16px'
                      }}>
                        📊
                      </Avatar>
                      <Typography variant="h6" gutterBottom>
                        Tableau de bord
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Vue d'ensemble des activités
                      </Typography>
                      <Button 
                        variant="outlined" 
                        onClick={() => setActiveTab(0)}
                        fullWidth
                      >
                        Accéder
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Avatar sx={{ 
                        bgcolor: 'secondary.light', 
                        width: 60, 
                        height: 60,
                        fontSize: '1.5rem',
                        margin: '0 auto 16px'
                      }}>
                        👨‍👩‍👧‍👦
                      </Avatar>
                      <Typography variant="h6" gutterBottom>
                        Équipe
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Informations sur l'équipe familiale
                      </Typography>
                      <Button 
                        variant="outlined" 
                        onClick={() => setActiveTab(1)}
                        fullWidth
                      >
                        Voir l'équipe
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                
                {/* Outils spécifiques selon le rôle */}
                {(user?.role === 'SUPER_ADMIN' || user?.role === 'STRUCTURE') && (
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Avatar sx={{ 
                          bgcolor: '#2E7D32', 
                          width: 60, 
                          height: 60,
                          fontSize: '1.5rem',
                          margin: '0 auto 16px'
                        }}>
                          👥
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                          Gestion Utilisateurs
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Gérez les comptes et permissions
                        </Typography>
                        <Button 
                          variant="contained" 
                          sx={{ bgcolor: '#2E7D32' }}
                          fullWidth
                          disabled
                        >
                          Bientôt disponible
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
                
                {user?.role === 'INSPIRATION' && (
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Avatar sx={{ 
                          bgcolor: '#9C27B0', 
                          width: 60, 
                          height: 60,
                          fontSize: '1.5rem',
                          margin: '0 auto 16px'
                        }}>
                          🎨
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                          Galerie Designs
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Gérez vos créations et designs
                        </Typography>
                        <Button 
                          variant="contained" 
                          sx={{ bgcolor: '#9C27B0' }}
                          fullWidth
                          disabled
                        >
                          Bientôt disponible
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
                
                {user?.role === 'CREATION' && (
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Avatar sx={{ 
                          bgcolor: '#FF9800', 
                          width: 60, 
                          height: 60,
                          fontSize: '1.5rem',
                          margin: '0 auto 16px'
                        }}>
                          ⚙️
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                          Suivi Production
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Suivez l'avancement des commandes
                        </Typography>
                        <Button 
                          variant="contained" 
                          sx={{ bgcolor: '#FF9800' }}
                          fullWidth
                          disabled
                        >
                          Bientôt disponible
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
                
                {user?.role === 'COMMUNICATION' && (
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Avatar sx={{ 
                          bgcolor: '#2196F3', 
                          width: 60, 
                          height: 60,
                          fontSize: '1.5rem',
                          margin: '0 auto 16px'
                        }}>
                          💬
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                          Relation Client
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Gérez les communications clients
                        </Typography>
                        <Button 
                          variant="contained" 
                          sx={{ bgcolor: '#2196F3' }}
                          fullWidth
                          disabled
                        >
                          Bientôt disponible
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Footer */}
      <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} ByGagoos-Ink - Plateforme familiale de gestion d'entreprise
        </Typography>
        <Typography variant="caption" color="text.secondary" align="center" sx={{ display: 'block', mt: 1 }}>
          Connecté en tant que <strong>{user?.name}</strong> ({getRoleLabel(user?.role)})
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;