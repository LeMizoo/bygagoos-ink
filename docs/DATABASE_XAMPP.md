# 📊 ByGagoos-Ink - Configuration Base de Données XAMPP

## 📋 Choix de la Base de Données

### 1. PostgreSQL (Recommandé)

#### Installation
```bash
# Via XAMPP MariaDB
# OU
# Télécharger depuis: https://www.postgresql.org/download/windows/

# Créer la base
createdb -U postgres bygagoos_ink

# Créer l'utilisateur
createuser -P bygagoos_app
# Password: ByGagoosApp2025!

# Attribuer les permissions
psql -U postgres
GRANT ALL PRIVILEGES ON DATABASE bygagoos_ink TO bygagoos_app;
```

#### Variables d'environnement
```bash
DATABASE_URL="postgresql://bygagoos_app:ByGagoosApp2025!@localhost:5432/bygagoos_ink"
```

---

### 2. MySQL/MariaDB (XAMPP)

#### Configuration XAMPP
```bash
# Démarrer MySQL depuis XAMPP Control Panel
# Ou en ligne de commande
cd C:\xampp
mysql_start.bat
```

#### Créer la base
```sql
-- Via phpMyAdmin: http://localhost/phpmyadmin
-- Ou en ligne de commande:

mysql -u root -p

CREATE DATABASE bygagoos_ink;
CREATE USER 'bygagoos_app'@'localhost' IDENTIFIED BY 'ByGagoosApp2025!';
GRANT ALL PRIVILEGES ON bygagoos_ink.* TO 'bygagoos_app'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### Variables d'environnement
```bash
DATABASE_URL="mysql://bygagoos_app:ByGagoosApp2025!@localhost:3306/bygagoos_ink"
```

---

### 3. SQLite (Développement Rapide)

#### Avantages
- ✅ Pas d'installation requise
- ✅ Fichier local
- ✅ Parfait pour le développement
- ✅ Idéal pour tester

#### Inconvénients
- ❌ Pas prévu pour la production
- ❌ Performance limitée
- ❌ Pas de vraie concurrence

#### Configuration
```bash
DATABASE_URL="file:./dev.db"
```

---

## 🔧 Prisma Schema

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"  // ou "mysql", "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id                String    @id @default(cuid())
  email             String    @unique
  firstName         String
  lastName          String
  role              String    // SUPER_ADMIN, FAMILY_MEMBER, CLIENT
  familyRole        String?   // STRUCTURE, INSPIRATION, CREATION, COMMUNICATION
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@map("users")
}

// ... autres modèles
```

---

## 📦 Migrations Prisma

### Première Migration
```bash
# Créer et appliquer une migration
npm run prisma:migrate

# Ou pousser directement le schéma
npm run prisma:push
```

### Migrations Existantes
```bash
# Appliquer les migrations en attente
npx prisma migrate deploy

# Voir l'état des migrations
npx prisma migrate status
```

### Réinitialiser la Base (ATTENTION!)
```bash
# Supprimer toutes les données et réappliquer les migrations
npx prisma migrate reset

# Confirmer la perte de données
# Puis lance automatiquement le seed
```

---

## 🌱 Seeding de la Base

### Script de Seed
```javascript
// backend/prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Créer les utilisateurs de test
  const users = [
    {
      email: 'tovoniaina.rahendrison@gmail.com',
      firstName: 'Tovoniaina',
      lastName: 'RAHENDRISON',
      role: 'SUPER_ADMIN',
      familyRole: 'STRUCTURE'
    },
    // ... autres utilisateurs
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        ...user,
        hashedPassword: await bcrypt.hash('ByGagoos2025!', 10)
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Exécuter le Seed
```bash
# Une fois
npm run prisma:seed

# Ou manuellement
npx ts-node prisma/seed.js
```

---

## 🔍 Inspection de la Base

### Prisma Studio
```bash
# Interface web graphique
npm run prisma:studio

# S'ouvre sur: http://localhost:5555
```

### Ligne de Commande

#### PostgreSQL
```bash
# Se connecter
psql -U bygagoos_app -d bygagoos_ink

# Commandes utiles
\dt                          # Lister les tables
\d users                     # Décrire la table users
SELECT COUNT(*) FROM users;  # Compter les lignes
\q                           # Quitter
```

#### MySQL
```bash
# Se connecter
mysql -u bygagoos_app -p bygagoos_ink

# Commandes utiles
SHOW TABLES;                    # Lister les tables
DESCRIBE users;                 # Décrire la table users
SELECT COUNT(*) FROM users;     # Compter les lignes
EXIT;                           # Quitter
```

---

## 📊 Schéma de la Base de Données

```sql
-- Utilisateurs
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    hashedPassword VARCHAR(255),
    role VARCHAR(50),
    familyRole VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Membres de famille
