export interface SessionMetrics {
  grossWpm: number;
  netWpm: number;
  accuracy: number; // 0 to 100
  totalKeystrokes: number;
  correctKeystrokes: number;
  uncorrectedErrors: number;
  timeElapsedSeconds: number;
  errorDistribution: Record<string, number>; // character -> error count
}

export function calculateMetrics(
  totalKeystrokes: number,
  errorsCount: number,
  correctCharsCount: number,
  startTime: number,
  endTime: number = Date.now(),
  history: Array<{ char: string; expected: string; isCorrect: boolean }> = []
): SessionMetrics {
  const timeElapsedSeconds = Math.max(1, Math.floor((endTime - startTime) / 1000));
  const timeElapsedMinutes = timeElapsedSeconds / 60;

  // Standard typing measurement: 1 word = 5 characters
  const grossWpm = Math.round((totalKeystrokes / 5) / timeElapsedMinutes) || 0;
  const netWpm = Math.max(0, Math.round(((totalKeystrokes - errorsCount) / 5) / timeElapsedMinutes)) || 0;

  const accuracy = totalKeystrokes > 0
    ? Math.max(0, Math.min(100, Number((((totalKeystrokes - errorsCount) / totalKeystrokes) * 100).toFixed(1))))
    : 100;

  const errorDistribution: Record<string, number> = {};
  history.forEach(h => {
    if (!h.isCorrect) {
      errorDistribution[h.expected] = (errorDistribution[h.expected] || 0) + 1;
    }
  });

  return {
    grossWpm,
    netWpm,
    accuracy,
    totalKeystrokes,
    correctKeystrokes: correctCharsCount,
    uncorrectedErrors: errorsCount,
    timeElapsedSeconds,
    errorDistribution,
  };
}

export interface DailyStreak {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
}

export function updateDailyStreak(existing: DailyStreak | null): DailyStreak {
  const today = new Date().toISOString().slice(0, 10);
  if (!existing) {
    return { currentStreak: 1, bestStreak: 1, lastActiveDate: today };
  }

  if (existing.lastActiveDate === today) {
    return existing;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const isConsecutive = existing.lastActiveDate === yesterday;

  const currentStreak = isConsecutive ? existing.currentStreak + 1 : 1;
  const bestStreak = Math.max(currentStreak, existing.bestStreak);

  return {
    currentStreak,
    bestStreak,
    lastActiveDate: today,
  };
}
