import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const CalendarPage = () => {
  const upcomingEvents = [
    { id: 1, title: 'Réunion familiale', date: '15 Décembre 2025', time: '10:00' },
    { id: 2, title: 'Livraison client', date: '18 Décembre 2025', time: '14:00' },
    { id: 3, title: 'Maintenance équipement', date: '20 Décembre 2025', time: '09:00' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <CalendarTodayIcon sx={{ fontSize: 40, color: '#2E7D32' }} />
          <Box>
            <Typography variant="h4" component="h1" sx={{ color: '#2E7D32', fontWeight: 600 }}>
              📅 Calendrier Familial
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Planifiez et suivez vos événements familiaux
            </Typography>
          </Box>
        </Box>

        <Typography variant="body1" color="text.secondary" paragraph>
          Le calendrier interactif sera bientôt disponible. Voici un aperçu des événements à venir :
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#2E7D32' }}>
            Événements à venir
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {upcomingEvents.map((event) => (
              <Grid item xs={12} md={4} key={event.id}>
                <Card sx={{ 
                  height: '100%',
                  borderLeft: '4px solid #2E7D32',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  }
                }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      📅 {event.date}
                      <br />
                      ⏰ {event.time}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={() => alert(`Détails de ${event.title}`)}
                    >
                      Voir détails
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ 
          mt: 6, 
          p: 3, 
          bgcolor: 'warning.light', 
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <Typography variant="h6" color="warning.dark" gutterBottom>
            🚧 Calendrier interactif en développement
          </Typography>
          <Typography variant="body2" color="warning.dark">
            La version complète avec calendrier interactif sera disponible prochainement.
            Pour le moment, utilisez cette page pour voir les événements prévus.
          </Typography>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => alert('Fonctionnalité en développement')}
            sx={{ mr: 2 }}
          >
            + Ajouter un événement
          </Button>
          <Button 
            variant="outlined"
            onClick={() => window.print()}
          >
            📄 Imprimer le calendrier
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CalendarPage;