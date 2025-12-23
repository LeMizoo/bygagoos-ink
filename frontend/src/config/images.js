// frontend/src/config/images.js - VERSION CORRIGÉE
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

console.log('📸 Images config - VITE_API_URL:', API_URL);

// CORRECTION : URL directe sans /api/public/
const getBaseUrl = () => {
  return API_URL;
};

const BASE_URL = getBaseUrl();
console.log('📸 Base URL images:', BASE_URL);

// CORRECTION : URL directe vers les fichiers statiques
export const getImageUrl = (path) => {
  if (!path) return getPlaceholderImage();
  
  // Nettoyer le chemin
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // CORRECTION IMPORTANTE : URL directe sans /api/public/
  const finalUrl = `${BASE_URL}${cleanPath}`;
  
  console.log(`📸 Image URL: ${cleanPath} -> ${finalUrl}`);
  return finalUrl;
};

// Fonction pour obtenir l'image d'un membre - CORRIGÉE
export const getMemberImage = (member) => {
  if (!member) return getPlaceholderImage();
  
  const name = member.name ? member.name.toLowerCase() : '';
  const role = member.role || '';
  
  // CORRECTION : Chemins d'images directs
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
  
  if (imagePath) {
    const url = getImageUrl(imagePath);
    console.log(`📸 Member ${name} -> ${imagePath} -> ${url}`);
    return url;
  }
  
  // Fallback: avatar généré avec couleur basée sur le rôle
  let bgColor = '2E7D32'; // vert par défaut
  
  if (role === 'STRUCTURE' || role === 'SUPER_ADMIN') bgColor = '2E7D32';
  else if (role === 'INSPIRATION' || role === 'INSPIRATION_CREATIVITY') bgColor = '9C27B0';
  else if (role === 'CREATION' || role === 'OPERATIONS_DESIGN') bgColor = 'FF9800';
  else if (role === 'COMMUNICATION' || role === 'ADMIN_COMMUNICATION') bgColor = '2196F3';
  
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || 'User')}&background=${bgColor}&color=fff&size=400&bold=true`;
  console.log(`📸 Member ${name} fallback -> ${avatarUrl}`);
  return avatarUrl;
};

// Placeholder image amélioré
export const getPlaceholderImage = (text = 'BG', color = '#2E7D32') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="100%" height="100%" fill="${color}"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Arial" font-size="48" font-weight="bold">${text}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Données des membres de la famille - CORRIGÉE avec rôles exacts
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

// Photos de la galerie d'inauguration - CORRIGÉES avec chemins directs
export const GALLERY_IMAGES = [
  {
    id: 1,
    title: 'Atelier de Sérigraphie',
    description: 'Notre espace de production professionnel',
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
  {
    id: 3,
    title: 'Marcel - Chef d\'Atelier',
    description: 'Responsable de la production',
    path: '/production/marcel-prod.jpg',
    category: 'production'
  },
  {
    id: 4,
    title: 'Marcelin - Opérateur',
    description: 'Spécialiste impression textile',
    path: '/production/marcelin-prod.jpg',
    category: 'production'
  },
  {
    id: 5,
    title: 'Mbin - Technicienne',
    description: 'Responsable préparation écrans',
    path: '/production/mbin-prod.jpg',
    category: 'production'
  },
  {
    id: 6,
    title: 'Miadrisoa - Contrôle Qualité',
    description: 'Assure l\'excellence de chaque production',
    path: '/production/miadrisoa-prod.jpg',
    category: 'production'
  },
  {
    id: 7,
    title: 'Ntsoa - Finitions',
    description: 'Responsable finitions et packaging',
    path: '/production/ntsoa-prod.jpg',
    category: 'production'
  },
  {
    id: 8,
    title: 'Équipe en Action 1',
    description: 'Démonstration d\'impression',
    path: '/production/equipe-prod-02.jpg',
    category: 'team'
  },
  {
    id: 9,
    title: 'Équipe en Action 2',
    description: 'Concentration sur production',
    path: '/production/equipe-prod-03.jpg',
    category: 'team'
  },
  {
    id: 10,
    title: 'Équipe en Action 3',
    description: 'Collaboration sur projet complexe',
    path: '/production/equipe-prod-04.jpg',
    category: 'team'
  },
  {
    id: 11,
    title: 'Équipe en Action 4',
    description: 'Réunion technique',
    path: '/production/equipe-prod-06.jpg',
    category: 'team'
  },
  {
    id: 12,
    title: 'Équipe en Action 5',
    description: 'Formation techniques nouvelles',
    path: '/production/equipe-prod-07.jpg',
    category: 'team'
  },
  {
    id: 13,
    title: 'Équipe en Action 6',
    description: 'Célébration commande réussie',
    path: '/production/equipe-prod-08.jpg',
    category: 'team'
  },
  {
    id: 14,
    title: 'Inauguration',
    description: 'Cérémonie d\'ouverture officielle',
    path: '/images/inauguration.jpg',
    category: 'event'
  },
  {
    id: 15,
    title: 'Équipe Familiale',
    description: 'L\'équipe fondatrice au complet',
    path: '/images/team-family.jpg',
    category: 'family'
  }
];

// Équipe de production - NOUVEAU
export const PRODUCTION_TEAM = [
  {
    id: 1,
    name: 'Marcel',
    role: 'Chef d\'atelier',
    description: 'Expert en sérigraphie depuis 15 ans',
    imagePath: '/production/marcel-prod.jpg',
    color: '#4CAF50'
  },
  {
    id: 2,
    name: 'Marcelin',
    role: 'Assistant production',
    description: 'Spécialiste préparation des écrans',
    imagePath: '/production/marcelin-prod.jpg',
    color: '#4CAF50'
  },
  {
    id: 3,
    name: 'Mbin',
    role: 'Opérateur machine',
    description: 'Responsable des impressions',
    imagePath: '/production/mbin-prod.jpg',
    color: '#4CAF50'
  },
  {
    id: 4,
    name: 'Miadrisoa',
    role: 'Contrôle qualité',
    description: 'Vérification finale des impressions',
    imagePath: '/production/miadrisoa-prod.jpg',
    color: '#4CAF50'
  },
  {
    id: 5,
    name: 'Ntsoa',
    role: 'Logistique',
    description: 'Gestion des stocks et livraisons',
    imagePath: '/production/ntsoa-prod.jpg',
    color: '#4CAF50'
  }
];

// Fonctions utilitaires améliorées
export const getProductionImage = (filename) => {
  return getImageUrl(`/production/${filename}`);
};

export const getProfileImage = (filename) => {
  return getImageUrl(`/profiles/${filename}`);
};

export const getGalleryImage = (image) => {
  return getImageUrl(image.path || image.filename);
};

export const getLogoUrl = () => {
  return getImageUrl('/images/logo.png');
};

export const getTeamFamilyImage = () => {
  return getImageUrl('/images/team-family.jpg');
};

// Configuration exportée pour compatibilité
export const IMAGES_CONFIG = {
  API_URL,
  BASE_URL,
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
  
  // Alias pour compatibilité
  familyMembers: FAMILY_MEMBERS,
  initializedMembers: FAMILY_MEMBERS,
  productionTeam: PRODUCTION_TEAM,
  galleryImages: GALLERY_IMAGES,
  
  // Logos et images générales
  LOGO: getLogoUrl(),
  LARGE_LOGO: getImageUrl('/images/bygagoos-large.png'),
  INAUGURATION: getImageUrl('/images/inauguration.jpg'),
  TEAM_FAMILY: getTeamFamilyImage(),
  ATELIER: getImageUrl('/production/atelier-serigraphie.jpg'),
  
  // Fonction d'avatar
  getAvatarUrl: (name, size = 100, bgColor = '2E7D32') => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bgColor}&color=fff&size=${size}`;
  }
};

export default IMAGES_CONFIG;