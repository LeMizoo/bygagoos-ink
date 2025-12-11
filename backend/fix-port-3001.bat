@echo off
echo Ì¥ß Fixing port 3001 for ByGagoos-Ink...

echo.
echo 1. Stopping all Node.js processes...
taskkill /F /IM node.exe 2>nul

echo.
echo 2. Checking port 3001...
netstat -ano | findstr :3001

echo.
echo 3. Starting backend...
cd /d/ByGagoos-Ink/backend
call npm run dev

echo.
echo ‚úÖ Done! Backend should now be running on port 3001
echo Ìºê Open: http://localhost:3001/api/health
