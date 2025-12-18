// frontend/src/pages/ProductionTeam.jsx
import React from 'react';
import { 
  Container, Grid, Card, CardContent, CardMedia, 
  Typography, Box, Chip, Paper, Avatar 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getImageUrl, getPlaceholderImage } from '../config/images';

// Équipe de production - DÉPLACÉ de images.js pour éviter la duplication
const PRODUCTION_TEAM = [
  {
    id: 101,
    name: 'Équipe Production Sérigraphie',
    role: 'PRODUCTION',
    color: '#D32F2F',
    emoji: '🏭',
    description: 'Équipe dédiée à la production sérigraphique',
    imagePath: '/production/equipe-serigraphie.jpg',
    isGroup: true,
    membersCount: 6
  },
  {
    id: 102,
    name: 'Marcel',
    role: 'CHEF D\'ATELIER',
    color: '#F57C00',
    emoji: '👨‍🏭',
    description: 'Responsable de l\'atelier de sérigraphie',
    imagePath: '/production/marcel-prod.jpg'
  },
  {
    id: 103,
    name: 'Marcelin',
    role: 'OPÉRATEUR SÉNIOR',
    color: '#7B1FA2',
    emoji: '👨‍🔧',
    description: 'Spécialiste impression textile',
    imagePath: '/production/marcelin-prod.jpg'
  },
  {
    id: 104,
    name: 'Mbin',
    role: 'TECHNICIENNE IMPRESSION',
    color: '#0288D1',
    emoji: '👩‍🔧',
    description: 'Responsable préparation des écrans',
    imagePath: '/production/mbin-prod.jpg'
  },
  {
    id: 105,
    name: 'Miadrisoa',
    role: 'CONTRÔLE QUALITÉ',
    color: '#388E3C',
    emoji: '👩‍🔬',
    description: 'Assure l\'excellence de chaque production',
    imagePath: '/production/miadrisoa-prod.jpg'
  },
  {
    id: 106,
    name: 'Ntsoa',
    role: 'FINITIONS & PACKAGING',
    color: '#5D4037',
    emoji: '📦',
    description: 'Responsable des finitions et emballages',
    imagePath: '/production/ntsoa-prod.jpg'
  }
];

const ProductionTeam = () => {
  const navigate = useNavigate();

  const handleImageError = (e, member) => {
    console.warn('Image error for:', member.name);
    e.target.src = getPlaceholderImage(member.name.charAt(0), member.color);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* En-tête */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2, bgcolor: '#f8f9fa' }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary" fontWeight="bold">
          🏭 Équipe de Production Sérigraphique
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Notre équipe passionnée dédiée à l'excellence de la sérigraphie
        </Typography>
        
        {/* Photo de l'atelier */}
        <Box sx={{ mt: 3, position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
          <img 
            src={getImageUrl('/production/atelier-serigraphie.jpg')}
            alt="Atelier de sérigraphie ByGagoos-Ink"
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            onError={(e) => handleImageError(e, { name: 'Atelier', color: '#D32F2F' })}
          />
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'rgba(0,0,0,0.7)',
            color: 'white',
            p: 2
          }}>
            <Typography variant="h5">Notre atelier de production</Typography>
            <Typography variant="body2">Équipé des dernières technologies de sérigraphie</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Équipe complète */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom color="#D32F2F">
          👥 Notre Équipe Complète
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Rencontrez les artisans qui donnent vie à vos créations
        </Typography>
        
        <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', maxWidth: '800px', margin: '0 auto' }}>
          <img 
            src={getImageUrl('/production/equipe-serigraphie.jpg')}
            alt="Équipe de production ByGagoos-Ink"
            style={{ width: '100%', height: '500px', objectFit: 'cover' }}
            onError={(e) => handleImageError(e, { name: 'Équipe', color: '#D32F2F' })}
          />
          <Chip 
            label={`${PRODUCTION_TEAM.length} membres`}
            sx={{ 
              position: 'absolute',
              top: 16,
              right: 16,
              bgcolor: '#D32F2F',
              color: 'white',
              fontWeight: 'bold'
            }}
          />
        </Box>
      </Box>

      {/* Membres individuels */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4, color: '#D32F2F' }}>
        👨‍🔧 Nos Spécialistes
      </Typography>
      
      <Grid container spacing={4}>
        {PRODUCTION_TEAM.filter(member => !member.isGroup).map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.id}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 6
              }
            }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={getImageUrl(member.imagePath)}
                  alt={member.name}
                  onError={(e) => handleImageError(e, member)}
                  sx={{ objectFit: 'cover' }}
                />
                <Chip 
                  label={member.role}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    bgcolor: member.color,
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
              </Box>
              
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {member.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <Avatar sx={{ bgcolor: member.color, width: 32, height: 32 }}>
                    {member.emoji}
                  </Avatar>
                  <Typography variant="caption" color="text.secondary">
                    {member.role}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Process de production */}
      <Paper elevation={2} sx={{ p: 4, mt: 6, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom color="primary">
          🔧 Notre Processus de Production
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {[
            { step: '1', title: 'Préparation', desc: 'Préparation des écrans et encres' },
            { step: '2', title: 'Impression', desc: 'Impression sur textile avec nos presses' },
            { step: '3', title: 'Séchage', desc: 'Fixation thermique des encres' },
            { step: '4', title: 'Contrôle', desc: 'Contrôle qualité rigoureux' },
          ].map((step) => (
            <Grid item xs={12} sm={6} md={3} key={step.step}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Avatar sx={{ 
                  bgcolor: '#2E7D32', 
                  width: 60, 
                  height: 60, 
                  margin: '0 auto 16px',
                  fontSize: '1.5rem'
                }}>
                  {step.step}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Galeries photos supplémentaires */}
      <Paper elevation={2} sx={{ p: 4, mt: 6, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom color="primary">
          📸 Galeries Supplémentaires
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          Découvrez notre équipe en action à travers différentes situations de travail
        </Typography>

        <Grid container spacing={3}>
          {[
            { title: 'Équipe en Action - Groupe 1', image: '/production/equipe-prod-02.jpg' },
            { title: 'Équipe en Action - Groupe 2', image: '/production/equipe-prod-03.jpg' },
            { title: 'Équipe en Action - Groupe 3', image: '/production/equipe-prod-04.jpg' },
            { title: 'Équipe en Action - Groupe 4', image: '/production/equipe-prod-06.jpg' },
            { title: 'Équipe en Action - Groupe 5', image: '/production/equipe-prod-07.jpg' },
            { title: 'Équipe en Action - Groupe 6', image: '/production/equipe-prod-08.jpg' },
          ].map((gallery, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/gallery')}>
                <CardMedia
                  component="img"
                  height="200"
                  image={getImageUrl(gallery.image)}
                  alt={gallery.title}
                  onError={(e) => handleImageError(e, { name: gallery.title, color: '#2E7D32' })}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="subtitle1">{gallery.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Cliquez pour voir dans la galerie
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductionTeam;