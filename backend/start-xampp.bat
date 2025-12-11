@echo off
REM ============================================
REM ByGagoos-Ink Backend Starter (XAMPP)
REM ============================================

setlocal enabledelayedexpansion

cd /d "%~dp0"

echo.
echo ====================================
echo    ByGagoos-Ink Backend Starter
echo ====================================
echo.

REM Check if node is installed
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ Node.js n'est pas installé ou n'est pas dans PATH
    echo   Installez Node.js depuis: https://nodejs.org
    pause
    exit /b 1
)

REM Check if .env exists
if not exist ".env" (
    if exist ".env.production" (
        echo ℹ️  Utilisation de .env.production
        copy ".env.production" ".env" >nul
    ) else (
        echo ⚠️  Fichier .env manquant
        echo   Créez .env à partir de .env.example
        pause
        exit /b 1
    )
)

echo 🚀 Démarrage du backend...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installation des dépendances...
    call npm install
    if %errorLevel% neq 0 (
        echo ❌ Erreur lors de l'installation
        pause
        exit /b 1
    )
)

REM Start the server
call npm start

pause
