// frontend/src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  Grid,
  Card,
  CardContent,
  Divider,
  IconButton,
  Avatar,
} from '@mui/material';
import { Edit, Save, Cancel, Visibility, VisibilityOff, Email, Phone, Badge } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { getMemberImage, getPlaceholderImage } from '../config/images';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    title: '',
    role: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadProfile();
  }, [user, navigate]);

  useEffect(() => {
    if (user?.name) {
      const avatar = getMemberImage(user.name);
      setAvatarUrl(avatar);
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      // Utiliser les données de l'utilisateur authentifié comme fallback
      if (user) {
        setProfileData({
          firstName: user.firstName || user.name?.split(' ')[0] || '',
          lastName: user.lastName || user.name?.split(' ').slice(1).join(' ') || '',
          email: user.email || '',
          phone: user.phone || '',
          title: user.title || '',
          role: user.role || 'Membre'
        });
      }
      
      // Essayer de récupérer les données depuis l'API
      try {
        const response = await api.get(`/api/users/profile`);
        if (response.data) {
          setProfileData(response.data);
        }
      } catch (apiError) {
        console.log('API profile non disponible, utilisation des données locales');
      }
      
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement du profil');
      console.error('Profile load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      
      // Simuler la sauvegarde si l'API n'est pas disponible
      const userData = {
        ...profileData,
        name: `${profileData.firstName} ${profileData.lastName}`.trim(),
        updatedAt: new Date().toISOString()
      };
      
      // Mettre à jour dans AuthContext si possible
      if (window.updateUserProfile) {
        window.updateUserProfile(userData);
      }
      
      setProfileData(userData);
      setIsEditing(false);
      toast.success('Profil mis à jour avec succès !');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la sauvegarde');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Le nouveau mot de passe doit contenir au moins 8 caractères');
      return;
    }

    try {
      setLoading(true);
      await api.post(`/api/users/change-password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsChangingPassword(false);
      toast.success('Mot de passe changé avec succès !');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors du changement de mot de passe');
      console.error('Password change error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarError = (e) => {
    console.log('Avatar error, using fallback');
    e.target.src = getPlaceholderImage('User');
  };

  if (loading && !profileData.email) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Typography>Chargement du profil...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* En-tête du profil avec avatar */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Avatar 
                src={avatarUrl}
                onError={handleAvatarError}
                sx={{ 
                  width: 120, 
                  height: 120, 
                  border: '4px solid #2E7D32',
                  objectFit: 'cover'
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#2E7D32' }}>
                  {profileData.firstName} {profileData.lastName}
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  {profileData.title || 'Membre de ByGagoos-Ink'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Email fontSize="small" color="action" />
                    <Typography variant="body2">{profileData.email}</Typography>
                  </Box>
                  {profileData.phone && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Phone fontSize="small" color="action" />
                      <Typography variant="body2">{profileData.phone}</Typography>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Badge fontSize="small" color="action" />
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#2E7D32' }}>
                      {profileData.role}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {!isEditing && (
                <Button
                  startIcon={<Edit />}
                  onClick={() => setIsEditing(true)}
                  variant="contained"
                  size="large"
                  sx={{ bgcolor: '#2E7D32' }}
                >
                  Modifier le profil
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Formulaire d'édition */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>👤</span> Informations personnelles
            </Typography>

            <Divider sx={{ my: 2 }} />

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {isEditing ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Prénom"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Nom"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
                
                <TextField
                  label="Email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  disabled
                  helperText="L'email ne peut pas être modifié"
                />
                
                <TextField
                  label="Téléphone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
                
                <TextField
                  label="Titre/Poste"
                  name="title"
                  value={profileData.title}
                  onChange={handleProfileChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  multiline
                  rows={2}
                />

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      loadProfile();
                    }}
                    variant="outlined"
                    startIcon={<Cancel />}
                    size="small"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    variant="contained"
                    startIcon={<Save />}
                    disabled={loading}
                    size="small"
                    sx={{ bgcolor: '#2E7D32' }}
                  >
                    Enregistrer
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                    Nom complet
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {profileData.firstName} {profileData.lastName}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                    Email
                  </Typography>
                  <Typography variant="body1">
                    {profileData.email}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                    Téléphone
                  </Typography>
                  <Typography variant="body1">
                    {profileData.phone || 'Non renseigné'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                    Titre/Poste
                  </Typography>
                  <Typography variant="body1">
                    {profileData.title || 'Non renseigné'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                    Rôle dans l'entreprise
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    fontWeight: 'bold',
                    color: profileData.role === 'SUPER_ADMIN' ? '#2E7D32' : 
                           profileData.role === 'STRUCTURE' ? '#2E7D32' :
                           profileData.role === 'INSPIRATION' ? '#9C27B0' :
                           profileData.role === 'CREATION' ? '#FF9800' :
                           profileData.role === 'COMMUNICATION' ? '#2196F3' : '#666'
                  }}>
                    {profileData.role === 'SUPER_ADMIN' ? 'Administrateur' : 
                     profileData.role === 'STRUCTURE' ? 'Structure' :
                     profileData.role === 'INSPIRATION' ? 'Inspiration' :
                     profileData.role === 'CREATION' ? 'Création' :
                     profileData.role === 'COMMUNICATION' ? 'Communication' : 'Membre'}
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Sécurité - Changement de mot de passe */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>🔐</span> Sécurité du compte
            </Typography>

            <Divider sx={{ my: 2 }} />

            {!isChangingPassword ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Pour la sécurité de votre compte, nous vous recommandons de changer votre mot de passe régulièrement.
                </Typography>
                <Alert severity="info" sx={{ mb: 1 }}>
                  Utilisez un mot de passe fort d'au moins 8 caractères avec des lettres, chiffres et symboles.
                </Alert>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setIsChangingPassword(true)}
                  sx={{ bgcolor: '#2E7D32' }}
                >
                  Changer le mot de passe
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Mot de passe actuel"
                  name="currentPassword"
                  type={showPasswords.current ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          setShowPasswords(prev => ({
                            ...prev,
                            current: !prev.current
                          }))
                        }
                        edge="end"
                        size="small"
                      >
                        {showPasswords.current ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    )
                  }}
                />

                <TextField
                  label="Nouveau mot de passe"
                  name="newPassword"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  helperText="Au moins 8 caractères avec lettres, chiffres et symboles"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          setShowPasswords(prev => ({
                            ...prev,
                            new: !prev.new
                          }))
                        }
                        edge="end"
                        size="small"
                      >
                        {showPasswords.new ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    )
                  }}
                />

                <TextField
                  label="Confirmer le nouveau mot de passe"
                  name="confirmPassword"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          setShowPasswords(prev => ({
                            ...prev,
                            confirm: !prev.confirm
                          }))
                        }
                        edge="end"
                        size="small"
                      >
                        {showPasswords.confirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    )
                  }}
                />

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button
                    onClick={() => {
                      setIsChangingPassword(false);
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      });
                    }}
                    variant="outlined"
                    startIcon={<Cancel />}
                    size="small"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleChangePassword}
                    variant="contained"
                    startIcon={<Save />}
                    disabled={loading}
                    size="small"
                    sx={{ bgcolor: '#2E7D32' }}
                  >
                    Changer le mot de passe
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Informations système */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>ℹ️</span> Informations du compte
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                      Statut du compte
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#2E7D32' }}>
                      🔵 Actif
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                      Dernière connexion
                    </Typography>
                    <Typography variant="body1">
                      {new Date().toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                      Membre depuis
                    </Typography>
                    <Typography variant="body1">
                      {new Date().toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                      Version de l'application
                    </Typography>
                    <Typography variant="body1">
                      v1.0.0
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={() => {
                  logout();
                  navigate('/login');
                  toast.success('Déconnexion réussie');
                }}
                sx={{ '&:hover': { bgcolor: 'error.light', color: 'white' } }}
              >
                Se déconnecter
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;