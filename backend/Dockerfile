# Backend Dockerfile avec support images
FROM node:18-alpine

WORKDIR /app

# Install system dependencies for image processing
RUN apk add --no-cache \
    imagemagick \
    graphicsmagick \
    curl

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application code
COPY . .

# Create directories for images
RUN mkdir -p /app/public/images/profiles && \
    mkdir -p /app/uploads && \
    chown -R node:node /app

# Switch to non-root user
USER node

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

# Start application
CMD ["node", "app.js"]