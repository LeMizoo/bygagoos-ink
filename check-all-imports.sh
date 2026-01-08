#!/bin/bash
echo "��� VÉRIFICATION COMPLÈTE DES IMPORTS"
echo "===================================="

# 1. Vérifier ProfilePage.jsx
echo "1. Vérification de ProfilePage.jsx:"
echo "   Chemin: src/pages/admin/profile/ProfilePage.jsx"
if [ -f "src/pages/admin/profile/ProfilePage.jsx" ]; then
    echo "   ✅ Fichier existe"
    echo "   Contenu de l'import AuthContext:"
    grep -n "AuthContext" src/pages/admin/profile/ProfilePage.jsx
    
    # Vérifier le chemin exact
    IMPORT_LINE=$(grep "AuthContext" src/pages/admin/profile/ProfilePage.jsx)
    if echo "$IMPORT_LINE" | grep -q 'from "../context/AuthContext"'; then
        echo "   ❌ IMPORT INCORRECT: 'from \"../context/AuthContext\"'"
        echo "   ✅ DOIT ÊTRE: 'from \"../../context/AuthContext\"'"
    elif echo "$IMPORT_LINE" | grep -q 'from "../../context/AuthContext"'; then
        echo "   ✅ IMPORT CORRECT"
    else
        echo "   ⚠️  Import non reconnu: $IMPORT_LINE"
    fi
else
    echo "   ❌ Fichier manquant!"
fi

echo ""

# 2. Vérifier AuthContext.jsx
echo "2. Vérification de AuthContext.jsx:"
echo "   Chemin: src/context/AuthContext.jsx"
if [ -f "src/context/AuthContext.jsx" ]; then
    echo "   ✅ Fichier existe"
    echo "   Taille: $(wc -l < src/context/AuthContext.jsx) lignes"
    echo "   Exports disponibles:"
    grep -n "export" src/context/AuthContext.jsx | head -5
else
    echo "   ❌ Fichier manquant!"
fi

echo ""

# 3. Vérifier tous les fichiers qui importent AuthContext
echo "3. Tous les fichiers qui importent AuthContext:"
find src -name "*.jsx" -o -name "*.js" | xargs grep -l "AuthContext" 2>/dev/null | while read file; do
    echo "   ��� $file"
    grep -n "AuthContext" "$file" | sed 's/^/     /'
done

echo ""

# 4. Calculer les chemins corrects
echo "4. Calcul des chemins:"
echo "   Structure:"
echo "   src/"
echo "   ├── context/"
echo "   │   └── AuthContext.jsx"
echo "   └── pages/"
echo "       └── admin/"
echo "           └── profile/"
echo "               └── ProfilePage.jsx"
echo ""
echo "   Chemin relatif de ProfilePage.jsx à AuthContext.jsx:"
echo "   ../../context/AuthContext"
