const fs = require('fs');
const path = require('path');

const directory = './src';

const replacements = [
  // Primary Green -> #0F763E
  { regex: /#5A9125/ig, replacement: '#0F763E' },
  { regex: /bg-\[#5A9125\]/g, replacement: 'bg-[#0F763E]' },
  { regex: /text-\[#5A9125\]/g, replacement: 'text-[#0F763E]' },
  { regex: /border-\[#5A9125\]/g, replacement: 'border-[#0F763E]' },

  // Backgrounds
  { regex: /bg-\[#F8FBF5\]/g, replacement: 'bg-gray-50' }, // App background
  { regex: /bg-\[#EAF4DE\]/g, replacement: 'bg-gray-100' }, // Secondary/Muted background
  { regex: /bg-\[#D1E5B9\]/g, replacement: 'bg-gray-100' }, // Accent background
  
  // Borders
  { regex: /border-\[#AEDB8A\]/g, replacement: 'border-gray-200' },
  { regex: /border-\[#D1E5B9\]/g, replacement: 'border-gray-200' },
  
  // Texts
  { regex: /text-\[#2A3F15\]/g, replacement: 'text-gray-900' }, // Headings/Main text
  { regex: /text-\[#415F1D\]/g, replacement: 'text-gray-700' }, // Subtext
  { regex: /text-\[#5B8529\]/g, replacement: 'text-gray-500' }, // Muted text

  // Hex Colors (for SVG or direct styling)
  { regex: /#F8FBF5/ig, replacement: '#F9FAFB' },
  { regex: /#EAF4DE/ig, replacement: '#F3F4F6' },
  { regex: /#D1E5B9/ig, replacement: '#E5E7EB' },
  { regex: /#AEDB8A/ig, replacement: '#E5E7EB' },
  { regex: /#2A3F15/ig, replacement: '#111827' },
  { regex: /#415F1D/ig, replacement: '#374151' },
  { regex: /#5B8529/ig, replacement: '#6B7280' },
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
