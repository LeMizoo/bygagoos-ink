// Script pour réinitialiser complètement l'authentification
console.log('🔄 Nettoyage de l\'authentification...');

// Nettoyer toutes les clés d'authentification
const authKeys = [
  'bygagoos_auth_state',
  'family_token',
  'user',
  'token',
  'auth_token',
  'redirectAfterLogin'
];

authKeys.forEach(key => {
  localStorage.removeItem(key);
  console.log(`🗑️  Supprimé: ${key}`);
});

// Forcer un rechargement
console.log('✅ Authentification nettoyée, rechargement de la page...');
setTimeout(() => {
  window.location.href = '/';
}, 1000);