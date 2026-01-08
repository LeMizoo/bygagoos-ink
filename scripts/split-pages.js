import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, '../src/pages');
const publicsDir = path.join(pagesDir, 'publics');
const privatesDir = path.join(pagesDir, 'privates');

if (!fs.existsSync(publicsDir)) fs.mkdirSync(publicsDir);
if (!fs.existsSync(privatesDir)) fs.mkdirSync(privatesDir);

const publicPages = [
  'Gallery.jsx','Gallery.css',
  'Login.jsx','Login.css',
  'FamilyPage.jsx','FamilyPage.css',
  'ComingSoonPage.jsx'
];

const privatePages = [
  'Dashboard.jsx','Dashboard.css',
  'ClientsPage.jsx','ClientsPage.css',
  'OrdersPage.jsx','OrdersPage.css',
  'OrdersNewPage.jsx','OrdersNewPage.css',
  'OrderEditPage.jsx','OrderEditPage.css',
  'ProductionTeam.jsx','ProductionTeam.css',
  'ProfilePage.jsx','ProfilePage.css',
  'CalendarPage.jsx','CalendarPage.css',
  'SettingsPage.jsx','SettingsPage.css',
  'StockPage.jsx','StockPage.css',
  'StockConsumablesPage.jsx','StockConsumablesPage.css',
  'DocumentsPage.jsx','DocumentsPage.css',
  'AccountingPage.jsx','AccountingPage.css',
  'LogisticsPage.jsx','LogisticsPage.css',
  'InventoryPage.jsx','InventoryPage.css'
];

function moveFile(file, targetDir) {
  const srcPath = path.join(pagesDir, file);
  const destPath = path.join(targetDir, file);
  if (fs.existsSync(srcPath)) {
    fs.renameSync(srcPath, destPath);
    console.log(`✅ ${file} déplacé vers ${targetDir}`);
  }
}

publicPages.forEach(file => moveFile(file, publicsDir));
privatePages.forEach(file => moveFile(file, privatesDir));

console.log('🎉 Séparation des pages terminée !');