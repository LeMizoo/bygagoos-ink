import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, TextField, MenuItem, Grid, Chip } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!id) return;
    api.get(`/api/orders/${id}`).then(r => { setOrder(r.data); setStatus(r.data.status); }).catch(()=>{});
  }, [id]);

  const handleSave = async () => {
    try {
      const res = await api.put(`/api/orders/${id}`, { status });
      setOrder(res.data);
    } catch (e) { console.error(e); }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MG').format(price) + ' MGA';
  };

  if (!order) return <Box p={3}><Typography>Chargement...</Typography></Box>;

  return (
    <Box p={3}>
      <Paper sx={{ p:3 }}>
        <Typography variant="h4" gutterBottom>Commande #{order.id}</Typography>
        
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Colonne 1: Informations de base */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Informations Générales</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>Client</Typography>
                <Typography variant="body1">{order.clientName}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>Date de commande</Typography>
                <Typography variant="body1">{order.orderDateFormatted || new Date(order.orderDate).toLocaleString('fr-MG')}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>Date de livraison</Typography>
                <Typography variant="body1">{order.deliveryDateFormatted || (order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString('fr-MG') : 'Non spécifiée')}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>Statut</Typography>
                <Chip label={order.status} color={order.status === 'DELIVERED' ? 'success' : order.status === 'CANCELLED' ? 'error' : 'default'} sx={{ mt: 0.5 }} />
              </Box>
            </Box>
          </Grid>

          {/* Colonne 2: Détails produit */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Détails du Produit</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>Couleur du tissu</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Box sx={{ width: 24, height: 24, backgroundColor: order.color || '#ddd', border: '1px solid #ccc', borderRadius: '4px' }} />
                  <Typography variant="body1">{order.color || 'Non spécifiée'}</Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>Sériegraphie</Typography>
                <Typography variant="body1">{order.serigraphyImage ? '✓ Oui' : '✗ Non'}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>Tailles et quantités</Typography>
                <Typography variant="body1" sx={{ mt: 0.5 }}>{order.sizesSummary || 'Aucune taille'}</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Totaux */}
          <Grid item xs={12}>
            <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: '8px' }}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>Quantité totale</Typography>
                  <Typography variant="h6">{order.totalQty}</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>Prix unitaire</Typography>
                  <Typography variant="h6">{formatPrice(order.unitPrice)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>Montant total</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2196F3' }}>{formatPrice(order.totalPrice)}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Notes */}
          {order.notes && (
            <Grid item xs={12}>
              <Box>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>Notes</Typography>
                <Typography variant="body1" sx={{ mt: 0.5, backgroundColor: '#f9f9f9', p: 1.5, borderRadius: '4px' }}>{order.notes}</Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Actions */}
        <Box sx={{ mt: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField select label="Statut" value={status} onChange={e => setStatus(e.target.value)} size="small">
            {['PENDING','CONFIRMED','PRODUCTION','SHIPPED','DELIVERED','CANCELLED'].map(s => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={handleSave}>Sauvegarder</Button>
          <Button variant="outlined" onClick={() => navigate('/orders')}>Retour</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderDetail;
