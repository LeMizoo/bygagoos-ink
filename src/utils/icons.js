// src/utils/icons.js
export const Icons = {
  // Navigation & Pages
  dashboard: '📊',
  orders: '📋',
  newOrder: '🆕',
  clients: '👥',
  production: '🏭',
  stock: '📦',
  calendar: '📅',
  documents: '📑',
  logistics: '🚚',
  accounting: '💰',
  profile: '👤',
  settings: '⚙️',
  family: '👨‍👩‍👧‍👦',
  home: '🏠',
  gallery: '🖼️',
  login: '🔐',
  navigation: '📍',
  
  // Actions
  add: '➕',
  edit: '✏️',
  delete: '🗑️',
  view: '👁️',
  download: '⬇️',
  upload: '⬆️',
  search: '🔍',
  filter: '🔧',
  refresh: '🔄',
  print: '🖨️',
  save: '💾',
  cancel: '❌',
  confirm: '✅',
  export: '📤',
  import: '📥',
  
  // Business
  invoice: '🧾',
  payment: '💳',
  delivery: '📦',
  quality: '⭐',
  workshop: '🏭',
  design: '🎨',
  customer: '👤',
  product: '👕',
  team: '👨‍👩‍👧‍👦',
  
  // Status & Indicators
  online: '🟢',
  offline: '🔴',
  pending: '🟡',
  completed: '✅',
  inProgress: '🔄',
  warning: '⚠️',
  error: '❌',
  info: 'ℹ️',
  success: '✅',
  
  // Time
  clock: '🕒',
  schedule: '📅',
  deadline: '⏰',
  today: '📌',
  soon: '⏳',
  
  // Communication
  email: '📧',
  phone: '📞',
  message: '💬',
  notification: '🔔',
  
  // Files & Documents
  pdf: '📄',
  excel: '📊',
  word: '📝',
  image: '🖼️',
  folder: '📁',
  contract: '📋',
  quote: '💵',
  
  // Finance
  revenue: '💰',
  expense: '💸',
  profit: '📈',
  growth: '📊',
  budget: '💳',
  
  // Logistics
  truck: '🚚',
  shipping: '📦',
  warehouse: '🏢',
  inventory: '📋',
  location: '📍',
  
  // Production
  machine: '⚙️',
  tools: '🛠️',
  qualityCheck: '✅',
  assembly: '🔧',
  packaging: '📦',
  
  // User Interface
  arrowRight: '→',
  arrowLeft: '←',
  arrowUp: '↑',
  arrowDown: '↓',
  external: '↗️',
  menu: '☰',
  close: '✕',
  check: '✓',
  star: '⭐',
  heart: '❤️',
  
  // ByGagoos Specific
  bygagoos: '👕',
  textile: '🧵',
  screenPrint: '🎨',
  tshirt: '👚',
  embroidery: '🪡',
  printing: '🖨️',
  colors: '🎨',
  fabric: '🧶',
  
  // System
  system: '💻',
  database: '🗄️',
  security: '🔒',
  backup: '💾',
  update: '🔄',
};

// Icônes par catégorie pour un usage organisé
export const CategoryIcons = {
  dashboard: Icons.dashboard,
  orders: Icons.orders,
  clients: Icons.clients,
  production: Icons.production,
  stock: Icons.stock,
  financial: Icons.accounting,
  logistics: Icons.logistics,
  documents: Icons.documents,
  calendar: Icons.calendar,
  profile: Icons.profile,
  settings: Icons.settings,
  team: Icons.team,
  family: Icons.family,
};

// Icônes par statut pour une cohérence visuelle
export const StatusIcons = {
  pending: '⏳',
  inProgress: '🔄',
  completed: '✅',
  delivered: '📦',
  cancelled: '❌',
  onHold: '⏸️',
  urgent: '🚨',
  lowPriority: '🐌',
  highPriority: '🔥',
  mediumPriority: '⚠️',
};

// Icônes par action pour les boutons
export const ActionIcons = {
  create: Icons.add,
  edit: Icons.edit,
  delete: Icons.delete,
  view: Icons.view,
  save: Icons.save,
  cancel: Icons.cancel,
  print: Icons.print,
  export: Icons.export,
  search: Icons.search,
  filter: Icons.filter,
};

export default Icons;