const fs = require('fs');
const path = require('path');

console.log('🏗️  Création de la page ComingSoon...');

// Chemin du dossier pages
const pagesDir = path.join(__dirname, '../src/pages');

// Vérifier si le dossier existe
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
  console.log('📁 Dossier pages créé');
}

// Contenu du composant ComingSoonPage.jsx
const componentContent = `import React from 'react';
import './ComingSoonPage.css';

const ComingSoonPage = ({ featureName = "Fonctionnalité" }) => {
  return (
    <div className="coming-soon-page">
      <div className="construction-icon">🏗️</div>
      <h1 className="title">{featureName}</h1>
      <p className="subtitle">En construction - Bientôt disponible</p>
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
        <span className="progress-text">Développement en cours (70%)</span>
      </div>
      <p className="description">
        Cette fonctionnalité fait partie de la roadmap ByGagoos Ink. 
        Notre équipe travaille activement pour la rendre disponible prochainement.
      </p>
      <div className="features-list">
        <div className="feature-item">✓ Interface moderne et intuitive</div>
        <div className="feature-item">✓ Intégration complète avec le système</div>
        <div className="feature-item">✓ Optimisation mobile et desktop</div>
        <div className="feature-item">✓ Sécurité et fiabilité garanties</div>
      </div>
      <button 
        className="back-button" 
        onClick={() => window.history.back()}
        aria-label="Retour à la page précédente"
      >
        ← Retour à l'accueil
      </button>
    </div>
  );
};

export default ComingSoonPage;
`;

// Contenu du CSS ComingSoonPage.css
const cssContent = `.coming-soon-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 3rem 1.5rem;
  text-align: center;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  margin: 2rem auto;
  max-width: 800px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.construction-icon {
  font-size: 5rem;
  margin-bottom: 2rem;
  animation: bounce 2s infinite ease-in-out;
  color: #4cc9f0;
}

@keyframes bounce {
  0%, 100% { 
    transform: translateY(0) scale(1); 
  }
  50% { 
    transform: translateY(-15px) scale(1.05); 
  }
}

.title {
  color: #0f172a;
  font-size: 2.75rem;
  margin-bottom: 0.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, #4cc9f0 0%, #0ea5e9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: #64748b;
  font-size: 1.25rem;
  margin-bottom: 3rem;
  font-weight: 500;
  max-width: 500px;
}

.progress-container {
  width: 100%;
  max-width: 500px;
  margin: 2.5rem 0;
}

.progress-bar {
  background: #e2e8f0;
  height: 12px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  margin-bottom: 0.75rem;
}

.progress-fill {
  background: linear-gradient(90deg, #4cc9f0 0%, #0ea5e9 100%);
  height: 100%;
  width: 70%;
  border-radius: 6px;
  position: relative;
  animation: progressPulse 2s infinite;
}

@keyframes progressPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 100%
  );
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.progress-text {
  display: block;
  color: #475569;
  font-size: 0.95rem;
  font-weight: 500;
}

.description {
  color: #475569;
  max-width: 600px;
  line-height: 1.7;
  margin: 2.5rem 0;
  font-size: 1.125rem;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0 3rem;
  width: 100%;
  max-width: 500px;
}

.feature-item {
  background: white;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  color: #334155;
  font-weight: 500;
  text-align: left;
  border-left: 4px solid #4cc9f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.back-button {
  background: linear-gradient(135deg, #4cc9f0 0%, #0ea5e9 100%);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 10px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 12px -2px rgba(76, 201, 240, 0.4);
  margin-top: 1rem;
}

.back-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px -3px rgba(76, 201, 240, 0.5);
}

.back-button:active {
  transform: translateY(-1px);
}

.back-button:focus {
  outline: 3px solid rgba(76, 201, 240, 0.3);
}

@media (max-width: 768px) {
  .coming-soon-page {
    padding: 2rem 1rem;
    margin: 1rem;
    border-radius: 12px;
  }
  
  .construction-icon {
    font-size: 4rem;
  }
  
  .title {
    font-size: 2.25rem;
  }
  
  .subtitle {
    font-size: 1.125rem;
  }
  
  .features-list {
    grid-template-columns: 1fr;
  }
  
  .feature-item {
    text-align: center;
    border-left: none;
    border-top: 4px solid #4cc9f0;
  }
}

@media (max-width: 480px) {
  .coming-soon-page {
    padding: 1.5rem 1rem;
  }
  
  .title {
    font-size: 1.875rem;
  }
  
  .description {
    font-size: 1rem;
  }
  
  .back-button {
    width: 100%;
    padding: 0.875rem 1.5rem;
  }
}`;

// Écrire les fichiers
const componentPath = path.join(pagesDir, 'ComingSoonPage.jsx');
const cssPath = path.join(pagesDir, 'ComingSoonPage.css');

fs.writeFileSync(componentPath, componentContent);
fs.writeFileSync(cssPath, cssContent);

console.log('✅ Fichiers créés:');
console.log(`   📄 ${componentPath}`);
console.log(`   🎨 ${cssPath}`);

// Vérifier si l'import est nécessaire dans App.jsx
const appPath = path.join(__dirname, '../src/App.jsx');
if (fs.existsSync(appPath)) {
  const appContent = fs.readFileSync(appPath, 'utf8');
  
  if (!appContent.includes('ComingSoonPage')) {
    console.log('\n⚠️  IMPORTANT: Vous devez mettre à jour App.jsx pour inclure:');
    console.log(`
1. Ajouter l'import:
   import ComingSoonPage from './pages/ComingSoonPage';

2. Utiliser le composant dans les routes:
   <Route path="profile" element={<ComingSoonPage featureName="Gestion du Profil" />} />
    `);
  } else {
    console.log('✅ App.jsx est déjà à jour avec ComingSoonPage');
  }
}

console.log('\n🎉 Page ComingSoon créée avec succès!');