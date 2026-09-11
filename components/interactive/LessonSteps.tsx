'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, ChevronRight, Trophy, Sparkles } from 'lucide-react';

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

interface LessonStepsProps {
  steps: LessonStep[];
  onComplete: () => void;
}

export function LessonSteps({ steps, onComplete }: LessonStepsProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [answer, setAnswer] = useState<string>('');
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const progress = ((completedSteps.size) / steps.length) * 100;

  const handleNext = () => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(currentStepIndex);
    setCompletedSteps(newCompleted);

    if (isLastStep) {
      setShowCelebration(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
      setAnswer('');
      setChecked(false);
      setCorrect(false);
    }
  };

  const handleCheck = () => {
    if (!currentStep.question) return;
    
    const isCorrect = answer.toLowerCase().trim() === currentStep.question.correctAnswer.toLowerCase().trim();
    setCorrect(isCorrect);
    setChecked(true);

    if (isCorrect) {
      setTimeout(() => {
        handleNext();
      }, 1500);
    }
  };

  const canProceed = () => {
    if (currentStep.type === 'check' && currentStep.question) {
      return correct;
    }
    return true;
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700">Lesson Progress</span>
          <span className="text-gray-600">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <Card className="w-96 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300">
            <CardContent className="pt-6 text-center space-y-4">
              <Trophy className="h-16 w-16 mx-auto text-yellow-600 animate-bounce" />
              <h2 className="text-2xl font-bold text-gray-900">Lesson Complete! 🎉</h2>
              <p className="text-gray-700">Great job! You&apos;ve mastered this concept.</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step Indicator */}
      <div className="flex items-center gap-2 flex-wrap">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                completedSteps.has(i)
                  ? 'bg-green-600 text-white'
                  : i === currentStepIndex
                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {completedSteps.has(i) ? '✓' : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-8 h-1 ${
                  completedSteps.has(i) ? 'bg-green-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Current Step Content */}
      <Card className="bg-white/80 backdrop-blur border-indigo-200">
        <CardContent className="pt-6 space-y-6">
          {/* Step Type Badge */}
          <div className="flex items-center justify-between">
            <Badge
              variant={
                currentStep.type === 'watch'
                  ? 'default'
                  : currentStep.type === 'interact'
                  ? 'secondary'
                  : currentStep.type === 'check'
                  ? 'outline'
                  : 'default'
              }
              className="text-sm"
            >
              {currentStep.type === 'watch' && '📺 Watch'}
              {currentStep.type === 'interact' && '🎮 Try It'}
              {currentStep.type === 'check' && '✅ Check'}
              {currentStep.type === 'intro' && '👋 Introduction'}
              {currentStep.type === 'summary' && '📝 Summary'}
            </Badge>
            {currentStep.type === 'interact' && (
              <Sparkles className="h-5 w-5 text-purple-600 animate-pulse" />
            )}
          </div>

          {/* Step Title */}
          <h3 className="text-xl font-bold text-gray-900">{currentStep.title}</h3>

          {/* Step Content */}
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed">{currentStep.content}</p>
          </div>

          {/* Interactive Component */}
          {currentStep.component && (
            <div className="border rounded-lg p-4 bg-gradient-to-br from-indigo-50 to-purple-50">
              {currentStep.component}
            </div>
          )}

          {/* Question */}
          {currentStep.question && currentStep.type === 'check' && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-medium text-blue-900 mb-3">{currentStep.question.text}</p>
                
                {currentStep.question.type === 'multiple-choice' && currentStep.question.options ? (
                  <div className="space-y-2">
                    {currentStep.question.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => !checked && setAnswer(option)}
                        disabled={checked}
                        className={`w-full text-left p-3 rounded border transition-colors ${
                          answer === option
                            ? checked
                              ? correct
                                ? 'bg-green-50 border-green-500'
                                : 'bg-red-50 border-red-500'
                              : 'bg-indigo-50 border-indigo-500'
                            : 'hover:bg-gray-50 border-gray-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => !checked && setAnswer('true')}
                      disabled={checked}
                      variant={answer === 'true' ? 'default' : 'outline'}
                      size="sm"
                    >
                      True
                    </Button>
                    <Button
                      onClick={() => !checked && setAnswer('false')}
                      disabled={checked}
                      variant={answer === 'false' ? 'default' : 'outline'}
                      size="sm"
                    >
                      False
                    </Button>
                  </div>
                )}

                {!checked && answer && (
                  <Button onClick={handleCheck} className="mt-3 w-full">
                    Check Answer
                  </Button>
                )}
              </div>

              {checked && (
                <Alert className={correct ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}>
                  {correct ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-orange-600" />
                  )}
                  <AlertDescription className={correct ? 'text-green-900' : 'text-orange-900'}>
                    {correct ? (
                      <div>
                        <strong>Correct! 🎉</strong> {currentStep.question.explanation}
                      </div>
                    ) : (
                      <div>
                        <strong>Not quite.</strong> {currentStep.question.explanation}
                        <Button
                          onClick={() => {
                            setAnswer('');
                            setChecked(false);
                          }}
                          variant="outline"
                          size="sm"
                          className="mt-2"
                        >
                          Try Again
                        </Button>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4">
            <Button
              onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
              variant="outline"
              disabled={currentStepIndex === 0}
            >
              ← Previous
            </Button>

            {currentStep.type !== 'check' && (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {isLastStep ? 'Complete Lesson' : 'Next'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      {currentStep.type === 'interact' && (
        <Alert className="bg-purple-50 border-purple-200">
          <Sparkles className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-purple-900">
            <strong>Tip:</strong> Take your time to explore and experiment with the interactive diagram!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
