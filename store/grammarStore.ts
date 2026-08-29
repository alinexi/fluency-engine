import { create } from 'zustand';
import { GrammarDrill } from '@/lib/grammar/grammarLibrary';
import { GRAMMAR_DRILLS } from '@/lib/grammar/grammarData';

export interface SentenceResult {
  sentenceIndex: number;
  sentenceText: string;
  netWpm: number;
  accuracy: number;
  timeElapsedSeconds: number;
}

interface GrammarStoreState {
  drill: GrammarDrill | null;
  currentSentenceIndex: number;
  sentenceResults: SentenceResult[];
  isSentenceCompleted: boolean;
  isDrillCompleted: boolean;
  
  // Actions
  loadDrill: (drillId: string) => boolean;
  recordSentenceCompletion: (netWpm: number, accuracy: number, timeElapsedSeconds: number) => void;
  advanceToNextSentence: () => void;
  resetDrill: () => void;
}

export const useGrammarStore = create<GrammarStoreState>((set, get) => ({
  drill: null,
  currentSentenceIndex: 0,
  sentenceResults: [],
  isSentenceCompleted: false,
  isDrillCompleted: false,

  loadDrill: (drillId: string) => {
    const found = GRAMMAR_DRILLS.find(d => d.id === drillId);
    if (!found) return false;

    set({
      drill: found,
      currentSentenceIndex: 0,
      sentenceResults: [],
      isSentenceCompleted: false,
      isDrillCompleted: false,
    });
    return true;
  },

  recordSentenceCompletion: (netWpm: number, accuracy: number, timeElapsedSeconds: number) => {
    const { drill, currentSentenceIndex, sentenceResults } = get();
    if (!drill) return;

    const currentText = drill.sentences[currentSentenceIndex];
    const newResult: SentenceResult = {
      sentenceIndex: currentSentenceIndex,
      sentenceText: currentText,
      netWpm,
      accuracy,
      timeElapsedSeconds,
    };

    const nextResults = [...sentenceResults, newResult];
    const isLast = currentSentenceIndex >= drill.sentences.length - 1;

    set({
      sentenceResults: nextResults,
      isSentenceCompleted: true,
      isDrillCompleted: isLast,
    });
  },

  advanceToNextSentence: () => {
    const { drill, currentSentenceIndex, isDrillCompleted } = get();
    if (!drill || isDrillCompleted) return;

    set({
      currentSentenceIndex: currentSentenceIndex + 1,
      isSentenceCompleted: false,
    });
  },

  resetDrill: () => {
    set({
      currentSentenceIndex: 0,
      sentenceResults: [],
      isSentenceCompleted: false,
      isDrillCompleted: false,
    });
  },
}));
