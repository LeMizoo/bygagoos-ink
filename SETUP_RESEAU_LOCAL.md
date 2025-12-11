# 🌐 ByGagoos-Ink - Configuration Réseau Local (XAMPP)

Guide complet pour accéder à votre application ByGagoos-Ink depuis n'importe quel appareil de votre réseau local via XAMPP.

---

## 📋 Prérequis

- ✅ XAMPP installé (Apache + MySQL)
- ✅ Node.js 14+ installé
- ✅ npm 6+ installé
- ✅ Port 80 (Apache) et 3001 (Node) disponibles
- ✅ Réseau local WiFi ou Ethernet

---

## 🚀 Étape 1 : Installation XAMPP

### 1.1 Télécharger XAMPP
```
https://www.apachefriends.org/download.html
→ Télécharger version Windows
```

### 1.2 Installer XAMPP
```
Dossier d'installation : C:\xampp
Cocher : Apache, MySQL, PHP
```

### 1.3 Démarrer les services
```
1. Ouvrir "XAMPP Control Panel"
2. Cliquer "Start" sur Apache
3. Cliquer "Start" sur MySQL
4. Vérifier : Apache et MySQL en vert
```

---

## 🛠️ Étape 2 : Configurer votre IP locale

### 2.1 Trouver votre adresse IP

#### Windows (PowerShell)
```powershell
# Ouvrir PowerShell
ipconfig

# Chercher : IPv4 Address
# Exemple: 192.168.1.100
```

#### Windows (Command Prompt)
```cmd
ipconfig
# Chercher : IPv4 Address (Ethernet ou WiFi)
```

### 2.2 Verifier connexion réseau
```powershell
# Test ping
ping 192.168.1.100

# Doit retourner : Reply from 192.168.1.100: bytes=32 time=<1ms TTL=128
```

---

## 📁 Étape 3 : Configurer XAMPP

### 3.1 Créer dossier projet dans htdocs
```powershell
# Créer dossier
mkdir "C:\xampp\htdocs\bygagoos-ink"

# Copier votre projet
Copy-Item -Path "D:\ByGagoos-Ink\frontend\dist" `
          -Destination "C:\xampp\htdocs\bygagoos-ink\public" `
          -Recurse -Force
```

### 3.2 Configurer Apache Virtual Host

**Fichier** : `C:\xampp\apache\conf\extra\httpd-vhosts.conf`

Ajouter à la fin :
```apache
# ByGagoos-Ink Virtual Host
<VirtualHost *:80>
    ServerName bygagoos-ink.local
    ServerAlias bygagoos-ink
    DocumentRoot "C:\xampp\htdocs\bygagoos-ink\public"
    
    <Directory "C:\xampp\htdocs\bygagoos-ink\public">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        
        # Redirect URLs to index.html for SPA routing
        <IfModule mod_rewrite.c>
            RewriteEngine On
            RewriteBase /
            RewriteRule ^index\.html$ - [L]
            RewriteCond %{REQUEST_FILENAME} !-f
            RewriteCond %{REQUEST_FILENAME} !-d
            RewriteRule . /index.html [L]
        </IfModule>
    </Directory>

    # Proxy API requests to Node.js backend
    <IfModule mod_proxy.c>
        ProxyPreserveHost On
        ProxyPass /api http://localhost:3001/api
        ProxyPassReverse /api http://localhost:3001/api
    </IfModule>

    ErrorLog "logs/bygagoos-ink-error.log"
    CustomLog "logs/bygagoos-ink-access.log" combined
</VirtualHost>
```

### 3.3 Configurer hosts du système

**Fichier** : `C:\Windows\System32\drivers\etc\hosts`

