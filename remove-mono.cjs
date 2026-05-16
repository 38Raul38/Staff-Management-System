const fs = require('fs');
const path = require('path');

const directory = './src';

const replacements = [
  { regex: /\bfont-mono\b/g, replacement: '' },
  { regex: /\btracking-widest\b/g, replacement: '' },
  { regex: /\btracking-wider\b/g, replacement: '' },
  { regex: /\btracking-tight\b/g, replacement: '' },
  { regex: / {2,}/g, replacement: ' ' }, // cleanup double spaces left behind
  { regex: / \b/g, replacement: ' ' }
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
  
  // Also clean up any empty classNames that might have resulted
  content = content.replace(/className="\s+"/g, '');
  content = content.replace(/className={`\s+`}/g, '');
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
