FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installer les dépendances
RUN npm ci --only=production

# Copier le code source
COPY . .

# Générer Prisma Client
RUN npx prisma generate

# Exposer le port
EXPOSE 3001

# Commande de démarrage
CMD ["npm", "start"]