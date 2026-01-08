#!/usr/bin/env node
// frontend/scripts/copy-images.cjs
// Version corrigée utilisant fs natif au lieu de fs-extra

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  bold: '\x1b[1m'
};

console.log(`${colors.cyan}${colors.bold}📁 Démarrage de la copie des images...${colors.reset}`);

// Chemins
const backendDir = path.join(__dirname, '../../backend/public');
const frontendDir = path.join(__dirname, '../public');
const distDir = path.join(__dirname, '../dist');

// Fonction pour créer récursivement les dossiers
const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Fonction pour copier un fichier
const copyFile = (source, destination) => {
  try {
    // Créer le dossier de destination si nécessaire
    const destDir = path.dirname(destination);
    createDirectory(destDir);
    
    // Copier le fichier
    fs.copyFileSync(source, destination);
    return true;
  } catch (error) {
    console.error(`${colors.red}❌ Erreur copie ${path.basename(source)}: ${error.message}${colors.reset}`);
    return false;
  }
};

// Fonction pour écrire un fichier JSON
const writeJsonFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`${colors.red}❌ Erreur écriture JSON: ${error.message}${colors.reset}`);
    return false;
  }
};

// Créer la structure de dossiers
const createStructure = () => {
  const dirs = [
    path.join(frontendDir, 'profiles'),
    path.join(frontendDir, 'production'),
    path.join(distDir, 'profiles'),
    path.join(distDir, 'production')
  ];

  dirs.forEach(dir => {
    createDirectory(dir);
  });
};

// Copier récursivement avec stats
const copyWithStats = (source, destination, fileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp']) => {
  if (!fs.existsSync(source)) {
    console.log(`${colors.yellow}⚠️ Source non trouvée: ${source}${colors.reset}`);
    return { count: 0, size: 0 };
  }

  let totalCount = 0;
  let totalSize = 0;

  const copyDir = (src, dest) => {
    // Créer le dossier de destination
    createDirectory(dest);
    
    // Lire les éléments du dossier source
    const items = fs.readdirSync(src);

    items.forEach(item => {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);

      try {
        const stats = fs.statSync(srcPath);

        if (stats.isDirectory()) {
          // Copier récursivement les sous-dossiers
          copyDir(srcPath, destPath);
        } else if (
          stats.isFile() &&
          fileTypes.some(ext => item.toLowerCase().endsWith(ext))
        ) {
          const fileSize = stats.size;

          if (fileSize > 10 * 1024 * 1024) {
            console.log(
              `${colors.yellow}⚠️ Image volumineuse: ${item} (${(fileSize / (1024 * 1024)).toFixed(2)} MB)${colors.reset}`
            );
          }

          // Copier le fichier
          if (copyFile(srcPath, destPath)) {
            totalCount++;
            totalSize += fileSize;

            console.log(
              `${colors.green}✅ ${path.relative(destination, destPath)}${colors.reset}`
            );
          }
        }
      } catch (error) {
        console.log(`${colors.yellow}⚠️ Impossible de traiter ${item}: ${error.message}${colors.reset}`);
      }
    });
  };

  copyDir(source, destination);
  return { count: totalCount, size: totalSize };
};

// Fonction pour copier tout un dossier récursivement
const copyDirRecursive = (source, destination) => {
  if (!fs.existsSync(source)) return;

  createDirectory(destination);
  
  const items = fs.readdirSync(source);
  
  items.forEach(item => {
    const srcPath = path.join(source, item);
    const destPath = path.join(destination, item);
    
    try {
      const stats = fs.statSync(srcPath);
      
      if (stats.isDirectory()) {
        copyDirRecursive(srcPath, destPath);
      } else {
        copyFile(srcPath, destPath);
      }
    } catch (error) {
      console.log(`${colors.yellow}⚠️ Impossible de copier ${item}: ${error.message}${colors.reset}`);
    }
  });
};

// Optimisation (optionnelle)
const optimizeImages = (dir) => {
  if (!fs.existsSync(dir)) return;

  try {
    // Vérifier si ImageMagick est disponible
    execSync('convert --version', { stdio: 'ignore' });
    console.log(`${colors.blue}🔧 Optimisation des images...${colors.reset}`);

    const images = fs
      .readdirSync(dir)
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
      .slice(0, 5); // Limiter à 5 images pour ne pas ralentir le build

    images.forEach(image => {
      const imagePath = path.join(dir, image);
      const backupPath = imagePath + '.bak';

      try {
        // Créer une backup
        copyFile(imagePath, backupPath);

        // Optimiser avec ImageMagick
        execSync(
          `convert "${imagePath}" -strip -quality 85 "${imagePath}"`,
          { stdio: 'pipe' }
        );

        const originalSize = fs.statSync(backupPath).size;
        const optimizedSize = fs.statSync(imagePath).size;
        const savings = (((originalSize - optimizedSize) / originalSize) * 100).toFixed(1);

        if (savings > 0) {
          console.log(
            `${colors.green}📊 ${image}: ${(originalSize / 1024).toFixed(1)}KB → ${(optimizedSize / 1024).toFixed(1)}KB (-${savings}%)${colors.reset}`
          );
        }

        // Supprimer la backup
        fs.unlinkSync(backupPath);
      } catch (error) {
        // Restaurer depuis la backup en cas d'erreur
        if (fs.existsSync(backupPath)) {
          copyFile(backupPath, imagePath);
          fs.unlinkSync(backupPath);
        }
        console.log(`${colors.yellow}⚠️ Impossible d'optimiser ${image}${colors.reset}`);
      }
    });
  } catch (error) {
    console.log(`${colors.yellow}ℹ️ ImageMagick non disponible - optimisation ignorée${colors.reset}`);
  }
};

