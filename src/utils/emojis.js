// Mapping des emojis pour compatibilité
export const emojis = {
  // Logo et branding
  logo: '👕',
  factory: '🏭',
  family: '👨‍👩‍👧‍👦',
  
  // Fonctionnalités
  dashboard: '📊',
  orders: '🖨️',
  clients: '👔',
  production: '⚙️',
  stock: '📦',
  calendar: '📅',
  documents: '📄',
  accounting: '💰',
  logistics: '🚚',
  
  // Statut
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  
  // Actions
  add: '➕',
  edit: '✏️',
  delete: '🗑️',
  view: '👁️',
  download: '📥',
  upload: '📤',
  print: '🖨️',
  
  // Communication
  message: '💬',
  phone: '📱',
  email: '✉️',
  location: '📍',
  
  // Production
  design: '🎨',
  ink: '🖌️',
  screen: '🖼️',
  drying: '🌞',
  packaging: '📦',
  quality: '⭐',
  
  // Famille
  father: '👨',
  mother: '👩',
  son: '👦',
  daughter: '👧',
};

// Fonction helper
export const getEmoji = (key) => {
  return emojis[key] || '❓';
};