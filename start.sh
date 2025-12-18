#!/bin/bash

echo "========================================"
echo "       BYGAGOOS INK - DÉMARRAGE"
echo "========================================"
echo ""

echo "[1/3] Démarrage du backend (PostgreSQL)..."
cd backend && npm run dev &
sleep 5

echo "[2/3] Démarrage du frontend..."
cd ../frontend && npm run dev &
sleep 3

echo ""
echo "========================================"
echo "         SERVEURS DÉMARRÉS !"
echo "========================================"
echo ""
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend:  http://localhost:3001"
echo "📊 PostgreSQL: localhost:5432/bygagoos"
echo ""
echo "🔐 Login: http://localhost:5173/login"
echo ""
echo "📧 Comptes de test:"
echo "  • tovoniaina.rahendrison@gmail.com"
echo "  • dedettenadia@gmail.com"
echo "  • miantsatianarahendrison@gmail.com"
echo "  • fanirytia17@gmail.com"
echo "🔑 Mot de passe: ByGagoos2025!"
echo ""
echo "⚠️  Configuration PostgreSQL:"
echo "  1. Installez PostgreSQL"
echo "  2. Créez la base: createdb bygagoos"
echo "  3. OU utilisez SQLite: changez DATABASE_URL dans .env"
echo ""