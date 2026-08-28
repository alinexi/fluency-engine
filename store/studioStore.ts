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

const PREFS_KEY = 'typecoach_studio_prefs';

function loadSavedPrefs() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function savePrefs(prefs: Record<string, boolean>) {
  if (typeof window === 'undefined') return;
  try {
    const existing = loadSavedPrefs();
    localStorage.setItem(PREFS_KEY, JSON.stringify({ ...existing, ...prefs }));
  } catch {
    // ignore
  }
}

interface StudioState {
  parsedText: ParsedText | null;
  matchState: StrictMatchState | null;
  startTime: number | null;
  endTime: number | null;
  strictMode: boolean;
  showCharBoxes: boolean;
  showActiveHighlight: boolean;
  boldTypedText: boolean;
  isPaused: boolean;
  metrics: SessionMetrics | null;
  sessionHistory: SavedSession[];
  streak: DailyStreak;
  activePromptId: string | null;

  // Actions
  loadText: (text: string, title?: string, promptId?: string) => void;
  processKey: (key: string) => void;
  toggleStrictMode: () => void;
  toggleCharBoxes: () => void;
  toggleActiveHighlight: () => void;
  toggleBoldTypedText: () => void;
  togglePause: () => void;
  resetSession: () => void;
  clearLoadedText: () => void;
}

const savedPrefs = loadSavedPrefs();

export const useStudioStore = create<StudioState>((set, get) => ({
  parsedText: null,
  matchState: null,
  startTime: null,
  endTime: null,
  strictMode: savedPrefs.strictMode ?? true,
  showCharBoxes: savedPrefs.showCharBoxes ?? true,
  showActiveHighlight: savedPrefs.showActiveHighlight ?? true,
  boldTypedText: savedPrefs.boldTypedText ?? true,
  isPaused: false,
  metrics: null,
  sessionHistory: [],
  streak: { currentStreak: 0, bestStreak: 0, lastActiveDate: '' },
  activePromptId: null,

  loadText: (text: string, title = 'Uploaded Document', promptId?: string) => {
    const parsed = parseText(text, title);
    set({
      parsedText: parsed,
      matchState: createInitialMatchState(parsed.fullText.length),
      startTime: null,
      endTime: null,
      isPaused: false,
      metrics: null,
      activePromptId: promptId ?? null,
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
    
    let nextEndTime: number | null = null;
    let finalMetrics: SessionMetrics | null = null;
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
        const { activePromptId } = get();
        Promise.all([
          import('./authStore'),
          import('@/lib/db/localAdapter'),
        ]).then(([{ useAuthStore }, { localDbAdapter }]) => {
          const user = useAuthStore.getState().user;
          if (user && finalMetrics) {
            localDbAdapter.saveStudioSession({
              userId: user.id,
              title: parsedText.title,
              date: newSession.date,
              metrics: finalMetrics,
              promptId: activePromptId ?? undefined,
            }).then(() => useAuthStore.getState().refreshHistoryAndStats());
          }
        });
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

  toggleStrictMode: () => set(state => {
    const next = !state.strictMode;
    savePrefs({ strictMode: next });
    return { strictMode: next };
  }),
  toggleCharBoxes: () => set(state => {
    const next = !state.showCharBoxes;
    savePrefs({ showCharBoxes: next });
    return { showCharBoxes: next };
  }),
  toggleActiveHighlight: () => set(state => {
    const next = !state.showActiveHighlight;
    savePrefs({ showActiveHighlight: next });
    return { showActiveHighlight: next };
  }),
  toggleBoldTypedText: () => set(state => {
    const next = !state.boldTypedText;
    savePrefs({ boldTypedText: next });
    return { boldTypedText: next };
  }),
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
      activePromptId: null,
    });
  },
}));
