#!/bin/bash
echo "🚀 Démarrage ByGagoos-Ink avec WSL2..."

# Démarre Docker dans WSL2 si nécessaire
if ! sudo service docker status | grep -q "active (running)"; then
    echo "🐳 Démarrage du service Docker WSL2..."
    sudo service docker start
    sleep 3
fi

# Arrête les anciens conteneurs
echo "🧹 Nettoyage..."
docker-compose down

# Démarre les nouveaux
echo "🚀 Démarrage des conteneurs..."
docker-compose up -d --build

echo "⏳ Attente du démarrage..."
sleep 10

echo "🔍 Vérification..."
docker-compose ps

echo "🌐 Test de l'API..."
curl -s http://localhost:3001/api/health || echo "❌ API non disponible"

echo ""
echo "✅ PRÊT !"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:3001"
echo "Login:    tovoniaina.rahendrison@gmail.com / ByGagoos2025!"