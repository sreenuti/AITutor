/**
 * Interactive lesson content builder
 * Creates step-by-step lessons with interactive visuals
 */

import { ParallelLinesVisual } from '@/components/interactive/ParallelLinesVisual';
import { TriangleAngleVisual } from '@/components/interactive/TriangleAngleVisual';
import { AngleTypesVisual } from '@/components/interactive/AngleTypesVisual';
import { AnimatedExplainer } from '@/components/interactive/AnimatedExplainer';
import { PointsLinesVisual } from '@/components/interactive/PointsLinesVisual';
import { CongruenceVisual } from '@/components/interactive/CongruenceVisual';
import { PerimeterAreaVisual } from '@/components/interactive/PerimeterAreaVisual';

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
    'points-lines-planes': [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to Geometry Foundations!',
        content:
          "Everything in geometry starts with points, lines, and planes. These are the building blocks we'll use to understand all geometric shapes and concepts. Let's explore what makes each one special!",
      },
      {
        id: 'watch-1',
        type: 'watch',
        title: 'Watch: The Building Blocks',
        content:
          'Let\'s see a quick overview of points, lines, line segments, and rays. Each one is different and has its own special notation!',
        component: <AnimatedExplainer topicId="points-lines-planes" />,
      },
      {
        id: 'interact-1',
        type: 'interact',
        title: 'Try It: Explore Each Type',
        content:
          'Click the buttons to see points, lines, line segments, and rays. Notice how each one is drawn differently and uses different notation. A point is just a dot, a line extends forever in both directions (arrows on both ends), a segment has two endpoints, and a ray starts at one point and extends forever in one direction.',
        component: <PointsLinesVisual />,
      },
      {
        id: 'check-1',
        type: 'check',
        title: 'Quick Check: Lines vs Segments',
        content: 'Let\'s check your understanding!',
        question: {
          text: 'What is the difference between a line and a line segment?',
          type: 'multiple-choice',
          options: [
            'A line has endpoints, a segment does not',
            'A segment has endpoints, a line extends forever',
            'They are the same thing',
            'A line is shorter than a segment',
          ],
          correctAnswer: 'A segment has endpoints, a line extends forever',
          explanation:
            'Perfect! A line segment is part of a line between two endpoints, while a line extends infinitely in both directions with no endpoints.',
        },
      },
      {
        id: 'check-2',
        type: 'check',
        title: 'Quick Check: Rays',
        content: 'One more!',
        question: {
          text: 'A ray has one endpoint and extends infinitely in one direction.',
          type: 'true-false',
          correctAnswer: 'true',
          explanation:
            'Exactly right! A ray starts at one specific point (the endpoint) and then extends forever in one direction. Think of it like a laser beam!',
        },
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: 'Geometry Foundations Mastered! 🎉',
        content:
          'Great work! You now understand the basic building blocks of geometry: points (exact locations), lines (extend forever both ways), segments (parts of lines with two endpoints), and rays (start at one point, extend forever in one direction). These are the foundation for everything else in geometry!',
      },
    ],

    'congruence': [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to Congruence!',
        content:
          'Two shapes are congruent when they have exactly the same size and shape. They might be in different positions or orientations, but they\'re identical! In this lesson, you\'ll learn about the transformations that create congruent figures.',
      },
      {
        id: 'watch-1',
        type: 'watch',
        title: 'Watch: What is Congruence?',
        content:
          'Let\'s see how shapes can be moved in different ways while staying congruent. Translation, rotation, and reflection are called "rigid transformations" because they preserve the size and shape.',
        component: <AnimatedExplainer topicId="congruence" />,
      },
      {
        id: 'interact-1',
        type: 'interact',
        title: 'Try It: Rigid Transformations',
        content:
          'Click each transformation button to see how the blue triangle (△ABC) can be moved to create a congruent green triangle (△DEF). Notice that no matter which transformation you choose, the triangles remain exactly the same size and shape!',
        component: <CongruenceVisual />,
      },
      {
        id: 'check-1',
        type: 'check',
        title: 'Quick Check: Congruent Shapes',
        content: 'Let\'s test your understanding!',
        question: {
          text: 'If two triangles are congruent, they must have:',
          type: 'multiple-choice',
          options: [
            'The same angles only',
            'The same side lengths only',
            'Both the same angles and the same side lengths',
            'The same position and orientation',
          ],
          correctAnswer: 'Both the same angles and the same side lengths',
          explanation:
            'Perfect! Congruent triangles have both the same angles AND the same side lengths. They\'re identical in size and shape, even if they\'re positioned differently.',
        },
      },
      {
        id: 'interact-2',
        type: 'interact',
        title: 'Explore: Corresponding Parts',
        content:
          'Click "Show Corresponding Parts" to see how vertices match up between congruent triangles. Point A corresponds to point D, B to E, and C to F. This is important when proving triangles are congruent!',
        component: <CongruenceVisual />,
      },
      {
        id: 'check-2',
        type: 'check',
        title: 'Quick Check: Rigid Transformations',
        content: 'Final check!',
        question: {
          text: 'Which of these is NOT a rigid transformation?',
          type: 'multiple-choice',
          options: [
            'Translation (sliding)',
            'Rotation (turning)',
            'Reflection (flipping)',
            'Stretching (making bigger)',
          ],
          correctAnswer: 'Stretching (making bigger)',
          explanation:
            'Correct! Stretching changes the size of a shape, so it\'s not a rigid transformation. Only translations, rotations, and reflections preserve both size and shape.',
        },
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: 'Congruence Expert! 🎉',
        content:
          'Excellent work! You understand that congruent shapes have the same size and shape, and that rigid transformations (translations, rotations, and reflections) create congruent figures. These concepts are essential for proving geometric relationships!',
      },
    ],

    'perimeter-area': [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to Perimeter and Area!',
        content:
          'Perimeter and area measure different things: perimeter is the distance AROUND a shape (like walking the fence around a yard), while area is the space INSIDE a shape (like how much grass fills the yard). Let\'s explore both!',
      },
      {
        id: 'watch-1',
        type: 'watch',
        title: 'Watch: Perimeter vs Area',
        content:
          'Let\'s see the difference between perimeter and area with a quick visual tour. Remember: perimeter is measured in units (inches, feet, etc.), while area is measured in square units (square inches, square feet, etc.).',
        component: <AnimatedExplainer topicId="perimeter-area" />,
      },
      {
        id: 'interact-1',
        type: 'interact',
        title: 'Try It: Rectangle',
        content:
          'Let\'s start with a rectangle. Look at how perimeter is the distance around the outside (length + width + length + width), while area is length times width. The formula P = 2(l + w) adds up all four sides. The formula A = l × w counts all the unit squares inside.',
        component: <PerimeterAreaVisual />,
      },
      {
        id: 'check-1',
        type: 'check',
        title: 'Quick Check: Rectangle Area',
        content: 'Let\'s check your understanding!',
        question: {
          text: 'A rectangle has length 10 cm and width 6 cm. What is its area?',
          type: 'multiple-choice',
          options: ['16 cm', '32 cm', '60 cm²', '32 cm²'],
          correctAnswer: '60 cm²',
          explanation:
            'Perfect! Area = length × width = 10 × 6 = 60 square centimeters (cm²). Remember that area is always in square units!',
        },
      },
      {
        id: 'interact-2',
        type: 'interact',
        title: 'Explore: Different Shapes',
        content:
          'Now try the triangle and parallelogram buttons. Notice how each shape has its own formula. For triangles, A = ½bh (half of base times height). For parallelograms, A = bh (base times height). The perimeter is always the sum of all the side lengths!',
        component: <PerimeterAreaVisual />,
      },
      {
        id: 'check-2',
        type: 'check',
        title: 'Quick Check: Triangle Area',
        content: 'One more!',
        question: {
          text: 'A triangle has base 8 inches and height 5 inches. What is its area?',
          type: 'multiple-choice',
          options: ['40 in²', '20 in²', '13 in²', '16 in²'],
          correctAnswer: '20 in²',
          explanation:
            'Excellent! Triangle area = ½ × base × height = ½ × 8 × 5 = 20 square inches. The triangle formula uses "half" because a triangle is half of a rectangle!',
        },
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: 'Perimeter & Area Master! 🎉',
        content:
          'Outstanding work! You now know the difference between perimeter (distance around) and area (space inside), and you can use formulas for rectangles, triangles, and parallelograms. These skills are useful in real life for everything from painting rooms to building fences!',
      },
    ],

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
