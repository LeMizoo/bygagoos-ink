import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const OrdersPage = () => {
  const orders = [
    { id: 'CMD-2025-001', client: 'Hotel Antananarivo', date: '10/12/2025', total: 450000, status: 'En cours', items: 50 },
    { id: 'CMD-2025-002', client: 'Restaurant La Varangue', date: '08/12/2025', total: 280000, status: 'Terminé', items: 30 },
    { id: 'CMD-2025-003', client: 'Université d\'Antananarivo', date: '05/12/2025', total: 1200000, status: 'En cours', items: 200 },
    { id: 'CMD-2025-004', client: 'Boutique Artisanale', date: '01/12/2025', total: 185000, status: 'Livré', items: 25 },
    { id: 'CMD-2025-005', client: 'École Primaire', date: '28/11/2025', total: 320000, status: 'Terminé', items: 80 },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Terminé': return 'success';
      case 'En cours': return 'warning';
      case 'Livré': return 'info';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ShoppingCartIcon sx={{ fontSize: 40, color: '#2E7D32' }} />
            <Box>
              <Typography variant="h4" component="h1" sx={{ color: '#2E7D32', fontWeight: 600 }}>
                🛒 Commandes
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Gérez les commandes de vos clients
              </Typography>
            </Box>
          </Box>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => alert('Nouvelle commande')}
          >
            + Nouvelle commande
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>N° Commande</strong></TableCell>
                <TableCell><strong>Client</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Articles</strong></TableCell>
                <TableCell><strong>Total (MGA)</strong></TableCell>
                <TableCell><strong>Statut</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>
                    <Typography fontWeight={500}>
                      {order.total.toLocaleString('fr-MG')} MGA
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={order.status} 
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" title="Voir">
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" title="Modifier">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" title="Supprimer">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Total: {orders.length} commandes
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" onClick={() => window.print()}>
              Imprimer la liste
            </Button>
            <Button variant="contained" onClick={() => alert('Export CSV')}>
              Exporter en CSV
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrdersPage;