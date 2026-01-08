const fs = require('fs');
const path = require('path');

console.log('🔄 Correction des images manquantes...');

// Chemins
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

// Images requises
const requiredImages = [
  'logo.png',
  'logo.svg',
  'bygagoos-large.png',
  'inauguration.jpg',
  'team-family.jpg'
];

// Dossiers à créer
const folders = [
  'images',
  'production',
  'profiles'
];

// Créer les dossiers
folders.forEach(folder => {
  const folderPath = path.join(publicDir, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`📁 Créé: ${folder}`);
  }
});

// Vérifier les images
let missingCount = 0;
requiredImages.forEach(image => {
  const imagePath = path.join(publicDir, 'images', image);
  if (!fs.existsSync(imagePath)) {
    console.log(`⚠️  Manquant: ${image}`);
    missingCount++;
    
    // Créer un fichier placeholder
    const placeholderContent = `Placeholder for ${image}\nImage manquante - à remplacer`;
    fs.writeFileSync(imagePath.replace(/\.(png|jpg|jpeg|svg)$/, '.txt'), placeholderContent);
  }
});

// Copier les images de production depuis backend si elles existent
const backendProduction = path.join(rootDir, '../backend/public/production');
const frontendProduction = path.join(publicDir, 'production');

if (fs.existsSync(backendProduction)) {
  const productionFiles = fs.readdirSync(backendProduction);
  productionFiles.forEach(file => {
    const source = path.join(backendProduction, file);
    const dest = path.join(frontendProduction, file);
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(source, dest);
      console.log(`✅ Copié: production/${file}`);
    }
  });
}

// Copier les images de profils depuis backend si elles existent
const backendProfiles = path.join(rootDir, '../backend/public/profiles');
const frontendProfiles = path.join(publicDir, 'profiles');

if (fs.existsSync(backendProfiles)) {
  const profileFiles = fs.readdirSync(backendProfiles);
  profileFiles.forEach(file => {
    const source = path.join(backendProfiles, file);
    const dest = path.join(frontendProfiles, file);
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(source, dest);
      console.log(`✅ Copié: profiles/${file}`);
    }
  });
}

console.log('\n📊 RÉSUMÉ:');
console.log(`✅ Dossiers vérifiés: ${folders.length}`);
console.log(`⚠️  Images manquantes: ${missingCount}`);
console.log(`📁 Production: ${fs.existsSync(frontendProduction) ? fs.readdirSync(frontendProduction).length : 0} fichiers`);
console.log(`👤 Profils: ${fs.existsSync(frontendProfiles) ? fs.readdirSync(frontendProfiles).length : 0} fichiers`);

if (missingCount > 0) {
  console.log('\n📝 Pour corriger les images manquantes:');
  console.log('1. Placez les fichiers dans frontend/public/images/');
  console.log('2. Ou téléchargez-les depuis le backend');
  console.log('3. Exécutez à nouveau ce script');
}

console.log('\n🎉 Vérification terminée!');