# ⚡ ByGagoos-Ink - Démarrage rapide (3 minutes)

## 🎯 Objectif
Accéder à votre application ByGagoos-Ink via `http://bygagoos-ink.local` sur votre réseau local.

---

## 🚀 Démarrage rapide (2 options)

### ✅ Option 1 : Automatique (RECOMMANDÉE)

**1. Clic droit sur ce fichier :**
```
D:\ByGagoos-Ink\setup-xampp-admin.bat
```

**2. Sélectionner :**
```
"Exécuter en tant qu'administrateur"
```

**3. Laisser tourner (~3-5 min)**
- Configuration automatique
- Compilation frontend
- Démarrage Apache + Backend

**4. Suivre les URL affichées** ✅

---

### ✅ Option 2 : Manuel (Étapes)

#### **Étape A : Modifier le fichier hosts**

```
C:\Windows\System32\drivers\etc\hosts
```

1. Ouvrir Notepad **en tant qu'administrateur**
2. Fichier → Ouvrir → Copier le chemin ci-dessus
3. Ajouter à la fin :
```
192.168.88.16   bygagoos-ink.local
```
4. Sauvegarder

#### **Étape B : Compiler l'app**

```powershell
cd D:\ByGagoos-Ink\frontend
npm install
npm run build
```

#### **Étape C : Configurer Apache**

1. Ouvrir : `C:\xampp\apache\conf\extra\httpd-vhosts.conf`
2. Coller à la fin :

```apache
<VirtualHost *:80>
    ServerName bygagoos-ink.local
    DocumentRoot "C:\xampp\htdocs\bygagoos-ink\public"
    
    <Directory "C:\xampp\htdocs\bygagoos-ink\public">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        
        <IfModule mod_rewrite.c>
            RewriteEngine On
            RewriteRule ^index\.html$ - [L]
            RewriteCond %{REQUEST_FILENAME} !-f
            RewriteCond %{REQUEST_FILENAME} !-d
            RewriteRule . /index.html [L]
        </IfModule>
    </Directory>

    <IfModule mod_proxy.c>
        ProxyPreserveHost On
        ProxyPass /api http://localhost:3001/api
        ProxyPassReverse /api http://localhost:3001/api
    </IfModule>
</VirtualHost>
```

3. Sauvegarder

#### **Étape D : Copier les fichiers**

```powershell
mkdir "C:\xampp\htdocs\bygagoos-ink\public" -Force
Copy-Item "D:\ByGagoos-Ink\frontend\dist\*" `
          "C:\xampp\htdocs\bygagoos-ink\public" `
          -Recurse -Force
```

#### **Étape E : Redémarrer Apache**

1. Ouvrir XAMPP Control Panel (`C:\xampp\xampp-control.exe`)
2. Apache : Stop → Start

#### **Étape F : Démarrer le backend**

```powershell
cd D:\ByGagoos-Ink\backend
npm install
node server.js
```

---

## ✨ Vérification

**Tout fonctionne si :**

- ✅ `http://bygagoos-ink.local` → Application chargée
- ✅ Login possible avec :
  - Email: `tovoniaina.rahendrison@gmail.com`
  - Password: `ByGagoos2025!`
- ✅ Dashboard affiche les commandes

---

## 🌐 Accès depuis autres appareils

```
Réseau local :
- Depuis PC local    : http://192.168.88.16
- Depuis mobile WiFi : http://192.168.88.16
- Depuis autre PC    : http://192.168.88.16
```

---

## 📱 Ports utilisés

| Service | Port | URL |
|---------|------|-----|
| Apache (Frontend) | 80 | http://192.168.88.16 |
| Node.js (API) | 3001 | http://localhost:3001/api |

---

## 💡 Besoin d'aide?

**Erreur "ERR_NAME_NOT_RESOLVED"** ?
```powershell
ipconfig /flushdns
```

**Apache ne démarre pas ?**
```powershell
cd C:\xampp\apache\bin
httpd -t
```

**Port 80 occupé ?**
```powershell
netstat -ano | findstr :80
```

---

**C'est tout ! 🎉 Votre app est maintenant accessible sur le réseau local.**
