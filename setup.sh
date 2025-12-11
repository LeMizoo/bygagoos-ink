#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}================================${NC}"
echo -e "${BLUE}🚀 Installation de ByGagoos-Ink${NC}"
echo -e "${CYAN}================================${NC}"

# Check operating system
OS="$(uname -s)"
echo -e "${YELLOW}📋 Système détecté : ${OS}${NC}"

# Function to check Docker status
check_docker() {
    echo -e "${YELLOW}🔍 Vérification de Docker...${NC}"
    
    case "$OS" in
        Linux*)
            if command -v docker &> /dev/null; then
                if systemctl is-active --quiet docker 2>/dev/null || sudo systemctl is-active --quiet docker 2>/dev/null; then
                    echo -e "${GREEN}✅ Docker est démarré (Linux)${NC}"
                    return 0
                else
                    echo -e "${YELLOW}⚠️  Docker installé mais non démarré${NC}"
                    return 1
                fi
            else
                echo -e "${RED}❌ Docker n'est pas installé${NC}"
                return 1
            fi
            ;;
        MINGW*|MSYS*|CYGWIN*)
            # Windows Git Bash/Cygwin
            if command -v docker &> /dev/null; then
                if docker info > /dev/null 2>&1; then
                    echo -e "${GREEN}✅ Docker est démarré (Windows)${NC}"
                    return 0
                else
                    echo -e "${YELLOW}⚠️  Docker installé mais non démarré sur Windows${NC}"
                    echo ""
                    echo -e "${CYAN}📋 Pour démarrer Docker Desktop sur Windows :${NC}"
                    echo "1. Ouvrez le menu Démarrer"
                    echo "2. Recherchez 'Docker Desktop'"
                    echo "3. Cliquez pour l'ouvrir"
                    echo "4. Attendez que l'icône devienne blanche"
                    echo "5. Relancez ce script"
                    echo ""
                    return 1
                fi
            else
                echo -e "${RED}❌ Docker n'est pas installé sur Windows${NC}"
                echo ""
                echo -e "${CYAN}📋 Pour installer Docker Desktop :${NC}"
                echo "1. Téléchargez depuis : https://www.docker.com/products/docker-desktop/"
                echo "2. Installez Docker Desktop"
                echo "3. Redémarrez votre ordinateur"
                echo "4. Lancez Docker Desktop"
                echo ""
                return 1
            fi
            ;;
        Darwin*)
            # macOS
            if command -v docker &> /dev/null; then
                if docker info > /dev/null 2>&1; then
                    echo -e "${GREEN}✅ Docker est démarré (macOS)${NC}"
                    return 0
                else
                    echo -e "${YELLOW}⚠️  Docker installé mais non démarré sur macOS${NC}"
                    echo -e "${CYAN}📋 Lancez Docker Desktop depuis Applications${NC}"
                    return 1
                fi
            else
                echo -e "${RED}❌ Docker n'est pas installé sur macOS${NC}"
                return 1
            fi
            ;;
        *)
            echo -e "${YELLOW}⚠️  Système non reconnu : ${OS}${NC}"
            return 1
            ;;
    esac
}

# Function to start Docker on Windows
start_docker_windows() {
    echo -e "${YELLOW}🔄 Tentative de démarrage de Docker sur Windows...${NC}"
    
    # Try different methods to start Docker
    if [[ -f "/c/Program Files/Docker/Docker/Docker Desktop.exe" ]]; then
        echo -e "${CYAN}📦 Lancement de Docker Desktop...${NC}"
        start "" "/c/Program Files/Docker/Docker/Docker Desktop.exe" &
    elif [[ -f "/d/Program Files/Docker/Docker/Docker Desktop.exe" ]]; then
        echo -e "${CYAN}📦 Lancement de Docker Desktop...${NC}"
        start "" "/d/Program Files/Docker/Docker/Docker Desktop.exe" &
    else
        echo -e "${RED}❌ Docker Desktop.exe non trouvé${NC}"
        echo -e "${YELLOW}🔍 Recherche de Docker Desktop...${NC}"
        find /c -name "Docker Desktop.exe" 2>/dev/null | head -1
        return 1
    fi
    
    echo -e "${YELLOW}⏳ Attente du démarrage de Docker (30 secondes)...${NC}"
    sleep 30
    
    if docker info > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Docker démarré avec succès !${NC}"
        return 0
    else
        echo -e "${RED}❌ Docker n'a pas démarré correctement${NC}"
        echo -e "${YELLOW}⚠️  Veuillez démarrer Docker Desktop manuellement${NC}"
        return 1
    fi
}

