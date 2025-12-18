#!/bin/bash
echo "Ì¥Ñ Mise √† jour des variables d'environnement..."

# Backend
cd backend
echo "PORT=3002" > .env.development
echo "FRONTEND_URL=http://localhost:5173" >> .env.development
echo "‚úÖ Backend configur√©"

# Frontend
cd ../frontend
echo "VITE_API_URL=http://localhost:3002" > .env.development
echo "NODE_ENV=development" >> .env.development
echo "‚úÖ Frontend configur√©"

echo "Ìæâ Configuration termin√©e !"
echo "Ì¥ó Backend: http://localhost:3002"
echo "Ìºç Frontend: http://localhost:5173"
