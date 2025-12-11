const { exec } = require('child_process');
const http = require('http');

console.log('ï¿½ï¿½ Diagnostic complet ByGagoos-Ink');
console.log('====================================\n');

// 1. VÃ©rifier Docker
console.log('1. í°³ VÃ©rification Docker...');
exec('docker ps --filter name=bygagoos', (error, stdout, stderr) => {
  console.log(stdout || stderr || 'âŒ Aucun conteneur bygagoos');
  
  // 2. VÃ©rifier PostgreSQL
  console.log('\n2. í·„ï¸  Test connexion PostgreSQL...');
  exec('docker exec bygagoos-db psql -U postgres -d bygagoos_ink -c "SELECT version();"', (err, out) => {
    if (err) {
      console.log('âŒ PostgreSQL inaccessible:', err.message);
    } else {
      console.log('âœ… PostgreSQL connectÃ©:', out.trim());
    }
    
    // 3. VÃ©rifier le backend
    console.log('\n3. ï¿½ï¿½ Test API backend...');
    http.get('http://localhost:3001/api/health', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('âœ… Backend actif:', JSON.parse(data).status);
        
        // 4. VÃ©rifier Prisma Studio
        console.log('\n4. í³Š Test Prisma Studio...');
        http.get('http://localhost:5555', (resStudio) => {
          console.log('âœ… Prisma Studio actif sur port 5555');
        }).on('error', () => {
          console.log('âŒ Prisma Studio inaccessible sur 5555');
          console.log('   í²¡ Essayez: npx prisma studio');
        });
      });
    }).on('error', () => {
      console.log('âŒ Backend inaccessible sur port 3001');
    });
  });
});

setTimeout(() => {
  console.log('\ní¾¯ RÃ‰SUMÃ‰ DES COMMANDES:');
  console.log('------------------------');
  console.log('1. DÃ©marrer Prisma Studio: npx prisma studio');
  console.log('2. Voir donnÃ©es: docker exec -it bygagoos-db psql -U postgres -d bygagoos_ink');
  console.log('3. Tester API: curl http://localhost:3001/api/health');
  console.log('4. CrÃ©er utilisateur: node -e "...script crÃ©ation..."');
}, 2000);
