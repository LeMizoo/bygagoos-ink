// backend/setup-dev.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setup ByGagoos-Ink Backend for Development\n');

// 1. Créer la BD avec Prisma
console.log('1️⃣  Initializing database with Prisma...');
try {
  // On suppose que node_modules a Prisma
  const prismaPath = path.join(__dirname, 'node_modules', '.bin', 'prisma');
  
  if (!fs.existsSync(prismaPath)) {
    console.log('   ⚠️  Prisma not found, installing dependencies...');
    console.log('   Please run: npm install');
    process.exit(1);
  }
  
  // Créer la migration
  execSync(`"${prismaPath}" migrate dev --name init`, { 
    stdio: 'inherit',
    cwd: __dirname 
  });
  console.log('   ✅ Database initialized');
} catch (error) {
  console.error('   ❌ Error:', error.message);
  process.exit(1);
}

// 2. Seed la BD avec les utilisateurs
console.log('\n2️⃣  Seeding database with initial users...');
try {
  execSync('node prisma/seed-simple.js', { 
    stdio: 'inherit',
    cwd: __dirname,
    env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db' }
  });
  console.log('   ✅ Database seeded');
} catch (error) {
  console.error('   ⚠️  Seed error (continuing):', error.message);
}

console.log('\n✅ Setup complete!');
console.log('\n📝 Next steps:');
console.log('   1. Backend: npm start (port 3001)');
console.log('   2. Frontend: cd ../frontend && npm run dev (port 5173)');
console.log('\n🔑 Test credentials:');
console.log('   Email: tovoniaina.rahendrison@gmail.com');
console.log('   Password: ByGagoos2025!');
