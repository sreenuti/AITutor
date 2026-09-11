/**
 * Local-first geometry knowledge base
 * Deterministic answers for common questions - ZERO API cost
 */

export interface KnowledgeEntry {
  topicId?: string; // If topic-specific, otherwise global
  patterns: string[]; // Regex-friendly patterns
  answer: string;
  followUp?: string;
}

export const GEOMETRY_KB: KnowledgeEntry[] = [
  // General geometry
  {
    patterns: ['what is geometry', 'what does geometry mean', 'define geometry'],
    answer: "Geometry is the study of shapes, sizes, angles, and spatial relationships. In 8th grade, we focus on understanding properties of angles, lines, triangles, and other polygons!",
  },
  {
    patterns: ['why do i need.*geometry', 'why learn geometry', 'when will i use'],
    answer: "Geometry is everywhere! Architecture, design, engineering, art, video games, and even sports use geometry. Understanding shapes and angles helps you solve real-world problems.",
  },
  
  // Angles
  {
    topicId: 'angles',
    patterns: ['what is.*angle', 'define angle', 'what does angle mean'],
    answer: "An angle is formed when two rays meet at a point called the vertex. We measure angles in degrees (°). The amount of rotation between the two rays determines the angle size.",
  },
  {
    topicId: 'angles',
    patterns: ['acute.*angle', 'what is acute'],
    answer: "An acute angle is less than 90°. Think of it as a 'sharp' angle - like the angle at the tip of a slice of pizza!",
  },
  {
    topicId: 'angles',
    patterns: ['right.*angle', 'what is.*right angle', '90 degree'],
    answer: "A right angle is exactly 90°. It forms a perfect corner, like the corner of a book or the corner of your screen. We mark it with a small square.",
  },
  {
    topicId: 'angles',
    patterns: ['obtuse.*angle', 'what is obtuse'],
    answer: "An obtuse angle is greater than 90° but less than 180°. It's 'wider' than a right angle - think of an open laptop screen.",
  },
  {
    topicId: 'angles',
    patterns: ['straight.*angle', '180 degree', 'straight line'],
    answer: "A straight angle is exactly 180° - it forms a straight line! The two rays point in opposite directions.",
  },
  {
    topicId: 'angles',
    patterns: ['complementary.*angles?', 'what.*complementary'],
    answer: "Complementary angles are two angles that add up to 90°. For example, 30° and 60° are complementary because 30 + 60 = 90.",
  },
  {
    topicId: 'angles',
    patterns: ['supplementary.*angles?', 'what.*supplementary'],
    answer: "Supplementary angles are two angles that add up to 180°. For example, 110° and 70° are supplementary because 110 + 70 = 180.",
  },
  
  // Parallel lines & transversals
  {
    topicId: 'parallel-transversals',
    patterns: ['parallel.*lines?', 'what.*parallel', 'define parallel'],
    answer: "Parallel lines are lines that never meet, no matter how far you extend them. They stay the same distance apart forever. Think of railroad tracks!",
  },
  {
    topicId: 'parallel-transversals',
    patterns: ['transversal', 'what is.*transversal'],
    answer: "A transversal is a line that crosses two or more other lines. When it crosses parallel lines, it creates special angle relationships!",
  },
  {
    topicId: 'parallel-transversals',
    patterns: ['corresponding.*angles?', 'what.*corresponding'],
    answer: "Corresponding angles are in the same position at each intersection. When lines are parallel, corresponding angles are always equal. Try the interactive diagram to see this!",
  },
  {
    topicId: 'parallel-transversals',
    patterns: ['alternate interior', 'what.*alternate interior'],
    answer: "Alternate interior angles are on opposite sides of the transversal, between the parallel lines. They're always equal when the lines are parallel!",
  },
  {
    topicId: 'parallel-transversals',
    patterns: ['alternate exterior', 'what.*alternate exterior'],
    answer: "Alternate exterior angles are on opposite sides of the transversal, outside the parallel lines. Like alternate interior angles, they're equal!",
  },
  {
    topicId: 'parallel-transversals',
    patterns: ['consecutive interior', 'same.?side interior', 'co.?interior'],
    answer: "Consecutive interior angles (also called same-side interior angles) are on the same side of the transversal, between the parallel lines. They're supplementary - they add up to 180°!",
  },
  
  // Triangles
  {
    topicId: 'triangles-basics',
    patterns: ['triangle.*angles?', 'angles.*triangle', 'angle sum'],
    answer: "The angles in any triangle always add up to exactly 180°! This works for every triangle - no matter what shape it is. Try the interactive diagram to prove it to yourself!",
  },
  {
    topicId: 'triangles-basics',
    patterns: ['why.*180', 'prove.*180', 'why.*angle.*sum'],
    answer: "Here's why: if you cut off all three corners of a triangle and put them together, they form a straight line (180°). The interactive visual shows this beautifully!",
  },
  {
    topicId: 'triangles-basics',
    patterns: ['equilateral.*triangle', 'what.*equilateral'],
    answer: "An equilateral triangle has all three sides equal AND all three angles equal (each is 60°). It's the most balanced triangle!",
  },
  {
    topicId: 'triangles-basics',
    patterns: ['isosceles.*triangle', 'what.*isosceles'],
    answer: "An isosceles triangle has two equal sides and two equal angles (the angles opposite the equal sides). Think of it as a triangle with matching sides!",
  },
  {
    topicId: 'triangles-basics',
    patterns: ['scalene.*triangle', 'what.*scalene'],
    answer: "A scalene triangle has all different side lengths and all different angles. No sides or angles match!",
  },
  {
    topicId: 'triangles-basics',
    patterns: ['exterior.*angle.*theorem', 'exterior angle'],
    answer: "The exterior angle of a triangle equals the sum of the two non-adjacent interior angles. It's a super useful shortcut for finding missing angles!",
  },
  
  // Study tips
  {
    patterns: ['how to study', 'study tips', 'how.*remember', 'memorize'],
    answer: "Great question! Try these tips: 1) Use the interactive diagrams - they help you SEE the concepts. 2) Practice a little each day. 3) Teach the concept to someone else. 4) Draw your own diagrams. You've got this!",
  },
  {
    patterns: ['stuck', 'don.*understand', 'confused', 'hard', 'difficult'],
    answer: "It's totally normal to feel stuck sometimes! Try: 1) Go back to the Explain tab and use the interactive visuals. 2) Work through practice problems with hints. 3) Take a short break and come back. Geometry takes practice - you're doing great by asking for help!",
  },
  {
    patterns: ['homework help', 'help.*homework', 'solve.*problem'],
    answer: "I can help you understand the concepts! Try uploading your worksheet, or tell me which topic you're working on. I'll guide you through the steps rather than just giving you the answer - that way you'll really learn it!",
  },
  
  // Encouragement
  {
    patterns: ['thank', 'thanks', 'appreciate'],
    answer: "You're very welcome! Keep up the great work! 🌟",
  },
  {
    patterns: ['hello', 'hi', 'hey'],
    answer: "Hi there! I'm here to help you with geometry. What would you like to learn about today?",
  },
];

