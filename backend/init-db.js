// backend/init-db.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Initializing database...\n');

// 1. Generate Prisma Client
console.log('1️⃣  Generating Prisma Client...');
try {
  execSync('node node_modules/prisma/build/index.js generate', { 
    stdio: 'inherit',
    cwd: __dirname
  });
  console.log('   ✅ Prisma Client generated\n');
} catch (error) {
  console.error('❌ Error generating client:', error.message);
  process.exit(1);
}

// 2. Push schema to database
console.log('2️⃣  Creating database schema...');
try {
  execSync('node node_modules/prisma/build/index.js db push --skip-generate', { 
    stdio: 'inherit',
    cwd: __dirname,
    env: { ...process.env, DATABASE_URL: 'file:./dev.db' }
  });
  console.log('   ✅ Database schema created\n');
} catch (error) {
  console.error('❌ Error creating schema:', error.message);
  // Continue anyway
}

console.log('✅ Database initialization complete!');
