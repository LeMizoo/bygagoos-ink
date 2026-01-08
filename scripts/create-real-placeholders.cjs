// scripts/create-real-placeholders.cjs
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

console.log('🎨 Création de vrais placeholders pour les images manquantes...\n');

const publicDir = path.join(__dirname, '..', 'public');

// Fonction pour créer une image PNG de placeholder
function createPngPlaceholder(filename, width, height, text) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fond gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Texte
  ctx.fillStyle = 'white';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width/2, height/2);
  
  // Sauvegarder
  const buffer = canvas.toBuffer('image/png');
  const filePath = path.join(publicDir, filename);
  fs.writeFileSync(filePath, buffer);
  console.log(`✅ ${filename} créé (${width}x${height})`);
}

// Fonction pour créer un SVG de placeholder
function createSvgPlaceholder(filename, width, height, text) {
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#gradient)" />
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" 
            fill="white" font-family="Arial, sans-serif" 
            font-size="24" font-weight="bold">
        ${text}
      </text>
      <text x="50%" y="90%" text-anchor="middle" 
            fill="rgba(255,255,255,0.7)" font-family="Arial, sans-serif" 
            font-size="12">
        Placeholder - À remplacer
      </text>
    </svg>
  `;
  
  const filePath = path.join(publicDir, filename);
  fs.writeFileSync(filePath, svgContent.trim());
  console.log(`✅ ${filename} créé (SVG)`);
}

// Créer les placeholders
try {
  // PNGs
  createPngPlaceholder('inauguration.jpg', 1200, 800, 'INAUGURATION ByGagoos');
  createPngPlaceholder('team-family.jpg', 1200, 800, 'ÉQUIPE FAMILIALE');
  createPngPlaceholder('logo.png', 400, 400, 'BYGAGOOS INK');
  createPngPlaceholder('bygagoos-large.png', 800, 400, 'BYGAGOOS INK');
  
  // SVG
  createSvgPlaceholder('logo.svg', 400, 400, 'BYGAGOOS');
  
  console.log('\n🎉 Tous les placeholders ont été créés !');
  console.log('📁 Emplacement :', publicDir);
  
} catch (error) {
  console.error('❌ Erreur:', error.message);
  
  // Solution de secours si canvas n'est pas installé
  console.log('\n🔄 Utilisation de la solution de secours...');
  
  // Créer des fichiers de base
  const basicImages = [
    { name: 'inauguration.jpg', content: 'Placeholder pour inauguration' },
    { name: 'team-family.jpg', content: 'Placeholder pour team family' },
    { name: 'logo.png', content: 'Placeholder pour logo' },
    { name: 'bygagoos-large.png', content: 'Placeholder pour logo large' },
    { name: 'logo.svg', content: '<svg xmlns="http://www.w3.org/2000/svg"><text>BYGAGOOS</text></svg>' }
  ];
  
  basicImages.forEach(img => {
    const filePath = path.join(publicDir, img.name);
    fs.writeFileSync(filePath, img.content);
    console.log(`📝 ${img.name} créé (basic)`);
  });
}