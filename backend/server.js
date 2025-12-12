// backend/server.js - Serveur minimal pour développement
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'bygagoos-dev-secret-2025';

// ============================================
// MIDDLEWARE CORS OPTIMISÉ POUR DEV & PROD
// ============================================
const allowedOrigins = [
  // Développement local
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost',
  'http://localhost:8080',
  
  // Production Vercel - AJOUT CRITIQUE !
  'https://bygagoos-app.vercel.app',
  'https://bygagoos-itkg7xpfx-tovoniaina-rahendrisons-projects.vercel.app',
  
  // Optionnel: réseau local dynamique (gardé de la v2)
  `http://${require('os').hostname().toLowerCase()}.local`
];

// Fonction utilitaire pour extraire le host d'une URL
const extractHost = (url) => url.split('//')[1] || url;

app.use(cors({
  origin: (origin, callback) => {
    // Permettre les requêtes sans origin (ex: curl, Postman)
    if (!origin) {
      return callback(null, true);
    }
    
    // Vérifier si l'origine est dans la liste autorisée
    const originHost = extractHost(origin);
    const isAllowed = allowedOrigins.some(allowed => {
      const allowedHost = extractHost(allowed);
      return originHost === allowedHost;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn('❌ CORS bloqué pour:', origin);
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true
}));

// ============================================
// AUTRE MIDDLEWARE
// ============================================
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }
    req.user = user;
    next();
  });
};

// ============================================
// DONNÉES EN MÉMOIRE POUR DÉVELOPPEMENT
// ============================================
let users = [
  {
    id: '1',
    email: 'tovoniaina.rahendrison@gmail.com',
    firstName: 'Tovoniaina',
    lastName: 'RAHENDRISON',
    name: 'Tovoniaina RAHENDRISON',
    role: 'SUPER_ADMIN',
    familyRole: 'STRUCTURE',
    title: 'Fondateur & Structure',
    phone: '+261 34 43 593 30',
    hashedPassword: bcrypt.hashSync('ByGagoos2025!', 10),
    canChangePassword: true,
    createdAt: new Date('2025-01-01')
  },
  {
    id: '2',
    email: 'dedettenadia@gmail.com',
    firstName: 'Volatiana',
    lastName: 'RANDRIANARISOA',
    name: 'Volatiana RANDRIANARISOA',
    role: 'FAMILY_MEMBER',
    familyRole: 'INSPIRATION',
    title: 'Direction Générale - Inspiration & Créativité',
    phone: '+261 3X XXX XXXX',
    hashedPassword: bcrypt.hashSync('ByGagoos2025!', 10),
    canChangePassword: true,
    createdAt: new Date('2025-01-01')
  },
  {
    id: '3',
    email: 'miantsatianarahendrison@gmail.com',
    firstName: 'Miantsatiana',
    lastName: 'RAHENDRISON',
    name: 'Miantsatiana RAHENDRISON',
    role: 'FAMILY_MEMBER',
    familyRole: 'CREATION',
    title: 'Direction des Opérations - Création & Design',
    phone: '+261 3X XXX XXXX',
    hashedPassword: bcrypt.hashSync('ByGagoos2025!', 10),
    canChangePassword: true,
    createdAt: new Date('2025-01-01')
  },
  {
    id: '4',
    email: 'fanirytia17@gmail.com',
    firstName: 'Tia Faniry',
    lastName: 'RAHENDRISON',
    name: 'Tia Faniry RAHENDRISON',
    role: 'FAMILY_MEMBER',
    familyRole: 'COMMUNICATION',
    title: 'Direction Administrative - Communication & Relations',
    phone: '+261 3X XXX XXXX',
    hashedPassword: bcrypt.hashSync('ByGagoos2025!', 10),
    canChangePassword: true,
    createdAt: new Date('2025-01-01')
  }
];

// ============================================
// ROUTES
// ============================================

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'ByGagoos-Ink API',
    version: '1.0.0 (Dev)',
    users: users.length
  });
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    // Chercher l'utilisateur
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Vérifier le mot de passe
    const passwordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordValid) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Créer le token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        familyRole: user.familyRole,
        title: user.title,
        phone: user.phone
      },
      message: 'Connexion réussie'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// GET /api/auth/verify
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({
    valid: true,
    user: req.user
  });
});

// GET /api/family/members
app.get('/api/family/members', (req, res) => {
  res.json(users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    familyRole: u.familyRole,
    title: u.title,
    phone: u.phone
  })));
});

