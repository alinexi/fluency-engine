'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCoachStore } from '@/store/coachStore';
import { BandScoreRadar } from '@/components/coaching/BandScoreRadar';
import { CoachingDeck } from '@/components/coaching/CoachingDeck';
import { VocabularyHeatmap } from '@/components/coaching/VocabularyHeatmap';
import { SyntaxTree } from '@/components/coaching/SyntaxTree';
import { ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CoachResultsPage() {
  const { lastResult } = useCoachStore();
  const router = useRouter();

  useEffect(() => {
    if (!lastResult) {
      router.push('/coach');
    }
  }, [lastResult, router]);

  if (!lastResult) return null;

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
      
      {/* Back Navigation */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <Link
          href="/coach"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-violet-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Write Another Essay</span>
        </Link>
        <div className="inline-flex items-center gap-2 text-xs font-mono text-violet-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI EXAMINER REPORT COMPLETE</span>
        </div>
      </div>

      {/* 1. Band Score Radar & Quadrant Overview */}
      <BandScoreRadar result={lastResult} />

      {/* 2. Vocabulary Heatmap */}
      {lastResult.vocabularyMap && lastResult.vocabularyMap.length > 0 && (
        <VocabularyHeatmap tokens={lastResult.vocabularyMap} />
      )}

      {/* 3. Coach's Desk Cards & Before/After Sliders */}
      {lastResult.coachingCards && lastResult.coachingCards.length > 0 && (
        <CoachingDeck cards={lastResult.coachingCards} />
      )}

      {/* 4. Syntax Decomposition Diagram */}
      <SyntaxTree />

      {/* Bottom CTA */}
      <div className="pt-6 border-t border-zinc-800 text-center">
        <Link
          href="/coach"
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-violet-500 transition-all shadow-lg shadow-violet-600/20"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Start New Essay Session</span>
        </Link>
      </div>

    </div>
  );
}
