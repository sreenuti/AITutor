/**
 * Interactive lesson content builder
 * Creates step-by-step lessons with interactive visuals
 */

import { ParallelLinesVisual } from '@/components/interactive/ParallelLinesVisual';
import { TriangleAngleVisual } from '@/components/interactive/TriangleAngleVisual';
import { AngleTypesVisual } from '@/components/interactive/AngleTypesVisual';
import { AnimatedExplainer } from '@/components/interactive/AnimatedExplainer';

interface LessonStep {
  id: string;
  type: 'intro' | 'watch' | 'interact' | 'check' | 'summary';
  title: string;
  content: string;
  component?: React.ReactNode;
  question?: {
    text: string;
    type: 'multiple-choice' | 'true-false';
    options?: string[];
    correctAnswer: string;
    explanation: string;
  };
}

export function getLessonSteps(topicId: string): LessonStep[] {
  const lessons: Record<string, LessonStep[]> = {
    'parallel-transversals': [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to Parallel Lines & Transversals!',
        content:
          "In this lesson, you'll discover the special angle relationships that form when a line crosses two parallel lines. These patterns are everywhere - in architecture, art, and design!",
      },
      {
        id: 'watch-1',
        type: 'watch',
        title: 'Watch: How It Works',
        content:
          "Let's see a 60-second visual walkthrough of parallel lines and transversals. Watch how the angles form and relate to each other.",
        component: <AnimatedExplainer topicId="parallel-transversals" />,
      },
      {
        id: 'interact-1',
        type: 'interact',
        title: 'Try It Yourself: Explore the Angles',
        content:
          "Now it's your turn! Use the controls below to change the transversal angle and highlight different angle pairs. Notice how corresponding angles stay equal no matter what angle you choose.",
        component: <ParallelLinesVisual showLabels={true} />,
      },
      {
        id: 'check-1',
        type: 'check',
        title: 'Quick Check: Corresponding Angles',
        content: "Let's make sure you've got it!",
        question: {
          text: 'When two parallel lines are cut by a transversal, corresponding angles are always congruent (equal).',
          type: 'true-false',
          correctAnswer: 'true',
          explanation:
            "That's right! Corresponding angles are always equal when the lines are parallel. Try changing the angle in the interactive diagram - the corresponding angles stay equal!",
        },
      },
      {
        id: 'interact-2',
        type: 'interact',
        title: 'Explore More: Other Angle Pairs',
        content:
          'There are other special angle relationships too! Click the buttons to highlight alternate interior, alternate exterior, and consecutive interior angles.',
        component: <ParallelLinesVisual showLabels={true} />,
      },
      {
        id: 'check-2',
        type: 'check',
        title: 'Quick Check: Consecutive Interior Angles',
        content: 'One more quick question!',
        question: {
          text: 'Consecutive interior angles formed by parallel lines and a transversal are:',
          type: 'multiple-choice',
          options: ['Congruent (equal)', 'Supplementary (add to 180°)', 'Complementary (add to 90°)', 'Unrelated'],
          correctAnswer: 'Supplementary (add to 180°)',
          explanation:
            "Perfect! Consecutive interior angles add up to 180° (they're supplementary). This is different from corresponding and alternate angles, which are congruent.",
        },
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: "Great Work! You've Got It! 🎉",
        content:
          'You now understand parallel lines and transversals! You learned that corresponding angles are equal, alternate interior/exterior angles are equal, and consecutive interior angles are supplementary. Ready to practice?',
      },
    ],

    'triangles-basics': [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to Triangle Basics!',
        content:
          "Triangles are the strongest shapes in geometry! In this lesson, you'll discover an amazing fact: no matter what triangle you draw, its three angles always add up to exactly 180°.",
      },
      {
        id: 'watch-1',
        type: 'watch',
        title: 'Watch: The Triangle Angle Sum',
        content:
          'Let\'s see why the angles in a triangle always sum to 180°. Watch this quick visual proof!',
        component: <AnimatedExplainer topicId="triangles-basics" />,
      },
      {
        id: 'interact-1',
        type: 'interact',
        title: 'Try It: Build Your Own Triangle',
        content:
          'Drag the sliders to change two of the angles. Notice how the third angle automatically adjusts so the sum stays at 180°. Try making different types of triangles!',
        component: <TriangleAngleVisual />,
      },
      {
        id: 'check-1',
        type: 'check',
        title: 'Quick Check: Angle Sum',
        content: "Let's test your understanding!",
        question: {
          text: 'If two angles of a triangle measure 50° and 60°, what is the measure of the third angle?',
          type: 'multiple-choice',
          options: ['60°', '70°', '80°', '110°'],
          correctAnswer: '70°',
          explanation:
            'Correct! Since all three angles must add to 180°, the third angle is 180° - 50° - 60° = 70°.',
        },
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: 'Triangle Master! 🎉',
        content:
          "You've mastered the triangle angle sum theorem! Remember: the three angles of any triangle always add up to exactly 180°. This is one of the most important facts in geometry!",
      },
    ],

    'angles': [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to Angles!',
        content:
          "Angles are everywhere - in corners, turns, and rotations. In this lesson, you'll learn to classify angles by their size and understand what makes each type special.",
      },
      {
        id: 'watch-1',
        type: 'watch',
        title: 'Watch: Understanding Angles',
        content:
          'Let\'s take a quick tour of the different types of angles. Watch how the angle changes from acute to straight!',
        component: <AnimatedExplainer topicId="angles" />,
      },
      {
        id: 'interact-1',
        type: 'interact',
        title: 'Try It: Explore Angle Types',
        content:
          'Drag the slider to change the angle size. Watch the label change as you create acute, right, obtuse, and straight angles. Try the quick-select buttons too!',
        component: <AngleTypesVisual />,
      },
      {
        id: 'check-1',
        type: 'check',
        title: 'Quick Check: Angle Classification',
        content: 'Can you identify this angle type?',
        question: {
          text: 'An angle that measures exactly 90° is called:',
          type: 'multiple-choice',
          options: ['Acute angle', 'Right angle', 'Obtuse angle', 'Straight angle'],
          correctAnswer: 'Right angle',
          explanation:
            'Perfect! A 90° angle is a right angle - it forms a perfect corner, like the corners of this screen!',
        },
      },
      {
        id: 'check-2',
        type: 'check',
        title: 'Quick Check: Obtuse Angles',
        content: 'One more!',
        question: {
          text: 'An obtuse angle measures more than 90° but less than 180°.',
          type: 'true-false',
          correctAnswer: 'true',
          explanation:
            "That's right! Obtuse angles are \"wider\" than right angles but not quite straight. They're between 90° and 180°.",
        },
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: 'Angle Expert! 🎉',
        content:
          "You now know all the angle types: acute (<90°), right (=90°), obtuse (>90°, <180°), and straight (=180°). You're ready to identify angles anywhere!",
      },
    ],
  };

  // Default lesson for topics without custom content
  return (
    lessons[topicId] || [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to This Topic!',
        content:
          "This is an interactive geometry lesson. You'll learn through short steps with visuals, interactions, and quick checks.",
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: 'Lesson Complete!',
        content:
          "Great work! You've completed this lesson. Head to Practice to try some problems!",
      },
    ]
  );
}
