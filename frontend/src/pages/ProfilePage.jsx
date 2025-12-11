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
} from '@mui/material';
import { Edit, Save, Cancel, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

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

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadProfile();
  }, [user, navigate]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/users/${user.id}/profile`);
      setProfileData(response.data);
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
      const response = await api.put(`/api/users/${user.id}/profile`, {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        title: profileData.title
      });

      setProfileData(response.data);
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
      await api.post(`/api/users/${user.id}/change-password`, {
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

  if (loading && !profileData.email) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography>Chargement...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profil utilisateur */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                👤 Mon Profil
              </Typography>
              {!isEditing && (
                <Button
                  startIcon={<Edit />}
                  onClick={() => setIsEditing(true)}
                  variant="outlined"
                  size="small"
                >
                  Modifier
                </Button>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {isEditing ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Prénom"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Nom"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Téléphone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Titre/Poste"
                  name="title"
                  value={profileData.title}
                  onChange={handleProfileChange}
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={2}
                />

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      loadProfile();
                    }}
                    variant="outlined"
                    startIcon={<Cancel />}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    variant="contained"
                    startIcon={<Save />}
                    disabled={loading}
                  >
                    Enregistrer
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Prénom
                  </Typography>
                  <Typography variant="body2">
                    {profileData.firstName}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Nom
                  </Typography>
                  <Typography variant="body2">
                    {profileData.lastName}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Email
                  </Typography>
                  <Typography variant="body2">
                    {profileData.email}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Téléphone
                  </Typography>
                  <Typography variant="body2">
                    {profileData.phone || 'Non renseigné'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Titre/Poste
                  </Typography>
                  <Typography variant="body2">
                    {profileData.title || 'Non renseigné'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Rôle
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {profileData.role === 'SUPER_ADMIN' ? 'Administrateur' : 'Membre de la famille'}
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Sécurité - Changement de mot de passe */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                🔐 Sécurité
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {!isChangingPassword ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Changez votre mot de passe régulièrement pour sécuriser votre compte.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setIsChangingPassword(true)}
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
                      >
                        {showPasswords.current ? <VisibilityOff /> : <Visibility />}
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
                  helperText="Au moins 8 caractères"
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
                      >
                        {showPasswords.new ? <VisibilityOff /> : <Visibility />}
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
                      >
                        {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
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
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleChangePassword}
                    variant="contained"
                    startIcon={<Save />}
                    disabled={loading}
                  >
                    Changer
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Informations système */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              ℹ️ Informations du compte
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">
                  Date de création du compte
                </Typography>
                <Typography variant="body2">
                  {profileData.createdAt 
                    ? new Date(profileData.createdAt).toLocaleDateString('fr-FR')
                    : 'N/A'
                  }
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">
                  Dernière connexion
                </Typography>
                <Typography variant="body2">
                  {new Date().toLocaleDateString('fr-FR')}
                </Typography>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #eee' }}>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
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
