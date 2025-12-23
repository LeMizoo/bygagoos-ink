const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || 'changeme';

async function main() {
  console.log('� Seeding simple...');
  
  // Juste créer un utilisateur admin
  const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);
  
  await prisma.user.create({
    data: {
      email: 'tovoniaina.rahendrison@gmail.com',
      hashedPassword,
      firstName: 'Tovoniaina',
      lastName: 'RAHENDRISON',
      role: 'SUPER_ADMIN',
      familyRole: 'STRUCTURE',
      mustChangePassword: true
    }
  });
  
  console.log('✅ Utilisateur admin créé!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
