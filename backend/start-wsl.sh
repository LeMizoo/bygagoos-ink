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
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
  echo "✅ API disponible: http://localhost:3001/api/health"
else
  echo "❌ API non disponible - vérifiez les logs: docker-compose logs backend --tail=50"
fi

echo ""
echo "✅ PRÊT !"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:3001"
echo "Credentials are NOT stored in repository. Configure them via environment variables."