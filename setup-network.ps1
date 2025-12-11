#!/usr/bin/env powershell
# ============================================
# ByGagoos-Ink - Configuration Réseau XAMPP
# ============================================

param(
    [switch]$SetupVirtualHost = $false,
    [switch]$UpdateHosts = $false,
    [switch]$BuildFrontend = $false,
    [switch]$StartBackend = $false,
    [switch]$All = $false,
    [switch]$Help = $false
)

if ($Help) {
    Write-Host @"
ByGagoos-Ink Network Setup Script

Utilisation: .\setup-network.ps1 [Options]

Options:
  -SetupVirtualHost    Configure Apache Virtual Host
  -UpdateHosts         Met à jour fichier hosts
  -BuildFrontend       Compile frontend avec npm run build
  -StartBackend        Démarre serveur Node.js backend
  -All                 Exécute toutes les étapes
  -Help                Affiche cette aide

Exemples:
  .\setup-network.ps1 -All
  .\setup-network.ps1 -BuildFrontend -StartBackend
  .\setup-network.ps1 -SetupVirtualHost -UpdateHosts
"@
    exit
}

# ============================================
# Fonctions utilitaires
# ============================================

function Get-LocalIP {
    try {
        $interfaces = [System.Net.NetworkInformation.NetworkInterface]::GetAllNetworkInterfaces()
        $ipv4 = $interfaces | 
            Where-Object {$_.NetworkInterfaceType -eq "Ethernet" -or $_.NetworkInterfaceType -eq "Wireless80211"} | 
            ForEach-Object {$_.GetIPProperties().UnicastAddresses} | 
            Where-Object {$_.Address.AddressFamily -eq "InterNetwork" -and -not $_.Address.ToString().StartsWith("127")}
        
        return $ipv4[0].Address.ToString()
    }
    catch {
        return "192.168.1.100"
    }
}

function Test-AdminRights {
    $isAdmin = [bool]([Security.Principal.WindowsIdentity]::GetCurrent().Groups -match "S-1-5-32-544")
    if (-not $isAdmin) {
        Write-Host "❌ Erreur: Veuillez exécuter ce script en tant qu'administrateur" -ForegroundColor Red
        exit 1
    }
}

function Write-Section {
    param([string]$Title)
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  $Title" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
}

# ============================================
# Script principal
# ============================================

Write-Host ""
Write-Host "🚀 ByGagoos-Ink Network Setup" -ForegroundColor Green
Write-Host ""

Test-AdminRights

$localIP = Get-LocalIP
$xamppPath = "C:\xampp"
$htdocsPath = "$xamppPath\htdocs\bygagoos-ink"
$frontendPath = "D:\ByGagoos-Ink\frontend"
$backendPath = "D:\ByGagoos-Ink\backend"

Write-Host "📍 Adresse IP locale détectée : $localIP" -ForegroundColor Yellow
Write-Host ""

# Setup Virtual Host
if ($SetupVirtualHost -or $All) {
    Write-Section "Configuration Apache Virtual Host"
    
    $vhostsFile = "$xamppPath\apache\conf\extra\httpd-vhosts.conf"
    
    if (Test-Path $vhostsFile) {
        Write-Host "📄 Fichier trouvé: $vhostsFile"
        
        # Vérifier si déjà configuré
        $content = Get-Content $vhostsFile -Raw
        if ($content -match "bygagoos-ink") {
            Write-Host "⚠️  Virtual Host déjà configuré" -ForegroundColor Yellow
        } else {
            Write-Host "⏳ Ajout du Virtual Host..."
            
            $vhostConfig = @"

# ByGagoos-Ink Virtual Host
<VirtualHost *:80>
    ServerName bygagoos-ink.local
    ServerAlias bygagoos-ink
    DocumentRoot "$htdocsPath\public"
    
    <Directory "$htdocsPath\public">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        
        # SPA Routing
        <IfModule mod_rewrite.c>
            RewriteEngine On
            RewriteBase /
            RewriteRule ^index\.html$ - [L]
            RewriteCond %{REQUEST_FILENAME} !-f
            RewriteCond %{REQUEST_FILENAME} !-d
            RewriteRule . /index.html [L]
        </IfModule>
    </Directory>

    # Proxy API to Node.js
    <IfModule mod_proxy.c>
        ProxyPreserveHost On
        ProxyPass /api http://localhost:3001/api
        ProxyPassReverse /api http://localhost:3001/api
    </IfModule>

    ErrorLog "logs/bygagoos-ink-error.log"
    CustomLog "logs/bygagoos-ink-access.log" combined
</VirtualHost>
"@
            
            Add-Content $vhostsFile $vhostConfig
            Write-Host "✅ Virtual Host configuré" -ForegroundColor Green
        }
    } else {
        Write-Host "❌ Fichier httpd-vhosts.conf non trouvé" -ForegroundColor Red
    }
}

