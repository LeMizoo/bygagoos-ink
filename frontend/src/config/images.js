// frontend/src/config/images.js - VERSION FINALE CORRIGÉE POUR VERCEL
console.log('📸 Images config chargée pour Vercel');

// CORRECTION CRITIQUE : Images servies directement par le frontend, PAS par l'API
// IMPORTANT : Toutes les images doivent être dans 'public/' et référencées par chemin relatif

// Fonction principale corrigée - URL relative pour Vercel
export const getImageUrl = (path) => {
  if (!path || path.trim() === '') {
    console.warn('⚠️ Chemin d\'image vide, retour placeholder');
    return getPlaceholderImage();
  }
  
  // Nettoyer le chemin (garantir qu'il commence par /)
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // CORRECTION IMPORTANTE : URL RELATIVE pour Vercel
  // Le navigateur complètera automatiquement avec l'origine du frontend
  console.log(`📸 Image path: ${cleanPath}`);
  return cleanPath;
};

// Fonction pour les images membres - OPTIMISÉE
export const getMemberImage = (member) => {
  if (!member) {
    return getPlaceholderImage('User');
  }
  
  const name = member.name ? member.name.toLowerCase() : '';
  const role = member.role || '';
  
  // 1. D'abord vérifier si l'image existe dans le stockage local
  let imagePath = '';
  
  if (name.includes('tovoniaina') || role === 'SUPER_ADMIN' || role === 'STRUCTURE') {
    imagePath = '/profiles/tovoniaina.jpg';
  }
  else if (name.includes('volatiana') || role === 'INSPIRATION' || role === 'INSPIRATION_CREATIVITY') {
    imagePath = '/profiles/volatiana.jpg';
  }
  else if (name.includes('miantsatiana') || role === 'CREATION' || role === 'OPERATIONS_DESIGN') {
    imagePath = '/profiles/miantsatiana.jpg';
  }
  else if (name.includes('faniry') || name.includes('tia') || role === 'COMMUNICATION' || role === 'ADMIN_COMMUNICATION') {
    imagePath = '/profiles/tia-faniry.jpg';
  }
  
  // 2. Si image locale existe, retourner le chemin relatif
  if (imagePath) {
    const url = getImageUrl(imagePath);
    console.log(`👤 ${member.name} -> ${imagePath}`);
    return url;
  }
  
  // 3. Fallback: avatar généré avec UI Avatars (fonctionne mieux que via.placeholder)
  let bgColor = '2E7D32'; // vert par défaut
  
  if (role === 'STRUCTURE' || role === 'SUPER_ADMIN') bgColor = '2E7D32';
  else if (role === 'INSPIRATION' || role === 'INSPIRATION_CREATIVITY') bgColor = '9C27B0';
  else if (role === 'CREATION' || role === 'OPERATIONS_DESIGN') bgColor = 'FF9800';
  else if (role === 'COMMUNICATION' || role === 'ADMIN_COMMUNICATION') bgColor = '2196F3';
  
  const firstName = member.name ? member.name.split(' ')[0] : 'User';
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName)}&background=${bgColor}&color=fff&size=400`;
  console.log(`👤 ${member.name} -> avatar généré`);
  return avatarUrl;
};

// Placeholder SVG inline (plus fiable)
export const getPlaceholderImage = (text = 'BG', color = '#2E7D32') => {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="100%" height="100%" fill="${color}" rx="10"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
          fill="white" font-family="Arial, sans-serif" font-size="48" font-weight="bold">
      ${text.substring(0, 3)}
    </text>
  </svg>`;
  
  // Encoder pour URL data
  const encodedSVG = encodeURIComponent(svgContent);
  return `data:image/svg+xml;utf8,${encodedSVG}`;
};