CREATE TABLE familyMembers (
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255) UNIQUE,
    familyRole VARCHAR(50),
    skills JSON,
    availability JSON,
    performance JSON,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Clients
CREATE TABLE clients (
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255) UNIQUE,
    companyName VARCHAR(255),
    clientType VARCHAR(50),
    address JSON,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Articles d'inventaire
CREATE TABLE inventoryItems (
    id VARCHAR(255) PRIMARY KEY,
    itemType VARCHAR(50),
    name VARCHAR(255),
    description TEXT,
    quantity INT,
    price DECIMAL(10, 2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 🔒 Permissions et Sécurité

### PostgreSQL
```sql
-- Accorder les permissions minimales
GRANT CONNECT ON DATABASE bygagoos_ink TO bygagoos_app;
GRANT USAGE ON SCHEMA public TO bygagoos_app;
GRANT CREATE ON SCHEMA public TO bygagoos_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO bygagoos_app;

-- Révoquer les permissions dangereuses
REVOKE ALL ON DATABASE bygagoos_ink FROM public;
```

### MySQL
```sql
-- Accorder les permissions minimales
GRANT SELECT, INSERT, UPDATE, DELETE ON bygagoos_ink.* TO 'bygagoos_app'@'localhost';

-- Revérifier les permissions
SHOW GRANTS FOR 'bygagoos_app'@'localhost';
```

---

## 📈 Backups et Restauration

### PostgreSQL Backup
```bash
# Créer un backup
pg_dump -U bygagoos_app -d bygagoos_ink > backup.sql

# Restaurer depuis un backup
psql -U bygagoos_app -d bygagoos_ink < backup.sql

# Backup avec compression
pg_dump -U bygagoos_app -d bygagoos_ink | gzip > backup.sql.gz
gunzip < backup.sql.gz | psql -U bygagoos_app -d bygagoos_ink
```

### MySQL Backup
```bash
# Créer un backup
mysqldump -u bygagoos_app -p bygagoos_ink > backup.sql

# Restaurer depuis un backup
mysql -u bygagoos_app -p bygagoos_ink < backup.sql

# Backup avec compression
mysqldump -u bygagoos_app -p bygagoos_ink | gzip > backup.sql.gz
gunzip < backup.sql.gz | mysql -u bygagoos_app -p bygagoos_ink
```

---

## 🧪 Tests de Connexion

```bash
# Test PostgreSQL
psql -U bygagoos_app -d bygagoos_ink -c "SELECT 1"

# Test MySQL
mysql -u bygagoos_app -p bygagoos_ink -e "SELECT 1"

# Test depuis Node.js
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.\$queryRaw\`SELECT 1\`
  .then(() => console.log('✅ Connexion OK'))
  .catch(e => console.error('❌ Erreur:', e))
  .finally(() => prisma.\$disconnect());
"
```

---

## 📋 Maintenance Régulière

### Quotidiennement
- [ ] Vérifier les logs d'erreur
- [ ] Monitorer l'espace disque

### Hebdomadairement
- [ ] Créer un backup
- [ ] Vérifier la performance des requêtes

### Mensuellement
- [ ] Nettoyer les données obsolètes
- [ ] Mettre à jour les dépendances Prisma
- [ ] Tester les restaurations de backup

### Annuellement
- [ ] Revoir la stratégie de sécurité
- [ ] Analyser l'évolution des données
- [ ] Planifier la scalabilité

---

## ⚠️ Pièges Communs

### 1. Oublier les migrations
```bash
❌ npm run prisma:push sans migration
✅ npm run prisma:migrate (créer une migration)
```

### 2. Laisser les données de test en production
```bash
# Avant la production: nettoyer la base
npm run prisma:migrate reset  # En dev ONLY!
```

### 3. Mauvaises permissions
```bash
# Vérifier les permissions
SELECT grantee, privilege_type FROM role_table_grants;
```

### 4. Pas de backups
```bash
# Configurer des backups automatiques
# Via cron, Task Scheduler, ou service cloud
```

---

## 🚀 Checklist Base de Données

- [ ] BD créée
- [ ] Utilisateur créé avec mots de passe sécurisés
- [ ] Permissions configurées
- [ ] Migrations appliquées
- [ ] Seed exécuté
- [ ] Données de test vérifiées
- [ ] Backup configuré
- [ ] Monitering en place
- [ ] Documentation mise à jour

---

✅ Base de données XAMPP prête!
