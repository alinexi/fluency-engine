import { create } from 'zustand';
import { EvalResult, ExamMode } from '@/lib/plugins/types';

export interface PromptItem {
  id: string;
  mode: ExamMode;
  title: string;
  promptText: string;
  timeLimitMinutes: number;
  minWords: number;
  maxWords?: number;
}

interface CoachState {
  selectedMode: ExamMode;
  activePrompt: PromptItem | null;
  essayText: string;
  isEvaluating: boolean;
  evaluationError: string | null;
  lastResult: EvalResult | null;
  activeProvider: string;
  ollamaBaseUrl: string;

  // Actions
  setMode: (mode: ExamMode) => void;
  setPrompt: (prompt: PromptItem) => void;
  setEssayText: (text: string) => void;
  setIsEvaluating: (isEvaluating: boolean) => void;
  setError: (err: string | null) => void;
  setResult: (res: EvalResult | null) => void;
  setActiveProvider: (provider: string) => void;
  setOllamaBaseUrl: (url: string) => void;
}

export const useCoachStore = create<CoachState>((set) => ({
  selectedMode: 'ielts-task2',
  activePrompt: null,
  essayText: '',
  isEvaluating: false,
  evaluationError: null,
  lastResult: null,
  activeProvider: 'openai',
  ollamaBaseUrl: 'http://localhost:11434',

  setMode: (mode) => set({ selectedMode: mode }),
  setPrompt: (prompt) => set({ activePrompt: prompt }),
  setEssayText: (text) => set({ essayText: text }),
  setIsEvaluating: (isEvaluating) => set({ isEvaluating }),
  setError: (err) => set({ evaluationError: err }),
  setResult: (res) => set({ lastResult: res, isEvaluating: false, evaluationError: null }),
  setActiveProvider: (provider) => set({ activeProvider: provider }),
  setOllamaBaseUrl: (url) => set({ ollamaBaseUrl: url }),
}));
