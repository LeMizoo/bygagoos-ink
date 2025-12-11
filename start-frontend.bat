@echo off
cd /d d:\ByGagoos-Ink\frontend
echo Installing dependencies if needed...
if not exist "node_modules" (
  echo npm install
)
echo Starting ByGagoos-Ink Frontend (Vite)...
npm run dev
