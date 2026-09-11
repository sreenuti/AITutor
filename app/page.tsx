'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, BookOpen, TrendingUp, Sparkles } from 'lucide-react';
import { getProfile, getOverallProgress } from '@/lib/storage';
import { CATCH_UP_TOPICS } from '@/lib/curriculum';

export default function HomePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(getProfile());
  const [progress, setProgress] = useState(getOverallProgress());

  useEffect(() => {
    setProfile(getProfile());
    setProgress(getOverallProgress());
  }, []);

  const continueToCurrentTopic = () => {
    if (profile.currentTopicId) {
      router.push(`/learn/${profile.currentTopicId}`);
    } else {
      // Start with first catch-up topic
      router.push(`/learn/${CATCH_UP_TOPICS[0].id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Sahasra Geometry Tutor</h1>
          </div>
          <p className="text-gray-600">
            Welcome back, {profile.name}! Catching up on your reasoning & postulates unit.
          </p>
        </div>

        {/* Progress Overview */}
        {progress.topicsStarted > 0 && (
          <Card className="mb-6 border-indigo-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">
                    {progress.topicsStarted}
                  </div>
                  <div className="text-sm text-gray-600">Topics Started</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {progress.topicsMastered}
                  </div>
                  <div className="text-sm text-gray-600">Mastered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(progress.averageScore * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {progress.totalTopics - progress.topicsStarted}
                  </div>
                  <div className="text-sm text-gray-600">To Explore</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Continue Learning */}
          <Card className="border-indigo-300 hover:shadow-lg transition-shadow cursor-pointer bg-white/80 backdrop-blur">
            <CardHeader>
              <BookOpen className="h-8 w-8 text-indigo-600 mb-2" />
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>
                {profile.currentTopicId
                  ? 'Pick up where you left off'
                  : 'Start your catch-up journey'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={continueToCurrentTopic}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                size="lg"
              >
                Start Learning
              </Button>
            </CardContent>
          </Card>

          {/* Upload Worksheet */}
          <Card className="border-purple-300 hover:shadow-lg transition-shadow cursor-pointer bg-white/80 backdrop-blur">
            <CardHeader>
              <Upload className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Upload Worksheet</CardTitle>
              <CardDescription>
                Get help with your class assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => router.push('/upload')}
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
                variant="default"
              >
                Upload or Capture
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Catch-Up Topics */}
        <Card className="bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle>Weeks 1-3: Logic & Reasoning</CardTitle>
            <CardDescription>
              Your class notes unit on inductive/deductive reasoning, conditionals, and postulates. Let&apos;s master them together!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {CATCH_UP_TOPICS.map((topic) => {
                const topicProgress = progress.topicsStarted > 0
                  ? profile.topicProgress?.[topic.id]
                  : undefined;

                return (
                  <button
                    key={topic.id}
                    onClick={() => router.push(`/learn/${topic.id}`)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            Week {topic.week}
                          </Badge>
                          {topicProgress && (
                            <Badge
                              variant={
                                topicProgress.mastery === 'mastered'
                                  ? 'default'
                                  : topicProgress.mastery === 'needs-review'
                                  ? 'destructive'
                                  : 'secondary'
                              }
                              className="text-xs"
                            >
                              {topicProgress.mastery === 'mastered'
                                ? 'Mastered'
                                : topicProgress.mastery === 'practicing'
                                ? 'Practicing'
                                : topicProgress.mastery === 'learning'
                                ? 'Learning'
                                : 'Needs Review'}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{topic.description}</p>
                      </div>
                      <div className="ml-4">
                        <Button variant="ghost" size="sm">
                          Start →
                        </Button>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="mt-6 flex justify-center gap-4">
          <Button
            onClick={() => router.push('/curriculum')}
            variant="outline"
            size="sm"
          >
            View Full Curriculum
          </Button>
          <Button
            onClick={() => router.push('/progress')}
            variant="outline"
            size="sm"
          >
            Progress Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
