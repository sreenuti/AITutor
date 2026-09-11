'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function CongruenceVisual() {
  const [transformation, setTransformation] = useState<'none' | 'translate' | 'rotate' | 'reflect'>('none');
  const [showCorresponding, setShowCorresponding] = useState(false);

  // Triangle A vertices
  const triangleA = [
    { x: 100, y: 100 },
    { x: 180, y: 100 },
    { x: 140, y: 40 },
  ];

  // Triangle B vertices based on transformation
  const getTriangleB = () => {
    switch (transformation) {
      case 'translate':
        return [
          { x: 250, y: 150 },
          { x: 330, y: 150 },
          { x: 290, y: 90 },
        ];
      case 'rotate':
        return [
          { x: 280, y: 180 },
          { x: 280, y: 100 },
          { x: 340, y: 140 },
        ];
      case 'reflect':
        return [
          { x: 250, y: 100 },
          { x: 330, y: 100 },
          { x: 290, y: 160 },
        ];
      default:
        return triangleA;
    }
  };

  const triangleB = getTriangleB();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={transformation === 'none' ? 'default' : 'outline'}
          onClick={() => setTransformation('none')}
        >
          Original
        </Button>
        <Button
          size="sm"
          variant={transformation === 'translate' ? 'default' : 'outline'}
          onClick={() => setTransformation('translate')}
        >
          Translation (Slide)
        </Button>
        <Button
          size="sm"
          variant={transformation === 'rotate' ? 'default' : 'outline'}
          onClick={() => setTransformation('rotate')}
        >
          Rotation (Turn)
        </Button>
        <Button
          size="sm"
          variant={transformation === 'reflect' ? 'default' : 'outline'}
          onClick={() => setTransformation('reflect')}
        >
          Reflection (Flip)
        </Button>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <svg viewBox="0 0 400 250" className="w-full h-auto">
          {/* Triangle A */}
          <polygon
            points={triangleA.map(p => `${p.x},${p.y}`).join(' ')}
            fill="rgba(59, 130, 246, 0.3)"
            stroke="#3b82f6"
            strokeWidth="3"
          />
          
          {/* Triangle A vertices */}
          {triangleA.map((point, i) => (
            <g key={`a-${i}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill="#3b82f6"
              />
              <text
                x={point.x - 15}
                y={point.y - 10}
                fontSize="14"
                fill="#3b82f6"
                fontWeight="bold"
              >
                {['A', 'B', 'C'][i]}
              </text>
            </g>
          ))}

          {/* Label for Triangle A */}
          <text x="140" y="120" fontSize="16" fill="#3b82f6" fontWeight="bold" textAnchor="middle">
            △ABC
          </text>

          {/* Triangle B (after transformation) */}
          {transformation !== 'none' && (
            <>
              <polygon
                points={triangleB.map(p => `${p.x},${p.y}`).join(' ')}
                fill="rgba(34, 197, 94, 0.3)"
                stroke="#22c55e"
                strokeWidth="3"
                className="transition-all duration-500"
              />
              
              {/* Triangle B vertices */}
              {triangleB.map((point, i) => (
                <g key={`b-${i}`}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill="#22c55e"
                  />
                  <text
                    x={point.x + 15}
                    y={point.y - 10}
                    fontSize="14"
                    fill="#22c55e"
                    fontWeight="bold"
                  >
                    {['D', 'E', 'F'][i]}
                  </text>
                </g>
              ))}

              {/* Label for Triangle B */}
              <text 
                x={triangleB[0].x + 40} 
                y={triangleB[0].y + 30} 
                fontSize="16" 
                fill="#22c55e" 
                fontWeight="bold" 
                textAnchor="middle"
                className="transition-all duration-500"
              >
                △DEF
              </text>

              {/* Corresponding parts lines */}
              {showCorresponding && triangleA.map((pointA, i) => {
                const pointB = triangleB[i];
                return (
                  <line
                    key={`line-${i}`}
                    x1={pointA.x}
                    y1={pointA.y}
                    x2={pointB.x}
                    y2={pointB.y}
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                );
              })}
            </>
          )}

          {/* Transformation indicator */}
          {transformation === 'translate' && (
            <g>
              <path
                d="M 180 80 L 250 110"
                stroke="#f59e0b"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrow)"
              />
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
                </marker>
              </defs>
            </g>
          )}
        </svg>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowCorresponding(!showCorresponding)}
          disabled={transformation === 'none'}
        >
          {showCorresponding ? 'Hide' : 'Show'} Corresponding Parts
        </Button>
      </div>

      {/* Info Box */}
      {transformation !== 'none' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">
            {transformation === 'translate' && '📍 Translation: Sliding without rotation'}
            {transformation === 'rotate' && '🔄 Rotation: Turning around a point'}
            {transformation === 'reflect' && '🪞 Reflection: Flipping over a line'}
          </h4>
          <p className="text-sm text-green-800">
            △ABC ≅ △DEF (the triangles are congruent)
          </p>
          <p className="text-sm text-green-700 mt-1">
            Same size and shape, just in a different position!
          </p>
        </div>
      )}

      {transformation === 'none' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            Click a transformation button to see how △ABC can be moved to create a congruent triangle △DEF. 
            Rigid transformations (slide, turn, flip) preserve size and shape!
          </p>
        </div>
      )}
    </div>
  );
}
