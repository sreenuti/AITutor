'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ParallelLinesVisualProps {
  showLabels?: boolean;
  highlightType?: 'corresponding' | 'alternate-interior' | 'alternate-exterior' | 'consecutive-interior' | null;
}

export function ParallelLinesVisual({ 
  showLabels = true, 
  highlightType = null 
}: ParallelLinesVisualProps) {
  const [transversalAngle, setTransversalAngle] = useState(60);
  const [showAngles, setShowAngles] = useState(true);
  const [activeHighlight, setActiveHighlight] = useState<string | null>(highlightType);

  const angles = [
    { id: 1, x: 140, y: 145, value: transversalAngle },
    { id: 2, x: 180, y: 145, value: 180 - transversalAngle },
    { id: 3, x: 180, y: 185, value: transversalAngle },
    { id: 4, x: 140, y: 185, value: 180 - transversalAngle },
    { id: 5, x: 240, y: 245, value: transversalAngle },
    { id: 6, x: 280, y: 245, value: 180 - transversalAngle },
    { id: 7, x: 280, y: 285, value: transversalAngle },
    { id: 8, x: 240, y: 285, value: 180 - transversalAngle },
  ];

  const getHighlightColor = (angleIds: number[]) => {
    if (!activeHighlight) return null;
    
    const highlights: Record<string, number[]> = {
      'corresponding': [1, 5, 2, 6, 3, 7, 4, 8],
      'alternate-interior': [3, 6, 4, 5],
      'alternate-exterior': [1, 8, 2, 7],
      'consecutive-interior': [3, 5, 4, 6],
    };
    
    return highlights[activeHighlight]?.some(id => angleIds.includes(id)) 
      ? 'rgba(59, 130, 246, 0.3)' 
      : null;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          size="sm"
          variant={activeHighlight === 'corresponding' ? 'default' : 'outline'}
          onClick={() => setActiveHighlight(activeHighlight === 'corresponding' ? null : 'corresponding')}
        >
          Corresponding
        </Button>
        <Button
          size="sm"
          variant={activeHighlight === 'alternate-interior' ? 'default' : 'outline'}
          onClick={() => setActiveHighlight(activeHighlight === 'alternate-interior' ? null : 'alternate-interior')}
        >
          Alternate Interior
        </Button>
        <Button
          size="sm"
          variant={activeHighlight === 'alternate-exterior' ? 'default' : 'outline'}
          onClick={() => setActiveHighlight(activeHighlight === 'alternate-exterior' ? null : 'alternate-exterior')}
        >
          Alternate Exterior
        </Button>
        <Button
          size="sm"
          variant={activeHighlight === 'consecutive-interior' ? 'default' : 'outline'}
          onClick={() => setActiveHighlight(activeHighlight === 'consecutive-interior' ? null : 'consecutive-interior')}
        >
          Consecutive Interior
        </Button>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <svg viewBox="0 0 400 400" className="w-full h-auto">
          {/* Parallel line 1 */}
          <line
            x1="50"
            y1="165"
            x2="350"
            y2="165"
            stroke="#6366f1"
            strokeWidth="3"
          />
          {showLabels && (
            <text x="30" y="170" fontSize="16" fill="#6366f1" fontWeight="bold">
              l
            </text>
          )}

          {/* Parallel line 2 */}
          <line
            x1="50"
            y1="265"
            x2="350"
            y2="265"
            stroke="#6366f1"
            strokeWidth="3"
          />
          {showLabels && (
            <text x="30" y="270" fontSize="16" fill="#6366f1" fontWeight="bold">
              m
            </text>
          )}

          {/* Transversal */}
          <line
            x1="100"
            y1="100"
            x2="300"
            y2="330"
            stroke="#8b5cf6"
            strokeWidth="3"
          />
          {showLabels && (
            <text x="310" y="340" fontSize="16" fill="#8b5cf6" fontWeight="bold">
              t
            </text>
          )}

          {/* Angle highlights */}
          {showAngles && angles.map((angle) => {
            const highlight = getHighlightColor([angle.id]);
            return (
              <g key={angle.id}>
                {/* Angle arc */}
                <circle
                  cx={angle.x + (angle.id % 2 === 1 ? 20 : -20)}
                  cy={angle.y}
                  r="15"
                  fill={highlight || 'rgba(251, 191, 36, 0.2)'}
                  stroke={highlight ? '#3b82f6' : '#f59e0b'}
                  strokeWidth="2"
                />
                {/* Angle label */}
                <text
                  x={angle.x + (angle.id % 2 === 1 ? 20 : -20)}
                  y={angle.y + 5}
                  fontSize="12"
                  fill="#1f2937"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  ∠{angle.id}
                </text>
                {/* Angle measure */}
                {showAngles && (
                  <text
                    x={angle.x + (angle.id % 2 === 1 ? 50 : -50)}
                    y={angle.y + 5}
                    fontSize="11"
                    fill="#4b5563"
                    textAnchor="middle"
                  >
                    {Math.round(angle.value)}°
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Transversal Angle:</label>
        <input
          type="range"
          min="30"
          max="150"
          value={transversalAngle}
          onChange={(e) => setTransversalAngle(Number(e.target.value))}
          className="flex-1"
        />
        <Badge variant="outline">{Math.round(transversalAngle)}°</Badge>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowAngles(!showAngles)}
        >
          {showAngles ? 'Hide' : 'Show'} Angles
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setTransversalAngle(60)}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
