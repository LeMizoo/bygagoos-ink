const http = require('http');

console.log('‚úÖ V√âRIFICATION COMPL√àTE BYGAGOOS-INK');
console.log('======================================\n');

// 1. V√©rifier Docker
const { exec } = require('child_process');
exec('docker ps --filter name=bygagoos', (error, stdout, stderr) => {
  console.log('1. Ì∞≥ Docker Containers:');
  console.log(stdout || '‚ùå Aucun conteneur trouv√©');
  console.log('---');

  // 2. V√©rifier API Health
  http.get('http://localhost:3001/api/health', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('2. Ì∫Ä API Health Check:');
      console.log(JSON.parse(data));
      console.log('---');

      // 3. V√©rifier DB Check
      http.get('http://localhost:3001/api/db-check', (res2) => {
        let data2 = '';
        res2.on('data', chunk => data2 += chunk);
        res2.on('end', () => {
          console.log('3. Ì∑ÑÔ∏è Database Connection:');
          console.log(JSON.parse(data2));
          console.log('---');

          // 4. V√©rifier utilisateurs
          const { PrismaClient } = require('@prisma/client');
          const prisma = new PrismaClient();
          prisma.user.findMany({
            select: { name: true, email: true, role: true, familyRole: true }
          })
          .then(users => {
            console.log('4. Ì±®‚ÄçÌ±©‚ÄçÌ±ß‚ÄçÌ±¶ Family Users Created:');
            users.forEach((user, i) => {
              console.log(`   ${i+1}. ${user.name}`);
              console.log(`      Ì≥ß ${user.email}`);
              console.log(`      Ì±ë ${user.role} - ${user.familyRole}`);
            });
            console.log('---');
            console.log('Ìæâ BYGAGOOS-INK BACKEND EST OP√âRATIONNEL !');
            console.log('\nÌ¥ó URLs importantes:');
            console.log('   Ìºê API: http://localhost:3001');
            console.log('   Ì∑ÑÔ∏è Prisma Studio: http://localhost:5555');
            console.log('   Ì≥ä PGAdmin: http://localhost:5050');
            console.log('\nÌ¥ë Identifiants test:');
            console.log('   Ì±®‚ÄçÌ≤ª tovoniaina.rahendrison@gmail.com / ByGagoos2025!');
            console.log('\nÌ∫Ä Pr√™t pour le d√©veloppement du frontend !');
            
            prisma.$disconnect();
          })
          .catch(e => {
            console.log('‚ùå Erreur DB:', e.message);
            prisma.$disconnect();
          });
        });
      });
    });
  }).on('error', (e) => {
    console.log('‚ùå API non accessible:', e.message);
  });
});
