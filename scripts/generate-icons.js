// scripts/generate-icons.js
const { createCanvas } = require('canvas');
const fs = require('fs');

function generateIcon(size, filename, text = 'BG') {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Fond
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, size, size);
    
    // Cercle avec dégradé
    const gradient = ctx.createRadialGradient(
        size/2, size/2, 0,
        size/2, size/2, size/2
    );
    gradient.addColorStop(0, '#4cc9f0');
    gradient.addColorStop(1, '#2a9bbf');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size/2, size/2, size * 0.4, 0, Math.PI * 2);
    ctx.fill();
    
    // Texte
    ctx.fillStyle = '#0f172a';
    ctx.font = `bold ${size * 0.3}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, size/2, size/2);
    
    // Sauvegarde
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`./public/${filename}`, buffer);
    console.log(`✓ ${filename} généré (${size}x${size})`);
}

// Générer toutes les tailles nécessaires
generateIcon(512, 'pwa-512x512.png');
generateIcon(192, 'pwa-192x192.png');
generateIcon(180, 'apple-touch-icon.png');
generateIcon(16, 'favicon-16x16.png');
generateIcon(32, 'favicon-32x32.png');

console.log('✅ Toutes les icônes ont été générées !');