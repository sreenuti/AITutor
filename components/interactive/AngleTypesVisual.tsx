'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function AngleTypesVisual() {
  const [angle, setAngle] = useState(45);
  const [showClassification, setShowClassification] = useState(true);

  const getAngleType = (deg: number) => {
    if (deg < 90) return { name: 'Acute', color: '#22c55e', description: 'Less than 90°' };
    if (deg === 90) return { name: 'Right', color: '#3b82f6', description: 'Exactly 90°' };
    if (deg < 180) return { name: 'Obtuse', color: '#f59e0b', description: 'Between 90° and 180°' };
    return { name: 'Straight', color: '#8b5cf6', description: 'Exactly 180°' };
  };

  const angleType = getAngleType(angle);
  const radians = (angle * Math.PI) / 180;

  // Calculate arc path
  const radius = 80;
  const centerX = 250;
  const centerY = 200;
  const startX = centerX + radius;
  const startY = centerY;
  const endX = centerX + radius * Math.cos(radians);
  const endY = centerY - radius * Math.sin(radians);
  const largeArc = angle > 180 ? 1 : 0;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-4">
        <svg viewBox="0 0 500 300" className="w-full h-auto">
          {/* Base line */}
          <line
            x1="100"
            y1="200"
            x2="400"
            y2="200"
            stroke="#64748b"
            strokeWidth="3"
          />

          {/* Angle line */}
          <line
            x1={centerX}
            y1={centerY}
            x2={endX}
            y2={endY}
            stroke={angleType.color}
            strokeWidth="3"
            className="transition-all duration-300"
          />

          {/* Angle arc */}
          <path
            d={`M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 0 ${endX} ${endY}`}
            fill={`${angleType.color}33`}
            stroke={angleType.color}
            strokeWidth="2"
            className="transition-all duration-300"
          />

          {/* Right angle marker (if 90°) */}
          {Math.abs(angle - 90) < 5 && (
            <rect
              x={centerX}
              y={centerY - 20}
              width="20"
              height="20"
              fill="none"
              stroke={angleType.color}
              strokeWidth="2"
            />
          )}

          {/* Angle measure */}
          <text
            x={centerX + 50}
            y={centerY - 30}
            fontSize="24"
            fill={angleType.color}
            fontWeight="bold"
            className="transition-all duration-300"
          >
            {Math.round(angle)}°
          </text>

          {/* Vertex point */}
          <circle
            cx={centerX}
            cy={centerY}
            r="5"
            fill="#1f2937"
          />

          {/* Classification label */}
          {showClassification && (
            <g>
              <rect
                x="180"
                y="30"
                width="140"
                height="60"
                fill={`${angleType.color}22`}
                stroke={angleType.color}
                strokeWidth="2"
                rx="8"
              />
              <text
                x="250"
                y="55"
                fontSize="20"
                fill={angleType.color}
                fontWeight="bold"
                textAnchor="middle"
              >
                {angleType.name} Angle
              </text>
              <text
                x="250"
                y="75"
                fontSize="14"
                fill="#374151"
                textAnchor="middle"
              >
                {angleType.description}
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Angle Size:</label>
        <input
          type="range"
          min="0"
          max="180"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="flex-1"
        />
        <Badge variant="outline" style={{ backgroundColor: `${angleType.color}22`, borderColor: angleType.color }}>
          {Math.round(angle)}°
        </Badge>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setAngle(45)}
          className="text-green-700 border-green-300 hover:bg-green-50"
        >
          Acute (45°)
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setAngle(90)}
          className="text-blue-700 border-blue-300 hover:bg-blue-50"
        >
          Right (90°)
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setAngle(135)}
          className="text-orange-700 border-orange-300 hover:bg-orange-50"
        >
          Obtuse (135°)
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setAngle(180)}
          className="text-purple-700 border-purple-300 hover:bg-purple-50"
        >
          Straight (180°)
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowClassification(!showClassification)}
        >
          {showClassification ? 'Hide' : 'Show'} Label
        </Button>
      </div>
    </div>
  );
}
