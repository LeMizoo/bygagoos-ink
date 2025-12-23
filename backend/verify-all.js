const http = require('http');

console.log('✅ VÉRIFICATION COMPLÈTE BYGAGOOS-INK');
console.log('======================================\n');

// 1. Vérifier Docker
const { exec } = require('child_process');
exec('docker ps --filter name=bygagoos', (error, stdout, stderr) => {
  console.log('1. ��� Docker Containers:');
  console.log(stdout || '❌ Aucun conteneur trouvé');
  console.log('---');

  // 2. Vérifier API Health
  http.get('http://localhost:3001/api/health', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('2. ��� API Health Check:');
      console.log(JSON.parse(data));
      console.log('---');

      // 3. Vérifier DB Check
      http.get('http://localhost:3001/api/db-check', (res2) => {
        let data2 = '';
        res2.on('data', chunk => data2 += chunk);
        res2.on('end', () => {
          console.log('3. ���️ Database Connection:');
          console.log(JSON.parse(data2));
          console.log('---');

          // 4. Vérifier utilisateurs
          const { PrismaClient } = require('@prisma/client');
          const prisma = new PrismaClient();
          prisma.user.findMany({
            select: { name: true, email: true, role: true, familyRole: true }
          })
          .then(users => {
            console.log('4. ���‍���‍���‍��� Family Users Created:');
            users.forEach((user, i) => {
              console.log(`   ${i+1}. ${user.name}`);
              console.log(`      ��� ${user.email}`);
              console.log(`      ��� ${user.role} - ${user.familyRole}`);
            });
            console.log('---');
            console.log('��� BYGAGOOS-INK BACKEND EST OPÉRATIONNEL !');
            console.log('\n��� URLs importantes:');
            console.log('   ��� API: http://localhost:3001');
            console.log('   ���️ Prisma Studio: http://localhost:5555');
            console.log('   ��� PGAdmin: http://localhost:5050');
            console.log('\n��� Identifiants test:');
            console.log('   ℹ️ Verification run — do not log passwords. Use DEFAULT_PASSWORD in environment when testing logins.');
            console.log('   ���‍��� tovoniaina.rahendrison@gmail.com / ByGagoos2025!');
            console.log('\n��� Prêt pour le développement du frontend !');
            
            prisma.$disconnect();
          })
          .catch(e => {
            console.log('❌ Erreur DB:', e.message);
            prisma.$disconnect();
          });
        });
      });
    });
  }).on('error', (e) => {
    console.log('❌ API non accessible:', e.message);
  });
});
