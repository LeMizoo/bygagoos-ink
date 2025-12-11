@echo off
chcp 65001 >nul
echo ===================================================
echo Ì∫Ä LANCEMENT DE BYGAGOOS-INK - PLATEFORME FAMILIALE
echo ===================================================

echo.
echo 1. Ì∞≥ D√âMARRAGE DES SERVICES DOCKER...
cd backend
docker-compose up -d
timeout /t 5 /nobreak >nul

echo.
echo 2. Ì≥ä V√âRIFICATION DES CONTENEURS...
docker ps --filter name=bygagoos --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo.
echo 3. Ì∫Ä D√âMARRAGE DU BACKEND (PORT 3001)...
start "Backend ByGagoos-Ink" cmd /k "npm start"

echo.
echo 4. Ìæ® D√âMARRAGE DE PRISMA STUDIO (PORT 5555)...
start "Prisma Studio" cmd /k "npx prisma studio"

echo.
echo 5. Ì≥± D√âMARRAGE DU FRONTEND (PORT 5173)...
cd ../frontend
start "Frontend ByGagoos-Ink" cmd /k "npm run dev"

echo.
echo ===================================================
echo ‚úÖ TOUS LES SERVICES SONT EN COURS DE D√âMARRAGE !
echo ===================================================

echo.
echo Ìºê URLs D'ACC√àS :
echo    Frontend React : http://localhost:5173
echo    Backend API    : http://localhost:3001
echo    Prisma Studio  : http://localhost:5555
echo    PGAdmin        : http://localhost:5050

echo.
echo Ì±®‚ÄçÌ±©‚ÄçÌ±ß‚ÄçÌ±¶ IDENTIFIANTS DE TEST :
echo    Email    : tovoniaina.rahendrison@gmail.com
echo    Password : ByGagoos2025!

echo.
echo ‚è≥ Patientez quelques secondes que tous les services d√©marrent...
echo ===================================================
pause