Ajouter à la fin (ouvrir en tant qu'administrateur) :
```
127.0.0.1       localhost
127.0.0.1       bygagoos-ink.local

# Réseau local (remplacer 192.168.1.100 par VOTRE IP)
192.168.1.100   bygagoos-ink.local
192.168.1.100   bygagoos-ink
```

### 3.4 Valider configuration Apache
```powershell
# Ouvrir PowerShell en tant qu'administrateur
cd "C:\xampp\apache\bin"
httpd -t

# Doit afficher : Syntax OK
```

### 3.5 Redémarrer Apache
```
1. XAMPP Control Panel
2. Cliquer "Stop" sur Apache
3. Attendre 2 secondes
4. Cliquer "Start" sur Apache
5. Vérifier : Apache en vert ✅
```

---

## 💻 Étape 4 : Démarrer l'application

### 4.1 Build du frontend
```powershell
cd D:\ByGagoos-Ink\frontend

# Installer dépendances (si première fois)
npm install

# Compiler pour production
npm run build

# Copier dist vers XAMPP
Copy-Item -Path ".\dist\*" `
          -Destination "C:\xampp\htdocs\bygagoos-ink\public" `
          -Recurse -Force
```

### 4.2 Démarrer le backend Node.js
```powershell
cd D:\ByGagoos-Ink\backend

# Installer dépendances (si première fois)
npm install

# Démarrer serveur
node server.js

# Doit afficher :
# ✅ Serveur écoute sur port 3001
# ✅ API Health: OK
```

### 4.3 Vérifier services
```powershell
# Vérifier Apache
Start-Process "http://localhost"

# Vérifier Node API
Start-Process "http://localhost:3001/api/health"

# Vérifier application
Start-Process "http://bygagoos-ink.local"
```

---

## 🌍 Accès depuis autres appareils

### 4.4 Accéder depuis autre ordinateur sur le réseau

**Option 1 : Utiliser hostname (recommandé)**
```
http://bygagoos-ink.local
```

**Option 2 : Utiliser IP directe**
```
http://192.168.1.100
# Remplacer 192.168.1.100 par VOTRE IP
```

**Option 3 : Accès depuis mobile (WiFi)**
```
http://192.168.1.100
# Sur téléphone/tablette connecté au même WiFi
```

---

## 🔐 Identifiants de connexion

```
Email    : tovoniaina.rahendrison@gmail.com
Password : ByGagoos2025!

OU

Email    : dedettenadia@gmail.com
Password : ByGagoos2025!

OU toute autre des 4 utilisateurs pré-configurés
```

---

## 📊 Architecture du déploiement

```
┌─────────────────────────────────────────────────────┐
│                    Réseau Local                      │
│  (192.168.1.0/24 - WiFi ou Ethernet)               │
└──────────────────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    ┌───────┐       ┌────────┐      ┌─────────┐
    │ PC    │       │ Mobile │      │ Tablette│
    │192.168│       │192.168 │      │192.168  │
    │1.101  │       │1.102   │      │1.103    │
    └───────┘       └────────┘      └─────────┘
        │                │                │
        └────────────────┼────────────────┘
                         │ (Requêtes HTTP)
        ┌────────────────┼────────────────┐
        │                                  │
    ┌──────────────────────────────┐   ┌────────────┐
    │ XAMPP + Apache               │   │ Node.js    │
    │ (Port 80)                    │   │ (Port 3001)│
    │ - Frontend React (Vite)      │   │ - API REST │
    │ - Static Files               │   │ - JWT Auth │
    │ - Virtual Host config        │   │ - Database │
    │ - Proxy to API (/api)        │   │ - Business │
    │                              │   │   Logic    │
    └──────────────────────────────┘   └────────────┘
```

---

## 🔧 Dépannage

### ❌ "ERR_NAME_NOT_RESOLVED" (bygagoos-ink.local introuvable)

**Solution** :
1. Vérifier fichier `C:\Windows\System32\drivers\etc\hosts`
2. Redémarrer navigateur (F5 ou Ctrl+Shift+Delete cache)
3. Sur Windows, redémarrer le DNS :
```powershell
ipconfig /flushdns
```

### ❌ "CORS error" ou "Cannot POST /api"

**Solution** :
1. Vérifier que Node.js backend est démarré
```powershell
netstat -ano | findstr :3001
# Doit retourner une ligne avec PID
```

2. Vérifier configuration CORS dans `backend/server.js`
3. Vérifier proxy Apache dans `httpd-vhosts.conf`

### ❌ Apache ne démarre pas (Port 80 occupé)

**Solution** :
```powershell
# Trouver processus sur port 80
netstat -ano | findstr :80

# Arrêter processus (remplacer PID)
taskkill /PID 4532 /F

# Ou changer port Apache dans httpd.conf
Listen 8080  # Nouvelle ligne
```

### ❌ "403 Forbidden" en accédant à l'application

**Solution** :
1. Vérifier permissions dossier `C:\xampp\htdocs\bygagoos-ink`
2. Vérifier que `dist` existe après `npm run build`
3. Vérifier configuration `<Directory>` dans `httpd-vhosts.conf`

### ❌ Connexion refusée depuis autre appareil

**Solution** :
1. Vérifier IP correcte avec `ipconfig`
2. Vérifier firewall Windows (port 80 et 3001)
```powershell
# Ouvrir PowerShell administrateur
New-NetFirewallRule -DisplayName "Apache XAMPP" `
                   -Direction Inbound `
                   -Action Allow `
                   -Protocol TCP `
                   -LocalPort 80

New-NetFirewallRule -DisplayName "Node.js Backend" `
                   -Direction Inbound `
                   -Action Allow `
                   -Protocol TCP `
                   -LocalPort 3001
```

3. Vérifier que PC est bien sur même réseau local
4. Tester ping depuis autre appareil
```
ping 192.168.1.100
```

---

## ✅ Checklist de vérification

- [ ] XAMPP installé et Apache/MySQL verts
- [ ] IP locale identifiée (ipconfig)
- [ ] `httpd-vhosts.conf` configuré
- [ ] `C:\Windows\System32\drivers\etc\hosts` mis à jour
- [ ] Apache redémarré après changements
- [ ] Frontend buildé (`npm run build`)
- [ ] Dossier `dist` copié dans `C:\xampp\htdocs\bygagoos-ink\public`
- [ ] Backend Node.js démarré (port 3001)
- [ ] Apache accessible sur `http://localhost` (PC)
- [ ] Application accessible sur `http://bygagoos-ink.local` (PC)
- [ ] Application accessible sur `http://192.168.1.100` (autre appareil)
- [ ] API accessible sur `http://192.168.1.100:3001/api/health`
- [ ] Login fonctionne avec credentiels
- [ ] Commandes se créent et s'affichent

---

## 🎯 URLs de référence

| Accès | URL | Utilisable depuis |
|-------|-----|-----------------|
| **Hostname** | `http://bygagoos-ink.local` | PC + Réseau |
| **IP directe** | `http://192.168.1.100` | PC + Réseau |
| **Localhost** | `http://localhost` | PC uniquement |
| **API** | `http://192.168.1.100:3001/api` | PC + Réseau |
| **Health** | `http://192.168.1.100:3001/api/health` | PC + Réseau |

---

## 🚀 Scripts automatisés (Optionnel)

### Script batch pour démarrer tout
**Fichier** : `start-xampp-full.bat`
```batch
@echo off
REM Démarrer XAMPP Control Panel
start C:\xampp\xampp-control.exe

REM Attendre 5 secondes
timeout /t 5

REM Ouvrir navigateur
start http://bygagoos-ink.local

REM Démarrer backend
start cmd /k "cd D:\ByGagoos-Ink\backend && node server.js"

echo ByGagoos-Ink est en cours de démarrage...
echo Accédez à : http://bygagoos-ink.local
```

---

## 📞 Support

**Si vous rencontrez des problèmes** :
1. Vérifier tous les ports (80, 3001) avec `netstat -ano`
2. Consulter logs Apache : `C:\xampp\apache\logs\error.log`
3. Consulter logs Node.js : Output console du terminal
4. Vérifier connexion réseau : `ping 192.168.1.100`

---

**Configuration complétée** ✅  
Votre application est maintenant accessible sur tout votre réseau local !

Accédez-y via : **http://bygagoos-ink.local** ou **http://192.168.1.100**
