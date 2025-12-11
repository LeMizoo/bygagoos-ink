#!/bin/bash

# ============================================
# ByGagoos-Ink XAMPP Setup Script (Bash)
# ============================================

set -e

echo ""
echo "===================================="
echo "    ByGagoos-Ink XAMPP Setup"
echo "===================================="
echo ""

# Define paths
XAMPP_PATH="/c/xampp"
HTDOCS_PATH="$XAMPP_PATH/htdocs/bygagoos-ink"
BACKEND_PATH="d/ByGagoos-Ink/backend"
FRONTEND_PATH="d/ByGagoos-Ink/frontend"
CONFIG_PATH="d/ByGagoos-Ink/config"

echo "✅ Chemins définis:"
echo "   - XAMPP: $XAMPP_PATH"
echo "   - Frontend dist: $HTDOCS_PATH"
echo "   - Backend: $BACKEND_PATH"
echo ""

# Step 1: Create directories
echo "📁 Étape 1: Création des répertoires..."
mkdir -p "$HTDOCS_PATH"
echo "✅ Répertoires créés"
echo ""

# Step 2: Build frontend
echo "🏗️  Étape 2: Build du frontend..."
cd "$FRONTEND_PATH"

if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

echo "🔨 Build en cours..."
npm run build
echo "✅ Build complété"
echo ""

# Step 3: Copy frontend to htdocs
echo "📋 Étape 3: Copie du frontend vers XAMPP..."
rm -rf "$HTDOCS_PATH"/*
cp -r "$FRONTEND_PATH/dist"/* "$HTDOCS_PATH/"
echo "✅ Frontend copié avec succès"
echo ""

# Step 4: Setup backend
echo "🔧 Étape 4: Configuration du backend..."
cd "$BACKEND_PATH"

if [ ! -f ".env.production" ]; then
    echo "📝 Création du fichier .env.production..."
    cp "$CONFIG_PATH/.env.production" ".env.production"
    echo "✅ .env.production créé"
    echo "⚠️  N'oubliez pas de configurer les variables sensibles!"
fi

if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances backend..."
    npm install
fi
echo ""

# Step 5: Summary
echo ""
echo "===================================="
echo "    ✅ Setup terminé!"
echo "===================================="
echo ""
echo "📌 Prochaines étapes:"
echo ""
echo "1️⃣  Configuration manuelle Apache:"
echo "    - Éditer: $XAMPP_PATH/apache/conf/extra/httpd-vhosts.conf"
echo "    - Ajouter la configuration VirtualHost"
echo "    - Source: $CONFIG_PATH/apache-vhosts.conf"
echo ""
echo "2️⃣  Démarrer XAMPP:"
echo "    - Apache: XAMPP Control Panel"
echo "    - MySQL/PostgreSQL: XAMPP Control Panel"
echo ""
echo "3️⃣  Démarrer le backend Node.js:"
echo "    - Terminal: cd $BACKEND_PATH && npm start"
echo ""
echo "4️⃣  Accéder à l'application:"
echo "    - http://bygagoos-ink.local"
echo "    - http://localhost/bygagoos-ink/"
echo ""
echo "📖 Documentation: d/ByGagoos-Ink/XAMPP_SETUP.md"
echo ""
