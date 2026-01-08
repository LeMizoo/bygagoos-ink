#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log('🔧 Correction des icônes PWA...');

const publicDir = path.join(__dirname, '../public');

// Vérifier et créer les icônes manquantes
const requiredIcons = [
  'pwa-192x192.png',
  'pwa-512x512.png',
  'apple-touch-icon.png',
  'favicon.ico'
];

// Fichier source par défaut
const sourceIcon = path.join(publicDir, 'logo.png');

requiredIcons.forEach(icon => {
  const iconPath = path.join(publicDir, icon);
  
  if (!fs.existsSync(iconPath)) {
    if (fs.existsSync(sourceIcon)) {
      fs.copyFileSync(sourceIcon, iconPath);
      console.log(`✅ Créé: ${icon} (copié depuis logo.png)`);
    } else {
      console.log(`⚠️ ${icon} manquant et logo.png non trouvé`);
    }
  } else {
    console.log(`✅ ${icon} existe déjà`);
  }
});

// Mettre à jour le manifest si nécessaire
const manifestPath = path.join(publicDir, 'manifest.webmanifest');
if (fs.existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    // S'assurer que les icônes dans le manifest existent
    if (manifest.icons) {
      manifest.icons = manifest.icons.filter(icon => {
        const iconFile = icon.src.replace(/^\//, '');
        return fs.existsSync(path.join(publicDir, iconFile));
      });
      
      // Ajouter les icônes par défaut si vide
      if (manifest.icons.length === 0) {
        manifest.icons = [
          {
            "src": "/pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any maskable"
          },
          {
            "src": "/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png", 
            "purpose": "any maskable"
          }
        ];
      }
    }
    
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('✅ Manifest PWA mis à jour');
  } catch (error) {
    console.log(`⚠️ Erreur mise à jour manifest: ${error.message}`);
  }
}

console.log('🎉 Correction PWA terminée !');