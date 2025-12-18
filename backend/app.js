// backend/app.js - SERVEUR DÉPRÉCIÉ (à ne pas utiliser)
console.warn('⚠️  Ce serveur est déprécié. Utilisez server.js à la place.');
console.warn('⚠️  Arrêtez ce serveur et exécutez: node server.js');
console.warn('⚠️  ou: npm run dev (si configuré dans package.json)');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Message d'information
app.get('/', (req, res) => {
  res.json({
    message: '🚨 SERVEUR DÉPRÉCIÉ - Utilisez server.js',
    info: 'Ce serveur est une version simplifiée sans authentification',
    correctServer: 'http://localhost:3001 (server.js)',
    action: 'Arrêtez ce serveur et exécutez: node server.js',
    timestamp: new Date().toISOString()
  });
});

// Routes de compatibilité
app.get('/api/family', async (req, res) => {
  res.json([
    {
      id: 1,
      firstName: 'Tovoniaina',
      lastName: 'RAHENDRISON',
      email: 'tovoniaina.rahendrison@gmail.com',
      role: 'SUPER_ADMIN',
      familyRole: 'STRUCTURE'
    }
  ]);
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'DEPRECATED',
    message: 'Utilisez server.js pour l\'authentification complète',
    timestamp: new Date().toISOString()
  });
});

// Redirige toutes les autres routes vers le bon serveur
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Serveur déprécié',
    message: 'Cette route n\'est pas disponible sur ce serveur',
    solution: 'Utilisez server.js avec toutes les fonctionnalités',
    requiredRoute: `${req.method} ${req.originalUrl}`,
    correctServer: 'http://localhost:3001'
  });
});

app.listen(PORT, () => {
  console.warn(`\n⚠️  ⚠️  ⚠️  SERVEUR DÉPRÉCIÉ ⚠️  ⚠️  ⚠️`);
  console.warn(`Port: ${PORT} - NE PAS UTILISER POUR L'AUTHENTIFICATION`);
  console.warn(`Exécutez 'node server.js' à la place\n`);
});