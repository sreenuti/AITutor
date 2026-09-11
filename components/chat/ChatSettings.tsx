'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  DollarSign, 
  Shield, 
  TrendingDown,
  AlertCircle,
  Info
} from 'lucide-react';
import {
  getBudgetSettings,
  saveBudgetSettings,
  getTodayUsage,
  resetUsage,
  type BudgetSettings,
} from '@/lib/chat/budget';

interface ChatSettingsProps {
  onClose?: () => void;
}

export function ChatSettings({ onClose }: ChatSettingsProps) {
  const [settings, setSettings] = useState<BudgetSettings>(getBudgetSettings());
  const [usage, setUsage] = useState(getTodayUsage());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getBudgetSettings());
    setUsage(getTodayUsage());
  }, []);

  const handleSave = () => {
    saveBudgetSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Reset today\'s usage? This will clear the request count.')) {
      resetUsage();
      setUsage(getTodayUsage());
    }
  };

  const estimatedCostPerMonth = (settings.dailyRequestLimit * 30 * 0.002).toFixed(2);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-600" />
            <CardTitle>Parent Cost Controls</CardTitle>
          </div>
          <CardDescription>
            Set budget limits to prevent surprise AI bills
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Current Usage */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Today&apos;s Usage</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-900">{usage.requestCount}</div>
                <div className="text-sm text-blue-700">AI Questions</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-900">{usage.tokenCount}</div>
                <div className="text-sm text-purple-700">Tokens Used</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Last reset: {new Date(usage.lastReset).toLocaleString()}
            </p>
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              Reset Usage (Admin)
            </Button>
          </div>

          {/* Daily Limits */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Daily Limits</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  AI Questions per Day
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={settings.dailyRequestLimit}
                  onChange={(e) =>
                    setSettings({ ...settings, dailyRequestLimit: Number(e.target.value) })
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>5</span>
                  <Badge variant="outline" className="font-mono">
                    {settings.dailyRequestLimit}
                  </Badge>
                  <span>100</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  ⚠️ Default is 20. Most students use 5-15/day with free local answers.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Token Budget per Day
                </label>
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="1000"
                  value={settings.dailyTokenLimit}
                  onChange={(e) =>
                    setSettings({ ...settings, dailyTokenLimit: Number(e.target.value) })
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>1k</span>
                  <Badge variant="outline" className="font-mono">
                    {(settings.dailyTokenLimit / 1000).toFixed(0)}k
                  </Badge>
                  <span>20k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kill Switch */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Emergency Controls</h3>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Pause AI Chat</p>
                <p className="text-sm text-gray-600">Use local answers only</p>
              </div>
              <Button
                onClick={() => setSettings({ ...settings, isPaused: !settings.isPaused })}
                variant={settings.isPaused ? 'destructive' : 'outline'}
              >
                {settings.isPaused ? 'Paused' : 'Active'}
              </Button>
            </div>
          </div>

          {/* Cost Estimate */}
          <Alert className="bg-green-50 border-green-200">
            <DollarSign className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-900">
              <strong>Estimated cost:</strong> ~${estimatedCostPerMonth}/month at current limits
              <br />
              <span className="text-xs">
                Most answers are FREE (local knowledge base). Only AI fallback questions use the API.
              </span>
            </AlertDescription>
          </Alert>

          {/* Info */}
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900 text-xs">
              <strong>How it works:</strong> The app tries local answers first (FREE), then cache (FREE), then AI (costs ~$0.002/question). Budget limits reset daily at midnight.
            </AlertDescription>
          </Alert>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            size="lg"
          >
            {saved ? '✓ Saved!' : 'Save Settings'}
          </Button>

          {onClose && (
            <Button onClick={onClose} variant="outline" className="w-full">
              Close
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Cost Model Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-green-600" />
            <CardTitle className="text-base">Token-Stingy Architecture</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
              FREE
            </Badge>
            <div>
              <p className="font-medium">Local Knowledge Base</p>
              <p className="text-xs text-gray-600">50+ common geometry questions answered instantly</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
              FREE
            </Badge>
            <div>
              <p className="font-medium">Response Cache</p>
              <p className="text-xs text-gray-600">Previous answers served from localStorage</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
              FREE
            </Badge>
            <div>
              <p className="font-medium">Speech Recognition</p>
              <p className="text-xs text-gray-600">Browser Web Speech API (Chrome/Chromebook)</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
              PAID
            </Badge>
            <div>
              <p className="font-medium">AI Fallback</p>
              <p className="text-xs text-gray-600">Only when local answers don't match (~$0.002/question)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
