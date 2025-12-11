#!/bin/bash

echo "🔍 Test de connexion à ByGagoos-Ink..."
echo "======================================="

echo "1. Vérification des conteneurs..."
docker-compose ps

echo ""
echo "2. Test du backend..."
curl -s http://localhost:5000/health | python3 -m json.tool || echo "❌ Backend inaccessible"

echo ""
echo "3. Test de l'API famille..."
curl -s http://localhost:5000/api/v1/family | python3 -m json.tool || echo "❌ API famille inaccessible"

echo ""
echo "4. Test du frontend..."
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
echo " - Status HTTP"

echo ""
echo "======================================="
echo "Si tout est OK :"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:5000/health"
echo "👥 Famille:  http://localhost:5000/api/v1/family"