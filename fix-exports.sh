#!/bin/bash

echo "=== CORRECTION DES EXPORTS DEFAULT ==="

fix_export() {
  local file=$1
  if [ -f "$file" ]; then
    # Obtenir le nom du composant
    component_name=$(basename "$file" .jsx)
    
    # Vérifier si l'export default existe
    if ! grep -q "export default $component_name" "$file" && ! grep -q "export default" "$file"; then
      echo "��� Ajout export default dans $file"
      
      # Vérifier si le composant est défini avec export default function ou const
      if grep -q "export default function" "$file"; then
        echo "  → Déjà export default function"
      elif grep -q "const $component_name = " "$file"; then
        # Ajouter export default après la définition du composant
        sed -i "/const $component_name = /,/^}/!b; /^}/a\\
export default $component_name;" "$file"
      elif grep -q "function $component_name" "$file"; then
        # Ajouter export default après la fonction
        sed -i "/function $component_name/,/^}/!b; /^}/a\\
export default $component_name;" "$file"
      else
        # Ajouter à la fin du fichier
        echo "" >> "$file"
        echo "export default $component_name;" >> "$file"
      fi
    fi
  fi
}

# Corriger tous les fichiers .jsx
find src -name "*.jsx" -type f | while read file; do
  fix_export "$file"
done

echo "✅ Correction terminée"
