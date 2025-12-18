#!/bin/bash
echo "��� Nettoyage Docker..."

# Arrêter tous les conteneurs ByGagoos
docker-compose down

# Supprimer les conteneurs orphelins
docker rm -f $(docker ps -a -q --filter "name=bygagoos") 2>/dev/null || true

# Supprimer les images non utilisées
docker image prune -f

# Supprimer les volumes non utilisés
docker volume prune -f

# Supprimer le réseau
docker network rm bygagoos-ink_bygagoos-network 2>/dev/null || true

echo "✅ Nettoyage terminé !"
