'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface AnimationStep {
  duration: number;
  description: string;
}

interface AnimatedExplainerProps {
  topicId: string;
}

export function AnimatedExplainer({ topicId }: AnimatedExplainerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const animations: Record<string, { steps: AnimationStep[]; title: string }> = {
    'parallel-transversals': {
      title: 'How Parallel Lines & Transversals Work',
      steps: [
        { duration: 2000, description: 'Two parallel lines never meet' },
        { duration: 2000, description: 'A transversal crosses both lines' },
        { duration: 2000, description: 'This creates 8 angles' },
        { duration: 2000, description: 'Corresponding angles are equal' },
        { duration: 2000, description: 'Alternate interior angles are equal' },
      ],
    },
    'triangles-basics': {
      title: 'Triangle Angle Sum',
      steps: [
        { duration: 2000, description: 'Every triangle has 3 angles' },
        { duration: 2000, description: 'Let\'s measure each angle' },
        { duration: 2000, description: 'Add all three together' },
        { duration: 2000, description: 'The sum is always 180°!' },
      ],
    },
    'angles': {
      title: 'Understanding Angle Types',
      steps: [
        { duration: 2000, description: 'Angles measure rotation' },
        { duration: 2000, description: 'Acute: less than 90°' },
        { duration: 2000, description: 'Right: exactly 90°' },
        { duration: 2000, description: 'Obtuse: more than 90°' },
      ],
    },
    'points-lines-planes': {
      title: 'Building Blocks of Geometry',
      steps: [
        { duration: 2000, description: 'Points are exact locations' },
        { duration: 2000, description: 'Lines connect points and extend forever' },
        { duration: 2000, description: 'Segments are parts of lines with endpoints' },
        { duration: 2000, description: 'Rays start at one point and go forever' },
      ],
    },
    'congruence': {
      title: 'Understanding Congruence',
      steps: [
        { duration: 2000, description: 'Congruent means same size and shape' },
        { duration: 2000, description: 'Translation: slide the shape' },
        { duration: 2000, description: 'Rotation: turn the shape' },
        { duration: 2000, description: 'Reflection: flip the shape' },
      ],
    },
    'perimeter-area': {
      title: 'Perimeter and Area',
      steps: [
        { duration: 2000, description: 'Perimeter is the distance around' },
        { duration: 2000, description: 'Area is the space inside' },
        { duration: 2000, description: 'Different shapes, different formulas' },
        { duration: 2000, description: 'Practice makes perfect!' },
      ],
    },
  };

  const animation = animations[topicId] || animations['angles'];
  const totalSteps = animation.steps.length;

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsPlaying(false);
      }
    }, animation.steps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, totalSteps, animation.steps]);

  const handlePlayPause = () => {
    if (currentStep === totalSteps - 1 && !isPlaying) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const renderAnimationContent = () => {
    if (topicId === 'parallel-transversals') {
      return (
        <svg viewBox="0 0 400 300" className="w-full h-auto">
          {/* Parallel lines */}
          <line
            x1="50"
            y1="100"
            x2="350"
            y2="100"
            stroke="#6366f1"
            strokeWidth="3"
            className={currentStep >= 0 ? 'opacity-100' : 'opacity-0'}
            style={{ transition: 'opacity 0.5s' }}
          />
          <line
            x1="50"
            y1="200"
            x2="350"
            y2="200"
            stroke="#6366f1"
            strokeWidth="3"
            className={currentStep >= 0 ? 'opacity-100' : 'opacity-0'}
            style={{ transition: 'opacity 0.5s' }}
          />

          {/* Transversal */}
          <line
            x1="100"
            y1="50"
            x2="300"
            y2="250"
            stroke="#8b5cf6"
            strokeWidth="3"
            className={currentStep >= 1 ? 'opacity-100' : 'opacity-0'}
            style={{ transition: 'opacity 0.5s' }}
          />

          {/* Angles */}
          {currentStep >= 2 && (
            <>
              {[0, 1, 2, 3].map((i) => (
                <circle
                  key={`top-${i}`}
                  cx={140 + i * 20}
                  cy={100 + (i % 2) * 15}
                  r="8"
                  fill={currentStep >= 3 && (i === 0 || i === 2) ? '#f59e0b' : '#fbbf24'}
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
              {[0, 1, 2, 3].map((i) => (
                <circle
                  key={`bottom-${i}`}
                  cx={140 + i * 20}
                  cy={200 + (i % 2) * 15}
                  r="8"
                  fill={currentStep >= 3 && (i === 0 || i === 2) ? '#f59e0b' : '#fbbf24'}
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.2 + 0.4}s` }}
                />
              ))}
            </>
          )}

          {/* Highlight corresponding or alternate interior */}
          {currentStep >= 3 && (
            <path
              d="M 160 100 L 160 200"
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          )}
          {currentStep >= 4 && (
            <>
              <path
                d="M 155 115 L 215 185"
                stroke="#22c55e"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            </>
          )}
        </svg>
      );
    }

    if (topicId === 'triangles-basics') {
      const baseAngles = [60, 70, 50];
      const currentAngles = baseAngles.slice(0, Math.min(currentStep + 1, 3));
      
      return (
        <svg viewBox="0 0 400 300" className="w-full h-auto">
          <polygon
            points="200,80 100,240 300,240"
            fill={currentStep >= 0 ? 'rgba(167, 139, 250, 0.2)' : 'transparent'}
            stroke="#8b5cf6"
            strokeWidth="3"
            style={{ transition: 'all 0.5s' }}
          />

          {/* Angles */}
          {currentAngles.map((angle, i) => {
            const positions = [
              { x: 100, y: 240, label: 'A' },
              { x: 300, y: 240, label: 'B' },
              { x: 200, y: 80, label: 'C' },
            ];
            const pos = positions[i];
            
            return (
              <g key={i} className="animate-fade-in">
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="15"
                  fill="rgba(251, 191, 36, 0.3)"
                  stroke="#f59e0b"
                  strokeWidth="2"
                />
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  fontSize="14"
                  fill="#92400e"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {angle}°
                </text>
              </g>
            );
          })}

          {/* Sum display */}
          {currentStep >= 3 && (
            <g className="animate-bounce">
              <rect
                x="120"
                y="20"
                width="160"
                height="40"
                fill="#dcfce7"
                stroke="#22c55e"
                strokeWidth="2"
                rx="8"
              />
              <text
                x="200"
                y="45"
                fontSize="16"
                fill="#166534"
                textAnchor="middle"
                fontWeight="bold"
              >
                60° + 70° + 50° = 180°
              </text>
            </g>
          )}
        </svg>
      );
    }

    // Default angles animation
    const angleSize = [30, 90, 135, 180][Math.min(currentStep, 3)];
    const radians = (angleSize * Math.PI) / 180;
    const endX = 250 + 80 * Math.cos(radians);
    const endY = 200 - 80 * Math.sin(radians);

    return (
      <svg viewBox="0 0 400 300" className="w-full h-auto">
        <line x1="150" y1="200" x2="350" y2="200" stroke="#64748b" strokeWidth="3" />
        <line
          x1="250"
          y1="200"
          x2={endX}
          y2={endY}
          stroke="#8b5cf6"
          strokeWidth="3"
          style={{ transition: 'all 0.8s ease-in-out' }}
        />
        <path
          d={`M 330 200 A 80 80 0 ${angleSize > 180 ? 1 : 0} 0 ${endX} ${endY}`}
          fill="rgba(139, 92, 246, 0.2)"
          stroke="#8b5cf6"
          strokeWidth="2"
          style={{ transition: 'all 0.8s ease-in-out' }}
        />
        <text
          x="270"
          y="170"
          fontSize="20"
          fill="#7c3aed"
          fontWeight="bold"
          style={{ transition: 'all 0.8s ease-in-out' }}
        >
          {angleSize}°
        </text>
      </svg>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{animation.title}</h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handlePlayPause}>
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-1" />
                {currentStep === totalSteps - 1 ? 'Replay' : 'Play'}
              </>
            )}
          </Button>
          <Button size="sm" variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-4">
        {renderAnimationContent()}
      </div>

      <div className="space-y-2">
        <div className="flex gap-1">
          {animation.steps.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded ${
                i <= currentStep ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
              style={{ transition: 'background-color 0.3s' }}
            />
          ))}
        </div>
        <p className="text-center text-sm font-medium text-gray-700 min-h-[20px]">
          {animation.steps[currentStep]?.description}
        </p>
      </div>
    </div>
  );
}
