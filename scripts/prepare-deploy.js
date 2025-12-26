import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenir __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Copier les images du backend vers le frontend public
async function prepareDeploy() {
  const backendImages = path.join(__dirname, '../../backend/public');
  const frontendPublic = path.join(__dirname, '../public');
  
  console.log('🔧 Préparation du déploiement...');
  
  try {
    // Créer les dossiers si inexistants
    await fs.ensureDir(frontendPublic);
    await fs.ensureDir(path.join(frontendPublic, 'profiles'));
    await fs.ensureDir(path.join(frontendPublic, 'production'));
    
    // Copier récursivement depuis backend
    if (await fs.pathExists(backendImages)) {
      // Images principales
      const backendImagesDir = path.join(backendImages, 'images');
      if (await fs.pathExists(backendImagesDir)) {
        const images = await fs.readdir(backendImagesDir);
        for (const image of images) {
          const src = path.join(backendImagesDir, image);
          const dest = path.join(frontendPublic, image);
          const stats = await fs.stat(src);
          if (stats.isFile()) {
            await fs.copy(src, dest, { overwrite: true });
            console.log(`✅ Copié: ${image}`);
          }
        }
      }
      
      // Profiles
      const backendProfilesDir = path.join(backendImages, 'profiles');
      if (await fs.pathExists(backendProfilesDir)) {
        const profiles = await fs.readdir(backendProfilesDir);
        for (const profile of profiles) {
          const src = path.join(backendProfilesDir, profile);
          const dest = path.join(frontendPublic, 'profiles', profile);
          const stats = await fs.stat(src);
          if (stats.isFile()) {
            await fs.copy(src, dest, { overwrite: true });
            console.log(`✅ Copié: profiles/${profile}`);
          }
        }
      }
      
      // Production
      const backendProductionDir = path.join(backendImages, 'production');
      if (await fs.pathExists(backendProductionDir)) {
        const productions = await fs.readdir(backendProductionDir);
        for (const production of productions) {
          const src = path.join(backendProductionDir, production);
          const dest = path.join(frontendPublic, 'production', production);
          const stats = await fs.stat(src);
          if (stats.isFile()) {
            await fs.copy(src, dest, { overwrite: true });
            console.log(`✅ Copié: production/${production}`);
          }
        }
      }
    }
    
    // Copier aussi depuis src/assets pour être sûr
    const frontendAssets = path.join(__dirname, '../src/assets');
    if (await fs.pathExists(frontendAssets)) {
      await fs.copy(frontendAssets, frontendPublic, { 
        overwrite: true,
        recursive: true 
      });
      console.log('✅ Assets copiés depuis src/assets/');
    }
    
    // S'assurer que vite.svg existe
    const viteSvg = path.join(__dirname, '../node_modules/vite/logo.svg');
    if (await fs.pathExists(viteSvg)) {
      await fs.copy(viteSvg, path.join(frontendPublic, 'vite.svg'), { overwrite: true });
      console.log('✅ vite.svg copié');
    } else {
      // Créer un vite.svg minimal si absent
      const viteSvgContent = `<?xml version="1.0" encoding="UTF-8"?>
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
      await fs.writeFile(path.join(frontendPublic, 'vite.svg'), viteSvgContent);
      console.log('✅ vite.svg créé');
    }
    
    console.log('✅ Préparation terminée avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la préparation:', error);
    process.exit(1);
  }
}

prepareDeploy().catch(console.error);