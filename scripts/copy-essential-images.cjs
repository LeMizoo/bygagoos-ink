// scripts/copy-essential-images.cjs
const fs = require('fs');
const path = require('path');

console.log('📁 Copie des images essentielles manquantes...\n');

// Chemins
const mainDir = path.join(__dirname, '..', 'main');
const publicDir = path.join(__dirname, '..', 'public');

// Images essentielles qui doivent exister
const essentialImages = [
  'inauguration.jpg',
  'team-family.jpg',
  'logo.png',
  'logo.svg',
  'bygagoos-large.png'
];

// Vérifier et copier chaque image
essentialImages.forEach(image => {
  const sourcePath = path.join(mainDir, image);
  const destPath = path.join(publicDir, image);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✅ ${image} copié`);
  } else {
    console.log(`⚠️ ${image} non trouvé dans main`);
    
    // Créer un fichier placeholder si l'image n'existe pas
    const placeholderContent = image.includes('.svg') 
      ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#667eea"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="white" font-family="Arial">ByGagoos</text></svg>'
      : '';
    
    fs.writeFileSync(destPath, placeholderContent);
    console.log(`   📝 Placeholder créé pour ${image}`);
  }
});

console.log('\n🎉 Opération terminée !');