require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes simples
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'ByGagoos-Ink API',
    version: '1.0.0'
  });
});

app.get('/api/db-check', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    res.json({
      status: 'OK',
      database: 'Connected',
      userCount: userCount
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      error: error.message
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt for:', email);

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { id: true, email: true, name: true, role: true, hashedPassword: true }
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Vérifier le mot de passe avec bcrypt
    const validPassword = await bcrypt.compare(password, user.hashedPassword);
    
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token: token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`��� Serveur ByGagoos-Ink démarré sur le port ${PORT}`);
  console.log(`��� URL: http://localhost:${PORT}`);
  console.log(`��� Health: http://localhost:${PORT}/api/health`);
});
