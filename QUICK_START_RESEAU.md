# 🚀 ByGagoos-Ink - Démarrage Réseau Local (5 minutes)

## ⚡ Quick Start

### Étape 1 : Configuration Windows (2 min)

```powershell
# 1. Ouvrir PowerShell en tant qu'administrateur
# 2. Exécuter :
cd D:\ByGagoos-Ink
.\setup-network.ps1 -All

# Cela va automatiquement :
# ✅ Configurer Apache Virtual Host
# ✅ Mettre à jour hosts file
# ✅ Compiler frontend (npm run build)
# ✅ Démarrer backend Node.js
```

### Étape 2 : Démarrer XAMPP (1 min)

```
1. Ouvrir XAMPP Control Panel
2. Cliquer "Start" sur Apache
3. Cliquer "Start" sur MySQL
4. Vérifier : Apache et MySQL en vert ✅
```

### Étape 3 : Accéder à l'app (instant)

```
Ouvrir navigateur :
http://bygagoos-ink.local

OU

http://192.168.1.X (remplacer X par votre IP)
```

---

## 🔐 Connexion

```
Email    : tovoniaina.rahendrison@gmail.com
Password : ByGagoos2025!
```

---

## 🖥️ Architecture

```
┌─ XAMPP (Port 80)
│  └─ Frontend (React)
│     └─ Static files
│
├─ Proxy /api → Node.js (Port 3001)
│  └─ Backend API
│     └─ JWT Auth
│        └─ In-memory DB
│
└─ Local Network
   └─ Tous les appareils WiFi/Ethernet
      └─ http://192.168.1.X
```

---

## 📋 Checklist rapide

- [ ] PowerShell script exécuté (`setup-network.ps1 -All`)
- [ ] Apache démarré dans XAMPP
- [ ] Node.js backend running (fenêtre cmd ouverte)
- [ ] Accès à `http://bygagoos-ink.local`
- [ ] Login réussi
- [ ] Peut voir les commandes

---

## 🐛 Troubleshooting

| Problème | Solution |
|----------|----------|
| "ERR_NAME_NOT_RESOLVED" | Redémarrer navigateur, exécuter `ipconfig /flushdns` |
| "CORS error" | Vérifier que backend (port 3001) est actif |
| "403 Forbidden" | Vérifier que `C:\xampp\htdocs\bygagoos-ink\public` existe |
| Port 80 occupé | `netstat -ano \| findstr :80` puis `taskkill /PID xxx /F` |
| Firewall bloque | Autoriser port 80 et 3001 dans Windows Firewall |

---

## 📱 Accès depuis autres appareils

```
Même réseau WiFi/Ethernet?
→ Oui : http://192.168.1.X
→ Non : Pas possible (réseau local uniquement)
```

**Obtenir votre IP** :
```powershell
ipconfig | find "IPv4"
# Exemple : 192.168.1.100
```

---

## 🔄 Redémarrer après modification

```powershell
# Backend (redémarrer fenêtre)
Ctrl+C (dans fenêtre Node.js)
Relancer : node server.js

# Frontend (redémarrer Apache)
XAMPP Control Panel → Stop → Start Apache
```

---

## 📞 Support

Besoin d'aide? Consultez :
- `SETUP_RESEAU_LOCAL.md` - Guide complet
- `config/apache-vhosts-bygagoos.conf` - Config Apache
- `PROJECT_RAPPORT.md` - Documentation projet
