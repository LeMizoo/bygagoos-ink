// frontend/src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
  Divider,
  Avatar,
  Chip,
  Stack,
  Fade,
  Slide,
  Grow,
  Zoom,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import BrushIcon from '@mui/icons-material/Brush';
import CloudIcon from '@mui/icons-material/Cloud';
import GroupsIcon from '@mui/icons-material/Groups';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { keyframes } from '@emotion/react';
import { IMAGES_CONFIG } from '../config/images';

// Animation pour le texte
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <FamilyRestroomIcon sx={{ fontSize: 40 }} />,
      title: 'Familial',
      description: 'Des liens renforcés par la technologie',
      color: '#2E7D32'
    },
    {
      icon: <BrushIcon sx={{ fontSize: 40 }} />,
      title: 'Artisanal',
      description: 'L\'excellence du travail manuel préservée',
      color: '#9C27B0'
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
      title: 'Spirituel',
      description: 'Fondé sur des principes bibliques',
      color: '#D32F2F'
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40 }} />,
      title: 'Local',
      description: 'Au service de la communauté malgache',
      color: '#FF9800'
    },
    {
      icon: <CloudIcon sx={{ fontSize: 40 }} />,
      title: 'Transparent',
      description: 'Une gestion claire et ouverte',
      color: '#2196F3'
    }
  ];

  const features = [
    {
      title: 'Gestion des Projets',
      description: 'Suivez chaque commande de A à Z',
      icon: '📋',
      comingSoon: false
    },
    {
      title: 'Calendrier Familial',
      description: 'Planifiez réunions et événements',
      icon: '📅',
      comingSoon: true
    },
    {
      title: 'Système de Documents',
      description: 'Partagez fichiers et designs',
      icon: '📁',
      comingSoon: true
    },
    {
      title: 'Chat Interne',
      description: 'Communiquez en temps réel',
      icon: '💬',
      comingSoon: true
    },
    {
      title: 'Tableau de Bord Financier',
      description: 'Suivez revenus et dépenses',
      icon: '💰',
      comingSoon: true
    },
    {
      title: 'Statistiques Avancées',
      description: 'Analytics et rapports détaillés',
      icon: '📊',
      comingSoon: true
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      overflow: 'hidden',
    }}>
      {/* Hero Section avec logo */}
      <Box sx={{
        position: 'relative',
        background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
        color: 'white',
        py: 10,
        px: 2,
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
        
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box>
              {/* Logo */}
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                <Box 
                  component="img"
                  src={IMAGES_CONFIG.getImageUrl('/images/logo.png')}
                  alt="ByGagoos Ink Logo"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100x100/2E7D32/ffffff?text=BG';
                  }}
                  sx={{ 
                    width: { xs: 80, md: 100 },
                    height: { xs: 80, md: 100 },
                    borderRadius: '50%',
                    border: '3px solid white',
                    boxShadow: 3,
                    objectFit: 'cover'
                  }}
                />
              </Box>
              
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  mb: 2,
                  animation: `${fadeInUp} 1s ease-out`
                }}
              >
                ByGagoos Ink
              </Typography>
              
              <Typography 
                variant="h3" 
                sx={{ 
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 300,
                  mb: 4,
                  animation: `${fadeInUp} 1s ease-out 0.2s`,
                  animationFillMode: 'both'
                }}
              >
                Atelier familial de sérigraphie
              </Typography>
              
              <Divider sx={{ 
                my: 4, 
                mx: 'auto', 
                width: 100, 
                borderColor: 'rgba(255,255,255,0.3)',
                animation: `${fadeInUp} 1s ease-out 0.4s`,
                animationFillMode: 'both'
              }} />
              
              <Typography 
                variant="h5" 
                sx={{ 
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  fontWeight: 400,
                  maxWidth: 800,
                  mx: 'auto',
                  lineHeight: 1.6,
                  mb: 6,
                  animation: `${fadeInUp} 1s ease-out 0.6s`,
                  animationFillMode: 'both'
                }}
              >
                Allier artisanat, famille et technologie
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  fontStyle: 'italic',
                  fontWeight: 300,
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.6,
                  mb: 6,
                  animation: `${fadeInUp} 1s ease-out 0.8s`,
                  animationFillMode: 'both'
                }}
              >
                « Chaque création est un acte de transmission. Digitalisons notre atelier pour 
                mieux servir nos clients, préserver notre savoir-faire et renforcer nos liens familiaux. »
              </Typography>
              
              <Box sx={{ 
                animation: `${fadeInUp} 1s ease-out 1s`,
                animationFillMode: 'both'
              }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{
                    backgroundColor: 'white',
                    color: '#2E7D32',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      transform: 'translateY(-2px)',
                      boxShadow: 4,
                    },
                    transition: 'all 0.3s',
                  }}
                  endIcon={<ArrowForwardIcon />}
                >
                  Accéder à la plateforme
                </Button>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Values Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            color: '#2E7D32',
            mb: 6
          }}
        >
          Nos Valeurs Fondamentales
        </Typography>
        
        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
              <Grow in timeout={1000 + index * 200}>
                <Card sx={{ 
                  height: '100%',
                  textAlign: 'center',
                  borderTop: `4px solid ${value.color}`,
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ 
                      color: value.color,
                      mb: 2
                    }}>
                      {value.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Family Section avec photos réelles */}
      <Box sx={{ 
        py: 8,
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f5e9 100%)'
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              color: '#2E7D32',
              mb: 2
            }}
          >
            👨‍👩‍👧‍👦 L'Équipe Familiale
          </Typography>
          
          <Typography 
            variant="h6" 
            align="center" 
            color="text.secondary" 
            sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
          >
            Une famille, une vision, une passion commune pour l'artisanat
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12}>
              <Typography 
                variant="body1" 
                align="center" 
                color="text.secondary"
                sx={{ fontStyle: 'italic', maxWidth: 800, mx: 'auto' }}
              >
                Connectez-vous pour découvrir l'équipe familiale complète et voir les profils détaillés de chacun des membres.
              </Typography>
            </Grid>
          </Grid>
          
          
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}>
              « Quatre personnalités complémentaires, quatre talents unis par les mêmes valeurs 
              familiales et la même passion pour l'artisanat malgache. »
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/login')}
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                px: 4,
                py: 1.5
              }}
            >
              Rejoindre l'équipe
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            color: '#2E7D32',
            mb: 2
          }}
        >
          🚀 Prochaines Fonctionnalités
        </Typography>
        
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          Notre feuille de route pour digitaliser l'atelier familial
        </Typography>
        
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Zoom in timeout={1000 + index * 200}>
                <Paper 
                  elevation={2}
                  sx={{ 
                    p: 3,
                    height: '100%',
                    borderRadius: 3,
                    border: feature.comingSoon ? '2px dashed #ccc' : '2px solid transparent',
                    borderColor: !feature.comingSoon ? '#2E7D32' : undefined,
                    position: 'relative',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    }
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: 2 
                  }}>
                    <Box sx={{ 
                      fontSize: '2rem',
                      lineHeight: 1,
                      flexShrink: 0
                    }}>
                      {feature.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {feature.title}
                        {feature.comingSoon && (
                          <Chip 
                            label="Bientôt" 
                            size="small" 
                            sx={{ 
                              ml: 1,
                              bgcolor: 'warning.light',
                              color: 'warning.contrastText',
                              fontSize: '0.7rem',
                              height: 20
                            }}
                          />
                        )}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Spiritual Foundation */}
      <Box sx={{ 
        py: 8,
        background: 'linear-gradient(135deg, #fff8e1 0%, #fff3e0 100%)'
      }}>
        <Container maxWidth="lg">
          <Paper elevation={0} sx={{ 
            p: { xs: 3, md: 6 }, 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #fff 0%, #fafafa 100%)',
            border: '1px solid #e0e0e0'
          }}>
            <Typography 
              variant="h3" 
              align="center" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                color: '#2E7D32',
                mb: 4
              }}
            >
              🕊️ Fondement Spirituel
            </Typography>
            
            <Grid container spacing={4}>
              {[
                {
                  verse: "« Mets en ordre tes affaires extérieures, rends propre ton champ, et ensuite bâtis ta maison. »",
                  reference: "Proverbes 24:27"
                },
                {
                  verse: "« Toute œuvre excellente vient d'en haut, du Père des lumières. »",
                  reference: "Jacques 1:17"
                },
                {
                  verse: "« Vous êtes le sel de la terre, la lumière du monde. »",
                  reference: "Matthieu 5:13-14"
                },
                {
                  verse: "« Tout ce que vous faites, faites-le de bon cœur, comme pour le Seigneur. »",
                  reference: "Colossiens 3:23"
                }
              ].map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Fade in timeout={1000 + index * 200}>
                    <Card sx={{ 
                      height: '100%',
                      borderLeft: '4px solid #2E7D32',
                      background: 'transparent',
                      boxShadow: 'none'
                    }}>
                      <CardContent>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontStyle: 'italic',
                            lineHeight: 1.8,
                            mb: 2
                          }}
                        >
                          {item.verse}
                        </Typography>
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            color: '#2E7D32',
                            fontWeight: 600
                          }}
                        >
                          {item.reference}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Notre Vision
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.8 }}>
                « Où chaque pixel de code sert l'âme de l'artisanat, où chaque ligne de programme 
                renforce les liens familiaux, et où la technologie cloud devient l'alliée naturelle 
                de la créativité malgache. Plus qu'une plateforme, un témoignage d'excellence familiale 
                fondée sur la Parole de Dieu. »
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ 
          p: { xs: 3, md: 6 }, 
          borderRadius: 3,
          background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Prêt à digitaliser votre atelier familial ?
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 300 }}>
            Rejoignez-nous dans cette aventure qui allie tradition et innovation
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                backgroundColor: 'white',
                color: '#2E7D32',
                fontSize: '1rem',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
                transition: 'all 0.3s',
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Accéder à la plateforme
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white',
                },
              }}
              onClick={() => window.open('mailto:tovoniaina.rahendrison@gmail.com', '_blank')}
            >
              Nous contacter
            </Button>
          </Stack>
          
          <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  🚀 Lancement
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  MVP familial : 25 novembre 2025
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  🌐 Site Web
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  https://bygagoos-ink.vercel.app
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  📞 Contact
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Tovoniaina RAHENDRISON
                  <br />
                  +261 34 07 004 05
                  <br />
                  tovoniaina.rahendrison@gmail.com
                </Typography>
              </Grid>
            </Grid>
            
            <Typography variant="body2" sx={{ mt: 4, opacity: 0.8, fontStyle: 'italic' }}>
              « Testez la première commande via le portail et partagez votre retour. 
              Ensemble, faisons grandir l'atelier. »
            </Typography>
          </Box>
        </Paper>
      </Container>

      {/* Footer avec logo */}
      <Box sx={{ 
        py: 4,
        backgroundColor: '#1B5E20',
        color: 'white',
        textAlign: 'center'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 2 }}>
            <Box 
              component="img"
              src={IMAGES_CONFIG.getImageUrl('/images/logo.png')}
              alt="ByGagoos Ink Logo"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/60x60/2E7D32/ffffff?text=BG';
              }}
              sx={{ 
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: '2px solid white',
                boxShadow: 2,
                objectFit: 'cover'
              }}
            />
          </Box>
          
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} ByGagoos Ink — Atelier familial de sérigraphie à Antananarivo
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.6 }}>
            Digitalisons notre atelier pour mieux servir nos clients, préserver notre savoir-faire et renforcer nos liens familiaux.
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.6, fontStyle: 'italic' }}>
            Famille Rahendrison • Tovoniaina RAHENDRISON • Volatiana RANDRIANARISOA • Miantsatiana RAHENDRISON • Tia Faniry RAHENDRISON
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;