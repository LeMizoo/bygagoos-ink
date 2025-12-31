#!/usr/bin/env node
// frontend/scripts/copy-images.cjs

const fs = require('fs-extra');
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

// Créer la structure de dossiers
const createStructure = () => {
  const dirs = [
    frontendDir,
    path.join(frontendDir, 'profiles'),
    path.join(frontendDir, 'production'),
    distDir,
    path.join(distDir, 'profiles'),
    path.join(distDir, 'production')
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`${colors.green}✅ Créé: ${dir}${colors.reset}`);
    }
  });
};

// Copier récursivement avec stats
const copyWithStats = (
  source,
  destination,
  fileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp']
) => {
  if (!fs.existsSync(source)) {
    console.log(`${colors.yellow}⚠️ Source non trouvée: ${source}${colors.reset}`);
    return { count: 0, size: 0 };
  }

  let totalCount = 0;
  let totalSize = 0;

  const copyDir = (src, dest) => {
    const items = fs.readdirSync(src);

    items.forEach(item => {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      const stats = fs.statSync(srcPath);

      if (stats.isDirectory()) {
        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath, { recursive: true });
        }
        copyDir(srcPath, destPath);
      } else if (
        stats.isFile() &&
        fileTypes.some(ext => item.toLowerCase().endsWith(ext))
      ) {
        const fileSize = stats.size;

        if (fileSize > 10 * 1024 * 1024) {
          console.log(
            `${colors.yellow}⚠️ Image volumineuse: ${item} (${(
              fileSize /
              (1024 * 1024)
            ).toFixed(2)} MB)${colors.reset}`
          );
        }

        fs.copyFileSync(srcPath, destPath);
        totalCount++;
        totalSize += fileSize;

        console.log(
          `${colors.green}✅ ${path.relative(destination, destPath)}${colors.reset}`
        );
      }
    });
  };

  copyDir(source, destination);
  return { count: totalCount, size: totalSize };
};

// Optimisation (optionnelle)
const optimizeImages = async dir => {
  if (!fs.existsSync(dir)) return;

  try {
    execSync('convert --version', { stdio: 'ignore' });
    console.log(`${colors.blue}🔧 Optimisation des images...${colors.reset}`);

    const images = fs
      .readdirSync(dir)
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    for (const image of images.slice(0, 5)) {
      const imagePath = path.join(dir, image);
      const backupPath = imagePath + '.bak';

      fs.copyFileSync(imagePath, backupPath);

      try {
        execSync(
          `convert "${imagePath}" -strip -quality 85 "${imagePath}"`,
          { stdio: 'pipe' }
        );

        const originalSize = fs.statSync(backupPath).size;
        const optimizedSize = fs.statSync(imagePath).size;
        const savings = (
          ((originalSize - optimizedSize) / originalSize) *
          100
        ).toFixed(1);

        if (savings > 0) {
          console.log(
            `${colors.green}📊 ${image}: ${(originalSize / 1024).toFixed(
              1
            )}KB → ${(optimizedSize / 1024).toFixed(1)}KB (-${savings}%)${
              colors.reset
            }`
          );
        }

        fs.unlinkSync(backupPath);
      } catch {
        fs.copyFileSync(backupPath, imagePath);
        fs.unlinkSync(backupPath);
      }
    }
  } catch {
    console.log(
      `${colors.yellow}ℹ️ ImageMagick non disponible${colors.reset}`
    );
  }
};

// Main
const main = async () => {
  createStructure();

  const sources = [
    { name: 'Images principales', from: path.join(backendDir, 'images'), to: frontendDir },
    { name: 'Profils', from: path.join(backendDir, 'profiles'), to: path.join(frontendDir, 'profiles') },
    { name: 'Production', from: path.join(backendDir, 'production'), to: path.join(frontendDir, 'production') }
  ];

  let total = { count: 0, size: 0 };

  for (const s of sources) {
    console.log(`\n${colors.magenta}📂 ${s.name}${colors.reset}`);
    const stats = copyWithStats(s.from, s.to);
    total.count += stats.count;
    total.size += stats.size;
  }

  fs.copySync(frontendDir, distDir);

  const manifest = {
    generated: new Date().toISOString(),
    totalImages: total.count,
    totalSize: total.size
  };

  fs.writeJsonSync(path.join(frontendDir, 'images-manifest.json'), manifest, { spaces: 2 });
  fs.writeJsonSync(path.join(distDir, 'images-manifest.json'), manifest, { spaces: 2 });

  if (process.env.NODE_ENV === 'production') {
    await optimizeImages(path.join(frontendDir, 'profiles'));
    await optimizeImages(path.join(frontendDir, 'production'));
  }

  console.log(`${colors.green}${colors.bold}🎉 Copie terminée${colors.reset}`);
};

main().catch(err => {
  console.error(`${colors.red}❌ Erreur:${colors.reset}`, err);
  process.exit(1);
});

module.exports = { copyImages: main };
