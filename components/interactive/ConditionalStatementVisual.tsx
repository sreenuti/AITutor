'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type StatementType = 'angle' | 'polygon' | 'triangle';

export function ConditionalStatementVisual() {
  const [statementType, setStatementType] = useState<StatementType>('angle');

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center flex-wrap">
        <Button
          size="sm"
          variant={statementType === 'angle' ? 'default' : 'outline'}
          onClick={() => setStatementType('angle')}
        >
          Right Angle
        </Button>
        <Button
          size="sm"
          variant={statementType === 'polygon' ? 'default' : 'outline'}
          onClick={() => setStatementType('polygon')}
        >
          Octagon
        </Button>
        <Button
          size="sm"
          variant={statementType === 'triangle' ? 'default' : 'outline'}
          onClick={() => setStatementType('triangle')}
        >
          Equilateral Triangle
        </Button>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <svg viewBox="0 0 600 400" className="w-full h-auto">
          {statementType === 'angle' && (
            <>
              {/* Right angle */}
              <line x1="200" y1="250" x2="400" y2="250" stroke="#6366f1" strokeWidth="4" />
              <line x1="200" y1="250" x2="200" y2="100" stroke="#6366f1" strokeWidth="4" />
              {/* Right angle marker */}
              <rect x="200" y="230" width="20" height="20" fill="none" stroke="#6366f1" strokeWidth="2" />
              {/* 90° label */}
              <text x="240" y="230" fontSize="24" fill="#8b5cf6" fontWeight="bold">
                90°
              </text>
              {/* Angle arc */}
              <path
                d="M 250 250 A 50 50 0 0 0 200 200"
                fill="rgba(139, 92, 246, 0.2)"
                stroke="#8b5cf6"
                strokeWidth="2"
              />
            </>
          )}

          {statementType === 'polygon' && (
            <>
              {/* Regular octagon */}
              <g transform="translate(300, 200)">
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * Math.PI) / 4;
                  const nextAngle = ((i + 1) * Math.PI) / 4;
                  const x1 = 100 * Math.cos(angle);
                  const y1 = 100 * Math.sin(angle);
                  const x2 = 100 * Math.cos(nextAngle);
                  const y2 = 100 * Math.sin(nextAngle);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#10b981"
                      strokeWidth="4"
                    />
                  );
                })}
                {/* Fill */}
                <polygon
                  points={Array.from({ length: 8 })
                    .map((_, i) => {
                      const angle = (i * Math.PI) / 4;
                      const x = 100 * Math.cos(angle);
                      const y = 100 * Math.sin(angle);
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="rgba(16, 185, 129, 0.2)"
                />
                {/* Label sides */}
                <text x="0" y="-130" fontSize="18" fill="#059669" fontWeight="bold" textAnchor="middle">
                  8 sides
                </text>
              </g>
            </>
          )}

          {statementType === 'triangle' && (
            <>
              {/* Equilateral triangle */}
              <polygon
                points="300,80 150,280 450,280"
                fill="rgba(239, 68, 68, 0.2)"
                stroke="#ef4444"
                strokeWidth="4"
              />
              {/* Side length labels */}
              <text x="220" y="190" fontSize="20" fill="#dc2626" fontWeight="bold">
                a
              </text>
              <text x="380" y="190" fontSize="20" fill="#dc2626" fontWeight="bold">
                a
              </text>
              <text x="300" y="310" fontSize="20" fill="#dc2626" fontWeight="bold">
                a
              </text>
              {/* Angle markers */}
              <text x="150" y="270" fontSize="18" fill="#991b1b" fontWeight="bold">
                60°
              </text>
              <text x="440" y="270" fontSize="18" fill="#991b1b" fontWeight="bold">
                60°
              </text>
              <text x="290" y="100" fontSize="18" fill="#991b1b" fontWeight="bold">
                60°
              </text>
            </>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hypothesis */}
        <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
          <p className="text-xs uppercase font-bold text-blue-700 mb-2">Hypothesis (if)</p>
          {statementType === 'angle' && (
            <p className="text-sm text-blue-900">An angle is a <strong>right angle</strong></p>
          )}
          {statementType === 'polygon' && (
            <p className="text-sm text-blue-900">A polygon is an <strong>octagon</strong></p>
          )}
          {statementType === 'triangle' && (
            <p className="text-sm text-blue-900">A triangle is <strong>equilateral</strong></p>
          )}
        </div>

        {/* Conclusion */}
        <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
          <p className="text-xs uppercase font-bold text-green-700 mb-2">Conclusion (then)</p>
          {statementType === 'angle' && (
            <p className="text-sm text-green-900">It measures <strong>90°</strong></p>
          )}
          {statementType === 'polygon' && (
            <p className="text-sm text-green-900">It has <strong>8 sides</strong></p>
          )}
          {statementType === 'triangle' && (
            <p className="text-sm text-green-900">All sides are <strong>equal</strong></p>
          )}
        </div>
      </div>

      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-sm font-medium text-purple-900 mb-1">Conditional Statement:</p>
        {statementType === 'angle' && (
          <p className="text-sm text-purple-800">
            <strong>If</strong> an angle is a right angle, <strong>then</strong> it measures 90°.
          </p>
        )}
        {statementType === 'polygon' && (
          <p className="text-sm text-purple-800">
            <strong>If</strong> a polygon is an octagon, <strong>then</strong> it has 8 sides.
          </p>
        )}
        {statementType === 'triangle' && (
          <p className="text-sm text-purple-800">
            <strong>If</strong> a triangle is equilateral, <strong>then</strong> all sides are equal.
          </p>
        )}
      </div>
    </div>
  );
}
