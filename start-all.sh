#!/bin/bash

echo "==================================================="
echo "Ì∫Ä LANCEMENT DE BYGAGOOS-INK - PLATEFORME FAMILIALE"
echo "==================================================="

echo ""
echo "1. Ì∞≥ D√âMARRAGE DES SERVICES DOCKER..."
cd /d/ByGagoos-Ink/backend
docker-compose up -d
sleep 5

echo ""
echo "2. Ì≥ä V√âRIFICATION DES CONTENEURS..."
docker ps --filter name=bygagoos

echo ""
echo "3. Ì∫Ä D√âMARRAGE DU BACKEND..."
echo "   Terminal 1 : cd /d/ByGagoos-Ink/backend && npm start"

echo ""
echo "4. Ìæ® D√âMARRAGE DE PRISMA STUDIO..."
echo "   Terminal 2 : cd /d/ByGagoos-Ink/backend && npx prisma studio"

echo ""
echo "5. Ì≥± D√âMARRAGE DU FRONTEND..."
echo "   Terminal 3 : cd /d/ByGagoos-Ink/frontend && npm run dev"

echo ""
echo "==================================================="
echo "‚úÖ TOUS LES SERVICES SONT PR√äTS √Ä D√âMARRER !"
echo "==================================================="

echo ""
echo "Ìºê URLs D'ACC√àS :"
echo "   Frontend React : http://localhost:5173"
echo "   Backend API    : http://localhost:3001"
echo "   Prisma Studio  : http://localhost:5555"
echo "   PGAdmin        : http://localhost:5050"

echo ""
echo "Ì±®‚ÄçÌ±©‚ÄçÌ±ß‚ÄçÌ±¶ IDENTIFIANTS DE TEST :"
echo "   Email    : tovoniaina.rahendrison@gmail.com"
echo "   Password : ByGagoos2025!"

echo ""
echo "Ì≥ã COMMANDES POUR D√âMARRER :"
echo "   Ouvrez 3 terminaux et ex√©cutez les commandes ci-dessus"
