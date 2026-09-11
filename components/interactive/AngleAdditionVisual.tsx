'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface AngleAdditionVisualProps {
  angle1?: string;
  angle2?: string;
  whole?: string;
  showLabels?: boolean;
  interactive?: boolean;
}

export function AngleAdditionVisual({
  angle1 = '14x + 2',
  angle2 = '8x + 14',
  whole = '60',
  showLabels = true,
  interactive = false,
}: AngleAdditionVisualProps) {
  const [xValue, setXValue] = useState(2);

  const evaluateExpression = (expr: string, x: number): number => {
    try {
      const cleaned = expr.toLowerCase().replace(/[^0-9x+\-*/().\s]/g, '');
      const evaluated = cleaned.replace(/x/g, String(x));
      // eslint-disable-next-line no-eval
      return eval(evaluated);
    } catch {
      return parseFloat(expr) || 0;
    }
  };

  const angle1Value = evaluateExpression(angle1, xValue);
  const angle2Value = evaluateExpression(angle2, xValue);
  const wholeValue = evaluateExpression(whole, xValue);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-6">
        <svg viewBox="0 0 500 350" className="w-full h-auto">
          {/* Vertex point S */}
          <circle cx="250" cy="250" r="5" fill="#1e40af" />
          <text x="250" y="285" fontSize="20" fontWeight="bold" fill="#1e40af" textAnchor="middle">
            S
          </text>

          {/* Ray SR (left) */}
          <line x1="250" y1="250" x2="50" y2="250" stroke="#6366f1" strokeWidth="3" />
          <polygon points="50,250 65,245 65,255" fill="#6366f1" />
          <text x="30" y="255" fontSize="18" fontWeight="bold" fill="#1e40af">
            R
          </text>

          {/* Ray ST (middle) - rotated by angle1Value degrees */}
          <line
            x1="250"
            y1="250"
            x2={250 + 180 * Math.cos((-angle1Value * Math.PI) / 180)}
            y2={250 + 180 * Math.sin((-angle1Value * Math.PI) / 180)}
            stroke="#6366f1"
            strokeWidth="3"
          />
          <polygon
            points={`${250 + 180 * Math.cos((-angle1Value * Math.PI) / 180)},${250 + 180 * Math.sin((-angle1Value * Math.PI) / 180)} ${250 + 165 * Math.cos((-angle1Value * Math.PI) / 180 - 0.15)},${250 + 165 * Math.sin((-angle1Value * Math.PI) / 180 - 0.15)} ${250 + 165 * Math.cos((-angle1Value * Math.PI) / 180 + 0.15)},${250 + 165 * Math.sin((-angle1Value * Math.PI) / 180 + 0.15)}`}
            fill="#6366f1"
          />
          <text
            x={250 + 200 * Math.cos((-angle1Value * Math.PI) / 180)}
            y={250 + 200 * Math.sin((-angle1Value * Math.PI) / 180) + 5}
            fontSize="18"
            fontWeight="bold"
            fill="#1e40af"
            textAnchor="middle"
          >
            T
          </text>

          {/* Ray SC (top) - rotated by (angle1Value + angle2Value) degrees */}
          <line
            x1="250"
            y1="250"
            x2={250 + 180 * Math.cos((-(angle1Value + angle2Value) * Math.PI) / 180)}
            y2={250 + 180 * Math.sin((-(angle1Value + angle2Value) * Math.PI) / 180)}
            stroke="#6366f1"
            strokeWidth="3"
          />
          <polygon
            points={`${250 + 180 * Math.cos((-(angle1Value + angle2Value) * Math.PI) / 180)},${250 + 180 * Math.sin((-(angle1Value + angle2Value) * Math.PI) / 180)} ${250 + 165 * Math.cos((-(angle1Value + angle2Value) * Math.PI) / 180 - 0.15)},${250 + 165 * Math.sin((-(angle1Value + angle2Value) * Math.PI) / 180 - 0.15)} ${250 + 165 * Math.cos((-(angle1Value + angle2Value) * Math.PI) / 180 + 0.15)},${250 + 165 * Math.sin((-(angle1Value + angle2Value) * Math.PI) / 180 + 0.15)}`}
            fill="#6366f1"
          />
          <text
            x={250 + 200 * Math.cos((-(angle1Value + angle2Value) * Math.PI) / 180)}
            y={250 + 200 * Math.sin((-(angle1Value + angle2Value) * Math.PI) / 180) + 5}
            fontSize="18"
            fontWeight="bold"
            fill="#1e40af"
            textAnchor="middle"
          >
            C
          </text>

          {/* Angle 1 arc (RST) */}
          {showLabels && (
            <>
              <path
                d={`M ${250 + 70 * Math.cos(0)} ${250 + 70 * Math.sin(0)} A 70 70 0 0 0 ${250 + 70 * Math.cos((-angle1Value * Math.PI) / 180)} ${250 + 70 * Math.sin((-angle1Value * Math.PI) / 180)}`}
                fill="rgba(239, 68, 68, 0.2)"
                stroke="#ef4444"
                strokeWidth="2"
              />
              <text
                x={250 + 100 * Math.cos((-angle1Value / 2) * (Math.PI / 180))}
                y={250 + 100 * Math.sin((-angle1Value / 2) * (Math.PI / 180))}
                fontSize="14"
                fill="#dc2626"
                textAnchor="middle"
                fontWeight="bold"
              >
                m∠RST = {angle1}
              </text>
              {interactive && (
                <text
                  x={250 + 85 * Math.cos((-angle1Value / 2) * (Math.PI / 180))}
                  y={250 + 85 * Math.sin((-angle1Value / 2) * (Math.PI / 180)) + 18}
                  fontSize="12"
                  fill="#991b1b"
                  textAnchor="middle"
                >
                  = {angle1Value.toFixed(0)}°
                </text>
              )}
            </>
          )}

          {/* Angle 2 arc (TSC) */}
          {showLabels && (
            <>
              <path
                d={`M ${250 + 50 * Math.cos((-angle1Value * Math.PI) / 180)} ${250 + 50 * Math.sin((-angle1Value * Math.PI) / 180)} A 50 50 0 0 0 ${250 + 50 * Math.cos((-(angle1Value + angle2Value) * Math.PI) / 180)} ${250 + 50 * Math.sin((-(angle1Value + angle2Value) * Math.PI) / 180)}`}
                fill="rgba(34, 197, 94, 0.2)"
                stroke="#22c55e"
                strokeWidth="2"
              />
              <text
                x={250 + 120 * Math.cos((-(angle1Value + angle2Value / 2) * Math.PI) / 180)}
                y={250 + 120 * Math.sin((-(angle1Value + angle2Value / 2) * Math.PI) / 180)}
                fontSize="14"
                fill="#16a34a"
                textAnchor="middle"
                fontWeight="bold"
              >
                m∠CST = {angle2}
              </text>
              {interactive && (
                <text
                  x={250 + 105 * Math.cos((-(angle1Value + angle2Value / 2) * Math.PI) / 180)}
                  y={250 + 105 * Math.sin((-(angle1Value + angle2Value / 2) * Math.PI) / 180) + 18}
                  fontSize="12"
                  fill="#166534"
                  textAnchor="middle"
                >
                  = {angle2Value.toFixed(0)}°
                </text>
              )}
            </>
          )}

          {/* Whole angle arc (RSC) */}
          {showLabels && (
            <>
              <path
                d={`M ${250 + 90 * Math.cos(0)} ${250 + 90 * Math.sin(0)} A 90 90 0 0 0 ${250 + 90 * Math.cos((-(angle1Value + angle2Value) * Math.PI) / 180)} ${250 + 90 * Math.sin((-(angle1Value + angle2Value) * Math.PI) / 180)}`}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="3"
                strokeDasharray="5,5"
              />
              <text x="250" y="30" fontSize="16" fill="#7c3aed" textAnchor="middle" fontWeight="bold">
                m∠RSC = {whole}°
              </text>
              {interactive && (
                <text x="250" y="50" fontSize="12" fill="#6d28d9" textAnchor="middle">
                  = {wholeValue.toFixed(0)}°
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
              min="0"
              max="10"
              step="0.5"
              value={xValue}
              onChange={(e) => setXValue(Number(e.target.value))}
              className="flex-1"
            />
            <Badge variant="outline" className="w-16 justify-center">
              x = {xValue}
            </Badge>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm font-medium text-purple-900 mb-2">Angle Addition Postulate:</p>
            <p className="text-sm text-purple-800">
              m∠RST + m∠CST = m∠RSC
            </p>
            <p className="text-sm text-purple-800 mt-1">
              ({angle1}) + ({angle2}) = {whole}°
            </p>
            {Math.abs(angle1Value + angle2Value - wholeValue) < 1 && (
              <p className="text-sm font-bold text-green-700 mt-2">
                ✓ Correct! {angle1Value.toFixed(0)}° + {angle2Value.toFixed(0)}° = {wholeValue.toFixed(0)}°
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
