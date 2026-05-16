const fs = require('fs');
const path = require('path');

const directory = './src';

const replacements = [
  // Increase border contrast
  { regex: /border-gray-200/g, replacement: 'border-gray-300' },
  
  // Increase background contrast for sidebars/panels
  { regex: /bg-gray-50/g, replacement: 'bg-gray-100' },
  { regex: /bg-gray-100\/50/g, replacement: 'bg-gray-100' },
  
  // Increase text contrast
  { regex: /text-gray-500/g, replacement: 'text-gray-600' },
];

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else {
      if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = walkDir(directory);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  replacements.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
