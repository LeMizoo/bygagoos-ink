# 🔧 ByGagoos-Ink XAMPP - Guide de Troubleshooting

## ❌ Problèmes Courants et Solutions

### 1. Port 3001 déjà utilisé

**Symptômes:**
```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solutions:**

#### Option A: Trouver et terminer le processus
```powershell
# Windows PowerShell
Get-NetTCPConnection -LocalPort 3001 | Select-Object -Property State, OwningProcess
# Trouver le PID et le terminer
Stop-Process -Id <PID> -Force

# Windows CMD
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

#### Option B: Changer le port
```bash
# Dans backend/.env
PORT=3002

# Dans frontend/vite.config.js ou AuthContext.jsx
baseURL: 'http://localhost:3002'

# Dans apache-vhosts.conf
ProxyPass /api http://localhost:3002/api
```

---

### 2. CORS Errors

**Symptômes:**
```
Access to XMLHttpRequest at 'http://localhost:3001/api/...' 
has been blocked by CORS policy
```

**Causes:**
- `FRONTEND_URL` incorrect dans `.env`
- Headers CORS mal configurés

**Solutions:**

```bash
# Backend/.env
FRONTEND_URL=http://bygagoos-ink.local
# OU
FRONTEND_URL=http://localhost:80

# Backend/app.js - Vérifier la configuration CORS
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

### 3. Base de Données - Erreur de Connexion

**Symptômes:**
```
Error: getaddrinfo ENOTFOUND localhost
Database connection failed
```

**Solutions:**

#### Vérifier la connexion PostgreSQL:
```bash
# Tester la connexion
psql -U bygagoos_app -d bygagoos_ink -c "SELECT 1"

# Si pas trouvé, chercher les erreurs:
psql -U bygagoos_app -d bygagoos_ink

# Réinitialiser la base si nécessaire
dropdb -U postgres bygagoos_ink
createdb -U postgres bygagoos_ink
```

#### Vérifier la connexion MySQL (XAMPP):
```bash
# Test de connexion
mysql -u bygagoos_app -p -h localhost
# Mot de passe: ByGagoosApp2025!

# Ou via phpMyAdmin: http://localhost/phpmyadmin
```

#### Vérifier DATABASE_URL dans `.env`:
```bash
# PostgreSQL format:
DATABASE_URL="postgresql://user:password@localhost:5432/database"

# MySQL format:
DATABASE_URL="mysql://user:password@localhost:3306/database"

# SQLite format:
DATABASE_URL="file:./dev.db"
```

---

### 4. Frontend ne se charge pas

**Symptômes:**
- Page blanche
- 404 Not Found
- Erreur dans la console du navigateur

**Solutions:**

#### Vérifier le build:
```bash
cd frontend
npm run build

# Vérifier le dossier dist/
ls dist/
```

#### Vérifier la configuration Apache:
```bash
# Vérifier la syntaxe
C:\xampp\apache\bin\httpd -t

# Si OK: "Syntax OK"
# Si erreur: corriger la configuration httpd-vhosts.conf
```

#### Vérifier les permissions:
```bash
# Windows: Donner les permissions au dossier
# Clic droit > Propriétés > Sécurité > Modifier

# Assurez-vous que:
# - SYSTEM: Contrôle total
# - Administrateurs: Contrôle total
# - IIS AppPool\Apache: Modifier
```

#### Vérifier mod_rewrite:
```bash
# Éditer C:\xampp\apache\conf\httpd.conf
# S'assurer que ces lignes sont décommentées:

LoadModule rewrite_module modules/mod_rewrite.so
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

---

### 5. Authentification échoue

**Symptômes:**
```
"Invalid credentials"
"User not found"
```

**Solutions:**

#### Vérifier que les utilisateurs existent:
```bash
# Backend
npm run prisma:studio

# Ou via psql
psql -U bygagoos_app -d bygagoos_ink
SELECT email, role FROM users;
```

#### Réseeder la base de données:
```bash
cd backend
npm run prisma:seed
```

#### Vérifier les identifiants par défaut:
```
Email: tovoniaina.rahendrison@gmail.com
Mot de passe: ByGagoos2025!
```

---

### 6. Images ne s'affichent pas

**Symptômes:**
- Images cassées (icônes rouges)
- Erreur 404 dans la console

