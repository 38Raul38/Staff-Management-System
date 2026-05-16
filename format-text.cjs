const fs = require('fs');
const path = require('path');

const directory = './src';

const replacements = [
  { regex: /FACILITY_OVERVIEW/g, replacement: 'Facility Overview' },
  { regex: /ACTIVE ROSTER/g, replacement: 'Active Roster' },
  { regex: /LOGSYS/g, replacement: 'Logistics' },
  { regex: /_NEXUS/g, replacement: ' Nexus' },
  { regex: /SYS_LINK: ACTIVE/g, replacement: 'System Link: Active' },
  { regex: /OPERATOR_DATA/g, replacement: 'Operator Data' },
  { regex: /TASK_QUEUE/g, replacement: 'Task Queue' },
  { regex: / PENDING/g, replacement: ' Pending' },
  { regex: /AI AUTO-ASSIGN NEXT/g, replacement: 'AI Auto-Assign Next' },
  { regex: /PROCESSING\.\.\./g, replacement: 'Processing...' },
  { regex: /IN PROGRESS/g, replacement: 'In Progress' },
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
