# 🚀 ByGagoos-Ink - Configuration XAMPP Réseau Local (Manuel)

**Votre adresse IP locale : `192.168.88.16`**

---

## ✅ Étapes de configuration

### **ÉTAPE 1 : Fichier Hosts (5 min)**

Fichier à modifier : `C:\Windows\System32\drivers\etc\hosts`

1. **Ouvrir le fichier** :
   - Clic droit sur Notepad
   - Sélectionner "Exécuter en tant qu'administrateur"
   - Fichier → Ouvrir
   - Aller à : `C:\Windows\System32\drivers\etc\hosts`

2. **Ajouter à la fin du fichier** :
   ```
   # ByGagoos-Ink Local
   127.0.0.1       bygagoos-ink.local
   192.168.88.16   bygagoos-ink.local
   ```

3. **Sauvegarder** (Ctrl+S)

4. **Valider** :
   ```powershell
   # Ouvrir PowerShell en tant qu'administrateur
   ipconfig /flushdns
   ```

---

### **ÉTAPE 2 : Apache Virtual Host (10 min)**

Fichier à modifier : `C:\xampp\apache\conf\extra\httpd-vhosts.conf`

1. **Ouvrir le fichier** avec Notepad
2. **Coller à la fin du fichier** :

```apache
# ============================================
# ByGagoos-Ink Virtual Host
# ============================================

<VirtualHost *:80>
    ServerName bygagoos-ink.local
    ServerAlias bygagoos-ink
    DocumentRoot "C:\xampp\htdocs\bygagoos-ink\public"
    
    <Directory "C:\xampp\htdocs\bygagoos-ink\public">
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
```

3. **Sauvegarder** (Ctrl+S)

4. **Valider la syntaxe Apache** :
   ```powershell
   # Ouvrir cmd en tant qu'administrateur
   cd C:\xampp\apache\bin
   httpd -t
   # Doit afficher : Syntax OK
   ```

---

### **ÉTAPE 3 : Dossiers Frontend (5 min)**

1. **Créer le dossier** :
   ```powershell
   mkdir "C:\xampp\htdocs\bygagoos-ink\public" -Force
   ```

2. **Compiler le frontend** :
   ```powershell
   cd D:\ByGagoos-Ink\frontend
   npm install
   npm run build
   ```

3. **Copier les fichiers** :
   ```powershell
   Copy-Item "D:\ByGagoos-Ink\frontend\dist\*" `
             "C:\xampp\htdocs\bygagoos-ink\public" `
             -Recurse -Force
   ```

4. **Vérifier** :
   - Le dossier `C:\xampp\htdocs\bygagoos-ink\public` contient :
     - ✅ `index.html`
     - ✅ `assets` (dossier)
     - ✅ Autres fichiers compilés

---

### **ÉTAPE 4 : Redémarrer Apache (3 min)**

1. **Ouvrir XAMPP Control Panel**
   - Fichier : `C:\xampp\xampp-control.exe`

2. **Redémarrer Apache** :
   - Cliquer "Stop" (si actif)
   - Attendre 2 secondes
   - Cliquer "Start"
   - Vérifier : Apache doit être vert ✅

3. **Vérifier MySQL** (optionnel) :
   - Cliquer "Start"
   - Vérifier : MySQL doit être vert ✅

---

### **ÉTAPE 5 : Démarrer le Backend (2 min)**

1. **Ouvrir Command Prompt** en tant qu'administrateur

2. **Installer et démarrer** :
   ```cmd
   cd D:\ByGagoos-Ink\backend
   npm install
   node server.js
   ```

3. **Vérifier les logs** (doivent afficher) :
   ```
   ✅ Server listening on port 3001
   ✅ API Health: OK
   ```

4. **Laisser cette fenêtre ouverte** (le serveur doit continuer de tourner)

---

### **ÉTAPE 6 : Tester l'application (1 min)**

1. **Ouvrir navigateur**

2. **Tester les URLs** (⚠️ **HTTP**, pas HTTPS) :
   - ✅ `http://bygagoos-ink.local` → Doit afficher l'app
   - ✅ `http://localhost` → Doit afficher l'app
   - ✅ `http://192.168.88.16` → Doit afficher l'app
   - ✅ `http://localhost:3001/api/health` → Doit retourner JSON
   
   ⚠️ **N'utilisez PAS HTTPS** - Seul HTTP (port 80) est configuré

3. **Connexion** :
   ```
   Email    : tovoniaina.rahendrison@gmail.com
   Password : ByGagoos2025!
   ```

---

## 📋 Checklist de vérification

- [ ] Fichier hosts modifié et sauvegardé
- [ ] Fichier httpd-vhosts.conf modifié et sauvegardé
- [ ] Syntaxe Apache validée (`httpd -t` → OK)
- [ ] Apache redémarré (Control Panel → Stop → Start)
- [ ] Frontend compilé (`npm run build` réussi)
- [ ] Fichiers copiés dans `C:\xampp\htdocs\bygagoos-ink\public`
- [ ] Backend démarré (`node server.js` actif)
- [ ] DNS flushed (`ipconfig /flushdns`)
- [ ] Application accessible sur `http://bygagoos-ink.local`
- [ ] Login réussi
- [ ] Commandes visibles en dashboard

---

## 🌐 Accès depuis autres appareils

Une fois tout configuré :

```
Depuis PC  : http://192.168.88.16
Depuis autre appareil même réseau :
  - Mobile WiFi : http://192.168.88.16
  - Tablette : http://192.168.88.16
  - Autre PC : http://192.168.88.16
```

---

## 🐛 Troubleshooting

| Erreur | Solution |
|--------|----------|
| **"ERR_NAME_NOT_RESOLVED"** | Vérifier fichier hosts + `ipconfig /flushdns` + redémarrer navigateur |
| **"Cannot GET /"** | Vérifier que fichiers existent dans `C:\xampp\htdocs\bygagoos-ink\public` |
| **"CORS error"** | Vérifier que backend (port 3001) est actif |
| **Apache ne démarre pas** | Port 80 occupé : `netstat -ano \| findstr :80` |
| **403 Forbidden** | Vérifier permissions dossier htdocs |
| **Proxy pas actif** | Vérifier que mod_proxy est activé dans Apache |

---

## 📞 Besoin d'aide?

Consultez :
- `SETUP_RESEAU_LOCAL.md` - Guide détaillé complet
- `PROJECT_RAPPORT.md` - Documentation projet
- `QUICK_START_RESEAU.md` - Quick start

---

**Configuration complétée! 🎉**

Votre application ByGagoos-Ink est maintenant accessible sur tout votre réseau local.
