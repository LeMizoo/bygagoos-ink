// frontend/scripts/copy-images.js
const fs = require('fs');
const path = require('path');

console.log('📁 Copie des images...');

// Source : backend/public
const backendDir = path.join(__dirname, '../../backend/public');
// Destination : frontend/public
const frontendDir = path.join(__dirname, '../public');

// Créer les dossiers nécessaires
const dirs = ['', '/profiles', '/production'];
dirs.forEach(dir => {
  const fullPath = path.join(frontendDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Copier les images
function copyImages(source, destination) {
  if (!fs.existsSync(source)) {
    console.log(`⚠️ Source non trouvée: ${source}`);
    return;
  }

  const files = fs.readdirSync(source);
  
  files.forEach(file => {
    const srcPath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    if (fs.statSync(srcPath).isFile() && 
        ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].some(ext => file.toLowerCase().endsWith(ext))) {
      
      fs.copyFileSync(srcPath, destPath);
      console.log(`✅ Copié: ${file}`);
    }
  });
}

// Copier depuis backend
copyImages(path.join(backendDir, 'images'), frontendDir);
copyImages(path.join(backendDir, 'profiles'), path.join(frontendDir, 'profiles'));
copyImages(path.join(backendDir, 'production'), path.join(frontendDir, 'production'));

// Copier depuis src/assets aussi
const assetsDir = path.join(__dirname, '../src/assets');
if (fs.existsSync(assetsDir)) {
  copyImages(path.join(assetsDir, 'images'), frontendDir);
  copyImages(path.join(assetsDir, 'profiles'), path.join(frontendDir, 'profiles'));
  copyImages(path.join(assetsDir, 'production'), path.join(frontendDir, 'production'));
}

// Créer vite.svg si manquant
const viteSvgPath = path.join(frontendDir, 'vite.svg');
if (!fs.existsSync(viteSvgPath)) {
  const viteSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <path d="M29.883 6.146L17.622 28.496c-.455.787-1.588.787-2.043 0L2.117 6.146C1.623 5.25 2.527 4.225 3.5 4.225h24.999c.974 0 1.877 1.025 1.384 1.921z" fill="url(#grad)"/>
    <path d="M22 4.225L16 14.992l-3-5.168-7.5.006c-.974 0-1.877 1.025-1.384 1.921l4 6.932L15.293 27c.455.787 1.588.787 2.043 0l3.357-5.812.002-.004 4-6.928c.493-.896-.41-1.921-1.384-1.921l-7.5-.006 3-5.168L22 4.225z" fill="#fff" fill-opacity=".8"/>
    <defs>
      <linearGradient id="grad" x1="16" y1="4.225" x2="16" y2="27.779">
        <stop stop-color="#41D1FF"/>
        <stop offset="1" stop-color="#BD34FE"/>
      </linearGradient>
    </defs>
  </svg>`;
  
  fs.writeFileSync(viteSvgPath, viteSvg);
  console.log('✅ vite.svg créé');
}

console.log('🎉 Copie terminée !');