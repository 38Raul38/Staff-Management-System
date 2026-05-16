import React from 'react';
import { Zap, ListTodo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TaskCard } from './TaskCard';
import type { Task, AILogEntry } from '../../data/types';

interface TaskQueueProps {
  tasks: Task[];
  activeTaskZone: string | null;
  onTaskClick: (task: Task) => void;
  onAutoAssign: () => void;
  onAssignAll: () => void;
  isAssigning: boolean;
  logs: AILogEntry[];
}

export function TaskQueue({ tasks, activeTaskZone, onTaskClick, onAutoAssign, onAssignAll, isAssigning, logs }: TaskQueueProps) {
  const pendingTasks = tasks.filter(t => t.status === 'pending');

  return (
  <div className="w-80 h-full bg-white border-l border-gray-300 flex flex-col shadow-md z-10 relative">
  <div className="p-4 border-b border-gray-300 bg-white">
  <div className="flex items-center justify-between mb-4">
  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
  <ListTodo className="w-4 h-4 text-[#00BFFF]" />
  Task Queue
  </h2>
  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
  {pendingTasks.length} Pending
  </span>
  </div>
  
  <div className="flex flex-col gap-2">
    <Button 
    variant="neon" 
    className="w-full flex gap-2 uppercase text-xs h-10"
    onClick={onAutoAssign}
    disabled={isAssigning || pendingTasks.length === 0}
    >
    <Zap className={`w-4 h-4 ${isAssigning ? 'animate-pulse' : ''}`} />
    {isAssigning ? 'Processing...' : 'Assign Next'}
    </Button>
    <Button 
    variant="outline" 
    className="w-full flex gap-2 uppercase text-xs h-10 border-[#16A34A] text-[#16A34A] hover:bg-green-50"
    onClick={onAssignAll}
    disabled={isAssigning || pendingTasks.length === 0}
    >
    Assign All
    </Button>
  </div>
  </div>

 <ScrollArea className="flex-1 p-3">
 <div className="space-y-3 pb-4">
 {pendingTasks.map(task => (
 <TaskCard 
 key={task.id} 
 task={task} 
 isActive={activeTaskZone === task.zone}
 onClick={() => onTaskClick(task)}
 />
 ))}
 {pendingTasks.length === 0 && (
 <div className="text-center p-8 text-[#16A34A] border border-dashed border-[#16A34A] rounded-lg mt-4">
 <p className="text-sm">Queue is empty.</p>
 </div>
 )}
 </div>
 </ScrollArea>

 </div>
 );
}
