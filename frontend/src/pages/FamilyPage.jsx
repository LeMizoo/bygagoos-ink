// frontend/src/pages/FamilyPage.jsx
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
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { toast } from 'react-hot-toast';

const FamilyPage = () => {
  const { user, getFamilyMembers, logout } = useAuth();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [searchTerm, members]);

  const loadMembers = async () => {
    setLoading(true);
    try {
      const data = await getFamilyMembers();
      setMembers(data);
      setFilteredMembers(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des membres');
    } finally {
      setLoading(false);
    }
  };

  const filterMembers = () => {
    if (!searchTerm.trim()) {
      setFilteredMembers(members);
      return;
    }

    const filtered = members.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredMembers(filtered);
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

  const getRoleDescription = (role) => {
    switch (role) {
      case 'STRUCTURE': return 'Responsable de la direction stratégique et des décisions clés.';
      case 'INSPIRATION': return 'Apporte des idées innovantes et des perspectives créatives.';
      case 'CREATION': return 'Transforme les idées en réalisations concrètes et produits finis.';
      case 'COMMUNICATION': return 'Gère les relations externes et la communication.';
      default: return 'Membre actif de l\'équipe familiale.';
    }
  };

  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedMember(null);
  };

  const handleContact = (email) => {
    window.location.href = `mailto:${email}`;
    toast.success(`Ouverture de l'email vers ${email}`);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
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
            <IconButton onClick={() => navigate('/dashboard')}>
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: '#2E7D32' }}>
                👨‍👩‍👧‍👦 Équipe Familiale
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {members.length} membres • Une famille, une vision
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => toast.info('Fonctionnalité en développement')}
            >
              👥 Réunion d'équipe
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Search and Filter */}
      <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Rechercher un membre par nom, rôle ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Tous les membres" />
              <Tab label="Structure" />
              <Tab label="Inspiration" />
              <Tab label="Création" />
              <Tab label="Communication" />
            </Tabs>
          </Grid>
        </Grid>
      </Paper>

      {/* Members Grid */}
      <Grid container spacing={3}>
        {filteredMembers
          .filter(member => activeTab === 0 || member.role === ['STRUCTURE', 'INSPIRATION', 'CREATION', 'COMMUNICATION'][activeTab - 1])
          .map((member) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
              <Card sx={{ 
                height: '100%',
                position: 'relative',
                borderLeft: `4px solid ${getRoleColor(member.role)}`,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                }
              }}>
                <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                  {/* Role Badge */}
                  <Box sx={{ 
                    position: 'absolute',
                    top: -15,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}>
                    <Chip 
                      label={member.role}
                      size="small"
                      sx={{ 
                        bgcolor: getRoleColor(member.role),
                        color: 'white',
                        fontWeight: 600,
                        px: 1,
                      }}
                    />
                  </Box>

                  {/* Avatar with real image */}
                  <Avatar 
                    src={member.profileImage}
                    onError={(e) => {
                      e.target.src = member.image;
                    }}
                    sx={{ 
                      width: 100,
                      height: 100,
                      fontSize: '2rem',
                      margin: '0 auto 16px',
                      border: `3px solid ${getRoleColor(member.role)}`,
                      objectFit: 'cover'
                    }}
                  />

                  {/* Name */}
                  <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 600, minHeight: 60 }}>
                    {member.name}
                  </Typography>

                  {/* Description */}
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ 
                    minHeight: 60,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {member.description}
                  </Typography>

                  {/* Email */}
                  <Typography variant="body2" sx={{ 
                    fontStyle: 'italic',
                    color: getRoleColor(member.role),
                    mb: 2
                  }}>
                    ✉️ {member.email}
                  </Typography>

                  {/* Actions */}
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleViewDetails(member)}
                    >
                      Voir détails
                    </Button>
                    <Button 
                      variant="contained" 
                      size="small"
                      sx={{ bgcolor: getRoleColor(member.role) }}
                      onClick={() => handleContact(member.email)}
                    >
                      Contacter
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <Paper elevation={2} sx={{ p: 6, mt: 3, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            🕵️ Aucun membre trouvé
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Essayez avec d'autres termes de recherche ou modifiez les filtres.
          </Typography>
          <Button 
            variant="outlined" 
            sx={{ mt: 2 }}
            onClick={() => {
              setSearchTerm('');
              setActiveTab(0);
            }}
          >
            Réinitialiser la recherche
          </Button>
        </Paper>
      )}

      {/* Member Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedMember && (
          <>
            <DialogTitle sx={{ 
              borderBottom: `4px solid ${getRoleColor(selectedMember.role)}`,
              pb: 2
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar 
                  src={selectedMember.profileImage}
                  onError={(e) => {
                    e.target.src = selectedMember.image;
                  }}
                  sx={{ 
                    width: 80,
                    height: 80,
                    border: `3px solid ${getRoleColor(selectedMember.role)}`,
                    objectFit: 'cover'
                  }}
                />
                <Box>
                  <Typography variant="h5">{selectedMember.name}</Typography>
                  <Chip 
                    label={selectedMember.role}
                    size="small"
                    sx={{ 
                      bgcolor: getRoleColor(selectedMember.role),
                      color: 'white',
                      fontWeight: 600,
                      mt: 1
                    }}
                  />
                </Box>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  📖 Description du rôle
                </Typography>
                <Typography variant="body1" paragraph>
                  {getRoleDescription(selectedMember.role)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedMember.description}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom color="primary">
                  📞 Contact
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <EmailIcon color="action" />
                      <Typography variant="body1">{selectedMember.email}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <WorkIcon color="action" />
                      <Typography variant="body1">Rôle : {selectedMember.role}</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom color="primary">
                  🎯 Responsabilités
                </Typography>
                <ul style={{ paddingLeft: '20px' }}>
                  {selectedMember.role === 'STRUCTURE' && (
                    <>
                      <li><Typography variant="body2">Définition de la stratégie d'entreprise</Typography></li>
                      <li><Typography variant="body2">Prise de décisions importantes</Typography></li>
                      <li><Typography variant="body2">Gestion des ressources</Typography></li>
                      <li><Typography variant="body2">Planification à long terme</Typography></li>
                    </>
                  )}
                  {selectedMember.role === 'INSPIRATION' && (
                    <>
                      <li><Typography variant="body2">Recherche de nouvelles idées</Typography></li>
                      <li><Typography variant="body2">Développement créatif</Typography></li>
                      <li><Typography variant="body2">Veille concurrentielle</Typography></li>
                      <li><Typography variant="body2">Animation des brainstormings</Typography></li>
                    </>
                  )}
                  {selectedMember.role === 'CREATION' && (
                    <>
                      <li><Typography variant="body2">Production des commandes</Typography></li>
                      <li><Typography variant="body2">Assurance qualité</Typography></li>
                      <li><Typography variant="body2">Optimisation des processus</Typography></li>
                      <li><Typography variant="body2">Gestion des stocks</Typography></li>
                    </>
                  )}
                  {selectedMember.role === 'COMMUNICATION' && (
                    <>
                      <li><Typography variant="body2">Gestion des réseaux sociaux</Typography></li>
                      <li><Typography variant="body2">Relation client</Typography></li>
                      <li><Typography variant="body2">Communication marketing</Typography></li>
                      <li><Typography variant="body2">Organisation d'événements</Typography></li>
                    </>
                  )}
                </ul>
              </Box>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 0 }}>
              <Button onClick={handleCloseDialog}>
                Fermer
              </Button>
              <Button 
                variant="contained" 
                sx={{ bgcolor: getRoleColor(selectedMember.role) }}
                onClick={() => handleContact(selectedMember.email)}
                startIcon={<EmailIcon />}
              >
                Envoyer un email
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Footer */}
      <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} ByGagoos-Ink - Tous les membres sont connectés par des liens familiaux forts
        </Typography>
        <Typography variant="caption" color="text.secondary" align="center" sx={{ display: 'block', mt: 1 }}>
          "L'union fait la force" • {members.length} membres • Dernière mise à jour : aujourd'hui
        </Typography>
      </Box>
    </Container>
  );
};

export default FamilyPage;