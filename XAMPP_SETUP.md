# 🚀 ByGagoos-Ink - Setup XAMPP Local

Guide complet pour déployer ByGagoos-Ink sur XAMPP local.

## 📋 Prérequis

- XAMPP installé (version 8.0 ou supérieure)
- Node.js 18+ installé
- npm 9+ installé
- PostgreSQL pour XAMPP ou MySQL

## 🏗️ Architecture

```
XAMPP (http://localhost)
├── Frontend (SPA - Build Vite) → htdocs/bygagoos-ink/
├── Backend API (Node.js) → localhost:3001
└── Database (PostgreSQL/MySQL) → localhost:5432 ou 3306
```

## 📦 Étape 1 : Configuration XAMPP

### 1.1 Configurer Apache

Éditer `C:\xampp\apache\conf\extra\httpd-vhosts.conf` et ajouter :

```apache
# ByGagoos-Ink Frontend
<VirtualHost *:80>
    ServerName bygagoos-ink.local
    ServerAlias localhost
    DocumentRoot "C:/xampp/htdocs/bygagoos-ink"
    
    <Directory "C:/xampp/htdocs/bygagoos-ink">
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Require all granted
        
        # Réécriture pour SPA React
        <IfModule mod_rewrite.c>
            RewriteEngine On
            RewriteBase /
            RewriteRule ^index\.html$ - [L]
            RewriteCond %{REQUEST_FILENAME} !-f
            RewriteCond %{REQUEST_FILENAME} !-d
            RewriteRule . /index.html [L]
        </IfModule>
    </Directory>
    
    # Proxy vers l'API Node.js
    <IfModule mod_proxy.c>
        ProxyRequests Off
        ProxyPreserveHost On
        
        ProxyPass /api http://localhost:3001/api
        ProxyPassReverse /api http://localhost:3001/api
    </IfModule>
    
    ErrorLog "logs/bygagoos-ink-error.log"
    CustomLog "logs/bygagoos-ink-access.log" combined
</VirtualHost>
```

### 1.2 Configurer hosts local

Éditer `C:\Windows\System32\drivers\etc\hosts` et ajouter :

```
127.0.0.1   bygagoos-ink.local
127.0.0.1   localhost
```

### 1.3 Activer mod_rewrite

1. Éditer `C:\xampp\apache\conf\httpd.conf`
2. Décommenter : `LoadModule rewrite_module modules/mod_rewrite.so`
3. Décommenter : `LoadModule proxy_module modules/mod_proxy.so`
4. Décommenter : `LoadModule proxy_http_module modules/mod_proxy_http.so`

### 1.4 Démarrer XAMPP

```bash
# Windows CMD
cd C:\xampp
xampp-control.exe

# Ou en ligne de commande
apache_start.bat
mysql_start.bat
```

## 💾 Étape 2 : Configuration Base de Données

### Option A : PostgreSQL

```bash
# Créer la base de données
createdb -U postgres bygagoos_ink

# Ou via psql
psql -U postgres
CREATE DATABASE bygagoos_ink;
CREATE USER bygagoos_app WITH PASSWORD 'ByGagoosApp2025!';
GRANT ALL PRIVILEGES ON DATABASE bygagoos_ink TO bygagoos_app;
```

### Option B : MySQL (intégré à XAMPP)

```sql
-- phpMyAdmin ou MySQL CLI
CREATE DATABASE bygagoos_ink;
CREATE USER 'bygagoos_app'@'localhost' IDENTIFIED BY 'ByGagoosApp2025!';
GRANT ALL PRIVILEGES ON bygagoos_ink.* TO 'bygagoos_app'@'localhost';
FLUSH PRIVILEGES;
```

## 🔧 Étape 3 : Installation et Build

### 3.1 Backend

