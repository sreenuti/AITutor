'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type ReasoningExample = 'detachment' | 'syllogism' | 'invalid';

export function DeductiveReasoningVisual() {
  const [example, setExample] = useState<ReasoningExample>('detachment');

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center flex-wrap">
        <Button
          size="sm"
          variant={example === 'detachment' ? 'default' : 'outline'}
          onClick={() => setExample('detachment')}
        >
          Law of Detachment
        </Button>
        <Button
          size="sm"
          variant={example === 'syllogism' ? 'default' : 'outline'}
          onClick={() => setExample('syllogism')}
        >
          Law of Syllogism
        </Button>
        <Button
          size="sm"
          variant={example === 'invalid' ? 'default' : 'outline'}
          onClick={() => setExample('invalid')}
        >
          Invalid Reasoning
        </Button>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <svg viewBox="0 0 600 350" className="w-full h-auto">
          {example === 'detachment' && (
            <>
              {/* Obtuse angle */}
              <g>
                <line x1="100" y1="200" x2="400" y2="200" stroke="#6366f1" strokeWidth="4" />
                <line
                  x1="100"
                  y1="200"
                  x2={100 + 250 * Math.cos((130 * Math.PI) / 180)}
                  y2={200 + 250 * Math.sin((130 * Math.PI) / 180)}
                  stroke="#6366f1"
                  strokeWidth="4"
                />
                {/* Angle arc */}
                <path
                  d="M 200 200 A 100 100 0 0 0 100 100"
                  fill="rgba(239, 68, 68, 0.2)"
                  stroke="#ef4444"
                  strokeWidth="3"
                />
                {/* Angle label */}
                <text x="180" y="140" fontSize="24" fill="#dc2626" fontWeight="bold">
                  115°
                </text>
                <text x="250" y="250" fontSize="18" fill="#1e40af" fontWeight="bold">
                  ∠A
                </text>
              </g>

              {/* Text boxes */}
              <g>
                <rect x="50" y="280" width="250" height="50" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="8" />
                <text x="175" y="308" fontSize="14" fill="#1e40af" textAnchor="middle" fontWeight="bold">
                  Given: m∠A = 115°
                </text>

                <rect x="320" y="280" width="250" height="50" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="8" />
                <text x="445" y="300" fontSize="13" fill="#166534" textAnchor="middle" fontWeight="bold">
                  If m∠A &gt; 90°,
                </text>
                <text x="445" y="318" fontSize="13" fill="#166534" textAnchor="middle" fontWeight="bold">
                  then ∠A is obtuse
                </text>
              </g>
            </>
          )}

          {example === 'syllogism' && (
            <>
              {/* Three connected statements */}
              <rect x="50" y="30" width="200" height="60" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="8" />
              <text x="150" y="55" fontSize="14" fill="#1e40af" textAnchor="middle" fontWeight="bold">
                If A, then B
              </text>
              <text x="150" y="75" fontSize="12" fill="#3b82f6" textAnchor="middle">
                (If studying, then learning)
              </text>

              <polygon points="150,100 140,115 160,115" fill="#6366f1" />

              <rect x="50" y="125" width="200" height="60" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="8" />
              <text x="150" y="150" fontSize="14" fill="#92400e" textAnchor="middle" fontWeight="bold">
                If B, then C
              </text>
              <text x="150" y="170" fontSize="12" fill="#d97706" textAnchor="middle">
                (If learning, then passing)
              </text>

              <line x1="260" y1="60" x2="340" y2="155" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="8,4" />
              <polygon points="340,155 330,150 335,162" fill="#8b5cf6" />

              <rect x="350" y="125" width="200" height="60" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="8" />
              <text x="450" y="150" fontSize="14" fill="#166534" textAnchor="middle" fontWeight="bold">
                ∴ If A, then C
              </text>
              <text x="450" y="170" fontSize="12" fill="#16a34a" textAnchor="middle">
                (If studying, then passing)
              </text>

              {/* Geometric example */}
              <rect x="100" y="220" width="400" height="100" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2" rx="8" />
              <text x="300" y="245" fontSize="13" fill="#374151" textAnchor="middle" fontWeight="bold">
                Geometry Example:
              </text>
              <text x="300" y="265" fontSize="12" fill="#4b5563" textAnchor="middle">
                If ∠1 and ∠2 are vertical, then they are congruent
              </text>
              <text x="300" y="283" fontSize="12" fill="#4b5563" textAnchor="middle">
                If ∠1 and ∠2 are congruent, then m∠1 = m∠2
              </text>
              <text x="300" y="305" fontSize="12" fill="#059669" textAnchor="middle" fontWeight="bold">
                ∴ If ∠1 and ∠2 are vertical, then m∠1 = m∠2
              </text>
            </>
          )}

          {example === 'invalid' && (
            <>
              {/* Invalid reasoning with acute angle */}
              <g>
                <line x1="100" y1="200" x2="400" y2="200" stroke="#6366f1" strokeWidth="4" />
                <line
                  x1="100"
                  y1="200"
                  x2={100 + 250 * Math.cos((45 * Math.PI) / 180)}
                  y2={200 - 250 * Math.sin((45 * Math.PI) / 180)}
                  stroke="#6366f1"
                  strokeWidth="4"
                />
                {/* Angle arc */}
                <path
                  d="M 200 200 A 100 100 0 0 1 170 130"
                  fill="rgba(34, 197, 94, 0.2)"
                  stroke="#22c55e"
                  strokeWidth="3"
                />
                {/* Angle label */}
                <text x="200" y="170" fontSize="24" fill="#16a34a" fontWeight="bold">
                  45°
                </text>
                <text x="250" y="240" fontSize="18" fill="#1e40af" fontWeight="bold">
                  ∠B
                </text>
              </g>

              {/* Warning box */}
              <rect x="50" y="270" width="500" height="70" fill="#fee2e2" stroke="#ef4444" strokeWidth="3" rx="8" />
              <text x="300" y="295" fontSize="14" fill="#991b1b" textAnchor="middle" fontWeight="bold">
                ⚠️ INVALID REASONING
              </text>
              <text x="300" y="315" fontSize="13" fill="#7f1d1d" textAnchor="middle">
                Given: If m∠B &gt; 90°, then ∠B is obtuse
              </text>
              <text x="300" y="332" fontSize="13" fill="#7f1d1d" textAnchor="middle">
                Given: m∠B = 45°  →  CANNOT conclude ∠B is obtuse!
              </text>
            </>
          )}
        </svg>
      </div>

      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <p className="text-sm font-medium text-indigo-900 mb-2">Explanation:</p>
        {example === 'detachment' && (
          <div className="space-y-1 text-sm text-indigo-800">
            <p><strong>Law of Detachment:</strong> If p → q is true AND p is true, then q is true.</p>
            <p className="mt-2">Given: (1) If m∠A &gt; 90°, then ∠A is obtuse</p>
            <p>(2) m∠A = 115°</p>
            <p className="text-green-700 font-bold mt-1">✓ Conclusion: ∠A is obtuse</p>
          </div>
        )}
        {example === 'syllogism' && (
          <div className="space-y-1 text-sm text-indigo-800">
            <p><strong>Law of Syllogism:</strong> If p → q AND q → r are both true, then p → r is true.</p>
            <p className="mt-2">Chain conditionals together to reach new conclusions!</p>
          </div>
        )}
        {example === 'invalid' && (
          <div className="space-y-1 text-sm text-indigo-800">
            <p><strong>Common Mistake:</strong> You need the HYPOTHESIS (p) to be true, not the conclusion (q).</p>
            <p className="mt-2">Just because m∠B ≠ obtuse doesn't tell us anything from "If obtuse, then &gt;90°"</p>
            <p className="text-red-700 font-bold mt-1">✗ This is affirming the consequent - INVALID!</p>
          </div>
        )}
      </div>
    </div>
  );
}
