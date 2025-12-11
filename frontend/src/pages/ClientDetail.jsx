import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    if (!id) return;
    api.get(`/api/clients/${id}`).then(r => { setClient(r.data); setForm({ name: r.data.name, phone: r.data.phone, email: r.data.email }); }).catch(()=>{});
  }, [id]);

  const handleSave = async () => {
    try {
      const res = await api.put(`/api/clients/${id}`, form);
      setClient(res.data);
      setEditing(false);
    } catch (e) { console.error(e); }
  };

  if (!client) return <Box p={3}><Typography>Chargement...</Typography></Box>;

  return (
    <Box p={3}>
      <Paper sx={{ p:3 }}>
        <Typography variant="h5" gutterBottom>Client: {client.name}</Typography>
        {!editing ? (
          <Box>
            <Typography>Email: {client.email}</Typography>
            <Typography>Phone: {client.phone}</Typography>
            <Box sx={{ mt:2 }}>
              <Button variant="contained" onClick={() => setEditing(true)}>Éditer</Button>
              <Button sx={{ ml:2 }} onClick={() => navigate('/clients')}>Retour</Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap:2 }}>
            <TextField label="Nom" value={form.name} onChange={e => setForm(prev=>({...prev,name:e.target.value}))} />
            <TextField label="Téléphone" value={form.phone} onChange={e => setForm(prev=>({...prev,phone:e.target.value}))} />
            <TextField label="Email" value={form.email} onChange={e => setForm(prev=>({...prev,email:e.target.value}))} />
            <Box>
              <Button variant="contained" onClick={handleSave}>Sauvegarder</Button>
              <Button sx={{ ml:2 }} onClick={() => setEditing(false)}>Annuler</Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ClientDetail;
