// backend/server.js - SERVEUR PRINCIPAL COMPLET (VERSION RÉSEAU)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'bygagoos-dev-secret-2025';

// ======================
// CONFIGURATION CORS POUR RÉSEAU LOCAL ET VERCEL
// ======================
const allowedOrigins = [
  // Localhost développement
  'http://localhost:5173',
  'http://localhost:3000',
  
  // Vercel déploiements
  'https://bygagoos-ink.vercel.app',
  'https://bygagoos-ink-*.vercel.app',
  'https://bygagoos-ink-git-*.vercel.app',
  
  // ADRESSES RÉSEAU LOCAL - FRONTEND
  'http://192.168.88.11:5173',
  'http://172.29.240.1:5173',
  'http://172.23.240.1:5173',
  
  // ADRESSES RÉSEAU LOCAL - BACKEND (pour accès direct)
  'http://192.168.88.11:3001',
  'http://172.29.240.1:3001',
  'http://172.23.240.1:3001',
  
  // Autoriser toutes les adresses du réseau local (pour tests)
  /^http:\/\/192\.168\.\d+\.\d+:\d+$/,
  /^http:\/\/172\.\d+\.\d+\.\d+:\d+$/,
  /^http:\/\/10\.\d+\.\d+\.\d+:\d+$/
];

const corsOptions = {
  origin: function (origin, callback) {
    // Autoriser les requêtes sans origine (curl, postman, apps mobiles, serveur à serveur)
    if (!origin) return callback(null, true);
    
    // Vérifier si l'origine est dans la liste autorisée
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        // Gérer les wildcards (*.vercel.app)
        const pattern = allowed.replace(/\*/g, '.*');
        return new RegExp(pattern).test(origin);
      } else if (allowed instanceof RegExp) {
        // Vérifier les regex
        return allowed.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('🚫 CORS bloqué pour origine:', origin);
      console.log('📋 Origines autorisées:', 
        allowedOrigins.filter(o => typeof o === 'string').join(', '));
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
    'X-Auth-Token'
  ],
  exposedHeaders: [
    'Content-Length',
    'Authorization',
    'X-Total-Count',
    'X-Request-ID'
  ],
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
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware pour logger les requêtes
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(`🌐 ${timestamp} - ${req.method} ${req.url} - Origin: ${req.headers.origin || 'none'} - IP: ${ip}`);
  next();
});

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Token manquant',
      code: 'TOKEN_REQUIRED'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('❌ Token verification failed:', err.message);
      return res.status(403).json({ 
        success: false,
        message: 'Token invalide ou expiré',
        code: 'TOKEN_INVALID'
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
    createdAt: new Date('2025-01-01'),
    profileImage: 'tovoniaina.jpg'
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
    createdAt: new Date('2025-01-01'),
    profileImage: 'volatiana.jpg'
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
    createdAt: new Date('2025-01-01'),
    profileImage: 'miantsatiana.jpg'
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
    createdAt: new Date('2025-01-01'),
    profileImage: 'tia-faniry.jpg'
  }
];

// SERVIR LES FICHIERS STATIQUES
// ======================
const path = require('path');

// Servir les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml');
    }
  }
}));

// Routes spécifiques pour les dossiers
app.use('/profiles', express.static(path.join(__dirname, 'public/profiles'), {
  maxAge: '7d',
  index: false
}));

app.use('/production', express.static(path.join(__dirname, 'public/production'), {
  maxAge: '7d'
}));

app.use('/images', express.static(path.join(__dirname, 'public/images'), {
  maxAge: '7d'
}));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'), {
  maxAge: '7d'
}));

// Route pour vérifier les fichiers statiques
app.get('/api/public/*', (req, res) => {
  const filePath = req.params[0];
  console.log(`📁 Static file requested: ${filePath}`);
  res.sendFile(path.join(__dirname, 'public', filePath), (err) => {
    if (err) {
      console.log(`❌ Static file not found: ${filePath}`);
      res.status(404).json({ 
        success: false,
        error: 'File not found',
        path: filePath 
      });
    }
  });
});

