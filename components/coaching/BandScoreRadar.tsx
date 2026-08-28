'use client';

import React from 'react';
import { EvalResult } from '@/lib/plugins/types';
import { Award, CheckCircle } from 'lucide-react';

interface BandScoreRadarProps {
  result: EvalResult;
}

export function BandScoreRadar({ result }: BandScoreRadarProps) {
  if (!result) return null;

  const criteria = [
    { label: 'Task Achievement', score: result.taskAchievement.score, max: result.taskAchievement.maxScore, color: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/10' },
    { label: 'Coherence & Cohesion', score: result.coherenceCohesion.score, max: result.coherenceCohesion.maxScore, color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
    { label: 'Lexical Resource', score: result.lexicalResource.score, max: result.lexicalResource.maxScore, color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10' },
    { label: 'Grammatical Range', score: result.grammaticalRange.score, max: result.grammaticalRange.maxScore, color: 'text-teal-400', border: 'border-teal-500/30', bg: 'bg-teal-500/10' },
  ];

  return (
    <div className="rounded-2xl border border-violet-500/30 bg-zinc-900/90 p-8 backdrop-blur-xl space-y-6 shadow-2xl">
      
      {/* Header Band Score Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
            <Award className="h-8 w-8" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase text-violet-400 font-bold tracking-wider">
              {result.examMode.toUpperCase()} EXAMINER REPORT
            </div>
            <h2 className="text-2xl font-extrabold text-white">Overall Band Score</h2>
          </div>
        </div>

        <div className="flex items-baseline gap-1 bg-zinc-950 px-6 py-3 rounded-2xl border border-violet-500/40">
          <span className="text-4xl font-extrabold font-mono text-violet-400">{result.overallBand}</span>
          <span className="text-sm font-mono text-zinc-400">/ {result.overallMax || 9}</span>
        </div>
      </div>

      {/* Summary Feedback */}
      <div className="rounded-xl bg-zinc-950/60 p-4 border border-zinc-800">
        <p className="text-sm text-zinc-300 leading-relaxed italic">
          "{result.summaryFeedback}"
        </p>
      </div>

      {/* Four Sub-Criteria Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {criteria.map((item, idx) => (
          <div key={idx} className={`rounded-xl border p-4 ${item.border} ${item.bg} space-y-1`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-mono font-bold ${item.color}`}>{item.label}</span>
              <span className={`text-lg font-extrabold font-mono ${item.color}`}>
                {item.score} / {item.max}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
