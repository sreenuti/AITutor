'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Target, BookOpen, Award, Calendar, BarChart } from 'lucide-react';
import { getProfile, getOverallProgress, getAllTopicProgress } from '@/lib/storage';
import { CURRICULUM, CATCH_UP_TOPICS } from '@/lib/curriculum';

export default function ProgressPage() {
  const router = useRouter();
  const [profile, setProfile] = useState(getProfile());
  const [overallProgress, setOverallProgress] = useState(getOverallProgress());
  const [topicProgress, setTopicProgress] = useState(getAllTopicProgress());

  useEffect(() => {
    setProfile(getProfile());
    setOverallProgress(getOverallProgress());
    setTopicProgress(getAllTopicProgress());
  }, []);

  const catchUpProgress = CATCH_UP_TOPICS.map((topic) => {
    const progress = topicProgress.find((p) => p.topicId === topic.id);
    return {
      topic,
      progress: progress || {
        topicId: topic.id,
        mastery: 'not-started' as const,
        quizzesTaken: 0,
        averageScore: 0,
      },
    };
  });

  const catchUpMastered = catchUpProgress.filter(
    (cp) => cp.progress.mastery === 'mastered'
  ).length;
  const catchUpInProgress = catchUpProgress.filter(
    (cp) => cp.progress.mastery !== 'not-started' && cp.progress.mastery !== 'mastered'
  ).length;

  const recentQuizzes = profile.quizResults.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Button onClick={() => router.push('/')} variant="ghost" size="sm">
            ← Back to Home
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Dashboard</h1>
          <p className="text-gray-600">
            Track {profile.name}&apos;s geometry learning journey
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Overall Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-600">
                    {Math.round(overallProgress.averageScore * 100)}%
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Across all quizzes</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Topics Mastered
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    {overallProgress.topicsMastered}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    of {overallProgress.totalTopics} topics
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    In Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">
                    {overallProgress.topicsStarted - overallProgress.topicsMastered}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Currently learning</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Quizzes Taken
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">
                    {profile.quizResults.length}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Total assessments</p>
                </CardContent>
              </Card>
            </div>

            {/* Catch-Up Progress */}
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-emerald-600" />
                  <CardTitle>Weeks 1-3 Catch-Up Progress</CardTitle>
                </div>
                <CardDescription>
                  Progress on the topics missed during the first three weeks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">Overall Catch-Up</span>
                      <span className="text-gray-600">
                        {catchUpMastered} of {CATCH_UP_TOPICS.length} mastered
                      </span>
                    </div>
                    <Progress
                      value={(catchUpMastered / CATCH_UP_TOPICS.length) * 100}
                      className="h-3"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{catchUpMastered}</div>
                      <div className="text-sm text-gray-600">Mastered</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{catchUpInProgress}</div>
                      <div className="text-sm text-gray-600">In Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">
                        {CATCH_UP_TOPICS.length - catchUpMastered - catchUpInProgress}
                      </div>
                      <div className="text-sm text-gray-600">Not Started</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Strengths */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <CardTitle>Strengths</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {overallProgress.topicsMastered > 0 ? (
                    <div className="space-y-2">
                      {topicProgress
                        .filter((tp) => tp.mastery === 'mastered')
                        .slice(0, 5)
                        .map((tp) => {
                          const topic = CURRICULUM.find((t) => t.id === tp.topicId);
                          return topic ? (
                            <div key={tp.topicId} className="flex items-center justify-between p-2 bg-green-50 rounded">
                              <span className="text-sm font-medium text-gray-900">{topic.title}</span>
                              <Badge variant="default" className="bg-green-600">
                                {Math.round(tp.averageScore * 100)}%
                              </Badge>
                            </div>
                          ) : null;
                        })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Mastered topics will appear here as progress is made
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <CardTitle>Areas to Focus</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {topicProgress.some((tp) => tp.mastery === 'needs-review' || tp.averageScore < 0.7) ? (
                    <div className="space-y-2">
                      {topicProgress
                        .filter((tp) => tp.mastery === 'needs-review' || (tp.averageScore < 0.7 && tp.mastery !== 'not-started'))
                        .slice(0, 5)
                        .map((tp) => {
                          const topic = CURRICULUM.find((t) => t.id === tp.topicId);
                          return topic ? (
                            <div key={tp.topicId} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                              <span className="text-sm font-medium text-gray-900">{topic.title}</span>
                              <Badge variant="secondary" className="bg-orange-200">
                                {Math.round(tp.averageScore * 100)}%
                              </Badge>
                            </div>
                          ) : null;
                        })}
                    </div>
                  ) : overallProgress.topicsStarted > 0 ? (
                    <p className="text-sm text-gray-500">
                      Great work! No areas need immediate attention.
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Areas needing focus will appear here as quizzes are completed
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="text-indigo-900">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {catchUpMastered === CATCH_UP_TOPICS.length ? (
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Excellent progress on catch-up!</p>
                        <p className="text-sm text-gray-700">
                          All weeks 1-3 topics are mastered. Ready to continue with the current curriculum.
                        </p>
                      </div>
                    </div>
                  ) : catchUpInProgress > 0 ? (
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Keep up the momentum!</p>
                        <p className="text-sm text-gray-700">
                          Continue working through the catch-up topics. Consistent practice will build confidence.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Ready to start!</p>
                        <p className="text-sm text-gray-700">
                          Begin with the first catch-up topic to build a strong foundation.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {topicProgress.some((tp) => tp.mastery === 'needs-review') && (
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Review recommended</p>
                        <p className="text-sm text-gray-700">
                          Some topics need more practice. Reviewing the explanation and practice problems can help.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {profile.quizResults.length >= 3 && overallProgress.averageScore >= 0.8 && (
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Excellent performance!</p>
                        <p className="text-sm text-gray-700">
                          Consistently scoring above 80%. This shows strong understanding and effort.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Topics Tab */}
          <TabsContent value="topics">
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle>All Topics</CardTitle>
                <CardDescription>Detailed progress for each geometry topic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {CURRICULUM.map((topic) => {
                    const progress = topicProgress.find((tp) => tp.topicId === topic.id) || {
                      topicId: topic.id,
                      mastery: 'not-started' as const,
                      quizzesTaken: 0,
                      averageScore: 0,
                    };

                    return (
                      <div key={topic.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                              <Badge variant="outline" className="text-xs">
                                Week {topic.week}
                              </Badge>
                              {topic.week <= 3 && (
                                <Badge variant="secondary" className="text-xs bg-blue-100">
                                  Catch-up
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{topic.description}</p>
                          </div>
                          <Badge
                            variant={
                              progress.mastery === 'mastered'
                                ? 'default'
                                : progress.mastery === 'needs-review'
                                ? 'destructive'
                                : progress.mastery === 'not-started'
                                ? 'outline'
                                : 'secondary'
                            }
                          >
                            {progress.mastery === 'not-started'
                              ? 'Not Started'
                              : progress.mastery === 'mastered'
                              ? 'Mastered'
                              : progress.mastery === 'practicing'
                              ? 'Practicing'
                              : progress.mastery === 'learning'
                              ? 'Learning'
                              : 'Needs Review'}
                          </Badge>
                        </div>
                        
                        {progress.mastery !== 'not-started' && (
                          <div className="mt-3 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Quiz Average</span>
                              <span className="font-medium text-gray-900">
                                {Math.round(progress.averageScore * 100)}%
                              </span>
                            </div>
                            <Progress value={progress.averageScore * 100} />
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>{progress.quizzesTaken} quiz(zes) taken</span>
                              {progress.lastPracticed && (
                                <span>
                                  Last: {new Date(progress.lastPracticed).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-3">
                          <Button
                            onClick={() => router.push(`/learn/${topic.id}`)}
                            variant="outline"
                            size="sm"
                          >
                            {progress.mastery === 'not-started' ? 'Start Learning' : 'Continue'}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                  <CardTitle>Recent Activity</CardTitle>
                </div>
                <CardDescription>Recent quizzes and practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                {recentQuizzes.length > 0 ? (
                  <div className="space-y-4">
                    {recentQuizzes.map((quiz) => {
                      const topic = CURRICULUM.find((t) => t.id === quiz.topicId);
                      const percentage = Math.round((quiz.score / quiz.totalQuestions) * 100);
                      
                      return (
                        <div key={quiz.quizId} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {topic?.title || 'Unknown Topic'}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {new Date(quiz.completedAt).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                  hour: 'numeric',
                                  minute: '2-digit',
                                })}
                              </p>
                            </div>
                            <div className="text-right">
                              <div
                                className={`text-2xl font-bold ${
                                  percentage >= 90
                                    ? 'text-green-600'
                                    : percentage >= 70
                                    ? 'text-blue-600'
                                    : 'text-orange-600'
                                }`}
                              >
                                {percentage}%
                              </div>
                              <p className="text-xs text-gray-600">
                                {quiz.score}/{quiz.totalQuestions} pts
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Progress value={percentage} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No activity yet</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Complete quizzes to see your history here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
