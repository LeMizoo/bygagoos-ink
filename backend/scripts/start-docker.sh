#!/bin/bash

echo "🚀 BYGAGOOS-INK - DÉMARRAGE DOCKER"
echo "========================================"
echo ""

# Vérifier Docker
if ! docker --version > /dev/null 2>&1; then
    echo "❌ Docker n'est pas installé ou non lancé"
    echo "Veuillez lancer Docker Desktop manuellement"
    exit 1
fi

echo "🐳 Docker version: $(docker --version | cut -d' ' -f3 | cut -d',' -f1)"
echo ""

# Arrêter les anciens conteneurs
echo "🧹 Nettoyage des anciens conteneurs..."
docker-compose down

# Construire et démarrer
echo "🔨 Construction des images..."
docker-compose build

echo "🚀 Démarrage des conteneurs..."
docker-compose up -d

# Attendre le démarrage
echo "⏳ Attente du démarrage (30 secondes)..."
sleep 30

# Vérification
echo ""
echo "🔍 VÉRIFICATION DES CONTENEURS:"
echo "========================================"
docker-compose ps

echo ""
echo "🗄️  TEST POSTGRESQL:"
echo "========================================"
if docker exec bygagoos-postgres pg_isready -U postgres > /dev/null 2>&1; then
    echo "✅ PostgreSQL est en cours d'exécution"
    
    # Compter les utilisateurs
    USERS_COUNT=$(docker exec bygagoos-postgres psql -U postgres -d bygagoos_ink -t -c "SELECT COUNT(*) FROM users;" 2>/dev/null | tr -d ' ' || echo "0")
    echo "👥 Utilisateurs dans la base: $USERS_COUNT"
else
    echo "❌ PostgreSQL n'est pas accessible"
fi

echo ""
echo "🌐 TEST API:"
echo "========================================"
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "✅ API backend est en cours d'exécution"
    curl -s http://localhost:3001/api/health | jq -r '.status, .database, "Utilisateurs: \\(.users)"' || curl -s http://localhost:3001/api/health
else
    echo "❌ API backend n'est pas accessible"
    echo "Consultation des logs..."
    docker-compose logs backend --tail=20
fi

echo ""
echo "========================================"
echo "✅ DÉMARRAGE TERMINÉ !"
echo "========================================"
echo ""
echo "🌐 ACCÈS:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3001"
echo "   API Health: http://localhost:3001/api/health"
echo "   PostgreSQL: localhost:5432"
echo ""
echo "🔑 IDENTIFIANTS:"
echo "   PostgreSQL: postgres / (set POSTGRES_PASSWORD via environment)"
echo "   Login: tovoniaina.rahendrison@gmail.com"
echo "   Default password: configure via environment variable DEFAULT_PASSWORD (not committed)"
echo ""
echo "📋 COMMANDES UTILES:"
echo "   docker-compose logs -f       # Voir les logs"
echo "   docker-compose down          # Arrêter"
echo "   docker-compose restart       # Redémarrer"
echo "   npx prisma studio            # Interface base de données"
echo ""
echo "🐳 Bon développement !"