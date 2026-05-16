const fs = require('fs');
const path = require('path');

const directory = './src';

const replacements = [
  // Brighter aesthetic green
  { regex: /#0F763E/ig, replacement: '#16A34A' },
  
  // To increase overall contrast aesthetically, let's make sure 
  // secondary text isn't too light, and backgrounds aren't muddy.
  // We recently changed border-gray-200 to border-gray-300. 
  // Let's change border-gray-300 to border-gray-200 for a cleaner look,
  // but keep the text contrast high.
  { regex: /border-gray-300/g, replacement: 'border-gray-200' },
  { regex: /text-gray-600/g, replacement: 'text-gray-700' },
  { regex: /text-gray-500/g, replacement: 'text-gray-600' }
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
