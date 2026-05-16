import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { WarehouseMap } from '../components/map/WarehouseMap';
import { StaffSidebar } from '../components/staff/StaffSidebar';
import { StaffDetailPanel } from '../components/staff/StaffDetailPanel';
import { TaskQueue } from '../components/tasks/TaskQueue';
import { useStaffSimulation } from '../hooks/useStaffSimulation';
import { useTaskAssignment } from '../hooks/useTaskAssignment';
import { mockTasks } from '../data/mockTasks';
import { warehouseZones } from '../data/mockWarehouseZones';
import type { StaffMember, Task } from '../data/types';
import { useToast } from '../hooks/use-toast';

export function Dashboard() {
  const { staff, updateStaffStatus } = useStaffSimulation();
  const { logs, addLog, findBestMatch } = useTaskAssignment();
  const { toast } = useToast();

  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [activeTaskZone, setActiveTaskZone] = useState<string | null>(null);
  const [assignmentAnim, setAssignmentAnim] = useState<{staff: StaffMember, targetZone: string} | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);

  // 1. Task progress simulation tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTasks(prev => {
        let changed = false;
        const mapped = prev.map(t => {
          if (t.status === 'in-progress') {
            changed = true;
            // Complete tasks over time
            const newProgress = Math.min(100, t.progress + 20);
            const newStatus: Task['status'] = newProgress === 100 ? 'completed' : 'in-progress';
            return { ...t, progress: newProgress, status: newStatus };
          }
          return t;
        });
        return changed ? mapped : prev;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // 2. Queue & Completion Processor
  useEffect(() => {
    staff.forEach(member => {
      // Check if busy staff finished their task
      if (member.status === 'busy' && member.currentTaskId) {
        const t = tasks.find(tsk => tsk.id === member.currentTaskId);
        if (t && t.status === 'completed') {
          updateStaffStatus(member.id, { status: 'free', currentTaskId: null });
        }
      } 
      // Check if free staff has assigned tasks waiting
      else if (member.status === 'free') {
        const nextTask = tasks.find(tsk => tsk.status === 'assigned' && tsk.assignedTo === member.id);
        if (nextTask) {
          // Find zone coordinates to teleport the marker
          const targetZone = warehouseZones.find(z => z.name === nextTask.zone);
          let newPos = member.position;
          if (targetZone) {
            newPos = {
              x: targetZone.x + targetZone.width / 2 + (Math.random() * 40 - 20),
              y: targetZone.y + targetZone.height / 2 + (Math.random() * 40 - 20)
            };
          }
          
          updateStaffStatus(member.id, { 
            status: 'busy', 
            currentTaskId: nextTask.id,
            currentZone: nextTask.zone,
            position: newPos
          });
          
          setTasks(prev => prev.map(pt => pt.id === nextTask.id ? { ...pt, status: 'in-progress', progress: 0 } : pt));
          addLog(`Operator ${member.name} relocated to ${nextTask.zone} and started task.`, 'confirmation');
        }
      }
    });
  }, [tasks, staff, updateStaffStatus, addLog]);

  const handleTaskClick = (task: Task) => {
    setActiveTaskZone(task.zone === activeTaskZone ? null : task.zone);
  };

  const handleAutoAssign = () => {
    const pendingTasks = tasks.filter(t => t.status === 'pending');
    if (pendingTasks.length === 0) return;

    setIsAssigning(true);
    
    // Sort tasks by priority (high first)
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const taskToAssign = pendingTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])[0];

    // Find best match (passes 'tasks' now so it can predict queues)
    const bestStaff = findBestMatch(taskToAssign, staff, tasks);

    if (bestStaff) {
      const isQueued = bestStaff.status === 'busy';
      addLog(`Analyzing optimal routes for Task ${taskToAssign.id}...`, 'info');
      
      setTimeout(() => {
        // Animation
        setAssignmentAnim({ staff: bestStaff, targetZone: taskToAssign.zone });
        
        if (isQueued) {
          addLog(`All operators busy. Task ${taskToAssign.zone} queued for ${bestStaff.name} (finishes soonest).`, 'assignment');
        } else {
          addLog(`Match found: ${bestStaff.name} assigned to ${taskToAssign.zone}`, 'assignment');
        }
        
        setActiveTaskZone(taskToAssign.zone);
        
        toast({
          title: isQueued ? "Task Queued" : "AI Assignment Initialized",
          description: isQueued ? `Queued for ${bestStaff.name}` : `Routing Task ${taskToAssign.id} to ${bestStaff.name}`,
          variant: isQueued ? "warning" : "success",
        });

        setTimeout(() => {
          // Announcement
          addLog(`Broadcasting assignment to operator device...`, 'announcement');
          
          setTimeout(() => {
            // Confirmation
            addLog(`Operator ${bestStaff.name} confirmed receipt.`, 'confirmation');
            
            // Just assign the task. The Queue Processor will handle moving the staff and starting the task.
            setTasks(prev => prev.map(t => 
              t.id === taskToAssign.id 
                ? { ...t, status: 'assigned', assignedTo: bestStaff.id, assignedToName: bestStaff.name }
                : t
            ));
            
            setAssignmentAnim(null);
            setActiveTaskZone(null);
            setIsAssigning(false);
          }, 2000);
        }, 1500);
      }, 1000);
    } else {
      addLog(`Failed to assign Task ${taskToAssign.id}: No available operators found.`, 'info');
      setIsAssigning(false);
      toast({
        title: "Assignment Failed",
        description: "No operators are currently available.",
        variant: "destructive",
      });
    }
  };

  const handleAssignAll = () => {
    const pendingTasks = tasks.filter(t => t.status === 'pending');
    if (pendingTasks.length === 0) return;

    setIsAssigning(true);
    
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const sortedTasks = pendingTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

    let currentTasks = [...tasks];
    let currentStaff = [...staff];
    let logsToAdd: string[] = [];

    sortedTasks.forEach(taskToAssign => {
       const bestStaff = findBestMatch(taskToAssign, currentStaff, currentTasks);
       if (bestStaff) {
          const taskIndex = currentTasks.findIndex(t => t.id === taskToAssign.id);
          currentTasks[taskIndex] = {
             ...currentTasks[taskIndex],
             status: 'assigned',
             assignedTo: bestStaff.id,
             assignedToName: bestStaff.name
          };

          const staffIndex = currentStaff.findIndex(s => s.id === bestStaff.id);
          if (currentStaff[staffIndex].status === 'free') {
             currentStaff[staffIndex] = {
                ...currentStaff[staffIndex],
                status: 'busy',
                currentTaskId: taskToAssign.id
             };
          }

          logsToAdd.push(`Queued ${taskToAssign.zone} to ${bestStaff.name}`);
       }
    });

    addLog(`Initiating bulk assignment for ${sortedTasks.length} tasks...`, 'info');

    setTimeout(() => {
       setTasks(currentTasks);
       logsToAdd.forEach(log => addLog(log, 'assignment'));
       toast({ title: "Bulk Assignment Complete", description: `Assigned ${sortedTasks.length} tasks.` });
       setIsAssigning(false);
    }, 1500);
  };

  return (
    <div className="h-screen w-screen bg-gray-200 text-gray-900 overflow-hidden flex">
      <Sidebar currentPath="/" />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel */}
          <StaffSidebar 
            staffList={staff}
            selectedStaff={selectedStaff}
            onSelectStaff={setSelectedStaff}
          />
          
          {/* Center Main View */}
          <main className="flex-1 relative p-6 flex flex-col h-full overflow-hidden">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Facility Overview</h2>
                <p className="text-sm text-gray-700">Live operator tracking and zone utilization.</p>
              </div>
            </div>
            
            <div className="flex-1 min-h-0 w-full relative">
              <WarehouseMap 
                staffList={staff}
                selectedStaff={selectedStaff}
                onSelectStaff={setSelectedStaff}
                activeTaskZone={activeTaskZone}
                assignmentAnim={assignmentAnim}
              />
              
              <StaffDetailPanel 
                staff={selectedStaff}
                onClose={() => setSelectedStaff(null)}
                currentTask={selectedStaff?.currentTaskId ? tasks.find(t => t.id === selectedStaff.currentTaskId) : undefined}
                onAssignTask={() => {
                  toast({
                    title: "Manual Assignment",
                    description: "Manual assignment override initiated.",
                  })
                }}
              />
            </div>
          </main>
          
          {/* Right Panel */}
          <TaskQueue 
            tasks={tasks}
            activeTaskZone={activeTaskZone}
            onTaskClick={handleTaskClick}
            onAutoAssign={handleAutoAssign}
            onAssignAll={handleAssignAll}
            isAssigning={isAssigning}
            logs={logs}
          />
        </div>
      </div>
    </div>
  );
}
