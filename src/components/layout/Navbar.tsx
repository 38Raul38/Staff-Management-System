import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
  <header className="h-14 border-b border-gray-300 bg-white flex items-center justify-end px-6 shadow-md z-10 relative">
    <div className="flex items-center gap-6 text-gray-700 text-xs font-medium">
      <div className="w-24 text-center">{time}</div>
      <div className="h-4 w-px bg-gray-200" />
      <Button variant="ghost" size="icon" className="w-8 h-8 relative">
        <Bell className="w-4 h-4" />
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF4444]" />
      </Button>
    </div>
  </header>
  );
}
