Write-Host "🚀 Démarrage de ByGagoos-Ink..." -ForegroundColor Cyan

# Vérification Docker
Write-Host "`n1. Vérification Docker..." -ForegroundColor Yellow
docker version
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker n'est pas démarré" -ForegroundColor Red
    exit 1
}

# Nettoyage
Write-Host "`n2. Nettoyage des anciens conteneurs..." -ForegroundColor Yellow
docker-compose down

# Build
Write-Host "`n3. Construction des images..." -ForegroundColor Yellow
docker-compose build

# Démarrage
Write-Host "`n4. Démarrage des services..." -ForegroundColor Green
Write-Host "👉 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "👉 Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "`nAppuyez sur Ctrl+C pour arrêter`n" -ForegroundColor Yellow

docker-compose up