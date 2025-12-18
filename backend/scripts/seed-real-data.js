const { PrismaClient, UserRole, FamilyRole, Priority, OrderStatus } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

async function main() {
  console.log('í¼± Initialisation des donnÃ©es rÃ©elles ByGagoos Ink...')

  // Nettoyer la base existante
  console.log('í·¹ Nettoyage de la base de donnÃ©es...')
  
  const tableNames = await prisma.$queryRaw`
    SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma_%'
  `
  
  for (const table of tableNames) {
    await prisma.$executeRawUnsafe(`DELETE FROM "${table.name}"`)
  }

  // 1. CRÃ‰ATION DES UTILISATEURS FAMILIAUX
  console.log('í±¥ CrÃ©ation des utilisateurs familiaux...')
  
  const users = [
    {
      email: 'tovoniaina.rahendrison@gmail.com',
      password: await hashPassword('ByGagoos2025!'),
      firstName: 'Tovoniaina',
      lastName: 'RAHENDRISON',
      phone: '+261344359330',
      role: UserRole.SUPER_ADMIN,
      familyRole: FamilyRole.STRUCTURE,
      mustChangePassword: true,
      isActive: true
    },
    {
      email: 'dedettenadia@gmail.com',
      password: await hashPassword('ByGagoos2025!'),
      firstName: 'Volatiana',
      lastName: 'RANDRIANARISOA',
      phone: '+261320000001',
      role: UserRole.ADMIN,
      familyRole: FamilyRole.INSPIRATION_CREATIVITY,
      mustChangePassword: true,
      isActive: true
    },
    {
      email: 'miantsatianarahendrison@gmail.com',
      password: await hashPassword('ByGagoos2025!'),
      firstName: 'Miantsatiana',
      lastName: 'RAHENDRISON',
      phone: '+261330000002',
      role: UserRole.ADMIN,
      familyRole: FamilyRole.OPERATIONS_DESIGN,
      mustChangePassword: true,
      isActive: true
    },
    {
      email: 'fanirytia17@gmail.com',
      password: await hashPassword('ByGagoos2025!'),
      firstName: 'Tia Faniry',
      lastName: 'RAHENDRISON',
      phone: '+261340000003',
      role: UserRole.ADMIN,
      familyRole: FamilyRole.ADMIN_COMMUNICATION,
      mustChangePassword: true,
      isActive: true
    }
  ]

  for (const userData of users) {
    await prisma.user.create({ data: userData })
  }
  console.log(`âœ… ${users.length} utilisateurs crÃ©Ã©s`)

  // 2. CRÃ‰ATION DES MATÃ‰RIAUX
  console.log('í³¦ CrÃ©ation des matÃ©riaux de production...')
  
  const materials = [
    {
      name: 'Encre Plastisol Blanche',
      category: 'INK',
      unit: 'kg',
      currentStock: 25.5,
      minStock: 5,
      unitPrice: 12000,
      supplier: 'Sericol Madagascar',
      storageLocation: 'Armoire A1'
    },
    {
      name: 'Tissu 100% Coton 180g',
      category: 'TEXTILE',
      unit: 'piÃ¨ce',
      currentStock: 500,
      minStock: 100,
      unitPrice: 8500,
      supplier: 'Textile Import',
      storageLocation: 'Ã‰tagÃ¨re B2'
    },
    {
      name: 'Cadre SÃ©rigraphie 40x50',
      category: 'SCREEN',
      unit: 'unitÃ©',
      currentStock: 15,
      minStock: 3,
      unitPrice: 45000,
      supplier: 'Fournitures Pro',
      storageLocation: 'Rack C3'
    },
    {
      name: 'Ã‰mulsion Photosensible',
      category: 'EMULSION',
      unit: 'L',
      currentStock: 8,
      minStock: 2,
      unitPrice: 35000,
      supplier: 'Sericol Madagascar',
      storageLocation: 'Armoire A2'
    },
    {
      name: 'Sachets Plastique 40x60',
      category: 'PACKAGING',
      unit: 'paquet',
      currentStock: 50,
      minStock: 10,
      unitPrice: 15000,
      supplier: 'Emballages Tana',
      storageLocation: 'Ã‰tagÃ¨re D1'
    }
  ]

  for (const materialData of materials) {
    await prisma.material.create({ data: materialData })
  }
  console.log(`âœ… ${materials.length} matÃ©riaux crÃ©Ã©s`)

  // 3. CRÃ‰ATION DES CLIENTS
  console.log('í±¥ CrÃ©ation des clients...')
  
  const clients = [
    {
      companyName: 'Tech Solutions Madagascar',
      contactPerson: 'M. Rakoto Jean',
      email: 'contact@techsolutions.mg',
      phone: '+261340123456',
      address: 'Lot IVC 56 Antanimena',
      clientType: 'COMPANY',
      status: 'VIP',
      totalOrders: 12,
      totalAmount: 5800000,
      lastOrderDate: new Date('2024-10-15')
    },
    {
      companyName: 'Association Jeunes Entrepreneurs',
      contactPerson: 'Mme. Sarah Andriamalala',
      email: 'sarah.aje@gmail.com',
      phone: '+261331234567',
      address: '67 Ha Analakely',
      clientType: 'ASSOCIATION',
      status: 'ACTIVE',
      totalOrders: 5,
      totalAmount: 1200000,
      lastOrderDate: new Date('2024-10-28')
    },
    {
      contactPerson: 'M. Rajemison Robert',
      email: 'raje.robert@gmail.com',
      phone: '+261321112233',
      clientType: 'PARTICULAR',
      status: 'ACTIVE',
      totalOrders: 3,
      totalAmount: 450000,
      lastOrderDate: new Date('2024-10-20')
    },
    {
      companyName: 'Ã‰cole Primaire Les Poussins',
      contactPerson: 'Directrice Ravaonirina',
      email: 'ecole.poussins@edu.mg',
      phone: '+261344556677',
      address: 'Ivandry, Antananarivo',
      clientType: 'SCHOOL',
      status: 'ACTIVE',
      totalOrders: 2,
      totalAmount: 780000,
      lastOrderDate: new Date('2024-09-30')
    }
  ]

  const createdClients = []
  for (const clientData of clients) {
    const client = await prisma.client.create({ data: clientData })
    createdClients.push(client)
  }
  console.log(`âœ… ${clients.length} clients crÃ©Ã©s`)

  // 4. CRÃ‰ATION DES COMMANDES
  console.log('í³‹ CrÃ©ation des commandes...')
  
  const orders = [
    {
      orderNumber: 'BG-2024-001',
      clientId: createdClients[0].id,
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      totalAmount: 850000,
      depositAmount: 425000,
      depositPaid: true,
      deadline: new Date('2024-11-20'),
      deliveryAddress: 'SiÃ¨ge Tech Solutions, Antanimena',
      specialInstructions: 'Logo en relief sur poche gauche',
      internalNotes: 'Client VIP - Livraison express'
    },
    {
      orderNumber: 'BG-2024-002',
      clientId: createdClients[1].id,
      status: 'CONFIRMED',
      priority: 'MEDIUM',
      totalAmount: 450000,
      depositAmount: 225000,
      depositPaid: false,
      deadline: new Date('2024-11-25'),
      deliveryNotes: 'Appeler avant livraison'
    },
    {
      orderNumber: 'BG-2024-003',
      clientId: createdClients[2].id,
      status: 'QUALITY_CHECK',
      priority: 'MEDIUM',
      totalAmount: 180000,
      depositAmount: 90000,
      depositPaid: true,
      deadline: new Date('2024-11-15'),
      specialInstructions: 'T-shirt noir avec impression blanche'
    },
    {
      orderNumber: 'BG-2024-004',
      clientId: createdClients[3].id,
      status: 'PENDING',
      priority: 'LOW',
      totalAmount: 320000,
      deadline: new Date('2024-12-05')
    }
  ]

  const createdOrders = []
  for (const orderData of orders) {
    const order = await prisma.order.create({ data: orderData })
    createdOrders.push(order)
  }
  console.log(`âœ… ${orders.length} commandes crÃ©Ã©es`)

  // 5. CRÃ‰ATION DES ARTICLES
  console.log('í±• CrÃ©ation des articles...')
  
  const orderItems = [
    // Commande BG-2024-001
    {
      orderId: createdOrders[0].id,
      productType: 'T_SHIRT',
      description: 'T-shirt 100% coton - Logo entreprise',
      quantity: 50,
      unitPrice: 8000,
      color: 'Blanc',
      size: 'XL',
      designNotes: 'Logo rouge sur cÅ“ur gauche',
      designFileUrl: '/designs/techsolutions-logo.ai'
    },
    {
      orderId: createdOrders[0].id,
      productType: 'POLO',
      description: 'Polo professionnel - Direction',
      quantity: 10,
      unitPrice: 25000,
      color: 'Bleu marine',
      size: 'L',
      designNotes: 'Broderie logo sur poche'
    },
    // Commande BG-2024-002
    {
      orderId: createdOrders[1].id,
      productType: 'T_SHIRT',
      description: 'T-shirt Ã©vÃ©nement - JournÃ©e entrepreneuriat',
      quantity: 100,
      unitPrice: 4500,
      color: 'Vert',
      size: 'M',
      designFileUrl: '/designs/aje-event.pdf'
    },
    // Commande BG-2024-003
    {
      orderId: createdOrders[2].id,
      productType: 'HOODIE',
      description: 'Sweat Ã  capuche personnalisÃ©',
      quantity: 5,
      unitPrice: 36000,
      color: 'Noir',
      size: 'XXL',
      designNotes: 'Impression blanche dos complet'
    }
  ]

  for (const itemData of orderItems) {
    await prisma.orderItem.create({ data: itemData })
  }
  console.log(`âœ… ${orderItems.length} articles crÃ©Ã©s`)

  console.log('í¾‰ Initialisation des donnÃ©es rÃ©elles terminÃ©e avec succÃ¨s!')
  console.log('\ní³Š RÃ‰CAPITULATIF:')
  console.log(`   í±¥ ${users.length} utilisateurs familiaux`)
  console.log(`   í¿¢ ${clients.length} clients`)
  console.log(`   í³¦ ${materials.length} matÃ©riaux`)
  console.log(`   í³‹ ${orders.length} commandes`)
  console.log(`   í±• ${orderItems.length} articles`)
}

main()
  .catch((e) => {
    console.error('âŒ Erreur lors de l\'initialisation:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
