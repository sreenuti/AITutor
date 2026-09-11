'use client';

import { SegmentAdditionVisual } from './SegmentAdditionVisual';
import { AngleAdditionVisual } from './AngleAdditionVisual';
import { InductivePatternVisual } from './InductivePatternVisual';

interface DiagramConfig {
  type: 'segment' | 'angle' | 'pattern' | 'none';
  props?: Record<string, unknown>;
}

interface ProblemWithDiagramProps {
  problem: string;
  diagramConfig?: DiagramConfig;
}

export function ProblemWithDiagram({ problem, diagramConfig }: ProblemWithDiagramProps) {
  if (!diagramConfig || diagramConfig.type === 'none') {
    return null;
  }

  return (
    <div className="mb-4">
      {diagramConfig.type === 'segment' && (
        <SegmentAdditionVisual
          partA={diagramConfig.props?.partA as string || '10'}
          partB={diagramConfig.props?.partB as string || '2x - 12'}
          whole={diagramConfig.props?.whole as string || 'x + 10'}
          showLabels={true}
          interactive={false}
        />
      )}
      {diagramConfig.type === 'angle' && (
        <AngleAdditionVisual
          angle1={diagramConfig.props?.angle1 as string || '14x + 2'}
          angle2={diagramConfig.props?.angle2 as string || '8x + 14'}
          whole={diagramConfig.props?.whole as string || '60'}
          showLabels={true}
          interactive={false}
        />
      )}
      {diagramConfig.type === 'pattern' && (
        <div className="max-w-md mx-auto">
          <InductivePatternVisual />
        </div>
      )}
    </div>
  );
}

// Helper function to extract diagram config from problem text
export function getDiagramConfigFromProblem(problem: string, topicId: string): DiagramConfig | undefined {
  // For segment addition problems
  if (topicId === 'segment-angle-addition' && problem.includes('IH') && problem.includes('HG')) {
    // Extract the expressions from the problem text
    const match = problem.match(/IH\s*=\s*([^,]+),\s*HG\s*=\s*([^,]+),\s*IG\s*=\s*([^.]+)/);
    if (match) {
      return {
        type: 'segment',
        props: {
          partA: match[1].trim(),
          partB: match[2].trim(),
          whole: match[3].trim(),
        },
      };
    }
  }

  // For angle addition problems
  if (topicId === 'segment-angle-addition' && problem.includes('∠') && problem.includes('m∠')) {
    const match = problem.match(/m∠\w+\s*=\s*([^,]+),\s*m∠\w+\s*=\s*([^,]+).*m∠\w+\s*=\s*(\d+)/);
    if (match) {
      return {
        type: 'angle',
        props: {
          angle1: match[1].trim(),
          angle2: match[2].trim(),
          whole: match[3].trim(),
        },
      };
    }
  }

  return undefined;
}