// GET /api/users/:id/profile
app.get('/api/users/:id/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  // Vérifier que l'utilisateur ne peut voir que son propre profil
  if (req.user.userId !== req.params.id && req.user.role !== 'SUPER_ADMIN') {
    return res.status(403).json({ message: 'Accès refusé' });
  }

  res.json({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    name: user.name,
    role: user.role,
    familyRole: user.familyRole,
    title: user.title,
    phone: user.phone,
    canChangePassword: user.canChangePassword,
    createdAt: user.createdAt
  });
});

// PUT /api/users/:id/profile - Mettre à jour le profil
app.put('/api/users/:id/profile', authenticateToken, (req, res) => {
  const { firstName, lastName, phone, title } = req.body;

  // Vérifier que l'utilisateur ne peut modifier que son propre profil
  if (req.user.userId !== req.params.id && req.user.role !== 'SUPER_ADMIN') {
    return res.status(403).json({ message: 'Accès refusé' });
  }

  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  // Mettre à jour les champs
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (phone) user.phone = phone;
  if (title) user.title = title;

  // Mettre à jour le name complet
  user.name = `${user.firstName} ${user.lastName}`;

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    familyRole: user.familyRole,
    title: user.title,
    phone: user.phone,
    message: 'Profil mis à jour avec succès'
  });
});

