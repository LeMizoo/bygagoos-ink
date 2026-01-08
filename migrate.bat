@echo off
echo ========================================
echo MIGRATION BYGAGOOS INK - RESTAURATION
echo ========================================
echo.

REM 1. Créer les dossiers manquants
echo [1/6] Création de la structure...
mkdir src\components\layout 2>nul
mkdir src\components\auth 2>nul
mkdir src\components\Loading 2>nul
mkdir src\components\ui 2>nul
mkdir src\pages\admin\dashboard 2>nul
mkdir src\pages\admin\orders 2>nul
mkdir src\pages\admin\clients 2>nul
mkdir src\pages\admin\production 2>nul
mkdir src\pages\admin\profile 2>nul
mkdir src\pages\admin\stock 2>nul
mkdir src\pages\admin\accounting 2>nul
mkdir src\pages\admin\settings 2>nul
mkdir src\pages\admin\team 2>nul
mkdir src\pages\public 2>nul
mkdir src\styles 2>nul

REM 2. Copier les fichiers essentiels de base
echo [2/6] Copie des fichiers de base...
copy backup-src\App.jsx src\App.jsx /Y
copy backup-src\App.css src\App.css /Y
copy backup-src\index.css src\index.css /Y
copy backup-src\main.jsx src\main.jsx /Y

REM 3. Copier les pages publiques
echo [3/6] Copie des pages publiques...
copy backup-src\pages\publics\Gallery.jsx src\pages\public\GalleryPage.jsx /Y
copy backup-src\pages\publics\FamilyPage.jsx src\pages\public\FamilyPage.jsx /Y
copy backup-src\pages\publics\Login.jsx src\pages\public\LoginPage.jsx /Y
copy backup-src\pages\publics\ComingSoonPage.jsx src\pages\public\ComingSoonPage.jsx /Y

REM 4. Copier les pages admin
echo [4/6] Copie des pages admin...
copy backup-src\pages\privates\Dashboard.jsx src\pages\admin\dashboard\AdminDashboard.jsx /Y
copy backup-src\pages\privates\ClientsPage.jsx src\pages\admin\clients\ClientsPage.jsx /Y
copy backup-src\pages\privates\OrdersPage.jsx src\pages\admin\orders\OrdersPage.jsx /Y
copy backup-src\pages\privates\OrderEditPage.jsx src\pages\admin\orders\OrderEditPage.jsx /Y
copy backup-src\pages\privates\OrdersNewPage.jsx src\pages\admin\orders\OrdersNewPage.jsx /Y
copy backup-src\pages\privates\ProductionTeam.jsx src\pages\admin\production\ProductionPage.jsx /Y
copy backup-src\pages\privates\ProfilePage.jsx src\pages\admin\profile\ProfilePage.jsx /Y
copy backup-src\pages\privates\StockPage.jsx src\pages\admin\stock\StockPage.jsx /Y
copy backup-src\pages\privates\AccountingPage.jsx src\pages\admin\accounting\AccountingPage.jsx /Y
copy backup-src\pages\privates\SettingsPage.jsx src\pages\admin\settings\SettingsPage.jsx /Y

REM 5. Copier les fichiers CSS
echo [5/6] Copie des styles...
copy backup-src\styles\*.css src\styles\ /Y

REM 6. Créer les nouveaux composants layout
echo [6/6] Création des nouveaux composants...
REM Créer Header.jsx
echo // Header.jsx - Navigation publique > src\components\layout\Header.jsx
type nul > src\components\layout\Header.jsx

REM Créer Footer.jsx
echo // Footer.jsx > src\components\layout\Footer.jsx
type nul > src\components\layout\Footer.jsx

REM Créer AdminSidebar.jsx
echo // AdminSidebar.jsx > src\components\layout\AdminSidebar.jsx
type nul > src\components\layout\AdminSidebar.jsx

echo.
echo ========================================
echo MIGRATION TERMINÉE !
echo ========================================
echo.
echo Structure créée dans : src\
echo Backup disponible dans : backup-src\
echo.
pause