// =========== ROUTES ===========

// GET / - Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🎨 ByGagoos Ink API - Sérigraphie Textile',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    network: {
      host: req.hostname,
      ip: req.ip,
      protocol: req.protocol
    },
    cors: {
      enabled: true,
      allowedOrigins: allowedOrigins.filter(o => typeof o === 'string')
    },
    endpoints: {
      root: 'GET /',
      health: 'GET /api/health',
      login: 'POST /api/auth/login',
      verify: 'GET /api/auth/verify',
      me: 'GET /api/auth/me',
      family: 'GET /api/family',
      familyMembers: 'GET /api/family/members',
      dashboard: 'GET /api/dashboard/stats',
      orders: 'GET /api/orders',
      docs: 'https://github.com/LeMizoo/bygagoos-ink'
    },
    stats: {
      users: users.length,
      uptime: process.uptime()
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
    memory: process.memoryUsage(),
    network: {
      host: req.hostname,
      origin: req.headers.origin || 'none',
      clientIp: req.ip
    },
    cors: {
      enabled: true,
      allowedOrigins: allowedOrigins.filter(o => typeof o === 'string'),
      requestOrigin: req.headers.origin || 'none',
      allowed: allowedOrigins.some(o => {
        if (typeof o === 'string') {
          const pattern = o.replace(/\*/g, '.*');
          return new RegExp(pattern).test(req.headers.origin || '');
        }
        return false;
      })
    },
    api: {
      totalRoutes: 10,
      authRoutes: 3,
      dataRoutes: 4
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
        message: 'Email et mot de passe requis',
        code: 'CREDENTIALS_REQUIRED'
      });
    }

    // Find user
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      console.log(`❌ Login échoué: email non trouvé - ${email}`);
      return res.status(401).json({ 
        success: false,
        message: 'Identifiants incorrects',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      console.log(`❌ Login échoué: mot de passe incorrect - ${email}`);
      return res.status(401).json({ 
        success: false,
        message: 'Identifiants incorrects',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role,
        familyRole: user.familyRole,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`✅ Login réussi: ${user.name} (${user.role})`);

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
        phone: user.phone,
        profileImage: user.profileImage,
        createdAt: user.createdAt
      },
      message: 'Connexion réussie',
      expiresIn: 7 * 24 * 60 * 60 // 7 jours en secondes
    });

  } catch (error) {
    console.error('🔥 Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur lors de la connexion',
      code: 'SERVER_ERROR',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/auth/verify - Verify token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    valid: true,
    user: req.user,
    message: 'Token valide'
  });
});

// GET /api/auth/me - Get current user profile (compatible avec frontend)
app.get('/api/auth/me', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé',
        code: 'USER_NOT_FOUND'
      });
    }
    
    // Ne pas renvoyer le mot de passe
    const { password, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      user: userWithoutPassword,
      tokenInfo: {
        issuedAt: req.user.iat,
        expiresAt: req.user.exp,
        issuedTo: req.user.email
      }
    });
  } catch (error) {
    console.error('🔥 Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération du profil',
      code: 'SERVER_ERROR'
    });
  }
});

