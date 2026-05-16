const fs = require('fs');
const path = require('path');

const directory = './src';

const replacements = [
  // Backgrounds
  { regex: /bg-\[#0D1117\]/g, replacement: 'bg-white' },
  { regex: /bg-\[#05080F\]/g, replacement: 'bg-green-50' },
  { regex: /bg-\[#0A0D14\]/g, replacement: 'bg-white' },
  { regex: /bg-\[#111822\]/g, replacement: 'bg-white' },
  { regex: /bg-\[#1A2332\]/g, replacement: 'bg-green-100' },
  { regex: /bg-\[#1E2A3A\]/g, replacement: 'bg-green-100' },
  { regex: /bg-\[#2A3F54\]/g, replacement: 'bg-green-200' },
  
  // Borders
  { regex: /border-\[#1E2A3A\]/g, replacement: 'border-green-300' },
  { regex: /border-\[#2A3F54\]/g, replacement: 'border-green-400' },
  
  // Text Colors
  { regex: /text-gray-100/g, replacement: 'text-green-950' },
  { regex: /text-gray-200/g, replacement: 'text-green-900' },
  { regex: /text-gray-300/g, replacement: 'text-green-800' },
  { regex: /text-gray-400/g, replacement: 'text-green-700' },
  { regex: /text-gray-500/g, replacement: 'text-green-600' },
  { regex: /text-gray-600/g, replacement: 'text-green-500' },
  { regex: /text-white/g, replacement: 'text-green-950' },

  // Hex Colors (SVG / custom strokes)
  { regex: /#0D1117/g, replacement: '#FFFFFF' },
  { regex: /#05080F/g, replacement: '#F0FDF4' },
  { regex: /#0A0D14/g, replacement: '#FFFFFF' },
  { regex: /#111822/g, replacement: '#FFFFFF' },
  { regex: /#1A2332/g, replacement: '#DCFCE7' },
  { regex: /#1E2A3A/g, replacement: '#DCFCE7' }, // green-100
  { regex: /#2A3F54/g, replacement: '#4ADE80' }, // green-400
  
  // Accents
  { regex: /#00FF88/g, replacement: '#16A34A' }, // Neon green -> darker green
  { regex: /text-\[#00FF88\]/g, replacement: 'text-green-600' },
  { regex: /bg-\[#00FF88\]/g, replacement: 'bg-green-600' },
  { regex: /border-\[#00FF88\]/g, replacement: 'border-green-600' },

  // Specific Tailwind classes with opacity
  { regex: /bg-green-100\/50/g, replacement: 'bg-green-200/50' }, // fix double replacements
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
