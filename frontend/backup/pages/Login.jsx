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
  CircularProgress,
} from '@mui/material';

// Imports corrigés - syntaxe par défaut
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircle from '@mui/icons-material/CheckCircle';
import RocketLaunch from '@mui/icons-material/RocketLaunch';
import StorageIcon from '@mui/icons-material/Storage'; // Icône pour base de données
import ShieldIcon from '@mui/icons-material/Shield';
import GroupsIcon from '@mui/icons-material/Groups';

// Configuration des membres familiaux (correspond à ton backend)
const FAMILY_MEMBERS = [
  {
    id: 1,
    name: 'Tovoniaina Rahendrison',
    email: 'tovoniaina.rahendrison@gmail.com',
    role: 'STRUCTURE',
    color: '#2E7D32',
    icon: '👑',
    description: 'Direction & Stratégie',
    password: 'ByGagoos2025!'
  },
  {
    id: 2,
    name: 'Dedettenadia',
    email: 'dedettenadia@gmail.com',
    role: 'INSPIRATION',
    color: '#9C27B0',
    icon: '💡',
    description: 'Idées & Innovation',
    password: 'ByGagoos2025!'
  },
  {
    id: 3,
    name: 'Miantsatiana Rahendrison',
    email: 'miantsatianarahendrison@gmail.com',
    role: 'CREATION',
    color: '#FF9800',
    icon: '🎨',
    description: 'Production & Réalisation',
    password: 'ByGagoos2025!'
  },
  {
    id: 4,
    name: 'Faniry Tia',
    email: 'fanirytia17@gmail.com',
    role: 'COMMUNICATION',
    color: '#2196F3',
    icon: '📢',
    description: 'Marketing & Relations',
    password: 'ByGagoos2025!'
  },
];

const SYSTEM_STATUS = [
  { service: 'Backend API', status: 'online', icon: <RocketLaunch /> },
  { service: 'PostgreSQL', status: 'online', icon: <StorageIcon /> },
  { service: 'Authentification', status: 'online', icon: <ShieldIcon /> },
  { service: 'Base Familiale', status: 'online', icon: <GroupsIcon /> },
];

const Login = () => {
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('ByGagoos2025!');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedMember, setSelectedMember] = useState(FAMILY_MEMBERS[0]);
  const [loginError, setLoginError] = useState('');
  const [backendStatus, setBackendStatus] = useState('checking');

  // Initialiser avec le premier membre
  useEffect(() => {
    setEmail(FAMILY_MEMBERS[0].email);
    setSelectedMember(FAMILY_MEMBERS[0]);
    
    // Vérifier l'état du backend
    checkBackendStatus();
  }, []);

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
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
    } else {
      // La redirection est gérée par le useEffect qui surveille isAuthenticated
      toast.success(`Connexion réussie ! Bienvenue ${result.user.name}`);
    }
  };

  const handleQuickLogin = (member) => {
    handleMemberClick(member);
    // Auto-submit après un court délai
    setTimeout(() => {
      handleSubmit(new Event('submit'));
    }, 300);
  };

  // Raccourcis clavier
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1;
        if (FAMILY_MEMBERS[index]) {
          handleMemberClick(FAMILY_MEMBERS[index]);
        }
      }
      if (e.key === 'Enter' && !loading) {
        handleSubmit(e);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [email, password, loading]);

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
                  <FamilyRestroomIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                    ByGagoos-Ink
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    Plateforme Familiale
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gestion d'entreprise familiale
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
                    InputProps={{
                      startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />,
                    }}
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
                      startAdornment: <LockIcon sx={{ mr: 1, color: 'action.active' }} />,
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
                    }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                        Connexion en cours...
                      </>
                    ) : (
                      'Accéder à la plateforme'
                    )}
                  </Button>
                </form>

                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    État du système
                  </Typography>
                </Divider>

                <Grid container spacing={1}>
                  {SYSTEM_STATUS.map((item, index) => (
                    <Grid item xs={6} key={index}>
                      <Card variant="outlined" sx={{ p: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ 
                            color: backendStatus === 'online' ? 'success.main' : 
                                   backendStatus === 'checking' ? 'warning.main' : 'error.main' 
                          }}>
                            {item.icon}
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              {item.service}
                            </Typography>
                            <Chip 
                              label={backendStatus === 'online' ? 'en ligne' : 
                                     backendStatus === 'checking' ? 'vérification' : 'hors ligne'} 
                              size="small"
                              color={backendStatus === 'online' ? 'success' : 
                                     backendStatus === 'checking' ? 'warning' : 'error'}
                              sx={{ height: 20, fontSize: '0.65rem' }}
                            />
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
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
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  👨‍👩‍👧‍👦 Membres de la Famille
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Cliquez sur un membre pour remplir automatiquement
                </Typography>

                <Grid container spacing={2}>
                  {FAMILY_MEMBERS.map((member) => (
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
                            <Avatar sx={{ 
                              bgcolor: member.color, 
                              width: 50, 
                              height: 50,
                              fontSize: '1.5rem'
                            }}>
                              {member.icon}
                            </Avatar>
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
                            <Button 
                              variant="outlined" 
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickLogin(member);
                              }}
                              disabled={loading}
                            >
                              Utiliser
                            </Button>
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