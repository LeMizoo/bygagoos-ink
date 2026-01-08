import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// équivalent de __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stylesDir = path.join(__dirname, '../src/styles');

// Contenu public.css
const publicCSS = `
.public-container {
  background: #f8fafc;
  min-height: 100vh;
  padding-top: var(--navbar-height, 64px);
}

.public-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.public-content h1,
.public-content h2 {
  color: #1e293b;
  font-weight: 700;
}

.public-content p {
  color: #64748b;
  line-height: 1.6;
}
`;

// Contenu private.css
const privateCSS = `
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-main {
  display: flex;
  flex: 1;
}

.sidebar {
  width: var(--sidebar-width, 260px);
  background: #0f172a;
  color: white;
  position: fixed;
  top: var(--navbar-height, 64px);
  bottom: 0;
  left: 0;
}

.app-content {
  flex: 1;
  margin-left: var(--sidebar-width, 260px);
  padding: 2rem;
  background: #f8fafc;
  min-height: calc(100vh - var(--navbar-height, 64px));
}
`;

if (!fs.existsSync(stylesDir)) fs.mkdirSync(stylesDir, { recursive: true });
fs.writeFileSync(path.join(stylesDir, 'public.css'), publicCSS);
fs.writeFileSync(path.join(stylesDir, 'private.css'), privateCSS);

console.log('✅ public.css et private.css créés dans src/styles/');