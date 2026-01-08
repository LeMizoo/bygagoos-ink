#!/bin/bash
echo "í´ VÃ‰RIFICATION DES FICHIERS DANS public/"
echo "========================================="

cd public

echo ""
echo "í³„ Fichiers Ã  la racine:"
ls -la *.jpg *.png *.svg *.ico 2>/dev/null || echo "Aucun fichier image trouvÃ©"

echo ""
echo "í³ Dossier profiles/:"
if [ -d "profiles" ]; then
  ls -la profiles/*.jpg profiles/*.svg 2>/dev/null || echo "Aucun fichier dans profiles/"
else
  echo "âŒ Dossier profiles/ n'existe pas"
fi

echo ""
echo "í³ Dossier production/:"
if [ -d "production" ]; then
  ls -la production/*.jpg 2>/dev/null || echo "Aucun fichier dans production/"
else
  echo "âŒ Dossier production/ n'existe pas"
fi

echo ""
echo "í³Š Taille des fichiers:"
find . -name "*.jpg" -o -name "*.png" -o -name "*.svg" 2>/dev/null | while read file; do
  size=$(du -h "$file" | cut -f1)
  echo "  $file: $size"
done

echo ""
echo "âœ… VÃ©rification terminÃ©e"
