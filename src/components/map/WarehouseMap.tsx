import React, { useMemo } from 'react';
import type { StaffMember, Task } from '../../data/types';
import { warehouseZones, shelves } from '../../data/mockWarehouseZones';
import { StaffMarker } from './StaffMarker';
import { ZoneHighlight } from './ZoneHighlight';

interface WarehouseMapProps {
 staffList: StaffMember[];
 selectedStaff: StaffMember | null;
 onSelectStaff: (staff: StaffMember) => void;
 activeTaskZone: string | null;
 assignmentAnim: { staff: StaffMember, targetZone: string } | null;
}

export function WarehouseMap({ 
 staffList, 
 selectedStaff, 
 onSelectStaff, 
 activeTaskZone,
 assignmentAnim 
}: WarehouseMapProps) {
 
 // Render shelves
 const renderedShelves = useMemo(() => {
 return shelves.map((shelf, idx) => (
 <rect
 key={`shelf-${idx}`}
 x={shelf.x}
 y={shelf.y}
 width={shelf.width}
 height={shelf.height}
 fill="#F1F5F9"
 stroke="#CBD5E1"
 strokeWidth="1"
 rx="2"
 />
 ));
 }, []);

 // Animation line coordinates
 const animLine = useMemo(() => {
 if (!assignmentAnim) return null;
 const targetZone = warehouseZones.find(z => z.name === assignmentAnim.targetZone);
 if (!targetZone) return null;

 const endX = targetZone.x + targetZone.width / 2;
 const endY = targetZone.y + targetZone.height / 2;

 return {
 x1: assignmentAnim.staff.position.x,
 y1: assignmentAnim.staff.position.y,
 x2: endX,
 y2: endY
 };
 }, [assignmentAnim]);

 return (
 <div className="relative w-full h-full min-h-[500px] bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
 {/* Background Grid Pattern */}
 <div 
 className="absolute inset-0 opacity-20 pointer-events-none"
 style={{
 backgroundImage: 'linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)',
 backgroundSize: '20px 20px'
 }}
 />
 
 <svg 
 width="100%" 
 height="100%" 
 viewBox="0 0 720 400" 
 preserveAspectRatio="xMidYMid meet"
 className="relative z-10"
 >
 <defs>
 <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
 <feGaussianBlur stdDeviation="2" result="blur" />
 <feComposite in="SourceGraphic" in2="blur" operator="over" />
 </filter>
 </defs>

 {/* Zones */}
 {warehouseZones.map(zone => (
 <ZoneHighlight
 key={zone.id}
 zone={zone}
 isHighlighted={selectedStaff?.currentZone === zone.name}
 isTarget={activeTaskZone === zone.name || assignmentAnim?.targetZone === zone.name}
 />
 ))}

 {/* Shelves/Racks */}
 {renderedShelves}

 {/* Assignment Animation Line */}
 {animLine && (
 <line
 x1={animLine.x1}
 y1={animLine.y1}
 x2={animLine.x2}
 y2={animLine.y2}
 stroke="#16A34A"
 strokeWidth="2"
 strokeDasharray="8 8"
 className="animate-[dash_1s_linear_infinite]"
 style={{ strokeDashoffset: 100 }}
 />
 )}

 {/* Staff Markers */}
 {staffList.map(staff => (
 <StaffMarker
 key={staff.id}
 staff={staff}
 isSelected={selectedStaff?.id === staff.id}
 onClick={onSelectStaff}
 />
 ))}
 </svg>
 
 {/* Compass / Legend overlay */}
 <div className="absolute bottom-4 left-4 z-20 flex gap-4 text-xs text-gray-700 bg-white p-2 rounded border border-gray-300 ">
 <div className="flex items-center gap-2">
 <div className="w-2 h-2 rounded-full bg-[#16A34A]" /> Free
 </div>
 <div className="flex items-center gap-2">
 <div className="w-2 h-2 rounded-full bg-[#FF4444]" /> Busy
 </div>
 <div className="flex items-center gap-2">
 <div className="w-2 h-2 rounded-full bg-[#FFB800]" /> Break
 </div>
 </div>
 
 <style>{`
 @keyframes dash {
 to { stroke-dashoffset: 0; }
 }
 `}</style>
 </div>
 );
}
