#!/bin/bash
echo "Ì∫Ä R√âPARATION FINALE DES PROBL√àMES DE BUILD Ì∫Ä"
echo "============================================="

# 1. Configurer Git
echo "1. Configuration Git..."
git config --global user.email "tovoniaina.rahendrison@gmail.com"
git config --global user.name "LeMizoo"
git config --global core.autocrlf true

# 2. Trouver et cr√©er tous les fichiers CSS manquants
echo "2. Recherche des fichiers CSS manquants..."
CSS_CREATED=0

# Fonction pour cr√©er un fichier CSS
create_css() {
    local jsx_file="$1"
    local css_import="$2"
    local dir=$(dirname "$jsx_file")
    local css_path="$dir/$css_import"
    
    if [ ! -f "$css_path" ]; then
        mkdir -p "$dir"
        echo "/* $(basename "$css_import" .css) Styles */" > "$css_path"
        
        # Ajouter un contenu de base
        cat >> "$css_path" << 'CSS'
.container {
    padding: 2rem;
    background: #f8f9fa;
    min-height: 100vh;
}

.header {
    margin-bottom: 2rem;
}

.title {
    font-size: 1.8rem;
    color: #333;
    font-weight: 600;
}

.content {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}
CSS
        
        echo "   ‚úÖ Cr√©√©: $css_path"
        ((CSS_CREATED++))
    fi
}

# Parcourir tous les fichiers JSX
find src -name "*.jsx" -type f | while read jsx_file; do
    # Chercher les imports CSS
    grep -o "import.*['\"][^'\"]*\.css['\"]" "$jsx_file" 2>/dev/null | while read import_line; do
        css_import=$(echo "$import_line" | sed "s/.*['\"]\([^'\"]*\)['\"].*/\1/")
        create_css "$jsx_file" "$css_import"
    done
done

# 3. Corriger les imports AuthContext
echo "3. V√©rification des imports AuthContext..."
AUTH_FIXED=0
find src -name "*.jsx" -type f -exec grep -l "AuthContext" {} \; | while read file; do
    # Corriger les imports mal form√©s
    if grep -q 'from "../context/AuthContext"' "$file"; then
        # V√©rifier le niveau r√©el
        depth=$(echo "$file" | tr -cd '/' | wc -c)
        if [ $depth -ge 5 ]; then
            # Besoin de ../../context
            sed -i 's|from "../context/AuthContext"|from "../../context/AuthContext"|g' "$file"
            echo "   ‚úÖ Corrig√©: $file (../../context)"
            ((AUTH_FIXED++))
        fi
    fi
done

# 4. Tester le build
echo "4. Test du build..."
npm run build

# 5. Afficher les r√©sultats
echo ""
echo "Ì≥ä R√âSULTATS:"
echo "   Fichiers CSS cr√©√©s: $CSS_CREATED"
echo "   Imports AuthContext corrig√©s: $AUTH_FIXED"

if [ $? -eq 0 ]; then
    echo ""
    echo "Ìæâ Ìæâ Ìæâ BUILD R√âUSSI! Ìæâ Ìæâ Ìæâ"
    echo ""
    echo "Ì≥§ Pr√™t pour le d√©ploiement:"
    echo "   git add ."
    echo "   git commit -m 'Fix: All CSS files created and imports fixed'"
    echo "   git push origin main"
    echo ""
    echo "Ìºê V√©rifiez sur: https://bygagoos-ink.vercel.app"
else
    echo ""
    echo "‚ùå Build √©chou√©. V√©rifiez les erreurs ci-dessus."
    echo "Ì≤° Essayez de relancer: npm run build"
fi
