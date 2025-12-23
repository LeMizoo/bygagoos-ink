import React from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';

const AccountingPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Comptabilité</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Résumé financier</Typography>
            <Typography variant="body2" color="text.secondary">Chiffre d'affaires, dépenses et bénéfices.</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Actions</Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Button variant="contained">Importer transactions</Button>
              <Button variant="outlined">Exporter en CSV</Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Journal des opérations (placeholder)</Typography>
            <Typography variant="body2" color="text.secondary">Tableau des transactions à venir ici.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountingPage;
