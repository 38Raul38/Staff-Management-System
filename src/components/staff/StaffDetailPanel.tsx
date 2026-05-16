import React from 'react';
import { X, Trophy, Clock, CheckCircle2, Navigation, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import type { StaffMember, Task } from '../../data/types';
import { cn } from '@/lib/utils';

interface StaffDetailPanelProps {
 staff: StaffMember | null;
 onClose: () => void;
 currentTask?: Task;
 onAssignTask?: () => void;
}

export function StaffDetailPanel({ staff, onClose, currentTask, onAssignTask }: StaffDetailPanelProps) {
 if (!staff) return null;

 const isTopPerformer = staff.score > 1300;

 return (
 <div className="w-96 h-full bg-white border-l border-gray-300 flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.15)] transform transition-transform duration-300 ease-in-out z-20 absolute right-0 top-0">
 <div className="flex items-center justify-between p-4 border-b border-gray-300">
 <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
 <Activity className="w-4 h-4 text-[#16A34A]" />
 Operator Data
 </h2>
 <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-gray-700 hover:text-gray-900">
 <X className="h-4 w-4" />
 </Button>
 </div>

 <ScrollArea className="flex-1">
 <div className="p-6 space-y-6">
 {/* Profile Header */}
 <div className="flex items-center gap-4">
 <Avatar className="h-16 w-16 border-2 border-gray-300">
 <AvatarFallback className="bg-white text-gray-900 text-xl ">
 {staff.avatar}
 </AvatarFallback>
 </Avatar>
 <div>
 <h3 className="text-xl font-bold text-gray-900">{staff.name}</h3>
 <p className="text-sm text-gray-700 flex items-center gap-2 mt-1">
 {staff.role} • ID: {staff.id}
 </p>
 <div className="mt-2 flex gap-2">
 <Badge variant={
 staff.status === 'free' ? 'success' : 
 staff.status === 'busy' ? 'danger' : 'warning'
 }>
 {staff.status.toUpperCase()}
 </Badge>
 {isTopPerformer && (
 <Badge variant="outline" className="border-yellow-200 text-yellow-700 bg-yellow-50 gap-1">
 <Trophy className="w-3 h-3" /> Elite
 </Badge>
 )}
 </div>
 </div>
 </div>

 <Separator />

 {/* Current Status/Task */}
 <div>
 <h4 className="text-xs font-bold text-[#16A34A] mb-3 uppercase ">Current Objective</h4>
 {staff.status === 'busy' && currentTask ? (
 <Card className="bg-white border-[#16A34A]">
 <CardContent className="p-4">
 <div className="flex justify-between items-start mb-2">
 <Badge variant="outline" className=" bg-gray-100 border-transparent">
 {currentTask.id}
 </Badge>
 <span className="text-xs text-[#FF4444] animate-pulse">In Progress</span>
 </div>
 <p className="text-sm text-gray-900 mb-3">{currentTask.description}</p>
 <div className="space-y-1.5">
 <div className="flex justify-between text-xs">
 <span className="text-gray-700">Progress</span>
 <span className="text-[#16A34A] ">{currentTask.progress}%</span>
 </div>
 <Progress value={currentTask.progress} className="h-1.5" />
 </div>
 <div className="mt-3 flex items-center gap-2 text-xs text-gray-700">
 <Navigation className="w-3 h-3" /> Target: {currentTask.zone}
 </div>
 </CardContent>
 </Card>
 ) : staff.status === 'free' ? (
 <div className="text-center p-6 border border-dashed border-[#16A34A] rounded-lg bg-gray-100">
 <CheckCircle2 className="w-8 h-8 text-[#16A34A] mx-auto mb-2 opacity-50" />
 <p className="text-sm text-gray-700 mb-4">Operator is standing by for new assignments.</p>
 {onAssignTask && (
 <Button variant="neon" className="w-full" onClick={onAssignTask}>
 Assign Task manually
 </Button>
 )}
 </div>
 ) : (
 <div className="text-center p-6 border border-[#16A34A] rounded-lg bg-white">
 <Clock className="w-8 h-8 text-[#FFB800] mx-auto mb-2" />
 <p className="text-sm text-gray-700">Operator is currently on break.</p>
 </div>
 )}
 </div>

 {/* Performance Metrics */}
 <div>
 <h4 className="text-xs font-bold text-[#16A34A] mb-3 uppercase ">Performance Metrics</h4>
 <div className="grid grid-cols-2 gap-3">
 <Card className="bg-transparent border-gray-300">
 <CardContent className="p-3">
 <p className="text-xs text-gray-700 mb-1">Total Score</p>
 <p className="text-2xl text-[#16A34A]">{staff.score}</p>
 </CardContent>
 </Card>
 <Card className="bg-transparent border-gray-300">
 <CardContent className="p-3">
 <p className="text-xs text-gray-700 mb-1">Tasks Done</p>
 <p className="text-2xl text-gray-900">{staff.tasksCompleted}</p>
 </CardContent>
 </Card>
 <Card className="bg-transparent border-gray-300">
 <CardContent className="p-3">
 <p className="text-xs text-gray-700 mb-1">Avg Accept</p>
 <p className="text-lg text-gray-900">{staff.avgAcceptTime}s</p>
 </CardContent>
 </Card>
 <Card className="bg-transparent border-gray-300">
 <CardContent className="p-3">
 <p className="text-xs text-gray-700 mb-1">Avg Speed</p>
 <p className="text-lg text-gray-900">{staff.avgCompleteTime}m</p>
 </CardContent>
 </Card>
 </div>
 </div>

 {/* Task History */}
 <div>
 <h4 className="text-xs font-bold text-[#16A34A] mb-3 uppercase ">Recent History</h4>
 <div className="space-y-3">
 {staff.taskHistory.map((history, i) => (
 <div key={i} className="flex gap-3 text-sm">
 <div className="w-2 h-2 rounded-full bg-gray-100 mt-1.5 shrink-0" />
 <div>
 <p className="text-gray-700">{history.description}</p>
 <div className="flex gap-2 text-xs text-[#16A34A] mt-1">
 <span>{history.taskId}</span>
 <span>•</span>
 <span>{history.zone}</span>
 <span>•</span>
 <span>{history.completionTime}m</span>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </ScrollArea>
 </div>
 );
}
