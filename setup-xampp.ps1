# ============================================
# ByGagoos-Ink XAMPP Setup Script (PowerShell)
# ============================================

param(
    [switch]$SkipBuild = $false,
    [switch]$SkipCopy = $false,
    [switch]$Help = $false
)

if ($Help) {
    Write-Host @"
ByGagoos-Ink XAMPP Setup Script

Utilisation: .\setup-xampp.ps1 [Options]

Options:
  -SkipBuild    Ignore le build du frontend
  -SkipCopy     Ignore la copie vers XAMPP
  -Help         Affiche cette aide

Exemples:
  .\setup-xampp.ps1
  .\setup-xampp.ps1 -SkipBuild
  .\setup-xampp.ps1 -SkipBuild -SkipCopy
"@
    exit
}

# Check admin rights
$isAdmin = [bool]([Security.Principal.WindowsIdentity]::GetCurrent().Groups -match "S-1-5-32-544")
if (-not $isAdmin) {
    Write-Host "❌ Erreur: Veuillez exécuter ce script en tant qu'administrateur" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

# Define paths
$XAMPP_PATH = "C:\xampp"
$HTDOCS_PATH = "$XAMPP_PATH\htdocs\bygagoos-ink"
$BACKEND_PATH = "d:\ByGagoos-Ink\backend"
$FRONTEND_PATH = "d:\ByGagoos-Ink\frontend"
$CONFIG_PATH = "d:\ByGagoos-Ink\config"

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "    ByGagoos-Ink XAMPP Setup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "✅ Chemins définis:" -ForegroundColor Green
Write-Host "   - XAMPP: $XAMPP_PATH"
Write-Host "   - Frontend dist: $HTDOCS_PATH"
Write-Host "   - Backend: $BACKEND_PATH"
Write-Host ""

# Step 1: Create directories
Write-Host "📁 Étape 1: Création des répertoires..." -ForegroundColor Yellow
if (-not (Test-Path $HTDOCS_PATH)) {
    New-Item -ItemType Directory -Path $HTDOCS_PATH -Force | Out-Null
    Write-Host "✅ Répertoires créés" -ForegroundColor Green
} else {
    Write-Host "✅ Répertoires existent déjà" -ForegroundColor Green
}
Write-Host ""

# Step 2: Build frontend
if (-not $SkipBuild) {
    Write-Host "🏗️  Étape 2: Build du frontend..." -ForegroundColor Yellow
    Push-Location $FRONTEND_PATH
    
    if (-not (Test-Path "node_modules")) {
        Write-Host "📦 Installation des dépendances..." -ForegroundColor Blue
        npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Erreur lors de npm install" -ForegroundColor Red
            Read-Host "Appuyez sur Entrée pour quitter"
            exit 1
        }
    }
    
    Write-Host "🔨 Build en cours..." -ForegroundColor Blue
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erreur lors du build" -ForegroundColor Red
        Read-Host "Appuyez sur Entrée pour quitter"
        exit 1
    }
    Write-Host "✅ Build complété" -ForegroundColor Green
    Pop-Location
    Write-Host ""
}

# Step 3: Copy frontend to htdocs
if (-not $SkipCopy) {
    Write-Host "📋 Étape 3: Copie du frontend vers XAMPP..." -ForegroundColor Yellow
    
    if (Test-Path $HTDOCS_PATH) {
        Write-Host "🗑️  Nettoyage du répertoire existant..." -ForegroundColor Blue
        Remove-Item "$HTDOCS_PATH\*" -Recurse -Force -ErrorAction SilentlyContinue
    }
    
    Write-Host "📦 Copie des fichiers..." -ForegroundColor Blue
    Copy-Item -Path "$FRONTEND_PATH\dist\*" -Destination $HTDOCS_PATH -Recurse -Force
    Write-Host "✅ Frontend copié avec succès" -ForegroundColor Green
    Write-Host ""
}

# Step 4: Setup backend
Write-Host "🔧 Étape 4: Configuration du backend..." -ForegroundColor Yellow
Push-Location $BACKEND_PATH

if (-not (Test-Path ".env.production")) {
    Write-Host "📝 Création du fichier .env.production..." -ForegroundColor Blue
    Copy-Item -Path "$CONFIG_PATH\.env.production" -Destination ".env.production" -Force
    Write-Host "✅ .env.production créé" -ForegroundColor Green
    Write-Host "⚠️  N'oubliez pas de configurer les variables sensibles!" -ForegroundColor Yellow
} else {
    Write-Host "✅ .env.production existe déjà" -ForegroundColor Green
}

if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installation des dépendances backend..." -ForegroundColor Blue
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erreur lors de npm install" -ForegroundColor Red
        Pop-Location
        Read-Host "Appuyez sur Entrée pour quitter"
        exit 1
    }
}
Pop-Location
Write-Host ""

# Step 5: Configure hosts file
Write-Host "🔗 Étape 5: Configuration du fichier hosts..." -ForegroundColor Yellow
$HOSTS_FILE = "C:\Windows\System32\drivers\etc\hosts"
$HOST_ENTRY = "127.0.0.1   bygagoos-ink.local"

$hostsContent = Get-Content $HOSTS_FILE
if ($hostsContent -notlike "*bygagoos-ink.local*") {
    Add-Content -Path $HOSTS_FILE -Value "`n$HOST_ENTRY"
    Write-Host "✅ Entrée ajoutée au fichier hosts" -ForegroundColor Green
} else {
    Write-Host "✅ Entrée déjà présente dans hosts" -ForegroundColor Green
}
Write-Host ""

# Step 6: Summary
Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "    ✅ Setup terminé!" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📌 Prochaines étapes:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  Configuration manuelle Apache:" -ForegroundColor White
Write-Host "    - Éditer: $XAMPP_PATH\apache\conf\extra\httpd-vhosts.conf" -ForegroundColor Gray
Write-Host "    - Ajouter la configuration VirtualHost" -ForegroundColor Gray
Write-Host "    - Source: $CONFIG_PATH\apache-vhosts.conf" -ForegroundColor Gray
Write-Host ""

Write-Host "2️⃣  Démarrer XAMPP:" -ForegroundColor White
Write-Host "    - Apache: XAMPP Control Panel" -ForegroundColor Gray
Write-Host "    - MySQL/PostgreSQL: XAMPP Control Panel" -ForegroundColor Gray
Write-Host ""

Write-Host "3️⃣  Démarrer le backend Node.js:" -ForegroundColor White
Write-Host "    - Terminal: cd $BACKEND_PATH; npm start" -ForegroundColor Gray
Write-Host ""

Write-Host "4️⃣  Accéder à l'application:" -ForegroundColor White
Write-Host "    - http://bygagoos-ink.local" -ForegroundColor Gray
Write-Host "    - http://localhost/bygagoos-ink/" -ForegroundColor Gray
Write-Host ""

Write-Host "📖 Documentation: d:\ByGagoos-Ink\XAMPP_SETUP.md" -ForegroundColor Gray
Write-Host ""

Write-Host "Appuyez sur Entrée pour terminer..." -ForegroundColor Gray
Read-Host
