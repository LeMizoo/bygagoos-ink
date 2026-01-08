// scripts/restore-images.cjs
const fs = require('fs');
const path = require('path');

console.log('🔍 RECHERCHE ET RESTAURATION DES IMAGES ORIGINALES\n');

const sources = [
  'main',
  'archive/old_pages/public',
  'temp_backup',
  'src/assets',
  'public/images'  // Vieux dossier images
];

const publicDir = path.join(__dirname, '..', 'public');

// Images essentielles à chercher
const essentialImages = [
  'inauguration.jpg',
  'team-family.jpg',
  'logo.png',
  'logo.svg',
  'bygagoos-large.png',
  'logo.png',
  'vite.svg',
  'apple-touch-icon.png'
];

let restoredCount = 0;

essentialImages.forEach(image => {
  console.log(`\n🔎 Recherche: ${image}`);
  
  for (const source of sources) {
    const sourcePath = path.join(__dirname, '..', source, image);
    
    if (fs.existsSync(sourcePath)) {
      const destPath = path.join(publicDir, image);
      const stats = fs.statSync(sourcePath);
      
      if (stats.size > 1000) { // Plus de 1KB = probablement une vraie image
        fs.copyFileSync(sourcePath, destPath);
        console.log(`  ✅ RESTAURÉ depuis ${source}/ (${(stats.size/1024).toFixed(1)} KB)`);
        restoredCount++;
        break;
      } else {
        console.log(`  ⚠️ Trouvé dans ${source}/ mais trop petit (${stats.size} bytes)`);
      }
    }
  }
});

// Restaurer les dossiers
const foldersToRestore = ['profiles', 'production', 'images'];

foldersToRestore.forEach(folder => {
  console.log(`\n📁 Recherche du dossier: ${folder}/`);
  
  for (const source of sources) {
    const sourceDir = path.join(__dirname, '..', source, folder);
    
    if (fs.existsSync(sourceDir) && fs.statSync(sourceDir).isDirectory()) {
      const destDir = path.join(publicDir, folder);
      
      // Créer le dossier destination s'il n'existe pas
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      // Copier les fichiers
      const files = fs.readdirSync(sourceDir);
      let copied = 0;
      
      files.forEach(file => {
        const sourceFile = path.join(sourceDir, file);
        const destFile = path.join(destDir, file);
        
        if (fs.statSync(sourceFile).isFile()) {
          fs.copyFileSync(sourceFile, destFile);
          copied++;
        }
      });
      
      if (copied > 0) {
        console.log(`  ✅ ${copied} fichiers restaurés depuis ${source}/${folder}/`);
        restoredCount += copied;
      }
    }
  }
});

console.log('\n🎉 RÉSUMÉ DE LA RESTAURATION:');
console.log(`📊 Total d'images/fichiers restaurés: ${restoredCount}`);

if (restoredCount === 0) {
  console.log('\n❌ Aucune image originale trouvée.');
  console.log('💡 Suggestions:');
  console.log('1. Vérifiez vos dossiers: main/, archive/, temp_backup/');
  console.log('2. Téléchargez vos images depuis votre ordinateur');
  console.log('3. Placez-les directement dans public/');
} else {
  console.log('\n✅ Redémarrez le serveur: npm run dev');
}

// Lister le contenu final
console.log('\n📁 CONTENU FINAL de public/:');
try {
  function listDir(dir, prefix = '') {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      try {
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          console.log(prefix + '📁 ' + item + '/');
          listDir(fullPath, prefix + '  ');
        } else {
          const size = (stat.size / 1024).toFixed(1);
          console.log(prefix + '📄 ' + item + ` (${size} KB)`);
        }
      } catch (error) {
        console.log(prefix + '❌ ' + item + ' (erreur de lecture)');
      }
    });
  }
  
  listDir(publicDir);
} catch (error) {
  console.log('Erreur lors du listing:', error.message);
}