/**
 * Match question against knowledge base
 * Returns answer if found, null otherwise
 */
export function findKBAnswer(
  question: string,
  currentTopicId?: string
): { answer: string; source: 'local-kb' } | null {
  const q = question.toLowerCase().trim();
  
  // Try topic-specific matches first
  if (currentTopicId) {
    for (const entry of GEOMETRY_KB) {
      if (entry.topicId === currentTopicId) {
        for (const pattern of entry.patterns) {
          const regex = new RegExp(pattern, 'i');
          if (regex.test(q)) {
            return { answer: entry.answer, source: 'local-kb' };
          }
        }
      }
    }
  }
  
  // Try global matches
  for (const entry of GEOMETRY_KB) {
    if (!entry.topicId) {
      for (const pattern of entry.patterns) {
        const regex = new RegExp(pattern, 'i');
        if (regex.test(q)) {
          return { answer: entry.answer, source: 'local-kb' };
        }
      }
    }
  }
  
  return null;
}

/**
 * Normalize question for caching
 */
export function normalizeQuestion(question: string): string {
  return question
    .toLowerCase()
    .trim()
    .replace(/[?!.,'";:]/g, '')
    .replace(/\s+/g, ' ');
}

/**
 * Generate cache key for question + topic
 */
export function getCacheKey(question: string, topicId?: string): string {
  const normalized = normalizeQuestion(question);
  return `chat-cache:${topicId || 'general'}:${normalized}`;
}
