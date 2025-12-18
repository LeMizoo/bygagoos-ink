// backend/scripts/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding de la base de données ByGagoos-Ink (PostgreSQL)...');

  try {
    // Hash du mot de passe commun
    const hashedPassword = await bcrypt.hash('ByGagoos2025!', 10);

    // 1. Création des utilisateurs familiaux
    const familyUsers = [
      {
        email: 'tovoniaina.rahendrison@gmail.com',
        name: 'Tovoniaina RAHENDRISON',
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        color: '#2E7D32',
        description: 'Responsable Structure & Organisation'
      },
      {
        email: 'dedettenadia@gmail.com',
        name: 'Volatiana RANDRIANARISOA',
        password: hashedPassword,
        role: 'FAMILY_MEMBER',
        color: '#9C27B0',
        description: 'Responsable Inspiration & Design'
      },
      {
        email: 'miantsatianarahendrison@gmail.com',
        name: 'Miantsatiana RAHENDRISON',
        password: hashedPassword,
        role: 'FAMILY_MEMBER',
        color: '#FF9800',
        description: 'Responsable Création & Production'
      },
      {
        email: 'fanirytia17@gmail.com',
        name: 'Tia Faniry RAHENDRISON',
        password: hashedPassword,
        role: 'FAMILY_MEMBER',
        color: '#2196F3',
        description: 'Responsable Communication & Marketing'
      }
    ];

    console.log('👥 Création des utilisateurs familiaux...');
    
    for (const userData of familyUsers) {
      // Upsert = créer si n'existe pas, mettre à jour sinon
      const user = await prisma.user.upsert({
        where: { email: userData.email },
        update: {
          name: userData.name,
          role: userData.role,
          color: userData.color,
          description: userData.description
        },
        create: {
          email: userData.email,
          password: userData.password,
          name: userData.name,
          role: userData.role,
          color: userData.color,
          description: userData.description
        }
      });

      console.log(`✅ Utilisateur ${user.email} (${user.role})`);
      
      // Créer le profil si non existant
      await prisma.profile.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          bio: userData.description,
          avatar: `/profiles/${userData.email.includes('tovoniaina') ? 'tovoniaina.jpg' : 
                    userData.email.includes('dedettenadia') ? 'volatiana.jpg' :
                    userData.email.includes('miantsatiana') ? 'miantsatiana.jpg' :
                    userData.email.includes('faniry') ? 'tia-faniry.jpg' : 'default.jpg'}`
        }
      });
    }

    // 2. Créer quelques commandes de test
    console.log('📋 Création de commandes de test...');
    
    const orders = [
      {
        clientName: 'École Primaire Antanimena',
        clientEmail: 'contact@ecole-antanimena.mg',
        clientPhone: '+261341234567',
        description: '100 T-shirts pour événement scolaire',
        status: 'COMPLETED',
        amount: 1500000
      },
      {
        clientName: 'Startup TechHub',
        clientEmail: 'commande@techhub.mg',
        clientPhone: '+261332345678',
        description: '50 sweats à capuche pour équipe',
        status: 'IN_PROGRESS',
        amount: 2500000
      },
      {
        clientName: 'Association Sportive',
        clientEmail: 'sport@association.mg',
        clientPhone: '+261344567890',
        description: '200 maillots de sport',
        status: 'PENDING',
        amount: 3000000
      }
    ];

    for (const orderData of orders) {
      const order = await prisma.order.create({
        data: orderData
      });
      console.log(`✅ Commande créée: ${order.clientName} - ${order.status}`);
    }

    // 3. Créer des items d'inventaire
    console.log('📦 Création d\'inventaire de test...');
    
    const inventoryItems = [
      {
        itemType: 'TSHIRT',
        itemName: 'T-shirt Blanc Coton 100%',
        color: 'Blanc',
        size: 'M',
        quantity: 150,
        minimumStock: 20,
        unitCost: 3500,
        supplier: 'Textile Import'
      },
      {
        itemType: 'TSHIRT',
        itemName: 'T-shirt Noir Premium',
        color: 'Noir',
        size: 'L',
        quantity: 100,
        minimumStock: 15,
        unitCost: 4500,
        supplier: 'Textile Import'
      },
      {
        itemType: 'INK',
        itemName: 'Encre Sérigraphie Blanc',
        color: 'Blanc',
        quantity: 30,
        minimumStock: 5,
        unitCost: 12500,
        supplier: 'Ink Supplies'
      },
      {
        itemType: 'INK',
        itemName: 'Encre Sérigraphie Rouge',
        color: 'Rouge',
        quantity: 25,
        minimumStock: 5,
        unitCost: 13500,
        supplier: 'Ink Supplies'
      }
    ];

    for (const item of inventoryItems) {
      await prisma.inventory.create({
        data: item
      });
      console.log(`📦 ${item.itemName}: ${item.quantity} unités`);
    }

    console.log('\n🎉 Seeding terminé avec succès!');
    console.log('\n📊 Récapitulatif:');
    console.log('- 4 utilisateurs familiaux créés/mis à jour');
    console.log('- 3 commandes de test créées');
    console.log('- 4 articles d\'inventaire créés');
    console.log('\n🔑 Informations de connexion:');
    console.log('   Mot de passe commun: ByGagoos2025!');
    console.log('\n📧 Comptes disponibles:');
    familyUsers.forEach(user => {
      console.log(`   • ${user.email} - ${user.name}`);
    });
    console.log('\n🚀 Prêt à démarrer: npm run dev');

  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    console.error('Stack trace:', error.stack);
    
    // Suggestion pour résoudre les problèmes
    console.log('\n🔧 Solutions possibles:');
    console.log('1. Vérifiez que PostgreSQL est installé et démarré');
    console.log('2. Créez la base de données: createdb bygagoos');
    console.log('3. OU utilisez SQLite en changeant DATABASE_URL dans .env');
    console.log('   DATABASE_URL="file:./prisma/dev.db"');
    
    process.exit(1);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });