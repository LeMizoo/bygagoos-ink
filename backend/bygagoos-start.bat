@echo off
cls
color 0A
echo.
echo  ██████╗ ██╗   ██╗ ██████╗  █████╗  ██████╗  ██████╗ ███████╗    ██╗███╗   ██╗██╗  ██╗
echo ██╔════╝ ╚██╗ ██╔╝██╔════╝ ██╔══██╗██╔════╝ ██╔═══██╗██╔════╝    ██║████╗  ██║██║ ██╔╝
echo ██║  ███╗ ╚████╔╝ ██║  ███╗███████║██║  ███╗██║   ██║███████╗    ██║██╔██╗ ██║█████╔╝ 
echo ██║   ██║  ╚██╔╝  ██║   ██║██╔══██║██║   ██║██║   ██║╚════██║    ██║██║╚██╗██║██╔═██╗ 
echo ╚██████╔╝   ██║   ╚██████╔╝██║  ██║╚██████╔╝╚██████╔╝███████║    ██║██║ ╚████║██║  ██╗
echo  ╚═════╝    ╚═╝    ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝    ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝
echo.
echo ================================ BYGAGOOS INK ================================
echo.

:menu
echo 1. ��� Démarrer TOUT (Recommandé)
echo 2. ��� Démarrer seulement Docker
echo 3. ⚙️  Démarrer seulement Backend
echo 4. ��� Démarrer seulement Prisma Studio
echo 5. ��� Tester l'API
echo 6. ��� Quitter
echo.
set /p choice="Choisissez une option (1-6): "

if "%choice%"=="1" goto start_all
if "%choice%"=="2" goto start_docker
if "%choice%"=="3" goto start_backend
if "%choice%"=="4" goto start_prisma
if "%choice%"=="5" goto test_api
if "%choice%"=="6" goto exit

echo Choix invalide
goto menu

:start_all
echo.
echo ��� Arrêt des processus...
taskkill /F /IM node.exe 2>nul
echo ��� Démarrage Docker...
docker-compose -f docker-compose.db.yml down
docker-compose -f docker-compose.db.yml up -d
timeout 5
echo ⚙️  Démarrage Backend...
start "ByGagoos Backend" cmd /k "npm run dev"
timeout 3
echo ��� Démarrage Prisma Studio...
start "Prisma Studio" cmd /k "npx prisma studio"
echo.
echo ✅ TOUT EST DÉMARRÉ !
goto show_urls

:start_docker
echo.
echo ��� Démarrage Docker...
docker-compose -f docker-compose.db.yml down
docker-compose -f docker-compose.db.yml up -d
goto show_urls

:start_backend
echo.
echo ⚙️  Démarrage Backend...
start "ByGagoos Backend" cmd /k "npm run dev"
goto show_urls

:start_prisma
echo.
echo ��� Démarrage Prisma Studio...
start "Prisma Studio" cmd /k "npx prisma studio"
goto show_urls

:test_api
echo.
echo ��� Test de l'API...
curl http://localhost:3001/api/health 2>nul
echo.
curl http://localhost:3001/api/db-check 2>nul
echo.
pause
goto menu

:show_urls
echo.
echo ================================
echo ��� URLs IMPORTANTES :
echo    Backend API : http://localhost:3001
echo    Prisma Studio : http://localhost:5555
echo    PGAdmin : http://localhost:5050
echo.
echo ��� Identifiants :
echo    Email : tovoniaina.rahendrison@gmail.com
echo    Password : ByGagoos2025!
echo ================================
echo.
pause
goto menu

:exit
echo.
echo Au revoir ! ���
timeout 2
exit
