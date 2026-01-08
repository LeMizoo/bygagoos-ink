// scripts/copy-images.cjs - VERSION CORRIGÉE
const fs = require('fs');
const path = require('path');

console.log('📁 COPIE DES IMAGES POUR BYGAGOOS INK\n');

const publicDir = path.join(__dirname, '..', 'public');

// Les images SOURCES sont dans /frontend/public/
// Les images DESTINATION sont dans /frontend/dist/
const imagesToCopy = [
  // Images à la racine (sources: public/*, destination: dist/*)
  { source: 'public/inauguration.jpg', dest: 'inauguration.jpg' },
  { source: 'public/team-family.jpg', dest: 'team-family.jpg' },
  { source: 'public/logo.png', dest: 'logo.png' },
  { source: 'public/logo.svg', dest: 'logo.svg' },
  { source: 'public/bygagoos-large.png', dest: 'bygagoos-large.png' },
  
  // Profils (sources: public/profiles/*, destination: dist/profiles/*)
  { source: 'public/profiles/miantsatiana.jpg', dest: 'profiles/miantsatiana.jpg' },
  { source: 'public/profiles/miantsatiana.svg', dest: 'profiles/miantsatiana.svg' },
  { source: 'public/profiles/tia-faniry.jpg', dest: 'profiles/tia-faniry.jpg' },
  { source: 'public/profiles/tiafaniry.svg', dest: 'profiles/tiafaniry.svg' },
  { source: 'public/profiles/tovoniaina.jpg', dest: 'profiles/tovoniaina.jpg' },
  { source: 'public/profiles/tovoniaina.svg', dest: 'profiles/tovoniaina.svg' },
  { source: 'public/profiles/volatiana.jpg', dest: 'profiles/volatiana.jpg' },
  { source: 'public/profiles/volatiana.svg', dest: 'profiles/volatiana.svg' },
  
  // Production (sources: public/production/*, destination: dist/production/*)
  { source: 'public/production/atelier-serigraphie.jpg', dest: 'production/atelier-serigraphie.jpg' },
  { source: 'public/production/equipe-serigraphie.jpg', dest: 'production/equipe-serigraphie.jpg' },
  { source: 'public/production/marcel-prod.jpg', dest: 'production/marcel-prod.jpg' },
  { source: 'public/production/marcelin-prod.jpg', dest: 'production/marcelin-prod.jpg' },
  { source: 'public/production/mbin-prod.jpg', dest: 'production/mbin-prod.jpg' },
  { source: 'public/production/miadrisoa-prod.jpg', dest: 'production/miadrisoa-prod.jpg' },
  { source: 'public/production/ntsoa-prod.jpg', dest: 'production/ntsoa-prod.jpg' },
  
  // Autres images de production (si elles existent)
  { source: 'public/production/equipe-prod-02.jpg', dest: 'production/equipe-prod-02.jpg' },
  { source: 'public/production/equipe-prod-03.jpg', dest: 'production/equipe-prod-03.jpg' },
  { source: 'public/production/equipe-prod-04.jpg', dest: 'production/equipe-prod-04.jpg' },
  { source: 'public/production/equipe-prod-06.jpg', dest: 'production/equipe-prod-06.jpg' },
  { source: 'public/production/equipe-prod-07.jpg', dest: 'production/equipe-prod-07.jpg' },
  { source: 'public/production/equipe-prod-08.jpg', dest: 'production/equipe-prod-08.jpg' }
];

let copied = 0;
let missing = 0;

console.log('📦 Copie des images...\n');

imagesToCopy.forEach(({ source, dest }) => {
  const sourcePath = path.join(__dirname, '..', source);
  const destPath = path.join(publicDir, dest);
  
  // Créer le dossier destination si nécessaire
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  if (fs.existsSync(sourcePath)) {
    const stats = fs.statSync(sourcePath);
    if (stats.size > 100) { // Plus de 100 bytes = image valide
      fs.copyFileSync(sourcePath, destPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`✅ ${dest} (${sizeKB} KB)`);
      copied++;
    } else {
      console.log(`⚠️ ${dest} - fichier trop petit`);
      missing++;
    }
  } else {
    console.log(`❌ ${dest} - source non trouvée: ${source}`);
    missing++;
  }
});

console.log('\n🎉 COPIE TERMINÉE');
console.log('📊 STATISTIQUES:');
console.log(`   Images copiées: ${copied}`);
console.log(`   Images manquantes: ${missing}`);
console.log(`   Taux de succès: ${((copied / imagesToCopy.length) * 100).toFixed(1)}%`);

if (missing > 0) {
  console.log('\n💡 Les images sont copiées depuis /frontend/public/ vers /frontend/public/.');
  console.log('   Vérifiez que toutes vos images sont bien présentes dans /frontend/public/.');
}