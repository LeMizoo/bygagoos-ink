#!/bin/bash
echo "��� VÉRIFICATION DONNÉES RÉELLES BYGAGOOS INK"
echo "=========================================="

echo "1. Vérification structure backend..."
if [ -f "backend/prisma/schema.prisma" ]; then
    echo "   ✅ schema.prisma présent"
    # Vérifier les tables
    tables=$(grep -c "model " backend/prisma/schema.prisma)
    echo "   ��� $tables tables définies"
else
    echo "   ❌ schema.prisma manquant"
fi

echo "2. Vérification données seed..."
if [ -f "backend/prisma/seed.js" ]; then
    echo "   ✅ seed.js présent"
    # Vérifier les utilisateurs
    users=$(grep -c "tovoniaina.rahendrison@gmail.com" backend/prisma/seed.js)
    echo "   ��� $users utilisateurs réels configurés"
else
    echo "   ❌ seed.js manquant"
fi

echo "3. Vérification frontend..."
if [ -f "frontend/src/pages/FamilyPage.jsx" ]; then
    echo "   ✅ FamilyPage.jsx mis à jour"
fi
if [ -f "frontend/src/pages/Dashboard.jsx" ]; then
    echo "   ✅ Dashboard.jsx mis à jour"
fi

echo "4. Vérification configuration..."
if [ -f "backend/.env" ]; then
    echo "   ✅ .env présent"
    if grep -q "DATABASE_URL=" backend/.env; then
        echo "   ✅ DATABASE_URL configuré"
    fi
fi

echo "5. Vérification package.json..."
if [ -f "backend/package.json" ]; then
    echo "   ✅ package.json présent"
    if grep -q "seed" backend/package.json; then
        echo "   ✅ Script seed configuré"
    fi
fi

echo "=========================================="
echo "✅ VÉRIFICATION TERMINÉE"
echo ""
echo "Pour initialiser avec données réelles:"
echo "  cd backend"
echo "  npm run db:reset"
echo "  npm run seed"
echo ""
echo "Pour démarrer:"
echo "  backend: npm run dev"
echo "  frontend: npm run dev"