// Liste des images à copier (pour éviter les images trop volumineuses pour PWA)
const essentialImages = [
  // Images principales
  { name: 'bygagoos-large.png', category: 'main' },
  { name: 'inauguration.jpg', category: 'main' },
  { name: 'logo.png', category: 'main' },
  { name: 'logo.svg', category: 'main' },
  { name: 'team-family.jpg', category: 'main' },
  
  // Profils
  { name: 'miantsatiana.jpg', category: 'profiles' },
  { name: 'miantsatiana.svg', category: 'profiles' },
  { name: 'tia-faniry.jpg', category: 'profiles' },
  { name: 'tiafaniry.svg', category: 'profiles' },
  { name: 'tovoniaina.jpg', category: 'profiles' },
  { name: 'tovoniaina.svg', category: 'profiles' },
  { name: 'volatiana.jpg', category: 'profiles' },
  { name: 'volatiana.svg', category: 'profiles' },
  
  // Production - images essentielles seulement (éviter >2MB pour PWA)
  { name: 'atelier-serigraphie.jpg', category: 'production', maxSize: 2 * 1024 * 1024 },
  { name: 'equipe-serigraphie.jpg', category: 'production', maxSize: 2 * 1024 * 1024 },
  { name: 'marcel-prod.jpg', category: 'production', maxSize: 2 * 1024 * 1024 },
  { name: 'marcelin-prod.jpg', category: 'production', maxSize: 2 * 1024 * 1024 },
  { name: 'mbin-prod.jpg', category: 'production', maxSize: 2 * 1024 * 1024 },
  { name: 'miadrisoa-prod.jpg', category: 'production', maxSize: 2 * 1024 * 1024 },
  { name: 'ntsoa-prod.jpg', category: 'production', maxSize: 2 * 1024 * 1024 }
];

// Copier les images essentielles avec contrôle de taille
const copyEssentialImages = () => {
  let totalCount = 0;
  let totalSize = 0;

  essentialImages.forEach(image => {
    const sourcePath = path.join(backendDir, image.category, image.name);
    const destFrontendPath = path.join(frontendDir, image.category, image.name);
    const destDistPath = path.join(distDir, image.category, image.name);

    if (fs.existsSync(sourcePath)) {
      try {
        const stats = fs.statSync(sourcePath);
        
        // Vérifier la taille maximale si spécifiée
        if (image.maxSize && stats.size > image.maxSize) {
          console.log(`${colors.yellow}⚠️ ${image.name} trop volumineux (${(stats.size / (1024 * 1024)).toFixed(2)} MB) - skip pour PWA${colors.reset}`);
          return;
        }

        // Copier vers frontend/public
        if (copyFile(sourcePath, destFrontendPath)) {
          // Copier vers dist
          copyFile(sourcePath, destDistPath);
          
          totalCount++;
          totalSize += stats.size;
          
          console.log(`${colors.green}✅ ${image.category}/${image.name}${colors.reset}`);
        }
      } catch (error) {
        console.log(`${colors.yellow}⚠️ Impossible de copier ${image.name}: ${error.message}${colors.reset}`);
      }
    } else {
      console.log(`${colors.yellow}⚠️ ${image.name} non trouvé dans ${image.category}${colors.reset}`);
    }
  });

  return { count: totalCount, size: totalSize };
};

// Main
const main = async () => {
  console.log(`${colors.blue}${colors.bold}🛠️ Préparation des dossiers...${colors.reset}`);
  createStructure();

  console.log(`\n${colors.magenta}${colors.bold}📦 Copie des images essentielles...${colors.reset}`);
  const stats = copyEssentialImages();

  // Copier les dossiers public vers dist (pour les autres fichiers)
  console.log(`\n${colors.blue}${colors.bold}📁 Copie des fichiers publics vers dist...${colors.reset}`);
  copyDirRecursive(frontendDir, distDir);

  // Créer le manifest
  const manifest = {
    generated: new Date().toISOString(),
    totalImages: stats.count,
    totalSize: stats.size,
    essentialImages: essentialImages.map(img => img.name)
  };

  writeJsonFile(path.join(frontendDir, 'images-manifest.json'), manifest);
  writeJsonFile(path.join(distDir, 'images-manifest.json'), manifest);

  // Optimisation en production seulement
  if (process.env.NODE_ENV === 'production') {
    console.log(`\n${colors.blue}${colors.bold}⚡ Optimisation production...${colors.reset}`);
    optimizeImages(path.join(frontendDir, 'profiles'));
    optimizeImages(path.join(frontendDir, 'production'));
  }

  console.log(`\n${colors.green}${colors.bold}🎉 Copie terminée${colors.reset}`);
  console.log(`${colors.cyan}📊 Statistiques: ${stats.count} images copiées, ${(stats.size / (1024 * 1024)).toFixed(2)} MB${colors.reset}`);
};

// Gestion des erreurs
main().catch(err => {
  console.error(`\n${colors.red}${colors.bold}❌ Erreur fatale:${colors.reset}`, err.message);
  process.exit(1);
});

module.exports = { copyImages: main };