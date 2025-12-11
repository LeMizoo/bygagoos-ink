// backend/prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding de la base de données ByGagoos-Ink...');

  // Hash du mot de passe temporaire
  const hashedPassword = await bcrypt.hash('ByGagoos2025!', 10);

  // 1. Création des utilisateurs familiaux
  const familyUsers = [
    {
      email: 'tovoniaina.rahendrison@gmail.com',
      firstName: 'Tovoniaina',
      lastName: 'RAHENDRISON',
      role: 'SUPER_ADMIN',
      phone: '+261344359330',
      familyRole: 'STRUCTURE'
    },
    {
      email: 'dedettenadia@gmail.com',
      firstName: 'Volatiana',
      lastName: 'RANDRIANARISOA',
      role: 'FAMILY_MEMBER',
      phone: null,
      familyRole: 'INSPIRATION'
    },
    {
      email: 'miantsatianarahendrison@gmail.com',
      firstName: 'Miantsatiana',
      lastName: 'RAHENDRISON',
      role: 'FAMILY_MEMBER',
      phone: null,
      familyRole: 'CREATION'
    },
    {
      email: 'fanirytia17@gmail.com',
      firstName: 'Tia Faniry',
      lastName: 'RAHENDRISON',
      role: 'FAMILY_MEMBER',
      phone: null,
      familyRole: 'COMMUNICATION'
    }
  ];

  console.log('👥 Création des utilisateurs familiaux...');
  
  for (const userData of familyUsers) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        email: userData.email,
        hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        familyRole: userData.familyRole,
        phone: userData.phone,
        mustChangePassword: true
      }
    });

    console.log(`✅ Utilisateur créé: ${user.email} (${user.role})`);

    // Créer le profil FamilyMember pour les membres de la famille
    if (user.role === 'FAMILY_MEMBER' || user.role === 'SUPER_ADMIN') {
      await prisma.familyMember.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          familyRole: userData.familyRole,
          skills: getSkillsByRole(userData.familyRole),
          certifications: [],
          availability: {
            monday: ['08:00-12:00', '14:00-17:00'],
            tuesday: ['08:00-12:00', '14:00-17:00'],
            wednesday: ['08:00-12:00', '14:00-17:00'],
            thursday: ['08:00-12:00', '14:00-17:00'],
            friday: ['08:00-12:00', '14:00-17:00'],
            saturday: ['08:00-12:00'],
            sunday: []
          },
          currentRole: userData.familyRole,
          performance: { quality: 5, productivity: 5, innovation: 5 }
        }
      });

      console.log(`👨‍👩‍👧‍👦 Profil familial créé: ${user.firstName} (${userData.familyRole})`);
    }
  }

  // 2. Création d'un client de test
  console.log('👔 Création d\'un client de test...');
  
  const clientUser = await prisma.user.upsert({
    where: { email: 'client.test@bygagoos.com' },
    update: {},
    create: {
      email: 'client.test@bygagoos.com',
      hashedPassword,
      firstName: 'École',
      lastName: 'Test',
      role: 'CLIENT',
      mustChangePassword: true
    }
  });

  console.log(`✅ Client de test créé: ${clientUser.email}`);

  await prisma.client.upsert({
    where: { userId: clientUser.id },
    update: {},
    create: {
      userId: clientUser.id,
      companyName: 'École Primaire Test',
      clientType: 'SCHOOL',
      address: {
        street: '123 Rue Test',
        city: 'Antananarivo',
        postalCode: '101',
        country: 'Madagascar'
      },
      taxId: 'TAX123456',
      loyaltyPoints: 100,
      totalSpent: 0
    }
  });

  console.log('📊 Création d\'inventaire de test...');
  
  // 3. Création d'articles d'inventaire de test
  const inventoryItems = [
    {
      itemType: 'TSHIRT',
      itemName: 'T-shirt Blanc Coton',
      color: 'Blanc',
      size: 'M',
      quantity: 100,
      minimumStock: 20,
      unitCost: 5000,
      supplier: 'Fournisseur TANA'
    },
    {
      itemType: 'INK',
      itemName: 'Encre Noire Sérigraphie',
      color: 'Noir',
      quantity: 50,
      minimumStock: 10,
      unitCost: 15000,
      supplier: 'InkCorp'
    }
  ];

  for (const item of inventoryItems) {
    await prisma.inventory.create({
      data: {
        ...item,
        lastRestock: new Date()
      }
    });
    console.log(`📦 Article inventaire: ${item.itemName}`);
  }

  console.log('🎉 Seeding terminé avec succès!');
  console.log('\n📋 Récapitulatif:');
  console.log('- 4 utilisateurs familiaux créés');
  console.log('- 1 client de test créé');
  console.log('- 2 articles d\'inventaire créés');
  console.log('\n🔑 Mot de passe temporaire pour tous: ByGagoos2025!');
  console.log('⚠️  Changement obligatoire à la première connexion');
}

function getSkillsByRole(role) {
  const skills = {
    STRUCTURE: { 
      development: 5, 
      architecture: 5, 
      security: 4,
      project_management: 5
    },
    INSPIRATION: { 
      design: 5, 
      creativity: 5, 
      quality_control: 5,
      client_relations: 5
    },
    CREATION: { 
      serigraphy: 5, 
      production: 5, 
      equipment: 4,
      logistics: 4
    },
    COMMUNICATION: { 
      finance: 5, 
      communication: 5, 
      sales: 4,
      support: 5
    }
  };
  return skills[role] || {};
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });