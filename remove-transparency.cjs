const fs = require('fs');
const path = require('path');

const directory = './src';

const replacements = [
  // Backdrop blur and white/80
  { regex: /bg-white\/80/g, replacement: 'bg-white' },
  { regex: /backdrop-blur-sm/g, replacement: '' },
  { regex: /backdrop-blur/g, replacement: '' },

  // Transparencies with /50
  { regex: /border-yellow-500\/50 text-yellow-500 bg-yellow-500\/10/g, replacement: 'border-yellow-200 text-yellow-700 bg-yellow-50' },
  { regex: /bg-white\/50/g, replacement: 'bg-gray-50' },
  { regex: /bg-gray-100\/50/g, replacement: 'bg-gray-100' },
  { regex: /hover:bg-gray-100\/50/g, replacement: 'hover:bg-gray-50' },
  { regex: /focus-visible:border-\[#0F763E\]\/50/g, replacement: 'focus-visible:border-[#0F763E]' },
  { regex: /focus-visible:ring-\[#0F763E\]\/50/g, replacement: 'focus-visible:ring-[#0F763E]' },
  { regex: /focus:ring-\[#0F763E\]\/50/g, replacement: 'focus:ring-[#0F763E]' },
  { regex: /border-\[#0F763E\]\/50/g, replacement: 'border-[#0F763E]' },

  // Transparencies with /10, /20, /30
  { regex: /bg-\[#0F763E\]\/10/g, replacement: 'bg-green-50' },
  { regex: /border-\[#0F763E\]\/30/g, replacement: 'border-green-200' },
  { regex: /hover:bg-\[#0F763E\]\/20/g, replacement: 'hover:bg-green-100' },
  { regex: /hover:bg-red-400\/10/g, replacement: 'hover:bg-red-50' },
  
  { regex: /border-\[#FF4444\]\/30 text-\[#FF4444\] bg-\[#FF4444\]\/10/g, replacement: 'border-red-200 text-red-700 bg-red-50' },
  { regex: /border-\[#FFB800\]\/30 text-\[#FFB800\] bg-\[#FFB800\]\/10/g, replacement: 'border-yellow-200 text-yellow-700 bg-yellow-50' },
  
  { regex: /border-red-500\/30 bg-red-500\/10/g, replacement: 'border-red-200 bg-red-50' },
  { regex: /border-amber-500\/30 bg-amber-500\/10/g, replacement: 'border-yellow-200 bg-yellow-50' },
  
  // Badge and TaskCard specifics
  { regex: /bg-emerald-500\/20 text-emerald-400 border-emerald-500\/30/g, replacement: 'bg-green-50 text-[#0F763E] border-green-200' },
  { regex: /bg-amber-500\/20 text-amber-400 border-amber-500\/30/g, replacement: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { regex: /bg-red-500\/20 text-red-400 border-red-500\/30/g, replacement: 'bg-red-50 text-red-700 border-red-200' },
  { regex: /bg-red-500\/20 text-red-400/g, replacement: 'bg-red-50 text-red-700' },

  // Shadows
  { regex: /shadow-\[0_0_15px_rgba\(0,255,136,0.1\)\]/g, replacement: 'shadow-md' },
  { regex: /hover:shadow-\[0_0_20px_rgba\(0,255,136,0.15\)\]/g, replacement: 'hover:shadow-md' }
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
