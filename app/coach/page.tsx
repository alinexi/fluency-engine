'use client';

import React, { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useCoachStore } from '@/store/coachStore';

import { PROMPT_CATALOG } from '@/prompts/prompts';
import { ExamMode } from '@/lib/plugins/types';
import { WritingEditor } from '@/components/coaching/WritingEditor';
import { cn } from '@/lib/utils';

const EXAM_MODES: { id: ExamMode; title: string; desc: string; rubric: string }[] = [
  {
    id: 'ielts-task2',
    title: 'IELTS Writing Task 2',
    desc: 'Academic & General Training opinion/essay prompt (Band 0–9).',
    rubric: '250 words min · 40 mins',
  },
  {
    id: 'toefl-independent',
    title: 'TOEFL Independent',
    desc: 'Personal opinion essay evaluated against TOEFL 0–30 scale.',
    rubric: '300 words min · 30 mins',
  },
  {
    id: 'toefl-integrated',
    title: 'TOEFL Integrated',
    desc: 'Synthesizing reading & listening passage arguments.',
    rubric: '150–225 words · 20 mins',
  },
  {
    id: 'academic-b1',
    title: 'Academic English B1',
    desc: 'Targeting intermediate CEFR B1 clarity and structural cohesion.',
    rubric: '180 words min · 25 mins',
  },
  {
    id: 'academic-b2',
    title: 'Academic English B2',
    desc: 'Targeting upper-intermediate argument development.',
    rubric: '220 words min · 35 mins',
  },
  {
    id: 'academic-c1',
    title: 'Academic English C1',
    desc: 'Targeting advanced academic vocabulary & complex syntax.',
    rubric: '350 words min · 45 mins',
  },
];

export default function CoachPage() {
  const { selectedMode, setMode, activePrompt, setPrompt } = useCoachStore();

  // Filter prompts for selected mode
  const filteredPrompts = PROMPT_CATALOG.filter((p) => p.mode === selectedMode);

  // Auto-select first prompt when mode changes
  useEffect(() => {
    if (filteredPrompts.length > 0) {
      setPrompt(filteredPrompts[0]);
    }
  }, [selectedMode]);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
      
      {/* Header Banner */}
      <div className="border-b border-[var(--border-color)] pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--brand-violet)] mb-2">
          <Sparkles className="h-4 w-4" />
          FEATURE 2 · AI WRITING COACH
        </div>
        <h1 className="text-3xl font-extrabold text-[var(--text-main)] tracking-tight">AI Examiner & Essay Evaluation</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">
          Select an exam mode or academic target, write your response under timed conditions, and receive instant Band 9 multi-agent feedback.
        </p>
      </div>

      {/* Exam Mode Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-[var(--text-main)] font-mono">1. SELECT EXAM MODE / TARGET</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXAM_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setMode(mode.id)}
              className={cn(
                'flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-200',
                selectedMode === mode.id
                  ? 'border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10'
                  : 'border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)]'
              )}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[var(--text-main)] text-base">{mode.title}</h4>
                  {selectedMode === mode.id && (
                    <span className="h-2 w-2 rounded-full bg-[var(--brand-violet)] animate-pulse" />
                  )}
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">{mode.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border-color)] text-[11px] font-mono text-[var(--brand-violet)] font-semibold">
                {mode.rubric}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Selector */}
      {filteredPrompts.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">
          <h3 className="text-sm font-semibold text-[var(--text-main)] font-mono">2. CHOOSE ESSAY PROMPT</h3>
          <div className="flex flex-wrap gap-3">
            {filteredPrompts.map((p) => (
              <button
                key={p.id}
                onClick={() => setPrompt(p)}
                className={cn(
                  'rounded-xl px-4 py-2.5 text-xs font-mono transition-all border',
                  activePrompt?.id === p.id
                    ? 'bg-violet-600 text-white border-violet-500 font-bold shadow-md'
                    : 'bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border-color)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)]'
                )}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Writing Editor */}
      <div className="pt-4 border-t border-[var(--border-color)]">
        <h3 className="text-sm font-semibold text-[var(--text-main)] font-mono mb-4">3. WRITE ESSAY RESPONSE</h3>
        <WritingEditor />
      </div>

    </div>
  );
}

