const prisma = require('../../lib/prisma');

module.exports = async (req, res) => {
  const method = req.method;

  try {
    if (method === 'GET') {
      // Query params: q (search), page, limit, lowStock
      const { q = '', page = '1', limit = '20', lowStock } = req.query;
      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const pageSize = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
      const where = {};

      if (q) {
        where.OR = [
          { itemName: { contains: q, mode: 'insensitive' } },
          { itemType: { contains: q, mode: 'insensitive' } },
          { supplier: { contains: q, mode: 'insensitive' } }
        ];
      }

      if (lowStock === 'true' || lowStock === '1') {
        where.AND = [{ quantity: { lte: prisma.raw ? prisma.raw('minimum_stock') : 0 } }];
        // Note: prisma.raw not portable for comparisons; use a simple approach below instead
      }

      // If lowStock flag, we'll filter after fetching (safer across providers)
      const items = await prisma.inventory.findMany({
        where: where,
        orderBy: { updatedAt: 'desc' },
        skip: (pageNum - 1) * pageSize,
        take: pageSize
      });

      let filtered = items;
      if (lowStock === 'true' || lowStock === '1') {
        filtered = items.filter(it => it.quantity <= (it.minimumStock || 0));
      }

      const total = await prisma.inventory.count({ where });

      return res.status(200).json({
        data: filtered,
        meta: {
          page: pageNum,
          limit: pageSize,
          total
        }
      });
    }

    if (method === 'POST') {
      const data = req.body;
      // Basic validation
      if (!data.itemName || !data.itemType) {
        return res.status(400).json({ error: 'itemName and itemType are required' });
      }

      const createData = {
        itemType: data.itemType,
        itemName: data.itemName,
        color: data.color || null,
        size: data.size || null,
        quantity: typeof data.quantity === 'number' ? data.quantity : parseInt(data.quantity || '0', 10),
        minimumStock: typeof data.minimumStock === 'number' ? data.minimumStock : parseInt(data.minimumStock || '0', 10),
        unitCost: data.unitCost ? parseInt(data.unitCost, 10) : null,
        supplier: data.supplier || null,
        location: data.location || null
      };

      const item = await prisma.inventory.create({ data: createData });
      return res.status(201).json(item);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API consumables error', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
