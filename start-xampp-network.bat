@echo off
REM ============================================
REM ByGagoos-Ink - Démarrage complet XAMPP
REM ============================================

setlocal enabledelayedexpansion

cls
echo.
echo ========================================
echo    ByGagoos-Ink - Startup XAMPP
echo ========================================
echo.

REM Check admin rights
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Erreur: Veuillez exécuter ce script en tant qu'administrateur
    pause
    exit /b 1
)

echo [1/5] Vérification des services XAMPP...

REM Check if Apache is running
tasklist /FI "IMAGENAME eq apache.exe" 2>NUL | find /I /N "apache.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ Apache est déjà actif
) else (
    echo ⏳ Démarrage d'Apache...
    start "XAMPP Control Panel" "C:\xampp\xampp-control.exe"
    timeout /t 3 >nul
)

REM Check if MySQL is running
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ MySQL est déjà actif
) else (
    echo ⏳ Démarrage de MySQL...
    timeout /t 2 >nul
)

echo.
echo [2/5] Vérification de Node.js...

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Erreur: Node.js non trouvé
    echo Installez Node.js depuis https://nodejs.org
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do echo ✅ Node.js %%i détecté
)

echo.
echo [3/5] Compilation du frontend...

cd /d "D:\ByGagoos-Ink\frontend"

if not exist "node_modules" (
    echo ⏳ Installation des dépendances frontend...
    call npm install --silent
)

echo ⏳ Build du projet...
call npm run build >nul 2>&1

if %errorlevel% equ 0 (
    echo ✅ Frontend compilé avec succès
) else (
    echo ❌ Erreur lors du build frontend
    pause
    exit /b 1
)

REM Copy to XAMPP
echo ⏳ Copie vers XAMPP...
if not exist "C:\xampp\htdocs\bygagoos-ink\public" mkdir "C:\xampp\htdocs\bygagoos-ink\public"
xcopy "dist\*" "C:\xampp\htdocs\bygagoos-ink\public" /E /Y /Q >nul

echo.
echo [4/5] Vérification du backend...

cd /d "D:\ByGagoos-Ink\backend"

if not exist "node_modules" (
    echo ⏳ Installation des dépendances backend...
    call npm install --silent
)

echo.
echo [5/5] Démarrage du serveur backend...
echo.

REM Start backend in new window
start "ByGagoos-Ink Backend (Node.js - Port 3001)" cmd /k "cd D:\ByGagoos-Ink\backend && node server.js"

echo ✅ Serveur backend démarré dans une nouvelle fenêtre
echo.

REM Get local IP
for /f "delims= " %%i in ('ipconfig ^| find /i "IPv4"') do set line=%%i
set "ip=%line:*: =%"

echo.
echo ========================================
echo    ✅ Démarrage terminé!
echo ========================================
echo.
echo 🌐 Accédez à votre application :
echo.
echo    http://bygagoos-ink.local
echo    ou
echo    http://localhost
echo    ou
echo    http://192.168.1.X (remplacer X)
echo.
echo 📊 API Backend : http://localhost:3001/api/health
echo.
echo 🔐 Identifiants de connexion :
echo    Email    : tovoniaina.rahendrison@gmail.com
echo    Password : ByGagoos2025!
echo.
echo ⏳ Attendez 5 secondes avant d'ouvrir le navigateur...
echo.

timeout /t 5

REM Open browser
start http://bygagoos-ink.local

echo ✨ Navigateur lancé!
echo.
echo ℹ️  Le backend continuera de tourner jusqu'à fermeture de sa fenêtre.
echo.
pause
