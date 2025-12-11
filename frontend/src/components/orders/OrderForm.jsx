import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem,
  Grid,
  Typography,
  Box,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import api from '../../services/api';
import toast from 'react-hot-toast';

const defaultSizes = { '4':0,'6':0,'8':0,'10':0,'S':0,'M':0,'L':0,'XL':0,'XXL':0 };

const OrderForm = ({ open, onClose, onCreated }) => {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [sizes, setSizes] = useState(defaultSizes);
  const [unitPrice, setUnitPrice] = useState(0);
  const [color, setColor] = useState('');
  const [serigraphyImage, setSerigraphyImage] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (open) {
      api.get('/api/clients').then(r => setClients(r.data || [])).catch(()=>{});
    }
  }, [open]);

  const handleChangeSize = (size, value) => {
    setSizes(prev => ({ ...prev, [size]: Number(value) || 0 }));
  };

  const handleSubmit = async () => {
    if (!clientId) {
      toast.error('Veuillez sélectionner un client');
      return;
    }
    const totalQty = Object.values(sizes).reduce((a, b) => a + b, 0);
    if (totalQty === 0) {
      toast.error('Veuillez ajouter au moins une quantité');
      return;
    }
    const payload = { clientId, deliveryDate, sizes, unitPrice: Number(unitPrice) || 0, color, serigraphyImage, notes };
    try {
      const res = await api.post('/api/orders', payload);
      onCreated && onCreated(res.data);
      toast.success('Commande créée avec succès!');
      onClose();
      // Reset form
      setClientId('');
      setDeliveryDate('');
      setSizes(defaultSizes);
      setUnitPrice(0);
      setColor('');
      setSerigraphyImage(false);
      setNotes('');
    } catch (err) {
      console.error(err);
      toast.error('Erreur lors de la création de la commande');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Créer une commande</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {/* Infos de base */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Informations générales</Typography>
            <Stack spacing={2}>
              <TextField 
                select 
                label="Client" 
                value={clientId} 
                onChange={e => setClientId(e.target.value)}
                required
                fullWidth
              >
                {clients.map(c => (
                  <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                ))}
              </TextField>

              <TextField
                label="Date de livraison"
                type="date"
                value={deliveryDate}
                onChange={e => setDeliveryDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Stack>
          </Box>

          {/* Détails du produit */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Détails du produit</Typography>
            <Stack spacing={2}>
              <TextField 
                label="Couleur du tissu" 
                value={color} 
                onChange={e => setColor(e.target.value)}
                placeholder="ex: Bleu, Rouge, Blanc..."
                fullWidth
              />

              <TextField 
                label="Prix unitaire (MGA)" 
                type="number" 
                value={unitPrice} 
                onChange={e => setUnitPrice(e.target.value)}
                inputProps={{ step: '100', min: '0' }}
                fullWidth
              />

              <FormControlLabel
                control={<Checkbox checked={serigraphyImage} onChange={e => setSerigraphyImage(e.target.checked)} />}
                label="Avec sériegraphie"
              />
            </Stack>
          </Box>

          {/* Tailles */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Tailles et quantités</Typography>
            <Grid container spacing={1}>
              {Object.keys(defaultSizes).map(s => (
                <Grid item xs={4} sm={3} md={2} key={s}>
                  <TextField 
                    label={s} 
                    type="number" 
                    value={sizes[s]} 
                    onChange={e => handleChangeSize(s, e.target.value)}
                    inputProps={{ min: '0' }}
                    size="small"
                    fullWidth
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Notes */}
          <Box>
            <TextField
              label="Notes (optionnelles)"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              multiline
              rows={3}
              placeholder="Ajoutez des notes spéciales..."
              fullWidth
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" onClick={handleSubmit}>Créer la commande</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderForm;
