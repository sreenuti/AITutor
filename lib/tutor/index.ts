/**
 * Geometry Tutor AI - Main abstraction layer
 * Supports real API calls (OpenAI Vision) or demo/fallback mode
 */

import type {
  WorksheetAnalysis,
  Explanation,
  PracticeProblem,
  Quiz,
} from './types';
import {
  DEMO_WORKSHEET_ANALYSIS,
  DEMO_EXPLANATION,
  DEMO_PRACTICE_PROBLEMS,
  DEMO_QUIZ,
  DEMO_TRIANGLE_WORKSHEET,
} from './demo-data';

const USE_DEMO_MODE = !process.env.OPENAI_API_KEY;

/**
 * Analyze an uploaded worksheet image
 */
export async function analyzeWorksheet(
  imageData: string | File,
  useDemoMode?: boolean
): Promise<WorksheetAnalysis> {
  const demoMode = useDemoMode ?? USE_DEMO_MODE;

  if (demoMode) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Randomly return one of our demo worksheets
    return Math.random() > 0.5 ? DEMO_WORKSHEET_ANALYSIS : DEMO_TRIANGLE_WORKSHEET;
  }

  // Real API call to OpenAI Vision
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY not set');
    }

    // Prepare image data
    let base64Image: string;
    if (typeof imageData === 'string') {
      base64Image = imageData;
    } else {
      const buffer = await imageData.arrayBuffer();
      base64Image = Buffer.from(buffer).toString('base64');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'You are a geometry tutor assistant. Analyze the uploaded worksheet image and extract the topic, problems, and concepts covered. Return a structured JSON response.',
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this geometry worksheet. Identify: 1) Main topic (choose from: points-lines-planes, angles, parallel-transversals, triangles-basics, congruence, perimeter-area, pythagorean, coordinate-geometry), 2) List of problems, 3) Key concepts covered, 4) Difficulty level, 5) Estimated grade level. Return as JSON matching the WorksheetAnalysis type.',
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    // Parse JSON response
    const analysis: WorksheetAnalysis = JSON.parse(content);
    return analysis;
  } catch (error) {
    console.error('Error analyzing worksheet with OpenAI:', error);
    // Fall back to demo mode on error
    return DEMO_WORKSHEET_ANALYSIS;
  }
}

/**
 * Get explanation for a topic
 */
export async function getExplanation(
  topicId: string,
  useDemoMode?: boolean
): Promise<Explanation> {
  const demoMode = useDemoMode ?? USE_DEMO_MODE;

  if (demoMode) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Return demo explanation (would normally vary by topic)
    return DEMO_EXPLANATION;
  }

  // Real API implementation
  try {
    const response = await fetch('/api/tutor/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicId }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch explanation');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching explanation:', error);
    return DEMO_EXPLANATION;
  }
}

/**
 * Generate practice problems for a topic
 */
export async function generatePracticeProblems(
  topicId: string,
  count: number = 5,
  useDemoMode?: boolean
): Promise<PracticeProblem[]> {
  const demoMode = useDemoMode ?? USE_DEMO_MODE;

  if (demoMode) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return DEMO_PRACTICE_PROBLEMS.slice(0, count);
  }

  // Real API implementation
  try {
    const response = await fetch('/api/tutor/practice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicId, count }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate practice problems');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating practice problems:', error);
    return DEMO_PRACTICE_PROBLEMS.slice(0, count);
  }
}

/**
 * Generate a quiz for a topic
 */
export async function generateQuiz(
  topicId: string,
  questionCount: number = 8,
  useDemoMode?: boolean
): Promise<Quiz> {
  const demoMode = useDemoMode ?? USE_DEMO_MODE;

  if (demoMode) {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return DEMO_QUIZ;
  }

  // Real API implementation
  try {
    const response = await fetch('/api/tutor/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicId, questionCount }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate quiz');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating quiz:', error);
    return DEMO_QUIZ;
  }
}

/**
 * Check if demo mode is active
 */
export function isDemoMode(): boolean {
  return USE_DEMO_MODE;
}
