Write-Host "🚀 Démarrage simple de ByGagoos-Ink" -ForegroundColor Cyan

# Arrêter les conteneurs existants
docker stop bygagoos-backend bygagoos-frontend 2>$null
docker rm bygagoos-backend bygagoos-frontend 2>$null

# Backend
Write-Host "`n🔨 Construction du backend..." -ForegroundColor Yellow
cd backend
docker build -t bygagoos-backend .
docker run -d -p 5000:5000 --name bygagoos-backend bygagoos-backend
cd ..

# Frontend
Write-Host "🔨 Construction du frontend..." -ForegroundColor Yellow
cd frontend
docker build -t bygagoos-frontend .
docker run -d -p 3000:3000 --name bygagoos-frontend bygagoos-frontend
cd ..

Write-Host "`n✅ Services démarrés !" -ForegroundColor Green
Write-Host "👉 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "👉 Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "`nVérifiez avec: docker ps" -ForegroundColor Yellow