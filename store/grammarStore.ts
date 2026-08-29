import { create } from 'zustand';
import { GrammarDrill, GrammarLevel } from '@/lib/grammar/grammarLibrary';
import { GRAMMAR_DRILLS } from '@/lib/grammar/grammarData';

export interface SentenceResult {
  sentenceIndex: number;
  sentenceText: string;
  netWpm: number;
  accuracy: number;
  timeElapsedSeconds: number;
  hadBackspaces: boolean;
}

interface GrammarStoreState {
  drill: GrammarDrill | null;
  currentLevel: number; // 1 to 30
  currentLevelData: GrammarLevel | null;
  currentSentenceIndex: number;
  sentenceResults: SentenceResult[];
  isSentenceCompleted: boolean;
  isDrillCompleted: boolean;
  
  // Scaffolding & Streak State
  perfectStreak: number; // consecutive sentences typed without backspace
  hasPressedBackspaceInSentence: boolean;
  
  // Actions
  loadDrillLevel: (drillId: string, levelNum?: number) => boolean;
  recordSentenceCompletion: (netWpm: number, accuracy: number, timeElapsedSeconds: number) => void;
  registerBackspace: () => void;
  advanceToNextSentence: () => void;
  advanceToNextLevel: () => void;
  resetDrillLevel: () => void;
}

export const useGrammarStore = create<GrammarStoreState>((set, get) => ({
  drill: null,
  currentLevel: 1,
  currentLevelData: null,
  currentSentenceIndex: 0,
  sentenceResults: [],
  isSentenceCompleted: false,
  isDrillCompleted: false,
  perfectStreak: 0,
  hasPressedBackspaceInSentence: false,

  loadDrillLevel: (drillId: string, levelNum = 1) => {
    const foundDrill = GRAMMAR_DRILLS.find(d => d.id === drillId);
    if (!foundDrill) return false;

    const targetLevelIndex = Math.max(1, Math.min(30, levelNum));
    const levelData = foundDrill.levels.find(l => l.level === targetLevelIndex) || foundDrill.levels[0];

    set({
      drill: foundDrill,
      currentLevel: levelData.level,
      currentLevelData: levelData,
      currentSentenceIndex: 0,
      sentenceResults: [],
      isSentenceCompleted: false,
      isDrillCompleted: false,
      perfectStreak: 0,
      hasPressedBackspaceInSentence: false,
    });

    return true;
  },

  registerBackspace: () => {
    set({
      hasPressedBackspaceInSentence: true,
      perfectStreak: 0, // Reset perfect streak on backspace use
    });
  },

  recordSentenceCompletion: (netWpm: number, accuracy: number, timeElapsedSeconds: number) => {
    const { currentLevelData, currentSentenceIndex, sentenceResults, hasPressedBackspaceInSentence, perfectStreak } = get();
    if (!currentLevelData) return;

    const currentText = currentLevelData.sentences[currentSentenceIndex];
    const hadBackspaces = hasPressedBackspaceInSentence;

    const newResult: SentenceResult = {
      sentenceIndex: currentSentenceIndex,
      sentenceText: currentText,
      netWpm,
      accuracy,
      timeElapsedSeconds,
      hadBackspaces,
    };

    const nextResults = [...sentenceResults, newResult];
    const isLastSentenceInLevel = currentSentenceIndex >= currentLevelData.sentences.length - 1;
    const newStreak = hadBackspaces ? 0 : perfectStreak + 1;

    set({
      sentenceResults: nextResults,
      isSentenceCompleted: true,
      isDrillCompleted: isLastSentenceInLevel,
      perfectStreak: newStreak,
    });
  },

  advanceToNextSentence: () => {
    const { currentLevelData, currentSentenceIndex, isDrillCompleted } = get();
    if (!currentLevelData || isDrillCompleted) return;

    set({
      currentSentenceIndex: currentSentenceIndex + 1,
      isSentenceCompleted: false,
      hasPressedBackspaceInSentence: false,
    });
  },

  advanceToNextLevel: () => {
    const { drill, currentLevel } = get();
    if (!drill) return;

    const nextLevelNum = Math.min(30, currentLevel + 1);
    const levelData = drill.levels.find(l => l.level === nextLevelNum) || drill.levels[0];

    set({
      currentLevel: nextLevelNum,
      currentLevelData: levelData,
      currentSentenceIndex: 0,
      sentenceResults: [],
      isSentenceCompleted: false,
      isDrillCompleted: false,
      hasPressedBackspaceInSentence: false,
    });
  },

  resetDrillLevel: () => {
    const { currentLevelData } = get();
    if (!currentLevelData) return;

    set({
      currentSentenceIndex: 0,
      sentenceResults: [],
      isSentenceCompleted: false,
      isDrillCompleted: false,
      hasPressedBackspaceInSentence: false,
    });
  },
}));
