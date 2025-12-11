# Script d'installation du service NSSM pour ByGagoos-Backend
# Doit être exécuté en tant qu'administrateur

# Vérifier si on est admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

if (-not $isAdmin) {
    Write-Host "❌ Ce script doit être exécuté en tant qu'administrateur!" -ForegroundColor Red
    Write-Host "Relancez PowerShell en tant qu'administrateur et réessayez." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Green
Write-Host "Installation du service ByGagoos-Backend" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""

# Chemins
$nssm = "C:\nssm\win64\nssm.exe"
$nodePath = "C:\Program Files\nodejs\node.exe"
$serverScript = "D:\ByGagoos-Ink\backend\server.js"

# Vérifier que NSSM existe
if (-not (Test-Path $nssm)) {
    Write-Host "❌ NSSM n'est pas trouvé à: $nssm" -ForegroundColor Red
    exit 1
}

Write-Host "✅ NSSM trouvé" -ForegroundColor Green
Write-Host "✅ Node.js trouvé" -ForegroundColor Green
Write-Host ""

# Installer le service
Write-Host "Installation du service..." -ForegroundColor Yellow
& $nssm install ByGagoos-Backend $nodePath $serverScript

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Service installé avec succès!" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur lors de l'installation du service" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Démarrage du service..." -ForegroundColor Yellow
& $nssm start ByGagoos-Backend

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Service démarré avec succès!" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur lors du démarrage du service" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Vérification du statut..." -ForegroundColor Yellow
$serviceStatus = Get-Service -Name "ByGagoos-Backend" -ErrorAction SilentlyContinue

if ($serviceStatus) {
    Write-Host "✅ Statut du service: $($serviceStatus.Status)" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Installation complétée!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Le backend sera maintenant démarré automatiquement au boot Windows." -ForegroundColor Cyan
    Write-Host "Vous pouvez gérer le service avec:" -ForegroundColor Cyan
    Write-Host "  - Services Windows (services.msc)" -ForegroundColor Gray
    Write-Host "  - Ou: C:\nssm\win64\nssm.exe remove ByGagoos-Backend (pour désinstaller)" -ForegroundColor Gray
} else {
    Write-Host "⚠️ Service introuvable dans Windows Services" -ForegroundColor Yellow
}

Write-Host ""
pause
