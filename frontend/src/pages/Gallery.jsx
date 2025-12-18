// frontend/src/pages/Gallery.jsx
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  AppBar,
  Toolbar,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CelebrationIcon from '@mui/icons-material/Celebration';
import PeopleIcon from '@mui/icons-material/People';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FactoryIcon from '@mui/icons-material/Factory';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import PrintIcon from '@mui/icons-material/Print';
import { getImageUrl, getPlaceholderImage } from '../config/images';

const Gallery = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState('all');

  // Données de l'inauguration
  const INAUGURATION_DATE = "18 mai 2025";
  const INAUGURATION_LOCATION = "Atelier ByGagoos-Ink, Antananarivo";

  // Galerie des photos réelles d'inauguration
  const INAUGURATION_GALLERY = [
    // Photos de l'atelier et équipement
    {
      id: 1,
      title: "Notre Atelier de Sérigraphie",
      description: "L'espace de production avec nos équipements professionnels",
      date: "18 mai 2025",
      category: "atelier",
      tags: ["atelier", "production", "équipement"],
      imagePath: "/production/atelier-serigraphie.jpg",
      featured: true,
      icon: <FactoryIcon />
    },
    {
      id: 2,
      title: "Équipe de Production Complète",
      description: "L'équipe technique réunie pour l'inauguration",
      date: "18 mai 2025",
      category: "equipe",
      tags: ["équipe", "production", "techniciens"],
      imagePath: "/production/equipe-serigraphie.jpg",
      featured: true,
      icon: <GroupsIcon />
    },
    
    // Photos individuelles de l'équipe
    {
      id: 3,
      title: "Marcel - Chef d'Atelier",
      description: "Responsable de la production et de la qualité",
      date: "18 mai 2025",
      category: "personnel",
      tags: ["chef", "atelier", "responsable"],
      imagePath: "/production/marcel-prod.jpg",
      icon: <PersonIcon />
    },
    {
      id: 4,
      title: "Marcelin - Opérateur Sénior",
      description: "Spécialiste impression textile et machines",
      date: "18 mai 2025",
      category: "personnel",
      tags: ["opérateur", "spécialiste", "machines"],
      imagePath: "/production/marcelin-prod.jpg",
      icon: <PrintIcon />
    },
    {
      id: 5,
      title: "Mbin - Technicienne Impression",
      description: "Responsable de la préparation des écrans",
      date: "18 mai 2025",
      category: "personnel",
      tags: ["technicienne", "écrans", "préparation"],
      imagePath: "/production/mbin-prod.jpg",
      icon: <PersonIcon />
    },
    {
      id: 6,
      title: "Miadrisoa - Contrôle Qualité",
      description: "Assure l'excellence de chaque production",
      date: "18 mai 2025",
      category: "personnel",
      tags: ["qualité", "contrôle", "excellence"],
      imagePath: "/production/miadrisoa-prod.jpg",
      icon: <PersonIcon />
    },
    {
      id: 7,
      title: "Ntsoa - Finitions & Packaging",
      description: "Responsable des finitions et emballages",
      date: "18 mai 2025",
      category: "personnel",
      tags: ["finitions", "packaging", "emballage"],
      imagePath: "/production/ntsoa-prod.jpg",
      icon: <PersonIcon />
    },
    
    // Photos de groupe de l'équipe
    {
      id: 8,
      title: "Équipe en Action - Groupe 1",
      description: "L'équipe lors d'une démonstration d'impression",
      date: "18 mai 2025",
      category: "equipe",
      tags: ["action", "démonstration", "groupe"],
      imagePath: "/production/equipe-prod-02.jpg"
    },
    {
      id: 9,
      title: "Équipe en Action - Groupe 2",
      description: "Concentration lors d'une production importante",
      date: "18 mai 2025",
      category: "equipe",
      tags: ["concentration", "production", "sérieux"],
      imagePath: "/production/equipe-prod-03.jpg"
    },
    {
      id: 10,
      title: "Équipe en Action - Groupe 3",
      description: "Collaboration sur un projet complexe",
      date: "18 mai 2025",
      category: "equipe",
      tags: ["collaboration", "projet", "complexe"],
      imagePath: "/production/equipe-prod-04.jpg"
    },
    {
      id: 11,
      title: "Équipe en Action - Groupe 4",
      description: "Réunion technique pour optimisation des processus",
      date: "18 mai 2025",
      category: "equipe",
      tags: ["réunion", "technique", "optimisation"],
      imagePath: "/production/equipe-prod-06.jpg"
    },
    {
      id: 12,
      title: "Équipe en Action - Groupe 5",
      description: "Formation sur nouvelles techniques d'impression",
      date: "18 mai 2025",
      category: "equipe",
      tags: ["formation", "techniques", "apprentissage"],
      imagePath: "/production/equipe-prod-07.jpg"
    },
    {
      id: 13,
      title: "Équipe en Action - Groupe 6",
      description: "Célébration d'une commande importante réussie",
      date: "18 mai 2025",
      category: "equipe",
      tags: ["célébration", "succès", "commande"],
      imagePath: "/production/equipe-prod-08.jpg",
      featured: true
    },
    
    // Photos de la famille fondatrice
    {
      id: 14,
      title: "Tovoniaina RAHENDRISON - Fondateur",
      description: "Directeur & Stratège, responsable de la vision d'entreprise",
      date: "18 mai 2025",
      category: "famille",
      tags: ["fondateur", "directeur", "vision"],
      imagePath: "/profiles/tovoniaina.jpg",
      featured: true
    },
    {
      id: 15,
      title: "Volatiana RANDRIANARISOA - Co-fondatrice",
      description: "Source d'inspiration et d'innovation créative",
      date: "18 mai 2025",
      category: "famille",
      tags: ["co-fondatrice", "inspiration", "créativité"],
      imagePath: "/profiles/volatiana.jpg"
    },
    {
      id: 16,
      title: "Miantsatiana RAHENDRISON - Responsable Production",
      description: "Garant de la qualité et de la réalisation",
      date: "18 mai 2025",
      category: "famille",
      tags: ["production", "qualité", "réalisation"],
      imagePath: "/profiles/miantsatiana.jpg"
    },
    {
      id: 17,
      title: "Tia Faniry RAHENDRISON - Responsable Communication",
      description: "Marketing, relations clients et développement",
      date: "18 mai 2025",
      category: "famille",
      tags: ["communication", "marketing", "clients"],
      imagePath: "/profiles/tia-faniry.jpg"
    }
  ];

  // Photos vedettes
  const FEATURED_PHOTOS = INAUGURATION_GALLERY.filter(photo => photo.featured);

  // Catégories disponibles basées sur vos photos
  const CATEGORIES = [
    { id: 'all', label: 'Toutes les photos', count: INAUGURATION_GALLERY.length },
    { id: 'atelier', label: 'Atelier', count: INAUGURATION_GALLERY.filter(p => p.category === 'atelier').length },
    { id: 'equipe', label: 'Équipe', count: INAUGURATION_GALLERY.filter(p => p.category === 'equipe').length },
    { id: 'personnel', label: 'Personnel', count: INAUGURATION_GALLERY.filter(p => p.category === 'personnel').length },
    { id: 'famille', label: 'Famille', count: INAUGURATION_GALLERY.filter(p => p.category === 'famille').length },
  ];

  // Filtrer les photos
  const filteredPhotos = filter === 'all' 
    ? INAUGURATION_GALLERY 
    : INAUGURATION_GALLERY.filter(photo => photo.category === filter);

  const handleImageClick = (photo, index) => {
    setSelectedImage(photo);
    setCurrentIndex(index);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedImage(filteredPhotos[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedImage(filteredPhotos[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  const handleImageError = (e, photo) => {
    console.warn('Image error for:', photo.title);
    e.target.src = getPlaceholderImage('📸', '#2E7D32');
  };

  // Fonction pour obtenir l'icône de catégorie
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'atelier': return <FactoryIcon />;
      case 'equipe': return <GroupsIcon />;
      case 'personnel': return <PersonIcon />;
      case 'famille': return <PeopleIcon />;
      default: return <CameraAltIcon />;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* En-tête de la galerie */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, right: 0, opacity: 0.1 }}>
          <CelebrationIcon sx={{ fontSize: 200 }} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={() => navigate('/')} sx={{ color: 'white', mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h3" component="h1" fontWeight="bold">
            🎉 Inauguration de ByGagoos-Ink
          </Typography>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ opacity: 0.9 }}>
          Lancement officiel de notre atelier de sérigraphie - 18 mai 2025
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <CalendarTodayIcon />
              <Box>
                <Typography variant="subtitle2">DATE HISTORIQUE</Typography>
                <Typography variant="h6">{INAUGURATION_DATE}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LocationOnIcon />
              <Box>
                <Typography variant="subtitle2">LIEU</Typography>
                <Typography variant="h6">{INAUGURATION_LOCATION}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <PeopleIcon />
              <Box>
                <Typography variant="subtitle2">ÉQUIPE</Typography>
                <Typography variant="h6">Famille + {INAUGURATION_GALLERY.filter(p => p.category === 'personnel').length} techniciens</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CameraAltIcon />
              <Box>
                <Typography variant="subtitle2">GALERIE</Typography>
                <Typography variant="h6">{INAUGURATION_GALLERY.length} photos officielles</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="body1" sx={{ mt: 3, opacity: 0.9, fontStyle: 'italic' }}>
          "Le début d'une aventure exceptionnelle : réunir tradition familiale et excellence technique"
        </Typography>
      </Paper>

      {/* Introduction */}
      <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom color="primary">
              🏭 Notre Histoire Commence Ici
            </Typography>
            <Typography variant="body1" paragraph>
              Le <strong>18 mai 2025</strong> marque une date historique pour la famille ByGagoos. 
              Après des mois de préparation, nous avons officiellement inauguré notre atelier de sérigraphie 
              professionnelle, combinant savoir-faire ancestral et technologies modernes.
            </Typography>
            <Typography variant="body1" paragraph>
              Cette galerie retrace les moments forts de cette journée mémorable : de la présentation 
              de notre équipe technique au dévoilement de nos installations de production, en passant 
              par les premières impressions réalisées devant nos invités.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ 
                width: 120, 
                height: 120, 
                bgcolor: '#2E7D32',
                margin: '0 auto',
                fontSize: '3rem'
              }}>
                🎨
              </Avatar>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Artisanat & Innovation
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Photos vedettes */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom color="primary">
          🌟 Moments Incontournables
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Les photos emblématiques de notre inauguration
        </Typography>

        <Grid container spacing={3}>
          {FEATURED_PHOTOS.map((photo) => (
            <Grid item xs={12} md={6} key={photo.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
                onClick={() => handleImageClick(photo, INAUGURATION_GALLERY.indexOf(photo))}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={getImageUrl(photo.imagePath)}
                    alt={photo.title}
                    onError={(e) => handleImageError(e, photo)}
                    sx={{ objectFit: 'cover' }}
                  />
                  <Chip
                    label="Vedette"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      bgcolor: '#FF9800',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                  <Box sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    bgcolor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    p: 1,
                    borderRadius: 1
                  }}>
                    {photo.icon}
                  </Box>
                </Box>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {photo.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {photo.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {photo.tags.map((tag, index) => (
                      <Chip 
                        key={index}
                        label={`#${tag}`}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Filtres de catégories */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          🔍 Explorer par Thème
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          {CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={filter === category.id ? "contained" : "outlined"}
              onClick={() => setFilter(category.id)}
              startIcon={
                <Avatar sx={{ 
                  width: 24, 
                  height: 24, 
                  bgcolor: filter === category.id ? 'white' : '#2E7D32',
                  color: filter === category.id ? '#2E7D32' : 'white'
                }}>
                  {getCategoryIcon(category.id)}
                </Avatar>
              }
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                bgcolor: filter === category.id ? '#2E7D32' : 'transparent',
                color: filter === category.id ? 'white' : 'inherit',
                '&:hover': {
                  bgcolor: filter === category.id ? '#1B5E20' : 'rgba(46, 125, 50, 0.1)'
                }
              }}
            >
              {category.label} ({category.count})
            </Button>
          ))}
        </Box>
      </Paper>

      {/* Galerie complète */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" color="primary">
              📷 Galerie Complète
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filter === 'all' ? 'Toutes les photos' : CATEGORIES.find(c => c.id === filter)?.label}
            </Typography>
          </Box>
          <Chip 
            label={`${filteredPhotos.length} photos`}
            color="primary"
            variant="outlined"
          />
        </Box>

        <Grid container spacing={3}>
          {filteredPhotos.map((photo, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 4,
                    '& .category-icon': {
                      transform: 'scale(1.1)'
                    }
                  }
                }}
                onClick={() => handleImageClick(photo, INAUGURATION_GALLERY.indexOf(photo))}
              >
                <Box sx={{ position: 'relative', paddingTop: '75%' }}>
                  <CardMedia
                    component="img"
                    image={getImageUrl(photo.imagePath)}
                    alt={photo.title}
                    onError={(e) => handleImageError(e, photo)}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <Box sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'rgba(46, 125, 50, 0.8)',
                    color: 'white',
                    borderRadius: '50%',
                    p: 0.5,
                    className: 'category-icon',
                    transition: 'transform 0.2s'
                  }}>
                    {photo.icon || getCategoryIcon(photo.category)}
                  </Box>
                </Box>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle1" component="div" noWrap>
                    {photo.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {photo.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Présentation de l'équipe */}
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          👥 Notre Équipe Technique
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          Rencontrez les professionnels qui font l'excellence de ByGagoos-Ink
        </Typography>

        <Grid container spacing={3}>
          {INAUGURATION_GALLERY.filter(p => p.category === 'personnel').map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={getImageUrl(member.imagePath)}
                  alt={member.title}
                  onError={(e) => handleImageError(e, member)}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {member.title.split(' - ')[0]}
                  </Typography>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    {member.title.split(' - ')[1]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Timeline de l'inauguration */}
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          ⏱️ Programme de la Journée
        </Typography>
        
        <Box sx={{ position: 'relative', mt: 4, pl: 3, borderLeft: '3px solid #2E7D32' }}>
          {[
            { time: '08:30', title: 'Arrivée de la famille', desc: 'Préparatifs finaux' },
            { time: '09:00', title: 'Accueil des premiers invités', desc: 'Visite libre de l\'atelier' },
            { time: '10:00', title: 'Discours d\'inauguration', desc: 'Tovoniaina RAHENDRISON' },
            { time: '10:30', title: 'Coupe du ruban', desc: 'Cérémonie officielle' },
            { time: '11:00', title: 'Présentation de l\'équipe', desc: 'Rencontre avec les techniciens' },
            { time: '11:30', title: 'Démonstration sérigraphique', desc: 'Impression en direct' },
            { time: '12:30', title: 'Buffet d\'inauguration', desc: 'Échanges avec les partenaires' },
            { time: '14:00', title: 'Visite guidée approfondie', desc: 'Détails techniques et processus' },
            { time: '16:00', title: 'Signature des premiers contrats', desc: 'Partenariats officiels' },
            { time: '17:00', title: 'Cocktail de clôture', desc: 'Remerciements et perspectives' },
          ].map((event, index) => (
            <Box key={index} sx={{ mb: 3, position: 'relative' }}>
              <Box sx={{
                position: 'absolute',
                left: -10,
                top: 0,
                width: 20,
                height: 20,
                borderRadius: '50%',
                bgcolor: '#2E7D32',
                border: '3px solid white',
                boxShadow: 2
              }} />
              <Typography variant="h6" color="primary" sx={{ ml: 3 }}>
                {event.time} - {event.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                {event.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Dialog pour visionner les photos */}
      <Dialog
        open={!!selectedImage}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
      >
        {selectedImage && (
          <>
            <AppBar position="static" sx={{ bgcolor: '#2E7D32' }}>
              <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
                  {selectedImage.icon || getCategoryIcon(selectedImage.category)}
                  <Typography variant="h6">
                    {selectedImage.title}
                  </Typography>
                </Box>
                <IconButton edge="end" color="inherit" onClick={handleCloseDialog}>
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            <DialogContent sx={{ p: 0, position: 'relative', minHeight: '60vh' }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                minHeight: '500px',
                bgcolor: '#f5f5f5'
              }}>
                {/* Navigation */}
                <IconButton
                  onClick={handlePrevious}
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                    zIndex: 1
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>

                {/* Image principale */}
                <Box sx={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  p: 2
                }}>
                  <img
                    src={getImageUrl(selectedImage.imagePath)}
                    alt={selectedImage.title}
                    onError={(e) => handleImageError(e, selectedImage)}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '70vh',
                      objectFit: 'contain',
                      borderRadius: '4px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  />
                </Box>

                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                    zIndex: 1
                  }}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Box>

              {/* Informations de la photo */}
              <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h5" gutterBottom>
                  {selectedImage.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedImage.description}
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <Typography variant="caption" color="text.secondary">
                      Date
                    </Typography>
                    <Typography variant="body2">
                      {selectedImage.date}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="caption" color="text.secondary">
                      Catégorie
                    </Typography>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                      {selectedImage.category}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" color="text.secondary">
                      Mots-clés
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                      {selectedImage.tags.map((tag, index) => (
                        <Chip 
                          key={index}
                          label={`#${tag}`}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Footer informatif */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2, bgcolor: '#f8f9fa' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom color="primary">
            🎨 ByGagoos-Ink - L'Excellence en Sérigraphie
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Le 18 mai 2025 restera dans nos mémoires comme le jour où une passion familiale 
            est devenue une entreprise professionnelle dédiée à l'excellence de la sérigraphie.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/production')}
              startIcon={<FactoryIcon />}
            >
              Notre Production
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/family')}
              startIcon={<PeopleIcon />}
            >
              Notre Famille
            </Button>
          </Box>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
            © {new Date().getFullYear()} ByGagoos-Ink - Tous droits réservés | Galerie officielle d'inauguration
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Gallery;