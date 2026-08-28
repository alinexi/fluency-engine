export type ExamMode =
  | 'ielts-task2'
  | 'toefl-independent'
  | 'toefl-integrated'
  | 'academic-b1'
  | 'academic-b2'
  | 'academic-c1';

export interface BandScore {
  score: number; // e.g. 7.5 or 24/30 or B2 score
  maxScore: number;
  label: string;
  feedback: string;
}

export interface CoachingCard {
  id: string;
  type: 'grammar' | 'lexical' | 'coherence' | 'taskAchievement';
  originalSentence: string;
  suggestedRewrite: string;
  explanation: string;
  severity: 'low' | 'medium' | 'high';
  treeNodes?: {
    label: string;
    type: 'subject' | 'verb' | 'object' | 'modifier' | 'error';
    children?: any[];
  };
}

export interface VocabToken {
  word: string;
  cefr: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  suggestion?: string;
}

export interface EvalResult {
  overallBand: number;
  overallMax: number;
  examMode: ExamMode;
  taskAchievement: BandScore;
  coherenceCohesion: BandScore;
  lexicalResource: BandScore;
  grammaticalRange: BandScore;
  summaryFeedback: string;
  coachingCards: CoachingCard[];
  vocabularyMap: VocabToken[];
}

export interface CoachingPlugin {
  id: string;
  name: string;
  description: string;
  requiresApiKey: boolean;
  evaluate(essay: string, promptText: string, mode: ExamMode, apiKey?: string, baseUrl?: string): Promise<EvalResult>;
}
