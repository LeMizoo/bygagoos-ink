// backend/app.js - VERSION UNIVERSELLE CORRIGÉE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

// ============================================
// DÉTECTION AUTOMATIQUE DU MODE
// ============================================
const isDocker = process.env.NODE_ENV === 'docker' || 
                 process.env.DATABASE_URL?.includes('postgres:') ||
                 fs.existsSync('/.dockerenv');

const isSQLite = process.env.DATABASE_URL?.includes('file:') || 
                 !process.env.DATABASE_URL?.includes('postgres:');

console.log('🔧 Configuration détectée:');
console.log(`   Mode: ${isDocker ? '🐳 Docker' : '💻 Local'}`);
console.log(`   Database: ${isSQLite ? 'SQLite' : 'PostgreSQL'}`);
console.log(`   Port: ${process.env.PORT || 3001}`);

// Vérification de la configuration
if (!process.env.DATABASE_URL) {
  console.error('❌ ERREUR: DATABASE_URL non configurée dans .env');
  console.error('   Pour Docker: DATABASE_URL="postgresql://postgres:password@postgres:5432/bygagoos_ink"');
  console.error('   Pour Local: DATABASE_URL="file:./dev.db"');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('❌ ERREUR: JWT_SECRET non configurée');
  console.error('   Ajoutez: JWT_SECRET="votre-secret-key"');
  process.exit(1);
}

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// ============================================
// MIDDLEWARE
// ============================================
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: ['http://localhost:5173', 'http://172.18.0.4:5173'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Servir les fichiers statiques
app.use('/api/public', express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// ============================================
// ROUTES DIRECTES POUR LES IMAGES (FALLBACK)
// ============================================
app.get('/api/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'public/images', filename);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    // Fallback vers placeholder
    res.redirect(`https://via.placeholder.com/300x300/2E7D32/ffffff?text=BYGAGOOS`);
  }
});

app.get('/api/profiles/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'public/profiles', filename);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    // Fallback local
    const fallbackImages = {
      'tovoniaina.jpg': '👑',
      'volatiana.jpg': '💡', 
      'miantsatiana.jpg': '🎨',
      'tia-faniry.jpg': '📢'
    };
    const initial = fallbackImages[filename] || '👤';
    res.redirect(`https://via.placeholder.com/150x150/2E7D32/ffffff?text=${encodeURIComponent(initial)}`);
  }
});

// ============================================
// MIDDLEWARE D'AUTHENTIFICATION
// ============================================
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Token manquant',
        code: 'TOKEN_MISSING'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId || decoded.id }
    });

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Utilisateur non trouvé',
        code: 'USER_NOT_FOUND'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Auth error:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expiré',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        success: false,
        message: 'Token invalide',
        code: 'TOKEN_INVALID'
      });
    }
    
    return res.status(500).json({ 
      success: false,
      message: 'Erreur d\'authentification',
      code: 'AUTH_ERROR'
    });
  }
};

// ============================================
// ROUTES PUBLIQUES
// ============================================

// Route de base
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 ByGagoos-Ink API',
    version: '2.1.0',
    timestamp: new Date().toISOString(),
    mode: isDocker ? 'docker' : 'local',
    database: isSQLite ? 'sqlite' : 'postgresql',
    endpoints: {
      health: 'GET /api/health',
      login: 'POST /api/auth/login',
      profile: 'GET /api/auth/me',
      family: 'GET /api/family/members',
      dashboard: 'GET /api/dashboard/stats',
      orders: 'GET /api/orders'
    }
  });
});

// Route de santé (PUBLIC)
app.get('/api/health', async (req, res) => {
  try {
    // Test de connexion à la base
    await prisma.$queryRaw`SELECT 1`;
    const usersCount = await prisma.user.count().catch(() => 0);
    
    const healthData = {
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'ByGagoos-Ink API',
      version: '2.1.0',
      database: {
        type: isSQLite ? 'sqlite' : 'postgresql',
        connected: true,
        usersCount: usersCount
      },
      environment: process.env.NODE_ENV || 'development',
      mode: isDocker ? 'docker' : 'local',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      baseUrl: `${req.protocol}://${req.get('host')}`
    };

    res.json(healthData);
  } catch (error) {
    console.error('❌ Health check error:', error);
    
    res.status(500).json({
      success: false,
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
      database: {
        type: isSQLite ? 'sqlite' : 'postgresql',
        connected: false
      },
      fix: 'Exécutez: npx prisma db push',
      fallback: 'Le mode local sera activé'
    });
  }
});

