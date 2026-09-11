/**
 * 8th Grade Geometry Curriculum Map
 * Based on Common Core / typical advanced 8th grade geometry
 */

export interface Topic {
  id: string;
  title: string;
  week: number;
  description: string;
  concepts: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const CURRICULUM: Topic[] = [
  // WEEKS 1-3: Sahasra's classroom unit (Logic & Reasoning + Postulates)
  {
    id: 'inductive-reasoning',
    title: 'Inductive Reasoning',
    week: 1,
    description: 'Making conjectures and finding patterns in sequences',
    concepts: [
      'Patterns and sequences',
      'Making conjectures from examples',
      'Counterexamples',
      'Testing and refining conjectures',
    ],
    difficulty: 'beginner',
  },
  {
    id: 'conditional-statements',
    title: 'Conditional Statements',
    week: 1,
    description: 'Understanding if-then statements in geometry',
    concepts: [
      'If-then form (p → q)',
      'Hypothesis and conclusion',
      'Rewriting statements as conditionals',
      'Truth values of conditionals',
    ],
    difficulty: 'beginner',
  },
  {
    id: 'related-conditionals',
    title: 'Related Conditionals',
    week: 2,
    description: 'Converse, inverse, contrapositive, and logical equivalence',
    concepts: [
      'Negation (~p)',
      'Converse (q → p)',
      'Inverse (~p → ~q)',
      'Contrapositive (~q → ~p)',
      'Logical equivalence',
    ],
    difficulty: 'intermediate',
  },
  {
    id: 'biconditionals',
    title: 'Biconditional Statements',
    week: 2,
    description: 'Understanding "if and only if" statements',
    concepts: [
      'If and only if (iff)',
      'Combining conditional and converse',
      'Writing biconditionals',
      'Truth conditions for biconditionals',
    ],
    difficulty: 'intermediate',
  },
  {
    id: 'deductive-reasoning',
    title: 'Deductive Reasoning',
    week: 3,
    description: 'Using logic to reach valid conclusions',
    concepts: [
      'Law of Detachment',
      'Law of Syllogism',
      'Valid vs. invalid reasoning',
      'Drawing logical conclusions',
    ],
    difficulty: 'intermediate',
  },
  {
    id: 'segment-angle-addition',
    title: 'Segment & Angle Addition Postulates',
    week: 3,
    description: 'Solving algebraic problems using geometric postulates',
    concepts: [
      'Segment Addition Postulate',
      'Angle Addition Postulate',
      'Solving for x algebraically',
      'Paired segment and angle problems',
    ],
    difficulty: 'intermediate',
  },
  
  // WEEKS 4+: Additional geometry topics
  {
    id: 'points-lines-planes',
    title: 'Points, Lines, and Planes',
    week: 4,
    description: 'Understanding basic geometric objects and notation',
    concepts: [
      'Points, lines, and planes',
      'Line segments and rays',
      'Collinear and coplanar points',
      'Geometric notation',
    ],
    difficulty: 'beginner',
  },
  {
    id: 'angles',
    title: 'Angles and Angle Relationships',
    week: 4,
    description: 'Types of angles and their measurements',
    concepts: [
      'Acute, obtuse, right angles',
      'Complementary and supplementary angles',
      'Vertical angles',
      'Adjacent angles',
      'Angle bisectors',
    ],
    difficulty: 'beginner',
  },
  {
    id: 'parallel-transversals',
    title: 'Parallel Lines and Transversals',
    week: 5,
    description: 'Angle relationships formed by parallel lines cut by a transversal',
    concepts: [
      'Corresponding angles',
      'Alternate interior angles',
      'Alternate exterior angles',
      'Consecutive interior angles',
      'Proving lines parallel',
    ],
    difficulty: 'intermediate',
  },
  {
    id: 'triangles-basics',
    title: 'Triangle Basics',
    week: 5,
    description: 'Classification and properties of triangles',
    concepts: [
      'Classifying by sides (scalene, isosceles, equilateral)',
      'Classifying by angles (acute, obtuse, right)',
      'Triangle angle sum theorem',
      'Exterior angle theorem',
    ],
    difficulty: 'beginner',
  },
  {
    id: 'congruence',
    title: 'Introduction to Congruence',
    week: 6,
    description: 'Understanding congruent figures and transformations',
    concepts: [
      'Congruent segments and angles',
      'Congruent triangles',
      'Rigid transformations',
      'Corresponding parts',
    ],
    difficulty: 'intermediate',
  },
  {
    id: 'perimeter-area',
    title: 'Perimeter and Area of Polygons',
    week: 6,
    description: 'Calculating perimeter and area of various shapes',
    concepts: [
      'Rectangles and squares',
      'Triangles',
      'Parallelograms',
      'Trapezoids',
      'Composite figures',
    ],
    difficulty: 'intermediate',
  },
  {
    id: 'pythagorean',
    title: 'Pythagorean Theorem',
    week: 7,
    description: 'Understanding and applying the Pythagorean theorem',
    concepts: [
      'Pythagorean theorem',
      'Finding missing side lengths',
      'Distance formula',
      'Real-world applications',
    ],
    difficulty: 'intermediate',
  },
  {
    id: 'coordinate-geometry',
    title: 'Coordinate Geometry',
    week: 7,
    description: 'Geometry on the coordinate plane',
    concepts: [
      'Distance on coordinate plane',
      'Midpoint formula',
      'Slope',
      'Graphing geometric figures',
    ],
    difficulty: 'intermediate',
  },
];

export const CATCH_UP_TOPICS = CURRICULUM.filter((t) => t.week <= 3);

export function getTopicById(id: string): Topic | undefined {
  return CURRICULUM.find((t) => t.id === id);
}

export function getTopicsByWeek(week: number): Topic[] {
  return CURRICULUM.filter((t) => t.week === week);
}
