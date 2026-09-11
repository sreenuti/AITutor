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

// Practice problems by topic
export const PRACTICE_BY_TOPIC: Record<string, PracticeProblem[]> = {
  'inductive-reasoning': [
    {
      id: 'ind-1',
      problem: 'Find the next five terms in the sequence: 13, 18, 23, 28, ...',
      hint1: 'Look at the difference between consecutive terms.',
      hint2: 'Each term increases by 5.',
      answer: '33, 38, 43, 48, 53',
      explanation: 'The pattern is adding 5 each time. So: 28+5=33, 33+5=38, 38+5=43, 43+5=48, 48+5=53.',
    },
    {
      id: 'ind-2',
      problem: 'Sequence: 512, 256, 128, 64, ... Find the next three terms.',
      hint1: 'Look at the ratio between consecutive terms.',
      hint2: 'Each term is divided by 2.',
      answer: '32, 16, 8',
      explanation: 'The pattern is dividing by 2 each time. So: 64÷2=32, 32÷2=16, 16÷2=8.',
    },
    {
      id: 'ind-3',
      problem: 'Conjecture: "All multiples of 5 end in 0." Find a counterexample.',
      hint1: 'Think of multiples of 5: 5, 10, 15, 20, 25, 30...',
      hint2: 'Do any of these NOT end in 0?',
      answer: '5 (or 15, 25, 35, etc.)',
      explanation: 'The number 5 itself (and 15, 25, 35, etc.) are multiples of 5 that end in 5, not 0. This disproves the conjecture.',
    },
    {
      id: 'ind-4',
      problem: 'Pattern: 1, 8, 27, 64, 125, ... What type of numbers are these?',
      hint1: 'Try taking the cube root of each number.',
      hint2: 'These are 1³, 2³, 3³, 4³, 5³...',
      answer: 'Perfect cubes',
      explanation: 'These are perfect cubes: 1³=1, 2³=8, 3³=27, 4³=64, 5³=125. The pattern is consecutive cubes.',
    },
    {
      id: 'ind-5',
      problem: 'Sequence: 2, 3, 5, 7, 11, 13, ... What is the conjecture?',
      hint1: 'Look at what all these numbers have in common.',
      hint2: 'These are all prime numbers.',
      answer: 'Prime numbers',
      explanation: 'The pattern is prime numbers in order. The conjecture is "the nth term is the nth prime number."',
    },
  ],
  
  'conditional-statements': [
    {
      id: 'cond-1',
      problem: 'Identify the hypothesis: "If an angle is obtuse, then it measures more than 90°."',
      hint1: 'The hypothesis is the "if" part.',
      hint2: 'What comes right after "if"?',
      answer: 'An angle is obtuse',
      explanation: 'The hypothesis is "an angle is obtuse" - this is the condition that comes after "if."',
    },
    {
      id: 'cond-2',
      problem: 'Identify the conclusion: "If a polygon has three sides, then it is a triangle."',
      hint1: 'The conclusion is the "then" part.',
      hint2: 'What comes after "then"?',
      answer: 'It is a triangle',
      explanation: 'The conclusion is "it is a triangle" - this is what follows from the hypothesis.',
    },
    {
      id: 'cond-3',
      problem: 'Rewrite as conditional: "All right angles measure 90°."',
      hint1: 'Use the form "If ..., then ..."',
      hint2: '"All X are Y" becomes "If X, then Y."',
      answer: 'If an angle is a right angle, then it measures 90°',
      explanation: 'The conditional form is: "If an angle is a right angle, then it measures 90°." This captures the same meaning.',
    },
    {
      id: 'cond-4',
      problem: 'Write the hypothesis and conclusion: "Vertical angles are congruent."',
      hint1: 'First rewrite as "If ..., then ..."',
      hint2: 'If angles are vertical, then they are congruent.',
      answer: 'Hypothesis: angles are vertical; Conclusion: they are congruent',
      explanation: 'Rewritten: "If angles are vertical, then they are congruent." Hypothesis = vertical angles, conclusion = congruent.',
    },
    {
      id: 'cond-5',
      problem: 'True or False: The statement "If x = 5, then x² = 25" is a true conditional.',
      hint1: 'Check: if the hypothesis is true, is the conclusion always true?',
      hint2: 'If x equals 5, does x² always equal 25?',
      answer: 'True',
      explanation: 'TRUE. When x = 5, we always have x² = 25. The conditional is true because the conclusion follows from the hypothesis.',
    },
  ],
  
  'related-conditionals': [
    {
      id: 'rel-1',
      problem: 'Original: "If x > 5, then x > 0." Write the converse.',
      hint1: 'The converse switches hypothesis and conclusion.',
      hint2: 'Swap the "if" and "then" parts.',
      answer: 'If x > 0, then x > 5',
      explanation: 'The converse is: "If x > 0, then x > 5." Note: this is FALSE (counterexample: x=1).',
    },
    {
      id: 'rel-2',
      problem: 'Original: "If it rains, then the ground is wet." Write the inverse.',
      hint1: 'The inverse negates both parts.',
      hint2: 'Use "If NOT ..., then NOT ..."',
      answer: 'If it does not rain, then the ground is not wet',
      explanation: 'The inverse is: "If it does not rain, then the ground is not wet." Note: this may be false (sprinkler!).',
    },
    {
      id: 'rel-3',
      problem: 'Original: "If an angle is right, then it measures 90°." Write the contrapositive.',
      hint1: 'The contrapositive switches AND negates.',
      hint2: '"If NOT q, then NOT p"',
      answer: 'If an angle does not measure 90°, then it is not a right angle',
      explanation: 'The contrapositive is: "If an angle does not measure 90°, then it is not a right angle." This is logically equivalent to the original!',
    },
    {
      id: 'rel-4',
      problem: 'Which is logically equivalent to "If p, then q"?',
      hint1: 'Remember: conditional and contrapositive are always equivalent.',
      hint2: 'The contrapositive is "If NOT q, then NOT p."',
      answer: 'If NOT q, then NOT p (contrapositive)',
      explanation: 'The contrapositive is ALWAYS logically equivalent to the original conditional. They have the same truth value.',
    },
    {
      id: 'rel-5',
      problem: 'Write the negation of "x ≥ 10."',
      hint1: 'Negation means the opposite.',
      hint2: 'The opposite of "greater than or equal to" is...',
      answer: 'x < 10',
      explanation: 'The negation of "x ≥ 10" is "x < 10." NOT (x ≥ 10) means x is less than 10.',
    },
  ],
  
  'biconditionals': [
    {
      id: 'bi-1',
      problem: 'Is this a valid biconditional? "A number is even iff it is divisible by 2."',
      hint1: 'Check both directions: even→divisible by 2, and divisible by 2→even.',
      hint2: 'Both must be true for a valid biconditional.',
      answer: 'Yes / True',
      explanation: 'YES! Both directions work: (1) If even, then divisible by 2. (2) If divisible by 2, then even. Perfect biconditional!',
    },
    {
      id: 'bi-2',
      problem: 'Write as biconditional: "If x=3 then 2x=6" AND "If 2x=6 then x=3."',
      hint1: 'Combine both conditionals using "if and only if."',
      hint2: 'The form is "p if and only if q."',
      answer: 'x = 3 if and only if 2x = 6',
      explanation: 'The biconditional is: "x = 3 if and only if 2x = 6." Both directions are true, so we can use "iff."',
    },
    {
      id: 'bi-3',
      problem: 'True or False: A biconditional is true when only the conditional is true.',
      hint1: 'What must be true for a biconditional?',
      hint2: 'Both the conditional AND its converse must be true.',
      answer: 'False',
      explanation: 'FALSE! A biconditional requires BOTH the conditional and its converse to be true. One direction isn\'t enough.',
    },
    {
      id: 'bi-4',
      problem: 'Separate this biconditional into two conditionals: "An angle is straight iff it measures 180°."',
      hint1: 'Split into "If p, then q" and "If q, then p."',
      hint2: 'You need both directions.',
      answer: '(1) If an angle is straight, then it measures 180°. (2) If an angle measures 180°, then it is straight.',
      explanation: 'The two conditionals are: (1) straight→180° and (2) 180°→straight. Both are true, forming the biconditional.',
    },
    {
      id: 'bi-5',
      problem: 'Which symbol represents a biconditional?',
      hint1: 'Biconditionals use a double arrow.',
      hint2: 'The symbol is ↔.',
      answer: '↔ (or ⟺)',
      explanation: 'The biconditional symbol is ↔ (or ⟺). It represents "if and only if" - the two-way logical connection.',
    },
  ],
  
  'deductive-reasoning': [
    {
      id: 'ded-1',
      problem: 'Given: (1) "If you study, you will pass." (2) "You studied." Conclusion?',
      hint1: 'This is the Law of Detachment.',
      hint2: 'p→q is true, and p is true, so...',
      answer: 'You will pass',
      explanation: 'By Law of Detachment: "If p, then q" + "p is true" → "q is true." Therefore, you will pass!',
    },
    {
      id: 'ded-2',
      problem: 'Given: (1) "If x>10, then x>5." (2) "If x>5, then x>0." Conclusion?',
      hint1: 'This is the Law of Syllogism.',
      hint2: 'Chain the conditionals: x>10 → x>5 → x>0.',
      answer: 'If x > 10, then x > 0',
      explanation: 'By Law of Syllogism: "If p→q" + "If q→r" → "If p→r." So: If x>10, then x>0.',
    },
    {
      id: 'ded-3',
      problem: 'Given: (1) "If it snows, school is canceled." (2) "School is canceled." Can you conclude it snowed?',
      hint1: 'This looks like detachment, but check carefully.',
      hint2: 'You need p to be true, not q!',
      answer: 'No / No valid conclusion',
      explanation: 'NO! We have q (school canceled), but Law of Detachment requires p (it snows) to be true. School could be canceled for other reasons.',
    },
    {
      id: 'ded-4',
      problem: 'Given: (1) "If m∠A=90°, then ∠A is right." (2) "∠A is right." Conclusion?',
      hint1: 'Do we have the hypothesis (m∠A=90°) or the conclusion (∠A is right)?',
      hint2: 'We have the conclusion, not the hypothesis.',
      answer: 'No valid conclusion',
      explanation: 'No valid conclusion. We need the HYPOTHESIS (m∠A=90°) to use detachment, but we only have the conclusion.',
    },
    {
      id: 'ded-5',
      problem: 'Given: (1) "If parallel, then corresponding angles equal." (2) "If corresponding angles equal, then same slope." Conclusion?',
      hint1: 'Can you chain these?',
      hint2: 'This is syllogism: p→q, q→r gives p→r.',
      answer: 'If parallel, then same slope',
      explanation: 'By Law of Syllogism: parallel→corresponding angles equal→same slope. So: If parallel, then same slope.',
    },
  ],
  
  'segment-angle-addition': [
    {
      id: 'seg-1',
      problem: 'Points I, H, G are collinear with H between I and G. IH=10, HG=2x-12, IG=x+10. Solve for x.',
      hint1: 'Use Segment Addition: IH + HG = IG.',
      hint2: 'Substitute: 10 + (2x-12) = x+10.',
      answer: 'x = 12',
      explanation: 'Set up: 10 + (2x-12) = x+10. Simplify: 2x-2 = x+10. Solve: x=12.',
    },
    {
      id: 'seg-2',
      problem: 'Q, R, S are collinear. QR=x+6, RS=x+3, QS=17. Solve for x.',
      hint1: 'Segment Addition: QR + RS = QS.',
      hint2: '(x+6) + (x+3) = 17.',
      answer: 'x = 4',
      explanation: '(x+6) + (x+3) = 17 → 2x+9 = 17 → 2x = 8 → x = 4.',
    },
    {
      id: 'seg-3',
      problem: 'Ray ST is between rays SR and SC. m∠RST=14x+2, m∠CST=8x+14, m∠RSC=60°. Solve for x.',
      hint1: 'Use Angle Addition: m∠RST + m∠CST = m∠RSC.',
      hint2: '(14x+2) + (8x+14) = 60.',
      answer: 'x = 2',
      explanation: '(14x+2) + (8x+14) = 60 → 22x+16 = 60 → 22x = 44 → x = 2.',
    },
    {
      id: 'seg-4',
      problem: 'Points M, L, K are collinear. ML=1+2x, LK=x+9, MK=10. Solve for x.',
      hint1: 'ML + LK = MK.',
      hint2: '(1+2x) + (x+9) = 10.',
      answer: 'x = 0',
      explanation: '(1+2x) + (x+9) = 10 → 3x+10 = 10 → 3x = 0 → x = 0.',
    },
    {
      id: 'seg-5',
      problem: 'Ray BC is between rays BA and BD. m∠ABC=x+46, m∠CBD=x+98, m∠ABD=120°. Solve for x.',
      hint1: 'Angle Addition: m∠ABC + m∠CBD = m∠ABD.',
      hint2: '(x+46) + (x+98) = 120.',
      answer: 'x = -12',
      explanation: '(x+46) + (x+98) = 120 → 2x+144 = 120 → 2x = -24 → x = -12. (Negative x is valid in algebra!)',
    },
  ],
};

// Add parallel-transversals to the practice map
PRACTICE_BY_TOPIC['parallel-transversals'] = [
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

// Quizzes by topic
export const QUIZZES_BY_TOPIC: Record<string, Quiz> = {
  'inductive-reasoning': {
    id: 'quiz-inductive',
    topicId: 'inductive-reasoning',
    title: 'Inductive Reasoning Quiz',
    totalPoints: 40,
    questions: [
      {
        id: 'q1',
        question: 'Find the next term: 13, 18, 23, 28, 33, ...',
        type: 'short-answer',
        correctAnswer: '38',
        explanation: 'The pattern adds 5 each time, so 33+5=38.',
        points: 5,
      },
      {
        id: 'q2',
        question: 'What is a conjecture?',
        type: 'multiple-choice',
        options: [
          'A proven fact',
          'An educated guess based on patterns',
          'A mathematical formula',
          'A type of theorem',
        ],
        correctAnswer: 'An educated guess based on patterns',
        explanation: 'A conjecture is an educated guess made by observing patterns. It may be true or false until proven.',
        points: 5,
      },
      {
        id: 'q3',
        question: 'Conjecture: "All multiples of 10 end in 0." Is this true or false?',
        type: 'multiple-choice',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'TRUE. Any multiple of 10 (10, 20, 30, ...) always ends in 0.',
        points: 5,
      },
      {
        id: 'q4',
        question: 'What is a counterexample?',
        type: 'multiple-choice',
        options: [
          'An example that supports a conjecture',
          'An example that proves a conjecture false',
          'A second example',
          'A similar example',
        ],
        correctAnswer: 'An example that proves a conjecture false',
        explanation: 'A counterexample is one example that proves a conjecture FALSE. Just one is enough to disprove!',
        points: 5,
      },
      {
        id: 'q5',
        question: 'Find a counterexample: "All prime numbers are odd."',
        type: 'short-answer',
        correctAnswer: '2',
        explanation: 'The number 2 is prime AND even, so it\'s a counterexample to the conjecture.',
        points: 5,
      },
      {
        id: 'q6',
        question: 'Sequence: 1, 8, 27, 64, 125, ... These are:',
        type: 'multiple-choice',
        options: ['Perfect squares', 'Perfect cubes', 'Multiples of 8', 'Prime numbers'],
        correctAnswer: 'Perfect cubes',
        explanation: 'These are perfect cubes: 1³, 2³, 3³, 4³, 5³, ...',
        points: 5,
      },
      {
        id: 'q7',
        question: 'Inductive reasoning gives us certain, guaranteed conclusions.',
        type: 'multiple-choice',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'FALSE. Inductive reasoning gives probable conclusions (conjectures), not certain ones. Deductive reasoning gives certain conclusions.',
        points: 5,
      },
      {
        id: 'q8',
        question: 'Next three terms: 512, 256, 128, 64, ...',
        type: 'short-answer',
        correctAnswer: '32',
        explanation: 'The pattern divides by 2 each time. 64÷2=32, 32÷2=16, 16÷2=8. (Answer can be "32, 16, 8" or just "32")',
        points: 5,
      },
    ],
  },
  
  'conditional-statements': {
    id: 'quiz-conditional',
    topicId: 'conditional-statements',
    title: 'Conditional Statements Quiz',
    totalPoints: 40,
    questions: [
      {
        id: 'q1',
        question: 'A conditional statement has the form:',
        type: 'multiple-choice',
        options: ['If p, then q', 'If and only if', 'p or q', 'p equals q'],
        correctAnswer: 'If p, then q',
        explanation: 'A conditional statement has the form "If p, then q" where p is the hypothesis and q is the conclusion.',
        points: 5,
      },
      {
        id: 'q2',
        question: 'In "If it rains, then the ground is wet," what is the hypothesis?',
        type: 'multiple-choice',
        options: ['It rains', 'The ground is wet', 'Both', 'Neither'],
        correctAnswer: 'It rains',
        explanation: 'The hypothesis is the "if" part: "it rains." This is the condition.',
        points: 5,
      },
      {
        id: 'q3',
        question: 'In "If an angle is obtuse, then it is greater than 90°," what is the conclusion?',
        type: 'multiple-choice',
        options: ['An angle is obtuse', 'It is greater than 90°', 'Obtuse angle', 'Greater than'],
        correctAnswer: 'It is greater than 90°',
        explanation: 'The conclusion is the "then" part: "it is greater than 90°." This is what follows from the hypothesis.',
        points: 5,
      },
      {
        id: 'q4',
        question: 'Rewrite as conditional: "All right angles measure 90°."',
        type: 'multiple-choice',
        options: [
          'If an angle measures 90°, then it is right',
          'If an angle is right, then it measures 90°',
          'Right angles and 90° are the same',
          'All angles are 90°',
        ],
        correctAnswer: 'If an angle is right, then it measures 90°',
        explanation: '"All X are Y" becomes "If X, then Y." So: "If an angle is right, then it measures 90°."',
        points: 5,
      },
      {
        id: 'q5',
        question: 'True or False: A conditional statement can have a false hypothesis and still be considered true.',
        type: 'multiple-choice',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'TRUE. If the hypothesis is false, the conditional is automatically true (vacuously true) regardless of the conclusion.',
        points: 5,
      },
      {
        id: 'q6',
        question: 'Which part of "If x=5, then x²=25" is the conclusion?',
        type: 'short-answer',
        correctAnswer: 'x²=25',
        explanation: 'The conclusion is "x²=25" - the "then" part of the conditional.',
        points: 5,
      },
      {
        id: 'q7',
        question: 'Rewrite in if-then form: "Vertical angles are congruent."',
        type: 'multiple-choice',
        options: [
          'If angles are congruent, then they are vertical',
          'If angles are vertical, then they are congruent',
          'Angles are vertical and congruent',
          'Vertical means congruent',
        ],
        correctAnswer: 'If angles are vertical, then they are congruent',
        explanation: 'The conditional form is: "If angles are vertical, then they are congruent."',
        points: 5,
      },
      {
        id: 'q8',
        question: 'A conditional statement is also called:',
        type: 'multiple-choice',
        options: ['An implication', 'A biconditional', 'A conjunction', 'A negation'],
        correctAnswer: 'An implication',
        explanation: 'A conditional is also called an implication because it implies that q follows from p.',
        points: 5,
      },
    ],
  },
  
  'related-conditionals': {
    id: 'quiz-related',
    topicId: 'related-conditionals',
    title: 'Related Conditionals Quiz',
    totalPoints: 40,
    questions: [
      {
        id: 'q1',
        question: 'If the original conditional is "If p, then q," the converse is:',
        type: 'multiple-choice',
        options: ['If q, then p', 'If NOT p, then NOT q', 'If NOT q, then NOT p', 'If p, then NOT q'],
        correctAnswer: 'If q, then p',
        explanation: 'The converse switches the hypothesis and conclusion: "If q, then p."',
        points: 5,
      },
      {
        id: 'q2',
        question: 'If the original is "If p, then q," the inverse is:',
        type: 'multiple-choice',
        options: ['If q, then p', 'If NOT p, then NOT q', 'If NOT q, then NOT p', 'If p, then NOT q'],
        correctAnswer: 'If NOT p, then NOT q',
        explanation: 'The inverse negates both parts: "If NOT p, then NOT q."',
        points: 5,
      },
      {
        id: 'q3',
        question: 'If the original is "If p, then q," the contrapositive is:',
        type: 'multiple-choice',
        options: ['If q, then p', 'If NOT p, then NOT q', 'If NOT q, then NOT p', 'If p, then NOT q'],
        correctAnswer: 'If NOT q, then NOT p',
        explanation: 'The contrapositive switches AND negates: "If NOT q, then NOT p."',
        points: 5,
      },
      {
        id: 'q4',
        question: 'Which form is ALWAYS logically equivalent to the original conditional?',
        type: 'multiple-choice',
        options: ['Converse', 'Inverse', 'Contrapositive', 'None'],
        correctAnswer: 'Contrapositive',
        explanation: 'The contrapositive is ALWAYS logically equivalent to the original. If one is true, both are true.',
        points: 5,
      },
      {
        id: 'q5',
        question: 'Original: "If x>5, then x>0." Write the converse.',
        type: 'short-answer',
        correctAnswer: 'If x>0, then x>5',
        explanation: 'The converse is: "If x>0, then x>5." (Note: this is FALSE - counterexample x=1)',
        points: 5,
      },
      {
        id: 'q6',
        question: 'The converse of a true conditional is always true.',
        type: 'multiple-choice',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'FALSE. The converse is NOT automatically true even if the original is true.',
        points: 5,
      },
      {
        id: 'q7',
        question: 'Which two forms are logically equivalent to EACH OTHER?',
        type: 'multiple-choice',
        options: [
          'Conditional and converse',
          'Converse and inverse',
          'Inverse and contrapositive',
          'Conditional and inverse',
        ],
        correctAnswer: 'Converse and inverse',
        explanation: 'The converse and inverse are logically equivalent to each other (but not to the original).',
        points: 5,
      },
      {
        id: 'q8',
        question: 'What is the negation of "x ≥ 10"?',
        type: 'short-answer',
        correctAnswer: 'x < 10',
        explanation: 'The negation of "x ≥ 10" is "x < 10."',
        points: 5,
      },
    ],
  },
  
  'biconditionals': {
    id: 'quiz-biconditional',
    topicId: 'biconditionals',
    title: 'Biconditional Statements Quiz',
    totalPoints: 40,
    questions: [
      {
        id: 'q1',
        question: 'A biconditional statement uses:',
        type: 'multiple-choice',
        options: ['If, then', 'If and only if', 'If, or', 'Only if'],
        correctAnswer: 'If and only if',
        explanation: 'A biconditional uses "if and only if" (often abbreviated "iff").',
        points: 5,
      },
      {
        id: 'q2',
        question: 'A biconditional is true when:',
        type: 'multiple-choice',
        options: [
          'Only the conditional is true',
          'Only the converse is true',
          'Both conditional and converse are true',
          'Either conditional or converse is true',
        ],
        correctAnswer: 'Both conditional and converse are true',
        explanation: 'A biconditional requires BOTH the conditional and its converse to be true.',
        points: 5,
      },
      {
        id: 'q3',
        question: 'Which symbol represents a biconditional?',
        type: 'multiple-choice',
        options: ['→', '↔', '∨', '¬'],
        correctAnswer: '↔',
        explanation: 'The biconditional symbol is ↔ (double arrow), representing the two-way connection.',
        points: 5,
      },
      {
        id: 'q4',
        question: 'Is this valid? "A number is even iff it is divisible by 2."',
        type: 'multiple-choice',
        options: ['Yes', 'No'],
        correctAnswer: 'Yes',
        explanation: 'YES! Both directions are true: even→divisible by 2, and divisible by 2→even.',
        points: 5,
      },
      {
        id: 'q5',
        question: '"p iff q" means the same as "p if and only if q."',
        type: 'multiple-choice',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'TRUE. "iff" is just an abbreviation for "if and only if."',
        points: 5,
      },
      {
        id: 'q6',
        question: 'How many conditionals does a biconditional contain?',
        type: 'short-answer',
        correctAnswer: '2',
        explanation: 'A biconditional contains TWO conditionals: the original and its converse.',
        points: 5,
      },
      {
        id: 'q7',
        question: 'Can "If x>5, then x>0" be written as a biconditional?',
        type: 'multiple-choice',
        options: ['Yes', 'No'],
        correctAnswer: 'No',
        explanation: 'NO. The converse "If x>0, then x>5" is false (counterexample: x=1), so we can\'t form a biconditional.',
        points: 5,
      },
      {
        id: 'q8',
        question: 'Another name for a biconditional is:',
        type: 'multiple-choice',
        options: ['One-way implication', 'Two-way implication', 'Conditional', 'Contrapositive'],
        correctAnswer: 'Two-way implication',
        explanation: 'A biconditional is also called a "two-way implication" because it works both ways.',
        points: 5,
      },
    ],
  },
  
  'deductive-reasoning': {
    id: 'quiz-deductive',
    topicId: 'deductive-reasoning',
    title: 'Deductive Reasoning Quiz',
    totalPoints: 40,
    questions: [
      {
        id: 'q1',
        question: 'Deductive reasoning gives us:',
        type: 'multiple-choice',
        options: [
          'Probable conclusions',
          'Educated guesses',
          'Certain conclusions',
          'Conjectures',
        ],
        correctAnswer: 'Certain conclusions',
        explanation: 'Deductive reasoning gives CERTAIN conclusions when the premises are true.',
        points: 5,
      },
      {
        id: 'q2',
        question: 'Law of Detachment: If "p→q" is true and p is true, then:',
        type: 'multiple-choice',
        options: ['q is true', 'q is false', 'p is false', 'No conclusion'],
        correctAnswer: 'q is true',
        explanation: 'Law of Detachment: If "p→q" and "p" are both true, then "q" MUST be true.',
        points: 5,
      },
      {
        id: 'q3',
        question: 'Given: (1) "If it rains, the game is canceled." (2) "It is raining." Conclusion?',
        type: 'short-answer',
        correctAnswer: 'The game is canceled',
        explanation: 'By Law of Detachment: p→q + p = q. Therefore, the game is canceled.',
        points: 5,
      },
      {
        id: 'q4',
        question: 'Law of Syllogism: If "p→q" and "q→r" are true, then:',
        type: 'multiple-choice',
        options: ['p→r is true', 'r→p is true', 'q→p is true', 'No conclusion'],
        correctAnswer: 'p→r is true',
        explanation: 'Law of Syllogism chains conditionals: p→q + q→r gives p→r.',
        points: 5,
      },
      {
        id: 'q5',
        question: 'Given: (1) "If A, then B." (2) "If B, then C." Conclusion?',
        type: 'short-answer',
        correctAnswer: 'If A, then C',
        explanation: 'By Law of Syllogism: A→B + B→C gives A→C.',
        points: 5,
      },
      {
        id: 'q6',
        question: 'Given: (1) "If x>10, then x>5." (2) "The ground is wet." Can you conclude it rained?',
        type: 'multiple-choice',
        options: ['Yes', 'No'],
        correctAnswer: 'No',
        explanation: 'NO. The statements are unrelated, so no valid conclusion can be drawn.',
        points: 5,
      },
      {
        id: 'q7',
        question: 'Can we use Law of Detachment if we only know the conclusion (q) is true?',
        type: 'multiple-choice',
        options: ['Yes', 'No'],
        correctAnswer: 'No',
        explanation: 'NO. Law of Detachment requires the HYPOTHESIS (p) to be true, not the conclusion.',
        points: 5,
      },
      {
        id: 'q8',
        question: 'Which law chains two conditionals together?',
        type: 'multiple-choice',
        options: ['Law of Detachment', 'Law of Syllogism', 'Law of Converse', 'Law of Negation'],
        correctAnswer: 'Law of Syllogism',
        explanation: 'The Law of Syllogism chains two conditionals: p→q + q→r = p→r.',
        points: 5,
      },
    ],
  },
  
  'segment-angle-addition': {
    id: 'quiz-addition',
    topicId: 'segment-angle-addition',
    title: 'Segment & Angle Addition Quiz',
    totalPoints: 40,
    questions: [
      {
        id: 'q1',
        question: 'Segment Addition Postulate states: If B is between A and C, then:',
        type: 'multiple-choice',
        options: ['AB + BC = AC', 'AB - BC = AC', 'AB × BC = AC', 'AB ÷ BC = AC'],
        correctAnswer: 'AB + BC = AC',
        explanation: 'Segment Addition Postulate: AB + BC = AC (part + part = whole).',
        points: 5,
      },
      {
        id: 'q2',
        question: 'Points I, H, G are collinear. IH=10, HG=2x-12, IG=x+10. Solve for x.',
        type: 'short-answer',
        correctAnswer: '12',
        explanation: 'IH + HG = IG → 10 + (2x-12) = x+10 → 2x-2 = x+10 → x=12.',
        points: 5,
      },
      {
        id: 'q3',
        question: 'Angle Addition Postulate: If D is in the interior of ∠ABC, then:',
        type: 'multiple-choice',
        options: [
          'm∠ABD + m∠DBC = m∠ABC',
          'm∠ABD - m∠DBC = m∠ABC',
          'm∠ABD × m∠DBC = m∠ABC',
          'm∠ABD = m∠ABC',
        ],
        correctAnswer: 'm∠ABD + m∠DBC = m∠ABC',
        explanation: 'Angle Addition Postulate: m∠ABD + m∠DBC = m∠ABC (part + part = whole).',
        points: 5,
      },
      {
        id: 'q4',
        question: 'Ray ST is in ∠RSC. m∠RST=14x+2, m∠CST=8x+14, m∠RSC=60°. Solve for x.',
        type: 'short-answer',
        correctAnswer: '2',
        explanation: '(14x+2) + (8x+14) = 60 → 22x+16 = 60 → 22x=44 → x=2.',
        points: 5,
      },
      {
        id: 'q5',
        question: 'Points Q, R, S are collinear. QR=x+6, RS=x+3, QS=17. Solve for x.',
        type: 'short-answer',
        correctAnswer: '4',
        explanation: '(x+6) + (x+3) = 17 → 2x+9 = 17 → 2x=8 → x=4.',
        points: 5,
      },
      {
        id: 'q6',
        question: 'On worksheets, segment and angle problems often have the same value of x.',
        type: 'multiple-choice',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'TRUE. Both postulates use the same structure (part + part = whole), so similar setups yield the same x!',
        points: 5,
      },
      {
        id: 'q7',
        question: 'Points M, L, K on a line. ML=1+2x, LK=x+9, MK=10. Solve for x.',
        type: 'short-answer',
        correctAnswer: '0',
        explanation: '(1+2x) + (x+9) = 10 → 3x+10 = 10 → 3x=0 → x=0.',
        points: 5,
      },
      {
        id: 'q8',
        question: 'To solve these problems, what type of math do you use?',
        type: 'multiple-choice',
        options: ['Algebra', 'Geometry', 'Trigonometry', 'Calculus'],
        correctAnswer: 'Algebra',
        explanation: 'You use ALGEBRA to solve for x: set up the equation, combine like terms, and solve!',
        points: 5,
      },
    ],
  },
  
  'parallel-transversals': {
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
  },
};

// Export for backward compatibility
export const DEMO_QUIZ = QUIZZES_BY_TOPIC['parallel-transversals'];
export const DEMO_PRACTICE_PROBLEMS = PRACTICE_BY_TOPIC['parallel-transversals'];

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
