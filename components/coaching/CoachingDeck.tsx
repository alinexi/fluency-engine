'use client';

import React from 'react';
import { CoachingCard as CoachingCardType } from '@/lib/plugins/types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { AlertCircle, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

interface CoachingDeckProps {
  cards: CoachingCardType[];
}

export function CoachingDeck({ cards }: CoachingDeckProps) {
  if (!cards || cards.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
        <Sparkles className="h-5 w-5 text-violet-400" />
        <h3 className="text-xl font-bold text-white">The Coach's Desk — Recommendations ({cards.length})</h3>
      </div>

      <div className="space-y-6">
        {cards.map((card, idx) => {
          let badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
          if (card.severity === 'high') badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
          if (card.severity === 'low') badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

          return (
            <div
              key={card.id || idx}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 space-y-4 shadow-xl backdrop-blur-xl transition-all hover:border-violet-500/30"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider">
                  CARD #{idx + 1} · {card.type}
                </span>
                <span className={`rounded-md px-2.5 py-0.5 text-[11px] font-mono border ${badgeColor}`}>
                  {card.severity.toUpperCase()} SEVERITY
                </span>
              </div>

              {/* Explanation */}
              <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                {card.explanation}
              </p>

              {/* Before & After Interactive Morph Slider */}
              {card.originalSentence && card.suggestedRewrite && (
                <BeforeAfterSlider
                  originalText={card.originalSentence}
                  suggestedText={card.suggestedRewrite}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
