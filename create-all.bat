@echo off
echo ========================================
echo CRÉATION COMPLÈTE BYGAGOOS INK
echo ========================================
echo.

echo Création de la structure...
mkdir src\components\layout 2>nul
mkdir src\components\auth 2>nul
mkdir src\components\Loading 2>nul
mkdir src\components\ui 2>nul
mkdir src\context 2>nul
mkdir src\pages\public 2>nul
mkdir src\pages\admin\dashboard 2>nul
mkdir src\pages\admin\orders 2>nul
mkdir src\pages\admin\clients 2>nul
mkdir src\pages\admin\production 2>nul
mkdir src\pages\admin\profile 2>nul
mkdir src\pages\admin\stock 2>nul
mkdir src\pages\admin\accounting 2>nul
mkdir src\pages\admin\settings 2>nul
mkdir src\styles 2>nul

echo Copie depuis backup-src...
if exist backup-src\pages\publics\Gallery.jsx copy backup-src\pages\publics\Gallery.jsx src\pages\public\GalleryPage.jsx
if exist backup-src\pages\publics\FamilyPage.jsx copy backup-src\pages\publics\FamilyPage.jsx src\pages\public\FamilyPage.jsx
if exist backup-src\pages\publics\Login.jsx copy backup-src\pages\publics\Login.jsx src\pages\public\LoginPage.jsx
if exist backup-src\pages\publics\ComingSoonPage.jsx copy backup-src\pages\publics\ComingSoonPage.jsx src\pages\public\ComingSoonPage.jsx
if exist backup-src\pages\privates\Dashboard.jsx copy backup-src\pages\privates\Dashboard.jsx src\pages\admin\dashboard\AdminDashboard.jsx
if exist backup-src\pages\privates\ClientsPage.jsx copy backup-src\pages\privates\ClientsPage.jsx src\pages\admin\clients\ClientsPage.jsx
if exist backup-src\pages\privates\OrdersPage.jsx copy backup-src\pages\privates\OrdersPage.jsx src\pages\admin\orders\OrdersPage.jsx
if exist backup-src\pages\privates\ProductionTeam.jsx copy backup-src\pages\privates\ProductionTeam.jsx src\pages\admin\production\ProductionPage.jsx

echo.
echo ========================================
echo COPIEZ MAINTENANT TOUS LES CODES CI-DESSUS
echo DANS LES FICHIERS CORRESPONDANTS
echo ========================================
echo.
echo 1. main.jsx
echo 2. index.css
echo 3. App.css
echo 4. App.jsx
echo 5. context\AuthContext.jsx
echo 6. components\layout\LayoutWrapper.jsx
echo 7. components\layout\Header.jsx
echo 8. components\layout\Footer.jsx
echo 9. components\layout\AdminSidebar.jsx
echo 10. pages\public\HomePage.jsx
echo 11. pages\public\RegisterPage.jsx
echo 12. pages\public\LoginPage.jsx
echo 13. pages\public\ComingSoonPage.jsx
echo 14. pages\admin\dashboard\AdminDashboard.jsx
echo.
echo Une fois tous les fichiers créés, exécutez:
echo cd D:\ByGagoos-Ink\frontend
echo npm run dev
pause