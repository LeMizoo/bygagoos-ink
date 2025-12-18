@echo off
cls
color 0A
echo.
echo  ██████╗ ██╗   ██╗ ██████╗  █████╗  ██████╗  ██████╗ ███████╗    ██╗███╗   ██╗██╗  ██╗
echo ██╔════╝ ╚██╗ ██╔╝██╔════╝ ██╔══██╗██╔════╝ ██╔═══██╗██╔════╝    ██║████╗  ██║██║ ██╔╝
echo ██║  ███╗ ╚████╔╝ ██║  ███╗███████║██║  ███╗██║   ██║███████╗    ██║██╔██╗ ██║█████╔╝ 
echo ██║   ██║  ╚██╔╝  ██║   ██║██╔══██║██║   ██║██║   ██║╚════██║    ██║██║╚██╗██║██╔═██╗ 
echo ╚██████╔╝   ██║   ╚██████╔╝██║  ██║╚██████╔╝╚██████╔╝███████║    ██║██║ ╚████║██║  ██╗
echo  ╚═════╝    ╚═╝    ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝    ▚═╝╚═╝  ╚═══╝╚═╝  ╚═╝
echo.
echo ================================ BYGAGOOS INK ================================
echo.

:menu
echo 1. 🔧 Démarrer Backend (Mode Local SQLite)
echo 2. 🗄️  Initialiser la base de données
echo 3. 👥 Créer des utilisateurs de test
echo 4. 🌐 Tester l'API
echo 5. 🚀 Démarrer avec Docker (si disponible)
echo 6. ❌ Quitter
echo.
set /p choice="Choisissez une option (1-6): "

if "%choice%"=="1" goto start_backend
if "%choice%"=="2" goto init_db
if "%choice%"=="3" goto create_users
if "%choice%"=="4" goto test_api
if "%choice%"=="5" goto start_docker
if "%choice%"=="6" goto exit

echo Choix invalide
goto menu

:start_backend
echo.
echo 🔧 Arrêt des processus Node...
taskkill /F /IM node.exe 2>nul
echo 🔧 Génération du client Prisma...
npx prisma generate
echo 🗄️  Création de la base de données SQLite...
npx prisma db push
echo 🚀 Démarrage du Backend en mode LOCAL...
echo.
start "ByGagoos Backend - Mode Local" cmd /k "npm run dev"
echo.
echo ✅ BACKEND DÉMARRÉ EN MODE LOCAL !
goto show_urls

:init_db
echo.
echo 🗄️  Initialisation de la base de données SQLite...
npx prisma generate
npx prisma db push
echo ✅ Base de données initialisée !
pause
goto menu

:create_users
echo.
echo 👥 Création des utilisateurs de test...
echo.
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function createUsers() {
  try {
    // Vider la table users
    await prisma.user.deleteMany({});
    
    // Créer les utilisateurs
    const users = [
      {
        email: 'tovoniaina.rahendrison@gmail.com',
        password: await bcrypt.hash('ByGagoos2025!', 10),
        name: 'Tovoniaina',
        role: 'STRUCTURE',
        description: 'Fondateur & Responsable Structure',
        color: '#2E7D32'
      },
      {
        email: 'volatiana@bygagoos.com',
        password: await bcrypt.hash('ByGagoos2025!', 10),
        name: 'Volatiana',
        role: 'INSPIRATION',
        description: 'Responsable Inspiration & Créativité',
        color: '#9C27B0'
      },
      {
        email: 'miantsatiana@bygagoos.com',
        password: await bcrypt.hash('ByGagoos2025!', 10),
        name: 'Miantsatiana',
        role: 'CREATION',
        description: 'Responsable Création & Production',
        color: '#FF9800'
      },
      {
        email: 'tiafaniry@bygagoos.com',
        password: await bcrypt.hash('ByGagoos2025!', 10),
        name: 'Tia Faniry',
        role: 'COMMUNICATION',
        description: 'Responsable Communication & Marketing',
        color: '#2196F3'
      }
    ];
    
    for (const userData of users) {
      await prisma.user.create({ data: userData });
      console.log('✅ Créé: ' + userData.name + ' (' + userData.email + ')');
    }
    
    console.log('\\n🎉 ' + users.length + ' utilisateurs créés !');
    console.log('🔐 Mot de passe pour tous: ByGagoos2025!');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await prisma.\$disconnect();
  }
}

createUsers();
"
echo.
pause
goto menu

:test_api
echo.
echo 🌐 Test de l'API...
echo.
echo 1. Test de santé:
curl -s http://localhost:3001/api/health 2>nul
echo.
echo 2. Nombre d'utilisateurs:
curl -s http://localhost:3001/api/health 2>nul | findstr "users"
echo.
echo 3. Test de connexion (si backend démarré):
echo    Email: tovoniaina.rahendrison@gmail.com
echo    Password: ByGagoos2025!
echo.
pause
goto menu

:start_docker
echo.
echo 🐳 Démarrage avec Docker (optionnel)...
echo ⚠️  Assurez-vous que Docker Desktop est démarré
docker-compose down 2>nul
docker-compose up -d 2>nul
echo.
echo ✅ Docker démarré (si disponible)
goto show_urls

:show_urls
echo.
echo ================================
echo 🌐 URLs IMPORTANTES :
echo    Backend API : http://localhost:3001
echo    Frontend : http://localhost:5173
echo    Health Check : http://localhost:3001/api/health
echo.
echo 🔐 IDENTIFIANTS DE TEST :
echo    Email : tovoniaina.rahendrison@gmail.com
echo    Password : ByGagoos2025!
echo    Rôles : STRUCTURE, INSPIRATION, CREATION, COMMUNICATION
echo ================================
echo.
echo 💡 COMMANDES UTILES :
echo    npm run dev          - Démarrer le backend
echo    npx prisma studio    - Interface base de données
echo    npx prisma db push   - Mettre à jour la base
echo.
pause
goto menu

:exit
echo.
echo Au revoir ! 👋
timeout 2
exit