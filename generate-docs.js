// generate-docs.js
// Script pour recréer automatiquement les fichiers .md de ByGagoos-Ink

const fs = require("fs");

// Dictionnaire des fichiers et contenus
const docs = {
  "README.md": `# 🎨 ByGagoos-Ink - Plateforme de Gestion Familiale

![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-18.17.0-339933)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)

Plateforme web complète pour la gestion de l'entreprise familiale ByGagoos-Ink, spécialisée en sérigraphie à Madagascar.

## 🚀 Démo en Ligne
- **Frontend (Vercel)** : https://bygagoos-ink.vercel.app
- **Backend API (Vercel)** : https://bygagoos-ink-backend.vercel.app

## ✨ Fonctionnalités
- Authentification sécurisée
- Dashboard en temps réel
- Gestion des commandes et projets
- Profils familiaux avec rôles
- Interface responsive Material-UI
- Déploiement automatique via Vercel
- Base PostgreSQL via Vercel Postgres

## 👨‍👩‍👧‍👦 Membres
- Tovoniaina RAHENDRISON — Super Admin
- Volatiana RANDRIANARISOA — Inspiration
- Miantsatiana RAHENDRISON — Création
- Tia Faniry RAHENDRISON — Communication

## 🛠️ Technologies
Frontend : React, Vite, Material-UI  
Backend : Node.js, Express, Prisma, PostgreSQL  
Infra : Docker, Vercel, GitHub

## 🚀 Démarrage Rapide
\`\`\`bash
git clone https://github.com/LeMizoo/bygagoos-ink.git
cd bygagoos-ink
\`\`\`
`,

  "PROJECT_STRUCTURE.md": `# 📂 Structure du Projet ByGagoos-Ink
- backend/ : API Node.js + Prisma
- frontend/ : React + Vite
- config/ : Apache/Nginx
- docs/ : Documentation
- docker-compose.yml : orchestration
`,

  "DEMARRAGE_RAPIDE.md": `# ⚡ Démarrage Rapide
1. Cloner le projet
2. Installer les dépendances
3. Lancer backend et frontend
4. Accéder à http://localhost:5173`,
  
  "DEPLOYMENT_READY.md": `# 🚀 Déploiement
- Vérifier .env.production
- Construire les images Docker
- Lancer : docker-compose -f docker-compose.prod.yml up -d --build`,

  "INDEX.md": `# 📖 Documentation ByGagoos-Ink
- README.md
- PROJECT_STRUCTURE.md
- DEMARRAGE_RAPIDE.md
- DEPLOYMENT_READY.md
- TESTING.md
- USERS_MANAGEMENT.md`,

  "TESTING.md": `# 🧪 Tests
Backend : Jest + Supertest  
Frontend : Cypress  
CI/CD : GitHub Actions`,

  "USERS_MANAGEMENT.md": `# 👨‍👩‍👧‍👦 Gestion des Utilisateurs
- Super Admin : Tovoniaina
- Inspiration : Volatiana
- Création : Miantsatiana
- Communication : Tia Faniry
Auth : JWT + bcryptjs
Endpoints : /auth, /users`
};

// Génération des fichiers
for (const [file, content] of Object.entries(docs)) {
  fs.writeFileSync(file, content.trim() + "\n", "utf8");
  console.log(`✅ ${file} recréé`);
}

console.log("=== Tous les fichiers .md ont été régénérés ===");