**Solutions:**

#### Vérifier le dossier public:
```bash
# Backend
ls backend/public/images/
ls backend/public/images/profiles/
```

#### Vérifier la configuration du serveur d'images:
```javascript
// Backend/app.js
app.use('/api/public', express.static(path.join(__dirname, 'public')));
```

#### Frontend - Vérifier les URLs:
```javascript
// Doit retourner des images ou des fallbacks
<img 
  src="http://localhost:3001/api/public/images/profile.jpg"
  onError={(e) => e.target.src = 'fallback-image.jpg'}
/>
```

---

### 7. Apache refuse de démarrer

**Symptômes:**
```
Apache did not start
Port 80 already in use
```

**Solutions:**

#### Vérifier le port 80:
```powershell
# Trouver le processus qui utilise le port 80
netstat -ano | findstr :80
```

#### Vérifier la syntaxe Apache:
```bash
cd C:\xampp\apache\bin
httpd -t
```

#### Vérifier les fichiers de configuration:
```bash
# Vérifier httpd.conf
C:\xampp\apache\conf\httpd.conf

# Vérifier httpd-vhosts.conf
C:\xampp\apache\conf\extra\httpd-vhosts.conf
```

---

### 8. Node.js ne trouve pas les modules

**Symptômes:**
```
Error: Cannot find module 'express'
Error: Cannot find module '@prisma/client'
```

**Solutions:**

```bash
# Réinstaller les modules
cd backend
rm -r node_modules
npm install

# Régénérer le client Prisma
npm run prisma:generate
```

---

### 9. Erreur de migration Prisma

**Symptômes:**
```
Error: database does not exist
Error: migration already exists
```

**Solutions:**

```bash
# Créer une nouvelle migration
npm run prisma:migrate

# Ou pousser les changements directs
npm run prisma:push

# Réinitialiser la base (ATTENTION - data perdue)
npx prisma migrate reset
```

---

### 10. Erreur SSL/HTTPS

**Symptômes:**
```
SSL_ERROR_RX_RECORD_TOO_LONG
net::ERR_INVALID_HTTP_RESPONSE
```

**Solutions:**

```bash
# Générer un certificat auto-signé
cd C:\xampp\apache
mkdir certs
cd certs

# Windows - Utiliser OpenSSL de XAMPP
..\bin\openssl req -x509 -newkey rsa:2048 -keyout server.key -out server.crt -days 365 -nodes
```

---

## 🔍 Logs et Debugging

### Consulter les logs Apache:
```bash
C:\xampp\apache\logs\error.log
C:\xampp\apache\logs\access.log
C:\xampp\apache\logs\bygagoos-ink-error.log
```

### Consulter les logs Backend:
```bash
# Terminal du backend - voir les messages de console
# Ou configurer la journalisation:

# Backend/app.js
app.use(morgan('combined'));
```

### Consulter les logs MySQL:
```bash
C:\xampp\mysql\data\error.log
```

### Consulter les logs PostgreSQL:
```bash
# Dépend de l'installation
# Généralement: C:\Program Files\PostgreSQL\<version>\data\log
```

---

## 🧪 Tests de Connexion

### Test 1: Vérifier les services
```bash
# Backend API
curl http://localhost:3001/api/health

# Frontend
curl http://bygagoos-ink.local

# Apache
curl -v http://localhost/
```

### Test 2: Vérifier la base de données
```bash
# PostgreSQL
psql -U bygagoos_app -d bygagoos_ink -c "SELECT COUNT(*) FROM users;"

# MySQL
mysql -u bygagoos_app -p bygagoos_ink -e "SELECT COUNT(*) FROM users;"
```

### Test 3: Tester l'authentification
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "tovoniaina.rahendrison@gmail.com",
    "password": "ByGagoos2025!"
  }'
```

---

## 📞 Support et Ressources

- **Node.js Docs**: https://nodejs.org/docs/
- **Prisma**: https://www.prisma.io/docs/
- **Express**: https://expressjs.com/
- **React**: https://react.dev/
- **Apache**: https://httpd.apache.org/docs/
- **XAMPP**: https://www.apachefriends.org/docs/

---

✅ Si le problème persiste, consultez les logs complets et la documentation spécifique du composant défaillant.
