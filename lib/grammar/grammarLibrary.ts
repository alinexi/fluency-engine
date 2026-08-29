export type GrammarModuleId =
  | 'tenses'
  | 'conditionals'
  | 'modals'
  | 'connectors'
  | 'structure'
  | 'parts-of-speech';

export interface GrammarModuleInfo {
  id: GrammarModuleId;
  title: string;
  subtitle: string;
  description: string;
  color: string; // 'emerald' | 'violet' | 'teal' | 'amber' | 'indigo' | 'rose'
  iconName: string;
  drillCount: number;
}

export interface GrammarDrill {
  id: string;
  moduleId: GrammarModuleId;
  title: string;
  ruleFormula?: string;
  ruleSummary: string;
  difficultyLevel: 1 | 2 | 3; // 1 = A2-B1, 2 = B2, 3 = C1
  targetCategory: string;
  sentences: string[];
  explanation: string;
}

export const GRAMMAR_MODULES: GrammarModuleInfo[] = [
  {
    id: 'tenses',
    title: 'Tenses & Aspects',
    subtitle: 'Master time framing & precision',
    description: 'Drill past, present, future, perfect, and continuous aspects to express chronological actions accurately.',
    color: 'emerald',
    iconName: 'Clock',
    drillCount: 8,
  },
  {
    id: 'conditionals',
    title: 'Conditionals & Hypotheses',
    subtitle: 'Zero to Mixed Conditionals',
    description: 'Isolate cause-and-effect, hypothetical outcomes, and past regrets with precise clause structures.',
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
