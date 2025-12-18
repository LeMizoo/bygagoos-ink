import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const SettingsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <SettingsIcon sx={{ fontSize: 40, color: '#2E7D32' }} />
          <Typography variant="h4" component="h1" sx={{ color: '#2E7D32', fontWeight: 600 }}>
            ⚙️ Paramètres
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" paragraph>
          Les paramètres de l'application seront disponibles prochainement.
        </Typography>
        <Box sx={{ mt: 4, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="body2">
            Fonctionnalité en développement. Retournez plus tard.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SettingsPage;