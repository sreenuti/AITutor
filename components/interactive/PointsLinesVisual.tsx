'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function PointsLinesVisual() {
  const [showMode, setShowMode] = useState<'points' | 'line' | 'ray' | 'segment'>('points');
  const [showLabels, setShowLabels] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={showMode === 'points' ? 'default' : 'outline'}
          onClick={() => setShowMode('points')}
        >
          Points
        </Button>
        <Button
          size="sm"
          variant={showMode === 'line' ? 'default' : 'outline'}
          onClick={() => setShowMode('line')}
        >
          Line
        </Button>
        <Button
          size="sm"
          variant={showMode === 'segment' ? 'default' : 'outline'}
          onClick={() => setShowMode('segment')}
        >
          Line Segment
        </Button>
        <Button
          size="sm"
          variant={showMode === 'ray' ? 'default' : 'outline'}
          onClick={() => setShowMode('ray')}
        >
          Ray
        </Button>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <svg viewBox="0 0 400 300" className="w-full h-auto">
          {/* Points Mode */}
          {showMode === 'points' && (
            <>
              <circle cx="100" cy="150" r="6" fill="#8b5cf6" />
              <circle cx="200" cy="150" r="6" fill="#8b5cf6" />
              <circle cx="300" cy="150" r="6" fill="#8b5cf6" />
              {showLabels && (
                <>
                  <text x="100" y="135" fontSize="16" fill="#8b5cf6" fontWeight="bold" textAnchor="middle">
                    A
                  </text>
                  <text x="200" y="135" fontSize="16" fill="#8b5cf6" fontWeight="bold" textAnchor="middle">
                    B
                  </text>
                  <text x="300" y="135" fontSize="16" fill="#8b5cf6" fontWeight="bold" textAnchor="middle">
                    C
                  </text>
                </>
              )}
              <text x="200" y="230" fontSize="14" fill="#6b7280" textAnchor="middle">
                Points: Exact locations in space
              </text>
              <text x="200" y="250" fontSize="14" fill="#6b7280" textAnchor="middle">
                Named with capital letters
              </text>
            </>
          )}

          {/* Line Mode */}
          {showMode === 'line' && (
            <>
              <defs>
                <marker id="arrow-both-start" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M10,0 L10,6 L0,3 z" fill="#3b82f6" />
                </marker>
                <marker id="arrow-both-end" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L10,3 z" fill="#3b82f6" />
                </marker>
              </defs>
              <line
                x1="50"
                y1="150"
                x2="350"
                y2="150"
                stroke="#3b82f6"
                strokeWidth="3"
                markerStart="url(#arrow-both-start)"
                markerEnd="url(#arrow-both-end)"
              />
              <circle cx="150" cy="150" r="6" fill="#8b5cf6" />
              <circle cx="250" cy="150" r="6" fill="#8b5cf6" />
              {showLabels && (
                <>
                  <text x="150" y="135" fontSize="16" fill="#8b5cf6" fontWeight="bold" textAnchor="middle">
                    A
                  </text>
                  <text x="250" y="135" fontSize="16" fill="#8b5cf6" fontWeight="bold" textAnchor="middle">
                    B
                  </text>
                  <text x="200" y="190" fontSize="16" fill="#3b82f6" fontWeight="bold" textAnchor="middle">
                    Line AB or ↔AB
                  </text>
                </>
              )}
              <text x="200" y="230" fontSize="14" fill="#6b7280" textAnchor="middle">
                Line: Extends infinitely in both directions
              </text>
              <text x="200" y="250" fontSize="14" fill="#6b7280" textAnchor="middle">
                No endpoints
              </text>
            </>
          )}

          {/* Line Segment Mode */}
          {showMode === 'segment' && (
            <>
              <line
                x1="100"
                y1="150"
                x2="300"
                y2="150"
                stroke="#22c55e"
                strokeWidth="3"
              />
              <circle cx="100" cy="150" r="8" fill="#22c55e" />
              <circle cx="300" cy="150" r="8" fill="#22c55e" />
              {showLabels && (
                <>
                  <text x="100" y="135" fontSize="16" fill="#22c55e" fontWeight="bold" textAnchor="middle">
                    A
                  </text>
                  <text x="300" y="135" fontSize="16" fill="#22c55e" fontWeight="bold" textAnchor="middle">
                    B
                  </text>
                  <text x="200" y="190" fontSize="16" fill="#22c55e" fontWeight="bold" textAnchor="middle">
                    Segment AB or ‾AB
                  </text>
                </>
              )}
              <text x="200" y="230" fontSize="14" fill="#6b7280" textAnchor="middle">
                Line Segment: Part of a line between two endpoints
              </text>
              <text x="200" y="250" fontSize="14" fill="#6b7280" textAnchor="middle">
                Has measurable length
              </text>
            </>
          )}

          {/* Ray Mode */}
          {showMode === 'ray' && (
            <>
              <defs>
                <marker id="arrow-end" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L10,3 z" fill="#f59e0b" />
                </marker>
              </defs>
              <line
                x1="100"
                y1="150"
                x2="350"
                y2="150"
                stroke="#f59e0b"
                strokeWidth="3"
                markerEnd="url(#arrow-end)"
              />
              <circle cx="100" cy="150" r="8" fill="#f59e0b" />
              <circle cx="200" cy="150" r="6" fill="#ea580c" />
              {showLabels && (
                <>
                  <text x="100" y="135" fontSize="16" fill="#f59e0b" fontWeight="bold" textAnchor="middle">
                    A
                  </text>
                  <text x="200" y="135" fontSize="16" fill="#ea580c" fontWeight="bold" textAnchor="middle">
                    B
                  </text>
                  <text x="200" y="190" fontSize="16" fill="#f59e0b" fontWeight="bold" textAnchor="middle">
                    Ray AB or →AB
                  </text>
                </>
              )}
              <text x="200" y="230" fontSize="14" fill="#6b7280" textAnchor="middle">
                Ray: Starts at one point, extends infinitely in one direction
              </text>
              <text x="200" y="250" fontSize="14" fill="#6b7280" textAnchor="middle">
                One endpoint
              </text>
            </>
          )}
        </svg>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowLabels(!showLabels)}
        >
          {showLabels ? 'Hide' : 'Show'} Labels
        </Button>
      </div>

      {/* Notation Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Notation Guide:</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <div>• Point: Just the letter (A, B, C)</div>
          <div>• Line: ↔AB or line AB (extends both ways)</div>
          <div>• Segment: ‾AB or AB (between endpoints)</div>
          <div>• Ray: →AB (starts at A, through B)</div>
        </div>
      </div>
    </div>
  );
}
