@echo off
echo ============================================
echo BYGAGOOS-INK - DÉMARRAGE DOCKER
echo ============================================
echo.

echo 1. Vérification de Docker...
docker --version
if %errorlevel% neq 0 (
    echo ❌ Docker n'est pas installé ou non lancé
    echo Veuillez lancer Docker Desktop manuellement
    pause
    exit /b 1
)

echo 2. Arrêt des anciens conteneurs...
docker-compose down

echo 3. Construction et démarrage des conteneurs...
docker-compose up -d --build

echo 4. Attente du démarrage...
timeout /t 10 /nobreak

echo 5. Vérification des conteneurs...
docker-compose ps

echo 6. Test de l'API...
curl http://localhost:3001/api/health

echo.
echo ============================================
echo ✅ DOCKER DÉMARRÉ AVEC SUCCÈS
echo ============================================
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:3001
echo Credentials are NOT stored in repository. Configure them via environment variables or secrets manager.
echo ============================================
pause