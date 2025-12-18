// frontend/src/utils/urlChecker.js
export const checkAllUrls = () => {
  if (typeof window === 'undefined') return;
  
  console.log('🔍 Vérification des URLs en cours...');
  
  const API_URL = import.meta.env.VITE_API_URL || 'https://bygagoos-ink-backend.vercel.app';
  console.log('URL API configurée:', API_URL);
  
  // Vérifier toutes les images
  const images = document.querySelectorAll('img');
  let localhostFound = false;
  
  images.forEach(img => {
    const src = img.src;
    if (src.includes('localhost:300') || src.includes('127.0.0.1')) {
      console.error('❌ Image avec localhost:', {
        src: src,
        alt: img.alt,
        parent: img.parentElement?.tagName
      });
      localhostFound = true;
      
      // Tenter de corriger automatiquement
      if (src.includes('localhost:3001')) {
        const newSrc = src.replace('http://localhost:3001', API_URL);
        img.src = newSrc;
        console.log('🔄 Image corrigée:', newSrc);
      }
    }
  });
  
  // Vérifier les background images en CSS
  const styleSheets = document.styleSheets;
  for (let i = 0; i < styleSheets.length; i++) {
    try {
      const rules = styleSheets[i].cssRules || styleSheets[i].rules;
      for (let j = 0; j < rules.length; j++) {
        const rule = rules[j];
        if (rule.style && rule.style.backgroundImage) {
          const bg = rule.style.backgroundImage;
          if (bg.includes('localhost')) {
            console.error('❌ Background avec localhost:', {
              selector: rule.selectorText,
              background: bg
            });
            localhostFound = true;
          }
        }
      }
    } catch (e) {
      // Ignorer les erreurs CORS
    }
  }
  
  if (!localhostFound) {
    console.log('✅ Aucune URL localhost trouvée dans les images et styles');
  }
  
  // Vérifier le localStorage
  const config = localStorage.getItem('app_config');
  if (config) {
    try {
      const parsed = JSON.parse(config);
      if (parsed.apiUrl && parsed.apiUrl.includes('localhost')) {
        console.error('❌ Configuration avec localhost dans localStorage:', parsed.apiUrl);
        // Corriger dans localStorage
        parsed.apiUrl = API_URL;
        localStorage.setItem('app_config', JSON.stringify(parsed));
        console.log('🔄 localStorage corrigé');
      }
    } catch (e) {
      // Ignorer
    }
  }
  
  return localhostFound;
};

// Fonction pour scanner tout le DOM
export const scanForMixedContent = () => {
  const issues = [];
  
  // Scanner les balises
  const tags = ['img', 'script', 'link', 'iframe', 'audio', 'video', 'source'];
  
  tags.forEach(tag => {
    document.querySelectorAll(tag).forEach(el => {
      const attrs = ['src', 'href', 'data-src', 'data-href'];
      attrs.forEach(attr => {
        const value = el.getAttribute(attr);
        if (value && value.startsWith('http://') && !value.startsWith('http://localhost')) {
          issues.push({
            type: tag,
            attr: attr,
            value: value,
            element: el
          });
        }
      });
    });
  });
  
  if (issues.length > 0) {
    console.warn('⚠️ Problèmes de Mixed Content trouvés:', issues);
  }
  
  return issues;
};

// Fonction de correction automatique
export const fixMixedContent = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'https://bygagoos-ink-backend.vercel.app';
  let fixedCount = 0;
  
  // Corriger les images
  document.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (src && src.includes('http://localhost:3001')) {
      const newSrc = src.replace('http://localhost:3001', API_URL);
      img.setAttribute('src', newSrc);
      fixedCount++;
      console.log(`🔄 Image corrigée: ${src} -> ${newSrc}`);
    }
  });
  
  // Corriger les scripts
  document.querySelectorAll('script[src]').forEach(script => {
    const src = script.getAttribute('src');
    if (src && src.includes('http://localhost:')) {
      script.remove();
      console.warn('❌ Script localhost supprimé:', src);
      fixedCount++;
    }
  });
  
  console.log(`✅ ${fixedCount} éléments corrigés`);
  return fixedCount;
};

// Initialisation automatique en production
if (import.meta.env.PROD) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const hasIssues = checkAllUrls();
      if (hasIssues) {
        console.warn('🔧 Tentative de correction automatique...');
        fixMixedContent();
      }
    }, 2000);
  });
}