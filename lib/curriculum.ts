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
  {
    id: 'points-lines-planes',
    title: 'Points, Lines, and Planes',
    week: 1,
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
    week: 1,
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
    week: 2,
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
    week: 2,
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
    week: 3,
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
    week: 3,
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
    week: 4,
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
    week: 4,
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
