import React from 'react';
import { Terminal, Cpu } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { AILogEntry } from '../../data/types';
import { cn } from '@/lib/utils';

interface AIAssistantLogProps {
 logs: AILogEntry[];
}

export function AIAssistantLog({ logs }: AIAssistantLogProps) {
 return (
 <div className="flex flex-col h-full">
 <div className="p-3 border-b border-gray-300 flex items-center gap-2 bg-white">
 <Cpu className="w-4 h-4 text-[#A855F7]" />
 <h3 className="text-xs font-bold text-gray-700 uppercase">Nexus_AI Core</h3>
 <div className="ml-auto flex items-center gap-1.5">
 <div className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
 <span className="text-[10px] text-[#16A34A] ">ONLINE</span>
 </div>
 </div>
 
 <ScrollArea className="flex-1 p-3 bg-gray-100">
 <div className="space-y-3 flex flex-col-reverse text-xs">
 {logs.map((log) => (
 <div key={log.id} className="flex gap-2 group">
 <div className="text-[#16A34A] shrink-0 select-none">
 {log.timestamp.split(' ')[0]}
 </div>
 <div className="flex gap-2 w-full">
 <span className="text-[#A855F7] select-none">&gt;</span>
 <span className={cn(
 "leading-relaxed break-words",
 log.type === 'assignment' ? "text-[#16A34A]" :
 log.type === 'announcement' ? "text-[#00BFFF]" :
 log.type === 'confirmation' ? "text-gray-900" : "text-gray-700"
 )}>
 {log.message}
 </span>
 </div>
 </div>
 ))}
 </div>
 </ScrollArea>
 </div>
 );
}
