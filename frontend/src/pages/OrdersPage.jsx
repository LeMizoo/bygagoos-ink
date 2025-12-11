import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack
} from '@mui/material';
import api from '../services/api';
import OrderForm from '../components/orders/OrderForm';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterClient, setFilterClient] = useState('');
  const [openForm, setOpenForm] = useState(false);

  const fetchClients = async () => {
    try {
      const res = await api.get('/api/clients');
      setClients(res.data || []);
    } catch (err) { console.error(err); }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const q = filterClient ? `?clientId=${filterClient}` : '';
      const res = await api.get('/api/orders' + q);
      setOrders(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchClients(); fetchOrders(); }, [filterClient]);

  const handleCreated = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">Commandes</Typography>
        <Button variant="contained" onClick={() => setOpenForm(true)}>Nouvelle commande</Button>
      </Stack>

      <Paper sx={{ p: 2, mb: 2 }}>
        <FormControl sx={{ minWidth: 240 }}>
          <InputLabel>Filtrer par client</InputLabel>
          <Select value={filterClient} label="Filtrer par client" onChange={e => setFilterClient(e.target.value)}>
            <MenuItem value="">Tous</MenuItem>
            {clients.map(c => (
              <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Réf</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Date commande</TableCell>
              <TableCell>Livraison</TableCell>
              <TableCell>Total Qty</TableCell>
              <TableCell>Prix unitaire (MGA)</TableCell>
              <TableCell>Total (MGA)</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(o => (
              <TableRow key={o.id} hover>
                <TableCell>{o.id}</TableCell>
                <TableCell>{o.clientName}</TableCell>
                <TableCell>{new Date(o.orderDate).toLocaleString()}</TableCell>
                <TableCell>{o.deliveryDate ? new Date(o.deliveryDate).toLocaleDateString() : '-'}</TableCell>
                <TableCell>{o.totalQty}</TableCell>
                <TableCell>{new Intl.NumberFormat('fr-MG').format(o.unitPrice)} MGA</TableCell>
                <TableCell>{new Intl.NumberFormat('fr-MG').format(o.totalPrice)} MGA</TableCell>
                <TableCell>{o.status}</TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={8}>Aucune commande trouvée.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <OrderForm open={openForm} onClose={() => setOpenForm(false)} onCreated={handleCreated} />
    </Box>
  );
};

export default OrdersPage;
