// frontend/src/pages/FamilyPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FAMILY_MEMBERS, getImageUrl, getPlaceholderImage } from '../config/images';
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
      
      if (data && data.length > 0) {
        // Ajouter les images depuis la configuration
        const membersWithImages = data.map(member => {
          const memberConfig = FAMILY_MEMBERS.find(m => 
            m.name.toLowerCase() === member.name.toLowerCase() || 
            m.email.toLowerCase() === member.email.toLowerCase()
          );
          
          return {
            ...member,
            profileImage: memberConfig ? getImageUrl(memberConfig.imagePath) : 
                         `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=${getRoleColor(member.role).replace('#', '')}&color=fff`,
            color: memberConfig?.color || getRoleColor(member.role),
            description: memberConfig?.description || member.description || '',
            isFallback: false
          };
        });
        
        setMembers(membersWithImages);
        setFilteredMembers(membersWithImages);
      } else {
        // Fallback aux membres configurés
        console.warn('API retourne vide, utilisation des données locales');
        const fallbackMembers = FAMILY_MEMBERS.map(member => ({
          ...member,
          profileImage: getImageUrl(member.imagePath),
          isFallback: true
        }));
        setMembers(fallbackMembers);
        setFilteredMembers(fallbackMembers);
      }
      
    } catch (error) {
      console.warn('API non disponible, utilisation des membres par défaut:', error);
      // Fallback aux membres configurés
      const fallbackMembers = FAMILY_MEMBERS.map(member => ({
        ...member,
        profileImage: getImageUrl(member.imagePath),
        isFallback: true
      }));
      setMembers(fallbackMembers);
      setFilteredMembers(fallbackMembers);
      toast.info('Connexion au backend limitée - Affichage des membres par défaut');
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
      (member.email && member.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.description && member.description.toLowerCase().includes(searchTerm.toLowerCase()))
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

  const getRoleDescription = (role) => {
    switch (role) {
      case 'STRUCTURE': return 'Responsable de la direction stratégique et des décisions clés.';
      case 'INSPIRATION': return 'Apporte des idées innovantes et des perspectives créatives.';
      case 'CREATION': return 'Transforme les idées en réalisations concrètes et produits finis.';
      case 'COMMUNICATION': return 'Gère les relations externes et la communication.';
      default: return 'Membre actif de l\'équipe familiale.';
    }
  };

  const handleImageError = (e, member) => {
    console.warn('Image error for member:', member.name);
    // Remplacer par avatar généré
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=${member.color ? member.color.replace('#', '') : '2E7D32'}&color=fff`;
    e.target.src = avatarUrl;
    e.target.onerror = null;
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
    if (email) {
      window.location.href = `mailto:${email}`;
      toast.success(`Ouverture de l'email vers ${email}`);
    } else {
      toast.error('Aucune adresse email disponible');
    }
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
              {members.some(m => m.isFallback) && (
                <Typography variant="caption" color="warning.main" sx={{ display: 'block', mt: 0.5 }}>
                  
                </Typography>
              )}
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={loadMembers}
              startIcon={<span>🔄</span>}
            >
              Actualiser
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
          .map((member, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={member.id || index}>
              <Card sx={{ 
                height: '100%',
                position: 'relative',
                borderLeft: `4px solid ${member.color || getRoleColor(member.role)}`,
                transition: 'all 0.3s',
                opacity: member.isFallback ? 0.9 : 1,
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                }
              }}>
                {member.isFallback && (
                  <Chip 
                    label="Démo"
                    size="small"
                    sx={{ 
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 1,
                      bgcolor: 'warning.light',
                      color: 'warning.dark',
                      fontSize: '0.6rem'
                    }}
                  />
                )}
                
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
                        bgcolor: member.color || getRoleColor(member.role),
                        color: 'white',
                        fontWeight: 600,
                        px: 1,
                      }}
                    />
                  </Box>

                  {/* Avatar avec gestion d'erreur */}
                  <Avatar 
                    src={member.profileImage}
                    onError={(e) => handleImageError(e, member)}
                    sx={{ 
                      width: 100,
                      height: 100,
                      fontSize: '2rem',
                      margin: '0 auto 16px',
                      border: `3px solid ${member.color || getRoleColor(member.role)}`,
                      objectFit: 'cover'
                    }}
                  />

                  {/* Name */}
                  <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 600, minHeight: 60 }}>
                    {member.name}
                    {member.isFallback && ' (Local)'}
                  </Typography>

                  {/* Description */}
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ 
                    minHeight: 60,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {member.description || 'Membre de l\'équipe ByGagoos-Ink'}
                  </Typography>

                  {/* Email */}
                  {member.email && (
                    <Typography variant="body2" sx={{ 
                      fontStyle: 'italic',
                      color: member.color || getRoleColor(member.role),
                      mb: 2,
                      wordBreak: 'break-word'
                    }}>
                      ✉️ {member.email}
                    </Typography>
                  )}

                  {/* Actions */}
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleViewDetails(member)}
                    >
                      Voir détails
                    </Button>
                    {member.email && (
                      <Button 
                        variant="contained" 
                        size="small"
                        sx={{ bgcolor: member.color || getRoleColor(member.role) }}
                        onClick={() => handleContact(member.email)}
                      >
                        Contacter
                      </Button>
                    )}
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
              borderBottom: `4px solid ${selectedMember.color || getRoleColor(selectedMember.role)}`,
              pb: 2
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar 
                  src={selectedMember.profileImage}
                  onError={(e) => handleImageError(e, selectedMember)}
                  sx={{ 
                    width: 80,
                    height: 80,
                    border: `3px solid ${selectedMember.color || getRoleColor(selectedMember.role)}`,
                    objectFit: 'cover'
                  }}
                />
                <Box>
                  <Typography variant="h5">
                    {selectedMember.name}
                    {selectedMember.isFallback && ' (Local)'}
                  </Typography>
                  <Chip 
                    label={selectedMember.role}
                    size="small"
                    sx={{ 
                      bgcolor: selectedMember.color || getRoleColor(selectedMember.role),
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
                  {selectedMember.description || 'Membre actif de l\'équipe familiale.'}
                </Typography>

                <Divider sx={{ my: 3 }} />

                {selectedMember.email && (
                  <>
                    <Typography variant="h6" gutterBottom color="primary">
                      📞 Contact
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <EmailIcon color="action" />
                          <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                            {selectedMember.email}
                          </Typography>
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
                  </>
                )}

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
                  {!['STRUCTURE', 'INSPIRATION', 'CREATION', 'COMMUNICATION'].includes(selectedMember.role) && (
                    <li><Typography variant="body2">Participation aux projets d'entreprise</Typography></li>
                  )}
                </ul>
              </Box>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 0 }}>
              <Button onClick={handleCloseDialog}>
                Fermer
              </Button>
              {selectedMember.email && (
                <Button 
                  variant="contained" 
                  sx={{ bgcolor: selectedMember.color || getRoleColor(selectedMember.role) }}
                  onClick={() => handleContact(selectedMember.email)}
                  startIcon={<EmailIcon />}
                >
                  Envoyer un email
                </Button>
              )}
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
          {members.some(m => m.isFallback) && ' • Mode démo actif'}
        </Typography>
      </Box>
    </Container>
  );
};

export default FamilyPage;