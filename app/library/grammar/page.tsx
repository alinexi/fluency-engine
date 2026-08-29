'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers, ChevronRight, Clock, GitFork, ShieldAlert, Link2, Sparkles } from 'lucide-react';
import { GRAMMAR_MODULES } from '@/lib/grammar/grammarLibrary';
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

export default function GrammarLibraryPage() {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
      
      {/* Back Link */}
      <Link href="/library" className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--brand-violet)] transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Central Library Hub
      </Link>

      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono mb-2 text-[var(--brand-violet)]">
          <Layers className="h-4 w-4" />
          GRAMMAR LIBRARY
        </div>
        <h1 className="text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
          Targeted Syntax &amp; Mechanics Drills
        </h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">
          Build muscle memory for essential English grammar rules. Isolate tricky mechanics and practice repetitive pattern typing.
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GRAMMAR_MODULES.map((module) => {
          const drillsForModule = GRAMMAR_DRILLS.filter(d => d.moduleId === module.id);
          const icon = ICON_MAP[module.iconName] || <Layers className="h-6 w-6" />;

          return (
            <Link
              key={module.id}
              href={`/library/grammar/${module.id}`}
              className={cn(
                'group flex flex-col justify-between rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:border-[var(--brand-violet)]/50'
              )}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border bg-[var(--brand-violet)]/10 text-[var(--brand-violet)] border-[var(--brand-violet)]/20 shadow-inner">
                    {icon}
                  </div>
                  <span className="rounded-full bg-[var(--bg-input)] px-3 py-1 text-[11px] font-mono font-bold text-[var(--text-muted)] border border-[var(--border-color)]">
                    {drillsForModule.length} Drills
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--text-main)] group-hover:text-[var(--brand-violet)] transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-xs font-mono text-[var(--text-subtle)] mt-0.5">{module.subtitle}</p>
                </div>

                <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3">
                  {module.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[var(--border-color)] pt-4 text-xs font-mono font-bold">
                <span className="text-[var(--brand-violet)]">Start Module</span>
                <ChevronRight className="h-4 w-4 text-[var(--brand-violet)] transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
