const fs = require('fs');

function update(file, search, replaceStr) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(search, replaceStr);
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
}

update('./src/components/layout/Navbar.tsx', 'className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6"', 'className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6 shadow-sm z-10 relative"');

update('./src/components/staff/StaffSidebar.tsx', 'className="w-80 h-full bg-white border-r border-gray-200 flex flex-col"', 'className="w-80 h-full bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 relative"');

update('./src/components/tasks/TaskQueue.tsx', 'className="w-80 h-full bg-white border-l border-gray-200 flex flex-col"', 'className="w-80 h-full bg-white border-l border-gray-200 flex flex-col shadow-sm z-10 relative"');

update('./src/components/map/WarehouseMap.tsx', 'className="relative w-full h-full min-h-[500px] bg-white rounded-lg border border-gray-200 overflow-hidden"', 'className="relative w-full h-full min-h-[500px] bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"');

update('./src/pages/Dashboard.tsx', 'bg-gray-100', 'bg-[#f4f4f5]');
