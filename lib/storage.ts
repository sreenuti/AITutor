/**
 * Local storage wrapper for student progress tracking
 */

export interface QuizResult {
  quizId: string;
  topicId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  answers: {
    questionId: string;
    correct: boolean;
    studentAnswer?: string;
  }[];
}

export interface PracticeSession {
  sessionId: string;
  topicId: string;
  completedAt: string;
  problemsAttempted: number;
  problemsCorrect: number;
}

export interface WorksheetSession {
  sessionId: string;
  topicIds: string[];
  uploadedAt: string;
  fileName: string;
  analyzed: boolean;
}

export interface TopicProgress {
  topicId: string;
  mastery: 'not-started' | 'learning' | 'practicing' | 'mastered' | 'needs-review';
  lastPracticed?: string;
  quizzesTaken: number;
  averageScore: number;
}

export interface StudentProfile {
  name: string;
  currentTopicId?: string;
  worksheets: WorksheetSession[];
  quizResults: QuizResult[];
  practiceSessions: PracticeSession[];
  topicProgress: Record<string, TopicProgress>;
}

const STORAGE_KEY = 'sahasra-geometry-tutor';

function getStorage(): StudentProfile {
  if (typeof window === 'undefined') {
    return getDefaultProfile();
  }
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return getDefaultProfile();
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return getDefaultProfile();
  }
}

function saveStorage(profile: StudentProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function getDefaultProfile(): StudentProfile {
  return {
    name: 'Sahasra',
    worksheets: [],
    quizResults: [],
    practiceSessions: [],
    topicProgress: {},
  };
}

export function getProfile(): StudentProfile {
  return getStorage();
}

export function updateProfile(updates: Partial<StudentProfile>): StudentProfile {
  const profile = getStorage();
  const updated = { ...profile, ...updates };
  saveStorage(updated);
  return updated;
}

export function addWorksheet(worksheet: WorksheetSession): void {
  const profile = getStorage();
  profile.worksheets.push(worksheet);
  saveStorage(profile);
}

export function addQuizResult(result: QuizResult): void {
  const profile = getStorage();
  profile.quizResults.push(result);
  
  // Update topic progress
  const topicProgress = profile.topicProgress[result.topicId] || {
    topicId: result.topicId,
    mastery: 'not-started',
    quizzesTaken: 0,
    averageScore: 0,
  };
  
  const allQuizzes = profile.quizResults.filter((q) => q.topicId === result.topicId);
  const avgScore = allQuizzes.reduce((sum, q) => sum + (q.score / q.totalQuestions), 0) / allQuizzes.length;
  
  topicProgress.quizzesTaken = allQuizzes.length;
  topicProgress.averageScore = avgScore;
  topicProgress.lastPracticed = result.completedAt;
  
  // Update mastery level
  if (avgScore >= 0.9 && topicProgress.quizzesTaken >= 2) {
    topicProgress.mastery = 'mastered';
  } else if (avgScore >= 0.7) {
    topicProgress.mastery = 'practicing';
  } else if (avgScore < 0.5 && topicProgress.quizzesTaken >= 1) {
    topicProgress.mastery = 'needs-review';
  } else {
    topicProgress.mastery = 'learning';
  }
  
  profile.topicProgress[result.topicId] = topicProgress;
  saveStorage(profile);
}

export function addPracticeSession(session: PracticeSession): void {
  const profile = getStorage();
  profile.practiceSessions.push(session);
  
  // Update topic progress
  const topicProgress = profile.topicProgress[session.topicId] || {
    topicId: session.topicId,
    mastery: 'not-started',
    quizzesTaken: 0,
    averageScore: 0,
  };
  
  topicProgress.lastPracticed = session.completedAt;
  if (topicProgress.mastery === 'not-started') {
    topicProgress.mastery = 'learning';
  }
  
  profile.topicProgress[session.topicId] = topicProgress;
  saveStorage(profile);
}

export function getTopicProgress(topicId: string): TopicProgress {
  const profile = getStorage();
  return profile.topicProgress[topicId] || {
    topicId,
    mastery: 'not-started',
    quizzesTaken: 0,
    averageScore: 0,
  };
}

export function getAllTopicProgress(): TopicProgress[] {
  const profile = getStorage();
  return Object.values(profile.topicProgress);
}

export function getOverallProgress(): {
  totalTopics: number;
  topicsStarted: number;
  topicsMastered: number;
  averageScore: number;
  recentActivity: string[];
} {
  const profile = getStorage();
  const progress = Object.values(profile.topicProgress);
  
  const topicsStarted = progress.filter((p) => p.mastery !== 'not-started').length;
  const topicsMastered = progress.filter((p) => p.mastery === 'mastered').length;
  
  const quizzesWithScores = profile.quizResults.filter((q) => q.totalQuestions > 0);
  const averageScore = quizzesWithScores.length > 0
    ? quizzesWithScores.reduce((sum, q) => sum + (q.score / q.totalQuestions), 0) / quizzesWithScores.length
    : 0;
  
  // Recent activity
  const recentQuizzes = profile.quizResults.slice(-3).map((q) => 
    `Quiz completed on ${new Date(q.completedAt).toLocaleDateString()}`
  );
  
  const recentPractice = profile.practiceSessions.slice(-3).map((s) =>
    `Practice session on ${new Date(s.completedAt).toLocaleDateString()}`
  );
  
  const recentActivity = [...recentQuizzes, ...recentPractice]
    .sort((a, b) => b.localeCompare(a))
    .slice(0, 5);
  
  return {
    totalTopics: 8,
    topicsStarted,
    topicsMastered,
    averageScore,
    recentActivity,
  };
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
