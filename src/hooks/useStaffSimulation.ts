import { useState, useEffect } from 'react';
import type { StaffMember } from '../data/types';
import { mockStaff } from '../data/mockStaff';

export function useStaffSimulation() {
 const [staff, setStaff] = useState<StaffMember[]>(mockStaff);

 useEffect(() => {
 // Simulate slight movement of staff every 2 seconds
 const interval = setInterval(() => {
 setStaff(prevStaff => prevStaff.map(member => {
 // Only move busy or free staff slightly, break staff stay still
 if (member.status === 'break') return member;
 
 const moveX = (Math.random() - 0.5) * 5;
 const moveY = (Math.random() - 0.5) * 5;
 
 return {
 ...member,
 position: {
 x: Math.max(20, Math.min(680, member.position.x + moveX)),
 y: Math.max(20, Math.min(380, member.position.y + moveY))
 }
 };
 }));
 }, 2000);

 return () => clearInterval(interval);
 }, []);

 const updateStaffStatus = (id: string, updates: Partial<StaffMember>) => {
 setStaff(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
 };

 return { staff, updateStaffStatus };
}
