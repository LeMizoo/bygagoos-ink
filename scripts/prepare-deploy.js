#!/usr/bin/env node
// frontend/scripts/prepare-deploy.js
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

const log = {
  info: (msg) => console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  title: (msg) => console.log(`\n${colors.magenta}${colors.bold}${msg}${colors.reset}\n`),
};

async function prepareDeploy() {
  log.title('🚀 Préparation du déploiement ByGagoos Ink');
  
  const backendPublic = path.join(__dirname, '../../backend/public');
  const frontendPublic = path.join(__dirname, '../public');
  const frontendDist = path.join(__dirname, '../dist');
  
  try {
    // Étape 1: Nettoyage
    log.info('Étape 1: Nettoyage des dossiers...');
    await fs.emptyDir(frontendDist);
    log.success('Dossier dist/ nettoyé');
    
    // Étape 2: Copie des images
    log.info('Étape 2: Copie des images...');
    await fs.ensureDir(frontendPublic);
    await fs.ensureDir(path.join(frontendPublic, 'profiles'));
    await fs.ensureDir(path.join(frontendPublic, 'production'));
    
    // Copier depuis le backend
    const copyOperations = [
      { 
        name: 'Images principales', 
        source: path.join(backendPublic, 'images'), 
        dest: frontendPublic 
      },
      { 
        name: 'Profils', 
        source: path.join(backendPublic, 'profiles'), 
        dest: path.join(frontendPublic, 'profiles') 
      },
      { 
        name: 'Production', 
        source: path.join(backendPublic, 'production'), 
        dest: path.join(frontendPublic, 'production') 
      },
    ];
    
    for (const op of copyOperations) {
      if (await fs.pathExists(op.source)) {
        const files = await fs.readdir(op.source);
        for (const file of files) {
          if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file)) {
            await fs.copy(
              path.join(op.source, file),
              path.join(op.dest, file),
              { overwrite: true }
            );
          }
        }
        log.success(`${op.name}: ${files.length} fichiers`);
      } else {
        log.warn(`${op.name}: source non trouvée`);
      }
    }
    
    // Étape 3: Créer les fichiers manquants
    log.info('Étape 3: Création des fichiers manquants...');
    
    // Créer vite.svg si absent
    const viteSvgPath = path.join(frontendPublic, 'vite.svg');
    if (!await fs.pathExists(viteSvgPath)) {
      const viteSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path d="M29.883 6.146L17.622 28.496c-.455.787-1.588.787-2.043 0L2.117 6.146C1.623 5.25 2.527 4.225 3.5 4.225h24.999c.974 0 1.877 1.025 1.384 1.921z" fill="url(#grad)"/>
  <path d="M22 4.225L16 14.992l-3-5.168-7.5.006c-.974 0-1.877 1.025-1.384 1.921l4 6.932L15.293 27c.455.787 1.588.787 2.043 0l3.357-5.812.002-.004 4-6.928c.493-.896-.41-1.921-1.384-1.921l-7.5-.006 3-5.168L22 4.225z" fill="#fff" fill-opacity=".8"/>
  <defs>
    <linearGradient id="grad" x1="16" y1="4.225" x2="16" y2="27.779" gradientUnits="userSpaceOnUse">
      <stop stop-color="#41D1FF"/>
      <stop offset="1" stop-color="#BD34FE"/>
    </linearGradient>
  </defs>
</svg>`;
      await fs.writeFile(viteSvgPath, viteSvg);
      log.success('vite.svg créé');
    }
    
    // Étape 4: Vérifier les dépendances
    log.info('Étape 4: Vérification des dépendances...');
    try {
      execSync('npm list --depth=0', { stdio: 'pipe' });
      log.success('Dépendances vérifiées');
    } catch (error) {
      log.warn('Problèmes de dépendances détectés');
      log.info('Installation des dépendances...');
      execSync('npm ci --only=production', { stdio: 'inherit' });
    }
    
    // Étape 5: Build de l'application
    log.info('Étape 5: Build de l\'application...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Étape 6: Vérification du build
    log.info('Étape 6: Vérification du build...');
    const requiredFiles = [
      'index.html',
      'assets/index-',
      'manifest.json',
    ];
    
    for (const file of requiredFiles) {
      const found = (await fs.readdir(frontendDist))
        .some(f => f.includes(file.replace('index-', '')));
      
      if (!found) {
        throw new Error(`Fichier requis manquant: ${file}`);
      }
    }
    
    // Créer un fichier de version
    const packageJson = JSON.parse(await fs.readFile(path.join(__dirname, '../package.json'), 'utf8'));
    const versionInfo = {
      name: packageJson.name,
      version: packageJson.version,
      buildDate: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      gitCommit: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
      buildId: `build-${Date.now()}`,
    };
    
    await fs.writeJson(
      path.join(frontendDist, 'version.json'),
      versionInfo,
      { spaces: 2 }
    );
    
    // Étape 7: Statistiques
    log.info('Étape 7: Calcul des statistiques...');
    const stats = await getDirectoryStats(frontendDist);
    
    log.title('📊 Rapport de build');
    console.log(`${colors.cyan}📁 Répertoire de build:${colors.reset} ${frontendDist}`);
    console.log(`${colors.cyan}📦 Taille totale:${colors.reset} ${stats.size}`);
    console.log(`${colors.cyan}📄 Nombre de fichiers:${colors.reset} ${stats.files}`);
    console.log(`${colors.cyan}📈 Assets JavaScript:${colors.reset} ${stats.js}`);
    console.log(`${colors.cyan}🎨 Assets CSS:${colors.reset} ${stats.css}`);
    console.log(`${colors.cyan}🖼️ Images:${colors.reset} ${stats.images}`);
    console.log(`${colors.cyan}🏷️ Version:${colors.reset} ${versionInfo.version}`);
    
    // Étape 8: Vérification des performances
    log.info('Étape 8: Vérification des performances...');
    const indexHtml = await fs.readFile(path.join(frontendDist, 'index.html'), 'utf8');
    
    // Vérifier la compression
    const largeFiles = [];
    for (const file of await fs.readdir(path.join(frontendDist, 'assets/js'))) {
      const filePath = path.join(frontendDist, 'assets/js', file);
      const stat = await fs.stat(filePath);
      if (stat.size > 500000) { // 500KB
        largeFiles.push({ name: file, size: (stat.size / 1024 / 1024).toFixed(2) + ' MB' });
      }
    }
    
    if (largeFiles.length > 0) {
      log.warn('Fichiers JavaScript volumineux détectés:');
      largeFiles.forEach(f => console.log(`   ${f.name}: ${f.size}`));
    }
    
    // Vérifier les images
    const largeImages = [];
    for (const file of await fs.readdir(frontendDist)) {
      if (/\.(jpg|jpeg|png)$/i.test(file)) {
        const filePath = path.join(frontendDist, file);
        const stat = await fs.stat(filePath);
        if (stat.size > 1000000) { // 1MB
          largeImages.push({ name: file, size: (stat.size / 1024 / 1024).toFixed(2) + ' MB' });
        }
      }
    }
    
    if (largeImages.length > 0) {
      log.warn('Images volumineuses détectées (considérer l\'optimisation):');
      largeImages.forEach(img => console.log(`   ${img.name}: ${img.size}`));
    }
    
    log.title('✅ Déploiement prêt !');
    console.log(`${colors.green}${colors.bold}L'application est maintenant prête pour le déploiement.${colors.reset}`);
    console.log(`${colors.cyan}Pour déployer sur Vercel:${colors.reset} vercel --prod`);
    console.log(`${colors.cyan}Pour déployer manuellement:${colors.reset} Copier le dossier dist/ sur votre serveur`);
    
  } catch (error) {
    log.error(`Échec de la préparation: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

async function getDirectoryStats(dir) {
  let totalSize = 0;
  let fileCount = 0;
  let jsCount = 0;
  let cssCount = 0;
  let imageCount = 0;
  
  async function scan(directory) {
    const items = await fs.readdir(directory);
    
    for (const item of items) {
      const itemPath = path.join(directory, item);
      const stats = await fs.stat(itemPath);
      
      if (stats.isDirectory()) {
        await scan(itemPath);
      } else {
        fileCount++;
        totalSize += stats.size;
        
        if (/\.js$/.test(item)) jsCount++;
        if (/\.css$/.test(item)) cssCount++;
        if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(item)) imageCount++;
      }
    }
  }
  
  await scan(dir);
  
  return {
    size: (totalSize / 1024 / 1024).toFixed(2) + ' MB',
    files: fileCount,
    js: jsCount,
    css: cssCount,
    images: imageCount,
  };
}

// Exécution
prepareDeploy().catch(console.error);