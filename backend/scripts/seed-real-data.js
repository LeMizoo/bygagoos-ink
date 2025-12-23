const { PrismaClient, UserRole, FamilyRole, Priority, OrderStatus } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || 'changeme'

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

async function main() {
  console.log('��� Initialisation des données réelles ByGagoos Ink...')

  // Nettoyer la base existante
  console.log('��� Nettoyage de la base de données...')
  
  const tableNames = await prisma.$queryRaw`
    SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma_%'
  `
  
  for (const table of tableNames) {
    await prisma.$executeRawUnsafe(`DELETE FROM "${table.name}"`)
  }

  // 1. CRÉATION DES UTILISATEURS FAMILIAUX
  console.log('��� Création des utilisateurs familiaux...')
  
  const users = [
    {
      email: 'tovoniaina.rahendrison@gmail.com',
      password: await hashPassword(DEFAULT_PASSWORD),
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
      password: await hashPassword(DEFAULT_PASSWORD),
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
      password: await hashPassword(DEFAULT_PASSWORD),
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
      password: await hashPassword(DEFAULT_PASSWORD),
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
  console.log(`✅ ${users.length} utilisateurs créés`)

  // 2. CRÉATION DES MATÉRIAUX
  console.log('��� Création des matériaux de production...')
  
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
      unit: 'pièce',
      currentStock: 500,
      minStock: 100,
      unitPrice: 8500,
      supplier: 'Textile Import',
      storageLocation: 'Étagère B2'
    },
    {
      name: 'Cadre Sérigraphie 40x50',
      category: 'SCREEN',
      unit: 'unité',
      currentStock: 15,
      minStock: 3,
      unitPrice: 45000,
      supplier: 'Fournitures Pro',
      storageLocation: 'Rack C3'
    },
    {
      name: 'Émulsion Photosensible',
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
      storageLocation: 'Étagère D1'
    }
  ]

  for (const materialData of materials) {
    await prisma.material.create({ data: materialData })
  }
  console.log(`✅ ${materials.length} matériaux créés`)

  // 3. CRÉATION DES CLIENTS
  console.log('��� Création des clients...')
  
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
      companyName: 'École Primaire Les Poussins',
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
  console.log(`✅ ${clients.length} clients créés`)

  // 4. CRÉATION DES COMMANDES
  console.log('��� Création des commandes...')
  
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
      deliveryAddress: 'Siège Tech Solutions, Antanimena',
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
  console.log(`✅ ${orders.length} commandes créées`)

  // 5. CRÉATION DES ARTICLES
  console.log('��� Création des articles...')
  
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
      designNotes: 'Logo rouge sur cœur gauche',
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
      description: 'T-shirt événement - Journée entrepreneuriat',
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
      description: 'Sweat à capuche personnalisé',
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
  console.log(`✅ ${orderItems.length} articles créés`)

  console.log('��� Initialisation des données réelles terminée avec succès!')
  console.log('\n��� RÉCAPITULATIF:')
  console.log(`   ��� ${users.length} utilisateurs familiaux`)
  console.log(`   ��� ${clients.length} clients`)
  console.log(`   ��� ${materials.length} matériaux`)
  console.log(`   ��� ${orders.length} commandes`)
  console.log(`   ��� ${orderItems.length} articles`)
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors de l\'initialisation:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