// Route de connexion (PUBLIC)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email et mot de passe requis',
        code: 'MISSING_CREDENTIALS'
      });
    }

    console.log(`🔐 Tentative de connexion pour: ${email}`);

    // Recherche utilisateur
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (!user) {
      console.log(`❌ Utilisateur non trouvé: ${email}`);
      return res.status(401).json({ 
        success: false,
        message: 'Identifiants incorrects',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Vérification du mot de passe
    let isValidPassword = false;
    try {
      if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
        // Mot de passe haché
        isValidPassword = await bcrypt.compare(password, user.password);
      } else {
        // Mot de passe en clair (développement uniquement)
        isValidPassword = password === user.password;
        
        // Hash pour la prochaine fois
        if (isValidPassword) {
          const hashedPassword = await bcrypt.hash(password, 10);
          await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword }
          });
          console.log(`🔒 Mot de passe hashé pour: ${email}`);
        }
      }
    } catch (hashError) {
      console.error('❌ Erreur vérification mot de passe:', hashError);
      // Fallback: comparaison directe pour développement
      isValidPassword = password === user.password;
    }
    
    if (!isValidPassword) {
      console.log(`❌ Mot de passe incorrect pour: ${email}`);
      return res.status(401).json({ 
        success: false,
        message: 'Identifiants incorrects',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Création du token JWT
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role || 'MEMBER',
      name: user.name || user.email.split('@')[0]
    };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Configuration des rôles
    const roleConfig = {
      STRUCTURE: { emoji: '👑', color: '#2E7D32', image: 'tovoniaina.jpg' },
      INSPIRATION: { emoji: '💡', color: '#9C27B0', image: 'volatiana.jpg' },
      CREATION: { emoji: '🎨', color: '#FF9800', image: 'miantsatiana.jpg' },
      COMMUNICATION: { emoji: '📢', color: '#2196F3', image: 'tia-faniry.jpg' },
      SUPER_ADMIN: { emoji: '👑', color: '#2E7D32', image: 'tovoniaina.jpg' },
      ADMIN: { emoji: '⚡', color: '#D32F2F', image: 'default.jpg' },
      FAMILY_MEMBER: { emoji: '👤', color: '#666666', image: 'default.jpg' },
      MEMBER: { emoji: '👤', color: '#666666', image: 'default.jpg' }
    };

    const userRole = user.role || 'MEMBER';
    const config = roleConfig[userRole] || { 
      emoji: '👤', 
      color: user.color || '#666666', 
      image: 'default.jpg' 
    };

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imageUrl = `${baseUrl}/api/public/profiles/${config.image}`;

    console.log(`✅ Connexion réussie: ${user.name || user.email}`);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name || user.email,
        email: user.email,
        role: userRole,
        color: user.color || config.color,
        emoji: config.emoji,
        description: user.description || `Membre ${userRole}`,
        image: imageUrl,
        createdAt: user.createdAt
      },
      message: `Bienvenue ${user.name || user.email} !`,
      mode: isDocker ? 'docker' : 'local'
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur lors de la connexion',
      code: 'SERVER_ERROR',
      error: error.message
    });
  }
});

// ============================================
// ROUTES PROTÉGÉES
// ============================================

// Route profil utilisateur
app.get('/api/auth/me', authenticateToken, (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    const roleConfig = {
      STRUCTURE: { emoji: '👑', color: '#2E7D32', image: 'tovoniaina.jpg' },
      INSPIRATION: { emoji: '💡', color: '#9C27B0', image: 'volatiana.jpg' },
      CREATION: { emoji: '🎨', color: '#FF9800', image: 'miantsatiana.jpg' },
      COMMUNICATION: { emoji: '📢', color: '#2196F3', image: 'tia-faniry.jpg' },
      SUPER_ADMIN: { emoji: '👑', color: '#2E7D32', image: 'tovoniaina.jpg' },
      ADMIN: { emoji: '⚡', color: '#D32F2F', image: 'default.jpg' },
      FAMILY_MEMBER: { emoji: '👤', color: '#666666', image: 'default.jpg' }
    };

    const userRole = req.user.role || 'MEMBER';
    const config = roleConfig[userRole] || { 
      emoji: '👤', 
      color: req.user.color || '#666666', 
      image: 'default.jpg' 
    };

    const imageUrl = `${baseUrl}/api/public/profiles/${config.image}`;

    res.json({
      success: true,
      user: {
        id: req.user.id,
        name: req.user.name || req.user.email,
        email: req.user.email,
        role: userRole,
        color: req.user.color || config.color,
        emoji: config.emoji,
        description: req.user.description || `Membre ${userRole}`,
        image: imageUrl,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt
      },
      mode: isDocker ? 'docker' : 'local'
    });
  } catch (error) {
    console.error('❌ Error in /api/auth/me:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur',
      code: 'SERVER_ERROR'
    });
  }
});

