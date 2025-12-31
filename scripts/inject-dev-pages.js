import fs from 'fs';
import path from 'path';

const PAGES_DIR = path.resolve('src/pages');

function toKey(file) {
  return file
    .replace('Page.jsx', '')
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toLowerCase();
}

function inject(filePath, pageKey, pageTitle) {
  let content = fs.readFileSync(filePath, 'utf8');

  // éviter double injection
  if (content.includes('DEV_PAGES')) return;

  // inject imports
  content = content.replace(
    /import React.*?;\n/,
    match =>
      `${match}import { DEV_PAGES } from '../config/devPages';\nimport UnderConstruction from '../components/ui/UnderConstruction';\n`
  );

  // inject guard dans le composant
  content = content.replace(
    /function\s+\w+\s*\(\)\s*{\n/,
    match =>
      `${match}  if (DEV_PAGES.${pageKey}) {\n    return <UnderConstruction title="${pageTitle}" />;\n  }\n\n`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✔ Injecté: ${path.basename(filePath)}`);
}

// parcourir toutes les pages
fs.readdirSync(PAGES_DIR).forEach(file => {
  if (!file.endsWith('Page.jsx')) return;

  const filePath = path.join(PAGES_DIR, file);
  const key = toKey(file);
  const title = file.replace('Page.jsx', '');

  inject(filePath, key, title);
});
