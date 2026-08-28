'use client';

import React from 'react';
import { VocabToken } from '@/lib/plugins/types';
import { Flame } from 'lucide-react';

interface VocabularyHeatmapProps {
  tokens: VocabToken[];
}

export function VocabularyHeatmap({ tokens }: VocabularyHeatmapProps) {
  if (!tokens || tokens.length === 0) return null;

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 backdrop-blur-xl space-y-4 shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-amber-500" />
          <h3 className="text-base font-bold text-[var(--text-main)]">Vocabulary Density Heatmap</h3>
        </div>
        
        {/* CEFR Legend */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
            <span className="text-[var(--text-muted)]">A1/A2 Basic</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span className="text-[var(--text-muted)]">B1/B2 Intermediate</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
            <span className="text-[var(--text-muted)]">C1/C2 Advanced</span>
          </span>
        </div>
      </div>

      {/* Heatmap Token Flow */}
      <div className="flex flex-wrap gap-1.5 text-sm font-sans leading-relaxed p-4 bg-[var(--bg-input)] rounded-xl border border-[var(--border-color)]">
        {tokens.map((item, idx) => {
          const cefrClass = `cefr-${item.cefr}`;
          return (
            <span
              key={idx}
              className={`group relative cursor-help transition-all ${cefrClass}`}
            >
              {item.word}

              {/* Tooltip on hover */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20 rounded-lg bg-[var(--bg-card)] px-3 py-1.5 text-xs text-[var(--text-main)] border border-[var(--border-color)] shadow-xl whitespace-nowrap">
                <span className="font-mono font-bold text-amber-500">CEFR: {item.cefr}</span>
                {item.suggestion && (
                  <span className="block text-[11px] text-emerald-500 mt-0.5">
                    Suggestion: {item.suggestion}
                  </span>
                )}
              </span>
            </span>
          );
        })}
      </div>

    </div>
  );

}
