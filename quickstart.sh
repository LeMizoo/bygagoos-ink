#!/bin/bash
# XAMPP Quick Start Script

set -e

echo "
╔════════════════════════════════════════════╗
║   ByGagoos-Ink XAMPP - Quick Start         ║
╚════════════════════════════════════════════╝
"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${BLUE}Vérification des prérequis...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js non trouvé${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm non trouvé${NC}"
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo -e "${YELLOW}⚠️  git non trouvé (optionnel)${NC}"
fi

echo -e "${GREEN}✅ Prérequis OK${NC}\n"

# Show menu
echo -e "${BLUE}Options disponibles:${NC}"
echo ""
echo "1. Setup complet (build + copie + config)"
echo "2. Build frontend uniquement"
echo "3. Démarrer backend"
echo "4. Tests de connexion"
echo "5. Ouvrir Prisma Studio"
echo "6. Quitter"
echo ""

read -p "Sélectionner une option (1-6): " choice

case $choice in
    1)
        echo -e "\n${YELLOW}🔧 Setup complet...${NC}"
        echo -e "${BLUE}Building frontend...${NC}"
        cd frontend
        npm install
        npm run build
        echo -e "${GREEN}✅ Frontend buildé${NC}\n"
        
        echo -e "${BLUE}Copie vers XAMPP...${NC}"
        # Adapter le chemin selon votre OS
        cp -r dist/* /c/xampp/htdocs/bygagoos-ink/ 2>/dev/null || echo "⚠️  Impossible de copier vers XAMPP"
        echo -e "${GREEN}✅ Fichiers copiés${NC}\n"
        
        echo -e "${BLUE}Configuration backend...${NC}"
        cd ../backend
        if [ ! -f ".env" ]; then
            cp .env.production .env
            echo -e "${GREEN}✅ .env configuré${NC}"
        fi
        npm install
        echo -e "${GREEN}✅ Backend configuré${NC}\n"
        
        echo -e "${GREEN}🎉 Setup complet!${NC}"
        echo -e "${BLUE}Prochaine étape:${NC} npm start (backend)"
        ;;
    
    2)
        echo -e "\n${YELLOW}🏗️  Build frontend...${NC}"
        cd frontend
        npm install
        npm run build
        echo -e "${GREEN}✅ Build complété${NC}"
        echo -e "${BLUE}Fichiers dans:${NC} frontend/dist/"
        ;;
    
    3)
        echo -e "\n${YELLOW}🚀 Démarrage backend...${NC}"
        cd backend
        if [ ! -d "node_modules" ]; then
            echo -e "${BLUE}Installation des dépendances...${NC}"
            npm install
        fi
        echo -e "${GREEN}✅ Démarrage...${NC}\n"
        npm start
        ;;
    
    4)
        echo -e "\n${YELLOW}🧪 Tests de connexion...${NC}"
        
        echo -e "${BLUE}1. API Health:${NC}"
        curl -s http://localhost:3001/api/health | python3 -m json.tool 2>/dev/null || echo "❌ Backend non accessible"
        echo ""
        
        echo -e "${BLUE}2. Frontend:${NC}"
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/)
        if [ "$HTTP_CODE" = "200" ]; then
            echo -e "${GREEN}✅ Frontend accessible (HTTP $HTTP_CODE)${NC}"
        else
            echo -e "${RED}❌ Frontend non accessible (HTTP $HTTP_CODE)${NC}"
        fi
        echo ""
        
        echo -e "${BLUE}3. PostgreSQL:${NC}"
        if psql -U bygagoos_app -d bygagoos_ink -c "SELECT 1" &> /dev/null; then
            echo -e "${GREEN}✅ PostgreSQL connecté${NC}"
        else
            echo -e "${YELLOW}⚠️  PostgreSQL non connecté${NC}"
        fi
        echo ""
        
        echo -e "${BLUE}4. URLs d'accès:${NC}"
        echo -e "   Frontend: ${GREEN}http://localhost${NC}"
        echo -e "   Backend:  ${GREEN}http://localhost:3001${NC}"
        echo -e "   XAMPP:    ${GREEN}http://localhost/phpmyadmin${NC}"
        ;;
    
    5)
        echo -e "\n${YELLOW}📊 Ouverture Prisma Studio...${NC}"
        cd backend
        npm run prisma:studio
        ;;
    
    6)
        echo -e "\n${BLUE}Au revoir!${NC}"
        exit 0
        ;;
    
    *)
        echo -e "${RED}❌ Option invalide${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${BLUE}Documentation:${NC}"
echo "  - XAMPP_SETUP.md"
echo "  - XAMPP_CHECKLIST.md"
echo "  - XAMPP_TROUBLESHOOTING.md"
echo ""
