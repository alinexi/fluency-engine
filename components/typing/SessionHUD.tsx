'use client';

import React, { useEffect, useState } from 'react';
import { Gauge, Target, Flame, ShieldAlert, Pause, Play, RotateCcw } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import { cn } from '@/lib/utils';

export function SessionHUD() {
  const { matchState, startTime, strictMode, isPaused, streak, toggleStrictMode, togglePause, resetSession } = useStudioStore();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!startTime) {
      setElapsedSeconds(0);
      return;
    }
    if (isPaused || matchState?.isCompleted) return;

    setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));

    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isPaused, matchState?.isCompleted]);

  if (!matchState) return null;

  const totalTyped = matchState.totalKeystrokes;
  const errors = matchState.errorsCount;
  const minutes = Math.max(0.01, elapsedSeconds / 60);

  const grossWpm = Math.round((totalTyped / 5) / minutes) || 0;
  const netWpm = Math.max(0, Math.round(((totalTyped - errors) / 5) / minutes)) || 0;
  const accuracy = totalTyped > 0 ? Math.max(0, Math.round(((totalTyped - errors) / totalTyped) * 100)) : 100;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-500/20 bg-zinc-900/80 p-4 backdrop-blur-xl shadow-lg">
      
      {/* Metric Badges */}
      <div className="flex flex-wrap items-center gap-6">
        
        {/* Net WPM */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Gauge className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-zinc-400">Net WPM</div>
            <div className="text-xl font-extrabold font-mono text-emerald-400">{netWpm}</div>
          </div>
        </div>

        {/* Accuracy */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-zinc-400">Accuracy</div>
            <div className="text-xl font-extrabold font-mono text-teal-400">{accuracy}%</div>
          </div>
        </div>

        {/* Time Elapsed */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <span className="font-mono text-xs font-bold">⏱</span>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-zinc-400">Time</div>
            <div className="text-xl font-extrabold font-mono text-indigo-400">{formatTime(elapsedSeconds)}</div>
          </div>
        </div>

        {/* Errors */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-zinc-400">Typos</div>
            <div className="text-xl font-extrabold font-mono text-rose-400">{errors}</div>
          </div>
        </div>

        {/* Daily Streak */}
        <div className="hidden sm:flex items-center gap-2 rounded-xl bg-amber-500/10 px-3 py-1.5 border border-amber-500/20 text-amber-400">
          <Flame className="h-4 w-4 fill-amber-400" />
          <span className="text-xs font-bold font-mono">{streak.currentStreak}d streak</span>
        </div>

      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleStrictMode}
          className={cn(
            'rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-all border',
            strictMode
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
          )}
          title="Strict Mode halts progression on typos"
        >
          {strictMode ? 'STRICT MODE ON' : 'STRICT MODE OFF'}
        </button>

        <button
          onClick={useStudioStore.getState().toggleCharBoxes}
          className={cn(
            'rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-all border',
            useStudioStore(state => state.showCharBoxes)
              ? 'bg-violet-500/10 text-violet-400 border-violet-500/30'
              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
          )}
          title="Toggle background boxes around typed characters"
        >
          {useStudioStore(state => state.showCharBoxes) ? 'CHAR BOXES ON' : 'CHAR BOXES OFF'}
        </button>

        <button
          onClick={useStudioStore.getState().toggleActiveHighlight}
          className={cn(
            'rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-all border',
            useStudioStore(state => state.showActiveHighlight)
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
          )}
          title="Toggle green rectangle highlight around active character"
        >
          {useStudioStore(state => state.showActiveHighlight) ? 'ACTIVE BOX ON' : 'ACTIVE BOX OFF'}
        </button>

        <button
          onClick={togglePause}
          className="rounded-lg bg-zinc-800 p-2 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
          title={isPaused ? 'Resume' : 'Pause'}
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>

        <button
          onClick={resetSession}
          className="rounded-lg bg-zinc-800 p-2 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
          title="Restart Session"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
}
