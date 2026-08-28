import { create } from 'zustand';
import { parseText, ParsedText } from '@/lib/engine/parser';
import {
  StrictMatchState,
  createInitialMatchState,
  handleKeystroke,
} from '@/lib/engine/strictMatch';
import {
  SessionMetrics,
  calculateMetrics,
  DailyStreak,
  updateDailyStreak,
} from '@/lib/engine/metrics';

export interface SavedSession {
  id: string;
  title: string;
  date: string;
  metrics: SessionMetrics;
}

interface StudioState {
  parsedText: ParsedText | null;
  matchState: StrictMatchState | null;
  startTime: number | null;
  endTime: number | null;
  strictMode: boolean;
  showCharBoxes: boolean;
  showActiveHighlight: boolean;
  isPaused: boolean;
  metrics: SessionMetrics | null;
  sessionHistory: SavedSession[];
  streak: DailyStreak;

  // Actions
  loadText: (text: string, title?: string) => void;
  processKey: (key: string) => void;
  toggleStrictMode: () => void;
  toggleCharBoxes: () => void;
  toggleActiveHighlight: () => void;
  togglePause: () => void;
  resetSession: () => void;
  clearLoadedText: () => void;
}

export const useStudioStore = create<StudioState>((set, get) => ({
  parsedText: null,
  matchState: null,
  startTime: null,
  endTime: null,
  strictMode: true,
  showCharBoxes: true,
  showActiveHighlight: true,
  isPaused: false,
  metrics: null,
  sessionHistory: [],
  streak: { currentStreak: 0, bestStreak: 0, lastActiveDate: '' },

  loadText: (text: string, title = 'Uploaded Document') => {
    const parsed = parseText(text, title);
    set({
      parsedText: parsed,
      matchState: createInitialMatchState(parsed.fullText.length),
      startTime: null,
      endTime: null,
      isPaused: false,
      metrics: null,
    });
  },

  processKey: (key: string) => {
    const { parsedText, matchState, startTime, strictMode, isPaused, streak, sessionHistory } = get();
    if (!parsedText || !matchState || isPaused) return;

    const nextMatchState = handleKeystroke(matchState, parsedText.fullText, key, strictMode);

    // If key didn't produce any keystroke change (e.g. modifier keys or backspace at start), return
    if (nextMatchState === matchState || (nextMatchState.totalKeystrokes === 0 && matchState.totalKeystrokes === 0)) {
      return;
    }

    // Set startTime ONLY on the first valid character typed
    const now = Date.now();
    const effectiveStartTime = startTime ?? now;
    
    let nextEndTime = null;
    let finalMetrics = null;
    let nextStreak = streak;
    let nextHistory = sessionHistory;

    if (nextMatchState.isCompleted && !matchState.isCompleted) {
      nextEndTime = now;
      finalMetrics = calculateMetrics(
        nextMatchState.totalKeystrokes,
        nextMatchState.errorsCount,
        nextMatchState.currentIndex,
        effectiveStartTime,
        nextEndTime,
        nextMatchState.history
      );

      nextStreak = updateDailyStreak(streak);

      const newSession: SavedSession = {
        id: `sess_${Date.now()}`,
        title: parsedText.title,
        date: new Date().toISOString(),
        metrics: finalMetrics,
      };

      nextHistory = [newSession, ...sessionHistory];

      // Auto-save to user profile database if logged in
      if (typeof window !== 'undefined') {
        const { useAuthStore } = require('./authStore');
        const { localDbAdapter } = require('@/lib/db/localAdapter');
        const user = useAuthStore.getState().user;
        if (user) {
          localDbAdapter.saveStudioSession({
            userId: user.id,
            title: parsedText.title,
            date: newSession.date,
            metrics: finalMetrics,
          }).then(() => useAuthStore.getState().refreshHistoryAndStats());
        }
      }
    }

    set({
      matchState: nextMatchState,
      startTime: effectiveStartTime,
      endTime: nextEndTime,
      metrics: finalMetrics,
      streak: nextStreak,
      sessionHistory: nextHistory,
    });
  },

  toggleStrictMode: () => set(state => ({ strictMode: !state.strictMode })),
  toggleCharBoxes: () => set(state => ({ showCharBoxes: !state.showCharBoxes })),
  toggleActiveHighlight: () => set(state => ({ showActiveHighlight: !state.showActiveHighlight })),
  togglePause: () => set(state => ({ isPaused: !state.isPaused })),

  resetSession: () => {
    const { parsedText } = get();
    if (!parsedText) return;
    set({
      matchState: createInitialMatchState(parsedText.fullText.length),
      startTime: null,
      endTime: null,
      isPaused: false,
      metrics: null,
    });
  },

  clearLoadedText: () => {
    set({
      parsedText: null,
      matchState: null,
      startTime: null,
      endTime: null,
      isPaused: false,
      metrics: null,
    });
  },
}));
