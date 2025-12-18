@echo off
chcp 65001 >nul
echo 🧹 NETTOYAGE DOCKER BYGAGOOS
echo =============================

echo.
echo 1. 🛑 ARRÊT DES CONTENEURS...
docker-compose down 2>nul

echo.
echo 2. 🗑️  SUPPRESSION DES CONTENEURS...
docker rm -f bygagoos-postgres bygagoos-pgadmin bygagoos-backend 2>nul

echo.
echo 3. 🗑️  SUPPRESSION DES IMAGES...
docker rmi bygagoos-backend 2>nul

echo.
echo 4. 🗑️  SUPPRESSION DES VOLUMES...
docker volume rm bygagoos_postgres_data bygagoos_pgadmin_data 2>nul

echo.
echo 5. 🗑️  NETTOYAGE DOCKER SYSTEM...
docker system prune -f 2>nul

echo.
echo ✅ NETTOYAGE TERMINÉ !
echo.
echo Pour redémarrer : start-project.bat
echo.
pause