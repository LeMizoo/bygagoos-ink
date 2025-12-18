import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const ProjectsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#2E7D32', fontWeight: 600 }}>
          📋 Gestion des Projets
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Cette fonctionnalité sera bientôt disponible. En attendant, vous pouvez gérer vos projets depuis le tableau de bord.
        </Typography>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="warning.main" sx={{ mb: 2 }}>
            🚧 En cours de développement
          </Typography>
          <Typography variant="body2">
            La gestion complète des projets sera disponible dans la prochaine version.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProjectsPage;