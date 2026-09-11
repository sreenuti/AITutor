/**
 * High-quality demo data for when no API key is available
 * Sample content for parallel lines & transversals topic
 */

import type {
  WorksheetAnalysis,
  Explanation,
  PracticeProblem,
  Quiz,
} from './types';

export const DEMO_WORKSHEET_ANALYSIS: WorksheetAnalysis = {
  topicIds: ['parallel-transversals'],
  mainTopic: 'Parallel Lines and Transversals',
  concepts: [
    'Corresponding angles',
    'Alternate interior angles',
    'Alternate exterior angles',
    'Consecutive interior angles',
  ],
  difficulty: 'medium',
  estimatedGradeLevel: 8,
  problems: [
    {
      id: 'p1',
      text: 'Two parallel lines are cut by a transversal. If angle 1 measures 65°, what is the measure of angle 5 (its corresponding angle)?',
      type: 'short-answer',
      difficulty: 'easy',
    },
    {
      id: 'p2',
      text: 'Lines m and n are parallel, cut by transversal t. If ∠2 = 110°, find ∠6 (alternate interior angle).',
      type: 'short-answer',
      difficulty: 'medium',
    },
    {
      id: 'p3',
      text: 'Identify which angle pairs are corresponding angles when lines AB ∥ CD are cut by transversal EF.',
      type: 'multiple-choice',
      difficulty: 'medium',
    },
    {
      id: 'p4',
      text: 'If consecutive interior angles measure (3x + 10)° and (2x + 20)°, find the value of x.',
      type: 'calculation',
      difficulty: 'hard',
    },
  ],
};

export const DEMO_EXPLANATION: Explanation = {
  topicId: 'parallel-transversals',
  title: 'Parallel Lines and Transversals',
  introduction:
    'When two parallel lines are cut by a transversal (a line that crosses both parallel lines), special angle relationships are created. Understanding these relationships helps you find missing angle measures and prove that lines are parallel.',
  keyPoints: [
    '**Corresponding Angles** are congruent (equal). They are in the same position at each intersection.',
    '**Alternate Interior Angles** are congruent. They are on opposite sides of the transversal, between the parallel lines.',
    '**Alternate Exterior Angles** are congruent. They are on opposite sides of the transversal, outside the parallel lines.',
    '**Consecutive Interior Angles** are supplementary (add up to 180°). They are on the same side of the transversal, between the parallel lines.',
  ],
  workedExample: {
    problem:
      'Lines l and m are parallel, cut by transversal t. If ∠1 = 65°, find ∠3 (an alternate interior angle to ∠5, where ∠5 is corresponding to ∠1).',
    steps: [
      'First, identify the angle relationships. ∠1 and ∠5 are corresponding angles.',
      'Since corresponding angles are congruent when lines are parallel, ∠5 = ∠1 = 65°.',
      '∠3 and ∠5 are alternate interior angles.',
      'Since alternate interior angles are congruent, ∠3 = ∠5 = 65°.',
    ],
    answer: '∠3 = 65°',
    visual: 'parallel-lines-diagram',
  },
  checkUnderstanding: [
    {
      id: 'check-1',
      question: 'Corresponding angles formed by parallel lines and a transversal are always congruent.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation:
        'Correct! Corresponding angles are always congruent (equal) when the lines are parallel.',
    },
    {
      id: 'check-2',
      question:
        'If two parallel lines are cut by a transversal and one angle measures 120°, what is the measure of its consecutive interior angle?',
      type: 'multiple-choice',
      options: ['60°', '120°', '180°', '240°'],
      correctAnswer: '60°',
      explanation:
        'Consecutive interior angles are supplementary, meaning they add up to 180°. So 180° - 120° = 60°.',
    },
    {
      id: 'check-3',
      question: 'Alternate interior angles are on the same side of the transversal.',
      type: 'true-false',
      correctAnswer: 'false',
      explanation:
        'False! Alternate interior angles are on OPPOSITE sides of the transversal, which is why they are called "alternate."',
    },
  ],
};

export const DEMO_PRACTICE_PROBLEMS: PracticeProblem[] = [
  {
    id: 'prac-1',
    problem:
      'Two parallel lines are cut by a transversal. If ∠2 = 75°, find the measure of its corresponding angle ∠6.',
    hint1: 'Remember: corresponding angles are in the same relative position at each intersection.',
    hint2: 'Corresponding angles are congruent when lines are parallel.',
    answer: '75°',
    explanation:
      '∠2 and ∠6 are corresponding angles. Since the lines are parallel, corresponding angles are congruent, so ∠6 = ∠2 = 75°.',
  },
  {
    id: 'prac-2',
    problem:
      'Lines AB ∥ CD are cut by transversal EF. If ∠3 = 110°, find ∠5 (alternate interior angle).',
    hint1: 'Alternate interior angles are between the parallel lines, on opposite sides of the transversal.',
    hint2: 'These special angle pairs are congruent.',
    answer: '110°',
    explanation:
      '∠3 and ∠5 are alternate interior angles. When lines are parallel, alternate interior angles are congruent, so ∠5 = ∠3 = 110°.',
  },
  {
    id: 'prac-3',
    problem:
      'If consecutive interior angles measure (4x + 20)° and (2x + 40)°, find the value of x.',
    hint1: 'Consecutive interior angles are supplementary.',
    hint2: 'Set up an equation: (4x + 20) + (2x + 40) = 180',
    answer: '20',
    explanation:
      'Consecutive interior angles add up to 180°. So: (4x + 20) + (2x + 40) = 180. Simplifying: 6x + 60 = 180, then 6x = 120, so x = 20.',
  },
  {
    id: 'prac-4',
    problem:
      'Two parallel lines m and n are cut by transversal p. If ∠1 = 135°, find ∠4 (an angle on the opposite side of the transversal, outside the parallel lines).',
    hint1: '∠1 and ∠4 are alternate exterior angles.',
    hint2: 'Alternate exterior angles are congruent for parallel lines.',
    answer: '135°',
    explanation:
      '∠1 and ∠4 are alternate exterior angles. Since the lines are parallel, alternate exterior angles are congruent, so ∠4 = ∠1 = 135°.',
  },
  {
    id: 'prac-5',
    problem:
      'If ∠2 and ∠6 are corresponding angles, and ∠2 = 85°, what is ∠8 (the angle supplementary to ∠6)?',
    hint1: 'First find ∠6 using the corresponding angles relationship.',
    hint2: 'Then remember that supplementary angles add up to 180°.',
    answer: '95°',
    explanation:
      '∠2 and ∠6 are corresponding angles, so ∠6 = ∠2 = 85°. ∠8 and ∠6 form a linear pair (supplementary), so ∠8 = 180° - 85° = 95°.',
  },
];

