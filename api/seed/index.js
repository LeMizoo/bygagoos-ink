const prisma = require('../../../lib/prisma');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
  // Simple protection: allow only POST with correct secret header
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (req.headers['x-seed-secret'] !== (process.env.SEED_SECRET || 'seed-local')) return res.status(403).json({ error: 'Forbidden' });

  try {
    const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || 'changeme';
    const usersData = [
      { email: 'tovoniaina.rahendrison@gmail.com', firstName: 'Tovoniaina', lastName: 'RAHENDRISON', role: 'SUPER_ADMIN' },
      { email: 'dedettenadia@gmail.com', firstName: 'Volatiana', lastName: 'RANDRIANARISOA', role: 'ADMIN' },
      { email: 'miantsatianarahendrison@gmail.com', firstName: 'Miantsatiana', lastName: 'RAHENDRISON', role: 'ADMIN' },
      { email: 'fanirytia17@gmail.com', firstName: 'Tia', lastName: 'RAHENDRISON', role: 'ADMIN' }
    ];

    for (const u of usersData) {
      const existing = await prisma.user.findUnique({ where: { email: u.email } });
      if (!existing) {
        const hashed = await bcrypt.hash(DEFAULT_PASSWORD, 10);
        await prisma.user.create({ data: { email: u.email, password: hashed, firstName: u.firstName, lastName: u.lastName, role: u.role, familyRole: 'Membre' } });
      }
    }

    // Create some sample inventory
    const inv = [
      { itemType: 'Encre', itemName: 'Encre Noir 1L', quantity: 12, unitCost: 15000, minimumStock: 4, location: 'Stock A' },
      { itemType: 'Chimie', itemName: 'Émulsion 5L', quantity: 3, unitCost: 45000, minimumStock: 2, location: 'Stock B' }
    ];

    for (const it of inv) {
      const exists = await prisma.inventory.findFirst({ where: { itemName: it.itemName } });
      if (!exists) {
        await prisma.inventory.create({ data: it });
      }
    }

    res.status(200).json({ seeded: true });
  } catch (err) {
    console.error('Seed error', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