# Main installation function
install_bygagoos() {
    # Create necessary directories
    echo -e "${YELLOW}📁 Création des dossiers d'images...${NC}"
    mkdir -p backend/public/images/profiles 2>/dev/null
    mkdir -p backend/uploads 2>/dev/null
    mkdir -p frontend/public/images 2>/dev/null

    # Check for images and create placeholders if missing
    echo -e "${YELLOW}🖼️  Vérification des images...${NC}"

    # Create placeholder logo if missing
    if [ ! -f "backend/public/images/logo.png" ] && [ ! -f "backend/public/images/logo.jpg" ]; then
        echo -e "${YELLOW}⚠️  Logo non trouvé, création d'un logo temporaire...${NC}"
        cat > backend/public/images/logo.svg << 'EOF'
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" rx="20" fill="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"/>
  <text x="100" y="80" font-family="Arial" font-size="40" fill="white" 
        text-anchor="middle" font-weight="bold">BG</text>
  <text x="100" y="130" font-family="Arial" font-size="16" fill="white" 
        text-anchor="middle">Ink</text>
</svg>
EOF
        echo -e "${GREEN}✅ Logo temporaire créé${NC}"
        
        # Convert SVG to PNG if possible
        if command -v convert &> /dev/null; then
            convert backend/public/images/logo.svg backend/public/images/logo.png 2>/dev/null
            echo -e "${GREEN}✅ Logo PNG généré${NC}"
        fi
    fi

    # Create placeholder profile images if missing
    PROFILES=("tovoniaina" "volatiana" "miantsatiana" "tia-faniry")
    COLORS=("#7C3AED" "#EC4899" "#10B981" "#3B82F6")

    for i in "${!PROFILES[@]}"; do
        PROFILE="${PROFILES[$i]}"
        COLOR="${COLORS[$i]}"
        
        if [ ! -f "backend/public/images/profiles/${PROFILE}.jpg" ] && 
           [ ! -f "backend/public/images/profiles/${PROFILE}.png" ] &&
           [ ! -f "backend/public/images/profiles/${PROFILE}.jpeg" ]; then
            echo -e "${YELLOW}⚠️  Photo de ${PROFILE} non trouvée, création temporaire...${NC}"
            cat > "backend/public/images/profiles/${PROFILE}.svg" << EOF
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${COLOR};stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:${COLOR};stop-opacity:0.4" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#grad${i})"/>
  <circle cx="200" cy="150" r="80" fill="white" opacity="0.9"/>
  <circle cx="200" cy="300" r="100" fill="white" opacity="0.9"/>
  <text x="200" y="380" font-family="Arial" font-size="24" fill="white" 
        text-anchor="middle" font-weight="bold">${PROFILE^}</text>
</svg>
EOF
            echo -e "${GREEN}✅ Image temporaire créée pour ${PROFILE}${NC}"
        fi
    done

    # Clean up existing containers
    echo -e "${YELLOW}🧹 Nettoyage des conteneurs existants...${NC}"
    docker-compose down 2>/dev/null || echo -e "${YELLOW}⚠️  Aucun conteneur à nettoyer${NC}"

    # Build and start
    echo -e "${YELLOW}🔨 Construction des images...${NC}"
    if docker-compose build; then
        echo -e "${GREEN}✅ Images construites avec succès${NC}"
    else
        echo -e "${RED}❌ Erreur lors de la construction des images${NC}"
        exit 1
    fi

    echo -e "${YELLOW}🚀 Démarrage des services...${NC}"
    if docker-compose up -d; then
        echo -e "${GREEN}✅ Services démarrés avec succès${NC}"
    else
        echo -e "${RED}❌ Erreur lors du démarrage des services${NC}"
        exit 1
    fi

    # Wait for services to start
    echo -e "${YELLOW}⏳ Attente du démarrage des services (20 secondes)...${NC}"
    sleep 20

    # Check services
    echo -e "${GREEN}📊 Vérification des services:${NC}"
    docker-compose ps

    # Test backend
    echo -e "${YELLOW}🧪 Test du backend...${NC}"
    MAX_RETRIES=5
    RETRY_COUNT=0
    BACKEND_READY=false

    while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
        if curl -s http://localhost:5000/health > /dev/null 2>&1; then
            BACKEND_READY=true
            echo -e "${GREEN}✅ Backend accessible${NC}"
            break
        fi
        RETRY_COUNT=$((RETRY_COUNT + 1))
        echo -e "${YELLOW}⏳ Tentative ${RETRY_COUNT}/${MAX_RETRIES}...${NC}"
        sleep 5
    done

    if [ "$BACKEND_READY" = true ]; then
        echo -e "${GREEN}✅ Backend fonctionne sur http://localhost:5000${NC}"
        
        # Test images endpoint
        echo -e "${YELLOW}📸 Test des images...${NC}"
        if curl -s http://localhost:5000/api/v1/images/test > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Service d'images fonctionnel${NC}"
        else
            echo -e "${YELLOW}⚠️  Service d'images non accessible${NC}"
        fi
    else
        echo -e "${RED}❌ Backend non accessible après ${MAX_RETRIES} tentatives${NC}"
        echo -e "${YELLOW}📋 Affichage des logs du backend...${NC}"
        docker-compose logs backend --tail=20 2>/dev/null || echo -e "${YELLOW}⚠️  Impossible de récupérer les logs${NC}"
    fi

    # Display access information
    echo -e "${CYAN}================================${NC}"
    echo -e "${GREEN}🎉 Installation terminée !${NC}"
    echo ""
    echo -e "${BLUE}🌐 Accès aux services:${NC}"
    echo -e "  Frontend: ${GREEN}http://localhost:3000${NC}"
    echo -e "  Backend:  ${GREEN}http://localhost:5000${NC}"
    echo -e "  API Health: ${GREEN}http://localhost:5000/health${NC}"
    echo -e "  API Family: ${GREEN}http://localhost:5000/api/v1/family${NC}"
    echo -e "  Test Images: ${GREEN}http://localhost:5000/api/v1/images/test${NC}"
    echo ""
    echo -e "${YELLOW}📁 Structure des images:${NC}"
    echo -e "  Logo: ${GREEN}backend/public/images/logo.png${NC}"
    echo -e "  Photos: ${GREEN}backend/public/images/profiles/*.jpg${NC}"
    echo ""
    echo -e "${YELLOW}📋 Commandes utiles:${NC}"
    echo -e "  Arrêter: ${GREEN}docker-compose down${NC}"
    echo -e "  Voir les logs: ${GREEN}docker-compose logs -f${NC}"
    echo -e "  Redémarrer: ${GREEN}docker-compose restart${NC}"
    echo -e "  Mettre à jour: ${GREEN}./setup.sh${NC}"
    echo -e "${CYAN}================================${NC}"
    echo -e "${GREEN}📸 Pour ajouter vos images:${NC}"
    echo "1. Placez votre logo dans backend/public/images/logo.png"
    echo "2. Placez les photos dans backend/public/images/profiles/"
    echo "3. Redémarrez: docker-compose restart backend"
    echo -e "${CYAN}================================${NC}"
}

