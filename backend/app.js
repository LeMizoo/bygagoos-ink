// backend/app.js - VERSION AVEC PRISMA
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

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Servir les fichiers statiques
app.use('/api/public', express.static(path.join(__dirname, 'public')));

// Middleware d'authentification
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token invalide' });
  }
};

// Route de base
app.get('/', (req, res) => {
  res.json({
    message: '🚀 ByGagoos-Ink API avec Prisma',
    version: '1.0.0',
    family: 'BYGAGOOS FAMILY',
    database: 'PostgreSQL + Prisma',
    timestamp: new Date().toISOString()
  });
});

// Route de santé avec vérification DB
app.get('/api/health', async (req, res) => {
  try {
    // Vérifier la connexion à la base de données
    await prisma.$queryRaw`SELECT 1`;
    
    const usersCount = await prisma.user.count();
    
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'ByGagoos-Ink API',
      database: 'CONNECTED',
      users: usersCount,
      images: '✅ Disponibles',
      prisma: '✅ Connecté'
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      service: 'ByGagoos-Ink API',
      database: 'DISCONNECTED',
      error: error.message
    });
  }
});

// Route pour lister les images
app.get('/api/images/list', (req, res) => {
  try {
    const imagesPath = path.join(__dirname, 'public/images');
    const profilesPath = path.join(__dirname, 'public/profiles');
    
    const images = fs.existsSync(imagesPath) ? fs.readdirSync(imagesPath) : [];
    const profiles = fs.existsSync(profilesPath) ? fs.readdirSync(profilesPath) : [];
    
    res.json({
      status: 'OK',
      total: images.length + profiles.length,
      images: images.map(img => `/api/public/images/${img}`),
      profiles: profiles.map(profile => `/api/public/profiles/${profile}`)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route de connexion avec Prisma
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email et mot de passe requis' 
      });
    }

    // Chercher l'utilisateur dans la base
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ 
        message: 'Identifiants incorrects' 
      });
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ 
        message: 'Identifiants incorrects' 
      });
    }

    // Créer le token JWT
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Déterminer l'emoji et l'image basée sur le rôle
    const roleConfig = {
      STRUCTURE: { emoji: '👑', color: '#2E7D32', image: 'tovoniaina.jpg' },
      INSPIRATION: { emoji: '💡', color: '#9C27B0', image: 'volatiana.jpg' },
      CREATION: { emoji: '🎨', color: '#FF9800', image: 'miantsatiana.jpg' },
      COMMUNICATION: { emoji: '📢', color: '#2196F3', image: 'tia-faniry.jpg' }
    };

    const config = roleConfig[user.role] || { emoji: '👤', color: '#666666', image: 'default.jpg' };

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        color: user.color || config.color,
        emoji: config.emoji,
        description: user.description,
        image: `http://localhost:${PORT}/api/public/profiles/${config.image}`
      },
      message: `Bienvenue ${user.name} !`
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Erreur serveur' 
    });
  }
});

// Route pour les membres (protégée)
app.get('/api/family/members', authenticateToken, async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    // Récupérer tous les utilisateurs de la famille
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'asc' }
    });

    const members = users.map(user => {
      const roleConfig = {
        STRUCTURE: { emoji: '👑', color: '#2E7D32', image: 'tovoniaina.jpg' },
        INSPIRATION: { emoji: '💡', color: '#9C27B0', image: 'volatiana.jpg' },
        CREATION: { emoji: '🎨', color: '#FF9800', image: 'miantsatiana.jpg' },
        COMMUNICATION: { emoji: '📢', color: '#2196F3', image: 'tia-faniry.jpg' }
      };

      const config = roleConfig[user.role] || { emoji: '👤', color: '#666666', image: 'default.jpg' };

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        color: user.color || config.color,
        emoji: config.emoji,
        description: user.description || `Membre ${user.role}`,
        image: `${baseUrl}/api/public/profiles/${config.image}`
      };
    });

    res.json({
      status: 'OK',
      count: members.length,
      members
    });

  } catch (error) {
    console.error('Error getting family members:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Erreur serveur'
    });
  }
});

// Route pour obtenir le profil utilisateur (protégée)
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  
  const roleConfig = {
    STRUCTURE: { emoji: '👑', color: '#2E7D32', image: 'tovoniaina.jpg' },
    INSPIRATION: { emoji: '💡', color: '#9C27B0', image: 'volatiana.jpg' },
    CREATION: { emoji: '🎨', color: '#FF9800', image: 'miantsatiana.jpg' },
    COMMUNICATION: { emoji: '📢', color: '#2196F3', image: 'tia-faniry.jpg' }
  };

  const config = roleConfig[req.user.role] || { emoji: '👤', color: '#666666', image: 'default.jpg' };

  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    color: req.user.color || config.color,
    emoji: config.emoji,
    description: req.user.description || `Membre ${req.user.role}`,
    image: `${baseUrl}/api/public/profiles/${config.image}`,
    createdAt: req.user.createdAt
  });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route non trouvée',
    path: req.originalUrl
  });
});

// Gestionnaire d'erreurs
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ 
    error: 'Erreur interne du serveur'
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║                    BYGAGOOS INK API SERVER                       ║
╚══════════════════════════════════════════════════════════════════╝
  `);
  
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`🌍 URL API: http://localhost:${PORT}`);
  console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
  
  // Vérifier les images
  const imagesPath = path.join(__dirname, 'public/images');
  const profilesPath = path.join(__dirname, 'public/profiles');
  
  console.log(`\n🖼️  Images disponibles:`);
  
  if (!fs.existsSync(imagesPath)) {
    console.log(`   📁 /images: CRÉATION`);
    fs.mkdirSync(imagesPath, { recursive: true });
  }
  
  if (!fs.existsSync(profilesPath)) {
    console.log(`   👤 /profiles: CRÉATION`);
    fs.mkdirSync(profilesPath, { recursive: true });
  }
  
  const images = fs.existsSync(imagesPath) ? fs.readdirSync(imagesPath) : [];
  const profiles = fs.existsSync(profilesPath) ? fs.readdirSync(profilesPath) : [];
  
  console.log(`   📁 /images: ${images.length} fichier(s)`);
  images.forEach(img => console.log(`      • ${img}`));
  
  console.log(`   👤 /profiles: ${profiles.length} fichier(s)`);
  profiles.forEach(profile => console.log(`      • ${profile}`));
  
  console.log(`\n🔗 URLs importantes:`);
  console.log(`   Logo: http://localhost:${PORT}/api/public/images/logo.png`);
  console.log(`   Profils: http://localhost:${PORT}/api/public/profiles/`);
  console.log(`   Liste images: http://localhost:${PORT}/api/images/list`);
  
  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║                   SERVEUR PRÊT À L'EMPLOI                        ║
╚══════════════════════════════════════════════════════════════════╝
  `);
});

// Arrêt propre
process.on('SIGTERM', async () => {
  console.log('\n🔴 Arrêt propre du serveur...');
  await prisma.$disconnect();
  process.exit(0);
});