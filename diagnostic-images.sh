#!/bin/bash

echo "🔍 DIAGNOSTIC COMPLET DES IMAGES BYGAGOOS-INK"
echo "=============================================="
echo ""

# 1. Vérifier l'emplacement actuel
echo "1. 📍 Emplacement actuel:"
pwd
echo ""

# 2. Vérifier Docker
echo "2. 🐳 État de Docker:"
docker --version 2>/dev/null && echo "✅ Docker installé" || echo "❌ Docker non installé"
docker-compose ps 2>/dev/null | grep backend && echo "✅ Backend en cours d'exécution" || echo "❌ Backend non démarré"
echo ""

# 3. Vérifier la structure locale
echo "3. 📁 Structure locale:"
if [ -d "backend" ]; then
    echo "✅ Dossier backend trouvé"
    
    # Vérifier public/images
    if [ -d "backend/public/images" ]; then
        echo "   ✅ Dossier backend/public/images existe"
        echo "   📊 Contenu:"
        ls -la backend/public/images/
        
        if [ -d "backend/public/images/profiles" ]; then
            echo "   ✅ Dossier profiles existe"
            echo "   👤 Photos de profil:"
            ls -la backend/public/images/profiles/ || echo "   ❌ Erreur d'accès"
        else
            echo "   ❌ Dossier profiles manquant"
        fi
    else
        echo "   ❌ Dossier backend/public/images manquant"
    fi
else
    echo "❌ Dossier backend introuvable"
fi
echo ""

# 4. Tester le backend
echo "4. 🌐 Test du backend:"
if command -v curl &> /dev/null; then
    echo "   🔗 Test de santé:"
    curl -s http://localhost:5000/health | grep -o '"status":"[^"]*"' || echo "   ❌ Backend inaccessible"
    
    echo "   🖼️  Test des images:"
    curl -s http://localhost:5000/api/v1/images/test | python3 -m json.tool 2>/dev/null || curl -s http://localhost:5000/api/v1/images/test
else
    echo "   ℹ️  curl non disponible pour tester"
fi
echo ""

# 5. Vérifier depuis le conteneur
echo "5. 🐳 Vue depuis le conteneur:"
if docker ps | grep -q bygagoos-backend; then
    echo "   Conteneur backend actif"
    echo "   Structure dans /app/public/images/:"
    docker exec bygagoos-backend ls -la /app/public/images/ 2>/dev/null || echo "   ❌ Impossible d'accéder au conteneur"
    
    echo "   Test de fichier depuis conteneur:"
    docker exec bygagoos-backend test -f /app/public/images/logo.png && echo "   ✅ logo.png existe" || echo "   ❌ logo.png manquant"
else
    echo "   ❌ Conteneur backend non actif"
fi
echo ""

# 6. Résumé et solutions
echo "6. 💡 RÉSUMÉ ET SOLUTIONS"
echo "=========================="
echo ""
echo "Si les images sont manquantes, exécutez:"
echo ""
echo "  🔧 Créer des images de test:"
echo "  cd backend && mkdir -p public/images/profiles"
echo "  # Puis exécutez create-test-images.sh"
echo ""
echo "  🔄 Redémarrer le backend:"
echo "  docker-compose restart backend"
echo ""
echo "  📊 Vérifier après correction:"
echo "  curl http://localhost:5000/api/v1/images/test"
echo ""
echo "=============================================="