// Route pour les membres de la famille
app.get('/api/family/members', authenticateToken, async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'asc' }
    });

    const roleConfig = {
      STRUCTURE: { emoji: '👑', color: '#2E7D32', image: 'tovoniaina.jpg' },
      INSPIRATION: { emoji: '💡', color: '#9C27B0', image: 'volatiana.jpg' },
      CREATION: { emoji: '🎨', color: '#FF9800', image: 'miantsatiana.jpg' },
      COMMUNICATION: { emoji: '📢', color: '#2196F3', image: 'tia-faniry.jpg' },
      SUPER_ADMIN: { emoji: '👑', color: '#2E7D32', image: 'tovoniaina.jpg' },
      ADMIN: { emoji: '⚡', color: '#D32F2F', image: 'default.jpg' },
      FAMILY_MEMBER: { emoji: '👤', color: '#666666', image: 'default.jpg' }
    };

    const members = users.map(user => {
      const userRole = user.role || 'MEMBER';
      const config = roleConfig[userRole] || { 
        emoji: '👤', 
        color: user.color || '#666666', 
        image: 'default.jpg' 
      };
      
      const imageUrl = `${baseUrl}/api/public/profiles/${config.image}`;
      
      return {
        id: user.id,
        name: user.name || user.email,
        email: user.email,
        role: userRole,
        color: user.color || config.color,
        emoji: config.emoji,
        description: user.description || `Membre ${userRole}`,
        image: imageUrl,
        createdAt: user.createdAt
      };
    });

    res.json({
      success: true,
      baseUrl: baseUrl,
      count: members.length,
      members,
      mode: isDocker ? 'docker' : 'local'
    });

  } catch (error) {
    console.error('❌ Error getting family members:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      code: 'SERVER_ERROR'
    });
  }
});

// Routes Dashboard
app.get('/api/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    const usersCount = await prisma.user.count().catch(() => 0);
    
    res.json({
      success: true,
      stats: {
        totalMembers: usersCount,
        totalClients: 12,
        totalOrders: 24,
        activeProjects: 3,
        upcomingEvents: 2,
        totalDocuments: 15,
        completionRate: 75,
        revenue: 1250000
      },
      mode: isDocker ? 'docker' : 'local'
    });
  } catch (error) {
    console.error('❌ Error getting dashboard stats:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erreur serveur',
      code: 'SERVER_ERROR'
    });
  }
});

app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    
    res.json({
      success: true,
      orders: [
        { 
          id: 'CMD-001', 
          clientName: 'Client Test 1', 
          orderDate: new Date(), 
          totalQty: 10, 
          unitPrice: 5000, 
          totalPrice: 50000, 
          status: 'En cours' 
        },
        { 
          id: 'CMD-002', 
          clientName: 'Client Test 2', 
          orderDate: new Date(Date.now() - 86400000), 
          totalQty: 5, 
          unitPrice: 8000, 
          totalPrice: 40000, 
          status: 'Terminé' 
        },
      ].slice(0, limit),
      mode: isDocker ? 'docker' : 'local'
    });
  } catch (error) {
    console.error('❌ Error getting orders:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erreur serveur',
      code: 'SERVER_ERROR'
    });
  }
});

// ============================================
// ROUTES FALLBACK POUR LE DÉVELOPPEMENT
// ============================================

