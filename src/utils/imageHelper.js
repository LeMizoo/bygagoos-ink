/**
 * Helper simplifié pour les URLs d'images
 * Utilise des chemins relatifs vers public/
 */

// NE PAS IMPORTER les images directement - utiliser des chemins
export const IMAGE_PATHS = {
  // Images principales (dans public/)
  logo: '/logo.png',
  teamFamily: '/team-family.jpg',
  inauguration: '/inauguration.jpg',
  bygagoosLarge: '/bygagoos-large.png',
  
  // Profils (dans public/profiles/)
  tiaFaniry: '/profiles/tia-faniry.jpg',
  miantsatiana: '/profiles/miantsatiana.jpg',
  tovoniaina: '/profiles/tovoniaina.jpg',
  volatiana: '/profiles/volatiana.jpg',
  
  // Production (dans public/production/)
  atelierSerigraphie: '/production/atelier-serigraphie.jpg',
  equipeSerigraphie: '/production/equipe-serigraphie.jpg',
  equipeProd02: '/production/equipe-prod-02.jpg',
  equipeProd03: '/production/equipe-prod-03.jpg',
  equipeProd04: '/production/equipe-prod-04.jpg',
  equipeProd06: '/production/equipe-prod-06.jpg',
  equipeProd07: '/production/equipe-prod-07.jpg',
  equipeProd08: '/production/equipe-prod-08.jpg',
  marcelProd: '/production/marcel-prod.jpg',
  marcelinProd: '/production/marcelin-prod.jpg',
  mbinProd: '/production/mbin-prod.jpg',
  miadrisoaProd: '/production/miadrisoa-prod.jpg',
  ntsoaProd: '/production/ntsoa-prod.jpg',
  
  // SVG
  viteSvg: '/vite.svg',
  
  // SVG des profils (optionnel)
  tiaFanirySvg: '/profiles/tiafaniry.svg',
  miantsatianaSvg: '/profiles/miantsatiana.svg',
  tovoniainaSvg: '/profiles/tovoniaina.svg',
  volatianaSvg: '/profiles/volatiana.svg',
  
  // Logos supplémentaires
  logoWebp: '/logo.svg',
  bygagoosLargePng: '/bygagoos-large.png'
};

/**
 * Obtient l'URL d'une image
 * @param {string} imageKey - Clé de l'image dans IMAGE_PATHS
 * @returns {string} URL complète de l'image
 */
export const getImageUrl = (imageKey) => {
  const path = IMAGE_PATHS[imageKey];
  if (!path) {
    console.warn(`Image non trouvée: ${imageKey}`);
    return `/${imageKey}`; // Fallback
  }
  return path; // Les chemins sont déjà absolus depuis public/
};

/**
 * Fonction pour compatibilité avec l'ancien code
 */
export const images = IMAGE_PATHS;

export default IMAGE_PATHS;