# Main script execution
main() {
    # Check Docker status
    if check_docker; then
        # Docker is running, proceed with installation
        install_bygagoos
    else
        # Docker not running
        if [[ "$OS" == MINGW* ]] || [[ "$OS" == MSYS* ]] || [[ "$OS" == CYGWIN* ]]; then
            echo ""
            echo -e "${CYAN}🤔 Que voulez-vous faire ?${NC}"
            echo "1) Démarrer Docker Desktop automatiquement"
            echo "2) Ouvrir Docker Desktop manuellement"
            echo "3) Quitter"
            echo ""
            read -p "Votre choix (1-3): " choice
            
            case $choice in
                1)
                    if start_docker_windows; then
                        install_bygagoos
                    else
                        echo -e "${RED}❌ Impossible de démarrer Docker${NC}"
                        exit 1
                    fi
                    ;;
                2)
                    echo -e "${YELLOW}📋 Instructions pour démarrer Docker Desktop manuellement :${NC}"
                    echo "1. Ouvrez le menu Démarrer de Windows"
                    echo "2. Recherchez 'Docker Desktop'"
                    echo "3. Cliquez pour l'ouvrir"
                    echo "4. Attendez que l'icône dans la barre des tâches devienne blanche"
                    echo "5. Revenez dans ce terminal et relancez : ./setup.sh"
                    echo ""
                    echo -e "${CYAN}⏳ Appuyez sur Entrée pour quitter...${NC}"
                    read
                    exit 0
                    ;;
                3|*)
                    echo -e "${YELLOW}👋 Au revoir !${NC}"
                    exit 0
                    ;;
            esac
        else
            echo -e "${RED}❌ Veuillez démarrer Docker manuellement et relancer le script${NC}"
            exit 1
        fi
    fi
}

# Run main function
main