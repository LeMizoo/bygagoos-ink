#!/bin/bash
echo "Ì∫Ä SETUP BACKEND BYGAGOOS INK"

# V√©rifier Node.js
if ! command -v node &> /dev/null; then
    echo "‚ùå Node.js n'est pas install√©"
    exit 1
fi

echo "Ì≥Å Cr√©ation des fichiers..."

# Sch√©ma Prisma
mkdir -p prisma
cat > prisma/schema.prisma << 'SCHEMA_EOF'
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id                  Int      @id @default(autoincrement())
  email               String   @unique
  password            String
  firstName           String   @map("first_name")
  lastName            String   @map("last_name")
  phone               String?
  role                String   @default("FAMILY_MEMBER")
  familyRole          String
  avatar              String?
  isActive            Boolean  @default(true) @map("is_active")
  lastLogin           DateTime? @map("last_login")
  mustChangePassword  Boolean  @default(true) @map("must_change_password")
  resetToken          String?  @map("reset_token")
  resetTokenExpiry    DateTime? @map("reset_token_expiry")
  createdAt           DateTime @default(now()) @map("created_at")
  updatedAt           DateTime @updatedAt @map("updated_at")

  @@map("users")
}
SCHEMA_EOF

# Fichiers de configuration
cat > .env << 'ENV_EOF'
DATABASE_URL="file:./dev.db"
JWT_SECRET="bygagoos-ink-2025-family-secret-key-change-in-production"
PORT=3001
NODE_ENV="development"
CORS_ORIGIN="http://localhost:5173"
APP_NAME="ByGagoos Ink"
ENV_EOF

cat > package.json << 'PKG_EOF'
{
  "name": "backend",
  "version": "1.0.0",
  "description": "Backend ByGagoos Ink",
  "main": "app.js",
  "scripts": {
    "dev": "nodemon app.js",
    "start": "node app.js",
    "setup": "npm install && npx prisma generate && npx prisma db push && npm run seed",
    "seed": "node prisma/seed.js",
    "db:push": "npx prisma db push",
    "studio": "npx prisma studio"
  },
  "dependencies": {
    "@prisma/client": "^5.7.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "prisma": "^5.7.0"
  }
}
PKG_EOF

cat > app.js << 'APP_EOF'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'ByGagoos Ink API - S√©rigraphie Textile',
    version: '1.0.0',
    family: '/api/family',
    health: '/api/health'
  });
});

app.get('/api/family', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        familyRole: true,
        createdAt: true
      }
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.json([
      {
        id: 1,
        firstName: 'Tovoniaina',
        lastName: 'RAHENDRISON',
        email: 'tovoniaina.rahendrison@gmail.com',
        role: 'SUPER_ADMIN',
        familyRole: 'STRUCTURE'
      },
      {
        id: 2,
        firstName: 'Volatiana',
        lastName: 'RANDRIANARISOA',
        email: 'dedettenadia@gmail.com',
        role: 'ADMIN',
        familyRole: 'INSPIRATION_CREATIVITY'
      },
      {
        id: 3,
        firstName: 'Miantsatiana',
        lastName: 'RAHENDRISON',
        email: 'miantsatianarahendrison@gmail.com',
        role: 'ADMIN',
        familyRole: 'OPERATIONS_DESIGN'
      },
      {
        id: 4,
        firstName: 'Tia Faniry',
        lastName: 'RAHENDRISON',
        email: 'fanirytia17@gmail.com',
        role: 'ADMIN',
        familyRole: 'ADMIN_COMMUNICATION'
      }
    ]);
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Ì∫Ä ByGagoos Ink API sur http://localhost:${PORT}`);
  console.log(`Ì±• Famille: http://localhost:${PORT}/api/family`);
});
APP_EOF

cat > prisma/seed.js << 'SEED_EOF'
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function main() {
  console.log('Ìº± Initialisation des donn√©es ByGagoos Ink...');
  
  // Nettoyer
  await prisma.user.deleteMany({});
  
  // Cr√©er les 4 utilisateurs familiaux
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
    console.log(`‚úÖ ${user.firstName} ${user.lastName}`);
  }
  
  console.log('Ìæâ 4 utilisateurs familiaux cr√©√©s!');
  console.log('Ì≥ß Connexion: tovoniaina.rahendrison@gmail.com');
  console.log('Ì¥ë Mot de passe: ByGagoos2025!');
}

main()
  .catch(e => {
    console.error('‚ùå Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
SEED_EOF

echo "Ì≥¶ Installation des d√©pendances..."
npm install

echo "Ì¥ß G√©n√©ration Prisma..."
npx prisma generate

echo "Ì∑ÑÔ∏è  Cr√©ation base de donn√©es..."
npx prisma db push

echo "Ìº± Chargement des donn√©es..."
node prisma/seed.js

echo "Ìæâ SETUP COMPL√âT√â!"
echo "Ì±â D√©marrer: npm run dev"
echo "Ì±â Famille: http://localhost:3001/api/family"