# Update Hosts file
if ($UpdateHosts -or $All) {
    Write-Section "Mise à jour du fichier hosts"
    
    $hostsFile = "C:\Windows\System32\drivers\etc\hosts"
    
    Write-Host "📄 Fichier: $hostsFile"
    Write-Host "⏳ Vérification des entrées..."
    
    $content = Get-Content $hostsFile -Raw
    $newEntries = @"

# ByGagoos-Ink
127.0.0.1       bygagoos-ink.local
$localIP         bygagoos-ink.local
"@
    
    if ($content -match "bygagoos-ink") {
        Write-Host "⚠️  Entrée hosts déjà présente" -ForegroundColor Yellow
    } else {
        Write-Host "⏳ Ajout des entrées hosts..."
        Add-Content $hostsFile $newEntries
        Write-Host "✅ Fichier hosts mis à jour" -ForegroundColor Green
    }
}

# Build Frontend
if ($BuildFrontend -or $All) {
    Write-Section "Compilation du frontend"
    
    if (Test-Path $frontendPath) {
        Set-Location $frontendPath
        
        Write-Host "📦 Installation des dépendances..."
        if (-not (Test-Path "node_modules")) {
            npm install --silent
        }
        
        Write-Host "🔨 Build en cours..."
        npm run build
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Frontend compilé" -ForegroundColor Green
            
            Write-Host "⏳ Copie vers XAMPP..."
            if (-not (Test-Path "$htdocsPath\public")) {
                New-Item -ItemType Directory -Path "$htdocsPath\public" -Force | Out-Null
            }
            Copy-Item "dist\*" "$htdocsPath\public" -Recurse -Force
            Write-Host "✅ Fichiers copiés vers XAMPP" -ForegroundColor Green
        } else {
            Write-Host "❌ Erreur lors du build" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ Dossier frontend non trouvé" -ForegroundColor Red
    }
}

# Start Backend
if ($StartBackend -or $All) {
    Write-Section "Démarrage du backend"
    
    if (Test-Path $backendPath) {
        Write-Host "📦 Vérification des dépendances..."
        if (-not (Test-Path "$backendPath\node_modules")) {
            Set-Location $backendPath
            npm install --silent
        }
        
        Write-Host "✅ Démarrage du serveur Node.js..." -ForegroundColor Green
        Write-Host "⏳ Nouvelle fenêtre va s'ouvrir..."
        
        Start-Process -FilePath "cmd.exe" -ArgumentList "/k cd /d `"$backendPath`" && node server.js" `
                     -WindowStyle Normal -PassThru | Out-Null
        
        Write-Host "✅ Serveur backend démarré (Port 3001)" -ForegroundColor Green
    } else {
        Write-Host "❌ Dossier backend non trouvé" -ForegroundColor Red
    }
}

# Final Status
Write-Section "Configuration terminée"

Write-Host "🌐 Accédez à votre application :" -ForegroundColor Green
Write-Host "   http://bygagoos-ink.local" -ForegroundColor Yellow
Write-Host "   http://$localIP" -ForegroundColor Yellow
Write-Host ""
Write-Host "📊 API Backend : http://localhost:3001/api/health" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔐 Identifiants :" -ForegroundColor Green
Write-Host "   Email    : tovoniaina.rahendrison@gmail.com" -ForegroundColor White
Write-Host "   Password : ByGagoos2025!" -ForegroundColor White
Write-Host ""
Write-Host "✨ Configuration complétée!" -ForegroundColor Green
Write-Host ""
