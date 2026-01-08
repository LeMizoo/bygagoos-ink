#!/bin/bash
echo "Correction des imports dans le dossier settings..."
cd src/pages/admin/settings/

for file in *.jsx; do
  if [ -f "$file" ]; then
    echo "Vérification de $file..."
    sed -i 's|from "\.\./components/layout/|from "../../../components/layout/|g' "$file"
    sed -i 's|from "\./components/layout/|from "../../../components/layout/|g' "$file"
  fi
done

echo "Correction terminée !"
