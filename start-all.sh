#!/bin/bash

echo "==================================================="
echo "🚀 LANCEMENT DE BYGAGOOS-INK - PLATEFORME FAMILIALE"
echo "==================================================="

echo ""
echo "1. 🚀 DÉMARRAGE DES SERVICES DOCKER..."
cd /d/ByGagoos-Ink/backend
docker-compose up -d
sleep 5

echo ""
echo "2. 🔍 VÉRIFICATION DES CONTENEURS..."
docker ps --filter name=bygagoos

echo ""
echo "3. 🚀 DÉMARRAGE DU BACKEND..."
echo "   Terminal 1 : cd /d/ByGagoos-Ink/backend && npm start"

echo ""
echo "4. 🗄️  DÉMARRAGE DE PRISMA STUDIO..."
echo "   Terminal 2 : cd /d/ByGagoos-Ink/backend && npx prisma studio"

echo ""
echo "5. 🚀 DÉMARRAGE DU FRONTEND..."
echo "   Terminal 3 : cd /d/ByGagoos-Ink/frontend && npm run dev"

echo ""
echo "==================================================="
echo "✅ TOUS LES SERVICES SONT PRÊTS À DÉMARRER !"
echo "==================================================="

echo ""
echo "🌐 URLs D'ACCÈS :"
echo "   Frontend React : http://localhost:5173"
echo "   Backend API    : http://localhost:3001"
echo "   Prisma Studio  : http://localhost:5555"
echo "   PGAdmin        : http://localhost:5050"

echo ""
echo "👥 IDENTIFIANTS DE TEST :"
echo "   Email    : tovoniaina.rahendrison@gmail.com"
echo "   Default password: configure via environment variable DEFAULT_PASSWORD (not committed)"

echo ""
echo "🔐 Si vous avez besoin d'un mot de passe par défaut pour le seed, définissez DEFAULT_PASSWORD dans votre environnement avant d'exécuter le seed."
echo ""
echo "🔎 COMMANDES POUR DÉMARRER :"
echo "   Ouvrez 3 terminaux et exécutez les commandes ci-dessus"
