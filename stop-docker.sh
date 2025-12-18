#!/bin/bash

echo "🛑 Arrêt de ByGagoos-Ink..."

docker-compose -f docker-compose.yml down

echo "✅ Services arrêtés"
echo ""
echo "🗑️  Pour supprimer les volumes:"
echo "   docker-compose down -v"
echo ""
echo "🔧 Pour redémarrer:"
echo "   ./start-docker.sh"