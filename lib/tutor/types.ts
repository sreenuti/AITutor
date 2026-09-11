/**
 * Type definitions for the geometry tutor AI system
 */

export interface WorksheetAnalysis {
  topicIds: string[];
  mainTopic: string;
  problems: WorksheetProblem[];
  concepts: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedGradeLevel: number;
}

export interface WorksheetProblem {
  id: string;
  text: string;
  type: 'multiple-choice' | 'short-answer' | 'diagram' | 'calculation';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Explanation {
  topicId: string;
  title: string;
  introduction: string;
  keyPoints: string[];
  workedExample: {
    problem: string;
    steps: string[];
    answer: string;
    visual?: string; // SVG or description
  };
  checkUnderstanding: MicroQuestion[];
}

export interface MicroQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false';
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface PracticeProblem {
  id: string;
  problem: string;
  hint1: string;
  hint2: string;
  answer: string;
  explanation: string;
  visual?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'short-answer';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
  visual?: string;
}

export interface Quiz {
  id: string;
  topicId: string;
  title: string;
  questions: QuizQuestion[];
  totalPoints: number;
}
