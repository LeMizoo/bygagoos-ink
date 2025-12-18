#!/bin/bash

echo "🚀 Démarrage de ByGagoos-Ink avec Docker..."

# Vérifier que Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker."
    exit 1
fi

# Vérifier que Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez installer Docker Compose."
    exit 1
fi

# Charger les variables d'environnement Docker
if [ -f .env.docker ]; then
    export $(cat .env.docker | grep -v '^#' | xargs)
    echo "✅ Variables d'environnement Docker chargées"
else
    echo "⚠️  Fichier .env.docker non trouvé, utilisation des valeurs par défaut"
fi

echo "📦 Construction des images Docker..."
docker-compose -f docker-compose.yml build

echo "🚀 Démarrage des services..."
docker-compose -f docker-compose.yml up -d

echo "⏳ Attente du démarrage des services..."
sleep 10

echo "🔍 Vérification des services..."

# Vérifier le backend
if curl -s http://localhost:3002/api/health > /dev/null; then
    echo "✅ Backend démarré: http://localhost:3002"
else
    echo "❌ Backend non disponible"
fi

# Vérifier le frontend
if curl -s http://localhost:5173 > /dev/null; then
    echo "✅ Frontend démarré: http://localhost:5173"
else
    echo "⚠️  Frontend en cours de démarrage..."
fi

# Vérifier PostgreSQL
if docker exec bygagoos-postgres pg_isready -U postgres > /dev/null 2>&1; then
    echo "✅ PostgreSQL démarré: localhost:5432"
else
    echo "❌ PostgreSQL non disponible"
fi

echo ""
echo "========================================"
echo "🎉 ByGagoos-Ink est maintenant en ligne!"
echo ""
echo "🔗 Frontend: http://localhost:5173"
echo "🔗 Backend API: http://localhost:3002/api"
echo "🔗 Backend Health: http://localhost:3002/api/health"
echo "🔗 PostgreSQL: localhost:5432"
echo ""
echo "📊 Pour voir les logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Pour arrêter:"
echo "   docker-compose down"
echo "========================================"