// backend/server.js - SERVEUR PRINCIPAL COMPLET
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001; // CHANGÉ DE 3002 À 3001
const JWT_SECRET = process.env.JWT_SECRET || 'bygagoos-dev-secret-2025';

// ======================
// CONFIGURATION CORS POUR VERCEL
// ======================
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://bygagoos-ink.vercel.app',
  'https://bygagoos-ink-*.vercel.app',
  'https://bygagoos-ink-git-*.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Autoriser les requêtes sans origine (curl, postman, apps mobiles, etc.)
    if (!origin) return callback(null, true);
    
    // Vérifier si l'origine est dans la liste autorisée
    const isAllowed = allowedOrigins.some(allowed => {
      // Gérer les wildcards (*.vercel.app)
      const pattern = allowed.replace('*', '.*');
      return new RegExp(pattern).test(origin);
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('🚫 CORS blocked for origin:', origin);
      console.log('✅ Allowed origins:', allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  exposedHeaders: ['Content-Length', 'Authorization'],
  maxAge: 86400, // Cache preflight pendant 24h
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Appliquer CORS AVANT les autres middlewares
app.use(cors(corsOptions));

// Gérer les requêtes OPTIONS (preflight) pour toutes les routes
app.options('*', cors(corsOptions));

// ======================
// MIDDLEWARE
// ======================
app.use(express.json());

// Middleware pour logger les requêtes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.headers.origin || 'none'}`);
  next();
});

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Token manquant' 
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err.message);
      return res.status(403).json({ 
        success: false,
        message: 'Token invalide ou expiré' 
      });
    }
    req.user = user;
    next();
  });
};

// ======================
// DONNÉES (pour développement)
// ======================
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
    password: bcrypt.hashSync('ByGagoos2025!', 10),
    createdAt: new Date('2025-01-01')
  },
  {
    id: '2',
    email: 'dedettenadia@gmail.com',
    firstName: 'Volatiana',
    lastName: 'RANDRIANARISOA',
    name: 'Volatiana RANDRIANARISOA',
    role: 'ADMIN',
    familyRole: 'INSPIRATION_CREATIVITY',
    title: 'Inspiration & Créativité',
    phone: '+261 34 43 359 30',
    password: bcrypt.hashSync('ByGagoos2025!', 10),
    createdAt: new Date('2025-01-01')
  },
  {
    id: '3',
    email: 'miantsatianarahendrison@gmail.com',
    firstName: 'Miantsatiana',
    lastName: 'RAHENDRISON',
    name: 'Miantsatiana RAHENDRISON',
    role: 'ADMIN',
    familyRole: 'OPERATIONS_DESIGN',
    title: 'Opérations & Design',
    phone: '+261 34 75 301 07',
    password: bcrypt.hashSync('ByGagoos2025!', 10),
    createdAt: new Date('2025-01-01')
  },
  {
    id: '4',
    email: 'fanirytia17@gmail.com',
    firstName: 'Tia Faniry',
    lastName: 'RAHENDRISON',
    name: 'Tia Faniry RAHENDRISON',
    role: 'ADMIN',
    familyRole: 'ADMIN_COMMUNICATION',
    title: 'Admin & Communication',
    phone: '+261 38 44 993 77',
    password: bcrypt.hashSync('ByGagoos2025!', 10),
    createdAt: new Date('2025-01-01')
  }
];

// SERVIR LES FICHIERS STATIQUES
// ======================
const path = require('path');

// Servir les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Routes spécifiques pour les dossiers
app.use('/profiles', express.static(path.join(__dirname, 'public/profiles')));
app.use('/production', express.static(path.join(__dirname, 'public/production')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Route pour vérifier les fichiers statiques
app.get('/api/public/*', (req, res) => {
  const filePath = req.params[0];
  console.log(`📁 Static file requested: ${filePath}`);
  res.sendFile(path.join(__dirname, 'public', filePath), (err) => {
    if (err) {
      console.log(`❌ Static file not found: ${filePath}`);
      res.status(404).json({ error: 'File not found', path: filePath });
    }
  });
});

// =========== ROUTES ===========

// GET / - Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🎨 ByGagoos Ink API - Sérigraphie Textile',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    cors: {
      enabled: true,
      allowedOrigins: allowedOrigins
    },
    endpoints: {
      root: 'GET /',
      health: 'GET /api/health',
      login: 'POST /api/auth/login',
      verify: 'GET /api/auth/verify',
      family: 'GET /api/family',
      familyMembers: 'GET /api/family/members',
      dashboard: 'GET /api/dashboard/stats',
      orders: 'GET /api/orders',
      docs: 'https://github.com/LeMizoo/bygagoos-ink'
    }
  });
});

// GET /api/health - Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    service: 'ByGagoos-Ink API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    cors: {
      enabled: true,
      allowedOrigins: allowedOrigins,
      requestOrigin: req.headers.origin || 'none'
    },
    headers: {
      origin: req.headers.origin,
      'access-control-allow-origin': req.headers.origin && allowedOrigins.some(o => o.includes(req.headers.origin)) ? req.headers.origin : 'not-allowed'
    }
  });
});

// POST /api/auth/login - Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email et mot de passe requis' 
      });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Identifiants incorrects' 
      });
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ 
        success: false,
        message: 'Identifiants incorrects' 
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role,
        familyRole: user.familyRole 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
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
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur' 
    });
  }
});

