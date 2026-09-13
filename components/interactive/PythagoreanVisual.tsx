'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function PythagoreanVisual() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const c = Math.sqrt(a * a + b * b);
  const [showProof, setShowProof] = useState(false);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-6">
        <svg viewBox="0 0 600 450" className="w-full h-auto">
          {/* Right triangle */}
          <polygon
            points={`150,${350 - b * 40} 150,350 ${150 + a * 40},350`}
            fill="rgba(139, 92, 246, 0.2)"
            stroke="#8b5cf6"
            strokeWidth="4"
          />
          
          {/* Right angle marker */}
          <rect
            x="150"
            y={350 - 20}
            width="20"
            height="20"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2"
          />

          {/* Side a (base) */}
          <line
            x1="150"
            y1="370"
            x2={150 + a * 40}
            y2="370"
            stroke="#ef4444"
            strokeWidth="3"
          />
          <line x1="150" y1="365" x2="150" y2="375" stroke="#ef4444" strokeWidth="2" />
          <line x1={150 + a * 40} y1="365" x2={150 + a * 40} y2="375" stroke="#ef4444" strokeWidth="2" />
          <text
            x={150 + (a * 40) / 2}
            y="395"
            fontSize="20"
            fill="#dc2626"
            textAnchor="middle"
            fontWeight="bold"
          >
            a = {a}
          </text>

          {/* Side b (height) */}
          <line
            x1="130"
            y1={350 - b * 40}
            x2="130"
            y2="350"
            stroke="#22c55e"
            strokeWidth="3"
          />
          <line x1="125" y1={350 - b * 40} x2="135" y2={350 - b * 40} stroke="#22c55e" strokeWidth="2" />
          <line x1="125" y1="350" x2="135" y2="350" stroke="#22c55e" strokeWidth="2" />
          <text
            x="110"
            y={350 - (b * 40) / 2}
            fontSize="20"
            fill="#16a34a"
            textAnchor="middle"
            fontWeight="bold"
          >
            b = {b}
          </text>

          {/* Hypotenuse c */}
          <line
            x1="150"
            y1={350 - b * 40}
            x2={150 + a * 40}
            y2="350"
            stroke="#3b82f6"
            strokeWidth="3"
          />
          <text
            x={150 + (a * 40) / 2 + 20}
            y={350 - (b * 40) / 2 - 15}
            fontSize="20"
            fill="#2563eb"
            textAnchor="middle"
            fontWeight="bold"
          >
            c = {c.toFixed(2)}
          </text>

          {/* Formula */}
          <g>
            <rect x="350" y="80" width="220" height="120" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" rx="8" />
            <text x="460" y="115" fontSize="18" fill="#92400e" textAnchor="middle" fontWeight="bold">
              Pythagorean Theorem
            </text>
            <text x="460" y="145" fontSize="22" fill="#78350f" textAnchor="middle" fontWeight="bold">
              a² + b² = c²
            </text>
            <text x="460" y="175" fontSize="16" fill="#b45309" textAnchor="middle" fontWeight="bold">
              {a}² + {b}² = {c.toFixed(2)}²
            </text>
          </g>

          {/* Verification */}
          {showProof && (
            <g>
              <rect x="350" y="220" width="220" height="100" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="8" />
              <text x="460" y="245" fontSize="14" fill="#166534" textAnchor="middle" fontWeight="bold">
                Check:
              </text>
              <text x="460" y="265" fontSize="13" fill="#166534" textAnchor="middle">
                {a}² + {b}² = {a * a} + {b * b} = {a * a + b * b}
              </text>
              <text x="460" y="285" fontSize="13" fill="#166534" textAnchor="middle">
                c² = {c.toFixed(2)}² ≈ {(c * c).toFixed(2)}
              </text>
              <text x="460" y="305" fontSize="14" fill="#059669" textAnchor="middle" fontWeight="bold">
                ✓ They match!
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium w-24">Side a:</label>
          <input
            type="range"
            min="2"
            max="8"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="flex-1"
          />
          <Badge variant="outline" className="w-16 justify-center">
            {a}
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium w-24">Side b:</label>
          <input
            type="range"
            min="2"
            max="8"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="flex-1"
          />
          <Badge variant="outline" className="w-16 justify-center">
            {b}
          </Badge>
        </div>
      </div>

      <Button
        onClick={() => setShowProof(!showProof)}
        className="w-full"
      >
        {showProof ? 'Hide' : 'Show'} Verification
      </Button>

      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-sm font-medium text-purple-900 mb-2">Pythagorean Theorem:</p>
        <p className="text-sm text-purple-800">
          In a <strong>right triangle</strong>, the square of the hypotenuse (c) equals the sum of squares of the other two sides (a and b).
        </p>
      </div>
    </div>
  );
}
