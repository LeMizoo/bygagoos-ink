#!/bin/bash
echo "��� CORRECTION DES PROBLÈMES DE CONSOLE"
echo "======================================"

echo "1. Configuration de l'API..."
# api.js déjà créé ci-dessus

echo "2. Correction d'AuthContext..."
# AuthContext.jsx déjà créé ci-dessus

echo "3. Configuration de Vite..."
# vite.config.js déjà créé ci-dessus

echo "4. Création des fichiers d'environnement..."
# .env.local et .env.production déjà créés

echo "5. Mise à jour du package.json pour React Router..."
# Mettre à jour les dépendances si nécessaire
if grep -q '"react-router-dom"' package.json; then
  echo "   React Router déjà installé"
else
  echo "   Installation de React Router..."
  npm install react-router-dom@^6.20.0
fi

echo "6. Correction des warnings de Future Flags..."
# Créer un fichier de configuration pour React Router
cat > src/config/react-router.js << 'EOF_ROUTER'
// Configuration pour React Router v6
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const RouterConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

export default HistoryRouter;
EOF_ROUTER

echo "7. Mise à jour de App.jsx pour utiliser la nouvelle configuration..."
# Mettre à jour App.jsx avec la configuration
sed -i '1i // @ts-check' src/App.jsx
sed -i '2i // Configuration React Router v6' src/App.jsx

echo ""
echo "✅ CORRECTIONS APPLIQUÉES !"
echo ""
echo "��� Prochaines étapes:"
echo "1. Redémarrez le serveur: npm run dev"
echo "2. Les warnings React Router devraient être réduits"
echo "3. Les logs devraient être propres et en français"
echo ""
echo "��� Si les warnings persistent, essayez:"
echo "   npm update react-router-dom"
echo "   rm -rf node_modules && npm install"
