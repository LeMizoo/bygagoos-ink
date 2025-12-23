const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || 'changeme';

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function main() {
  console.log('��� Initialisation des données ByGagoos Ink...');
  
  // Nettoyer
  await prisma.user.deleteMany({});
  
  // Créer les 4 utilisateurs familiaux
  const users = [
    {
      email: 'tovoniaina.rahendrison@gmail.com',
      password: await hashPassword(DEFAULT_PASSWORD),
      firstName: 'Tovoniaina',
      lastName: 'RAHENDRISON',
      phone: '+261344359330',
      role: 'SUPER_ADMIN',
      familyRole: 'STRUCTURE',
      mustChangePassword: true
    },
    {
      email: 'dedettenadia@gmail.com',
      password: await hashPassword(DEFAULT_PASSWORD),
      firstName: 'Volatiana',
      lastName: 'RANDRIANARISOA',
      phone: '+261320000001',
      role: 'ADMIN',
      familyRole: 'INSPIRATION_CREATIVITY',
      mustChangePassword: true
    },
    {
      email: 'miantsatianarahendrison@gmail.com',
      password: await hashPassword(DEFAULT_PASSWORD),
      firstName: 'Miantsatiana',
      lastName: 'RAHENDRISON',
      phone: '+261330000002',
      role: 'ADMIN',
      familyRole: 'OPERATIONS_DESIGN',
      mustChangePassword: true
    },
    {
      email: 'fanirytia17@gmail.com',
      password: await hashPassword(DEFAULT_PASSWORD),
      firstName: 'Tia Faniry',
      lastName: 'RAHENDRISON',
      phone: '+261340000003',
      role: 'ADMIN',
      familyRole: 'ADMIN_COMMUNICATION',
      mustChangePassword: true
    }
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
    console.log(`✅ ${user.firstName} ${user.lastName}`);
  }
  
  console.log('��� 4 utilisateurs familiaux créés!');
  console.log('��� Connexion: tovoniaina.rahendrison@gmail.com');
  console.log('⚠️ Mot de passe par défaut utilisé pour les seeds: définissez DEFAULT_PASSWORD dans l\'environnement pour le changer (valeur non affichée).');
}

main()
  .catch(e => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
