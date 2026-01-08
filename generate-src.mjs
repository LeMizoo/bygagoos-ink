// generate-src.mjs
import fs from 'fs';
import path from 'path';

const srcDir = './src';
const backupDir = './src-backup';

// --- 1️⃣ Supprimer src existant (optionnel) ---
if (fs.existsSync(srcDir)) {
  fs.rmSync(srcDir, { recursive: true, force: true });
  console.log('🗑️  Ancien dossier src supprimé.');
}

// --- 2️⃣ Créer structure src ---
console.log('📁 Création structure src...');
const folders = [
  'components/layout',
  'pages/public',
  'pages/admin',
  'Loading'
];

folders.forEach(folder => {
  fs.mkdirSync(path.join(srcDir, folder), { recursive: true });
});

// --- 3️⃣ Créer fichiers principaux ---
console.log('⚡ Création fichiers principaux...');

// index.css minimal
fs.writeFileSync(path.join(srcDir, 'index.css'), `
/* index.css minimal */
body { margin:0; font-family:sans-serif; }
`);

// Loading.jsx
fs.writeFileSync(path.join(srcDir, 'Loading/Loading.jsx'), `
import React from 'react';

export default function Loading() {
  return <div style={{ textAlign:'center', padding:'40px' }}>Chargement...</div>;
}
`);

// App.jsx minimal avec react-router-dom et suspense
fs.writeFileSync(path.join(srcDir, 'App.jsx'), `
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LayoutWrapper from './components/layout/LayoutWrapper.jsx';
import Loading from './Loading/Loading.jsx';

// Pages publics
const HomePage = lazy(() => import('./pages/public/HomePage.jsx'));
const LoginPage = lazy(() => import('./pages/public/LoginPage.jsx'));

// Pages admin
const AdminDashboard = lazy(() => import('./pages/admin/dashboard/AdminDashboard.jsx'));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LayoutWrapper type="public"><HomePage /></LayoutWrapper>} />
          <Route path="/login" element={<LayoutWrapper type="public"><LoginPage /></LayoutWrapper>} />
          {/* Admin */}
          <Route path="/admin" element={<LayoutWrapper type="admin"><AdminDashboard /></LayoutWrapper>} />
          {/* Default */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
`);

// main.jsx
fs.writeFileSync(path.join(srcDir, 'main.jsx'), `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`);

// LayoutWrapper minimal
fs.writeFileSync(path.join(srcDir, 'components/layout/LayoutWrapper.jsx'), `
import React from 'react';

export default function LayoutWrapper({ type, children }) {
  return <div className={type === 'admin' ? 'admin-layout' : 'public-layout'}>{children}</div>;
}
`);

// --- 4️⃣ Copier tout depuis src-backup ---
console.log('📦 Copie des fichiers backup...');
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;

  const entries = fs.readdirSync(src, { withFileTypes: true });
  entries.forEach(entry => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✅ Copié : ${destPath}`);
    }
  });
}

copyDir(backupDir, srcDir);

console.log('🎉 Structure src prête ! Tu peux maintenant lancer npm run dev');
