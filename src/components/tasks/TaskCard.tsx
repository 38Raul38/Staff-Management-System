import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Task } from '../../data/types';
import { cn } from '@/lib/utils';

interface TaskCardProps {
 task: Task;
 onClick: () => void;
 isActive: boolean;
}

export function TaskCard({ task, onClick, isActive }: TaskCardProps) {
 return (
 <Card 
 className={cn(
 "cursor-pointer transition-all duration-200 border bg-white",
 isActive 
 ? "border-[#16A34A] shadow-md" 
 : "border-gray-300 hover:border-[#16A34A] hover:bg-gray-100"
 )}
 onClick={onClick}
 >
 <CardContent className="p-4">
 <div className="flex justify-between items-start mb-2">
 <div className="flex items-center gap-2">
 <Badge variant="outline" className=" text-xs border-[#16A34A] text-gray-700">
 {task.id}
 </Badge>
 {task.priority === 'high' && (
 <Badge variant="destructive" className="bg-red-50 text-red-700 border-transparent text-[10px] px-1.5 py-0">
 HIGH PRIO
 </Badge>
 )}
 </div>
 <span className="text-xs text-[#16A34A] ">
 {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
 </span>
 </div>
 
 <p className="text-sm font-medium text-gray-900 mb-3">{task.description}</p>
 
 <div className="flex items-center justify-between text-xs text-gray-700">
 <div className="flex items-center gap-1.5">
 <MapPin className="w-3.5 h-3.5 text-[#00BFFF]" />
 <span className="">{task.zone}</span>
 </div>
 <div className="flex items-center gap-1.5">
 <Clock className="w-3.5 h-3.5" />
 <span>{task.estimatedDuration}m est.</span>
 </div>
 </div>
 </CardContent>
 </Card>
 );
}