// Route pour vérifier la base de données (PUBLIC - développement uniquement)
app.get('/api/debug/db', async (req, res) => {
  try {
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `.catch(async () => {
      // Fallback pour SQLite
      return await prisma.$queryRaw`SELECT name as table_name FROM sqlite_master WHERE type='table'`;
    });

    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true }
    });

    res.json({
      success: true,
      database: {
        type: isSQLite ? 'sqlite' : 'postgresql',
        connected: true,
        tables: tables,
        usersCount: users.length,
        users: users
      },
      environment: {
        node_env: process.env.NODE_ENV,
        port: PORT,
        database_url: process.env.DATABASE_URL ? '***configured***' : 'missing',
        jwt_secret: process.env.JWT_SECRET ? '***configured***' : 'missing'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      database: {
        type: isSQLite ? 'sqlite' : 'postgresql',
        connected: false
      },
      fix: 'Exécutez: npx prisma db push'
    });
  }
});

// Route de création d'utilisateur test (PUBLIC - développement uniquement)
app.post('/api/debug/create-test-user', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Non disponible en production' });
  }

  try {
    const hashedPassword = await bcrypt.hash('ByGagoos2025!', 10);
    
    const user = await prisma.user.create({
      data: {
        email: 'test@bygagoos.com',
        password: hashedPassword,
        name: 'Test User',
        role: 'SUPER_ADMIN',
        color: '#2E7D32',
        description: 'Utilisateur test'
      }
    });

    res.json({
      success: true,
      message: 'Utilisateur test créé',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      login: {
        email: 'test@bygagoos.com',
        password: 'ByGagoos2025!'
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// ============================================
// GESTION DES ERREURS
// ============================================

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route non trouvée',
    path: req.originalUrl,
    availableRoutes: [
      'GET    /',
      'GET    /api/health',
      'POST   /api/auth/login',
      'GET    /api/auth/me (protégé)',
      'GET    /api/family/members (protégé)',
      'GET    /api/dashboard/stats (protégé)',
      'GET    /api/orders (protégé)',
      'GET    /api/debug/db (dev)',
      'POST   /api/debug/create-test-user (dev)'
    ]
  });
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  
  const errorResponse = {
    success: false,
    error: 'Erreur interne du serveur',
    code: 'INTERNAL_SERVER_ERROR',
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  };

  // En développement, ajouter plus de détails
  if (process.env.NODE_ENV !== 'production') {
    errorResponse.message = err.message;
    errorResponse.stack = err.stack;
  }

  res.status(500).json(errorResponse);
});

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================
const startServer = async () => {
  try {
    // Test de connexion à la base
    console.log('🔌 Test de connexion à la base de données...');
    await prisma.$connect();
    console.log('✅ Connexion à la base réussie');

    // Vérifier si la table users existe
    try {
      const userCount = await prisma.user.count();
      console.log(`📊 Utilisateurs dans la base: ${userCount}`);
      
      if (userCount === 0) {
        console.log('⚠️  Base vide - Pas d\'utilisateurs trouvés');
        console.log('   Pour créer un utilisateur test:');
        console.log('   curl -X POST http://localhost:3001/api/debug/create-test-user');
      }
    } catch (error) {
      console.log('⚠️  Tables non créées - Exécutez:');
      console.log('   npx prisma db push');
    }

    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log('\n' + '='.repeat(70));
      console.log('🚀 BYGAGOOS INK API SERVER');
      console.log('='.repeat(70));
      console.log(`📍 Port: ${PORT}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`📊 Base: ${isSQLite ? 'SQLite' : 'PostgreSQL'}`);
      console.log(`🎭 Mode: ${isDocker ? 'Docker 🐳' : 'Local 💻'}`);
      console.log('='.repeat(70));
      console.log('\n📋 ENDPOINTS DISPONIBLES:');
      console.log('├── GET  /                      - Info API');
      console.log('├── GET  /api/health            - Vérification santé');
      console.log('├── POST /api/auth/login        - Connexion');
      console.log('├── GET  /api/auth/me           - Profil (protégé)');
      console.log('├── GET  /api/family/members    - Membres famille (protégé)');
      console.log('└── GET  /api/debug/db          - Info base (dev)');
      console.log('\n🔐 UTILISATEURS PAR DÉFAUT:');
      console.log('├── tovoniaina.rahendrison@gmail.com / ByGagoos2025!');
      console.log('├── dedettenadia@gmail.com           / ByGagoos2025!');
      console.log('├── miantsatianarahendrison@gmail.com / ByGagoos2025!');
      console.log('└── fanirytia17@gmail.com            / ByGagoos2025!');
      console.log('\n' + '='.repeat(70));
      console.log('✅ SERVEUR PRÊT - Connectez-vous depuis le frontend!');
      console.log('='.repeat(70));
    });

    // Gestion arrêt propre
    const shutdown = async (signal) => {
      console.log(`\n${signal} reçu - Arrêt en cours...`);
      await prisma.$disconnect();
      server.close(() => {
        console.log('✅ Serveur arrêté proprement');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error('❌ Échec démarrage serveur:', error);
    
    // Mode fallback si la base échoue
    if (error.code === 'P1001' || error.message.includes('connect')) {
      console.log('\n⚠️  MODE FALLBACK ACTIVÉ');
      console.log('   La base de données n\'est pas accessible');
      console.log('   Le frontend utilisera le mode local');
      console.log('\n📋 Pour résoudre:');
      console.log('   1. Vérifiez que PostgreSQL tourne (docker-compose ps)');
      console.log('   2. Exécutez: npx prisma db push');
      console.log('   3. Ou utilisez SQLite: DATABASE_URL="file:./dev.db"');
    }
    
    process.exit(1);
  }
};

// Démarrer le serveur
startServer();

module.exports = app;