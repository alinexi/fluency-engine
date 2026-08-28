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
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur-xl space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">Vocabulary Density Heatmap</h3>
        </div>
        
        {/* CEFR Legend */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-400" />
            <span className="text-zinc-400">A1/A2 Basic</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="text-zinc-400">B1/B2 Intermediate</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
            <span className="text-zinc-400">C1/C2 Advanced</span>
          </span>
        </div>
      </div>

      {/* Heatmap Token Flow */}
      <div className="flex flex-wrap gap-1.5 text-sm font-sans leading-relaxed p-4 bg-zinc-950/60 rounded-xl border border-zinc-800/80">
        {tokens.map((item, idx) => {
          const cefrClass = `cefr-${item.cefr}`;
          return (
            <span
              key={idx}
              className={`group relative cursor-help transition-all ${cefrClass}`}
            >
              {item.word}

              {/* Tooltip on hover */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs text-white border border-zinc-700 shadow-xl whitespace-nowrap">
                <span className="font-mono font-bold text-amber-400">CEFR: {item.cefr}</span>
                {item.suggestion && (
                  <span className="block text-[11px] text-emerald-300 mt-0.5">
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
