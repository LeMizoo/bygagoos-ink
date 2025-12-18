@echo off
chcp 65001 >nul
echo ===================================================
echo 🚀 LANCEMENT DE BYGAGOOS-INK - PLATEFORME DOCKER
echo ===================================================

echo.
echo 1. 🐳 ARRÊT DES ANCIENS CONTENEURS...
docker-compose down 2>nul

echo.
echo 2. 🐳 DÉMARRAGE DES SERVICES DOCKER...
cd backend
docker-compose up -d
timeout /t 10 /nobreak >nul

echo.
echo 3. ✅ VÉRIFICATION DES CONTENEURS...
docker ps --filter name=bygagoos --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" || (
    echo ❌ Docker non disponible
    echo Lancement en mode local...
    goto :LOCAL_MODE
)

echo.
echo 4. 📦 INSTALLATION DES DÉPENDANCES BACKEND...
npm install 2>nul
npx prisma generate 2>nul

echo.
echo 5. 🗃️  INITIALISATION DE LA BASE DE DONNÉES...
echo Attente de PostgreSQL...
timeout /t 15 /nobreak >nul
node scripts/seed-docker.js 2>nul || (
    echo ⚠️  Erreur seeding, tentative alternative...
    npx prisma db push --accept-data-loss 2>nul
)

echo.
echo 6. 🚀 DÉMARRAGE DU BACKEND (PORT 3001)...
start "Backend ByGagoos-Ink" cmd /k "npm run dev"

echo.
echo 7. 🔧 DÉMARRAGE DE PRISMA STUDIO (PORT 5555)...
start "Prisma Studio" cmd /k "npx prisma studio"

echo.
echo 8. 🌐 DÉMARRAGE DU FRONTEND (PORT 5173)...
cd ../frontend
npm install 2>nul
start "Frontend ByGagoos-Ink" cmd /k "npm run dev"

echo.
echo ===================================================
echo ✅ TOUS LES SERVICES SONT EN COURS DE DÉMARRAGE !
echo ===================================================

echo.
echo 🌐 URLs D'ACCÈS :
echo    Frontend React : http://localhost:5173
echo    Backend API    : http://localhost:3001
echo    Prisma Studio  : http://localhost:5555
echo    PGAdmin        : http://localhost:5050 (admin@bygagoos.com/password)

echo.
echo 🔐 IDENTIFIANTS DE TEST :
echo    Email    : tovoniaina.rahendrison@gmail.com
echo    Password : ByGagoos2025!

echo.
echo 🐳 ÉTAT DOCKER : docker ps --filter name=bygagoos
echo.
goto :END

:LOCAL_MODE
echo.
echo ⚠️  MODE LOCAL SANS DOCKER
echo.

echo 📦 INSTALLATION BACKEND LOCAL...
cd backend
npm install 2>nul
npx prisma generate 2>nul

echo 🚀 DÉMARRAGE BACKEND LOCAL...
start "Backend Local" cmd /k "npm run dev"

echo 🌐 DÉMARRAGE FRONTEND LOCAL...
cd ../frontend
npm install 2>nul
start "Frontend Local" cmd /k "npm run dev"

echo.
echo ✅ SERVICES LOCAUX DÉMARRÉS !
echo.
echo 🌐 URLs :
echo    Frontend : http://localhost:5173
echo    Backend  : http://localhost:3001
echo.
echo 🔐 IDENTIFIANTS : tovoniaina.rahendrison@gmail.com / ByGagoos2025!

:END
echo.
echo ⏳ Patientez 30 secondes que tous les services démarrent...
echo ===================================================
echo Appuyez sur une touche pour ouvrir le frontend...
pause >nul
start http://localhost:5173