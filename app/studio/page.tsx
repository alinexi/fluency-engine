'use client';

import React from 'react';
import { FileDropzone } from '@/components/typing/FileDropzone';
import { Keyboard, History, Trophy, Flame } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';

export default function StudioPage() {
  const { sessionHistory, streak } = useStudioStore();

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <Keyboard className="h-4 w-4" />
            FEATURE 1 · TYPING STUDIO
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Copywork Muscle-Memory Engine</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Upload any text file or select a preset to transcribe character-by-character. Zero external dependencies or API required.
          </p>
        </div>

        {/* Streak & Best WPM Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-amber-500/10 px-4 py-2.5 border border-amber-500/20 text-amber-400">
            <Flame className="h-5 w-5 fill-amber-400" />
            <div>
              <div className="text-[10px] font-mono text-amber-400/80">STREAK</div>
              <div className="text-sm font-bold font-mono">{streak.currentStreak} Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main File Dropzone & Preset Selector */}
      <FileDropzone />

      {/* Session History List */}
      {sessionHistory.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-zinc-800">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-zinc-300">Recent Session History</h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sessionHistory.map((sess) => (
              <div key={sess.id} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="truncate max-w-[180px] font-semibold text-white">{sess.title}</span>
                  <span>{new Date(sess.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-mono pt-2 border-t border-zinc-800/60">
                  <span className="text-emerald-400 font-bold">{sess.metrics.netWpm} WPM</span>
                  <span className="text-teal-400">{sess.metrics.accuracy}% Acc</span>
                  <span className="text-zinc-500">{sess.metrics.timeElapsedSeconds}s</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
