#!/bin/bash
# cleanup.sh - Script de nettoyage pour ByGagoos-ink
# ⚠️ Assurez-vous d'avoir un backup avant d'exécuter ce script !

echo "=== Nettoyage du projet ByGagoos-ink ==="

# Supprimer les dossiers générés automatiquement
rm -rf node_modules
rm -rf backend/node_modules
rm -rf frontend/node_modules
rm -rf frontend/dist
rm -rf frontend/build

# Supprimer les fichiers de backup et temporaires
find . -type f -name "*.backup" -delete
find . -type f -name "*.txt" -delete
find . -type f -name "*.log" -delete

# Supprimer les binaires et archives inutiles
rm -f nssm.zip
rm -f nssm/win32/nssm.exe
rm -f nssm/win64/nssm.exe

# Supprimer les docs obsolètes (XAMPP, anciens guides)
rm -f README_XAMPP.md
rm -f XAMPP_CHECKLIST.md
rm -f XAMPP_SETUP.md
rm -f XAMPP_SETUP_SUMMARY.md
rm -f XAMPP_TROUBLESHOOTING.md
rm -f INSTALLATION_XAMPP_MANUEL.md

# Supprimer les scripts redondants liés à XAMPP
rm -f setup-xampp*.bat
rm -f setup-xampp*.ps1
rm -f setup-xampp*.sh
rm -f start-xampp*.bat

# Supprimer les variantes inutiles de docker-compose
rm -f docker-compose.override.yml
rm -f docker-compose.override.prod.yml
rm -f docker-compose.quick.yml
rm -f docker-compose.test.yml
rm -f docker-compose.wsl.yml
rm -f docker-compose.yml.backup

echo "=== Nettoyage terminé ✅ ==="
