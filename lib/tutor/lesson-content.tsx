/**
 * Interactive lesson content builder
 * Creates step-by-step lessons with interactive visuals
 */

import { ParallelLinesVisual } from '@/components/interactive/ParallelLinesVisual';
import { TriangleAngleVisual } from '@/components/interactive/TriangleAngleVisual';
import { AngleTypesVisual } from '@/components/interactive/AngleTypesVisual';
import { AnimatedExplainer } from '@/components/interactive/AnimatedExplainer';
import { SegmentAdditionVisual } from '@/components/interactive/SegmentAdditionVisual';
import { AngleAdditionVisual } from '@/components/interactive/AngleAdditionVisual';
import { InductivePatternVisual } from '@/components/interactive/InductivePatternVisual';
import { ConditionalStatementVisual } from '@/components/interactive/ConditionalStatementVisual';
import { DeductiveReasoningVisual } from '@/components/interactive/DeductiveReasoningVisual';
import { PointsLinesVisual } from '@/components/interactive/PointsLinesVisual';
import { CongruenceVisual } from '@/components/interactive/CongruenceVisual';
import { PerimeterAreaVisual } from '@/components/interactive/PerimeterAreaVisual';
import { PythagoreanVisual } from '@/components/interactive/PythagoreanVisual';
import { CoordinateGeometryVisual } from '@/components/interactive/CoordinateGeometryVisual';

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
    'inductive-reasoning': [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to Inductive Reasoning!',
        content:
          "Inductive reasoning is how you discover patterns and make conjectures. It's like being a math detective - you look at examples and figure out the rule!",
      },
      {
        id: 'interact-1',
        type: 'interact',
        title: 'Watch: Visual Patterns',
        content:
          "Let's explore visual patterns! Switch between different pattern types and watch how they grow. Can you predict the next figure?",
        component: <InductivePatternVisual />,
      },
      {
        id: 'check-1',
        type: 'check',
        title: 'Example: Find the Pattern',
        content: "Let's look at this sequence: 3, 6, 9, 12, 15, ... What's the pattern?",
        question: {
          text: 'The pattern is:',
          type: 'multiple-choice',
          options: ['Add 3 each time', 'Multiply by 2 each time', 'Add 6 each time', 'Square the position'],
          correctAnswer: 'Add 3 each time',
          explanation:
            'Correct! Each number increases by 3. This is the CONJECTURE we make from observing the pattern: "Each term is 3 more than the previous term."',
        },
      },
      {
        id: 'check-2',
        type: 'check',
        title: 'What About Counterexamples?',
        content: 'A counterexample DISPROVES a conjecture. Conjecture: "All prime numbers are odd." Is this true?',
        question: {
          text: 'Is the conjecture "All prime numbers are odd" true?',
          type: 'true-false',
          correctAnswer: 'false',
          explanation:
            'False! The number 2 is prime AND even, so it\'s a COUNTEREXAMPLE. Just ONE counterexample proves the conjecture wrong!',
        },
      },
      {
        id: 'check-3',
        type: 'check',
        title: 'Try Another Pattern',
        content: 'Sequence: 1, 4, 9, 16, 25, ... What are these numbers?',
        question: {
          text: 'The pattern is:',
          type: 'multiple-choice',
          options: ['Perfect squares (1², 2², 3², ...)', 'Add 3, then 5, then 7, ...', 'Double and subtract 2', 'Both A and B'],
          correctAnswer: 'Both A and B',
          explanation:
            'Both are correct! You can describe the pattern as "perfect squares" OR as "differences increase by 2." Multiple conjectures can describe the same pattern!',
        },
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: 'Pattern Detective! 🔍',
        content:
          "You're now skilled at inductive reasoning! Remember: make conjectures from examples, but always test them. One counterexample proves a conjecture false!",
      },
    ],

    'conditional-statements': [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to Conditional Statements!',
        content:
          'Conditional statements are "if-then" statements used everywhere in geometry. Understanding their structure helps you write proofs and logical arguments!',
      },
      {
        id: 'interact-1',
        type: 'interact',
        title: 'Explore: Conditional Statements with Geometry',
        content:
          'See how conditional statements work with actual geometric figures. Switch between examples to see the hypothesis (IF part) and conclusion (THEN part).',
        component: <ConditionalStatementVisual />,
      },
      {
        id: 'check-1',
        type: 'check',
        title: 'Identify the Parts',
        content: 'Statement: "If an angle is right, then it measures 90°." What\'s the hypothesis?',
        question: {
          text: 'The hypothesis (the "if" part) is:',
          type: 'multiple-choice',
          options: ['An angle is right', 'It measures 90°', 'Right angle', 'The entire statement'],
          correctAnswer: 'An angle is right',
          explanation:
            'Correct! The hypothesis is the "if" part - the condition. The conclusion is the "then" part - what follows.',
        },
      },
      {
        id: 'check-2',
        type: 'check',
        title: 'What\'s the Conclusion?',
        content: 'Same statement: "If an angle is right, then it measures 90°."',
        question: {
          text: 'The conclusion (the "then" part) is:',
          type: 'multiple-choice',
          options: ['An angle is right', 'It measures 90°', 'Right angle measures 90°', 'If an angle'],
          correctAnswer: 'It measures 90°',
          explanation:
            'Perfect! The conclusion is what RESULTS from the hypothesis. Form: If [hypothesis], then [conclusion].',
        },
      },
      {
        id: 'check-3',
        type: 'check',
        title: 'Rewrite as Conditional',
        content: 'Rewrite: "All birds have feathers." → "If _____, then _____."',
        question: {
          text: 'The conditional form is:',
          type: 'multiple-choice',
          options: [
            'If it is a bird, then it has feathers',
            'If it has feathers, then it is a bird',
            'If birds, then feathers',
            'If feathers exist, then birds exist',
          ],
          correctAnswer: 'If it is a bird, then it has feathers',
          explanation:
            'Exactly! "All [X] are [Y]" becomes "If [X], then [Y]." This is a key skill for geometry proofs!',
        },
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: 'Conditional Master! ✅',
        content:
          "You've mastered conditional statements! Hypothesis = if part, Conclusion = then part. You're ready for more complex logic!",
      },
    ],

    'related-conditionals': [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to Related Conditionals!',
        content:
          "Every conditional has three related forms: converse, inverse, and contrapositive. Understanding how they're different (and which are equivalent!) is crucial.",
      },
      {
        id: 'check-1',
        type: 'check',
        title: 'The Converse',
        content: 'Original: "If p, then q." The converse SWITCHES the parts.',
        question: {
          text: 'The converse is:',
          type: 'multiple-choice',
          options: ['If q, then p', 'If NOT p, then NOT q', 'If NOT q, then NOT p', 'If p, then NOT q'],
          correctAnswer: 'If q, then p',
          explanation:
            'Correct! The converse just swaps hypothesis and conclusion. CAREFUL: the converse isn\'t always true even if the original is!',
        },
      },
      {
        id: 'check-2',
        type: 'check',
        title: 'The Inverse',
        content: 'Original: "If p, then q." The inverse NEGATES both parts.',
        question: {
          text: 'The inverse is:',
          type: 'multiple-choice',
          options: ['If q, then p', 'If NOT p, then NOT q', 'If NOT q, then NOT p', 'NOT if p, then NOT q'],
          correctAnswer: 'If NOT p, then NOT q',
          explanation:
            'Right! The inverse negates both hypothesis and conclusion. Like the converse, it\'s not automatically true.',
        },
      },
      {
        id: 'check-3',
        type: 'check',
        title: 'The Contrapositive',
        content: 'Original: "If p, then q." The contrapositive SWITCHES and NEGATES.',
        question: {
          text: 'The contrapositive is:',
          type: 'multiple-choice',
          options: ['If q, then p', 'If NOT p, then NOT q', 'If NOT q, then NOT p', 'If p, then NOT q'],
          correctAnswer: 'If NOT q, then NOT p',
          explanation:
            'Perfect! The contrapositive is the most important - it\'s ALWAYS logically equivalent to the original. If one is true, both are!',
        },
      },
      {
        id: 'check-4',
        type: 'check',
        title: 'Logical Equivalence',
        content: 'Which pairs are ALWAYS logically equivalent?',
        question: {
          text: 'Choose the equivalent pair:',
          type: 'multiple-choice',
          options: [
            'Conditional and contrapositive',
            'Conditional and converse',
            'Converse and inverse',
            'Both A and C',
          ],
          correctAnswer: 'Both A and C',
          explanation:
            'Excellent! Conditional ≡ Contrapositive, and Converse ≡ Inverse. This is a key fact for proofs!',
        },
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: 'Logic Expert! 🧠',
        content:
          "You've mastered related conditionals! Remember: contrapositive is equivalent to the original. Converse and inverse are equivalent to EACH OTHER.",
      },
    ],

    'biconditionals': [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to Biconditional Statements!',
        content:
          'A biconditional combines a conditional and its converse using "if and only if" (iff). It means BOTH directions are true!',
      },
      {
        id: 'check-1',
        type: 'check',
        title: 'Understanding "Iff"',
        content: '"x = 3 if and only if 2x = 6" means BOTH "if x = 3, then 2x = 6" AND "if 2x = 6, then x = 3."',
        question: {
          text: 'A biconditional is true only when:',
          type: 'multiple-choice',
          options: [
            'The conditional is true',
            'The converse is true',
            'BOTH conditional and converse are true',
            'Either conditional or converse is true',
          ],
          correctAnswer: 'BOTH conditional and converse are true',
          explanation:
            'Exactly! A biconditional works BOTH WAYS. Both the original conditional and its converse must be true.',
        },
      },
      {
        id: 'check-2',
        type: 'check',
        title: 'Which Can Be Biconditional?',
        content: 'Can this be a biconditional? "An angle is right if and only if it measures 90°."',
        question: {
          text: 'Is this a valid biconditional?',
          type: 'true-false',
          correctAnswer: 'true',
          explanation:
            'Yes! Both directions work: (1) If right, then 90°, and (2) If 90°, then right. Perfect biconditional!',
        },
      },
      {
        id: 'check-3',
        type: 'check',
        title: 'Identifying Parts',
        content: '"Two angles are congruent iff they have equal measures." What are p and q?',
        question: {
          text: 'The form "p iff q" has:',
          type: 'multiple-choice',
          options: [
            'p = angles congruent, q = equal measures',
            'p = two angles, q = congruent',
            'p = equal, q = measures',
            'p = measures, q = angles',
          ],
          correctAnswer: 'p = angles congruent, q = equal measures',
          explanation:
            'Perfect! "p iff q" means "p if and only if q." Here, p and q can be swapped and the statement stays true.',
        },
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: 'Biconditional Pro! ↔️',
        content:
          "You've mastered biconditionals! Remember: 'iff' means BOTH directions work. It's the strongest form of logical connection!",
      },
    ],

    'deductive-reasoning': [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to Deductive Reasoning!',
        content:
          "Deductive reasoning uses facts and logic to reach CERTAIN conclusions. You'll learn two powerful laws: Detachment and Syllogism!",
      },
      {
        id: 'interact-1',
        type: 'interact',
        title: 'Explore: Deductive Reasoning with Angles',
        content:
          'See how deductive reasoning works with real geometry problems. Switch between Law of Detachment, Law of Syllogism, and common mistakes!',
        component: <DeductiveReasoningVisual />,
      },
      {
        id: 'check-1',
        type: 'check',
        title: 'Law of Detachment',
        content: 'Given: (1) "If it rains, then the ground is wet." (2) "It is raining." What can you conclude?',
        question: {
          text: 'The valid conclusion is:',
          type: 'multiple-choice',
          options: ['The ground is wet', 'It is not raining', 'The ground is dry', 'No valid conclusion'],
          correctAnswer: 'The ground is wet',
          explanation:
            'Correct! Law of Detachment: If "p → q" is true AND p is true, then q MUST be true. Simple but powerful!',
        },
      },
      {
        id: 'check-2',
        type: 'check',
        title: 'Invalid Detachment',
        content: 'Given: (1) "If it rains, then the ground is wet." (2) "The ground is wet." Can you conclude it rained?',
        question: {
          text: 'Can you conclude "It rained"?',
          type: 'true-false',
          correctAnswer: 'false',
          explanation:
            'NO! The ground could be wet for other reasons (sprinkler, dew, etc.). You need the HYPOTHESIS (p) to be true, not the conclusion (q).',
        },
      },
      {
        id: 'check-3',
        type: 'check',
        title: 'Law of Syllogism',
        content: 'Given: (1) "If A, then B." (2) "If B, then C." What follows?',
        question: {
          text: 'The valid conclusion is:',
          type: 'multiple-choice',
          options: ['If A, then C', 'If C, then A', 'If B, then A', 'No valid conclusion'],
          correctAnswer: 'If A, then C',
          explanation:
            'Perfect! Law of Syllogism chains conditionals: If p→q and q→r are both true, then p→r is true. It connects the chain!',
        },
      },
      {
        id: 'check-4',
        type: 'check',
        title: 'Real Geometry Example',
        content: 'Given: (1) "If ∠A is obtuse, then m∠A > 90°." (2) "m∠A = 115°." Conclusion?',
        question: {
          text: 'The valid conclusion is:',
          type: 'multiple-choice',
          options: ['∠A is obtuse', 'No valid conclusion', '∠A is acute', 'Cannot determine'],
          correctAnswer: 'No valid conclusion',
          explanation:
            'CAREFUL! We know m∠A > 90°, but the conditional is "If obtuse, then >90°," not the reverse. We can\'t use detachment here. (Though we could if we used the contrapositive!)',
        },
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: 'Deductive Reasoning Master! 🎯',
        content:
          "You've mastered deductive reasoning! Detachment: p→q + p = q. Syllogism: p→q + q→r = p→r. Use these in proofs!",
      },
    ],

    'segment-angle-addition': [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to Addition Postulates!',
        content:
          "These postulates let you solve for unknown lengths and angles using algebra. The segment and angle problems often pair up with the SAME answer!",
      },
      {
        id: 'interact-1',
        type: 'interact',
        title: 'Explore: Segment Addition',
        content:
          'See how the Segment Addition Postulate works! Drag the slider to change x and watch the segments adjust. When does the equation balance?',
        component: <SegmentAdditionVisual partA="10" partB="2x - 12" whole="x + 10" showLabels={true} interactive={true} />,
      },
      {
        id: 'interact-2',
        type: 'interact',
        title: 'Explore: Angle Addition',
        content:
          'Now try the Angle Addition Postulate! Notice how it follows the same pattern as segments - part + part = whole.',
        component: <AngleAdditionVisual angle1="14x + 2" angle2="8x + 14" whole="60" showLabels={true} interactive={true} />,
      },
      {
        id: 'check-1',
        type: 'check',
        title: 'Segment Addition Postulate',
        content: 'If B is between A and C, then AB + BC = AC. Example: AB = 5, AC = 12. Find BC.',
        question: {
          text: 'BC = ?',
          type: 'multiple-choice',
          options: ['5', '7', '12', '17'],
          correctAnswer: '7',
          explanation:
            'Correct! Set up the equation: 5 + BC = 12. Solve: BC = 12 - 5 = 7. Simple algebra!',
        },
      },
      {
        id: 'check-2',
        type: 'check',
        title: 'With Variables',
        content: 'Points on a line: IH = 10, HG = 2x - 12, IG = x + 10. Solve for x.',
        question: {
          text: 'x = ?',
          type: 'multiple-choice',
          options: ['12', '22', '10', '32'],
          correctAnswer: '12',
          explanation:
            'Right! IH + HG = IG → 10 + (2x - 12) = x + 10 → 2x - 2 = x + 10 → x = 12. Keep like terms organized!',
        },
      },
      {
        id: 'check-3',
        type: 'check',
        title: 'Angle Addition Postulate',
        content: 'If ray ST is between rays SR and SC, then m∠RST + m∠TSC = m∠RSC.',
        question: {
          text: 'If m∠RST = 14x + 2, m∠CST = 8x + 14, and m∠RSC = 60°, what is x?',
          type: 'multiple-choice',
          options: ['2', '12', '4', '60'],
          correctAnswer: '2',
          explanation:
            'Perfect! (14x + 2) + (8x + 14) = 60 → 22x + 16 = 60 → 22x = 44 → x = 2. Notice the pattern!',
        },
      },
      {
        id: 'check-4',
        type: 'check',
        title: 'The Pattern',
        content: 'On worksheets, segment and angle problems with the same setup often have THE SAME value of x!',
        question: {
          text: 'Why do paired problems have the same x?',
          type: 'multiple-choice',
          options: [
            'The postulates have the same structure',
            'Pure coincidence',
            'Teacher trick',
            'Only sometimes',
          ],
          correctAnswer: 'The postulates have the same structure',
          explanation:
            'Exactly! Both postulates use addition (part + part = whole), so similar algebraic expressions yield the same x. Clever design!',
        },
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: 'Addition Postulate Expert! 📐',
        content:
          "You've mastered both postulates! Set up the equation, substitute, combine like terms, solve for x. Watch for paired problems!",
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

    'points-lines-planes': [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to Points, Lines, and Planes!',
        content:
          "These are the building blocks of geometry! You'll learn the basic geometric objects and how to name them correctly.",
      },
      {
        id: 'interact-1',
        type: 'interact',
        title: 'Explore: Geometric Objects',
        content:
          'Click through each type to see how points, lines, segments, rays, and planes are drawn and named.',
        component: <PointsLinesVisual />,
      },
      {
        id: 'check-1',
        type: 'check',
        title: 'Quick Check: Naming',
        content: 'A line segment has two endpoints.',
        question: {
          text: 'Is this statement true?',
          type: 'true-false',
          correctAnswer: 'true',
          explanation:
            'True! A segment is part of a line with two endpoints, like AB̅.',
        },
      },
      {
        id: 'check-2',
        type: 'check',
        title: 'Quick Check: Notation',
        content: 'How do we name a ray?',
        question: {
          text: 'When naming a ray, you must:',
          type: 'multiple-choice',
          options: ['Start with the endpoint', 'Start with any point', 'Use lowercase letters', 'Use three points'],
          correctAnswer: 'Start with the endpoint',
          explanation:
            'Correct! A ray is named starting with its endpoint. Ray AB⃗ starts at A and goes through B.',
        },
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: 'Geometry Basics Mastered! 📐',
        content:
          "You now understand points, lines, segments, rays, and planes - the foundation of all geometry!",
      },
    ],

    'congruence': [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to Congruence!',
        content:
          "Congruent figures have the same size and shape. This is one of the most important concepts in geometry!",
      },
      {
        id: 'interact-1',
        type: 'interact',
        title: 'Explore: Congruent Triangles',
        content:
          'Look at these two triangles. Click "Show Congruence Marks" to see how we indicate equal sides and angles.',
        component: <CongruenceVisual />,
      },
      {
        id: 'check-1',
        type: 'check',
        title: 'Quick Check: Definition',
        content: 'What does congruent mean?',
        question: {
          text: 'Two figures are congruent if they have:',
          type: 'multiple-choice',
          options: ['Same size only', 'Same shape only', 'Same size AND shape', 'Different sizes'],
          correctAnswer: 'Same size AND shape',
          explanation:
            'Perfect! Congruent means exactly the same size AND shape. Symbol: ≅',
        },
      },
      {
        id: 'check-2',
        type: 'check',
        title: 'Quick Check: Notation',
        content: 'If △ABC ≅ △DEF, what does that tell us?',
        question: {
          text: 'Which is TRUE?',
          type: 'multiple-choice',
          options: ['AB = DE', 'Only angles are equal', 'Only sides are equal', 'Triangles are similar but not congruent'],
          correctAnswer: 'AB = DE',
          explanation:
            'Yes! When triangles are congruent with that notation, corresponding parts match: AB = DE, BC = EF, AC = DF, and all angles are equal.',
        },
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: 'Congruence Expert! ≅',
        content:
          "You understand congruence! Remember: congruent figures have ALL corresponding parts equal.",
      },
    ],

    'perimeter-area': [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to Perimeter and Area!',
        content:
          "Perimeter is the distance around a shape. Area is the space inside. You'll learn formulas for common shapes!",
      },
      {
        id: 'interact-1',
        type: 'interact',
        title: 'Explore: Rectangles and Triangles',
        content:
          'Adjust the dimensions and click "Show Calculations" to see the formulas in action!',
        component: <PerimeterAreaVisual />,
      },
      {
        id: 'check-1',
        type: 'check',
        title: 'Quick Check: Rectangle',
        content: 'A rectangle has width 4 and height 3. What is its area?',
        question: {
          text: 'Area = ?',
          type: 'multiple-choice',
          options: ['7', '12', '14', '24'],
          correctAnswer: '12',
          explanation:
            'Correct! Area of rectangle = width × height = 4 × 3 = 12 square units.',
        },
      },
      {
        id: 'check-2',
        type: 'check',
        title: 'Quick Check: Triangle',
        content: 'A triangle has base 6 and height 4. What is its area?',
        question: {
          text: 'Area = ?',
          type: 'multiple-choice',
          options: ['10', '12', '20', '24'],
          correctAnswer: '12',
          explanation:
            'Perfect! Area of triangle = ½ × base × height = ½ × 6 × 4 = 12 square units.',
        },
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: 'Area & Perimeter Pro! 📏',
        content:
          "You've mastered perimeter and area formulas! Remember: perimeter adds sides, area multiplies dimensions.",
      },
    ],

    'pythagorean': [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to the Pythagorean Theorem!',
        content:
          "One of the most famous theorems in math! It relates the three sides of a right triangle: a² + b² = c²",
      },
      {
        id: 'interact-1',
        type: 'interact',
        title: 'Explore: The Theorem',
        content:
          'Adjust the legs (a and b) and watch the hypotenuse (c) change. Click "Show Verification" to see the math!',
        component: <PythagoreanVisual />,
      },
      {
        id: 'check-1',
        type: 'check',
        title: 'Quick Check: Formula',
        content: 'In a right triangle with legs 3 and 4, what is the hypotenuse?',
        question: {
          text: 'c = ?',
          type: 'multiple-choice',
          options: ['5', '6', '7', '12'],
          correctAnswer: '5',
          explanation:
            'Correct! Using a² + b² = c²: 3² + 4² = 9 + 16 = 25, so c = √25 = 5. This is the famous 3-4-5 triangle!',
        },
      },
      {
        id: 'check-2',
        type: 'check',
        title: 'Quick Check: Application',
        content: 'A right triangle has legs 6 and 8. Find c.',
        question: {
          text: 'c = ?',
          type: 'multiple-choice',
          options: ['10', '12', '14', '48'],
          correctAnswer: '10',
          explanation:
            'Perfect! 6² + 8² = 36 + 64 = 100, so c = √100 = 10. Notice this is double the 3-4-5 triangle!',
        },
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: 'Pythagorean Master! ⚡',
        content:
          "You've mastered the Pythagorean Theorem! Use it to find any side of a right triangle when you know the other two.",
      },
    ],

    'coordinate-geometry': [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Welcome to Coordinate Geometry!',
        content:
          "Combine geometry and algebra! You'll learn to find distances and midpoints on the coordinate plane.",
      },
      {
        id: 'interact-1',
        type: 'interact',
        title: 'Explore: Distance and Midpoint',
        content:
          'Move the points A and B around the plane. Click "Show Calculations" to see the distance and midpoint formulas!',
        component: <CoordinateGeometryVisual />,
      },
      {
        id: 'check-1',
        type: 'check',
        title: 'Quick Check: Distance',
        content: 'Points A(0, 0) and B(3, 4) are on a plane. What is the distance AB?',
        question: {
          text: 'Distance = ?',
          type: 'multiple-choice',
          options: ['5', '7', '12', '25'],
          correctAnswer: '5',
          explanation:
            'Correct! Using d = √[(x₂-x₁)² + (y₂-y₁)²] = √[3² + 4²] = √[9 + 16] = √25 = 5. Notice this is the Pythagorean Theorem!',
        },
      },
      {
        id: 'check-2',
        type: 'check',
        title: 'Quick Check: Midpoint',
        content: 'The midpoint of A(2, 4) and B(6, 8) is:',
        question: {
          text: 'Midpoint = ?',
          type: 'multiple-choice',
          options: ['(4, 6)', '(8, 12)', '(3, 5)', '(4, 4)'],
          correctAnswer: '(4, 6)',
          explanation:
            'Perfect! Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2) = ((2+6)/2, (4+8)/2) = (4, 6). Average the coordinates!',
        },
      },
      {
        id: 'summary-1',
        type: 'summary',
        title: 'Coordinate Geometry Expert! 📍',
        content:
          "You've mastered coordinate geometry! Distance formula and midpoint formula are now in your toolkit.",
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
