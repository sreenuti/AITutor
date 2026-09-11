'use client';

import { use, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Dumbbell, GraduationCap, Loader2, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { getTopicById } from '@/lib/curriculum';
import { getExplanation, generatePracticeProblems, generateQuiz } from '@/lib/tutor';
import { getTopicProgress, updateProfile, addPracticeSession, addQuizResult } from '@/lib/storage';
import type { Explanation, PracticeProblem, Quiz, QuizQuestion } from '@/lib/tutor/types';
import { LessonSteps } from '@/components/interactive/LessonSteps';
import { getLessonSteps } from '@/lib/tutor/lesson-content';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { ChatSettings } from '@/components/chat/ChatSettings';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SegmentAdditionVisual } from '@/components/interactive/SegmentAdditionVisual';
import { AngleAdditionVisual } from '@/components/interactive/AngleAdditionVisual';

export default function LearnPage({ params }: { params: Promise<{ topicId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const topicId = resolvedParams.topicId;
  
  const topic = getTopicById(topicId);
  const [activeTab, setActiveTab] = useState('explain');
  
  // Explanation state
  const [explanation, setExplanation] = useState<Explanation | null>(null);
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [microAnswers, setMicroAnswers] = useState<Record<string, string>>({});
  const [microChecked, setMicroChecked] = useState<Record<string, boolean>>({});
  
  // Practice state
  const [practiceProblems, setPracticeProblems] = useState<PracticeProblem[]>([]);
  const [loadingPractice, setLoadingPractice] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [practiceHints, setPracticeHints] = useState<Record<string, number>>({});
  const [practiceChecked, setPracticeChecked] = useState<Record<string, boolean>>({});
  
  // Quiz state
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  
  const [topicProgress, setTopicProgress] = useState(getTopicProgress(topicId));
  const [showChatSettings, setShowChatSettings] = useState(false);

  useEffect(() => {
    // Update current topic in profile
    updateProfile({ currentTopicId: topicId });
    
    // Load explanation by default
    loadExplanation();
    
    // If coming from worksheet, maybe show a welcome message
    const fromWorksheet = searchParams.get('from') === 'worksheet';
    if (fromWorksheet) {
      // Could show a toast or alert
      console.log('Coming from worksheet upload');
    }
  }, [topicId]);

  const loadExplanation = async () => {
    if (explanation) return;
    setLoadingExplanation(true);
    try {
      const exp = await getExplanation(topicId);
      setExplanation(exp);
    } catch (error) {
      console.error('Failed to load explanation:', error);
    } finally {
      setLoadingExplanation(false);
    }
  };

  const loadPractice = async () => {
    if (practiceProblems.length > 0) return;
    setLoadingPractice(true);
    try {
      const problems = await generatePracticeProblems(topicId, 5);
      setPracticeProblems(problems);
    } catch (error) {
      console.error('Failed to load practice:', error);
    } finally {
      setLoadingPractice(false);
    }
  };

  const loadQuiz = async () => {
    if (quiz) return;
    setLoadingQuiz(true);
    try {
      const q = await generateQuiz(topicId, 8);
      setQuiz(q);
    } catch (error) {
      console.error('Failed to load quiz:', error);
    } finally {
      setLoadingQuiz(false);
    }
  };

  const renderDiagram = (visual?: string) => {
    if (!visual) return null;
    
    const [type, params] = visual.split(':');
    if (type === 'segment') {
      const [partA, partB, whole] = params.split(',');
      return (
        <div className="mb-4">
          <SegmentAdditionVisual
            partA={partA}
            partB={partB}
            whole={whole}
            showLabels={true}
            interactive={false}
          />
        </div>
      );
    } else if (type === 'angle') {
      const [angle1, angle2, whole] = params.split(',');
      return (
        <div className="mb-4">
          <AngleAdditionVisual
            angle1={angle1}
            angle2={angle2}
            whole={whole}
            showLabels={true}
            interactive={false}
          />
        </div>
      );
    }
    return null;
  };

  const checkMicroQuestion = (questionId: string, answer: string) => {
    const question = explanation?.checkUnderstanding.find((q) => q.id === questionId);
    if (!question) return;
    
    const correct = answer.toLowerCase() === question.correctAnswer.toLowerCase();
    setMicroChecked({ ...microChecked, [questionId]: correct });
  };

  const showHint = (problemId: string, level: number) => {
    setPracticeHints({ ...practiceHints, [problemId]: level });
  };

  const checkPracticeAnswer = (problemId: string, answer: string) => {
    const problem = practiceProblems.find((p) => p.id === problemId);
    if (!problem) return;
    
    // Normalize answers for comparison
    const normalizedAnswer = answer.trim().toLowerCase().replace(/[°\s]/g, '');
    const normalizedCorrect = problem.answer.trim().toLowerCase().replace(/[°\s]/g, '');
    
    const correct = normalizedAnswer === normalizedCorrect;
    setPracticeChecked({ ...practiceChecked, [problemId]: correct });
    
    // Save practice session after a few checks
    if (Object.keys(practiceChecked).length >= 3) {
      const sessionId = `practice-${Date.now()}`;
      const correctCount = Object.values({ ...practiceChecked, [problemId]: correct }).filter(Boolean).length;
      addPracticeSession({
        sessionId,
        topicId,
        completedAt: new Date().toISOString(),
        problemsAttempted: Object.keys(practiceChecked).length + 1,
        problemsCorrect: correctCount,
      });
      setTopicProgress(getTopicProgress(topicId));
    }
  };

  const submitQuiz = () => {
    if (!quiz) return;
    
    let score = 0;
    const answers = quiz.questions.map((q) => {
      const studentAnswer = quizAnswers[q.id] || '';
      const correct = studentAnswer.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();
      if (correct) score += q.points;
      return {
        questionId: q.id,
        correct,
        studentAnswer,
      };
    });
    
    setQuizScore(score);
    setQuizSubmitted(true);
    
    // Save quiz result
    addQuizResult({
      quizId: quiz.id,
      topicId,
      score,
      totalQuestions: quiz.totalPoints,
      completedAt: new Date().toISOString(),
      answers,
    });
    
    setTopicProgress(getTopicProgress(topicId));
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuiz(null);
  };

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Topic Not Found</CardTitle>
            <CardDescription>The requested topic could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/')}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <Button onClick={() => router.push('/')} variant="ghost" size="sm">
            ← Back to Home
          </Button>
        </div>

        <Card className="mb-6 bg-white/80 backdrop-blur">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{topic.title}</CardTitle>
                <CardDescription>{topic.description}</CardDescription>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">Week {topic.week}</Badge>
                  <Badge variant={
                    topicProgress.mastery === 'mastered' ? 'default' :
                    topicProgress.mastery === 'needs-review' ? 'destructive' :
                    'secondary'
                  }>
                    {topicProgress.mastery === 'not-started' ? 'Not Started' :
                     topicProgress.mastery === 'mastered' ? 'Mastered ✓' :
                     topicProgress.mastery === 'practicing' ? 'Practicing' :
                     topicProgress.mastery === 'learning' ? 'Learning' :
                     'Needs Review'}
                  </Badge>
                </div>
              </div>
              {topicProgress.averageScore > 0 && (
                <div className="text-right">
                  <div className="text-3xl font-bold text-indigo-600">
                    {Math.round(topicProgress.averageScore * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Learning Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur">
            <TabsTrigger value="explain" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Explain
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-2" onClick={loadPractice}>
              <Dumbbell className="h-4 w-4" />
              Practice
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2" onClick={loadQuiz}>
              <GraduationCap className="h-4 w-4" />
              Quiz
            </TabsTrigger>
          </TabsList>

          {/* Explain Tab - Interactive Step-by-Step Lesson */}
          <TabsContent value="explain">
            <LessonSteps
              steps={getLessonSteps(topicId)}
              onComplete={() => {
                // Mark as practiced in profile
                setActiveTab('practice');
              }}
            />
          </TabsContent>

          {/* Practice Tab - Content continues in next file due to length */}
          <TabsContent value="practice">
            {loadingPractice ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
                  <p className="text-gray-600">Generating practice problems...</p>
                </CardContent>
              </Card>
            ) : practiceProblems.length > 0 ? (
              <div className="space-y-6">
                <Card className="bg-white/80 backdrop-blur">
                  <CardHeader>
                    <CardTitle>Practice Problems</CardTitle>
                    <CardDescription>
                      Work through these problems at your own pace. Use hints if you get stuck!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {practiceProblems.map((problem, idx) => (
                        <div key={problem.id} className="p-4 border rounded-lg bg-white">
                          {/* Diagram */}
                          {renderDiagram(problem.visual)}
                          
                          <p className="font-medium text-gray-900 mb-4">
                            {idx + 1}. {problem.problem}
                          </p>
                          
                          {/* Hints */}
                          <div className="mb-4 space-y-2">
                            {(!practiceHints[problem.id] || practiceHints[problem.id] === 0) && (
                              <Button
                                onClick={() => showHint(problem.id, 1)}
                                variant="outline"
                                size="sm"
                                disabled={practiceChecked[problem.id] !== undefined}
                              >
                                <Lightbulb className="h-4 w-4 mr-2" />
                                Show Hint 1
                              </Button>
                            )}
                            {practiceHints[problem.id] >= 1 && (
                              <Alert className="bg-yellow-50 border-yellow-200">
                                <Lightbulb className="h-4 w-4 text-yellow-600" />
                                <AlertDescription className="text-yellow-900">
                                  <strong>Hint 1:</strong> {problem.hint1}
                                </AlertDescription>
                              </Alert>
                            )}
                            {practiceHints[problem.id] >= 1 && practiceHints[problem.id] < 2 && (
                              <Button
                                onClick={() => showHint(problem.id, 2)}
                                variant="outline"
                                size="sm"
                                disabled={practiceChecked[problem.id] !== undefined}
                              >
                                <Lightbulb className="h-4 w-4 mr-2" />
                                Show Hint 2
                              </Button>
                            )}
                            {practiceHints[problem.id] >= 2 && (
                              <Alert className="bg-yellow-50 border-yellow-200">
                                <Lightbulb className="h-4 w-4 text-yellow-600" />
                                <AlertDescription className="text-yellow-900">
                                  <strong>Hint 2:</strong> {problem.hint2}
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>
                          
                          {/* Answer Input */}
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={practiceAnswers[problem.id] || ''}
                              onChange={(e) => setPracticeAnswers({ ...practiceAnswers, [problem.id]: e.target.value })}
                              placeholder="Your answer"
                              disabled={practiceChecked[problem.id] !== undefined}
                              className="flex-1 px-3 py-2 border rounded-md"
                            />
                            <Button
                              onClick={() => checkPracticeAnswer(problem.id, practiceAnswers[problem.id] || '')}
                              disabled={!practiceAnswers[problem.id] || practiceChecked[problem.id] !== undefined}
                            >
                              Check
                            </Button>
                          </div>
                          
                          {/* Feedback */}
                          {practiceChecked[problem.id] !== undefined && (
                            <Alert className={`mt-3 ${practiceChecked[problem.id] ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
                              {practiceChecked[problem.id] ? (
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-orange-600" />
                              )}
                              <AlertDescription className={practiceChecked[problem.id] ? 'text-green-900' : 'text-orange-900'}>
                                {practiceChecked[problem.id] ? (
                                  <div>
                                    <strong>Correct!</strong> {problem.explanation}
                                  </div>
                                ) : (
                                  <div>
                                    <strong>Not quite.</strong> The correct answer is: <strong>{problem.answer}</strong>
                                    <p className="mt-2">{problem.explanation}</p>
                                  </div>
                                )}
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-center">
                  <Button
                    onClick={() => setActiveTab('quiz')}
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Ready for the Quiz →
                  </Button>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-gray-600">Click to load practice problems</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz">
            {loadingQuiz ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-green-600" />
                  <p className="text-gray-600">Generating quiz...</p>
                </CardContent>
              </Card>
            ) : quiz ? (
              <div className="space-y-6">
                {!quizSubmitted ? (
                  <>
                    <Card className="bg-white/80 backdrop-blur">
                      <CardHeader>
                        <CardTitle>{quiz.title}</CardTitle>
                        <CardDescription>
                          Answer all questions to the best of your ability. Total: {quiz.totalPoints} points
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {quiz.questions.map((question, idx) => (
                            <div key={question.id} className="p-4 border rounded-lg bg-white">
                              {/* Diagram */}
                              {renderDiagram(question.visual)}
                              
                              <div className="flex justify-between items-start mb-3">
                                <p className="font-medium text-gray-900 flex-1">
                                  {idx + 1}. {question.question}
                                </p>
                                <Badge variant="outline">{question.points} pts</Badge>
                              </div>
                              
                              {question.type === 'multiple-choice' && question.options ? (
                                <div className="space-y-2">
                                  {question.options.map((option) => (
                                    <button
                                      key={option}
                                      onClick={() => setQuizAnswers({ ...quizAnswers, [question.id]: option })}
                                      className={`w-full text-left p-3 rounded border transition-colors ${
                                        quizAnswers[question.id] === option
                                          ? 'bg-indigo-50 border-indigo-500'
                                          : 'hover:bg-gray-50 border-gray-200'
                                      }`}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  value={quizAnswers[question.id] || ''}
                                  onChange={(e) => setQuizAnswers({ ...quizAnswers, [question.id]: e.target.value })}
                                  placeholder="Your answer"
                                  className="w-full px-3 py-2 border rounded-md"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="flex justify-center">
                      <Button
                        onClick={submitQuiz}
                        size="lg"
                        className="bg-green-600 hover:bg-green-700"
                        disabled={Object.keys(quizAnswers).length < quiz.questions.length}
                      >
                        Submit Quiz
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Card className="bg-white/80 backdrop-blur border-green-300">
                      <CardHeader className="bg-green-50">
                        <CardTitle className="text-green-900 text-2xl">Quiz Complete!</CardTitle>
                        <CardDescription>
                          Here&apos;s how you did
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="text-center mb-6">
                          <div className="text-5xl font-bold text-green-600 mb-2">
                            {Math.round((quizScore / quiz.totalPoints) * 100)}%
                          </div>
                          <div className="text-gray-600">
                            {quizScore} out of {quiz.totalPoints} points
                          </div>
                          <Progress value={(quizScore / quiz.totalPoints) * 100} className="mt-4" />
                        </div>
                        
                        {quizScore / quiz.totalPoints >= 0.9 && (
                          <Alert className="bg-green-50 border-green-200 mb-4">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-900">
                              <strong>Excellent work!</strong> You&apos;ve mastered this topic. Keep up the great work!
                            </AlertDescription>
                          </Alert>
                        )}
                        
                        {quizScore / quiz.totalPoints >= 0.7 && quizScore / quiz.totalPoints < 0.9 && (
                          <Alert className="bg-blue-50 border-blue-200 mb-4">
                            <AlertDescription className="text-blue-900">
                              <strong>Good job!</strong> You&apos;re doing well. Review the questions you missed to solidify your understanding.
                            </AlertDescription>
                          </Alert>
                        )}
                        
                        {quizScore / quiz.totalPoints < 0.7 && (
                          <Alert className="bg-orange-50 border-orange-200 mb-4">
                            <AlertDescription className="text-orange-900">
                              <strong>Keep practicing!</strong> Review the explanation and practice problems, then try the quiz again.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                    
                    {/* Review */}
                    <Card className="bg-white/80 backdrop-blur">
                      <CardHeader>
                        <CardTitle>Review Your Answers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {quiz.questions.map((question, idx) => {
                            const studentAnswer = quizAnswers[question.id];
                            const correct = studentAnswer?.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
                            
                            return (
                              <div key={question.id} className={`p-4 border rounded-lg ${correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                <div className="flex items-start gap-2 mb-2">
                                  {correct ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                  ) : (
                                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                  )}
                                  <p className="font-medium text-gray-900">
                                    {idx + 1}. {question.question}
                                  </p>
                                </div>
                                <div className="ml-7 text-sm space-y-1">
                                  <p>
                                    <strong>Your answer:</strong> {studentAnswer}
                                  </p>
                                  {!correct && (
                                    <p>
                                      <strong>Correct answer:</strong> {question.correctAnswer}
                                    </p>
                                  )}
                                  <p className="text-gray-700 mt-2">{question.explanation}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="flex justify-center gap-4">
                      <Button onClick={resetQuiz} variant="outline">
                        Take Quiz Again
                      </Button>
                      <Button onClick={() => router.push('/')} className="bg-indigo-600 hover:bg-indigo-700">
                        Back to Home
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-gray-600">Click to load quiz</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Chat Panel */}
      <ChatPanel 
        currentTopicId={topicId} 
        onOpenSettings={() => setShowChatSettings(true)}
      />

      {/* Chat Settings Dialog */}
      <Dialog open={showChatSettings} onOpenChange={setShowChatSettings}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chat Settings & Cost Controls</DialogTitle>
          </DialogHeader>
          <ChatSettings onClose={() => setShowChatSettings(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
