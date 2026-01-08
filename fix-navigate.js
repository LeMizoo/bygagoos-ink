import fs from "fs";
import path from "path";

const SRC_DIR = path.join(process.cwd(), "src");

function isJsxFile(file) {
  return file.endsWith(".js") || file.endsWith(".jsx");
}

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!/archive|temp_backup/.test(fullPath)) {
        results = results.concat(walkDir(fullPath));
      }
    } else if (isJsxFile(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  if (/navigate\(/.test(content) || /navigate\./.test(content)) {
    // Ajouter import si manquant
    if (!/useNavigate/.test(content)) {
      content = `import { useNavigate } from "react-router-dom";\n${content}`;
      modified = true;
    }

    // Ajouter const navigate = useNavigate(); dans le composant fonction
    const functionMatch = content.match(/function\s+([A-Z]\w*)\s*\(/);
    if (functionMatch && !/const\s+navigate\s*=/.test(content)) {
      const idx = content.indexOf("{", content.indexOf(functionMatch[0])) + 1;
      content =
        content.slice(0, idx) +
        `\n  const navigate = useNavigate();` +
        content.slice(idx);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Patched navigate in: ${filePath}`);
  }
}

const files = walkDir(SRC_DIR);
files.forEach(processFile);
console.log("✅ Finished patching navigate.");
