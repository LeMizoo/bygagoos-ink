const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/admin/settings/DocumentsPage.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Corriger l'import de MobileLayout
content = content.replace(
  /from\s+["']\.\.\/components\/layout\/MobileLayout["']/,
  'from "../../../components/layout/MobileLayout"'
);

// Corriger d'autres imports potentiels
content = content.replace(
  /from\s+["']\.\/components\/layout\/MobileLayout["']/,
  'from "../../../components/layout/MobileLayout"'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ DocumentsPage.jsx corrigé !');
