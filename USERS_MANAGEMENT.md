# 👥 Gestion des Utilisateurs ByGagoos-Ink

**Version:** 1.0.0  
**Date:** Décembre 2025  
**Statut:** ✅ Complété

---

## 📋 Liste des Utilisateurs

### 1. **Tovoniaina RAHENDRISON**
- **Email:** `tovoniaina.rahendrison@gmail.com`
- **Rôle:** Fondateur & Structure
- **Titre:** Fondateur & Structure
- **Téléphone:** +261 34 43 593 30
- **Rôle Système:** `SUPER_ADMIN`
- **Rôle Famille:** `STRUCTURE` (👑)
- **Mot de passe temporaire:** `ByGagoos2025!`
- **Permissions:** Accès complet à l'administration

### 2. **Volatiana RANDRIANARISOA**
- **Email:** `dedettenadia@gmail.com`
- **Rôle:** Direction Générale - Inspiration & Créativité
- **Titre:** Direction Générale - Inspiration & Créativité
- **Téléphone:** +261 3X XXX XXXX *(À renseigner)*
- **Rôle Système:** `FAMILY_MEMBER`
- **Rôle Famille:** `INSPIRATION` (💡)
- **Mot de passe temporaire:** `ByGagoos2025!`
- **Permissions:** Accès utilisateur standard

### 3. **Miantsatiana RAHENDRISON**
- **Email:** `miantsatianarahendrison@gmail.com`
- **Rôle:** Direction des Opérations - Création & Design
- **Titre:** Direction des Opérations - Création & Design
- **Téléphone:** +261 3X XXX XXXX *(À renseigner)*
- **Rôle Système:** `FAMILY_MEMBER`
- **Rôle Famille:** `CREATION` (🎨)
- **Mot de passe temporaire:** `ByGagoos2025!`
- **Permissions:** Accès utilisateur standard

### 4. **Tia Faniry RAHENDRISON**
- **Email:** `fanirytia17@gmail.com`
- **Rôle:** Direction Administrative - Communication & Relations
- **Titre:** Direction Administrative - Communication & Relations
- **Téléphone:** +261 3X XXX XXXX *(À renseigner)*
- **Rôle Système:** `FAMILY_MEMBER`
- **Rôle Famille:** `COMMUNICATION` (📢)
- **Mot de passe temporaire:** `ByGagoos2025!`
- **Permissions:** Accès utilisateur standard

---

## 🔐 Sécurité des Mots de Passe

### Politique de Mots de Passe

✅ **À faire:**
- ✓ Changer le mot de passe temporaire lors de la première connexion
- ✓ Utiliser un mot de passe unique et sécurisé (min. 8 caractères)
- ✓ Utiliser une combinaison de: majuscules, minuscules, chiffres, caractères spéciaux
- ✓ Changer le mot de passe tous les 3 mois

❌ **À éviter:**
- ✗ Ne pas partager votre mot de passe
- ✗ Ne pas utiliser le même mot de passe que votre email
- ✗ Ne pas écrire votre mot de passe sur un post-it visible
- ✗ Ne pas utiliser des mots courants ou des dates simples

### Comment Changer votre Mot de Passe

1. Connectez-vous à votre compte
2. Cliquez sur **Mon Profil** (via le menu utilisateur en haut à droite)
3. Allez à la section **🔐 Sécurité**
4. Cliquez sur **"Changer le mot de passe"**
5. Entrez:
   - Votre mot de passe actuel
   - Votre nouveau mot de passe
   - Confirmez le nouveau mot de passe
6. Cliquez sur **"Changer"**

---

## 👤 Édition du Profil

Chaque utilisateur peut mettre à jour son profil:

### Informations Modifiables
- ✏️ Prénom
- ✏️ Nom
- ✏️ Téléphone
- ✏️ Titre/Poste

### Informations Non-Modifiables
- 🔒 Email (contact administrateur pour le changer)
- 🔒 Rôle (contact administrateur)

### Comment Éditer votre Profil

1. Connectez-vous à votre compte
2. Cliquez sur **Mon Profil**
3. Cliquez sur le bouton **"Modifier"** (en haut à droite)
4. Remplissez les champs que vous souhaitez modifier
5. Cliquez sur **"Enregistrer"**

