'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function TriangleAngleVisual() {
  const [angleA, setAngleA] = useState(60);
  const [angleB, setAngleB] = useState(70);
  const angleC = 180 - angleA - angleB;
  const [showSum, setShowSum] = useState(false);
  const [animate, setAnimate] = useState(false);

  const calculateTrianglePoints = () => {
    // Base of triangle
    const baseY = 300;
    const baseLeft = 100;
    const baseRight = 400;
    
    // Calculate height and apex position based on angles
    const baseLength = baseRight - baseLeft;
    const heightA = baseLength * Math.tan((angleA * Math.PI) / 180);
    const heightB = baseLength * Math.tan((angleB * Math.PI) / 180);
    
    // Apex position
    const apexX = baseLeft + (baseLength * angleB) / (angleA + angleB);
    const apexY = baseY - Math.min(heightA, heightB, 200);
    
    return {
      a: { x: baseLeft, y: baseY },
      b: { x: baseRight, y: baseY },
      c: { x: apexX, y: apexY },
    };
  };

  const points = calculateTrianglePoints();

  const triggerAnimation = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-4">
        <svg viewBox="0 0 500 400" className="w-full h-auto">
          {/* Triangle */}
          <polygon
            points={`${points.a.x},${points.a.y} ${points.b.x},${points.b.y} ${points.c.x},${points.c.y}`}
            fill="rgba(167, 139, 250, 0.1)"
            stroke="#8b5cf6"
            strokeWidth="3"
            className={animate ? 'animate-pulse' : ''}
          />

          {/* Angle A (bottom left) */}
          <g>
            <path
              d={`M ${points.a.x + 40} ${points.a.y} A 40 40 0 0 0 ${
                points.a.x + 40 * Math.cos((angleA * Math.PI) / 180)
              } ${points.a.y - 40 * Math.sin((angleA * Math.PI) / 180)}`}
              fill="rgba(239, 68, 68, 0.2)"
              stroke="#ef4444"
              strokeWidth="2"
            />
            <text
              x={points.a.x + 50}
              y={points.a.y - 10}
              fontSize="16"
              fill="#dc2626"
              fontWeight="bold"
            >
              A
            </text>
            <text
              x={points.a.x + 70}
              y={points.a.y - 10}
              fontSize="14"
              fill="#dc2626"
            >
              {Math.round(angleA)}°
            </text>
          </g>

          {/* Angle B (bottom right) */}
          <g>
            <path
              d={`M ${points.b.x - 40} ${points.b.y} A 40 40 0 0 1 ${
                points.b.x - 40 * Math.cos((angleB * Math.PI) / 180)
              } ${points.b.y - 40 * Math.sin((angleB * Math.PI) / 180)}`}
              fill="rgba(34, 197, 94, 0.2)"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <text
              x={points.b.x - 50}
              y={points.b.y - 10}
              fontSize="16"
              fill="#16a34a"
              fontWeight="bold"
            >
              B
            </text>
            <text
              x={points.b.x - 90}
              y={points.b.y - 10}
              fontSize="14"
              fill="#16a34a"
            >
              {Math.round(angleB)}°
            </text>
          </g>

          {/* Angle C (top) */}
          <g>
            <circle
              cx={points.c.x}
              cy={points.c.y}
              r="25"
              fill="rgba(59, 130, 246, 0.2)"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text
              x={points.c.x}
              y={points.c.y - 5}
              fontSize="16"
              fill="#2563eb"
              fontWeight="bold"
              textAnchor="middle"
            >
              C
            </text>
            <text
              x={points.c.x}
              y={points.c.y + 35}
              fontSize="14"
              fill="#2563eb"
              textAnchor="middle"
            >
              {Math.round(angleC)}°
            </text>
          </g>

          {/* Sum animation */}
          {showSum && (
            <g className={animate ? 'animate-bounce' : ''}>
              <rect
                x="150"
                y="20"
                width="200"
                height="50"
                fill="#fef3c7"
                stroke="#f59e0b"
                strokeWidth="2"
                rx="8"
              />
              <text
                x="250"
                y="40"
                fontSize="14"
                fill="#92400e"
                textAnchor="middle"
                fontWeight="bold"
              >
                Sum of angles:
              </text>
              <text
                x="250"
                y="58"
                fontSize="18"
                fill="#b45309"
                textAnchor="middle"
                fontWeight="bold"
              >
                {Math.round(angleA)}° + {Math.round(angleB)}° + {Math.round(angleC)}° = 180°
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium w-24">Angle A:</label>
          <input
            type="range"
            min="20"
            max="140"
            value={angleA}
            onChange={(e) => {
              const newA = Number(e.target.value);
              if (180 - newA - angleB > 10) {
                setAngleA(newA);
              }
            }}
            className="flex-1"
          />
          <Badge variant="outline" className="w-16 justify-center">
            {Math.round(angleA)}°
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium w-24">Angle B:</label>
          <input
            type="range"
            min="20"
            max="140"
            value={angleB}
            onChange={(e) => {
              const newB = Number(e.target.value);
              if (180 - angleA - newB > 10) {
                setAngleB(newB);
              }
            }}
            className="flex-1"
          />
          <Badge variant="outline" className="w-16 justify-center">
            {Math.round(angleB)}°
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium w-24">Angle C:</label>
          <div className="flex-1 h-2 bg-gray-200 rounded"></div>
          <Badge variant="default" className="w-16 justify-center bg-blue-600">
            {Math.round(angleC)}°
          </Badge>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant={showSum ? 'default' : 'outline'}
          onClick={() => {
            setShowSum(!showSum);
            if (!showSum) triggerAnimation();
          }}
        >
          {showSum ? 'Hide' : 'Show'} Sum
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={triggerAnimation}
        >
          Animate
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setAngleA(60);
            setAngleB(70);
          }}
        >
          Reset
        </Button>
      </div>

      {Math.abs(angleA + angleB + angleC - 180) < 0.1 && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-sm font-medium text-green-900">
            ✓ Perfect! The angles always add up to 180°
          </p>
        </div>
      )}
    </div>
  );
}
