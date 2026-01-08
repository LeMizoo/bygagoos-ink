import fs from "fs";
import path from "path";

const SRC_DIR = path.resolve("src");
const EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];

const broken = [];

function fileExists(p) {
  return EXTENSIONS.some(ext => fs.existsSync(p + ext)) || fs.existsSync(p);
}

function scanFile(file) {
  const content = fs.readFileSync(file, "utf-8");
  const dir = path.dirname(file);

  const regex = /from\s+["'](.+?)["']/g;
  let match;

  while ((match = regex.exec(content))) {
    const importPath = match[1];

    if (
      importPath.startsWith(".") &&
      !fileExists(path.resolve(dir, importPath))
    ) {
      broken.push({
        file,
        import: importPath,
        resolved: path.resolve(dir, importPath),
      });
    }
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (EXTENSIONS.includes(path.extname(full))) scanFile(full);
  });
}

walk(SRC_DIR);

if (!broken.length) {
  console.log("✅ Aucun import cassé détecté");
} else {
  console.log("❌ IMPORTS CASSÉS :\n");
  broken.forEach(b => {
    console.log(`📄 ${b.file}`);
    console.log(`   ➜ ${b.import}`);
    console.log(`   ✗ ${b.resolved}\n`);
  });
}
