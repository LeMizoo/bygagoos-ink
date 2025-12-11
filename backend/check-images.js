// backend/check-images.js
const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('🎨 CRÉATION DES IMAGES BYGAGOOS INK\n');

const baseDir = __dirname;
const publicDir = path.join(baseDir, 'public');
const imagesDir = path.join(publicDir, 'images');
const profilesDir = path.join(publicDir, 'profiles');

// Créer les dossiers
[publicDir, imagesDir, profilesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.log(`📂 Création: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Créer des images simples (fichiers texte avec extension .jpg pour le moment)
console.log('\n🖼️  CRÉATION DES IMAGES:');

const members = [
  { name: 'tovoniaina', color: '#2E7D32', initials: 'TR' },
  { name: 'volatiana', color: '#9C27B0', initials: 'VR' },
  { name: 'miantsatiana', color: '#FF9800', initials: 'MR' },
  { name: 'tia-faniry', color: '#2196F3', initials: 'FT' }
];

// Créer des images placeholder (fichiers texte pour le moment)
members.forEach(member => {
  const filePath = path.join(profilesDir, `${member.name}.jpg`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`   📸 Création placeholder: ${member.name}.jpg`);
    
    // Créer un fichier HTML simple qui affiche une image colorée
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>${member.name}</title>
  <style>
    body { 
      margin: 0; 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      height: 100vh; 
      background: ${member.color};
    }
    .avatar {
      width: 180px;
      height: 180px;
      background: white;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }
    .initials {
      font-size: 48px;
      font-weight: bold;
      color: ${member.color};
      font-family: Arial, sans-serif;
    }
    .name {
      font-size: 14px;
      color: ${member.color};
      font-family: Arial, sans-serif;
      margin-top: 10px;
      opacity: 0.8;
    }
  </style>
</head>
<body>
  <div class="avatar">
    <div class="initials">${member.initials}</div>
    <div class="name">BYGAGOOS</div>
  </div>
</body>
</html>
    `;
    
    fs.writeFileSync(filePath, htmlContent.trim());
    console.log(`      ✅ Créé: ${filePath}`);
  } else {
    const stats = fs.statSync(filePath);
    console.log(`   ✅ Existe: ${member.name}.jpg (${stats.size} bytes)`);
  }
});

// Créer le logo
const logoPath = path.join(imagesDir, 'logo.png');
if (!fs.existsSync(logoPath)) {
  console.log('\n🎨 CRÉATION DU LOGO:');
  
  const logoHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>ByGagoos Logo</title>
  <style>
    body { 
      margin: 0; 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      height: 100vh; 
      background: #2E7D32;
    }
    .logo {
      width: 180px;
      height: 180px;
      border: 10px solid white;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }
    .bg-text {
      font-size: 60px;
      font-weight: bold;
      color: white;
      font-family: Arial, sans-serif;
      line-height: 1;
    }
    .ink-text {
      font-size: 24px;
      color: white;
      font-family: Arial, sans-serif;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="logo">
    <div class="bg-text">BG</div>
    <div class="ink-text">INK</div>
  </div>
</body>
</html>
  `;
  
  fs.writeFileSync(logoPath, logoHtml.trim());
  console.log(`   ✅ Logo créé: ${logoPath}`);
}

// Tester l'accès
console.log('\n🔗 URLs À TESTER:');
console.log('   👤 Profils:');
console.log('     http://localhost:3001/api/public/profiles/tovoniaina.jpg');
console.log('     http://localhost:3001/api/public/profiles/volatiana.jpg');
console.log('     http://localhost:3001/api/public/profiles/miantsatiana.jpg');
console.log('     http://localhost:3001/api/public/profiles/tia-faniry.jpg');
console.log('\n   🎨 Logo:');
console.log('     http://localhost:3001/api/public/images/logo.png');

console.log('\n✅ Images prêtes !');
console.log('🚀 Pour ajouter vos vraies photos:');
console.log('   1. Remplacez les fichiers .jpg dans backend/public/profiles/');
console.log('   2. Remplacez logo.png dans backend/public/images/');
console.log('   3. Redémarrez le backend: npm start');