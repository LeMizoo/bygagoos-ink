// frontend/src/config/images.js
export const IMAGES_CONFIG = {
  // URLs de base
  API_BASE_URL: 'http://localhost:3001/api',
  PUBLIC_URL: 'http://localhost:3001/api/public',
  
  // Chemins des images
  profiles: {
    tovoniaina: '/profiles/tovoniaina.jpg',
    volatiana: '/profiles/volatiana.jpg',
    miantsatiana: '/profiles/miantsatiana.jpg',
    faniry: '/profiles/tia-faniry.jpg',
  },
  
  logo: '/images/logo.png',
  
  // URLs complètes
  getProfileUrl: (filename) => {
    return `http://localhost:3001/api/public/profiles/${filename}`;
  },
  
  getImageUrl: (path) => {
    return `http://localhost:3001/api/public${path}`;
  },
  
  // Fonction pour obtenir l'image d'un membre
  getMemberImage: (memberName) => {
    const name = memberName.toLowerCase();
    
    if (name.includes('tovoniaina')) {
      return IMAGES_CONFIG.getImageUrl('/profiles/tovoniaina.jpg');
    }
    if (name.includes('volatiana')) {
      return IMAGES_CONFIG.getImageUrl('/profiles/volatiana.jpg');
    }
    if (name.includes('miantsatiana')) {
      return IMAGES_CONFIG.getImageUrl('/profiles/miantsatiana.jpg');
    }
    if (name.includes('faniry') || name.includes('tia')) {
      return IMAGES_CONFIG.getImageUrl('/profiles/tia-faniry.jpg');
    }
    
    // Fallback
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(memberName)}&background=2E7D32&color=fff`;
  },
  
  // Fonction pour vérifier si une image existe
  checkImageExists: async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  },
  
  // Liste des membres familiaux (noms corrigés)
  familyMembers: [
    {
      id: 1,
      name: 'Tovoniaina RAHENDRISON',
      email: 'tovoniaina.rahendrison@gmail.com',
      role: 'STRUCTURE',
      color: '#2E7D32',
      emoji: '👑',
      description: 'Direction & Stratégie',
      image: '/profiles/tovoniaina.jpg',
      password: 'ByGagoos2025!'
    },
    {
      id: 2,
      name: 'Volatiana RANDRIANARISOA',
      email: 'dedettenadia@gmail.com',
      role: 'INSPIRATION',
      color: '#9C27B0',
      emoji: '💡',
      description: 'Idées & Innovation',
      image: '/profiles/volatiana.jpg',
      password: 'ByGagoos2025!'
    },
    {
      id: 3,
      name: 'Miantsatiana RAHENDRISON',
      email: 'miantsatianarahendrison@gmail.com',
      role: 'CREATION',
      color: '#FF9800',
      emoji: '🎨',
      description: 'Production & Réalisation',
      image: '/profiles/miantsatiana.jpg',
      password: 'ByGagoos2025!'
    },
    {
      id: 4,
      name: 'Tia Faniry RAHENDRISON',
      email: 'fanirytia17@gmail.com',
      role: 'COMMUNICATION',
      color: '#2196F3',
      emoji: '📢',
      description: 'Marketing & Relations',
      image: '/profiles/tia-faniry.jpg',
      password: 'ByGagoos2025!'
    }
  ]
};