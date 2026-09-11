'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import { CURRICULUM } from '@/lib/curriculum';

export default function CurriculumPage() {
  const router = useRouter();

  const weeks = Array.from(new Set(CURRICULUM.map((t) => t.week))).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6">
          <Button onClick={() => router.push('/')} variant="ghost" size="sm">
            ← Back to Home
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            8th Grade Geometry Curriculum
          </h1>
          <p className="text-gray-600">
            Complete curriculum map for advanced 8th grade geometry
          </p>
        </div>

        <div className="space-y-8">
          {weeks.map((week) => {
            const weekTopics = CURRICULUM.filter((t) => t.week === week);
            const isCatchUp = week <= 3;

            return (
              <Card key={week} className="bg-white/80 backdrop-blur">
                <CardHeader className={isCatchUp ? 'bg-blue-50' : ''}>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Week {week}
                        {isCatchUp && (
                          <Badge className="bg-blue-600">Catch-Up Priority</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {weekTopics.length} topic{weekTopics.length > 1 ? 's' : ''}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {weekTopics.map((topic) => (
                      <div
                        key={topic.id}
                        className="border rounded-lg p-4 hover:border-indigo-300 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <BookOpen className="h-5 w-5 text-indigo-600" />
                              <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                              <Badge
                                variant={
                                  topic.difficulty === 'beginner'
                                    ? 'secondary'
                                    : topic.difficulty === 'intermediate'
                                    ? 'default'
                                    : 'destructive'
                                }
                              >
                                {topic.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-1">
                                Key Concepts:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {topic.concepts.map((concept) => (
                                  <Badge key={concept} variant="outline" className="text-xs">
                                    {concept}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="ml-4">
                            <Button
                              onClick={() => router.push(`/learn/${topic.id}`)}
                              size="sm"
                            >
                              Learn
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="text-indigo-900">About This Curriculum</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              This curriculum is based on Common Core State Standards for advanced 8th grade
              geometry. Topics build on each other, starting with fundamental concepts like points,
              lines, and angles, then progressing to more complex ideas like congruence and the
              Pythagorean theorem. The first three weeks cover essential foundations that are
              critical for success in the rest of the course.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
