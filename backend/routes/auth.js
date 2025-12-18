// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'bygagoos-family-secret-key-2025';

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email et mot de passe requis' 
      });
    }

    // Chercher l'utilisateur en base de données
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return res.status(401).json({ 
        message: 'Identifiants incorrects' 
      });
    }

    // Vérifier le mot de passe - CORRECTION ICI : 'password' au lieu de 'hashedPassword'
    const passwordValid = await bcrypt.compare(password, user.password);
    
    if (!passwordValid) {
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
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Retourner la réponse
    res.json({
      token,
      user: {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        familyRole: user.familyRole
      },
      message: 'Connexion réussie'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Erreur serveur' 
    });
  }
});

// Route de vérification de token
router.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        valid: false, 
        message: 'Token manquant' 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    res.json({
      valid: true,
      user: decoded
    });

  } catch (error) {
    res.status(401).json({ 
      valid: false, 
      message: 'Token invalide' 
    });
  }
});

module.exports = router;