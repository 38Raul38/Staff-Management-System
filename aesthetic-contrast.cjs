const fs = require('fs');
const path = require('path');

const directory = './src';

const replacements = [
  // Make all borders slightly darker (gray-300 instead of gray-200) for clear separation without eye strain
  { regex: /border-gray-200/g, replacement: 'border-gray-300' },
  
  // Make main layout shadows slightly larger to lift them off the background
  { regex: /shadow-sm z-10/g, replacement: 'shadow-md z-10' },
  
  // Dashboard background: from very light #f4f4f5 to a more distinct gray-200
  // This creates the classic SaaS contrast: gray-200 background + white cards + gray-300 borders
  { regex: /bg-\[#f4f4f5\]/g, replacement: 'bg-gray-200' },
  
  // Soften the harsh black shadow on the detail panel
  { regex: /rgba\(0,0,0,0\.5\)/g, replacement: 'rgba(0,0,0,0.15)' }
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
      if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
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
