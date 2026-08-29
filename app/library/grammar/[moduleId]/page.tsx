'use client';

import React from 'react';
import Link from 'next/link';
import { use } from 'react';
import { ArrowLeft, ChevronRight, Layers, Play } from 'lucide-react';
import { GRAMMAR_MODULES, GrammarModuleId } from '@/lib/grammar/grammarLibrary';
import { GRAMMAR_DRILLS } from '@/lib/grammar/grammarData';

export default function GrammarModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = use(params);
  const moduleInfo = GRAMMAR_MODULES.find(m => m.id === moduleId as GrammarModuleId);
  const drills = GRAMMAR_DRILLS.filter(d => d.moduleId === moduleId);

  if (!moduleInfo) {
    return (
      <div className="py-20 text-center text-[var(--text-muted)]">
        <p className="text-lg font-semibold">Grammar module not found.</p>
        <Link href="/library/grammar" className="mt-4 inline-block text-sm text-[var(--brand-violet)] hover:underline">← Back to Grammar Library</Link>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
        <Link href="/library" className="hover:text-[var(--brand-violet)] transition-colors">Library</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/library/grammar" className="hover:text-[var(--brand-violet)] transition-colors">Grammar Library</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-[var(--text-main)] font-bold">{moduleInfo.title}</span>
      </div>

      <Link href="/library/grammar" className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--brand-violet)] transition-colors -mt-4">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Modules
      </Link>

      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--brand-violet)] uppercase tracking-wider">
          <Layers className="h-4 w-4" /> MODULE DRILLS · 30-LEVEL SCALING
        </div>
        <h1 className="text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
          {moduleInfo.title}
        </h1>
        <p className="text-[var(--text-muted)] text-sm max-w-3xl leading-relaxed">
          {moduleInfo.description} Select a drill below to begin 30-level progressive sentence typing.
        </p>
      </div>

      {/* Drills List Grid */}
      {drills.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-12 text-center text-sm text-[var(--text-muted)]">
          Drills for this module are coming soon!
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {drills.map((drill) => (
            <div
              key={drill.id}
              className="group flex flex-col justify-between rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 backdrop-blur-xl hover:border-[var(--brand-violet)]/40 transition-all hover:shadow-xl space-y-4"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-[var(--brand-violet)]/10 text-[var(--brand-violet)] border border-[var(--brand-violet)]/20 px-3 py-0.5 text-[10px] font-mono font-bold uppercase">
                    {drill.difficultyLabel}
                  </span>
                  <span className="text-[11px] font-mono text-[var(--text-subtle)]">
                    {drill.levels.length} Levels Available
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--text-main)] group-hover:text-[var(--brand-violet)] transition-colors">
                  {drill.title}
                </h3>

                {/* Formula Badge */}
                {drill.ruleFormula && (
                  <div className="rounded-xl bg-[var(--brand-violet)]/10 border border-[var(--brand-violet)]/20 px-3.5 py-2 text-xs font-mono text-[var(--brand-violet)] font-bold">
                    {drill.ruleFormula}
                  </div>
                )}

                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {drill.ruleSummary}
                </p>

                {/* Tier Scaling Pills */}
                <div className="flex items-center gap-1.5 pt-1 text-[10px] font-mono text-[var(--text-subtle)]">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-[var(--brand-emerald)] border border-emerald-500/20 font-bold">L1-10 Guided</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-[var(--brand-amber)] border border-amber-500/20 font-bold">L11-20 Fading</span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-500 border border-rose-500/20 font-bold">L21-30 Stress</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[var(--text-subtle)]">
                  Category: {drill.targetCategory}
                </span>

                <Link
                  href={`/library/grammar/${moduleId}/${drill.id}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--brand-violet)] hover:opacity-90 px-4 py-2 text-xs font-bold text-white transition-all shadow-md"
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>Start Levels (1-30)</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
