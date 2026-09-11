import { NextRequest, NextResponse } from 'next/server';
import { findKBAnswer, normalizeQuestion } from '@/lib/chat/knowledge-base';
import { getTopicById } from '@/lib/curriculum';

// STRICT LIMITS - prevent runaway costs
const MAX_TOKENS = 200; // Keep responses short
const MAX_INPUT_LENGTH = 500; // Reject oversized questions
const MAX_HISTORY_TURNS = 2; // Tiny context window
const TEMPERATURE = 0.3; // Low temperature for consistent, factual answers

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  question: string;
  topicId?: string;
  history?: ChatMessage[];
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { question, topicId, history = [] } = body;

    // Validate input
    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    if (question.length > MAX_INPUT_LENGTH) {
      return NextResponse.json(
        { error: 'Question too long. Please keep it under 500 characters.' },
        { status: 400 }
      );
    }

    // 1. Try local KB first (FREE - already done in client, but safety check)
    const kbAnswer = findKBAnswer(question, topicId);
    if (kbAnswer) {
      return NextResponse.json({
        answer: kbAnswer.answer,
        source: 'local-kb',
        tokensUsed: 0,
      });
    }

    // 2. Check if API key is available
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Demo mode - return helpful fallback
      return NextResponse.json({
        answer: getDemoFallbackAnswer(question, topicId),
        source: 'demo-fallback',
        tokensUsed: 0,
      });
    }

    // 3. Build TINY context (token-stingy)
    const topic = topicId ? getTopicById(topicId) : null;
    const context = topic
      ? `Topic: ${topic.title}\nDescription: ${topic.description}`
      : 'General 8th grade geometry';

    // Take only last 2 turns of history
    const recentHistory = history.slice(-MAX_HISTORY_TURNS);

    // 4. Call OpenAI with STRICT limits
    const systemPrompt = `You are a friendly geometry tutor for 8th graders. Keep answers SHORT (2-3 sentences), encouraging, and age-appropriate. Use simple language. If you don't know, admit it. Never give direct homework answers - guide the student instead.

Current context: ${context}`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...recentHistory.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      { role: 'user', content: question },
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Cheapest model
        messages,
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE,
        presence_penalty: 0,
        frequency_penalty: 0,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      
      // Return helpful fallback instead of failing
      return NextResponse.json({
        answer: getDemoFallbackAnswer(question, topicId),
        source: 'fallback-on-error',
        tokensUsed: 0,
      });
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content || 'I\'m not sure about that. Try the interactive lessons!';
    const tokensUsed = data.usage?.total_tokens || MAX_TOKENS;

    return NextResponse.json({
      answer,
      source: 'ai',
      tokensUsed,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Always return something useful, never crash
    return NextResponse.json({
      answer: "I'm having trouble right now. Try using the interactive lessons or practice problems!",
      source: 'error-fallback',
      tokensUsed: 0,
    });
  }
}

/**
 * Demo mode fallback - return helpful answer without API
 */
function getDemoFallbackAnswer(question: string, topicId?: string): string {
  const q = question.toLowerCase();

  // Pattern-based responses
  if (q.includes('help') || q.includes('stuck')) {
    return "I'd love to help! Try these steps: 1) Check the Explain tab for interactive visuals, 2) Use the practice problems with hints, 3) Watch the animated explainer. You've got this!";
  }

  if (q.includes('how') || q.includes('why')) {
    return "Great question! The interactive diagrams in the Explain tab can show you visually. Try dragging the sliders and watching how things change - it really helps understanding!";
  }

  if (q.includes('quiz') || q.includes('test')) {
    return "When you're ready, head to the Quiz tab to test your knowledge! Start with the Explain and Practice tabs first to build confidence.";
  }

  const topic = topicId ? getTopicById(topicId) : null;
  if (topic) {
    return `For ${topic.title}, I recommend starting with the interactive Explain tab! It breaks everything down step-by-step with visuals you can manipulate. Try it out!`;
  }

  return "I'm in demo mode right now, so I have limited answers. But the interactive lessons, practice problems, and quizzes can help with most geometry questions! Give them a try.";
}
