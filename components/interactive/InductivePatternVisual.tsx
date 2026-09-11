'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type PatternType = 'dots' | 'squares' | 'arrows';

export function InductivePatternVisual() {
  const [patternType, setPatternType] = useState<PatternType>('dots');
  const [currentStep, setCurrentStep] = useState(4);

  const renderDotTriangle = (step: number, x: number, y: number) => {
    const dots = [];
    const dotSize = 8;
    const spacing = 20;

    for (let row = 0; row < step; row++) {
      for (let col = 0; col <= row; col++) {
        dots.push(
          <circle
            key={`${row}-${col}`}
            cx={x + col * spacing - (row * spacing) / 2}
            cy={y + row * spacing}
            r={dotSize}
            fill="#8b5cf6"
          />
        );
      }
    }
    return dots;
  };

  const renderSquareStaircase = (step: number, x: number, y: number) => {
    const squares = [];
    const squareSize = 18;
    const gap = 2;

    for (let col = 0; col < step; col++) {
      for (let row = 0; row <= col; row++) {
        squares.push(
          <rect
            key={`${col}-${row}`}
            x={x + col * (squareSize + gap)}
            y={y - row * (squareSize + gap) - squareSize}
            width={squareSize}
            height={squareSize}
            fill="#10b981"
            stroke="#059669"
            strokeWidth="2"
          />
        );
      }
    }
    return squares;
  };

  const renderRotatingArrow = (step: number, x: number, y: number) => {
    const rotation = (step - 1) * 90;
    return (
      <g transform={`rotate(${rotation}, ${x}, ${y})`}>
        <line x1={x} y1={y} x2={x + 50} y2={y} stroke="#ef4444" strokeWidth="4" />
        <polygon
          points={`${x + 50},${y} ${x + 40},${y - 8} ${x + 40},${y + 8}`}
          fill="#ef4444"
        />
      </g>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center">
        <Button
          size="sm"
          variant={patternType === 'dots' ? 'default' : 'outline'}
          onClick={() => setPatternType('dots')}
        >
          Dot Triangles
        </Button>
        <Button
          size="sm"
          variant={patternType === 'squares' ? 'default' : 'outline'}
          onClick={() => setPatternType('squares')}
        >
          Square Staircase
        </Button>
        <Button
          size="sm"
          variant={patternType === 'arrows' ? 'default' : 'outline'}
          onClick={() => setPatternType('arrows')}
        >
          Rotating Arrows
        </Button>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <svg viewBox="0 0 700 200" className="w-full h-auto">
          {patternType === 'dots' && (
            <>
              {/* Figure 1 */}
              <g>{renderDotTriangle(1, 80, 100)}</g>
              <text x="80" y="150" fontSize="14" fill="#6b7280" textAnchor="middle" fontWeight="bold">
                Figure 1
              </text>
              <text x="80" y="168" fontSize="12" fill="#8b5cf6" textAnchor="middle">
                1 dot
              </text>

              {/* Figure 2 */}
              <g>{renderDotTriangle(2, 200, 100)}</g>
              <text x="200" y="150" fontSize="14" fill="#6b7280" textAnchor="middle" fontWeight="bold">
                Figure 2
              </text>
              <text x="200" y="168" fontSize="12" fill="#8b5cf6" textAnchor="middle">
                3 dots
              </text>

              {/* Figure 3 */}
              <g>{renderDotTriangle(3, 330, 100)}</g>
              <text x="330" y="150" fontSize="14" fill="#6b7280" textAnchor="middle" fontWeight="bold">
                Figure 3
              </text>
              <text x="330" y="168" fontSize="12" fill="#8b5cf6" textAnchor="middle">
                6 dots
              </text>

              {/* Figure 4 */}
              <g>{renderDotTriangle(4, 480, 100)}</g>
              <text x="480" y="150" fontSize="14" fill="#6b7280" textAnchor="middle" fontWeight="bold">
                Figure 4
              </text>
              <text x="480" y="168" fontSize="12" fill="#8b5cf6" textAnchor="middle">
                10 dots
              </text>

              {/* Next figure */}
              <g>{renderDotTriangle(currentStep, 620, 100)}</g>
              <text x="620" y="150" fontSize="14" fill="#6b7280" textAnchor="middle" fontWeight="bold">
                Figure {currentStep}
              </text>
              <text x="620" y="168" fontSize="12" fill="#8b5cf6" textAnchor="middle">
                {(currentStep * (currentStep + 1)) / 2} dots
              </text>
            </>
          )}

          {patternType === 'squares' && (
            <>
              {/* Figure 1 */}
              <g>{renderSquareStaircase(1, 60, 150)}</g>
              <text x="70" y="170" fontSize="14" fill="#6b7280" textAnchor="middle" fontWeight="bold">
                Figure 1
              </text>
              <text x="70" y="188" fontSize="12" fill="#10b981" textAnchor="middle">
                1 square
              </text>

              {/* Figure 2 */}
              <g>{renderSquareStaircase(2, 160, 150)}</g>
              <text x="180" y="170" fontSize="14" fill="#6b7280" textAnchor="middle" fontWeight="bold">
                Figure 2
              </text>
              <text x="180" y="188" fontSize="12" fill="#10b981" textAnchor="middle">
                3 squares
              </text>

              {/* Figure 3 */}
              <g>{renderSquareStaircase(3, 280, 150)}</g>
              <text x="310" y="170" fontSize="14" fill="#6b7280" textAnchor="middle" fontWeight="bold">
                Figure 3
              </text>
              <text x="310" y="188" fontSize="12" fill="#10b981" textAnchor="middle">
                6 squares
              </text>

              {/* Figure 4 */}
              <g>{renderSquareStaircase(4, 420, 150)}</g>
              <text x="460" y="170" fontSize="14" fill="#6b7280" textAnchor="middle" fontWeight="bold">
                Figure 4
              </text>
              <text x="460" y="188" fontSize="12" fill="#10b981" textAnchor="middle">
                10 squares
              </text>

              {/* Next figure */}
              <g>{renderSquareStaircase(currentStep, 580, 150)}</g>
              <text x="620" y="170" fontSize="14" fill="#6b7280" textAnchor="middle" fontWeight="bold">
                Figure {currentStep}
              </text>
              <text x="620" y="188" fontSize="12" fill="#10b981" textAnchor="middle">
                {(currentStep * (currentStep + 1)) / 2} squares
              </text>
            </>
          )}

          {patternType === 'arrows' && (
            <>
              {/* Figure 1 */}
              <g>{renderRotatingArrow(1, 80, 100)}</g>
              <text x="80" y="150" fontSize="14" fill="#6b7280" textAnchor="middle" fontWeight="bold">
                Figure 1
              </text>
              <text x="80" y="168" fontSize="12" fill="#ef4444" textAnchor="middle">
                0° (→)
              </text>

              {/* Figure 2 */}
              <g>{renderRotatingArrow(2, 200, 100)}</g>
              <text x="200" y="150" fontSize="14" fill="#6b7280" textAnchor="middle" fontWeight="bold">
                Figure 2
              </text>
              <text x="200" y="168" fontSize="12" fill="#ef4444" textAnchor="middle">
                90° (↑)
              </text>

              {/* Figure 3 */}
              <g>{renderRotatingArrow(3, 320, 100)}</g>
              <text x="320" y="150" fontSize="14" fill="#6b7280" textAnchor="middle" fontWeight="bold">
                Figure 3
              </text>
              <text x="320" y="168" fontSize="12" fill="#ef4444" textAnchor="middle">
                180° (←)
              </text>

              {/* Figure 4 */}
              <g>{renderRotatingArrow(4, 440, 100)}</g>
              <text x="440" y="150" fontSize="14" fill="#6b7280" textAnchor="middle" fontWeight="bold">
                Figure 4
              </text>
              <text x="440" y="168" fontSize="12" fill="#ef4444" textAnchor="middle">
                270° (↓)
              </text>

              {/* Next figure */}
              <g>{renderRotatingArrow(currentStep, 560, 100)}</g>
              <text x="560" y="150" fontSize="14" fill="#6b7280" textAnchor="middle" fontWeight="bold">
                Figure {currentStep}
              </text>
              <text x="560" y="168" fontSize="12" fill="#ef4444" textAnchor="middle">
                {((currentStep - 1) * 90) % 360}°
              </text>
            </>
          )}
        </svg>
      </div>

      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <p className="text-sm font-medium text-indigo-900 mb-2">Pattern Rule:</p>
        {patternType === 'dots' && (
          <p className="text-sm text-indigo-800">
            Each triangle has one more row than the previous. Figure n has{' '}
            <strong>n(n+1)/2</strong> dots.
          </p>
        )}
        {patternType === 'squares' && (
          <p className="text-sm text-indigo-800">
            Each staircase adds one more column. Figure n has{' '}
            <strong>n(n+1)/2</strong> squares.
          </p>
        )}
        {patternType === 'arrows' && (
          <p className="text-sm text-indigo-800">
            Each arrow rotates 90° clockwise. Figure n points at <strong>(n-1)×90°</strong>.
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Show Figure:</label>
        <input
          type="range"
          min="1"
          max="8"
          value={currentStep}
          onChange={(e) => setCurrentStep(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm font-bold w-12">{currentStep}</span>
      </div>
    </div>
  );
}
