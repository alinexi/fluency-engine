'use client';

import React from 'react';
import { Trophy, Gauge, Target, Clock, AlertTriangle, RotateCcw, Upload } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import { useRouter } from 'next/navigation';


export function ResultCard() {
  const { metrics, resetSession, clearLoadedText } = useStudioStore();
  const router = useRouter();

  if (!metrics) return null;

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-[var(--bg-card)] p-8 backdrop-blur-xl shadow-2xl space-y-8 max-w-2xl mx-auto">

      
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-[var(--border-color)] pb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-[var(--brand-emerald)] border border-emerald-500/20">
          <Trophy className="h-7 w-7" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--text-main)]">Session Completed!</h2>
          <p className="text-sm text-[var(--text-muted)]">Here is your copywork performance summary.</p>
        </div>
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] p-4 text-center">
          <div className="flex justify-center text-[var(--brand-emerald)] mb-1">
            <Gauge className="h-4 w-4" />
          </div>
          <div className="text-xs font-mono text-[var(--text-subtle)]">NET WPM</div>
          <div className="text-2xl font-extrabold font-mono text-[var(--brand-emerald)]">{metrics.netWpm}</div>
        </div>

        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] p-4 text-center">
          <div className="flex justify-center text-teal-500 mb-1">
            <Target className="h-4 w-4" />
          </div>
          <div className="text-xs font-mono text-[var(--text-subtle)]">ACCURACY</div>
          <div className="text-2xl font-extrabold font-mono text-teal-500">{metrics.accuracy}%</div>
        </div>

        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] p-4 text-center">
          <div className="flex justify-center text-indigo-500 mb-1">
            <Clock className="h-4 w-4" />
          </div>
          <div className="text-xs font-mono text-[var(--text-subtle)]">TIME</div>
          <div className="text-2xl font-extrabold font-mono text-indigo-500">{metrics.timeElapsedSeconds}s</div>
        </div>

        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] p-4 text-center">
          <div className="flex justify-center text-rose-500 mb-1">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div className="text-xs font-mono text-[var(--text-subtle)]">TYPOS</div>
          <div className="text-2xl font-extrabold font-mono text-rose-500">{metrics.uncorrectedErrors}</div>
        </div>

      </div>

      {/* Top Error Distribution */}
      {Object.keys(metrics.errorDistribution).length > 0 && (
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] p-4">
          <h4 className="text-xs font-mono text-[var(--text-subtle)] uppercase mb-3">Misfired Characters</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(metrics.errorDistribution).map(([char, count]) => (
              <span key={char} className="inline-flex items-center gap-1.5 rounded-md bg-rose-500/10 px-2.5 py-1 text-xs font-mono text-rose-500 border border-rose-500/20">
                <span className="font-bold">{char === ' ' ? 'SPACE' : char}</span>
                <span className="opacity-60">×{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={resetSession}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-emerald)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all shadow-lg"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Try Again</span>
        </button>

        <button
          onClick={() => {
            clearLoadedText();
            router.push('/studio');
          }}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] px-5 py-3 text-sm font-semibold text-[var(--text-main)] hover:bg-[var(--bg-card-hover)] transition-all"
        >
          <Upload className="h-4 w-4" />
          <span>Upload New Text</span>
        </button>
      </div>

    </div>
  );
}

