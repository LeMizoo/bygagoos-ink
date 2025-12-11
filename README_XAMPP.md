# 🚀 ByGagoos-Ink - Déploiement XAMPP

> Guide complet pour déployer ByGagoos-Ink sur une infrastructure XAMPP locale

## 📌 Vue d'ensemble

Ce projet contient une application complète de gestion familiale pour une entreprise de sérigraphie. L'architecture XAMPP locale comprend:

- **Frontend**: React (Vite) - SPA servi par Apache
- **Backend**: Node.js (Express) - API REST
- **Database**: PostgreSQL/MySQL - Données persistantes

## 🎯 Démarrage Rapide (5 minutes)

### Prérequis
```bash
✓ XAMPP installé
✓ Node.js 18+ 
✓ npm 9+
```

### Installation
```powershell
# 1. Ouvrir PowerShell en tant qu'administrateur
# 2. Exécuter le script setup
cd d:\ByGagoos-Ink
.\setup-xampp.ps1

# 3. Démarrer XAMPP (Panel de contrôle)
# 4. Démarrer le backend
cd d:\ByGagoos-Ink\backend
npm start

# 5. Accéder
# http://bygagoos-ink.local
# ou
# http://localhost/bygagoos-ink/
```

## 📚 Documentation Complète

| Document | Description |
|----------|-------------|
| [XAMPP_SETUP.md](./XAMPP_SETUP.md) | Guide détaillé d'installation |
| [XAMPP_CHECKLIST.md](./XAMPP_CHECKLIST.md) | Checklist de vérification |
| [XAMPP_TROUBLESHOOTING.md](./XAMPP_TROUBLESHOOTING.md) | Guide de dépannage |

## 📂 Structure du Projet

```
ByGagoos-Ink/
├── frontend/               # React SPA
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── dist/              # Build production
├── backend/               # Node.js API
│   ├── app.js
│   ├── package.json
│   ├── .env.production
│   ├── prisma/           # ORM & migrations
│   └── public/           # Fichiers statiques
├── config/
│   ├── apache-vhosts.conf
│   └── .env.production
└── docs/
    ├── XAMPP_SETUP.md
    ├── XAMPP_CHECKLIST.md
    └── XAMPP_TROUBLESHOOTING.md
```

## 🔧 Configuration des Fichiers Clés

### Apache VirtualHost
```apache
# Localisation: C:\xampp\apache\conf\extra\httpd-vhosts.conf
# Copier depuis: d:\ByGagoos-Ink\config\apache-vhosts.conf
```

### Variables d'environnement
```bash
# Backend/.env
NODE_ENV=production
PORT=3001
FRONTEND_URL=http://bygagoos-ink.local
DATABASE_URL=postgresql://...
JWT_SECRET=...
```

### Build Frontend
```bash
cd frontend
npm install
npm run build
# Copier dist/* vers C:\xampp\htdocs\bygagoos-ink\
```

## 🌐 URLs d'accès

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://bygagoos-ink.local | 80 |
| Frontend (alt) | http://localhost/bygagoos-ink/ | 80 |
| Backend API | http://localhost:3001 | 3001 |
| API Health | http://localhost:3001/api/health | 3001 |

## 🔐 Identifiants de Test

```
Email: tovoniaina.rahendrison@gmail.com
Password: ByGagoos2025!
Role: SUPER_ADMIN
```

## 🚀 Commandes Principales

### Frontend
```bash
cd frontend
npm install          # Installer dépendances
npm run dev         # Démarrer dev server
npm run build       # Build production
npm run lint        # Vérifier le code
```

### Backend
```bash
cd backend
npm install                      # Installer dépendances
npm start                        # Démarrer serveur
npm run dev                      # Démarrer avec nodemon
npm run prisma:studio            # Ouvrir Prisma Studio
npm run prisma:seed              # Seeder la base
npm run prisma:migrate           # Appliquer migrations
npm run prisma:push              # Pousser schéma à DB
```