export const DEMO_QUIZ: Quiz = {
  id: 'quiz-parallel-transversals',
  topicId: 'parallel-transversals',
  title: 'Parallel Lines & Transversals Quiz',
  totalPoints: 40,
  questions: [
    {
      id: 'q1',
      question:
        'When two parallel lines are cut by a transversal, which angle pairs are always congruent?',
      type: 'multiple-choice',
      options: [
        'Only corresponding angles',
        'Corresponding angles and alternate interior angles',
        'Only consecutive interior angles',
        'All angle pairs',
      ],
      correctAnswer: 'Corresponding angles and alternate interior angles',
      explanation:
        'Corresponding angles, alternate interior angles, and alternate exterior angles are all congruent. Consecutive interior angles are supplementary, not congruent.',
      points: 5,
    },
    {
      id: 'q2',
      question: 'Lines l ∥ m are cut by transversal t. If ∠1 = 68°, find ∠5 (corresponding angle).',
      type: 'short-answer',
      correctAnswer: '68',
      explanation:
        '∠1 and ∠5 are corresponding angles. Since the lines are parallel, corresponding angles are congruent, so ∠5 = 68°.',
      points: 5,
    },
    {
      id: 'q3',
      question:
        'If consecutive interior angles measure 3x° and (x + 60)°, what is the value of x?',
      type: 'short-answer',
      correctAnswer: '30',
      explanation:
        'Consecutive interior angles are supplementary: 3x + (x + 60) = 180. Solving: 4x + 60 = 180, 4x = 120, x = 30.',
      points: 5,
    },
    {
      id: 'q4',
      question: 'Alternate interior angles are supplementary.',
      type: 'multiple-choice',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation:
        'False! Alternate interior angles are congruent (equal), not supplementary. Consecutive interior angles are supplementary.',
      points: 5,
    },
    {
      id: 'q5',
      question:
        'Lines AB ∥ CD. Transversal EF creates ∠2 = 115°. Find ∠6 (alternate interior angle).',
      type: 'short-answer',
      correctAnswer: '115',
      explanation:
        '∠2 and ∠6 are alternate interior angles. For parallel lines, these angles are congruent, so ∠6 = 115°.',
      points: 5,
    },
    {
      id: 'q6',
      question: 'If ∠3 = 72° and ∠7 is its corresponding angle, what is the measure of ∠8 (supplementary to ∠7)?',
      type: 'short-answer',
      correctAnswer: '108',
      explanation:
        '∠3 and ∠7 are corresponding angles, so ∠7 = 72°. ∠7 and ∠8 are supplementary: 180° - 72° = 108°.',
      points: 5,
    },
    {
      id: 'q7',
      question:
        'Which statement is true about alternate exterior angles formed by parallel lines and a transversal?',
      type: 'multiple-choice',
      options: [
        'They are supplementary',
        'They are congruent',
        'They add up to 90°',
        'They have no special relationship',
      ],
      correctAnswer: 'They are congruent',
      explanation:
        'Alternate exterior angles are congruent (equal) when the lines are parallel.',
      points: 5,
    },
    {
      id: 'q8',
      question:
        'Two parallel lines are cut by a transversal. If one angle measures 45°, how many other angles measure 45°?',
      type: 'multiple-choice',
      options: ['1', '2', '3', '4'],
      correctAnswer: '3',
      explanation:
        'When two parallel lines are cut by a transversal, 8 angles are formed. Four will equal the given angle (its vertical angle, corresponding angle, and alternate interior/exterior angle), and four will be supplementary (135°). So 3 other angles equal 45°.',
      points: 5,
    },
  ],
};

// Additional demo data for other topics
export const DEMO_TRIANGLE_WORKSHEET: WorksheetAnalysis = {
  topicIds: ['triangles-basics'],
  mainTopic: 'Triangle Basics',
  concepts: [
    'Triangle angle sum theorem',
    'Classifying triangles',
    'Exterior angle theorem',
  ],
  difficulty: 'easy',
  estimatedGradeLevel: 8,
  problems: [
    {
      id: 'tri-p1',
      text: 'The angles of a triangle measure 60°, 70°, and x°. Find x.',
      type: 'short-answer',
      difficulty: 'easy',
    },
    {
      id: 'tri-p2',
      text: 'Classify a triangle with sides measuring 5 cm, 5 cm, and 8 cm.',
      type: 'multiple-choice',
      difficulty: 'easy',
    },
    {
      id: 'tri-p3',
      text: 'If an exterior angle of a triangle measures 120°, and one remote interior angle is 50°, find the other remote interior angle.',
      type: 'short-answer',
      difficulty: 'medium',
    },
  ],
};

export const SAMPLE_WORKSHEETS = [
  {
    id: 'sample-parallel',
    name: 'Parallel Lines & Transversals Practice',
    topicId: 'parallel-transversals',
    preview: 'A worksheet covering angle relationships with parallel lines',
  },
  {
    id: 'sample-triangles',
    name: 'Triangle Angle Sum Problems',
    topicId: 'triangles-basics',
    preview: 'Practice problems on finding missing angles in triangles',
  },
];
