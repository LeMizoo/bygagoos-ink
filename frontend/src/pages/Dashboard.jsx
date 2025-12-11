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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import BuildIcon from '@mui/icons-material/Build';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HomeIcon from '@mui/icons-material/Home';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const Dashboard = () => {
  const { user, logout, getFamilyMembers } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalClients: 0,
    totalOrders: 0,
    activeProjects: 0,
    upcomingEvents: 0,
    totalDocuments: 0,
    completionRate: 0,
    revenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const members = await getFamilyMembers();
      setFamilyMembers(members);

      // Dashboard stats from backend
      try {
        const sRes = await api.get('/api/dashboard/stats');
        if (sRes?.data) {
          setStats(prev => ({ ...prev, ...sRes.data }));
        }
      } catch (e) {
        console.warn('Could not load dashboard stats', e);
      }

      // Recent orders
      try {
        const oRes = await api.get('/api/orders?limit=5');
        const recent = oRes?.data?.data || [];
        setRecentOrders(recent);
      } catch (e) {
        console.warn('Could not load recent orders', e);
      }

    } catch (error) {
      toast.error('Erreur lors du chargement des données');
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
            <Avatar 
              src={user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=${getRoleColor(user?.role)?.replace('#', '')}&color=fff`}
              sx={{ 
                width: 60,
                height: 60,
                border: `3px solid ${getRoleColor(user?.role)}`,
                objectFit: 'cover'
              }}
            />
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: getRoleColor(user?.role) }}>
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
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              sx={{ mr: 1 }}
            >
              Accueil
            </Button>
            <IconButton color="primary">
              <NotificationsIcon />
            </IconButton>
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
              startIcon={<ExitToAppIcon />}
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
            label="Tableau de bord" 
            iconPosition="start"
            sx={{ py: 2 }}
          />
          <Tab 
            icon={<FamilyRestroomIcon />} 
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
              {[
                { label: 'Membres', value: stats.totalMembers, icon: <PersonIcon />, color: 'primary' },
                { label: 'Projets Actifs', value: stats.activeProjects, icon: <WorkIcon />, color: 'success' },
                { label: 'Événements', value: stats.upcomingEvents, icon: <CalendarTodayIcon />, color: 'warning' },
                { label: 'Documents', value: stats.totalDocuments, icon: <DescriptionIcon />, color: 'info' },
                { label: 'Taux de Complétion', value: `${stats.completionRate}%`, icon: <TrendingUpIcon />, color: 'secondary' },
                { label: 'Revenu (MGA)', value: `${new Intl.NumberFormat('fr-MG').format(stats.revenue)} MGA`, icon: '💰', color: 'success' },
              ].map((stat, index) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                  <Card sx={{ height: '100%', textAlign: 'center' }}>
                    <CardContent>
                      <Box sx={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: `${stat.color}.light`,
                        color: `${stat.color}.main`,
                        mb: 2,
                        mx: 'auto'
                      }}>
                        {typeof stat.icon === 'string' ? (
                          <Typography variant="h5">{stat.icon}</Typography>
                        ) : (
                          stat.icon
                        )}
                      </Box>
                      <Typography variant="h4" component="div" gutterBottom>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Welcome Message */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                🎉 Bienvenue sur ByGagoos-Ink
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body1" paragraph>
                En tant que <strong>{getRoleLabel(user?.role)}</strong>, vous jouez un rôle essentiel dans le succès de notre entreprise familiale. 
                Votre contribution est précieuse et fait la différence chaque jour.
              </Typography>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Votre mission :</strong> {user?.role === 'STRUCTURE' ? 'Définir la stratégie et prendre les décisions clés.' :
                    user?.role === 'INSPIRATION' ? 'Apporter des idées innovantes et créatives.' :
                    user?.role === 'CREATION' ? 'Transformer les idées en réalisations concrètes.' :
                    'Assurer la communication et les relations avec nos partenaires.'}
                </Typography>
              </Alert>
            </Paper>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                ⚡ Actions Rapides
              </Typography>
              <List>
                {[
                  { label: 'Voir l\'équipe', action: () => setActiveTab(1) },
                  { label: 'Accéder aux outils', action: () => setActiveTab(2) },
                  { label: 'Voir le calendrier', action: () => toast.info('Bientôt disponible') },
                  { label: 'Consulter les documents', action: () => toast.info('Bientôt disponible') },
                ].map((item, index) => (
                  <ListItem 
                    key={index}
                    button 
                    onClick={item.action}
                    sx={{ borderRadius: 1, mb: 1 }}
                  >
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                📅 Activité Récente
              </Typography>
              <List>
                {[
                  { text: 'Connexion réussie', time: 'Il y a 2 minutes', icon: '✅' },
                  { text: 'Mise à jour du profil', time: 'Il y a 1 heure', icon: '👤' },
                  { text: 'Nouveau projet ajouté', time: 'Il y a 3 heures', icon: '📁' },
                  { text: 'Réunion d\'équipe planifiée', time: 'Hier', icon: '👥' },
                ].map((item, index) => (
                  <ListItem key={index} sx={{ mb: 1 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'grey.100', color: 'text.primary' }}>
                        {item.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={item.text}
                      secondary={item.time}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 2, mt: 3 }}>
              <Typography variant="h6" gutterBottom>📦 Commandes récentes</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Réf</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Prix unit. (MGA)</TableCell>
                    <TableCell>Total (MGA)</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.map(o => (
                    <TableRow key={o.id} hover onClick={() => navigate(`/orders/${o.id}`)} sx={{ cursor: 'pointer' }}>
                      <TableCell>{o.id}</TableCell>
                      <TableCell>{o.clientName}</TableCell>
                      <TableCell>{new Date(o.orderDate).toLocaleString()}</TableCell>
                      <TableCell>{o.totalQty}</TableCell>
                      <TableCell>{new Intl.NumberFormat('fr-MG').format(o.unitPrice)} MGA</TableCell>
                      <TableCell>{new Intl.NumberFormat('fr-MG').format(o.totalPrice)} MGA</TableCell>
                      <TableCell>{o.status}</TableCell>
                    </TableRow>
                  ))}
                  {recentOrders.length === 0 && (
                    <TableRow><TableCell colSpan={7}>Aucune commande récente.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FamilyRestroomIcon /> Équipe Familiale
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Découvrez les membres de l'équipe familiale et leurs rôles
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={3}>
                {familyMembers.map((member) => (
                  <Grid item xs={12} sm={6} md={3} key={member.id}>
                    <Card sx={{ 
                      height: '100%', 
                      borderLeft: `4px solid ${member.color}`,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      }
                    }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Avatar 
                          src={member.profileImage}
                          onError={(e) => {
                            e.target.src = member.image;
                          }}
                          sx={{ 
                            width: 100, 
                            height: 100,
                            margin: '0 auto 16px',
                            border: `3px solid ${member.color}`,
                            objectFit: 'cover'
                          }}
                        />
                        
                        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 600, minHeight: 60 }}>
                          {member.name}
                        </Typography>
                        
                        <Chip 
                          label={member.role}
                          size="small"
                          sx={{ 
                            bgcolor: `${member.color}20`,
                            color: member.color,
                            fontWeight: 600,
                            mb: 1
                          }}
                        />
                        
                        <Typography variant="body2" color="text.secondary" paragraph sx={{ minHeight: 60, mt: 1 }}>
                          {member.description}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: member.color }}>
                          ✉️ {member.email}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button 
                  variant="outlined" 
                  onClick={() => toast.info('Fonctionnalité en développement')}
                  sx={{ mr: 2 }}
                >
                  📞 Contacter toute l'équipe
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={loadData}
                >
                  🔄 Actualiser les photos
                </Button>
              </Box>
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
                {/* Outils communs à tous */}
                {[
                  { 
                    title: 'Tableau de bord', 
                    description: 'Vue d\'ensemble des activités', 
                    icon: '📊',
                    color: '#1976d2',
                    action: () => setActiveTab(0)
                  },
                  { 
                    title: 'Équipe', 
                    description: 'Informations sur l\'équipe familiale', 
                    icon: '👨‍👩‍👧‍👦',
                    color: '#9c27b0',
                    action: () => setActiveTab(1)
                  },
                  { 
                    title: 'Calendrier', 
                    description: 'Planification des activités', 
                    icon: '📅',
                    color: '#ff9800',
                    action: () => toast.info('Calendrier bientôt disponible')
                  },
                  { 
                    title: 'Documents', 
                    description: 'Gestion des documents partagés', 
                    icon: '📁',
                    color: '#4caf50',
                    action: () => toast.info('Documents bientôt disponible')
                  },
                ].map((tool, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card sx={{ 
                      height: '100%', 
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                      }
                    }}>
                      <CardContent onClick={tool.action}>
                        <Box sx={{ 
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          bgcolor: `${tool.color}20`,
                          color: tool.color,
                          mb: 2,
                          fontSize: '2rem'
                        }}>
                          {tool.icon}
                        </Box>
                        <Typography variant="h6" gutterBottom>
                          {tool.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {tool.description}
                        </Typography>
                        <Button 
                          variant="outlined" 
                          size="small"
                          sx={{ mt: 1 }}
                        >
                          Accéder
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
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
          Connecté en tant que <strong>{user?.name}</strong> • {getRoleLabel(user?.role)} • 
          <Button size="small" onClick={handleLogout} sx={{ ml: 1 }}>
            Se déconnecter
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;