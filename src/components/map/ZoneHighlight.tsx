import React from 'react';
import type { WarehouseZone } from '../../data/types';

interface ZoneHighlightProps {
 zone: WarehouseZone;
 isHighlighted: boolean;
 isTarget: boolean;
}

export function ZoneHighlight({ zone, isHighlighted, isTarget }: ZoneHighlightProps) {
 return (
 <g>
 <rect
 x={zone.x}
 y={zone.y}
 width={zone.width}
 height={zone.height}
 fill={zone.color}
 fillOpacity={isTarget ? 0.3 : (isHighlighted ? 0.15 : 0.05)}
 stroke={zone.color}
 strokeWidth={isTarget ? 3 : (isHighlighted ? 1.5 : 0.5)}
 strokeDasharray={isTarget ? "6,6" : "none"}
 className={isTarget ? "animate-pulse" : "transition-all duration-300"}
 rx="4"
 />
 <text
 x={zone.x + 10}
 y={zone.y + 20}
 fill={zone.color}
 fillOpacity={isTarget || isHighlighted ? 1 : 0.5}
 className=" text-sm font-bold select-none transition-all duration-300"
 >
 {zone.name}
 </text>
 </g>
 );
}
