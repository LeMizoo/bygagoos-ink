import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, '../src/pages');
const appPath = path.join(__dirname, '../src/App.jsx');

// Fonction pour lister les fichiers .jsx
function listJsxFiles(dir) {
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.jsx'))
    .map(file => path.basename(file, '.jsx'));
}

// Génère une ligne d'import lazy pour un fichier
function generateLazyImport(fileName, folder) {
  return `const ${fileName} = lazy(() => import('./pages/${folder}/${fileName}.jsx'));`;
}

// Vérifie si un import existe déjà
function hasImport(appContent, fileName, folder) {
  const regex = new RegExp(`\\.\\/pages\\/${folder}\\/${fileName}\\.jsx`);
  return regex.test(appContent);
}

// Lecture des fichiers publics et privés
const publicsDir = path.join(pagesDir, 'publics');
const privatesDir = path.join(pagesDir, 'privates');

const publicFiles = listJsxFiles(publicsDir);
const privateFiles = listJsxFiles(privatesDir);

let appContent = fs.readFileSync(appPath, 'utf-8');

// Correction automatique des imports manquants
let addedImports = [];

publicFiles.forEach(fileName => {
  if (!hasImport(appContent, fileName, 'publics')) {
    const importLine = generateLazyImport(fileName, 'publics');
    appContent = appContent.replace(
      '// Pages publiques',
      `// Pages publiques\n${importLine}`
    );
    addedImports.push(`Public: ${fileName}`);
  }
});

privateFiles.forEach(fileName => {
  if (!hasImport(appContent, fileName, 'privates')) {
    const importLine = generateLazyImport(fileName, 'privates');
    appContent = appContent.replace(
      '// Pages privées',
      `// Pages privées\n${importLine}`
    );
    addedImports.push(`Private: ${fileName}`);
  }
});

// Écriture du fichier App.jsx corrigé
fs.writeFileSync(appPath, appContent);

console.log('✅ Vérification terminée.');
if (addedImports.length > 0) {
  console.log('🚀 Imports ajoutés automatiquement :');
  addedImports.forEach(i => console.log(`   ➡️ ${i}`));
} else {
  console.log('👌 Tous les imports étaient déjà corrects.');
}