// GET /api/family - Get all family members (compatible avec app.js)
app.get('/api/family', (req, res) => {
  try {
    const members = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.json({
      success: true,
      count: members.length,
      members
    });
  } catch (error) {
    console.error('🔥 Error fetching family:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur',
      code: 'SERVER_ERROR'
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
      profileImage: user.profileImage,
      color: user.familyRole === 'STRUCTURE' ? '#2E7D32' : 
             user.familyRole === 'INSPIRATION_CREATIVITY' ? '#9C27B0' : 
             user.familyRole === 'OPERATIONS_DESIGN' ? '#FF9800' : '#2196F3',
      emoji: user.familyRole === 'STRUCTURE' ? '🏗️' : 
             user.familyRole === 'INSPIRATION_CREATIVITY' ? '✨' : 
             user.familyRole === 'OPERATIONS_DESIGN' ? '🎨' : '📞',
      joined: user.createdAt
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
      revenue: 1250000,
      recentActivity: [
        { user: 'Tovoniaina', action: 'Nouveau client', time: '2h' },
        { user: 'Volatiana', action: 'Design approuvé', time: '4h' },
        { user: 'Miantsatiana', action: 'Commande expédiée', time: '1j' }
      ]
    };
    
    res.json({
      success: true,
      stats,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('🔥 Stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur',
      code: 'SERVER_ERROR'
    });
  }
});

// GET /api/orders - Get recent orders
app.get('/api/orders', authenticateToken, (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    
    // Données fictives pour le développement
    const allOrders = [
      {
        id: 'CMD-001',
        clientName: 'Client Entreprise A',
        orderDate: new Date(),
        totalQty: 10,
        unitPrice: 5000,
        totalPrice: 50000,
        status: 'En cours',
        priority: 'Haute'
      },
      {
        id: 'CMD-002',
        clientName: 'Client Startup B',
        orderDate: new Date(Date.now() - 86400000),
        totalQty: 5,
        unitPrice: 8000,
        totalPrice: 40000,
        status: 'Terminé',
        priority: 'Moyenne'
      },
      {
        id: 'CMD-003',
        clientName: 'Client Corporation C',
        orderDate: new Date(Date.now() - 172800000),
        totalQty: 8,
        unitPrice: 6500,
        totalPrice: 52000,
        status: 'En cours',
        priority: 'Basse'
      },
      {
        id: 'CMD-004',
        clientName: 'Client Association D',
        orderDate: new Date(Date.now() - 259200000),
        totalQty: 15,
        unitPrice: 3000,
        totalPrice: 45000,
        status: 'Terminé',
        priority: 'Moyenne'
      },
      {
        id: 'CMD-005',
        clientName: 'Client Indépendant E',
        orderDate: new Date(Date.now() - 345600000),
        totalQty: 3,
        unitPrice: 12000,
        totalPrice: 36000,
        status: 'En attente',
        priority: 'Haute'
      }
    ];
    
    const startIndex = (page - 1) * limit;
    const paginatedOrders = allOrders.slice(startIndex, startIndex + limit);
    
    res.json({
      success: true,
      count: paginatedOrders.length,
      total: allOrders.length,
      page,
      totalPages: Math.ceil(allOrders.length / limit),
      orders: paginatedOrders
    });
  } catch (error) {
    console.error('🔥 Orders error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur',
      code: 'SERVER_ERROR'
    });
  }
});

// GET /api/network/test - Test réseau
app.get('/api/network/test', (req, res) => {
  res.json({
    success: true,
    message: 'Test réseau réussi',
    networkInfo: {
      yourIp: req.ip,
      hostname: req.hostname,
      origin: req.headers.origin || 'none',
      protocol: req.protocol,
      method: req.method,
      timestamp: new Date().toISOString()
    },
    serverInfo: {
      port: PORT,
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      platform: process.platform
    },
    accessibleFrom: [
      `http://localhost:${PORT}`,
      `http://192.168.88.11:${PORT}`,
      `http://172.29.240.1:${PORT}`,
      `http://172.23.240.1:${PORT}`
    ]
  });
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
      networkTest: 'GET /api/network/test',
      login: 'POST /api/auth/login',
      verify: 'GET /api/auth/verify',
      me: 'GET /api/auth/me',
      family: 'GET /api/family',
      familyMembers: 'GET /api/family/members',
      dashboard: 'GET /api/dashboard/stats',
      orders: 'GET /api/orders'
    },
    suggestions: [
      'Vérifiez l\'URL',
      'Vérifiez la méthode HTTP (GET, POST, etc.)',
      'Consultez la documentation à la racine /'
    ]
  });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error('🔥 Server error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.url,
    method: req.method,
    origin: req.headers.origin,
    ip: req.ip
  });
  
  // Erreur CORS spécifique
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'Accès interdit par la politique CORS',
      code: 'CORS_ERROR',
      yourOrigin: req.headers.origin || 'non spécifiée',
      allowedOrigins: allowedOrigins.filter(o => typeof o === 'string'),
      timestamp: new Date().toISOString(),
      suggestion: 'Contactez l\'administrateur pour ajouter votre domaine'
    });
  }
  
  // Erreur JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token d\'authentification invalide',
      code: 'JWT_ERROR'
    });
  }
  
  // Erreur JWT expiration
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expiré',
      code: 'TOKEN_EXPIRED',
      suggestion: 'Veuillez vous reconnecter'
    });
  }
  
  // Erreur générale
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur',
    code: 'INTERNAL_ERROR',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    timestamp: new Date().toISOString(),
    requestId: req.headers['x-request-id'] || Date.now().toString()
  });
});

