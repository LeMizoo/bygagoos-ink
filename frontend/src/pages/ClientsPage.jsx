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
  TextField,
  Stack
} from '@mui/material';
import api from '../services/api';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/clients');
      setClients(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      const res = await api.post('/api/clients', { name, phone, email });
      setClients(prev => [res.data, ...prev]);
      setName(''); setPhone(''); setEmail('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Clients</Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>Ajouter un client</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} alignItems="center">
          <TextField label="Nom" value={name} onChange={e => setName(e.target.value)} />
          <TextField label="Téléphone" value={phone} onChange={e => setPhone(e.target.value)} />
          <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Button variant="contained" onClick={handleCreate}>Créer</Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>Liste des clients</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Téléphone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map(c => (
              <TableRow key={c.id} hover>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
              </TableRow>
            ))}
            {clients.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={3}>Aucun client trouvé.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ClientsPage;
