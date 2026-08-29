'use client';

import React from 'react';
import Link from 'next/link';
import { use } from 'react';
import { ArrowLeft, ChevronRight, Layers, Play, Zap, Award, CheckCircle2 } from 'lucide-react';
import { GRAMMAR_MODULES, GrammarModuleId } from '@/lib/grammar/grammarLibrary';
import { GRAMMAR_DRILLS } from '@/lib/grammar/grammarData';
import { cn } from '@/lib/utils';

export default function GrammarModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = use(params);
  const moduleInfo = GRAMMAR_MODULES.find(m => m.id === moduleId as GrammarModuleId);
  const drills = GRAMMAR_DRILLS.filter(d => d.moduleId === moduleId);

  if (!moduleInfo) {
    return (
      <div className="py-20 text-center text-zinc-500">
        <p className="text-lg font-semibold">Grammar module not found.</p>
        <Link href="/library/grammar" className="mt-4 inline-block text-sm text-violet-500 hover:underline">← Back to Grammar Library</Link>
      </div>
    );
  }

  const difficultyLabel = (lvl: number) => {
    if (lvl === 1) return { text: 'Foundation (A2-B1)', class: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' };
    if (lvl === 2) return { text: 'Intermediate (B2)', class: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' };
    return { text: 'Advanced (C1)', class: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' };
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <Link href="/library" className="hover:text-violet-500 transition-colors">Library</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/library/grammar" className="hover:text-violet-500 transition-colors">Grammar Library</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-zinc-900 dark:text-white font-bold">{moduleInfo.title}</span>
      </div>

      <Link href="/library/grammar" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-violet-500 transition-colors -mt-4">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Modules
      </Link>

      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-violet-500 uppercase tracking-wider">
          <Layers className="h-4 w-4" /> MODULE DRILLS
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {moduleInfo.title}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-3xl leading-relaxed">
          {moduleInfo.description} Select a drill below to practice sentence-by-sentence pattern typing.
        </p>
      </div>

      {/* Drills List Grid */}
      {drills.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-12 text-center text-sm text-zinc-500">
          Drills for this module are coming soon!
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {drills.map((drill) => {
            const diff = difficultyLabel(drill.difficultyLevel);

            return (
              <div
                key={drill.id}
                className="group flex flex-col justify-between rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 p-6 backdrop-blur-xl hover:border-violet-500/40 transition-all hover:shadow-xl space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={cn('rounded-full px-3 py-0.5 text-[10px] font-mono font-bold border uppercase', diff.class)}>
                      {diff.text}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {drill.sentences.length} Sentences
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-violet-500 transition-colors">
                    {drill.title}
                  </h3>

                  {/* Formula Badge */}
                  {drill.ruleFormula && (
                    <div className="rounded-xl bg-violet-500/10 border border-violet-500/20 px-3.5 py-2 text-xs font-mono text-violet-600 dark:text-violet-400 font-bold">
                      {drill.ruleFormula}
                    </div>
                  )}

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {drill.ruleSummary}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-400">
                    Category: {drill.targetCategory}
                  </span>

                  <Link
                    href={`/library/grammar/${moduleId}/${drill.id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 px-4 py-2 text-xs font-bold text-white transition-all shadow-md shadow-violet-600/20"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    <span>Start Drill</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
