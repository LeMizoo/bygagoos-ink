#!/bin/bash

echo "🔧 Correction des images ByGagoos-Ink"
echo "====================================="

# 1. Renommer les images .png en .jpg
echo "1. 📁 Renommage des images..."
cd backend/public/images/profiles

if [ -f "miantsatiana.png" ]; then
    mv miantsatiana.png miantsatiana.jpg
    echo "   ✅ miantsatiana.png → miantsatiana.jpg"
fi

if [ -f "tia-faniry.png" ]; then
    mv tia-faniry.png tia-faniry.jpg
    echo "   ✅ tia-faniry.png → tia-faniry.jpg"
fi

if [ -f "tovoniaina.png" ]; then
    mv tovoniaina.png tovoniaina.jpg
    echo "   ✅ tovoniaina.png → tovoniaina.jpg"
fi

if [ -f "volatiana.png" ]; then
    mv volatiana.png volatiana.jpg
    echo "   ✅ volatiana.png → volatiana.jpg"
fi

cd ../../../..

# 2. Vérifier la structure
echo ""
echo "2. 📊 Structure des images :"
find backend/public -type f

# 3. Démarrer les services manuellement
echo ""
echo "3. 🚀 Démarrer les services manuellement :"
echo ""
echo "   Terminal 1 (Backend):"
echo "   cd /d/ByGagoos-Ink/backend"
echo "   npm install"
echo "   npm start"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   cd /d/ByGagoos-Ink/frontend"
echo "   npm install"
echo "   npm run dev"
echo ""
echo "4. 🌐 Accès :"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo "   Test:     http://localhost:5000/api/v1/images/test"