## 📋 Checklist de Déploiement

Avant de mettre en production:

- [ ] Tous les tests passent
- [ ] Secrets JWT générés et sécurisés
- [ ] Base de données migrée et seedée
- [ ] Frontend buildé et copié
- [ ] Apache configuré et testé
- [ ] CORS configuré correctement
- [ ] Logs vérifiés
- [ ] Backups configurés

Voir [XAMPP_CHECKLIST.md](./XAMPP_CHECKLIST.md) pour la liste complète.

## 🐛 Dépannage

### Erreur courante: Port 3001 utilisé
```powershell
# Trouver et tuer le processus
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Erreur courante: CORS blocked
```bash
# Vérifier FRONTEND_URL dans .env
FRONTEND_URL=http://bygagoos-ink.local
```

### Erreur courante: Base de données inaccessible
```bash
# Tester la connexion
psql -U bygagoos_app -d bygagoos_ink
# ou
mysql -u bygagoos_app -p bygagoos_ink
```

Voir [XAMPP_TROUBLESHOOTING.md](./XAMPP_TROUBLESHOOTING.md) pour plus de solutions.

## 📊 Architecture de Déploiement

```
┌─────────────────────────────────────────────────┐
│            Browser (Client)                      │
│   http://bygagoos-ink.local                     │
└────────────────────┬────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
   ┌────▼─────────┐        ┌─────▼───────────┐
   │   Apache     │        │  Node.js Backend │
   │  (Port 80)   │        │   (Port 3001)    │
   │   Frontend   │        │   Express API    │
   │   React SPA  │        │                  │
   └──────────────┘        └────────┬──────────┘
                                    │
                          ┌─────────▼──────────┐
                          │   PostgreSQL       │
                          │   (Port 5432)      │
                          │   ByGagoos-Ink DB  │
                          └────────────────────┘
```

## 🔒 Sécurité

### Pour Production
- [ ] Utiliser HTTPS avec certificat SSL valide
- [ ] Changer les secrets JWT en valeurs sécurisées
- [ ] Limiter l'accès CORS aux domaines connus
- [ ] Mettre en place un WAF (Web Application Firewall)
- [ ] Configurer des backups réguliers
- [ ] Activer la journalisation et monitoring
- [ ] Utiliser des variables d'environnement sécurisées

### Mots de passe par défaut à CHANGER
```bash
# PostgreSQL
postgres: <CHANGE ME>
bygagoos_app: <CHANGE ME>

# MySQL
root: <CONFIGURE>
bygagoos_app: <CHANGE ME>
```

## 📞 Support

En cas de problème:

1. Consulter [XAMPP_TROUBLESHOOTING.md](./XAMPP_TROUBLESHOOTING.md)
2. Vérifier les logs: `C:\xampp\apache\logs\`
3. Tester les endpoints: `curl http://localhost:3001/api/health`
4. Vérifier la BD: `psql -U bygagoos_app -d bygagoos_ink`

## 📝 Notes Importantes

- **Backup**: Effectuer des backups réguliers de la base de données
- **Updates**: Mettre à jour Node.js et les dépendances régulièrement
- **Monitoring**: Mettre en place un monitoring pour surveiller la performance
- **Logs**: Archiver les logs régulièrement

## 📅 Historique des Modifications

| Date | Version | Changements |
|------|---------|-------------|
| 2025-12-11 | 1.0.0 | Configuration initiale XAMPP |
| ... | ... | ... |

## 📖 Ressources Utiles

- [XAMPP Documentation](https://www.apachefriends.org/docs/)
- [Node.js Guide](https://nodejs.org/docs/)
- [Prisma ORM](https://www.prisma.io/docs/)
- [Express.js](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Apache HTTP Server](https://httpd.apache.org/docs/)

---

✅ **Projet prêt pour XAMPP!**

Pour commencer: `.\setup-xampp.ps1`

Pour plus d'informations: Consultez les fichiers de documentation dans le dossier `docs/`
