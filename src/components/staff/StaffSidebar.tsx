import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { StaffMember } from '../../data/types';
import { cn } from '@/lib/utils';

interface StaffSidebarProps {
 staffList: StaffMember[];
 selectedStaff: StaffMember | null;
 onSelectStaff: (staff: StaffMember) => void;
}

export function StaffSidebar({ staffList, selectedStaff, onSelectStaff }: StaffSidebarProps) {
 const [search, setSearch] = React.useState('');

 const filteredStaff = staffList.filter(s => 
 s.name.toLowerCase().includes(search.toLowerCase()) ||
 s.role.toLowerCase().includes(search.toLowerCase()) ||
 s.currentZone.toLowerCase().includes(search.toLowerCase())
 );

 return (
 <div className="w-80 h-full bg-white border-r border-gray-300 flex flex-col shadow-md z-10 relative">
 <div className="p-4 border-b border-gray-300">
 <h2 className="text-xl font-bold text-gray-900 mb-4 ">Active Roster</h2>
 <div className="relative">
 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#16A34A]" />
 <Input 
 placeholder="Search staff, role, zone..." 
 className="pl-9 bg-gray-100 border-transparent focus-visible:border-[#16A34A]"
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 />
 </div>
 </div>
 
 <div className="p-4 flex gap-2 overflow-x-auto border-b border-gray-300 hide-scrollbar">
 <Badge variant="outline" className="border-green-200 text-[#16A34A] bg-green-50">
 Free ({staffList.filter(s => s.status === 'free').length})
 </Badge>
 <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50">
 Busy ({staffList.filter(s => s.status === 'busy').length})
 </Badge>
 <Badge variant="outline" className="border-yellow-200 text-yellow-700 bg-yellow-50">
 Break ({staffList.filter(s => s.status === 'break').length})
 </Badge>
 </div>

 <ScrollArea className="flex-1">
 <div className="p-2 space-y-1">
 {filteredStaff.map((staff) => (
 <div
 key={staff.id}
 onClick={() => onSelectStaff(staff)}
 className={cn(
 "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border",
 selectedStaff?.id === staff.id 
 ? "bg-gray-100 border-[#16A34A] shadow-md" 
 : "border-transparent hover:bg-gray-100 hover:border-gray-300"
 )}
 >
 <div className="relative">
 <Avatar className="h-10 w-10 border border-[#16A34A]">
 <AvatarFallback className="bg-white text-gray-700 text-xs">
 {staff.avatar}
 </AvatarFallback>
 </Avatar>
 <div className={cn(
 "absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#FFFFFF]",
 staff.status === 'free' ? "bg-[#16A34A]" :
 staff.status === 'busy' ? "bg-[#FF4444]" : "bg-[#FFB800]"
 )} />
 </div>
 
 <div className="flex-1 min-w-0">
 <div className="flex items-center justify-between">
 <p className="text-sm font-medium text-gray-900 truncate">{staff.name}</p>
 <span className="text-xs text-[#16A34A]">{staff.score}pt</span>
 </div>
 <div className="flex items-center text-xs text-gray-700 gap-2 mt-0.5">
 <span className="truncate">{staff.role}</span>
 <span>•</span>
 <span className="">{staff.currentZone}</span>
 </div>
 </div>
 </div>
 ))}
 {filteredStaff.length === 0 && (
 <div className="p-4 text-center text-[#16A34A] text-sm">
 No staff found matching criteria.
 </div>
 )}
 </div>
 </ScrollArea>
 </div>
 );
}
