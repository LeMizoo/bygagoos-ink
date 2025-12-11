@echo off
REM ============================================
REM ByGagoos-Ink - Setup XAMPP (Admin Required)
REM ============================================

setlocal enabledelayedexpansion

REM Check for admin rights
net session >nul 2>&1
if %errorLevel% neq 0 (
    color 0C
    echo.
    echo [ERREUR] Ce script necessite les droits ADMINISTRATEUR
    echo.
    echo Solution:
    echo   1. Clic droit sur ce fichier
    echo   2. Selectionner "Executer en tant qu'administrateur"
    echo.
    pause
    exit /b 1
)

color 0B
cls

echo.
echo ============================================
echo   ByGagoos-Ink - Configuration XAMPP
echo   IP Locale: 192.168.88.16
echo ============================================
echo.

REM ============================================
REM STEP 1: Check prerequisites
REM ============================================
echo [1/6] Verification des prerequis...

if not exist "C:\xampp\apache\bin\httpd.exe" (
    color 0C
    echo [!] XAMPP Apache non trouve a C:\xampp
    pause
    exit /b 1
)
echo     [OK] XAMPP Apache detecte

if not exist "D:\ByGagoos-Ink\backend\server.js" (
    color 0C
    echo [!] Backend Node.js non trouve
    pause
    exit /b 1
)
echo     [OK] Backend Node.js detecte

if not exist "D:\ByGagoos-Ink\frontend\dist" (
    color 0E
    echo [!] Frontend non compile - sera genere a l'etape 3
)
echo.

REM ============================================
REM STEP 2: Configure hosts file
REM ============================================
echo [2/6] Configuration du fichier hosts...

set "HOSTS_FILE=C:\Windows\System32\drivers\etc\hosts"
set "HOSTS_ENTRY=192.168.88.16   bygagoos-ink.local"

REM Check if entry exists
findstr /m "bygagoos-ink.local" "%HOSTS_FILE%" >nul
if %errorLevel% equ 0 (
    echo     [OK] Entree hosts deja configuree
) else (
    echo %HOSTS_ENTRY% >> "%HOSTS_FILE%"
    echo     [OK] Entree hosts ajoutee
)

REM Flush DNS
ipconfig /flushdns >nul 2>&1
echo     [OK] Cache DNS efface
echo.

REM ============================================
REM STEP 3: Compile frontend
REM ============================================
echo [3/6] Compilation du frontend...

cd /d "D:\ByGagoos-Ink\frontend"

REM Check if node_modules exists
if not exist "node_modules" (
    echo     [~] Installation npm...
    call npm install --silent
    if %errorLevel% neq 0 (
        color 0C
        echo [!] Erreur lors de npm install
        pause
        exit /b 1
    )
)

echo     [~] Build de l'application...
call npm run build >nul 2>&1
if %errorLevel% neq 0 (
    color 0C
    echo [!] Erreur lors du build
    pause
    exit /b 1
)
echo     [OK] Frontend compile
echo.

REM ============================================
REM STEP 4: Setup Apache
REM ============================================
echo [4/6] Configuration d'Apache...

set "VHOSTS_FILE=C:\xampp\apache\conf\extra\httpd-vhosts.conf"
set "HTDOCS_DIR=C:\xampp\htdocs\bygagoos-ink\public"

REM Create directories
if not exist "%HTDOCS_DIR%" (
    mkdir "%HTDOCS_DIR%"
    echo     [OK] Dossier htdocs cree
)

REM Copy frontend dist
xcopy "D:\ByGagoos-Ink\frontend\dist" "%HTDOCS_DIR%" /Y /S /I >nul 2>&1
if %errorLevel% neq 0 (
    color 0C
    echo [!] Erreur lors de la copie des fichiers frontend
    pause
    exit /b 1
)
echo     [OK] Fichiers frontend copies
echo.

REM ============================================
REM STEP 5: Start Apache
REM ============================================
echo [5/6] Demarrage d'Apache...

REM Stop if running
taskkill /F /IM httpd.exe >nul 2>&1

REM Start Apache
cd /d "C:\xampp\apache\bin"
start "" httpd.exe

REM Wait for startup
timeout /t 2 /nobreak >nul

REM Check if running
tasklist | findstr /I "httpd.exe" >nul
if %errorLevel% equ 0 (
    echo     [OK] Apache demarre
) else (
    color 0C
    echo [!] Erreur au demarrage d'Apache
    pause
    exit /b 1
)
echo.

REM ============================================
REM STEP 6: Start backend
REM ============================================
echo [6/6] Demarrage du backend...
echo.
echo     Ouverture du backend en fenetre separee...
start "ByGagoos-Ink Backend (Node.js)" cmd /k "cd /d D:\ByGagoos-Ink\backend && npm install --silent && node server.js"

echo.
echo ============================================
echo   CONFIGURATION COMPLETE!
echo ============================================
echo.
echo [✓] Fichier hosts configure
echo [✓] Frontend compile et deploye
echo [✓] Apache demarrage
echo [✓] Backend en cours de demarrage
echo.
echo Acces:
echo   - http://bygagoos-ink.local
echo   - http://localhost
echo   - http://192.168.88.16
echo.
echo Identifiants:
echo   Email    : tovoniaina.rahendrison@gmail.com
echo   Password : ByGagoos2025!
echo.
echo Note: Une fenetre terminal separee pour le backend s'est ouverte.
echo Gardez-la ouverte pour que l'API reste active.
echo.
color 0A
pause
