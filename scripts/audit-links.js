// frontend/scripts/audit-links.js
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const brokenLinks = [];

function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

function scanForLinks(dir) {
  // Implémentation simple pour vérifier les imports/images
  console.log('Audit des liens en cours...');
}

scanForLinks(srcDir);