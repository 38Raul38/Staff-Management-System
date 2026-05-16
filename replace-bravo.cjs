const fs = require('fs');
const path = require('path');

const directory = './src';

const replacements = [
  // Backgrounds
  { regex: /bg-green-50/g, replacement: 'bg-[#F8FBF5]' },
  { regex: /bg-green-100/g, replacement: 'bg-[#EAF4DE]' },
  { regex: /bg-green-200/g, replacement: 'bg-[#D1E5B9]' },
  { regex: /bg-green-600/g, replacement: 'bg-[#82C341]' },
  
  // Borders
  { regex: /border-green-300/g, replacement: 'border-[#AEDB8A]' },
  { regex: /border-green-400/g, replacement: 'border-[#82C341]' },
  { regex: /border-green-600/g, replacement: 'border-[#82C341]' },
  
  // Text Colors
  { regex: /text-green-500/g, replacement: 'text-[#82C341]' },
  { regex: /text-green-600/g, replacement: 'text-[#82C341]' },
  { regex: /text-green-700/g, replacement: 'text-[#5B8529]' },
  { regex: /text-green-800/g, replacement: 'text-[#415F1D]' },
  { regex: /text-green-900/g, replacement: 'text-[#2A3F15]' },
  { regex: /text-green-950/g, replacement: 'text-[#2A3F15]' },

  // Hex Colors from previous replacement
  { regex: /#16A34A/g, replacement: '#82C341' },
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
