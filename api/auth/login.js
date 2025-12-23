const prisma = require('../../lib/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '8h' });

    res.status(200).json({ token, user: { id: user.id, email: user.email, name: `${user.firstName} ${user.lastName}`, role: user.role } });
  } catch (err) {
    console.error('Auth login error', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
