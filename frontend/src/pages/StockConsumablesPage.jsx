import React from 'react';
import { Box, Typography, Paper, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const sampleStock = [
  { id: 1, name: 'Encre Noir 1L', category: 'Encre', quantity: 12, unit: 'L', minStock: 4, location: 'Stock A' },
  { id: 2, name: 'Émulsion 5L', category: 'Chimie', quantity: 3, unit: 'L', minStock: 2, location: 'Stock B' },
  { id: 3, name: 'Rouleaux Nettoyage', category: 'Outillage', quantity: 25, unit: 'pcs', minStock: 10, location: 'Stock A' }
];

const StockConsumablesPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Stocks - Consommables Sérigraphie</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Ajouter / Réapprovisionner</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>Nouvel article</Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Vue d'ensemble du stock</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Article</TableCell>
                    <TableCell>Catégorie</TableCell>
                    <TableCell>Quantité</TableCell>
                    <TableCell>Unité</TableCell>
                    <TableCell>Stock min</TableCell>
                    <TableCell>Emplacement</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sampleStock.map((item) => (
                    <TableRow key={item.id} sx={{ bgcolor: item.quantity <= item.minStock ? '#fff3e0' : 'inherit' }}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.minStock}</TableCell>
                      <TableCell>{item.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Historique des mouvements (placeholder)</Typography>
            <Typography variant="body2" color="text.secondary">Entrées/sorties et ajustements à venir.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StockConsumablesPage;