// POST /api/users/:id/change-password - Changer le mot de passe
app.post('/api/users/:id/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Vérifier que l'utilisateur ne peut modifier que son propre mot de passe
    if (req.user.userId !== req.params.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Mot de passe actuel et nouveau requis' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'Le nouveau mot de passe doit contenir au moins 8 caractères' });
    }

    const user = users.find(u => u.id === req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier le mot de passe actuel
    const passwordValid = await bcrypt.compare(currentPassword, user.hashedPassword);
    if (!passwordValid) {
      return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
    }

    // Hasher le nouveau mot de passe et le mettre à jour
    user.hashedPassword = await bcrypt.hash(newPassword, 10);

    res.json({
      message: 'Mot de passe changé avec succès'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// --- Clients et Commandes (Orders) ---
// Données en mémoire pour développement
let clients = [
  { id: 'c1', name: 'Manjaka', phone: '+261 34 00 000 01', email: 'manjaka@example.com' },
  { id: 'c2', name: 'Dimby', phone: '+261 34 00 000 02', email: 'dimby@example.com' },
  { id: 'c3', name: 'Tito', phone: '+261 34 00 000 03', email: 'tito@example.com' }
];

let orders = []; // structure defined below

// Helper to generate simple ids
const generateId = (prefix = 'id') => `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

// GET /api/clients
app.get('/api/clients', authenticateToken, (req, res) => {
  res.json(clients);
});

// POST /api/clients
app.post('/api/clients', authenticateToken, (req, res) => {
  const { name, phone, email } = req.body;
  if (!name) return res.status(400).json({ message: 'Name required' });
  const client = { id: generateId('c'), name, phone: phone || '', email: email || '' };
  clients.push(client);
  res.status(201).json(client);
});

// GET /api/clients/:id
app.get('/api/clients/:id', authenticateToken, (req, res) => {
  const client = clients.find(c => c.id === req.params.id);
  if (!client) return res.status(404).json({ message: 'Client introuvable' });
  res.json(client);
});

// PUT /api/clients/:id - mettre à jour un client
app.put('/api/clients/:id', authenticateToken, (req, res) => {
  const client = clients.find(c => c.id === req.params.id);
  if (!client) return res.status(404).json({ message: 'Client introuvable' });
  const { name, phone, email } = req.body;
  if (name !== undefined) client.name = name;
  if (phone !== undefined) client.phone = phone;
  if (email !== undefined) client.email = email;
  res.json(client);
});

// GET /api/orders  (supports filters: clientId, status, sortBy, sortOrder, page, limit)
app.get('/api/orders', authenticateToken, (req, res) => {
  try {
    let results = [...orders];

    const { clientId, status, sortBy, sortOrder = 'desc', page = 1, limit = 50 } = req.query;
    if (clientId) results = results.filter(o => o.clientId === clientId);
    if (status) results = results.filter(o => o.status === status);

    if (sortBy) {
      results.sort((a, b) => {
        const dir = sortOrder === 'asc' ? 1 : -1;
        if (sortBy === 'orderDate' || sortBy === 'deliveryDate') {
          return (new Date(a[sortBy]) - new Date(b[sortBy])) * dir;
        }
        if (sortBy === 'totalPrice') {
          return (a.totalPrice - b.totalPrice) * dir;
        }
        return 0;
      });
    }

    // Pagination
    const p = Math.max(parseInt(page, 10), 1);
    const l = Math.max(parseInt(limit, 10), 1);
    const start = (p - 1) * l;
    const paged = results.slice(start, start + l);

    res.json({ total: results.length, page: p, limit: l, data: paged });
  } catch (err) {
    console.error('GET /api/orders error', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST /api/orders
app.post('/api/orders', authenticateToken, (req, res) => {
  try {
    const {
      clientId,
      deliveryDate,
      sizes = {},
      color = '',
      serigraphyImage = '',
      unitPrice = 0,
      notes = ''
    } = req.body;

    const client = clients.find(c => c.id === clientId);
    if (!client) return res.status(400).json({ message: 'Client invalide' });

    // sizes expected as object: { '4': 1, '6': 0, 'S': 2, ... }
    const availableSizes = ['4','6','8','10','S','M','L','XL','XXL'];
    let totalQty = 0;
    const quantities = {};
    availableSizes.forEach(s => {
      const q = parseInt(sizes[s] || 0, 10) || 0;
      quantities[s] = q;
      totalQty += q;
    });

    const orderDate = new Date();
    const delivery = deliveryDate ? new Date(deliveryDate) : null;
    const unitPriceNum = Number(unitPrice) || 0;
    const totalPrice = Math.round(totalQty * unitPriceNum);

    // Format sizes with quantities for display
    const sizesSummary = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([size, qty]) => `${size}: ${qty}`)
      .join(', ') || 'Aucune taille';

    const order = {
      id: generateId('o'),
      clientId,
      clientName: client.name,
      orderDate: orderDate.toISOString(),
      orderDateFormatted: orderDate.toLocaleString('fr-MG', { 
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      deliveryDate: delivery ? delivery.toISOString() : null,
      deliveryDateFormatted: delivery ? delivery.toLocaleDateString('fr-MG', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }) : 'Non spécifiée',
      sizes: quantities,
      sizesSummary,
      totalQty,
      color,
      serigraphyImage,
      unitPrice: unitPriceNum,
      totalPrice,
      notes,
      status: 'PENDING',
      createdBy: req.user.userId
    };

    orders.push(order);
    res.status(201).json(order);
  } catch (err) {
    console.error('POST /api/orders error', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// GET /api/orders/:id
app.get('/api/orders/:id', authenticateToken, (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ message: 'Commande introuvable' });
  res.json(order);
});

// PUT /api/orders/:id - mettre à jour (status, deliveryDate, sizes, unitPrice)
app.put('/api/orders/:id', authenticateToken, (req, res) => {
  try {
    const order = orders.find(o => o.id === req.params.id);
    if (!order) return res.status(404).json({ message: 'Commande introuvable' });

    const { status, deliveryDate, sizes = null, unitPrice = null, notes } = req.body;
    if (status) order.status = status;
    if (deliveryDate) order.deliveryDate = new Date(deliveryDate).toISOString();
    if (notes !== undefined) order.notes = notes;
    if (unitPrice !== null) {
      order.unitPrice = Number(unitPrice) || 0;
    }
    if (sizes) {
      let totalQty = 0;
      Object.keys(order.sizes).forEach(s => {
        const q = parseInt(sizes[s] || 0, 10) || 0;
        order.sizes[s] = q;
        totalQty += q;
      });
      order.totalQty = totalQty;
    }
    // Recompute total price
    order.totalPrice = Math.round(order.totalQty * (Number(order.unitPrice) || 0));

    res.json(order);
  } catch (err) {
    console.error('PUT /api/orders error', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// --- Fin Clients & Orders ---

// GET /api/calendar/events
app.get('/api/calendar/events', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Réunion Familiale',
      start: new Date(2025, 11, 15, 10, 0),
      end: new Date(2025, 11, 15, 12, 0),
      type: 'family'
    }
  ]);
});

// GET /api/dashboard/stats
app.get('/api/dashboard/stats', authenticateToken, (req, res) => {
  res.json({
    totalMembers: users.length,
    activeProjects: 5,
    upcomingEvents: 3,
    totalDocuments: 12,
    completionRate: 75,
    revenue: 45000,
    totalClients: clients.length,
    totalOrders: orders.length
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`\n✅ ByGagoos-Ink Backend démarré!`);
  console.log(`🚀 URL: http://localhost:${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/api/health`);
  console.log(`\n👥 4 utilisateurs configurés:`);
  users.forEach((u, i) => {
    console.log(`   ${i + 1}. ${u.name} (${u.title})`);
  });
  console.log(`\n🔑 Mot de passe temporaire pour tous: ByGagoos2025!\n`);
});

process.on('SIGINT', () => {
  console.log('\n👋 Serveur arrêté');
  process.exit(0);
});