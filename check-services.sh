#!/bin/bash
echo "🔍 Vérification des services ByGagoos-Ink..."

echo "1. Conteneurs Docker :"
docker-compose ps

echo ""
echo "2. Test backend (health check) :"
curl -s http://localhost:5000/health || echo "❌ Backend inaccessible"

echo ""
echo "3. Test API famille :"
curl -s http://localhost:5000/api/v1/family | head -5 || echo "❌ API inaccessible"

echo ""
echo "4. Logs backend (dernières 10 lignes) :"
docker-compose logs --tail=10 backend

echo ""
echo "👉 Frontend : http://localhost:3000"
echo "👉 Backend  : http://localhost:5000"