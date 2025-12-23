const jwt = require('jsonwebtoken');
const prisma = require('../../lib/prisma');

module.exports = async (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ id: user.id, email: user.email, name: `${user.firstName} ${user.lastName}`, role: user.role });
  } catch (err) {
    console.error('Auth me error', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
};
