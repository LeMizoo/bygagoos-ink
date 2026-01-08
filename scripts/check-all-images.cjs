// scripts/check-all-images.cjs
const fs = require('fs');
const path = require('path');

console.log('🔍 VÉRIFICATION COMPLÈTE DES IMAGES\n');

const publicDir = path.join(__dirname, '..', 'public');

// Structure attendue
const expectedStructure = {
  'public/': [
    'inauguration.jpg',
    'team-family.jpg', 
    'logo.png',
    'logo.svg',
    'bygagoos-large.png',
    'apple-touch-icon.png',
    'vite.svg',
    'manifest.json'
  ],
  'public/profiles/': [
    'tovoniaina.jpg',
    'volatiana.jpg',
    'miantsatiana.jpg', 
    'tia-faniry.jpg',
    'tovoniaina.svg',
    'volatiana.svg',
    'miantsatiana.svg',
    'tiafaniry.svg'
  ],
  'public/production/': [
    'atelier-serigraphie.jpg',
    'equipe-serigraphie.jpg',
    'marcel-prod.jpg',
    'marcelin-prod.jpg',
    'mbin-prod.jpg',
    'miadrisoa-prod.jpg',
    'ntsoa-prod.jpg',
    'equipe-prod-02.jpg',
    'equipe-prod-03.jpg',
    'equipe-prod-04.jpg',
    'equipe-prod-06.jpg',
    'equipe-prod-07.jpg',
    'equipe-prod-08.jpg'
  ]
};

let totalFound = 0;
let totalMissing = 0;

Object.entries(expectedStructure).forEach(([folder, files]) => {
  console.log(`\n📂 ${folder}`);
  
  const fullPath = path.join(publicDir, folder.replace('public/', ''));
  
  files.forEach(file => {
    const filePath = path.join(fullPath, file);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      
      if (stats.size > 100) { // Plus de 100 bytes
        console.log(`  ✅ ${file} (${sizeKB} KB)`);
        totalFound++;
      } else {
        console.log(`  ⚠️ ${file} - TROP PETIT (${stats.size} bytes)`);
        totalMissing++;
      }
    } else {
      console.log(`  ❌ ${file} - MANQUANT`);
      totalMissing++;
    }
  });
});

console.log('\n📊 STATISTIQUES FINALES:');
console.log(`✅ Images trouvées: ${totalFound}`);
console.log(`❌ Images manquantes: ${totalMissing}`);
console.log(`📈 Taux de complétion: ${((totalFound / (totalFound + totalMissing)) * 100).toFixed(1)}%`);

// Suggestions
if (totalMissing > 0) {
  console.log('\n💡 RECOMMANDATIONS:');
  console.log('1. Téléchargez vos vraies images depuis votre ordinateur');
  console.log('2. Placez-les dans le dossier public/ correspondant');
  console.log('3. Exécutez: npm run dev pour rafraîchir');
  
  console.log('\n📁 Structure des dossiers actuelle:');
  function listDir(dir, prefix = '') {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        console.log(prefix + '📁 ' + item + '/');
        listDir(fullPath, prefix + '  ');
      } else {
        const size = (stat.size / 1024).toFixed(2);
        console.log(prefix + '📄 ' + item + ` (${size} KB)`);
      }
    });
  }
  
  try {
    listDir(publicDir);
  } catch (error) {
    console.log('Impossible de lister le dossier:', error.message);
  }
}