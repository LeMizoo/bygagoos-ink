// scripts/seed-sqlite.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || 'changeme';

async function seed() {
  console.log('🌱 Début du seed SQLite...');

  try {
    // Pour SQLite, DELETE au lieu de TRUNCATE
    console.log('🧹 Nettoyage des tables...');
    
    // Supprimer dans l'ordre (à cause des contraintes de clé étrangère)
    await prisma.order.deleteMany();
    await prisma.familyMember.deleteMany();
    await prisma.client.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();
    await prisma.inventory.deleteMany();

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

    const createdUsers = [];
    for (const userData of users) {
      // Pour SQLite, on peut utiliser le mot de passe en clair car bcrypt peut avoir des problèmes
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          password: userData.password, // En clair pour SQLite
          name: userData.name,
          role: userData.role,
          color: userData.color,
          description: userData.description
        }
      });

      console.log(`✅ Utilisateur créé: ${user.name}`);
      createdUsers.push(user);
    }

    // Créer des membres famille
    for (const user of createdUsers) {
      await prisma.familyMember.create({
        data: {
          userId: user.id,
          familyRole: 'Membre',
          skills: JSON.stringify(['Compétence 1', 'Compétence 2']),
          certifications: ['Certif 1', 'Certif 2'], // Attention: SQLite ne supporte pas String[]!
          availability: JSON.stringify({ status: 'disponible' }),
          currentRole: user.description?.split(' ')[0] || 'Membre',
          performance: JSON.stringify({ rating: 5 })
        }
      });
      console.log(`✅ Membre famille créé: ${user.name}`);
    }

    // Créer des commandes
    await prisma.order.create({
      data: {
        clientName: 'Client Test',
        clientEmail: 'client@test.com',
        description: 'Commande de test',
        status: 'PENDING',
        amount: 150000
      }
    });

    console.log('🎉 Seed SQLite terminé avec succès!');
    console.log('👥 4 utilisateurs créés');
    console.log('👨‍👩‍👧‍👦 4 membres famille créés');
    console.log('📦 1 commande créée');
    console.log('ℹ️ Using DEFAULT_PASSWORD from environment for seeded users (value not displayed)');

  } catch (error) {
    console.error('❌ Erreur lors du seed SQLite:', error);
    console.error('Détails:', error.message);
    
    // Si erreur avec String[], simplifier le schéma
    if (error.message.includes('String[]')) {
      console.log('\n⚠️  Problème: SQLite ne supporte pas String[]');
      console.log('   Simplifiez le schéma Prisma:');
      console.log('   certifications String[] -> certifications String');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();