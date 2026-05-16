import { useState } from 'react';
import type { StaffMember, Task, AILogEntry, WarehouseZone } from '../data/types';
import { warehouseZones } from '../data/mockWarehouseZones';

export function useTaskAssignment() {
  const [logs, setLogs] = useState<AILogEntry[]>([
    {
      id: 'init',
      message: 'AI Assistant initialized. Monitoring warehouse operations.',
      timestamp: new Date().toLocaleTimeString(),
      type: 'info'
    }
  ]);

  const addLog = (message: string, type: AILogEntry['type']) => {
    setLogs(prev => [
      { id: Date.now().toString(), message, timestamp: new Date().toLocaleTimeString(), type },
      ...prev
    ]);
  };

  const calculateDistance = (pos1: {x: number, y: number}, pos2: {x: number, y: number}) => {
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
  };

  const findBestMatch = (task: Task, staffList: StaffMember[], tasksList: Task[]): StaffMember | null => {
    const targetZone = warehouseZones.find(z => z.name === task.zone);
    if (!targetZone) return null;

    const zoneCenter = {
      x: targetZone.x + targetZone.width / 2,
      y: targetZone.y + targetZone.height / 2
    };

    const availableStaff = staffList.filter(s => s.status === 'free');
    
    if (availableStaff.length > 0) {
      let bestScore = -1;
      let bestStaff: StaffMember | null = null;

      availableStaff.forEach(staff => {
        const distance = calculateDistance(staff.position, zoneCenter);
        const distanceScore = Math.max(0, 100 - (distance / 5));
        const perfScore = staff.score / 20;
        const totalScore = distanceScore + perfScore;
        
        if (totalScore > bestScore) {
          bestScore = totalScore;
          bestStaff = staff;
        }
      });
      return bestStaff;
    } else {
      // All staff are busy. Queue it to the one who will finish first!
      let bestStaff: StaffMember | null = null;
      let maxProgress = -1;
      
      const busyStaff = staffList.filter(s => s.status === 'busy');
      busyStaff.forEach(staff => {
        const currentTask = tasksList.find(t => t.id === staff.currentTaskId);
        if (currentTask) {
          const progress = currentTask.progress || 0;
          if (progress > maxProgress) {
            maxProgress = progress;
            bestStaff = staff;
          }
        }
      });
      
      return bestStaff || staffList[0];
    }
  };

  return {
    logs,
    addLog,
    findBestMatch
  };
}
