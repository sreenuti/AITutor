'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function CoordinateGeometryVisual() {
  const [x1, setX1] = useState(1);
  const [y1, setY1] = useState(2);
  const [x2, setX2] = useState(5);
  const [y2, setY2] = useState(6);
  const [showCalculations, setShowCalculations] = useState(false);

  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  // Scale for display
  const scale = 40;
  const offsetX = 100;
  const offsetY = 350;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-6">
        <svg viewBox="0 0 600 450" className="w-full h-auto">
          {/* Grid */}
          {Array.from({ length: 11 }).map((_, i) => (
            <g key={`grid-${i}`}>
              <line
                x1={offsetX + i * scale}
                y1={offsetY - 10 * scale}
                x2={offsetX + i * scale}
                y2={offsetY}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <line
                x1={offsetX}
                y1={offsetY - i * scale}
                x2={offsetX + 10 * scale}
                y2={offsetY - i * scale}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            </g>
          ))}

          {/* Axes */}
          <line x1={offsetX} y1={offsetY} x2={offsetX + 10 * scale} y2={offsetY} stroke="#374151" strokeWidth="2" />
          <line x1={offsetX} y1={offsetY} x2={offsetX} y2={offsetY - 10 * scale} stroke="#374151" strokeWidth="2" />
          
          {/* Axis labels */}
          <text x={offsetX + 10 * scale + 10} y={offsetY + 5} fontSize="16" fill="#374151" fontWeight="bold">
            x
          </text>
          <text x={offsetX - 5} y={offsetY - 10 * scale - 10} fontSize="16" fill="#374151" fontWeight="bold">
            y
          </text>

          {/* Origin */}
          <text x={offsetX - 15} y={offsetY + 20} fontSize="14" fill="#6b7280">
            O
          </text>

          {/* Line segment */}
          <line
            x1={offsetX + x1 * scale}
            y1={offsetY - y1 * scale}
            x2={offsetX + x2 * scale}
            y2={offsetY - y2 * scale}
            stroke="#8b5cf6"
            strokeWidth="3"
          />

          {/* Point A */}
          <circle
            cx={offsetX + x1 * scale}
            cy={offsetY - y1 * scale}
            r="8"
            fill="#ef4444"
          />
          <text
            x={offsetX + x1 * scale - 20}
            y={offsetY - y1 * scale - 15}
            fontSize="18"
            fill="#dc2626"
            fontWeight="bold"
          >
            A({x1}, {y1})
          </text>

          {/* Point B */}
          <circle
            cx={offsetX + x2 * scale}
            cy={offsetY - y2 * scale}
            r="8"
            fill="#22c55e"
          />
          <text
            x={offsetX + x2 * scale + 10}
            y={offsetY - y2 * scale - 15}
            fontSize="18"
            fill="#16a34a"
            fontWeight="bold"
          >
            B({x2}, {y2})
          </text>

          {/* Midpoint */}
          {showCalculations && (
            <>
              <circle
                cx={offsetX + midX * scale}
                cy={offsetY - midY * scale}
                r="6"
                fill="#3b82f6"
              />
              <text
                x={offsetX + midX * scale + 15}
                y={offsetY - midY * scale + 5}
                fontSize="16"
                fill="#2563eb"
                fontWeight="bold"
              >
                M({midX}, {midY})
              </text>

              {/* Right triangle for distance */}
              <line
                x1={offsetX + x1 * scale}
                y1={offsetY - y1 * scale}
                x2={offsetX + x2 * scale}
                y2={offsetY - y1 * scale}
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
              <line
                x1={offsetX + x2 * scale}
                y1={offsetY - y1 * scale}
                x2={offsetX + x2 * scale}
                y2={offsetY - y2 * scale}
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
              
              <text
                x={offsetX + (x1 + x2) * scale / 2}
                y={offsetY - y1 * scale + 20}
                fontSize="14"
                fill="#d97706"
                textAnchor="middle"
              >
                Δx = {x2 - x1}
              </text>
              <text
                x={offsetX + x2 * scale + 25}
                y={offsetY - (y1 + y2) * scale / 2}
                fontSize="14"
                fill="#d97706"
              >
                Δy = {y2 - y1}
              </text>
            </>
          )}

          {/* Formulas */}
          {showCalculations && (
            <g>
              <rect x="20" y="20" width="260" height="140" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="8" />
              <text x="150" y="50" fontSize="16" fill="#92400e" textAnchor="middle" fontWeight="bold">
                Distance Formula
              </text>
              <text x="30" y="75" fontSize="13" fill="#78350f">
                d = √[(x₂-x₁)² + (y₂-y₁)²]
              </text>
              <text x="30" y="95" fontSize="12" fill="#b45309" fontWeight="bold">
                = √[({x2}-{x1})² + ({y2}-{y1})²]
              </text>
              <text x="30" y="112" fontSize="12" fill="#b45309" fontWeight="bold">
                = √[{(x2 - x1) ** 2} + {(y2 - y1) ** 2}] ≈ {distance.toFixed(2)}
              </text>
              
              <text x="150" y="135" fontSize="16" fill="#92400e" textAnchor="middle" fontWeight="bold">
                Midpoint Formula
              </text>
              <text x="30" y="155" fontSize="13" fill="#78350f">
                M = ((x₁+x₂)/2, (y₁+y₂)/2) = ({midX}, {midY})
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium">Point A - x:</label>
          <input
            type="range"
            min="0"
            max="8"
            value={x1}
            onChange={(e) => setX1(Number(e.target.value))}
            className="w-full"
          />
          <Badge variant="outline" className="w-full justify-center mt-1">
            {x1}
          </Badge>
        </div>
        <div>
          <label className="text-xs font-medium">Point A - y:</label>
          <input
            type="range"
            min="0"
            max="8"
            value={y1}
            onChange={(e) => setY1(Number(e.target.value))}
            className="w-full"
          />
          <Badge variant="outline" className="w-full justify-center mt-1">
            {y1}
          </Badge>
        </div>
        <div>
          <label className="text-xs font-medium">Point B - x:</label>
          <input
            type="range"
            min="0"
            max="10"
            value={x2}
            onChange={(e) => setX2(Number(e.target.value))}
            className="w-full"
          />
          <Badge variant="outline" className="w-full justify-center mt-1">
            {x2}
          </Badge>
        </div>
        <div>
          <label className="text-xs font-medium">Point B - y:</label>
          <input
            type="range"
            min="0"
            max="10"
            value={y2}
            onChange={(e) => setY2(Number(e.target.value))}
            className="w-full"
          />
          <Badge variant="outline" className="w-full justify-center mt-1">
            {y2}
          </Badge>
        </div>
      </div>

      <Button
        onClick={() => setShowCalculations(!showCalculations)}
        className="w-full"
      >
        {showCalculations ? 'Hide' : 'Show'} Calculations
      </Button>
    </div>
  );
}
