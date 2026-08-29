'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers, ChevronRight, Clock, GitFork, ShieldAlert, Link2, Sparkles, CheckCircle2 } from 'lucide-react';
import { GRAMMAR_MODULES, GrammarModuleId } from '@/lib/grammar/grammarLibrary';
import { GRAMMAR_DRILLS } from '@/lib/grammar/grammarData';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, React.ReactNode> = {
  Clock: <Clock className="h-6 w-6" />,
  GitFork: <GitFork className="h-6 w-6" />,
  ShieldAlert: <ShieldAlert className="h-6 w-6" />,
  Link2: <Link2 className="h-6 w-6" />,
  Layers: <Layers className="h-6 w-6" />,
  Sparkles: <Sparkles className="h-6 w-6" />,
};

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/20', hover: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-500/20', hover: 'hover:border-violet-500/50 hover:shadow-violet-500/10' },
  teal: { bg: 'bg-teal-500/10', text: 'text-teal-600 dark:text-teal-400', border: 'border-teal-500/20', hover: 'hover:border-teal-500/50 hover:shadow-teal-500/10' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/20', hover: 'hover:border-amber-500/50 hover:shadow-amber-500/10' },
  indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-500/20', hover: 'hover:border-indigo-500/50 hover:shadow-indigo-500/10' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-500/20', hover: 'hover:border-rose-500/50 hover:shadow-rose-500/10' },
};

export default function GrammarLibraryPage() {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
      
      {/* Back Link */}
      <Link href="/library" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-violet-500 transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Central Library Hub
      </Link>

      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono mb-2 text-violet-500">
          <Layers className="h-4 w-4" />
          GRAMMAR LIBRARY
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Targeted Syntax &amp; Mechanics Drills
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
          Build muscle memory for essential English grammar rules. Isolate tricky mechanics and practice repetitive pattern typing.
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GRAMMAR_MODULES.map((module) => {
          const style = COLOR_MAP[module.color] || COLOR_MAP.violet;
          const drillsForModule = GRAMMAR_DRILLS.filter(d => d.moduleId === module.id);
          const icon = ICON_MAP[module.iconName] || <Layers className="h-6 w-6" />;

          return (
            <Link
              key={module.id}
              href={`/library/grammar/${module.id}`}
              className={cn(
                'group flex flex-col justify-between rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl',
                style.hover
              )}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl border shadow-inner', style.bg, style.text, style.border)}>
                    {icon}
                  </div>
                  <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-[11px] font-mono font-bold text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                    {drillsForModule.length} Drills
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-violet-500 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">{module.subtitle}</p>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {module.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4 text-xs font-mono font-bold">
                <span className={style.text}>Start Module</span>
                <ChevronRight className={cn('h-4 w-4 transition-transform group-hover:translate-x-1', style.text)} />
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
