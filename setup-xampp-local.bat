@echo off
REM ============================================
REM ByGagoos-Ink - Setup Network XAMPP
REM ============================================

setlocal enabledelayedexpansion

echo.
echo ========================================
echo    ByGagoos-Ink - Setup Reseau Local
echo ========================================
echo.

REM Check admin rights
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Erreur: Veuillez executer ce script en tant qu'administrateur
    pause
    exit /b 1
)

set XAMPP_PATH=C:\xampp
set HTDOCS_PATH=%XAMPP_PATH%\htdocs\bygagoos-ink
set VHOSTS_FILE=%XAMPP_PATH%\apache\conf\extra\httpd-vhosts.conf
set HOSTS_FILE=C:\Windows\System32\drivers\etc\hosts
set FRONTEND_PATH=D:\ByGagoos-Ink\frontend
set BACKEND_PATH=D:\ByGagoos-Ink\backend

echo [1/4] Configuration Apache Virtual Host...

if not exist "%VHOSTS_FILE%" (
    echo Erreur: Fichier %VHOSTS_FILE% non trouve
    pause
    exit /b 1
)

REM Check if already configured
findstr /M "bygagoos-ink" "%VHOSTS_FILE%" >nul
if %errorlevel% equ 0 (
    echo - Virtual Host deja configure
) else (
    echo - Ajout du Virtual Host...
    (
        echo.
        echo # ByGagoos-Ink Virtual Host
        echo ^<VirtualHost *:80^>
        echo     ServerName bygagoos-ink.local
        echo     ServerAlias bygagoos-ink
        echo     DocumentRoot "%HTDOCS_PATH%\public"
        echo.
        echo     ^<Directory "%HTDOCS_PATH%\public"^>
        echo         Options Indexes FollowSymLinks
        echo         AllowOverride All
        echo         Require all granted
        echo.
        echo         ^<IfModule mod_rewrite.c^>
        echo             RewriteEngine On
        echo             RewriteBase /
        echo             RewriteRule ^index\.html$ - [L]
        echo             RewriteCond %%{REQUEST_FILENAME} !-f
        echo             RewriteCond %%{REQUEST_FILENAME} !-d
        echo             RewriteRule . /index.html [L]
        echo         ^</IfModule^>
        echo     ^</Directory^>
        echo.
        echo     ^<IfModule mod_proxy.c^>
        echo         ProxyPreserveHost On
        echo         ProxyPass /api http://localhost:3001/api
        echo         ProxyPassReverse /api http://localhost:3001/api
        echo     ^</IfModule^>
        echo.
        echo     ErrorLog "logs/bygagoos-ink-error.log"
        echo     CustomLog "logs/bygagoos-ink-access.log" combined
        echo ^</VirtualHost^>
    ) >> "%VHOSTS_FILE%"
    echo OK
)

echo.
echo [2/4] Mise a jour fichier hosts...

findstr /M "bygagoos-ink" "%HOSTS_FILE%" >nul
if %errorlevel% equ 0 (
    echo - Entree hosts deja presente
) else (
    echo - Ajout de l'entree hosts...
    (
        echo # ByGagoos-Ink
        echo 127.0.0.1       bygagoos-ink.local
        echo 192.168.88.16   bygagoos-ink.local
    ) >> "%HOSTS_FILE%"
    echo OK
)

echo.
echo [3/4] Compilation du frontend...

if not exist "%FRONTEND_PATH%\node_modules" (
    echo - Installation des dependances...
    cd /d "%FRONTEND_PATH%"
    call npm install --silent
)

echo - Build du projet...
cd /d "%FRONTEND_PATH%"
call npm run build >nul 2>&1

if %errorlevel% equ 0 (
    echo OK
) else (
    echo Erreur lors du build
    pause
    exit /b 1
)

echo - Copie vers XAMPP...
if not exist "%HTDOCS_PATH%\public" mkdir "%HTDOCS_PATH%\public"
xcopy "%FRONTEND_PATH%\dist\*" "%HTDOCS_PATH%\public" /E /Y /Q >nul

echo.
echo [4/4] Verification Apache...

cd /d "%XAMPP_PATH%\apache\bin"
httpd -t >nul 2>&1

if %errorlevel% equ 0 (
    echo - Syntaxe Apache OK
) else (
    echo Erreur: Syntaxe Apache invalide
    pause
    exit /b 1
)

echo.
echo ========================================
echo    Configuration terminee!
echo ========================================
echo.
echo Prochaines etapes:
echo 1. Ouvrir XAMPP Control Panel
echo 2. Cliquer "Stop" puis "Start" Apache
echo 3. Demarrer le backend:
echo    cd %BACKEND_PATH%
echo    node server.js
echo 4. Acceder a l'application:
echo    http://bygagoos-ink.local
echo    ou
echo    http://192.168.88.16
echo.
echo Identifiants:
echo    Email: tovoniaina.rahendrison@gmail.com
echo    Password: ByGagoos2025!
echo.
pause