// ======================
// DÉMARRAGE SERVEUR (ÉCOUTE SUR TOUTES LES INTERFACES)
// ======================
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔════════════════════════════════════════════════════════════════════════════════╗
║                         BYGAGOOS INK API SERVER                                ║
║                               Version: 1.0.0                                   ║
║                         Env: ${(process.env.NODE_ENV || 'development').padEnd(20)} ║
║                         Port: ${PORT} (écoute sur toutes interfaces)             ║
╚════════════════════════════════════════════════════════════════════════════════╝
    `);
    
    console.log(`✅ Serveur démarré sur toutes les interfaces:`);
    console.log(`   • http://localhost:${PORT}`);
    console.log(`   • http://192.168.88.11:${PORT}`);
    console.log(`   • http://172.29.240.1:${PORT}`);
    console.log(`   • http://172.23.240.1:${PORT}`);
    console.log(`   • http://[VOTRE-IP-LOCALE]:${PORT}`);
    
    console.log(`\n🔗 Endpoints principaux:`);
    console.log(`   🩺 Health: GET http://localhost:${PORT}/api/health`);
    console.log(`   🌐 Network Test: GET http://localhost:${PORT}/api/network/test`);
    console.log(`   🔐 Login: POST http://localhost:${PORT}/api/auth/login`);
    console.log(`   👤 User Profile: GET http://localhost:${PORT}/api/auth/me`);
    console.log(`   👨‍👩‍👧‍👦 Famille: GET http://localhost:${PORT}/api/family`);
    
    console.log(`\n📋 ${users.length} utilisateurs configurés:`);
    users.forEach(user => {
      console.log(`   • ${user.email.padEnd(45)} - ${user.role.padEnd(12)} (${user.familyRole})`);
    });
    
    console.log(`\n🔑 Mot de passe par défaut: ByGagoos2025!`);
    
    console.log(`\n🌐 CORS configuré pour ${allowedOrigins.length} origines/règles`);
    console.log(`🌐 **ACCÈS RÉSEAU ACTIVÉ** - Prêt pour tests équipe familiale`);
    
    console.log(`\n🚀 **URLs de test pour l'équipe familiale:**`);
    console.log(`   Frontend: http://192.168.88.11:5173`);
    console.log(`   Backend API: http://192.168.88.11:3001/api/health`);
    console.log(`   Backend API: http://172.29.240.1:3001/api/health`);
    console.log(`   Backend API: http://172.23.240.1:3001/api/health`);
    
    console.log(`\n📝 **Pour tester depuis une autre machine:**`);
    console.log(`   1. Assurez-vous d'être sur le même réseau Wi-Fi`);
    console.log(`   2. Ouvrez http://192.168.88.11:5173 dans votre navigateur`);
    console.log(`   3. Connectez-vous avec vos identifiants`);
    console.log(`\n📊 Test réseau: curl http://192.168.88.11:3001/api/network/test`);
  });
}

module.exports = app;