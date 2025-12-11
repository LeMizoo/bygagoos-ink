// tree.js - Génère la structure du projet
const fs = require('fs');
const path = require('path');

function generateTree(dir, prefix = '', depth = 0, maxDepth = 5) {
  const items = fs.readdirSync(dir).filter(item => 
    !item.startsWith('.') && 
    !['node_modules', 'dist', 'build', '.git'].includes(item)
  );
  
  let tree = '';
  
  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      tree += `${prefix}${isLast ? '└── ' : '├── '}📁 ${item}\n`;
      if (depth < maxDepth) {
        tree += generateTree(
          itemPath, 
          prefix + (isLast ? '    ' : '│   '), 
          depth + 1, 
          maxDepth
        );
      } else {
        tree += `${prefix}${isLast ? '    ' : '│   '}... (depth limit)\n`;
      }
    } else {
      const ext = path.extname(item);
      const size = (stats.size / 1024).toFixed(2) + ' KB';
      const icon = getFileIcon(ext);
      tree += `${prefix}${isLast ? '└── ' : '├── '}${icon} ${item} (${size})\n`;
    }
  });
  
  return tree;
}

function getFileIcon(ext) {
  const icons = {
    '.js': '📜',
    '.jsx': '⚛️',
    '.ts': '📘',
    '.tsx': '⚛️📘',
    '.json': '📄',
    '.md': '📝',
    '.html': '🌐',
    '.css': '🎨',
    '.scss': '🎨',
    '.png': '🖼️',
    '.jpg': '🖼️',
    '.svg': '🖼️',
    '.gitignore': '👁️',
    '.env': '🔐',
    '.lock': '🔒',
    '': '📄'
  };
  return icons[ext] || '📄';
}

// Générer et sauvegarder la structure
const projectRoot = process.cwd();
const treeStructure = generateTree(projectRoot, '', 0, 5);

console.log('🌳 Structure du projet ByGagoos-Ink :\n');
console.log(treeStructure);

// Sauvegarder dans un fichier
fs.writeFileSync('PROJECT_STRUCTURE.md', 
  `# Structure du Projet ByGagoos-Ink\n\n\`\`\`\n${treeStructure}\n\`\`\``
);
console.log('\n✅ Structure sauvegardée dans PROJECT_STRUCTURE.md');