// Données des membres - MISE À JOUR
export const FAMILY_MEMBERS = [
  {
    id: 1,
    name: 'Tovoniaina RAHENDRISON',
    email: 'tovoniaina.rahendrison@gmail.com',
    role: 'SUPER_ADMIN',
    familyRole: 'STRUCTURE',
    color: '#2E7D32',
    emoji: '👑',
    description: 'Fondateur & Structure - Responsable stratégie et organisation',
    // CORRECTION : chemin relatif vers l'image locale
    imagePath: '/profiles/tovoniaina.jpg',
    phone: '+261 34 43 593 30'
  },
  {
    id: 2,
    name: 'Volatiana RANDRIANARISOA',
    email: 'dedettenadia@gmail.com',
    role: 'ADMIN',
    familyRole: 'INSPIRATION_CREATIVITY',
    color: '#9C27B0',
    emoji: '💡',
    description: 'Inspiration & Créativité - Direction artistique et design',
    imagePath: '/profiles/volatiana.jpg',
    phone: '+261 34 43 359 30'
  },
  {
    id: 3,
    name: 'Miantsatiana RAHENDRISON',
    email: 'miantsatianarahendrison@gmail.com',
    role: 'ADMIN',
    familyRole: 'OPERATIONS_DESIGN',
    color: '#FF9800',
    emoji: '🎨',
    description: 'Opérations & Design - Gestion production et contrôle qualité',
    imagePath: '/profiles/miantsatiana.jpg',
    phone: '+261 34 75 301 07'
  },
  {
    id: 4,
    name: 'Tia Faniry RAHENDRISON',
    email: 'fanirytia17@gmail.com',
    role: 'ADMIN',
    familyRole: 'ADMIN_COMMUNICATION',
    color: '#2196F3',
    emoji: '📢',
    description: 'Admin & Communication - Relations clients et marketing',
    imagePath: '/profiles/tia-faniry.jpg',
    phone: '+261 38 44 993 77'
  }
];

// Photos de galerie - CHEMINS RELATIFS
export const GALLERY_IMAGES = [
  {
    id: 1,
    title: 'Atelier de Sérigraphie',
    description: 'Notre espace de production professionnel',
    // CORRECTION : chemin relatif direct
    path: '/production/atelier-serigraphie.jpg',
    category: 'production'
  },
  {
    id: 2,
    title: 'Équipe de Sérigraphie',
    description: 'L\'équipe technique au complet',
    path: '/production/equipe-serigraphie.jpg',
    category: 'team'
  },
  // ... (autres images avec chemins relatifs similaires)
];

// Équipe de production
export const PRODUCTION_TEAM = [
  {
    id: 1,
    name: 'Marcel',
    role: 'Chef d\'atelier',
    description: 'Expert en sérigraphie depuis 15 ans',
    // CORRECTION : chemin relatif
    imagePath: '/production/marcel-prod.jpg',
    color: '#4CAF50'
  },
  // ... (autres membres)
];

// Fonctions utilitaires spécifiques
export const getProductionImage = (filename) => {
  return getImageUrl(`/production/${filename}`);
};

export const getProfileImage = (filename) => {
  return getImageUrl(`/profiles/${filename}`);
};

export const getGalleryImage = (image) => {
  return getImageUrl(image.path);
};

export const getLogoUrl = () => {
  return getImageUrl('/images/logo.png');
};

export const getTeamFamilyImage = () => {
  return getImageUrl('/images/team-family.jpg');
};

// Configuration exportée
export const IMAGES_CONFIG = {
  getImageUrl,
  getMemberImage,
  getPlaceholderImage,
  FAMILY_MEMBERS,
  GALLERY_IMAGES,
  PRODUCTION_TEAM,
  getProductionImage,
  getProfileImage,
  getGalleryImage,
  getLogoUrl,
  getTeamFamilyImage,
  
  // Images principales
  LOGO: getLogoUrl(),
  LARGE_LOGO: getImageUrl('/images/bygagoos-large.png'),
  INAUGURATION: getImageUrl('/images/inauguration.jpg'),
  TEAM_FAMILY: getTeamFamilyImage(),
  ATELIER: getImageUrl('/production/atelier-serigraphie.jpg'),
  
  // Fonction d'avatar simplifiée
  getAvatarUrl: (name, size = 100, bgColor = '2E7D32') => {
    const firstName = name ? name.split(' ')[0] : 'User';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName)}&background=${bgColor}&color=fff&size=${size}`;
  }
};

export default IMAGES_CONFIG;