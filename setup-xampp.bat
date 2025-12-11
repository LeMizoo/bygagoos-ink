@echo off
REM ============================================
REM ByGagoos-Ink XAMPP Setup Script
REM ============================================

setlocal enabledelayedexpansion

echo.
echo ====================================
echo    ByGagoos-Ink XAMPP Setup
echo ====================================
echo.

REM Check if running as admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ Erreur: Veuillez exécuter ce script en tant qu'administrateur
    pause
    exit /b 1
)

REM Define paths
set XAMPP_PATH=C:\xampp
set HTDOCS_PATH=%XAMPP_PATH%\htdocs\bygagoos-ink
set BACKEND_PATH=d:\ByGagoos-Ink\backend
set FRONTEND_PATH=d:\ByGagoos-Ink\frontend
set CONFIG_PATH=d:\ByGagoos-Ink\config

echo ✅ Chemins définis:
echo   - XAMPP: %XAMPP_PATH%
echo   - Frontend dist: %HTDOCS_PATH%
echo   - Backend: %BACKEND_PATH%
echo.

REM Step 1: Create htdocs directory
echo 📁 Étape 1: Création des répertoires XAMPP...
if not exist "%HTDOCS_PATH%" (
    mkdir "%HTDOCS_PATH%"
    echo ✅ Répertoire créé: %HTDOCS_PATH%
) else (
    echo ⚠️  Répertoire existe déjà: %HTDOCS_PATH%
)
echo.

REM Step 2: Configure hosts file
echo 🔧 Étape 2: Configuration du fichier hosts...
set HOSTS_FILE=C:\Windows\System32\drivers\etc\hosts
set HOST_ENTRY=127.0.0.1 bygagoos-ink.local

findstr /M "bygagoos-ink.local" "%HOSTS_FILE%" >nul
if %errorLevel% neq 0 (
    echo %HOST_ENTRY%>> "%HOSTS_FILE%"
    echo ✅ Entrée ajoutée au hosts
) else (
    echo ℹ️  Entrée déjà présente dans hosts
)
echo.

REM Step 3: Build frontend
echo 🏗️  Étape 3: Build du frontend...
cd /d "%FRONTEND_PATH%"
if exist "node_modules" (
    echo ✅ node_modules trouvé
) else (
    echo 📦 Installation des dépendances...
    call npm install
    if %errorLevel% neq 0 (
        echo ❌ Erreur lors de npm install
        pause
        exit /b 1
    )
)

echo 🔨 Build en cours...
call npm run build
if %errorLevel% neq 0 (
    echo ❌ Erreur lors du build
    pause
    exit /b 1
)
echo ✅ Build complété
echo.

REM Step 4: Copy frontend to htdocs
echo 📋 Étape 4: Copie du frontend vers XAMPP...
if exist "%HTDOCS_PATH%\*" (
    echo 🗑️  Nettoyage du répertoire existant...
    del /q /s "%HTDOCS_PATH%\*" >nul 2>&1
    for /d %%x in ("%HTDOCS_PATH%\*") do @rd /s /q "%%x" >nul 2>&1
)

echo 📦 Copie des fichiers...
xcopy "%FRONTEND_PATH%\dist\*" "%HTDOCS_PATH%\" /E /I /Y >nul
if %errorLevel% neq 0 (
    echo ❌ Erreur lors de la copie
    pause
    exit /b 1
)
echo ✅ Frontend copié avec succès
echo.

REM Step 5: Setup backend
echo 🔧 Étape 5: Configuration du backend...
cd /d "%BACKEND_PATH%"

if not exist ".env.production" (
    echo 📝 Création du fichier .env.production...
    copy "%CONFIG_PATH%\.env.production" ".env.production" >nul
    echo ✅ .env.production créé
    echo ⚠️  N'oubliez pas de configurer les variables sensibles!
) else (
    echo ℹ️  .env.production existe déjà
)

if exist "node_modules" (
    echo ✅ node_modules trouvé
) else (
    echo 📦 Installation des dépendances backend...
    call npm install
    if %errorLevel% neq 0 (
        echo ❌ Erreur lors de npm install
        pause
        exit /b 1
    )
)
echo.

REM Step 6: Copy Apache config
echo 🔗 Étape 6: Configuration Apache...
set APACHE_CONF=%XAMPP_PATH%\apache\conf\extra\httpd-vhosts.conf
echo ℹ️  Configuration Apache VirtualHosts:
echo    Fichier: %APACHE_CONF%
echo.
echo 📋 Contenu à ajouter (ou remplacer):
echo    Voir: %CONFIG_PATH%\apache-vhosts.conf
echo.
echo ⚠️  Actions manuelles requises:
echo    1. Copier le contenu de %CONFIG_PATH%\apache-vhosts.conf
echo    2. Ajouter à %APACHE_CONF%
echo    3. Décommenter mod_rewrite dans httpd.conf
echo.

REM Step 7: Summary
echo.
echo ====================================
echo    ✅ Setup terminé!
echo ====================================
echo.
echo 📌 Prochaines étapes:
echo.
echo 1️⃣  Configuration manuelle Apache:
echo    - Éditer: %APACHE_CONF%
echo    - Ajouter la configuration VirtualHost
echo    - Source: %CONFIG_PATH%\apache-vhosts.conf
echo.
echo 2️⃣  Démarrer XAMPP:
echo    - Apache: XAMPP Control Panel
echo    - MySQL/PostgreSQL: XAMPP Control Panel
echo.
echo 3️⃣  Démarrer le backend Node.js:
echo    - PowerShell/CMD: cd %BACKEND_PATH% ^&^& npm start
echo.
echo 4️⃣  Accéder à l'application:
echo    - http://bygagoos-ink.local
echo    - http://localhost/bygagoos-ink/
echo.
echo 📖 Documentation complète: d:\ByGagoos-Ink\XAMPP_SETUP.md
echo.

pause
