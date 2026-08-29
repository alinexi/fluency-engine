export type GrammarModuleId =
  | 'tenses'
  | 'conditionals'
  | 'modals'
  | 'connectors'
  | 'structure'
  | 'parts-of-speech';

export type LevelTier = 'guided' | 'fading' | 'stress';

export interface LevelConstraints {
  targetWpm?: number;
  requiredAccuracyPercent?: number;
  perfectStreakTarget?: number;
  hasIrregularVerbs?: boolean;
  hasQuestions?: boolean;
  hasNegatives?: boolean;
}

export interface GrammarLevel {
  level: number; // 1 to 30
  tier: LevelTier; // 'guided' (1-10) | 'fading' (11-20) | 'stress' (21-30)
  sentences: string[];
  showFormula: boolean; // true for 1-10, false for 11-30
  constraints?: LevelConstraints;
}

export interface GrammarDrill {
  id: string;
  moduleId: GrammarModuleId;
  title: string;
  ruleFormula?: string;
  ruleSummary: string;
  difficultyLabel: string; // e.g., "A1-A2 Foundation" | "B1-B2 Intermediate" | "C1 Advanced"
  targetCategory: string;
  explanation: string;
  levels: GrammarLevel[];
}

export interface GrammarModuleInfo {
  id: GrammarModuleId;
  title: string;
  subtitle: string;
  description: string;
  color: string; // 'emerald' | 'violet' | 'teal' | 'amber' | 'indigo' | 'rose'
  iconName: string;
  drillCount: number;
}

export const GRAMMAR_MODULES: GrammarModuleInfo[] = [
  {
    id: 'tenses',
    title: 'Tenses & Aspects',
    subtitle: 'Master time framing & precision',
    description: 'Progress from basic facts to complex past perfect and continuous aspects with 30-level progressive drills.',
    color: 'emerald',
    iconName: 'Clock',
    drillCount: 8,
  },
  {
    id: 'conditionals',
    title: 'Conditionals & Hypotheses',
    subtitle: 'Zero to Mixed Conditionals',
    description: 'Isolate cause-and-effect, hypothetical outcomes, and past regrets across 30 levels of sentence scaffolding.',
    color: 'violet',
    iconName: 'GitFork',
    drillCount: 5,
  },
  {
    id: 'modals',
    title: 'Modal Auxiliary Verbs',
    subtitle: 'Nuance, obligation & deduction',
    description: 'Master subtle degrees of certainty, permission, recommendations, and past modal deductions.',
    color: 'teal',
    iconName: 'ShieldAlert',
    drillCount: 6,
  },
  {
    id: 'connectors',
    title: 'Connecting Words & Cohesion',
    subtitle: 'Conjunctions & transitions',
    description: 'Drill contrastive, causal, additive, and concessive linking words essential for Band 9 essay cohesion.',
    color: 'amber',
    iconName: 'Link2',
    drillCount: 5,
  },
  {
    id: 'structure',
    title: 'Sentence Structure',
    subtitle: 'Complex, relative & passive forms',
    description: 'Train muscle memory for compound-complex sentences, relative clauses, passive voice, and cleft sentences.',
    color: 'indigo',
    iconName: 'Layers',
    drillCount: 6,
  },
  {
    id: 'parts-of-speech',
    title: 'Parts of Speech & Grammar Mechanics',
    subtitle: 'Adjectives, prepositions & articles',
    description: 'Solidify fundamental mechanics including adjective ordering, dependent prepositions, and article usage.',
    color: 'rose',
    iconName: 'Sparkles',
    drillCount: 5,
  },
];
