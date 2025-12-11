// frontend/src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Avatar,
  Card,
  CardContent,
  Chip,
  IconButton,
  Divider,
  Alert,
  LinearProgress,
  Fade,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircle from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IMAGES_CONFIG } from '../config/images';

const Login = () => {
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState(IMAGES_CONFIG.familyMembers[0].email);
  const [password, setPassword] = useState('ByGagoos2025!');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedMember, setSelectedMember] = useState(IMAGES_CONFIG.familyMembers[0]);
  const [loginError, setLoginError] = useState('');
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    
    // Vérifier l'état du backend
    checkBackendStatus();
  }, [isAuthenticated, navigate]);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/health');
      if (response.ok) {
        setBackendStatus('online');
      } else {
        setBackendStatus('offline');
      }
    } catch (error) {
      setBackendStatus('offline');
    }
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setEmail(member.email);
    setPassword(member.password);
    setLoginError('');
    toast.success(`${member.name} sélectionné`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!email || !password) {
      setLoginError('Veuillez remplir tous les champs');
      return;
    }

    const result = await login(email, password);
    
    if (!result.success) {
      setLoginError(result.message);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 3,
    }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            Retour à l'accueil
          </Button>
        </Box>
        
        <Grid container spacing={4}>
          {/* Left side - Login Form */}
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={500}>
              <Paper elevation={24} sx={{ 
                p: 4, 
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
              }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#2E7D32' }}>
                    ByGagoos-Ink
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    Plateforme Familiale
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Connectez-vous à votre espace personnel
                  </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    required
                    disabled={loading}
                    sx={{ mb: 2 }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                    disabled={loading}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          disabled={loading}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />

                  {loginError && (
                    <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                      {loginError}
                    </Alert>
                  )}

                  <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
                    <Typography variant="body2">
                      <strong>Mot de passe commun :</strong> ByGagoos2025!
                    </Typography>
                  </Alert>

                  {loading && <LinearProgress sx={{ my: 2 }} />}

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={loading || backendStatus === 'offline'}
                    sx={{ 
                      mt: 3, 
                      mb: 2, 
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      background: 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1B5E20 30%, #2E7D32 90%)',
                      }
                    }}
                  >
                    {loading ? 'Connexion en cours...' : 'Accéder à la plateforme'}
                  </Button>
                </form>

                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    État du système : {backendStatus === 'online' ? '✅ En ligne' : '❌ Hors ligne'}
                  </Typography>
                </Divider>
                
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Button
                    variant="text"
                    onClick={() => navigate('/')}
                    sx={{ 
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main',
                      }
                    }}
                  >
                    ← Retour à la page d'accueil
                  </Button>
                </Box>
              </Paper>
            </Fade>
          </Grid>

          {/* Right side - Family Members */}
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={500} delay={200}>
              <Paper elevation={24} sx={{ 
                p: 4, 
                borderRadius: 3,
                height: '100%',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
              }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3, color: '#2E7D32' }}>
                  👨‍👩‍👧‍👦 Membres de la Famille
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Cliquez sur un membre pour remplir automatiquement
                </Typography>

                <Grid container spacing={2}>
                  {IMAGES_CONFIG.familyMembers.map((member) => (
                    <Grid item xs={12} key={member.id}>
                      <Card 
                        onClick={() => handleMemberClick(member)}
                        sx={{ 
                          cursor: 'pointer',
                          border: selectedMember?.id === member.id ? 2 : 1,
                          borderColor: selectedMember?.id === member.id ? member.color : 'divider',
                          bgcolor: selectedMember?.id === member.id ? `${member.color}10` : 'background.paper',
                          transition: 'all 0.3s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 6,
                          },
                        }}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar 
                              src={IMAGES_CONFIG.getImageUrl(member.image)}
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=${member.color.replace('#', '')}&color=fff`;
                              }}
                              sx={{ 
                                width: 60, 
                                height: 60,
                                border: `2px solid ${member.color}`,
                                bgcolor: `${member.color}20`,
                                objectFit: 'cover'
                              }}
                            />
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <Typography variant="h6" component="div">
                                  {member.name}
                                </Typography>
                                {selectedMember?.id === member.id && (
                                  <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
                                )}
                              </Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {member.email}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Chip 
                                  label={member.role}
                                  size="small"
                                  sx={{ 
                                    bgcolor: `${member.color}20`,
                                    color: member.color,
                                    fontWeight: 600,
                                  }}
                                />
                                <Chip 
                                  label={member.description}
                                  size="small"
                                  variant="outlined"
                                />
                              </Box>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    🏗️ Structure Familiale :
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • <strong>STRUCTURE</strong> : Direction stratégique et décisions<br />
                    • <strong>INSPIRATION</strong> : Innovation et nouvelles idées<br />
                    • <strong>CREATION</strong> : Production et réalisation concrète<br />
                    • <strong>COMMUNICATION</strong> : Marketing et relations externes
                  </Typography>
                </Box>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary" fontStyle="italic">
                    "Petits commencements, grandes fins." - Proverbe malgache
                  </Typography>
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;