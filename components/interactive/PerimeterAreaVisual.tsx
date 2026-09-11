'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function PerimeterAreaVisual() {
  const [shape, setShape] = useState<'rectangle' | 'triangle' | 'parallelogram'>('rectangle');
  const [showPerimeter, setShowPerimeter] = useState(true);
  const [showArea, setShowArea] = useState(true);
  
  // Rectangle dimensions
  const rectWidth = 160;
  const rectHeight = 100;
  const rectPerimeter = 2 * (rectWidth + rectHeight);
  const rectArea = rectWidth * rectHeight;

  // Triangle dimensions
  const triBase = 180;
  const triHeight = 120;
  const triSideA = 120;
  const triSideB = 130;
  const triPerimeter = triBase + triSideA + triSideB;
  const triArea = (triBase * triHeight) / 2;

  // Parallelogram dimensions
  const paraBase = 180;
  const paraHeight = 90;
  const paraSide = 110;
  const paraPerimeter = 2 * (paraBase + paraSide);
  const paraArea = paraBase * paraHeight;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={shape === 'rectangle' ? 'default' : 'outline'}
          onClick={() => setShape('rectangle')}
        >
          Rectangle
        </Button>
        <Button
          size="sm"
          variant={shape === 'triangle' ? 'default' : 'outline'}
          onClick={() => setShape('triangle')}
        >
          Triangle
        </Button>
        <Button
          size="sm"
          variant={shape === 'parallelogram' ? 'default' : 'outline'}
          onClick={() => setShape('parallelogram')}
        >
          Parallelogram
        </Button>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <svg viewBox="0 0 400 300" className="w-full h-auto">
          {/* Rectangle */}
          {shape === 'rectangle' && (
            <>
              {/* Area fill */}
              <rect
                x="120"
                y="100"
                width={rectWidth}
                height={rectHeight}
                fill={showArea ? 'rgba(59, 130, 246, 0.2)' : 'none'}
                stroke="#3b82f6"
                strokeWidth="3"
              />

              {/* Grid lines for area */}
              {showArea && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={120 + (i + 1) * 20}
                      y1="100"
                      x2={120 + (i + 1) * 20}
                      y2="200"
                      stroke="#93c5fd"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                  ))}
                  {[...Array(5)].map((_, i) => (
                    <line
                      key={`h-${i}`}
                      x1="120"
                      y1={100 + (i + 1) * 20}
                      x2="280"
                      y2={100 + (i + 1) * 20}
                      stroke="#93c5fd"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                  ))}
                </>
              )}

              {/* Perimeter labels */}
              {showPerimeter && (
                <>
                  {/* Width */}
                  <line x1="120" y1="220" x2="280" y2="220" stroke="#f59e0b" strokeWidth="2" />
                  <text x="200" y="240" fontSize="14" fill="#f59e0b" fontWeight="bold" textAnchor="middle">
                    8 units
                  </text>
                  
                  {/* Height */}
                  <line x1="300" y1="100" x2="300" y2="200" stroke="#f59e0b" strokeWidth="2" />
                  <text x="330" y="155" fontSize="14" fill="#f59e0b" fontWeight="bold" textAnchor="middle">
                    5 units
                  </text>
                </>
              )}
            </>
          )}

          {/* Triangle */}
          {shape === 'triangle' && (
            <>
              {/* Area fill */}
              <polygon
                points="110,200 290,200 200,80"
                fill={showArea ? 'rgba(34, 197, 94, 0.2)' : 'none'}
                stroke="#22c55e"
                strokeWidth="3"
              />

              {/* Height line */}
              {showArea && (
                <>
                  <line
                    x1="200"
                    y1="80"
                    x2="200"
                    y2="200"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <text x="170" y="140" fontSize="14" fill="#8b5cf6" fontWeight="bold">
                    h = 6
                  </text>
                </>
              )}

              {/* Perimeter labels */}
              {showPerimeter && (
                <>
                  {/* Base */}
                  <text x="200" y="230" fontSize="14" fill="#f59e0b" fontWeight="bold" textAnchor="middle">
                    base = 9 units
                  </text>
                  
                  {/* Sides */}
                  <text x="145" y="140" fontSize="12" fill="#f59e0b" fontWeight="bold">
                    6
                  </text>
                  <text x="255" y="140" fontSize="12" fill="#f59e0b" fontWeight="bold">
                    6.5
                  </text>
                </>
              )}
            </>
          )}

          {/* Parallelogram */}
          {shape === 'parallelogram' && (
            <>
              {/* Area fill */}
              <polygon
                points="130,180 310,180 280,90 100,90"
                fill={showArea ? 'rgba(139, 92, 246, 0.2)' : 'none'}
                stroke="#8b5cf6"
                strokeWidth="3"
              />

              {/* Height line */}
              {showArea && (
                <>
                  <line
                    x1="130"
                    y1="90"
                    x2="130"
                    y2="180"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <text x="110" y="140" fontSize="14" fill="#22c55e" fontWeight="bold">
                    h = 4.5
                  </text>
                </>
              )}

              {/* Perimeter labels */}
              {showPerimeter && (
                <>
                  {/* Base */}
                  <text x="220" y="210" fontSize="14" fill="#f59e0b" fontWeight="bold" textAnchor="middle">
                    base = 9 units
                  </text>
                  
                  {/* Side */}
                  <text x="320" y="135" fontSize="12" fill="#f59e0b" fontWeight="bold">
                    5.5
                  </text>
                </>
              )}
            </>
          )}
        </svg>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowPerimeter(!showPerimeter)}
        >
          {showPerimeter ? 'Hide' : 'Show'} Perimeter
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowArea(!showArea)}
        >
          {showArea ? 'Hide' : 'Show'} Area
        </Button>
      </div>

      {/* Formulas Box */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
        <h4 className="font-semibold text-indigo-900 mb-3">Formulas:</h4>
        
        {shape === 'rectangle' && (
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Perimeter:</span>
              <Badge variant="outline" className="bg-orange-50">
                P = 2(l + w) = 2(8 + 5) = {rectPerimeter / 20} units
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Area:</span>
              <Badge variant="outline" className="bg-blue-50">
                A = l × w = 8 × 5 = {rectArea / 400} square units
              </Badge>
            </div>
          </div>
        )}

        {shape === 'triangle' && (
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Perimeter:</span>
              <Badge variant="outline" className="bg-orange-50">
                P = a + b + c = {(triPerimeter / 20).toFixed(1)} units
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Area:</span>
              <Badge variant="outline" className="bg-green-50">
                A = ½bh = ½(9)(6) = {(triArea / 400).toFixed(1)} square units
              </Badge>
            </div>
          </div>
        )}

        {shape === 'parallelogram' && (
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Perimeter:</span>
              <Badge variant="outline" className="bg-orange-50">
                P = 2(b + s) = 2(9 + 5.5) = {(paraPerimeter / 20).toFixed(1)} units
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Area:</span>
              <Badge variant="outline" className="bg-purple-50">
                A = b × h = 9 × 4.5 = {(paraArea / 400).toFixed(1)} square units
              </Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
