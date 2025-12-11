#!/bin/bash

echo "🚀 Démarrage de ByGagoos-Ink (Mode Développement)..."
echo "==================================================="

# Vérifier Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé"
    exit 1
fi

# Arrêter les anciens conteneurs
echo "🧹 Nettoyage des anciens conteneurs..."
docker-compose down 2>/dev/null

# Créer les dossiers nécessaires
echo "📁 Création de la structure..."
mkdir -p backend frontend/src frontend/public

# S'assurer que tous les fichiers nécessaires existent
echo "📝 Vérification des fichiers..."

# Backend
if [ ! -f backend/app.js ]; then
    echo "⚠️  Création de backend/app.js..."
    cat > backend/app.js << 'EOF'
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    service: 'ByGagoos-Ink Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    family: ['Tovoniaina', 'Volatiana', 'Miantsatiana', 'Tia Faniry']
  });
});

app.get('/api/v1/family', (req, res) => {
  res.json({
    success: true,
    members: [
      { name: 'Tovoniaina', role: 'Structure', color: '#7C3AED', description: 'Structure et transmet la vision' },
      { name: 'Volatiana', role: 'Inspiration', color: '#EC4899', description: 'Inspire et veille sur l\'âme du projet' },
      { name: 'Miantsatiana', role: 'Création', color: '#10B981', description: 'Crée et embellit chaque réalisation' },
      { name: 'Tia Faniry', role: 'Communication', color: '#3B82F6', description: 'Communique et relie ByGagoos au monde' }
    ]
  });
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend démarré sur http://0.0.0.0:${PORT}`);
});
EOF
fi

if [ ! -f backend/package.json ]; then
    cat > backend/package.json << 'EOF'
{
  "name": "bygagoos-ink-backend",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
EOF
fi

if [ ! -f backend/Dockerfile ]; then
    cat > backend/Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]
EOF
fi

# Frontend
if [ ! -f frontend/index.html ]; then
    cat > frontend/index.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ByGagoos-Ink | Gestion Familiale Sérigraphie</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👕</text></svg>">
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>
EOF
fi

if [ ! -f frontend/src/main.jsx ]; then
    cat > frontend/src/main.jsx << 'EOF'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'

function App() {
  const [family, setFamily] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/family')
      .then(res => res.json())
      .then(data => {
        setFamily(data.members || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="app">
      <header>
        <h1>👕 ByGagoos-Ink</h1>
        <p>Gestion Familiale de Sérigraphie</p>
      </header>
      <main>
        <section className="hero">
          <h2>Bienvenue dans notre atelier digital</h2>
          <p>Transformons notre passion pour la sérigraphie en excellence numérique</p>
        </section>
        
        {loading ? (
          <div className="loading">Chargement...</div>
        ) : (
          <section className="family">
            <h3>Notre Équipe Familiale</h3>
            <div className="family-grid">
              {family.map((member, i) => (
                <div key={i} className="member-card" style={{borderColor: member.color}}>
                  <div className="avatar" style={{backgroundColor: member.color}}>
                    {member.name.charAt(0)}
                  </div>
                  <h4>{member.name}</h4>
                  <span className="role" style={{color: member.color}}>{member.role}</span>
                  <p>{member.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <footer>
        <p>© 2024 ByGagoos-Ink. Antananarivo, Madagascar</p>
      </footer>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
EOF
fi

if [ ! -f frontend/src/styles.css ]; then
    cat > frontend/src/styles.css << 'EOF'
@charset "UTF-8";
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

.app { min-height: 100vh; background: #f5f5f5; }
header { background: white; padding: 2rem; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
header h1 { color: #2563EB; font-size: 2.5rem; margin-bottom: 0.5rem; }
header p { color: #6B7280; font-size: 1.1rem; }

main { max-width: 1200px; margin: 0 auto; padding: 2rem; }
.hero { text-align: center; padding: 3rem 1rem; margin-bottom: 2rem; }
.hero h2 { font-size: 2rem; color: #1F2937; margin-bottom: 1rem; }
.hero p { font-size: 1.2rem; color: #6B7280; }

.family h3 { font-size: 1.5rem; color: #1F2937; margin-bottom: 1.5rem; text-align: center; }
.family-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
.member-card { background: white; padding: 1.5rem; border-radius: 10px; border-top: 4px solid; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.avatar { width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem; font-weight: bold; }
.member-card h4 { font-size: 1.25rem; margin-bottom: 0.5rem; color: #1F2937; }
.role { font-weight: 600; font-size: 0.9rem; display: block; margin-bottom: 0.5rem; }
.member-card p { color: #6B7280; font-size: 0.9rem; line-height: 1.4; }

footer { text-align: center; padding: 2rem; color: #6B7280; margin-top: 3rem; border-top: 1px solid #e5e7eb; }

.loading { text-align: center; padding: 2rem; color: #6B7280; }
EOF
fi

if [ ! -f frontend/package.json ]; then
    cat > frontend/package.json << 'EOF'
{
  "name": "bygagoos-ink-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
EOF
fi

if [ ! -f frontend/Dockerfile ]; then
    cat > frontend/Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
EOF
fi

if [ ! -f frontend/vite.config.js ]; then
    cat > frontend/vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
})
EOF
fi

# Démarrer les conteneurs
echo "🐳 Démarrage des conteneurs Docker..."
docker-compose up --build -d

# Attendre que les services démarrent
echo "⏳ Attente du démarrage des services..."
sleep 5

# Vérifier l'état
echo "🔍 Vérification de l'état des services..."
docker-compose ps

echo ""
echo "==================================================="
echo "✅ ByGagoos-Ink est démarré avec succès !"
echo ""
echo "🌐 Frontend:    http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000/health"
echo "👥 Équipe:      http://localhost:5000/api/v1/family"
echo ""
echo "📝 Commandes utiles:"
echo "   docker-compose logs -f     # Voir les logs"
echo "   docker-compose down        # Arrêter"
echo "   ./start-dev.sh             # Redémarrer"
echo "==================================================="