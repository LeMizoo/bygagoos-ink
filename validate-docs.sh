#!/bin/bash
# validate-docs.sh - Script interactif pour valider la documentation ByGagoos-Ink

echo "=== Validation des fichiers .md pour ByGagoos-Ink ==="
echo "Réponds par 'o' (oui) ou 'n' (non) à chaque question."
echo

# Tableau pour stocker les résultats
declare -A results

# Fonction pour poser une question
ask_question() {
  local key=$1
  local question=$2
  read -p "$question (o/n): " answer
  if [[ $answer == "o" ]]; then
    results[$key]="✅"
  else
    results[$key]="❌"
  fi
}

# README.md
ask_question "README-projet" "README.md présente clairement le projet ?"
ask_question "README-fonctions" "README.md liste les fonctionnalités principales ?"
ask_question "README-tech" "README.md décrit les technologies utilisées ?"
ask_question "README-demo" "README.md contient les liens vers la démo en ligne ?"

# PROJECT_STRUCTURE.md
ask_question "STRUCT-backend" "PROJECT_STRUCTURE.md décrit l’architecture backend ?"
ask_question "STRUCT-frontend" "PROJECT_STRUCTURE.md décrit l’architecture frontend ?"
ask_question "STRUCT-config" "PROJECT_STRUCTURE.md mentionne les fichiers de configuration ?"

# DEMARRAGE_RAPIDE.md
ask_question "QUICK-clone" "DEMARRAGE_RAPIDE.md explique comment cloner le projet ?"
ask_question "QUICK-install" "DEMARRAGE_RAPIDE.md donne les commandes pour installer les dépendances ?"
ask_question "QUICK-run" "DEMARRAGE_RAPIDE.md indique comment lancer backend et frontend ?"

# DEPLOYMENT_READY.md
ask_question "DEPLOY-env" "DEPLOYMENT_READY.md liste les prérequis (.env.production, DB) ?"
ask_question "DEPLOY-docker" "DEPLOYMENT_READY.md donne la commande Docker pour déploiement prod ?"
ask_question "DEPLOY-checklist" "DEPLOYMENT_READY.md fournit une checklist de validation ?"

# INDEX.md
ask_question "INDEX-links" "INDEX.md contient les liens vers tous les autres .md ?"

# TESTING.md
ask_question "TEST-backend" "TESTING.md explique les tests backend (Jest, Supertest) ?"
ask_question "TEST-frontend" "TESTING.md explique les tests frontend (Cypress) ?"
ask_question "TEST-ci" "TESTING.md mentionne CI/CD (GitHub Actions) ?"

# USERS_MANAGEMENT.md
ask_question "USERS-roles" "USERS_MANAGEMENT.md liste les rôles familiaux ?"
ask_question "USERS-auth" "USERS_MANAGEMENT.md explique l’authentification (JWT + bcryptjs) ?"
ask_question "USERS-api" "USERS_MANAGEMENT.md fournit les endpoints API ?"

echo
echo "=== Rapport de Validation ==="
for key in "${!results[@]}"; do
  echo "$key : ${results[$key]}"
done

echo "=== Validation terminée ✅ ==="