```bash
cd d:\ByGagoos-Ink\backend

# Copier .env.example vers .env
copy .env.example .env

# Éditer .env avec les bonnes valeurs
# NODE_ENV=production
# PORT=3001
# FRONTEND_URL=http://bygagoos-ink.local
# DATABASE_URL=postgresql://bygagoos_app:ByGagoosApp2025!@localhost:5432/bygagoos_ink

# Installer dépendances
npm install

# Générer Prisma Client
npx prisma generate

# Migrer la base de données
npx prisma migrate deploy

# Seeder la base
npm run prisma:seed

# Démarrer le backend
npm start
```

### 3.2 Frontend

```bash
cd d:\ByGagoos-Ink\frontend

# Installer dépendances
npm install

# Build production
npm run build

# Copier le dist dans xampp/htdocs
# Windows PowerShell
Copy-Item -Path "dist\*" -Destination "C:\xampp\htdocs\bygagoos-ink\" -Recurse -Force

# Linux/Mac/Git Bash
cp -r dist/* /c/xampp/htdocs/bygagoos-ink/
```

## 🌐 Étape 4 : Configuration Frontend pour XAMPP

Éditer `frontend/vite.config.js` :

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
})
```

Éditer `frontend/src/context/AuthContext.jsx` :

```javascript
// Pour production XAMPP
const api = axios.create({
  baseURL: window.location.origin === 'http://bygagoos-ink.local' 
    ? 'http://localhost:3001'
    : 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## 📁 Étape 5 : Structure des répertoires

```
C:\xampp\htdocs\bygagoos-ink\
├── index.html
├── assets/
├── dist/
└── [fichiers statiques du build frontend]

C:\ByGagoos-Ink\backend\ [serveur API Node.js]
```

## 🚀 Étape 6 : Démarrage du projet

### Terminal 1 : Backend API
```bash
cd d:\ByGagoos-Ink\backend
npm start
# Server running on http://localhost:3001
```

### Terminal 2 : XAMPP
```bash
# Démarrer Apache et MySQL depuis XAMPP Control Panel
# OU en ligne de commande
cd C:\xampp
apache_start.bat
mysql_start.bat
```

### Accéder au projet
```
http://bygagoos-ink.local
ou
http://localhost/bygagoos-ink/
```

## 🔒 Sécurité Production

Avant le déploiement production:

```bash
# 1. Générer des secrets JWT sécurisés
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# 2. Configurer .env.production
# NODE_ENV=production
# PORT=3001
# FRONTEND_URL=https://votre-domaine.com

# 3. Build minifié
npm run build

# 4. Ajouter HTTPS avec certbot
```

## 🐛 Troubleshooting

### Port 3001 déjà utilisé
```bash
# Trouver le processus
netstat -ano | findstr :3001

# Changer le port dans .env et vite.config.js
```

### CORS errors
Vérifier `FRONTEND_URL` dans `.env` du backend

### Erreur authentification BD
```bash
# Vérifier la connexion
psql -U bygagoos_app -d bygagoos_ink
# Entrer mot de passe: ByGagoosApp2025!
```

### Frontend ne se charge pas
```bash
# Vérifier le build
npm run build

# Vérifier les permissions du dossier xampp/htdocs/bygagoos-ink
# Vérifier la configuration VirtualHost
```

## 📊 Vérification finale

```bash
# 1. Tester API
curl http://localhost:3001/api/health

# 2. Vérifier la base de données
psql -U bygagoos_app -d bygagoos_ink -c "SELECT COUNT(*) FROM users;"

# 3. Accéder au frontend
http://bygagoos-ink.local

# 4. Tester connexion
Email: tovoniaina.rahendrison@gmail.com
Password: ByGagoos2025!
```

## 📝 Notes importantes

- Toujours utiliser des HTTPS en production
- Changer les mots de passe par défaut
- Configurer les variables d'environnement sécurisées
- Mettre en place des backups réguliers
- Activer les logs et monitoring

---

✅ Projet prêt pour XAMPP local !
