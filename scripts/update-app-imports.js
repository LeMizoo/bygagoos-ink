import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appPath = path.join(__dirname, '../src/App.jsx');
let content = fs.readFileSync(appPath, 'utf-8');

// Mise à jour des imports publics
content = content.replace(/'\.\/pages\/Gallery'/g, "'./pages/publics/Gallery'");
content = content.replace(/'\.\/pages\/Login'/g, "'./pages/publics/Login'");
content = content.replace(/'\.\/pages\/FamilyPage'/g, "'./pages/publics/FamilyPage'");

// Mise à jour des imports privés
const privatePages = [
  'Dashboard','ClientsPage','OrdersPage','OrdersNewPage','OrderEditPage',
  'ProductionTeam','ProfilePage','CalendarPage','SettingsPage',
  'StockPage','StockConsumablesPage','DocumentsPage','AccountingPage','LogisticsPage','InventoryPage'
];

privatePages.forEach(page => {
  const regex = new RegExp(`'\\.\\/pages\\/${page}'`, 'g');
  content = content.replace(regex, `'./pages/privates/${page}'`);
});

fs.writeFileSync(appPath, content);
console.log('✅ Imports mis à jour dans App.jsx');