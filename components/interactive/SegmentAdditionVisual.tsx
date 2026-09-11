'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface SegmentAdditionVisualProps {
  partA?: string;
  partB?: string;
  whole?: string;
  showLabels?: boolean;
  interactive?: boolean;
}

export function SegmentAdditionVisual({
  partA = '10',
  partB = '2x - 12',
  whole = 'x + 10',
  showLabels = true,
  interactive = false,
}: SegmentAdditionVisualProps) {
  const [xValue, setXValue] = useState(12);

  const evaluateExpression = (expr: string, x: number): number => {
    try {
      // Replace x with the value
      const cleaned = expr.toLowerCase().replace(/[^0-9x+\-*/().\s]/g, '');
      const evaluated = cleaned.replace(/x/g, String(x));
      // eslint-disable-next-line no-eval
      return eval(evaluated);
    } catch {
      return 0;
    }
  };

  const aValue = evaluateExpression(partA, xValue);
  const bValue = evaluateExpression(partB, xValue);
  const wholeValue = evaluateExpression(whole, xValue);

  // Calculate proportions for visual representation
  const total = Math.max(aValue + bValue, wholeValue, 1);
  const aWidth = (aValue / total) * 500;
  const bWidth = (bValue / total) * 500;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-6">
        <svg viewBox="0 0 600 200" className="w-full h-auto">
          {/* Main segment line */}
          <line
            x1="50"
            y1="100"
            x2="550"
            y2="100"
            stroke="#6366f1"
            strokeWidth="4"
          />

          {/* Point I (left) */}
          <circle cx="50" cy="100" r="6" fill="#1e40af" />
          <text x="50" y="130" fontSize="20" fontWeight="bold" fill="#1e40af" textAnchor="middle">
            I
          </text>

          {/* Point H (middle) */}
          <circle cx={50 + aWidth} cy="100" r="6" fill="#1e40af" />
          <text
            x={50 + aWidth}
            y="130"
            fontSize="20"
            fontWeight="bold"
            fill="#1e40af"
            textAnchor="middle"
          >
            H
          </text>

          {/* Point G (right) */}
          <circle cx={50 + aWidth + bWidth} cy="100" r="6" fill="#1e40af" />
          <text
            x={50 + aWidth + bWidth}
            y="130"
            fontSize="20"
            fontWeight="bold"
            fill="#1e40af"
            textAnchor="middle"
          >
            G
          </text>

          {/* Part A label (IH) */}
          {showLabels && (
            <>
              <line x1="50" y1="70" x2={50 + aWidth} y2="70" stroke="#ef4444" strokeWidth="2" />
              <line x1="50" y1="65" x2="50" y2="75" stroke="#ef4444" strokeWidth="2" />
              <line
                x1={50 + aWidth}
                y1="65"
                x2={50 + aWidth}
                y2="75"
                stroke="#ef4444"
                strokeWidth="2"
              />
              <text
                x={50 + aWidth / 2}
                y="55"
                fontSize="16"
                fill="#dc2626"
                textAnchor="middle"
                fontWeight="bold"
              >
                {partA}
              </text>
              {interactive && (
                <text
                  x={50 + aWidth / 2}
                  y="38"
                  fontSize="12"
                  fill="#991b1b"
                  textAnchor="middle"
                >
                  = {aValue.toFixed(1)}
                </text>
              )}
            </>
          )}

          {/* Part B label (HG) */}
          {showLabels && (
            <>
              <line
                x1={50 + aWidth}
                y1="70"
                x2={50 + aWidth + bWidth}
                y2="70"
                stroke="#22c55e"
                strokeWidth="2"
              />
              <line
                x1={50 + aWidth}
                y1="65"
                x2={50 + aWidth}
                y2="75"
                stroke="#22c55e"
                strokeWidth="2"
              />
              <line
                x1={50 + aWidth + bWidth}
                y1="65"
                x2={50 + aWidth + bWidth}
                y2="75"
                stroke="#22c55e"
                strokeWidth="2"
              />
              <text
                x={50 + aWidth + bWidth / 2}
                y="55"
                fontSize="16"
                fill="#16a34a"
                textAnchor="middle"
                fontWeight="bold"
              >
                {partB}
              </text>
              {interactive && (
                <text
                  x={50 + aWidth + bWidth / 2}
                  y="38"
                  fontSize="12"
                  fill="#166534"
                  textAnchor="middle"
                >
                  = {bValue.toFixed(1)}
                </text>
              )}
            </>
          )}

          {/* Whole segment label (IG) */}
          {showLabels && (
            <>
              <line x1="50" y1="150" x2={50 + aWidth + bWidth} y2="150" stroke="#8b5cf6" strokeWidth="2" />
              <line x1="50" y1="145" x2="50" y2="155" stroke="#8b5cf6" strokeWidth="2" />
              <line
                x1={50 + aWidth + bWidth}
                y1="145"
                x2={50 + aWidth + bWidth}
                y2="155"
                stroke="#8b5cf6"
                strokeWidth="2"
              />
              <text
                x={50 + (aWidth + bWidth) / 2}
                y="172"
                fontSize="16"
                fill="#7c3aed"
                textAnchor="middle"
                fontWeight="bold"
              >
                {whole}
              </text>
              {interactive && (
                <text
                  x={50 + (aWidth + bWidth) / 2}
                  y="188"
                  fontSize="12"
                  fill="#6d28d9"
                  textAnchor="middle"
                >
                  = {wholeValue.toFixed(1)}
                </text>
              )}
            </>
          )}
        </svg>
      </div>

      {interactive && (
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium w-32">Value of x:</label>
            <input
              type="range"
              min="1"
              max="30"
              value={xValue}
              onChange={(e) => setXValue(Number(e.target.value))}
              className="flex-1"
            />
            <Badge variant="outline" className="w-16 justify-center">
              x = {xValue}
            </Badge>
          </div>
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <p className="text-sm font-medium text-indigo-900 mb-2">Segment Addition Postulate:</p>
            <p className="text-sm text-indigo-800">
              IH + HG = IG
            </p>
            <p className="text-sm text-indigo-800 mt-1">
              {partA} + {partB} = {whole}
            </p>
            {Math.abs(aValue + bValue - wholeValue) < 0.5 && (
              <p className="text-sm font-bold text-green-700 mt-2">
                ✓ Correct! {aValue.toFixed(1)} + {bValue.toFixed(1)} = {wholeValue.toFixed(1)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
