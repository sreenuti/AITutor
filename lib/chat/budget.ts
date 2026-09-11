/**
 * Budget and usage tracking for AI chat
 * Hard limits to prevent surprise bills
 */

const BUDGET_KEY = 'sahasra-chat-budget';
const USAGE_KEY = 'sahasra-chat-usage';

export interface BudgetSettings {
  dailyRequestLimit: number; // Max LLM calls per day
  dailyTokenLimit: number; // Max tokens per day (est.)
  isPaused: boolean; // Kill switch
}

export interface UsageStats {
  date: string; // YYYY-MM-DD
  requestCount: number;
  tokenCount: number; // Estimated
  lastReset: string; // ISO timestamp
}

const DEFAULT_BUDGET: BudgetSettings = {
  dailyRequestLimit: 20, // Conservative default
  dailyTokenLimit: 5000,
  isPaused: false,
};

/**
 * Get current budget settings
 */
export function getBudgetSettings(): BudgetSettings {
  if (typeof window === 'undefined') return DEFAULT_BUDGET;
  
  const stored = localStorage.getItem(BUDGET_KEY);
  if (!stored) return DEFAULT_BUDGET;
  
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_BUDGET;
  }
}

/**
 * Save budget settings
 */
export function saveBudgetSettings(settings: BudgetSettings): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BUDGET_KEY, JSON.stringify(settings));
}

/**
 * Get today's usage stats
 */
export function getTodayUsage(): UsageStats {
  if (typeof window === 'undefined') {
    return {
      date: new Date().toISOString().split('T')[0],
      requestCount: 0,
      tokenCount: 0,
      lastReset: new Date().toISOString(),
    };
  }
  
  const stored = localStorage.getItem(USAGE_KEY);
  const today = new Date().toISOString().split('T')[0];
  
  if (!stored) {
    return {
      date: today,
      requestCount: 0,
      tokenCount: 0,
      lastReset: new Date().toISOString(),
    };
  }
  
  try {
    const usage: UsageStats = JSON.parse(stored);
    
    // Reset if it's a new day
    if (usage.date !== today) {
      const newUsage = {
        date: today,
        requestCount: 0,
        tokenCount: 0,
        lastReset: new Date().toISOString(),
      };
      localStorage.setItem(USAGE_KEY, JSON.stringify(newUsage));
      return newUsage;
    }
    
    return usage;
  } catch {
    return {
      date: today,
      requestCount: 0,
      tokenCount: 0,
      lastReset: new Date().toISOString(),
    };
  }
}

/**
 * Record API usage
 */
export function recordUsage(tokens: number): void {
  if (typeof window === 'undefined') return;
  
  const usage = getTodayUsage();
  usage.requestCount += 1;
  usage.tokenCount += tokens;
  
  localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
}

/**
 * Check if budget allows a new request
 */
export function canMakeRequest(): {
  allowed: boolean;
  reason?: string;
} {
  const budget = getBudgetSettings();
  
  if (budget.isPaused) {
    return {
      allowed: false,
      reason: 'AI chat is paused. Check the settings to unpause.',
    };
  }
  
  const usage = getTodayUsage();
  
  if (usage.requestCount >= budget.dailyRequestLimit) {
    return {
      allowed: false,
      reason: `Daily limit reached (${budget.dailyRequestLimit} questions). The limit resets tomorrow, or ask a parent to adjust it in settings.`,
    };
  }
  
  if (usage.tokenCount >= budget.dailyTokenLimit) {
    return {
      allowed: false,
      reason: `Daily token limit reached. Try the interactive lessons or ask a parent to adjust the limit in settings.`,
    };
  }
  
  return { allowed: true };
}

/**
 * Get remaining capacity
 */
export function getRemainingCapacity(): {
  requests: number;
  tokens: number;
  percentage: number;
} {
  const budget = getBudgetSettings();
  const usage = getTodayUsage();
  
  const requestsRemaining = Math.max(0, budget.dailyRequestLimit - usage.requestCount);
  const tokensRemaining = Math.max(0, budget.dailyTokenLimit - usage.tokenCount);
  const percentage = Math.round((usage.requestCount / budget.dailyRequestLimit) * 100);
  
  return {
    requests: requestsRemaining,
    tokens: tokensRemaining,
    percentage: Math.min(100, percentage),
  };
}

/**
 * Reset usage (admin/parent only)
 */
export function resetUsage(): void {
  if (typeof window === 'undefined') return;
  
  const today = new Date().toISOString().split('T')[0];
  const newUsage = {
    date: today,
    requestCount: 0,
    tokenCount: 0,
    lastReset: new Date().toISOString(),
  };
  
  localStorage.setItem(USAGE_KEY, JSON.stringify(newUsage));
}
