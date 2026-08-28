'use client';

import React from 'react';
import { CoachingCard as CoachingCardType } from '@/lib/plugins/types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { Sparkles } from 'lucide-react';

interface CoachingDeckProps {
  cards: CoachingCardType[];
}

export function CoachingDeck({ cards }: CoachingDeckProps) {
  if (!cards || cards.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
        <Sparkles className="h-5 w-5 text-[var(--brand-violet)]" />
        <h3 className="text-xl font-bold text-[var(--text-main)]">The Coach&apos;s Desk — Recommendations ({cards.length})</h3>
      </div>


      <div className="space-y-6">
        {cards.map((card, idx) => {
          let badgeColor = 'bg-amber-500/10 text-amber-500 border-amber-500/20';
          if (card.severity === 'high') badgeColor = 'bg-rose-500/10 text-rose-500 border-rose-500/20';
          if (card.severity === 'low') badgeColor = 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';

          return (
            <div
              key={card.id || idx}
              className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4 shadow-xl backdrop-blur-xl transition-all hover:border-[var(--brand-violet)]/40"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[var(--brand-violet)] uppercase tracking-wider">
                  CARD #{idx + 1} · {card.type}
                </span>
                <span className={`rounded-md px-2.5 py-0.5 text-[11px] font-mono border ${badgeColor}`}>
                  {card.severity.toUpperCase()} SEVERITY
                </span>
              </div>

              {/* Explanation */}
              <p className="text-sm text-[var(--text-main)] leading-relaxed font-medium">
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
