// frontend/src/pages/Dashboard.jsx - VERSION CORRIGÉE AVEC PRODUCTION
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats, getRecentOrders, getFamilyMembers } from '../services/api';
import { getMemberImage, IMAGES_CONFIG, getImageUrl } from '../config/images';
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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CardMedia,
  CardActions,
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
import FactoryIcon from '@mui/icons-material/Factory';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import GroupsIcon from '@mui/icons-material/Groups';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
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
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setIsOfflineMode(false);
    
    try {
      // Charger les membres de la famille
      try {
        const members = await getFamilyMembers();
        setFamilyMembers(members || []);
      } catch (memberError) {
        console.warn('API membres non disponible, utilisation données locales:', memberError);
        setFamilyMembers(IMAGES_CONFIG.FAMILY_MEMBERS.map(m => ({
          ...m,
          profileImage: getMemberImage(m),
          isFallback: true
        })));
        setIsOfflineMode(true);
      }

      // Charger les statistiques
      try {
        const statsData = await getDashboardStats();
        setStats(prev => ({ ...prev, ...statsData }));
      } catch (statsError) {
        console.warn('Statistiques non disponibles:', statsError);
        setStats({
          totalMembers: familyMembers.length || IMAGES_CONFIG.FAMILY_MEMBERS.length,
          totalClients: 12,
          totalOrders: 24,
          activeProjects: 3,
          upcomingEvents: 2,
          totalDocuments: 15,
          completionRate: 75,
          revenue: 1250000
        });
      }

      // Charger les commandes récentes
      try {
        const orders = await getRecentOrders(5);
        setRecentOrders(orders || []);
      } catch (ordersError) {
        console.warn('Commandes non disponibles:', ordersError);
        setRecentOrders([
          { 
            id: 'CMD-001', 
            clientName: 'Client Test 1', 
            orderDate: new Date(), 
            totalQty: 10, 
            unitPrice: 5000, 
            totalPrice: 50000, 
            status: 'En cours' 
          },
          { 
            id: 'CMD-002', 
            clientName: 'Client Test 2', 
            orderDate: new Date(Date.now() - 86400000), 
            totalQty: 5, 
            unitPrice: 8000, 
            totalPrice: 40000, 
            status: 'Terminé' 
          },
        ]);
      }

    } catch (error) {
      console.error('Erreur générale:', error);
      toast.error('Erreur lors du chargement des données');
      setIsOfflineMode(true);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'SUPER_ADMIN':
      case 'STRUCTURE': return '#2E7D32';
      case 'INSPIRATION':
      case 'INSPIRATION_CREATIVITY': return '#9C27B0';
      case 'CREATION':
      case 'OPERATIONS_DESIGN': return '#FF9800';
      case 'COMMUNICATION':
      case 'ADMIN_COMMUNICATION': return '#2196F3';
      default: return '#666';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'Super Admin';
      case 'STRUCTURE': return 'Structure';
      case 'INSPIRATION':
      case 'INSPIRATION_CREATIVITY': return 'Inspiration & Créativité';
      case 'CREATION':
      case 'OPERATIONS_DESIGN': return 'Opérations & Design';
      case 'COMMUNICATION':
      case 'ADMIN_COMMUNICATION': return 'Admin & Communication';
      default: return role;
    }
  };

  const getFamilyRoleLabel = (familyRole) => {
    switch (familyRole) {
      case 'STRUCTURE': return 'Structure';
      case 'INSPIRATION_CREATIVITY': return 'Inspiration & Créativité';
      case 'OPERATIONS_DESIGN': return 'Opérations & Design';
      case 'ADMIN_COMMUNICATION': return 'Admin & Communication';
      default: return familyRole;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const testImage = (url) => {
    console.log(`🖼️ Test image: ${url}`);
    return url;
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
              src={getMemberImage(user)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=${getRoleColor(user?.role).replace('#', '')}&color=fff`;
              }}
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, flexWrap: 'wrap' }}>
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
                {isOfflineMode && (
                  <Chip 
                    label="Mode local" 
                    size="small" 
                    color="warning" 
                    variant="outlined"
                    sx={{ ml: 1 }}
                  />
                )}
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

      {/* Mode local warning */}
      {isOfflineMode && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Mode local activé - Certaines données peuvent ne pas être à jour. 
          <Button size="small" onClick={loadData} sx={{ ml: 2 }}>
            Réessayer
          </Button>
        </Alert>
      )}

      {/* Tabs Navigation - AJOUT DE LA TAB PRODUCTION */}
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
            icon={<FactoryIcon />} 
            label="Équipe Production" 
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
                { label: 'Revenu (MGA)', value: `${new Intl.NumberFormat('fr-MG').format(stats.revenue)}`, icon: '💰', color: 'success' },
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
                  <strong>Votre mission :</strong> {user?.role === 'STRUCTURE' || user?.role === 'SUPER_ADMIN' ? 'Définir la stratégie et prendre les décisions clés.' :
                    user?.role === 'INSPIRATION' || user?.role === 'INSPIRATION_CREATIVITY' ? 'Apporter des idées innovantes et créatives.' :
                    user?.role === 'CREATION' || user?.role === 'OPERATIONS_DESIGN' ? 'Transformer les idées en réalisations concrètes.' :
                    'Assurer la communication et les relations avec nos partenaires.'}
                </Typography>
              </Alert>
            </Paper>
          </Grid>

          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 2, mt: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">📦 Commandes récentes</Typography>
                {isOfflineMode && (
                  <Chip label="Données exemple" size="small" color="warning" />
                )}
              </Box>
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
                  {recentOrders.map((o, index) => (
                    <TableRow key={index} hover sx={{ cursor: 'pointer' }}>
                      <TableCell>{o.id}</TableCell>
                      <TableCell>{o.clientName}</TableCell>
                      <TableCell>{new Date(o.orderDate).toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell>{o.totalQty}</TableCell>
                      <TableCell>{new Intl.NumberFormat('fr-MG').format(o.unitPrice)}</TableCell>
                      <TableCell>{new Intl.NumberFormat('fr-MG').format(o.totalPrice)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={o.status} 
                          size="small" 
                          color={o.status === 'Terminé' ? 'success' : 'warning'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  {recentOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Typography variant="body2" color="text.secondary">
                          Aucune commande récente
                        </Typography>
                      </TableCell>
                    </TableRow>
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FamilyRestroomIcon /> Équipe Familiale
                </Typography>
                {isOfflineMode && (
                  <Chip label="Mode local" color="warning" />
                )}
              </Box>
              <Typography variant="body1" color="text.secondary" paragraph>
                Découvrez les membres de l'équipe familiale et leurs rôles
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={3}>
                {familyMembers.map((member, index) => (
                  <Grid item xs={12} sm={6} md={3} key={member.id || index}>
                    <Card sx={{ 
                      height: '100%', 
                      borderLeft: `4px solid ${member.color || getRoleColor(member.role)}`,
                      transition: 'transform 0.3s',
                      opacity: member.isFallback ? 0.9 : 1,
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      }
                    }}>
                      {member.isFallback && (
                        <Chip 
                          label="Local"
                          size="small"
                          sx={{ 
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 1,
                            bgcolor: 'warning.light',
                            color: 'warning.dark'
                          }}
                        />
                      )}
                      
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Avatar 
                          src={getMemberImage(member)}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=${(member.color || getRoleColor(member.role)).replace('#', '')}&color=fff`;
                          }}
                          sx={{ 
                            width: 100, 
                            height: 100,
                            margin: '0 auto 16px',
                            border: `3px solid ${member.color || getRoleColor(member.role)}`,
                            objectFit: 'cover'
                          }}
                        />
                        
                        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 600, minHeight: 60 }}>
                          {member.name}
                          {member.isFallback && ' (Local)'}
                        </Typography>
                        
                        <Chip 
                          label={getFamilyRoleLabel(member.familyRole) || getRoleLabel(member.role)}
                          size="small"
                          sx={{ 
                            bgcolor: `${member.color || getRoleColor(member.role)}20`,
                            color: member.color || getRoleColor(member.role),
                            fontWeight: 600,
                            mb: 1
                          }}
                        />
                        
                        <Typography variant="body2" color="text.secondary" paragraph sx={{ minHeight: 60, mt: 1 }}>
                          {member.description}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: member.color || getRoleColor(member.role) }}>
                          ✉️ {member.email}
                        </Typography>
                        {member.phone && (
                          <Typography variant="body2" sx={{ fontStyle: 'italic', color: member.color || getRoleColor(member.role) }}>
                            📱 {member.phone}
                          </Typography>
                        )}
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
                  startIcon="🔄"
                >
                  Actualiser
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* NOUVELLE SECTION : ÉQUIPE DE PRODUCTION */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FactoryIcon /> Équipe de Production
                </Typography>
                <Chip label={`${IMAGES_CONFIG.PRODUCTION_TEAM.length} membres`} color="success" />
              </Box>
              <Typography variant="body1" color="text.secondary" paragraph>
                Notre équipe de production dévouée qui donne vie à vos projets
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              {/* Galerie de l'équipe de production */}
              <Grid container spacing={3}>
                {IMAGES_CONFIG.PRODUCTION_TEAM.map((member, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={member.id || index}>
                    <Card sx={{ 
                      height: '100%', 
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      }
                    }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Box sx={{ position: 'relative', mb: 2 }}>
                          <Avatar 
                            src={getImageUrl(member.imagePath)}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=4caf50&color=fff&size=400`;
                            }}
                            sx={{ 
                              width: 150, 
                              height: 150,
                              margin: '0 auto',
                              objectFit: 'cover',
                              border: `3px solid ${member.color || '#4CAF50'}`
                            }}
                          />
                        </Box>
                        
                        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 600 }}>
                          {member.name}
                        </Typography>
                        
                        <Chip 
                          label={member.role}
                          size="small"
                          sx={{ 
                            bgcolor: '#4caf5020',
                            color: '#4caf50',
                            fontWeight: 600,
                            mb: 2
                          }}
                        />
                        
                        <Typography variant="body2" color="text.secondary" sx={{ minHeight: 60 }}>
                          {member.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              
              {/* Images supplémentaires de l'atelier */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhotoLibraryIcon /> Notre atelier en images
                </Typography>
                <Grid container spacing={2}>
                  {[
                    {
                      title: 'Atelier de sérigraphie',
                      image: IMAGES_CONFIG.ATELIER,
                      description: 'Notre espace de travail dédié à la qualité'
                    },
                    {
                      title: 'Équipe au travail',
                      image: IMAGES_CONFIG.TEAM_FAMILY,
                      description: 'Collaboration et expertise au quotidien'
                    },
                    {
                      title: 'Inauguration',
                      image: IMAGES_CONFIG.INAUGURATION,
                      description: 'Le début de notre aventure familiale'
                    }
                  ].map((item, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="200"
                          image={item.image}
                          alt={item.title}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://via.placeholder.com/300x200/4caf50/ffffff?text=${encodeURIComponent(item.title)}`;
                          }}
                        />
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button 
                  variant="contained" 
                  color="success"
                  onClick={() => navigate('/gallery')}
                  startIcon={<PhotoLibraryIcon />}
                  size="large"
                  sx={{ mr: 2 }}
                >
                  Voir la galerie complète
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => navigate('/production')}
                  startIcon={<GroupsIcon />}
                  size="large"
                >
                  Page détaillée production
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {activeTab === 3 && (
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
                {[
                  { 
                    title: 'Tableau de bord', 
                    description: 'Vue d\'ensemble des activités', 
                    icon: '📊',
                    color: '#1976d2',
                    action: () => setActiveTab(0)
                  },
                  { 
                    title: 'Équipe Familiale', 
                    description: 'Informations sur l\'équipe familiale', 
                    icon: '👨‍👩‍👧‍👦',
                    color: '#9c27b0',
                    action: () => setActiveTab(1)
                  },
                  { 
                    title: 'Équipe Production', 
                    description: 'Notre équipe de production', 
                    icon: '🏭',
                    color: '#4caf50',
                    action: () => setActiveTab(2)
                  },
                  { 
                    title: 'Galerie', 
                    description: 'Photos d\'inauguration', 
                    icon: '🎉',
                    color: '#ff9800',
                    action: () => navigate('/gallery')
                  },
                  { 
                    title: 'Clients', 
                    description: 'Gestion des clients', 
                    icon: '👥',
                    color: '#2196f3',
                    action: () => navigate('/clients')
                  },
                  { 
                    title: 'Commandes', 
                    description: 'Suivi des commandes', 
                    icon: '📦',
                    color: '#673ab7',
                    action: () => navigate('/orders')
                  },
                  { 
                    title: 'Calendrier', 
                    description: 'Planning et rendez-vous', 
                    icon: '📅',
                    color: '#009688',
                    action: () => navigate('/calendar')
                  },
                  { 
                    title: 'Documents', 
                    description: 'Gestion des documents', 
                    icon: '📁',
                    color: '#795548',
                    action: () => navigate('/documents')
                  },
                ].map((tool, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
          {isOfflineMode && ' • Mode local activé'}
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;