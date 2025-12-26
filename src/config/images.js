// Configuration des chemins d'images
export const IMAGE_PATHS = {
  // Chemins relatifs pour les images dans public/
  logo: '/logo.png',
  teamFamily: '/team-family.jpg',
  inauguration: '/inauguration.jpg',
  bygagoosLarge: '/bygagoos-large.png',
  
  // Profiles
  tiaFaniry: '/profiles/tia-faniry.jpg',
  miantsatiana: '/profiles/miantsatiana.jpg',
  tovoniaina: '/profiles/tovoniaina.jpg',
  volatiana: '/profiles/volatiana.jpg',
  
  // Production
  atelierSerigraphie: '/production/atelier-serigraphie.jpg',
  equipeSerigraphie: '/production/equipe-serigraphie.jpg',
  
  // Autres
  viteSvg: '/vite.svg'
};

/**
 * Obtient l'URL complète d'une image
 */
export const getImageUrl = (imageKey) => {
  const baseUrl = import.meta.env.BASE_URL || '';
  const path = IMAGE_PATHS[imageKey] || imageKey;
  return `${baseUrl}${path}`;
};

/**
 * Fonction pour utiliser les images importées ou les chemins
 */
export const imageResolver = {
  // Vous pouvez utiliser soit l'import direct, soit le chemin
  resolve: (imageKey) => {
    // En développement, on peut utiliser les imports
    if (import.meta.env.DEV) {
      try {
        // Tente d'importer dynamiquement
        const image = require(`../assets/${imageKey}`);
        return image.default || image;
      } catch {
        // Fallback au chemin
        return getImageUrl(imageKey);
      }
    }
    // En production, utilise les chemins
    return getImageUrl(imageKey);
  }
};

export default IMAGE_PATHS;