'use client';

import React from 'react';
import { FileDropzone } from '@/components/typing/FileDropzone';
import { Keyboard, History, Flame } from 'lucide-react';

import { useStudioStore } from '@/store/studioStore';

export default function StudioPage() {
  const { sessionHistory, streak } = useStudioStore();

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--brand-emerald)] mb-2">
            <Keyboard className="h-4 w-4" />
            FEATURE 1 · TYPING STUDIO
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--text-main)] tracking-tight">Copywork Muscle-Memory Engine</h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">
            Upload any text file or select a preset to transcribe character-by-character. Zero external dependencies or API required.
          </p>
        </div>

        {/* Streak & Best WPM Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-amber-500/10 px-4 py-2.5 border border-amber-500/20 text-[var(--brand-amber)]">
            <Flame className="h-5 w-5 fill-amber-500" />
            <div>
              <div className="text-[10px] font-mono opacity-80">STREAK</div>
              <div className="text-sm font-bold font-mono">{streak.currentStreak} Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main File Dropzone & Preset Selector */}
      <FileDropzone />

      {/* Session History List */}
      {sessionHistory.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-[var(--brand-emerald)]" />
            <h3 className="text-sm font-semibold text-[var(--text-main)]">Recent Session History</h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sessionHistory.map((sess) => (
              <div key={sess.id} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                  <span className="truncate max-w-[180px] font-semibold text-[var(--text-main)]">{sess.title}</span>
                  <span>{new Date(sess.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-mono pt-2 border-t border-[var(--border-color)]">
                  <span className="text-[var(--brand-emerald)] font-bold">{sess.metrics.netWpm} WPM</span>
                  <span className="text-teal-500">{sess.metrics.accuracy}% Acc</span>
                  <span className="text-[var(--text-subtle)]">{sess.metrics.timeElapsedSeconds}s</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

