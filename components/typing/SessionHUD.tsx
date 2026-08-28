'use client';

import React, { useEffect, useState } from 'react';
import { Gauge, Target, Flame, ShieldAlert, Pause, Play, RotateCcw } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';

export function SessionHUD() {
  const { matchState, startTime, isPaused, streak, togglePause, resetSession } = useStudioStore();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!startTime || isPaused || matchState?.isCompleted) return;

    const updateTime = () => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [startTime, isPaused, matchState?.isCompleted]);

  if (!matchState) return null;

  const totalTyped = matchState.totalKeystrokes;
  const errors = matchState.errorsCount;
  const minutes = Math.max(0.01, elapsedSeconds / 60);

  const netWpm = Math.max(0, Math.round(((totalTyped - errors) / 5) / minutes)) || 0;
  const accuracy = totalTyped > 0 ? Math.max(0, Math.round(((totalTyped - errors) / totalTyped) * 100)) : 100;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 backdrop-blur-xl shadow-xl transition-all">
      
      {/* Metric Badges */}
      <div className="flex flex-wrap items-center gap-6">
        
        {/* Net WPM */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-[var(--brand-emerald)] border border-emerald-500/20">
            <Gauge className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-subtle)] font-bold">Net WPM</div>
            <div className="text-2xl font-extrabold font-mono text-[var(--brand-emerald)] tracking-tight">{netWpm}</div>
          </div>
        </div>

        {/* Accuracy */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-500 border border-teal-500/20">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-subtle)] font-bold">Accuracy</div>
            <div className="text-2xl font-extrabold font-mono text-teal-500 tracking-tight">{accuracy}%</div>
          </div>
        </div>

        {/* Time Elapsed */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <span className="font-mono text-xs font-black">⏱</span>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-subtle)] font-bold">Time</div>
            <div className="text-2xl font-extrabold font-mono text-indigo-500 tracking-tight">{formatTime(elapsedSeconds)}</div>
          </div>
        </div>

        {/* Typos */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-subtle)] font-bold">Typos</div>
            <div className="text-2xl font-extrabold font-mono text-rose-500 tracking-tight">{errors}</div>
          </div>
        </div>

        {/* Action Controls: Pause & Restart Session next to Typos */}
        <div className="flex items-center gap-2 pl-2 border-l border-[var(--border-color)]">
          <button
            onClick={togglePause}
            className="rounded-xl bg-[var(--bg-input)] p-2.5 text-[var(--text-main)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] transition-all shadow-sm"
            title={isPaused ? 'Resume Session' : 'Pause Session'}
          >
            {isPaused ? <Play className="h-4 w-4 text-[var(--brand-emerald)]" /> : <Pause className="h-4 w-4" />}
          </button>

          <button
            onClick={resetSession}
            className="rounded-xl bg-[var(--bg-input)] p-2.5 text-[var(--text-main)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] transition-all shadow-sm"
            title="Restart Session"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* Streak Badge */}
      <div className="hidden lg:flex items-center gap-2 rounded-xl bg-amber-500/10 px-3 py-1.5 border border-amber-500/20 text-[var(--brand-amber)]">
        <Flame className="h-4 w-4 fill-amber-500" />
        <span className="text-xs font-bold font-mono">{streak.currentStreak}d streak</span>
      </div>

    </div>
  );
}