---

## 🔑 Accès Système

### Adresses

| Service | URL | Port |
|---------|-----|------|
| Application Web | `http://localhost:5173` | 5173 |
| API Backend | `http://localhost:3001` | 3001 |
| Health Check | `/api/health` | 3001 |

### Endpoints Utilisateurs

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/auth/login` | POST | Connexion utilisateur |
| `/api/auth/verify` | GET | Vérifier le token |
| `/api/users/:id/profile` | GET | Récupérer le profil |
| `/api/users/:id/profile` | PUT | Mettre à jour le profil |
| `/api/users/:id/change-password` | POST | Changer le mot de passe |
| `/api/family/members` | GET | Lister tous les membres |

---

## 📱 Fonctionnalités Disponibles

### Pour Tous les Utilisateurs (Authentifiés)

✅ **Accès Autorisé:**
- Consulter le tableau de bord
- Voir l'équipe (famille)
- Gérer leur profil personnel
- Changer leur mot de passe
- Se déconnecter

### Pour l'Administrateur (Tovoniaina)

✅ **Accès Administrateur:**
- Tous les accès utilisateur standard
- Voir les informations détaillées de tous les utilisateurs
- Gérer les permissions *(future)*

---

## 🚀 Premier Démarrage

### Checklist Première Connexion

- [ ] Me connecter avec mes identifiants temporaires
- [ ] Accéder au profil via le menu utilisateur (coin haut droit)
- [ ] Changer mon mot de passe temporaire
- [ ] Vérifier que mes informations (téléphone, etc.) sont correctes
- [ ] Mettre à jour mon profil si nécessaire
- [ ] Consulter le tableau de bord
- [ ] Voir la liste de l'équipe

---

## 📊 Gestion de Compte

### Récapitulatif du Profil

Une fois connecté, votre profil affiche:
- 👤 **Profil Personnel**: Vos informations de base
- 🔐 **Sécurité**: Gestion du mot de passe
- ℹ️ **Informations**: Date de création, dernière connexion

### Déconnexion

Pour vous déconnecter:
1. Cliquez sur votre avatar en haut à droite
2. Sélectionnez **"Se déconnecter"**
3. Vous serez redirigé vers la page d'accueil

---

## 🆘 Support

### Mot de Passe Oublié

**Situation:** Vous avez oublié votre mot de passe

**Solution:**
1. Contact l'administrateur (Tovoniaina)
2. Demande une réinitialisation
3. Reçois un mot de passe temporaire par email
4. Connecte-toi et change le mot de passe

### Compte Bloqué

**Situation:** Votre compte est bloqué après plusieurs tentatives

**Solution:**
1. Attendez 30 minutes (limite automatique)
2. Contactez l'administrateur
3. Vérifiez votre email/mot de passe

### Autres Problèmes

- 📧 **Email:** admin@bygagoos-ink.com *(future)*
- 📞 **Téléphone:** +261 34 43 593 30 (Tovoniaina)
- 💬 **Chat:** Support interne *(future)*

---

## 📝 Notes Importantes

⚠️ **Rappels de Sécurité:**

1. **Mot de passe temporaire:** Changez-le dès votre première connexion
2. **Accès sécurisé:** Utilisez une connexion HTTPS en production
3. **Notifications:** Activez les alertes de connexion
4. **Confidentialité:** Ne partagez jamais vos identifiants
5. **Déconnexion:** Déconnectez-vous après chaque session

---

## 📅 Historique des Modifications

| Date | Auteur | Changement |
|------|--------|-----------|
| 11/12/2025 | Admin | Création du système d'utilisateurs - V1.0 |

---

## 🎯 Prochaines Étapes

- [ ] Intégration base de données Prisma
- [ ] Système de double authentification (2FA)
- [ ] Audit logs et historique de connexion
- [ ] Récupération de mot de passe par email
- [ ] Gestion des rôles avancée
- [ ] Notifications de sécurité

---

**✅ Configuration Complète - Prêt pour l'utilisation!**
