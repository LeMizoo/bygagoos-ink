// Test manuel de protection des routes
console.log('🧪 Test de protection des routes /app/*');

// 1. Se déconnecter
console.log('🧹 Nettoyage des données d\'authentification...');
localStorage.clear();
console.log('✅ Données nettoyées');

// 2. Essayer d'accéder à une route protégée
console.log('🔒 Tentative d\'accès à /app/dashboard sans authentification...');

// 3. Vérifier ce qui se passe
setTimeout(() => {
  const currentPath = window.location.pathname;
  console.log(`📍 Chemin actuel: ${currentPath}`);
  
  if (currentPath.startsWith('/app/')) {
    console.log('❌ ÉCHEC: Toujours sur une route /app/ !');
    console.log('Redirection manuelle vers /login...');
    window.location.href = '/login';
  } else if (currentPath === '/login') {
    console.log('✅ SUCCÈS: Redirigé vers /login !');
  } else if (currentPath === '/') {
    console.log('✅ SUCCÈS: Redirigé vers l\'accueil !');
  } else {
    console.log(`⚠️  Sur la page: ${currentPath}`);
  }
}, 1000);

// 4. Vérifier l'état du localStorage
console.log('📊 État du localStorage:');
console.log('- family_token:', localStorage.getItem('family_token'));
console.log('- user:', localStorage.getItem('user'));
console.log('- bygagoos_auth_state:', localStorage.getItem('bygagoos_auth_state'));