export type StaffStatus = 'free' | 'busy' | 'break';
export type StaffRole = 'Picker' | 'Packer' | 'Loader' | 'Supervisor';
export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'assigned' | 'in-progress' | 'completed' | 'verified';

export interface Position {
 x: number;
 y: number;
}

export interface TaskHistory {
 taskId: string;
 description: string;
 zone: string;
 acceptTime: number; // seconds
 completionTime: number; // minutes
 completedAt: string;
}

export interface PointsBreakdown {
 speedToAccept: number;
 completionTime: number;
 accuracy: number;
 total: number;
}

export interface StaffMember {
 id: string;
 name: string;
 role: StaffRole;
 status: StaffStatus;
 avatar: string;
 position: Position;
 currentZone: string;
 currentTaskId: string | null;
 score: number;
 points: PointsBreakdown;
 taskHistory: TaskHistory[];
 tasksCompleted: number;
 avgAcceptTime: number;
 avgCompleteTime: number;
}

export interface Task {
 id: string;
 description: string;
 zone: string;
 priority: TaskPriority;
 status: TaskStatus;
 assignedTo: string | null;
 assignedToName: string | null;
 createdAt: string;
 estimatedDuration: number; // minutes
 progress: number; // 0-100
}

export interface WarehouseZone {
 id: string;
 name: string;
 label: string;
 x: number;
 y: number;
 width: number;
 height: number;
 color: string;
 type: 'storage' | 'loading' | 'packing' | 'staging' | 'receiving' | 'office';
}

export interface AILogEntry {
 id: string;
 message: string;
 timestamp: string;
 type: 'assignment' | 'announcement' | 'confirmation' | 'info';
}