// GET /api/auth/verify - Verify token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({
    valid: true,
    user: req.user
  });
});

// GET /api/family - Get all family members (compatible avec app.js)
app.get('/api/family', (req, res) => {
  try {
    const members = users.map(user => {
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        familyRole: user.familyRole,
        createdAt: user.createdAt
      };
    });

    res.json(members);
  } catch (error) {
    console.error('Error fetching family:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur' 
    });
  }
});

// GET /api/family/members - Get all family members (format enrichi)
app.get('/api/family/members', (req, res) => {
  const members = users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      familyRole: user.familyRole,
      title: user.title,
      phone: user.phone,
      color: user.familyRole === 'STRUCTURE' ? '#2E7D32' : 
             user.familyRole === 'INSPIRATION_CREATIVITY' ? '#9C27B0' : 
             user.familyRole === 'OPERATIONS_DESIGN' ? '#FF9800' : '#2196F3',
      emoji: user.familyRole === 'STRUCTURE' ? '🏗️' : 
             user.familyRole === 'INSPIRATION_CREATIVITY' ? '✨' : 
             user.familyRole === 'OPERATIONS_DESIGN' ? '🎨' : '📞'
    };
  });

  res.json({
    success: true,
    count: members.length,
    members
  });
});

// GET /api/dashboard/stats - Dashboard statistics
app.get('/api/dashboard/stats', authenticateToken, (req, res) => {
  try {
    const stats = {
      totalMembers: users.length,
      totalClients: 12,
      totalOrders: 24,
      activeProjects: 3,
      upcomingEvents: 2,
      totalDocuments: 15,
      completionRate: 75,
      revenue: 1250000
    };
    
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur' 
    });
  }
});

// GET /api/orders - Get recent orders
app.get('/api/orders', authenticateToken, (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    
    // Données fictives pour le développement
    const orders = [
      {
        id: 'CMD-001',
        clientName: 'Client Entreprise A',
        orderDate: new Date(),
        totalQty: 10,
        unitPrice: 5000,
        totalPrice: 50000,
        status: 'En cours'
      },
      {
        id: 'CMD-002',
        clientName: 'Client Startup B',
        orderDate: new Date(Date.now() - 86400000),
        totalQty: 5,
        unitPrice: 8000,
        totalPrice: 40000,
        status: 'Terminé'
      },
      {
        id: 'CMD-003',
        clientName: 'Client Corporation C',
        orderDate: new Date(Date.now() - 172800000),
        totalQty: 8,
        unitPrice: 6500,
        totalPrice: 52000,
        status: 'En cours'
      },
      {
        id: 'CMD-004',
        clientName: 'Client Association D',
        orderDate: new Date(Date.now() - 259200000),
        totalQty: 15,
        unitPrice: 3000,
        totalPrice: 45000,
        status: 'Terminé'
      },
      {
        id: 'CMD-005',
        clientName: 'Client Indépendant E',
        orderDate: new Date(Date.now() - 345600000),
        totalQty: 3,
        unitPrice: 12000,
        totalPrice: 36000,
        status: 'En attente'
      }
    ].slice(0, limit);
    
    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Orders error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur' 
    });
  }
});

// ======================
// GESTION DES ERREURS
// ======================

// 404 - Route non trouvée
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
    availableRoutes: {
      root: 'GET /',
      health: 'GET /api/health',
      login: 'POST /api/auth/login',
      verify: 'GET /api/auth/verify',
      family: 'GET /api/family',
      familyMembers: 'GET /api/family/members',
      dashboard: 'GET /api/dashboard/stats',
      orders: 'GET /api/orders'
    }
  });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error('🔥 Server error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    origin: req.headers.origin
  });
  
  // Erreur CORS spécifique
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'Accès interdit par la politique CORS',
      allowedOrigins: allowedOrigins,
      yourOrigin: req.headers.origin || 'non spécifiée',
      timestamp: new Date().toISOString()
    });
  }
  
  // Erreur JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token d\'authentification invalide'
    });
  }
  
  // Erreur générale
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    timestamp: new Date().toISOString()
  });
});

// ======================
// DÉMARRAGE SERVEUR
// ======================
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════════════╗
║                    BYGAGOOS INK API SERVER                       ║
║                     Version: 1.0.0                               ║
║                     Env: ${process.env.NODE_ENV || 'development'}                     ║
║                     Port: ${PORT}                                    ║
╚══════════════════════════════════════════════════════════════════╝
    `);
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
    console.log(`🩺 API Health: http://localhost:${PORT}/api/health`);
    console.log(`🔐 Login: POST http://localhost:${PORT}/api/auth/login`);
    console.log(`👨‍👩‍👧‍👦 Famille: http://localhost:${PORT}/api/family`);
    console.log(`\n📋 ${users.length} utilisateurs configurés:`);
    users.forEach(user => {
      console.log(`   • ${user.email} - ${user.role} (${user.familyRole})`);
    });
    console.log(`\n🔑 Mot de passe par défaut: ByGagoos2025!`);
    console.log(`\n🌐 CORS configuré pour ${allowedOrigins.length} origines`);
    allowedOrigins.forEach(origin => console.log(`   • ${origin}`));
  });
}

module.exports = app;