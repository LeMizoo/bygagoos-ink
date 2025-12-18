const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function main() {
  console.log('í¼± Initialisation des donnÃ©es ByGagoos Ink...');
  
  // Nettoyer
  await prisma.user.deleteMany({});
  
  // CrÃ©er les 4 utilisateurs familiaux
  const users = [
    {
      email: 'tovoniaina.rahendrison@gmail.com',
      password: await hashPassword('ByGagoos2025!'),
      firstName: 'Tovoniaina',
      lastName: 'RAHENDRISON',
      phone: '+261344359330',
      role: 'SUPER_ADMIN',
      familyRole: 'STRUCTURE',
      mustChangePassword: true
    },
    {
      email: 'dedettenadia@gmail.com',
      password: await hashPassword('ByGagoos2025!'),
      firstName: 'Volatiana',
      lastName: 'RANDRIANARISOA',
      phone: '+261320000001',
      role: 'ADMIN',
      familyRole: 'INSPIRATION_CREATIVITY',
      mustChangePassword: true
    },
    {
      email: 'miantsatianarahendrison@gmail.com',
      password: await hashPassword('ByGagoos2025!'),
      firstName: 'Miantsatiana',
      lastName: 'RAHENDRISON',
      phone: '+261330000002',
      role: 'ADMIN',
      familyRole: 'OPERATIONS_DESIGN',
      mustChangePassword: true
    },
    {
      email: 'fanirytia17@gmail.com',
      password: await hashPassword('ByGagoos2025!'),
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
    console.log(`âœ… ${user.firstName} ${user.lastName}`);
  }
  
  console.log('í¾‰ 4 utilisateurs familiaux crÃ©Ã©s!');
  console.log('í³§ Connexion: tovoniaina.rahendrison@gmail.com');
  console.log('í´‘ Mot de passe: ByGagoos2025!');
}

main()
  .catch(e => {
    console.error('âŒ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
