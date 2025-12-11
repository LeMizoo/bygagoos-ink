// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'bygagoos-family-secret-key-2025';

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        message: 'Accès non autorisé. Token manquant.' 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Ajouter les infos utilisateur à la requête
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Session expirée. Veuillez vous reconnecter.' 
      });
    }
    
    return res.status(401).json({ 
      message: 'Token invalide' 
    });
  }
};

// Middleware pour vérifier les rôles
const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        message: 'Accès non autorisé' 
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Permission refusée. Rôle insuffisant.' 
      });
    }

    next();
  };
};

module.exports = {
  authMiddleware,
  roleMiddleware
};