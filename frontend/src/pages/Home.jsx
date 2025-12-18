// frontend/src/pages/Home.jsx - VERSION CORRIGÉE
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FAMILY_MEMBERS, getMemberImage } from '../config/images.js'; // CHANGÉ
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  Divider,
  Paper,
} from '@mui/material';
import { toast } from 'react-hot-toast';

const Home = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = () => {
    setLoading(true);
    
    // Utiliser les données locales par défaut
    const defaultMembers = FAMILY_MEMBERS.map(member => ({
      ...member,
      profileImage: getMemberImage(member.name)
    }));
    
    setMembers(defaultMembers);
    setLoading(false);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'STRUCTURE': return '#2E7D32';
      case 'INSPIRATION': return '#9C27B0';
      case 'CREATION': return '#FF9800';
      case 'COMMUNICATION': return '#2196F3';
      default: return '#666';
    }
  };

  const handleImageError = (e, member) => {
    console.warn('Image error for member:', member.name);
    e.target.src = getMemberImage(member.name);
    e.target.onerror = null;
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography>Chargement...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2, bgcolor: '#2E7D32', color: 'white' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            👨‍👩‍👧‍👦 ByGagoos-Ink
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Entreprise Familiale de Sérigraphie
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            Une famille unie au service de la créativité et de l'excellence. 
            De la conception à la réalisation, chaque membre apporte son talent unique.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {isAuthenticated ? (
              <>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  onClick={handleDashboardClick}
                >
                  📊 Tableau de bord
                </Button>
                <Button 
                  variant="outlined" 
                  sx={{ color: 'white', borderColor: 'white' }}
                  size="large"
                  onClick={() => navigate('/family')}
                >
                  👥 Voir l'équipe
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  onClick={handleLoginClick}
                >
                  🔐 Se connecter
                </Button>
                <Button 
                  variant="outlined" 
                  sx={{ color: 'white', borderColor: 'white' }}
                  size="large"
                  onClick={() => navigate('/family')}
                >
                  👁️ Accéder à la Plateforme
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Présentation de l'équipe */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600, color: '#2E7D32', mb: 3 }}>
          Notre Équipe Familiale
        </Typography>
        
        <Grid container spacing={3}>
          {members.slice(0, 4).map((member) => (
            <Grid item xs={12} sm={6} md={3} key={member.id}>
              <Card sx={{ 
                height: '100%',
                borderLeft: `4px solid ${member.color || getRoleColor(member.role)}`,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                }
              }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar 
                    src={member.profileImage}
                    onError={(e) => handleImageError(e, member)}
                    sx={{ 
                      width: 80,
                      height: 80,
                      margin: '0 auto 16px',
                      border: `3px solid ${member.color || getRoleColor(member.role)}`,
                      objectFit: 'cover'
                    }}
                  />
                  
                  <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 600 }}>
                    {member.name}
                  </Typography>
                  
                  <Chip 
                    label={member.role}
                    size="small"
                    sx={{ 
                      bgcolor: `${member.color || getRoleColor(member.role)}20`,
                      color: member.color || getRoleColor(member.role),
                      fontWeight: 600,
                      mb: 1
                    }}
                  />
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, minHeight: 60 }}>
                    {member.description}
                  </Typography>
                  
                  <Typography variant="caption" sx={{ fontStyle: 'italic', color: '#666' }}>
                    {member.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Valeurs */}
      <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600, color: '#2E7D32', mb: 4 }}>
          Nos Valeurs
        </Typography>
        
        <Grid container spacing={3}>
          {[
            { title: '👨‍👩‍👧‍👦 Famille', desc: 'Le lien familial est notre force motrice et notre fondation.' },
            { title: '🎨 Créativité', desc: 'L\'innovation et l\'originalité dans chaque projet.' },
            { title: '✅ Qualité', desc: 'L\'excellence dans chaque détail, de la conception à la livraison.' },
            { title: '🤝 Confiance', desc: 'Des relations durables basées sur la transparence et le respect.' },
          ].map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#2E7D32' }}>
                  {value.title}
                </Typography>
                <Typography variant="body1">
                  {value.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Footer */}
      <Box sx={{ mt: 6, pt: 3, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} ByGagoos-Ink - Tous droits réservés
        </Typography>
        <Typography variant="caption" color="text.secondary" align="center" sx={{ display: 'block', mt: 1 }}>
          Made with ❤️ in Madagascar • contact@bygagoos-ink.mg
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;