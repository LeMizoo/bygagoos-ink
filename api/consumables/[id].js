const prisma = require('../../lib/prisma');

module.exports = async (req, res) => {
  const {
    query: { id },
    method
  } = req;

  try {
    if (method === 'GET') {
      const item = await prisma.inventory.findUnique({ where: { id: parseInt(id) } });
      if (!item) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(item);
    }

    if (method === 'PUT') {
      const data = req.body;
      const updated = await prisma.inventory.update({ where: { id: parseInt(id) }, data });
      return res.status(200).json(updated);
    }

    if (method === 'DELETE') {
      await prisma.inventory.delete({ where: { id: parseInt(id) } });
      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API consumables [id] error', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
