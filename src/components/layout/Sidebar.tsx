import React from 'react';
import { LayoutDashboard, Users, ClipboardList, Settings, LogOut, Package2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
 currentPath: string;
}

import { useNavigate } from 'react-router-dom';

export function Sidebar({ currentPath }: SidebarProps) {
 const navigate = useNavigate();
 const navItems = [
 { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
 { name: 'Tasks', icon: ClipboardList, path: '/tasks' },
 { name: 'Leaderboard', icon: Users, path: '/leaderboard' },
 { name: 'Settings', icon: Settings, path: '/settings' },
 ];

 return (
 <div className="w-16 h-full bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4 z-20 shadow-md">
 <div className="mb-8 p-2 rounded bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A]/30">
 <Package2 className="w-6 h-6" />
 </div>

 <nav className="flex-1 w-full flex flex-col gap-4 items-center">
 {navItems.map((item) => (
 <Button
 key={item.name}
 variant="ghost"
 size="icon"
 title={item.name}
 onClick={() => navigate(item.path)}
 className={cn(
 "w-10 h-10 rounded-xl transition-all",
 currentPath === item.path
 ? "bg-gray-800 text-[#16A34A] shadow-md"
 : "text-gray-400 hover:text-white hover:bg-gray-800"
 )}
 >
 <item.icon className="w-5 h-5" />
 </Button>
 ))}
 </nav>

 <Button
 variant="ghost"
 size="icon"
 title="Logout"
 onClick={() => navigate('/')}
 className="text-gray-400 hover:text-red-400 hover:bg-gray-800"
 >
 <LogOut className="w-5 h-5" />
 </Button>
 </div>
 );
}
