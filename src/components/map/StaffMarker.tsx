import React from 'react';
import type { StaffMember, WarehouseZone } from '../../data/types';
import { cn } from '@/lib/utils';

interface StaffMarkerProps {
 staff: StaffMember;
 isSelected: boolean;
 onClick: (staff: StaffMember) => void;
}

export function StaffMarker({ staff, isSelected, onClick }: StaffMarkerProps) {
 const getStatusColor = (status: string) => {
 switch (status) {
 case 'free': return '#16A34A'; // Neon Green
 case 'busy': return '#FF4444'; // Red
 case 'break': return '#FFB800'; // Amber
 default: return '#888888';
 }
 };

 const color = getStatusColor(staff.status);

 return (
 <g 
 transform={`translate(${staff.position.x}, ${staff.position.y})`}
 onClick={() => onClick(staff)}
 className="cursor-pointer group"
 >
 <g className="transition-transform duration-200 group-hover:scale-125" style={{ transformOrigin: '0px 0px' }}>
 {/* Pulse effect if selected or free */}
 {(isSelected || staff.status === 'free') && (
 <circle
 r="12"
 fill={color}
 className="animate-ping opacity-20"
 />
 )}
 
 {/* Outer ring */}
 <circle
 r="10"
 fill="#FFFFFF"
 stroke={isSelected ? '#111827' : color}
 strokeWidth={isSelected ? "3" : "2"}
 />
 
 {/* Inner dot */}
 <circle
 r="4"
 fill={color}
 />
 </g>
 
 {/* Label */}
 <g transform="translate(15, 4)">
 <rect 
 x="-2" 
 y="-10" 
 width="40" 
 height="14" 
 fill="#FFFFFF" 
 fillOpacity="0.8" 
 rx="2"
 />
 <text
 fontSize="10"
 fill="#111827"
 className=" select-none font-bold"
 >
 {staff.avatar}
 </text>
 </g>
 </g>
 );
}
