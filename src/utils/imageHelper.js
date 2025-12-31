// frontend/src/utils/imageHelper.js
/**
 * Helper d'images - Version CORRECTE
 */

// Fonction simple
export function getImageUrl(imageKey) {
  if (!imageKey) return '';
  
  if (imageKey.startsWith('/') || imageKey.startsWith('http')) {
    return imageKey;
  }
  
  // SIMPLE : retourne le chemin direct
  return `/${imageKey}`;
}

// Fonction de préchargement - EXPORTÉE CORRECTEMENT
export function preloadImage(imageKey) {
  const url = getImageUrl(imageKey);
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

// Fonction de préchargement multiple
export function preloadImages(imageKeys) {
  return Promise.all(imageKeys.map(key => preloadImage(key)));
}

// Export par défaut COMPLET
const imageHelper = {
  getImageUrl,
  preloadImage,
  preloadImages
};

export default imageHelper;