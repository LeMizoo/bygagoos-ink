import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Configuration des futures flags React Router pour éviter les warnings
window.__reactRouterVersion = '6';
window.__reactRouterFutureFlags = {
  v7_startTransition: true,
  v7_relativeSplatPath: true
};

// Vérifier que l'élément root existe
const rootElement = document.getElementById('root');
if (!rootElement) {
  // Créer l'élément root s'il n'existe pas
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  
  console.warn('Élément #root créé dynamiquement');
}

// Obtenir l'élément root (soit existant, soit nouvellement créé)
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendre l'application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Error Boundary global
window.addEventListener('error', (event) => {
  console.error('Erreur globale:', event.error);
});

// Error handling pour les promesses non catchées
window.addEventListener('unhandledrejection', (event) => {
  console.error('Promesse rejetée non catchée:', event.reason);
});

// Optionnel: Service Worker pour PWA (à activer si besoin)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(error => {
      console.log('Service Worker registration failed:', error);
    });
  });
}