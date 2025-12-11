# ✅ ByGagoos-Ink XAMPP - Checklist de Vérification

## 📋 Pré-déploiement

### 1. Infrastructure
- [ ] XAMPP installé (Apache, MySQL/PostgreSQL)
- [ ] Node.js 18+ installé
- [ ] npm 9+ installé
- [ ] Base de données créée et accessible
- [ ] Ports 80, 3001 libres

### 2. Configuration des fichiers
- [ ] `.env` configuré dans backend/
- [ ] `httpd-vhosts.conf` configuré
- [ ] `hosts` file modifié (127.0.0.1 bygagoos-ink.local)
- [ ] Apache mod_rewrite activé
- [ ] Apache mod_proxy activé

### 3. Frontend
- [ ] `npm install` exécuté
- [ ] `npm run build` complété sans erreurs
- [ ] Dossier `dist/` généré avec fichiers
- [ ] Fichiers copiés dans `C:\xampp\htdocs\bygagoos-ink\`

### 4. Backend
- [ ] `npm install` exécuté
- [ ] Dépendances Prisma générées
- [ ] Migrations appliquées: `npm run prisma:push`
- [ ] Base de données seedée: `npm run prisma:seed`
- [ ] Utilisateurs de test créés

### 5. Variables d'environnement
- [ ] JWT_SECRET défini et sécurisé
- [ ] DATABASE_URL correct
- [ ] FRONTEND_URL correct
- [ ] PORT=3001 configuré

---

## 🚀 Déploiement

### 1. Démarrer XAMPP
```bash
✓ Apache started
✓ MySQL/PostgreSQL started
```

- [ ] Apache écoute le port 80
- [ ] Base de données accessible
- [ ] Aucun message d'erreur

### 2. Démarrer le Backend
```bash
cd d:\ByGagoos-Ink\backend
npm start
```

- [ ] Server running on http://localhost:3001
- [ ] Aucun message d'erreur
- [ ] Prisma Client généré

### 3. Tester les URLs

#### Frontend
- [ ] http://localhost → Page d'accueil charge
- [ ] http://bygagoos-ink.local → Fonctionne
- [ ] Fichiers CSS/JS chargent correctement
- [ ] Pas d'erreurs 404

#### Backend
- [ ] http://localhost:3001/api/health → Répond
- [ ] http://localhost:3001/api/family/members → Répond (si authentifié)

---

## 🔐 Tests de Fonctionnalité

### 1. Authentification
- [ ] Login fonctionnne
- [ ] Email: tovoniaina.rahendrison@gmail.com
- [ ] Password: ByGagoos2025!
- [ ] Token JWT généré
- [ ] Token stocké en localStorage

### 2. Récupération de données
- [ ] Dashboard charge sans erreur
- [ ] Membres de famille affichés
- [ ] Images se chargent
- [ ] Données du backend reçues

### 3. CORS
- [ ] Pas d'erreurs CORS
- [ ] Headers CORS corrects
- [ ] Requêtes cross-origin fonctionnent

### 4. Base de données
- [ ] Connexion réussie
- [ ] Tables créées
- [ ] Données seedées présentes
- [ ] Requêtes rapides

---

## 🐛 Debugging

### Logs à consulter
- [ ] Console du backend (npm start)
- [ ] Console du navigateur (F12)
- [ ] `C:\xampp\apache\logs\error.log`
- [ ] `C:\xampp\apache\logs\bygagoos-ink-error.log`

### Points d'arrêt à vérifier
- [ ] Vérifier PORT dans .env vs démarrage backend
- [ ] Vérifier FRONTEND_URL correspond à l'origine des requêtes
- [ ] Vérifier DATABASE_URL est correct
- [ ] Vérifier mod_rewrite fonctionne pour SPA

---

## 📊 Performance

### Frontend
- [ ] Temps de chargement < 3s
- [ ] Pas de warnings webpack
- [ ] Bundle minifié

### Backend
- [ ] Requêtes API < 200ms
- [ ] Pas de memory leaks
- [ ] Connexion BD stable

---

## 🔒 Sécurité

- [ ] JWT_SECRET sécurisé (64+ caractères)
- [ ] Mots de passe BD changés
- [ ] CORS restreint aux domaines autorisés
- [ ] HTTPS configuré (optionnel pour dev)
- [ ] Pas de données sensibles en localStorage

---

## 📝 Documentation

- [ ] README.md mis à jour
- [ ] XAMPP_SETUP.md complet et à jour
- [ ] XAMPP_TROUBLESHOOTING.md consulté
- [ ] Configuration documentée

---

## ✅ Vérification Finale

```bash
# 1. Test de santé
curl http://localhost:3001/api/health

# 2. Vérifier base de données
psql -U bygagoos_app -d bygagoos_ink -c "SELECT COUNT(*) FROM users;"

# 3. Accéder à l'app
open http://bygagoos-ink.local

# 4. Vérifier les logs
tail -f C:\xampp\apache\logs\error.log
```

---

## 🎉 Statut de Déploiement

| Composant | Status | Notes |
|-----------|--------|-------|
| Apache    | ✅/❌  |       |
| Node.js   | ✅/❌  |       |
| Database  | ✅/❌  |       |
| Frontend  | ✅/❌  |       |
| Backend   | ✅/❌  |       |
| Auth      | ✅/❌  |       |

---

**Date de vérification**: _______________
**Responsable**: _______________
**Commentaires**: _______________

---

✅ Si tous les points sont cochés, le projet est prêt pour la production!
