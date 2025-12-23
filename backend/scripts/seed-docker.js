// backend/scripts/seed-docker.js - VERSION SÉCURISÉE
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || 'changeme';

async function seed() {
  console.log('🌱 Début du seed Docker...');

  try {
    // Nettoyage des tables
    console.log('🧹 Nettoyage des tables...');
    await prisma.$executeRaw`DELETE FROM "users"`;
    await prisma.$executeRaw`DELETE FROM "family_members"`;
    await prisma.$executeRaw`DELETE FROM "clients"`;
    await prisma.$executeRaw`DELETE FROM "profiles"`;
    await prisma.$executeRaw`DELETE FROM "orders"`;
    await prisma.$executeRaw`DELETE FROM "inventory"`;

    // Réinitialiser les séquences (PostgreSQL seulement)
    await prisma.$executeRaw`ALTER SEQUENCE IF EXISTS "users_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE IF EXISTS "family_members_id_seq" RESTART WITH 1`;

    // Créer les utilisateurs
    const users = [
      {
        email: 'tovoniaina.rahendrison@gmail.com',
        password: DEFAULT_PASSWORD,
        name: 'Tovoniaina RAHENDRISON',
        role: 'SUPER_ADMIN',
        color: '#2E7D32',
        description: 'Responsable Structure & Organisation'
      },
      {
        email: 'dedettenadia@gmail.com',
        password: DEFAULT_PASSWORD,
        name: 'Volatiana RANDRIANARISOA',
        role: 'FAMILY_MEMBER',
        color: '#9C27B0',
        description: 'Responsable Inspiration & Design'
      },
      {
        email: 'miantsatianarahendrison@gmail.com',
        password: DEFAULT_PASSWORD,
        name: 'Miantsatiana RAHENDRISON',
        role: 'FAMILY_MEMBER',
        color: '#FF9800',
        description: 'Responsable Création & Production'
      },
      {
        email: 'fanirytia17@gmail.com',
        password: DEFAULT_PASSWORD,
        name: 'Tia Faniry RAHENDRISON',
        role: 'FAMILY_MEMBER',
        color: '#2196F3',
        description: 'Responsable Communication & Marketing'
      }
    ];

    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
          name: userData.name,
          role: userData.role,
          color: userData.color,
          description: userData.description
        }
      });

      console.log(`✅ Utilisateur créé: ${user.email}`);

      // Créer aussi un membre de la famille pour cet utilisateur
      await prisma.familyMember.create({
        data: {
          userId: user.id,
          familyRole: 'Membre',
          skills: ['Leadership', 'Gestion'], // Postgres text[]
          certifications: ['Diplôme 1', 'Certification 2'],
          availability: JSON.stringify({ status: 'disponible', hours: '9h-18h' }),
          currentRole: userData.description?.split(' ')[1] || 'Membre'
        }
      });
    }

    // Créer des commandes d'exemple
    await prisma.order.create({
      data: {
        clientName: 'Client Test 1',
        clientEmail: 'client1@example.com',
        clientPhone: '+261 34 00 000 10',
        description: 'Commande de T-shirts',
        status: 'PENDING',
        amount: 150000
      }
    });

    await prisma.order.create({
      data: {
        clientName: 'Client Test 2',
        clientEmail: 'client2@example.com',
        clientPhone: '+261 34 00 000 11',
        description: 'Commande de goodies',
        status: 'COMPLETED',
        amount: 85000
      }
    });

    // Créer des items d'inventaire
    await prisma.inventory.create({
      data: {
        itemType: 'T-shirt',
        itemName: 'T-shirt ByGagoos Blanc',
        color: 'Blanc',
        size: 'M',
        quantity: 100,
        minimumStock: 20,
        unitCost: 12000,
        supplier: 'Fournisseur Textile'
      }
    });

    console.log('🎉 Seed Docker terminé avec succès!');
    console.log('👥 4 utilisateurs créés');
    console.log('👨‍👩‍👧‍👦 4 membres famille créés');
    console.log('📦 2 commandes créées');
    console.log('📊 1 item inventaire créé');
    console.log('ℹ️ Default password used for seeded users: set DEFAULT_PASSWORD in your environment to change it (value not displayed).');

  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();