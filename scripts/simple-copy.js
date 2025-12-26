import { promises as fs } from 'fs';
import { join } from 'path';

async function copyImages() {
  console.log('📁 Copie simple des images...');
  
  // Sources et destinations
  const sources = [
    { 
      from: '../../backend/public/images', 
      to: '../public' 
    },
    { 
      from: '../../backend/public/profiles', 
      to: '../public/profiles' 
    },
    { 
      from: '../../backend/public/production', 
      to: '../public/production' 
    }
  ];
  
  for (const { from, to } of sources) {
    try {
      const sourcePath = join(import.meta.dirname, from);
      const destPath = join(import.meta.dirname, to);
      
      // Créer le dossier de destination
      await fs.mkdir(destPath, { recursive: true });
      
      // Lire et copier les fichiers
      const files = await fs.readdir(sourcePath);
      for (const file of files) {
        const sourceFile = join(sourcePath, file);
        const destFile = join(destPath, file);
        
        const stats = await fs.stat(sourceFile);
        if (stats.isFile()) {
          await fs.copyFile(sourceFile, destFile);
          console.log(`✅ Copié: ${file}`);
        }
      }
    } catch (error) {
      console.log(`⚠️  Dossier non trouvé ou erreur: ${from}`);
    }
  }
  
  console.log('🎉 Copie terminée !');
}

copyImages();