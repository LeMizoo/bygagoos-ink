@echo off
chcp 65001 >nul
echo 🔍 TEST DE CONNEXION BYGAGOOS-INK DOCKER
echo ========================================

echo.
echo 1. 🐳 VÉRIFICATION DOCKER...
docker --version 2>nul || (
    echo ❌ Docker non installé
    goto :NO_DOCKER
)

echo.
echo 2. 📦 VÉRIFICATION CONTENEURS...
docker-compose ps 2>nul || echo ⚠️  docker-compose non disponible

echo.
echo 3. 🌐 TEST BACKEND (3001)...
curl -s http://localhost:3001/api/health 2>nul && (
    echo ✅ Backend accessible
) || (
    echo ❌ Backend inaccessible
)

echo.
echo 4. 🖼️  TEST IMAGES...
curl -s -o nul -w "%%{http_code}" http://localhost:3001/api/public/images/logo.png 2>nul && (
    echo ✅ Images accessibles
) || (
    echo ❌ Images inaccessibles
)

echo.
echo 5. 🔐 TEST LOGIN API...
REM Use DEFAULT_PASSWORD environment variable for tests instead of hardcoded values.
set "DEFAULT_PASSWORD=%DEFAULT_PASSWORD%"

curl -s -X POST http://localhost:3001/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"tovoniaina.rahendrison@gmail.com\",\"password\":\"%DEFAULT_PASSWORD%\"}" 2>nul | findstr "success" >nul && (
    echo ✅ Login API fonctionnel
) || (
    echo ❌ Login API non fonctionnel (assurez-vous que DEFAULT_PASSWORD est défini dans l'environnement)
)

echo.
echo 6. 🌐 TEST FRONTEND (5173)...
curl -s -o nul -w "%%{http_code}" http://localhost:5173 2>nul && (
    echo ✅ Frontend accessible
) || (
    echo ❌ Frontend inaccessible
)

echo.
echo ========================================
echo 📊 RÉSUMÉ DOCKER :
echo.
docker ps --filter name=bygagoos --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 2>nul || echo Aucun conteneur ByGagoos
echo.
goto :END

:NO_DOCKER
echo.
echo ⚠️  MODE LOCAL SANS DOCKER
echo.
echo 🌐 TEST BACKEND LOCAL...
curl -s http://localhost:3001 2>nul && echo ✅ Backend local OK || echo ❌ Backend local KO

:END
echo.
echo ========================================
echo Si tout est OK :
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend:  http://localhost:3001/api/health
echo 👥 Famille:  http://localhost:3001/api/family/members
echo 🐳 Docker:   docker-compose ps
echo.
pause