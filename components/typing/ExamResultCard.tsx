'use client';

import React from 'react';
import Link from 'next/link';
import { Trophy, Gauge, Target, Clock, AlertTriangle, RotateCcw, BookOpen, Library } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import { EXAM_PROMPTS } from '@/lib/exam/examData';
import { AnnotatedWord, AnnotatedSpan } from '@/lib/exam/examLibrary';

interface Props {
  promptId: string;
}

export function ExamResultCard({ promptId }: Props) {
  const { metrics, resetSession } = useStudioStore();
  const prompt = EXAM_PROMPTS.find(p => p.id === promptId);

  if (!metrics) return null;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">

      {/* ── Section 1: Performance ─────────────────────────────── */}
      <div className="rounded-2xl border border-emerald-500/30 bg-[var(--bg-card)] p-7 space-y-6 shadow-xl shadow-emerald-500/5">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-[var(--border-color)] pb-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-[var(--brand-emerald)] border border-emerald-500/20">
            <Trophy className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--text-main)]">Practice Complete!</h2>
            {prompt && (
              <p className="text-sm text-[var(--text-muted)] mt-0.5">
                {prompt.exam} · {prompt.task} · {prompt.questionType}
              </p>
            )}
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] p-4 text-center">
            <div className="flex justify-center text-[var(--brand-emerald)] mb-1"><Gauge className="h-4 w-4" /></div>
            <div className="text-[10px] font-mono text-[var(--text-subtle)] uppercase">Net WPM</div>
            <div className="text-2xl font-extrabold font-mono text-[var(--brand-emerald)]">{metrics.netWpm}</div>
          </div>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] p-4 text-center">
            <div className="flex justify-center text-teal-500 mb-1"><Target className="h-4 w-4" /></div>
            <div className="text-[10px] font-mono text-[var(--text-subtle)] uppercase">Accuracy</div>
            <div className="text-2xl font-extrabold font-mono text-teal-500">{metrics.accuracy}%</div>
          </div>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] p-4 text-center">
            <div className="flex justify-center text-indigo-500 mb-1"><Clock className="h-4 w-4" /></div>
            <div className="text-[10px] font-mono text-[var(--text-subtle)] uppercase">Time</div>
            <div className="text-2xl font-extrabold font-mono text-indigo-500">{formatTime(metrics.timeElapsedSeconds)}</div>
          </div>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] p-4 text-center">
            <div className="flex justify-center text-rose-500 mb-1"><AlertTriangle className="h-4 w-4" /></div>
            <div className="text-[10px] font-mono text-[var(--text-subtle)] uppercase">Typos</div>
            <div className="text-2xl font-extrabold font-mono text-rose-500">{metrics.uncorrectedErrors}</div>
          </div>
        </div>

        {/* Error Distribution */}
        {Object.keys(metrics.errorDistribution).length > 0 && (
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] p-4">
            <h4 className="text-[10px] font-mono text-[var(--text-subtle)] uppercase mb-3">Misfired Characters</h4>
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
      </div>

      {/* ── Section 2: Vocabulary You Practiced ───────────────── */}
      {prompt && prompt.highlightedVocab.length > 0 && (
        <div className="rounded-2xl border border-amber-500/30 bg-[var(--bg-card)] p-7 space-y-5 shadow-lg shadow-amber-500/5">
          <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--text-main)]">Vocabulary You Practiced</h3>
              <p className="text-xs text-[var(--text-muted)]">Advanced C1/C2 words in this sample answer</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {prompt.highlightedVocab.map((v: AnnotatedWord) => (
              <div key={v.word} className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-amber-400 font-mono">{v.word}</span>
                  <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-400">
                    {v.cefr}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-snug">{v.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Section 3: Grammar Structures You Used ────────────── */}
      {prompt && prompt.highlightedStructures.length > 0 && (
        <div className="rounded-2xl border border-violet-500/30 bg-[var(--bg-card)] p-7 space-y-5 shadow-lg shadow-violet-500/5">
          <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-[var(--brand-violet)]">
              <span className="text-xs font-black">GR</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--text-main)]">Grammar Structures You Used</h3>
              <p className="text-xs text-[var(--text-muted)]">High-scoring syntactic patterns from this answer</p>
            </div>
          </div>
          <div className="space-y-3">
            {prompt.highlightedStructures.map((s: AnnotatedSpan, i: number) => (
              <div key={i} className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <blockquote className="text-sm italic text-[var(--text-main)] border-l-2 border-violet-400 pl-3 leading-relaxed">
                    &ldquo;{s.phrase}&rdquo;
                  </blockquote>
                  <span className="shrink-0 rounded-full bg-violet-500/20 border border-violet-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-[var(--brand-violet)] whitespace-nowrap">
                    {s.label}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-snug">{s.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Section 4: Why This Answer Scores Highly ──────────── */}
      {prompt && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-2">
          <div className="text-xs font-mono font-bold text-[var(--brand-emerald)] uppercase tracking-wider">
            Why This Answer Scores Highly
          </div>
          <p className="text-sm text-[var(--text-main)] leading-relaxed">{prompt.scoringNotes}</p>
        </div>
      )}

      {/* ── Action Buttons ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={resetSession}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-emerald)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all shadow-lg shadow-emerald-500/20"
        >
          <RotateCcw className="h-4 w-4" />
          Retry This Prompt
        </button>

        {prompt && (
          <Link
            href={`/library/${promptId}`}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] px-5 py-3 text-sm font-semibold text-[var(--text-main)] hover:bg-[var(--bg-card-hover)] transition-all"
          >
            <BookOpen className="h-4 w-4" />
            Back to Briefing Room
          </Link>
        )}

        <Link
          href="/library"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] px-5 py-3 text-sm font-semibold text-[var(--text-main)] hover:bg-[var(--bg-card-hover)] transition-all"
        >
          <Library className="h-4 w-4" />
          Browse More Prompts
        </Link>
      </div>

    </div>
  );
}
