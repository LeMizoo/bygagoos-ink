import React from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';

const LogisticsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Logistique</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Commandes fournisseurs</Typography>
            <Typography variant="body2" color="text.secondary">Suivi des commandes en cours et réceptions.</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Livraisons</Typography>
            <Typography variant="body2" color="text.secondary">Suivi des expéditions et statuts.</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Tableau des opérations logistiques (placeholder)</Typography>
            <Typography variant="body2" color="text.secondary">Liste des bons de livraison et statuts.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LogisticsPage;
