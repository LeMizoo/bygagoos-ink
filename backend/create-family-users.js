const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  console.log('í±¨â€í±©â€í±§â€í±¦ CrÃ©ation des utilisateurs familiaux ByGagoos...');

  const familyMembers = [
    {
      email: "tovoniaina.rahendrison@gmail.com",
      name: "Tovoniaina RAHENDRISON",
      role: "SUPER_ADMIN",
      familyRole: "STRUCTURE"
    },
    {
      email: "dedettenadia@gmail.com",
      name: "Volatiana RAHENDRISON",
      role: "FAMILY_MEMBER",
      familyRole: "INSPIRATION"
    },
    {
      email: "miantsatianarahendrison@gmail.com",
      name: "Miantsatiana RAHENDRISON",
      role: "FAMILY_MEMBER",
      familyRole: "CREATION"
    },
    {
      email: "fanirytia17@gmail.com",
      name: "Tia Faniry RAHENDRISON",
      role: "FAMILY_MEMBER",
      familyRole: "COMMUNICATION"
    }
  ];

  for (const member of familyMembers) {
    try {
      // VÃ©rifier si l'utilisateur existe dÃ©jÃ 
      const existingUser = await prisma.user.findUnique({
        where: { email: member.email }
      });

      if (existingUser) {
        console.log(`âš ï¸ Utilisateur dÃ©jÃ  existant: ${member.email}`);
        continue;
      }

      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash("ByGagoos2025!", 10);

      // CrÃ©er l'utilisateur
      const user = await prisma.user.create({
        data: {
          email: member.email,
          password: hashedPassword,
          name: member.name,
          role: member.role,
          familyRole: member.familyRole
        }
      });

      console.log(`âœ… CrÃ©Ã©: ${user.name} (${user.email}) - ${user.role}`);
    } catch (error) {
      console.error(`âŒ Erreur avec ${member.email}:`, error.message);
    }
  }

  console.log('í¾‰ CrÃ©ation des utilisateurs terminÃ©e!');
  
  // Afficher tous les utilisateurs
  const allUsers = await prisma.user.findMany();
  console.log('\ní³Š Liste des utilisateurs:');
  allUsers.forEach(user => {
    console.log(`  - ${user.name} (${user.email}) - ${user.role}`);
  });
}

main()
  .catch(e => {
    console.error('âŒ Erreur lors de la crÃ©ation:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
