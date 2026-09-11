'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MessageCircle, 
  Mic, 
  MicOff, 
  Send, 
  X, 
  Volume2, 
  VolumeX,
  Settings,
  Loader2,
  Sparkles
} from 'lucide-react';
import { useSpeechRecognition } from '@/lib/chat/speech';
import { findKBAnswer, getCacheKey } from '@/lib/chat/knowledge-base';
import { canMakeRequest, recordUsage, getRemainingCapacity } from '@/lib/chat/budget';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  source?: 'local-kb' | 'cache' | 'ai';
  timestamp: Date;
}

interface ChatPanelProps {
  currentTopicId?: string;
  onOpenSettings?: () => void;
}

export function ChatPanel({ currentTopicId, onOpenSettings }: ChatPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    isListening,
    isSupported: speechSupported,
    startListening,
    stopListening,
    transcript,
  } = useSpeechRecognition();

  const capacity = getRemainingCapacity();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speak = (text: string) => {
    if (!ttsEnabled || typeof window === 'undefined') return;
    
    // Use Web Speech API for TTS
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 1. Try local knowledge base first (FREE)
      const kbAnswer = findKBAnswer(input, currentTopicId);
      if (kbAnswer) {
        const assistantMessage: Message = {
          id: `asst-${Date.now()}`,
          role: 'assistant',
          content: kbAnswer.answer,
          source: 'local-kb',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        speak(kbAnswer.answer);
        setIsLoading(false);
        return;
      }

      // 2. Check cache (FREE)
      const cacheKey = getCacheKey(input, currentTopicId);
      const cached = typeof window !== 'undefined' ? localStorage.getItem(cacheKey) : null;
      if (cached) {
        const assistantMessage: Message = {
          id: `asst-${Date.now()}`,
          role: 'assistant',
          content: cached,
          source: 'cache',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        speak(cached);
        setIsLoading(false);
        return;
      }

      // 3. Check budget before API call
      const budgetCheck = canMakeRequest();
      if (!budgetCheck.allowed) {
        const errorMessage: Message = {
          id: `asst-${Date.now()}`,
          role: 'assistant',
          content: `⚠️ ${budgetCheck.reason}\n\nTry: 1) Use the interactive lessons 2) Check practice problems 3) Review the explanation tab`,
          source: 'local-kb',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        setIsLoading(false);
        return;
      }

      // 4. API call (PAID - with strict limits)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: input,
          topicId: currentTopicId,
          history: messages.slice(-4).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Chat request failed');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: data.answer,
        source: data.source || 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      speak(data.answer);

      // Record usage
      if (data.tokensUsed) {
        recordUsage(data.tokensUsed);
      }

      // Cache the response
      if (typeof window !== 'undefined') {
        localStorage.setItem(cacheKey, data.answer);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: "I'm having trouble right now. Try using the interactive lessons or practice problems instead!",
        source: 'local-kb',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-40"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
        {capacity.percentage > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {capacity.requests}
          </Badge>
        )}
      </button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col shadow-2xl z-40 bg-white md:w-96 sm:w-full sm:right-0 sm:left-0 sm:bottom-0 sm:rounded-none sm:h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900">Geometry Tutor</h3>
        </div>
        <div className="flex items-center gap-2">
          {onOpenSettings && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onOpenSettings}
              className="h-8 w-8 p-0"
            >
              <Settings className="h-4 w-4" />
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setTtsEnabled(!ttsEnabled);
              if (ttsEnabled && typeof window !== 'undefined') {
                window.speechSynthesis.cancel();
              }
            }}
            className="h-8 w-8 p-0"
          >
            {ttsEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Usage Meter */}
      {capacity.percentage > 0 && (
        <div className="px-4 py-2 bg-blue-50 border-b">
          <div className="flex justify-between text-xs text-blue-900 mb-1">
            <span>AI questions today</span>
            <span>{capacity.requests} remaining</span>
          </div>
          <div className="h-1.5 bg-blue-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                capacity.percentage > 80
                  ? 'bg-red-500'
                  : capacity.percentage > 50
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${capacity.percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <Alert className="bg-indigo-50 border-indigo-200">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <AlertDescription className="text-indigo-900">
              <strong>Hi! I&apos;m your geometry tutor.</strong>
              <br />
              Ask me anything about {currentTopicId ? 'this topic' : 'geometry'}! I can explain concepts, help with problems, or answer your questions.
              {speechSupported && (
                <>
                  <br />
                  💡 Tip: Click the mic button to ask with your voice!
                </>
              )}
            </AlertDescription>
          </Alert>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              {message.role === 'assistant' && message.source && (
                <p className="text-xs opacity-70 mt-1">
                  {message.source === 'local-kb' && '💡 Free answer'}
                  {message.source === 'cache' && '⚡ Cached'}
                  {message.source === 'ai' && '🤖 AI'}
                </p>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
              <span className="text-sm text-gray-600">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        {!speechSupported && (
          <Alert className="mb-2 py-2">
            <AlertDescription className="text-xs">
              Voice input not available in this browser. Type your question below!
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a geometry question..."
              disabled={isLoading}
              className="w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {speechSupported && (
              <Button
                size="sm"
                variant="ghost"
                onClick={isListening ? stopListening : startListening}
                disabled={isLoading}
                className={`absolute right-1 top-1 h-8 w-8 p-0 ${
                  isListening ? 'bg-red-100 text-red-600' : ''
                }`}
              >
                {isListening ? (
                  <MicOff className="h-4 w-4 animate-pulse" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-2 text-center">
          Most answers are free! AI questions count toward your daily limit.
        </p>
      </div>
    </Card>
  );
}
