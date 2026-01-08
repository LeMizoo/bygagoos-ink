const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Correction des images manquantes...');

// Vérifier si ImageMagick est disponible (pour créer des placeholders)
let hasImageMagick = false;
try {
  execSync('convert --version', { stdio: 'ignore' });
  hasImageMagick = true;
  console.log('✓ ImageMagick disponible pour créer des placeholders');
} catch {
  console.log('ℹ️ ImageMagick non trouvé, utilisation de fichiers basiques');
}

// Chemins
const backendImages = path.join(__dirname, '../../backend/public/images');
const backendProfiles = path.join(__dirname, '../../backend/public/profiles');
const backendProduction = path.join(__dirname, '../../backend/public/production');
const frontendImages = path.join(__dirname, '../public/images');
const frontendProfiles = path.join(__dirname, '../public/profiles');
const frontendProduction = path.join(__dirname, '../public/production');

// Créer les dossiers
[frontendImages, frontendProfiles, frontendProduction].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Créé: ${dir}`);
  }
});

// Fonction pour copier un fichier
function copyFile(source, destination) {
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, destination);
    return true;
  }
  return false;
}

// Fonction pour créer un placeholder
function createPlaceholder(filename, destination, size = '800x600') {
  const ext = path.extname(filename).toLowerCase();
  const baseName = path.basename(filename, ext);
  
  if (hasImageMagick && (ext === '.png' || ext === '.jpg' || ext === '.jpeg')) {
    try {
      const cmd = `convert -size ${size} xc:#f0f9ff -fill "#4cc9f0" -pointsize 36 -gravity center -draw "text 0,0 '${baseName}'" "${destination}"`;
      execSync(cmd);
      console.log(`🖼️  Créé placeholder: ${filename}`);
      return true;
    } catch (error) {
      console.log(`⚠️  Erreur création placeholder ${filename}:`, error.message);
    }
  }
  
  // Fallback: créer un fichier texte simple
  const placeholderContent = `Placeholder for ${filename}`;
  fs.writeFileSync(destination.replace(/\.(png|jpg|jpeg)$/, '.txt'), placeholderContent);
  console.log(`📝 Créé fichier texte pour: ${filename}`);
  return false;
}

// Images principales à vérifier
const mainImages = [
  { name: 'bygagoos-large.png', source: path.join(backendImages, 'bygagoos-large.png'), dest: path.join(frontendImages, 'bygagoos-large.png') },
  { name: 'inauguration.jpg', source: path.join(backendImages, 'inauguration.jpg'), dest: path.join(frontendImages, 'inauguration.jpg') },
  { name: 'logo.png', source: path.join(backendImages, 'logo.png'), dest: path.join(frontendImages, 'logo.png') },
  { name: 'logo.svg', source: path.join(backendImages, 'logo.svg'), dest: path.join(frontendImages, 'logo.svg') },
  { name: 'team-family.jpg', source: path.join(backendImages, 'team-family.jpg'), dest: path.join(frontendImages, 'team-family.jpg') }
];

// Profils
const profileFiles = fs.existsSync(backendProfiles) ? fs.readdirSync(backendProfiles) : [];
const productionFiles = fs.existsSync(backendProduction) ? fs.readdirSync(backendProduction) : [];

console.log('📁 Copie des images depuis backend...');

// Copier les images principales
let copied = 0;
let created = 0;

mainImages.forEach(img => {
  if (copyFile(img.source, img.dest)) {
    console.log(`✅ Copié: ${img.name}`);
    copied++;
  } else {
    console.log(`⚠️  Manquant: ${img.name}`);
    if (createPlaceholder(img.name, img.dest)) {
      created++;
    }
  }
});

// Copier tous les fichiers de profils
profileFiles.forEach(file => {
  const source = path.join(backendProfiles, file);
  const dest = path.join(frontendProfiles, file);
  if (copyFile(source, dest)) {
    copied++;
  }
});

// Copier tous les fichiers de production
productionFiles.forEach(file => {
  const source = path.join(backendProduction, file);
  const dest = path.join(frontendProduction, file);
  if (copyFile(source, dest)) {
    copied++;
  }
});

console.log('\n📊 RÉSUMÉ:');
console.log(`✅ ${copied} fichiers copiés`);
console.log(`🖼️  ${created} placeholders créés`);
console.log(`📁 ${profileFiles.length} images de profils`);
console.log(`🏭 ${productionFiles.length} images de production`);

// Vérifier si le dossier dist existe pour la build
const distImages = path.join(__dirname, '../dist/images');
if (fs.existsSync(distImages)) {
  console.log('\n🔄 Copie vers le dossier dist...');
  mainImages.forEach(img => {
    const destDist = path.join(distImages, path.basename(img.name));
    if (fs.existsSync(img.dest)) {
      fs.copyFileSync(img.dest, destDist);
    }
  });
  console.log('✅ Images copiées vers dist/');
}

console.log('\n🎉 Correction des images terminée!');