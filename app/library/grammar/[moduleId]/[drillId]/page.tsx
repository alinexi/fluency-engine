'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { use } from 'react';
import { ArrowLeft, ChevronRight, Award, ArrowRight, Zap, Eye, EyeOff, Flame, Layers, RotateCcw } from 'lucide-react';
import { GRAMMAR_DRILLS } from '@/lib/grammar/grammarData';
import { GRAMMAR_MODULES, GrammarModuleId } from '@/lib/grammar/grammarLibrary';
import { useGrammarStore } from '@/store/grammarStore';
import { useStudioStore } from '@/store/studioStore';
import { TypingCanvas } from '@/components/typing/TypingCanvas';
import { SessionHUD } from '@/components/typing/SessionHUD';
import { cn } from '@/lib/utils';

export default function GrammarDrillSessionPage({
  params,
}: {
  params: Promise<{ moduleId: string; drillId: string }>;
}) {
  const { moduleId, drillId } = use(params);

  const moduleInfo = GRAMMAR_MODULES.find(m => m.id === moduleId as GrammarModuleId);
  const drill = GRAMMAR_DRILLS.find(d => d.id === drillId);

  const {
    currentLevel,
    currentLevelData,
    currentSentenceIndex,
    sentenceResults,
    isSentenceCompleted,
    isDrillCompleted,
    perfectStreak,
    loadDrillLevel,
    registerBackspace,
    recordSentenceCompletion,
    advanceToNextSentence,
    advanceToNextLevel,
    resetDrillLevel,
  } = useGrammarStore();

  const loadText = useStudioStore(state => state.loadText);
  const matchState = useStudioStore(state => state.matchState);
  const startTime = useStudioStore(state => state.startTime);

  // Initialize drill at Level 1 on mount
  useEffect(() => {
    if (drill) {
      loadDrillLevel(drill.id, 1);
    }
  }, [drillId]);

  // Sync active sentence to typing canvas when level or index changes
  useEffect(() => {
    if (currentLevelData && currentSentenceIndex < currentLevelData.sentences.length) {
      const sentenceText = currentLevelData.sentences[currentSentenceIndex];
      loadText(sentenceText, `${drill?.title} (Lvl ${currentLevel} · ${currentSentenceIndex + 1}/${currentLevelData.sentences.length})`, drill?.id || '');
    }
  }, [currentLevel, currentSentenceIndex, currentLevelData]);

  // Backspace key listener to update perfect streak tracker
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        registerBackspace();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [registerBackspace]);

  // Record sentence completion when matchState signals complete
  useEffect(() => {
    if (matchState?.isCompleted && !isSentenceCompleted && currentLevelData) {
      const elapsedSeconds = startTime ? Math.max(1, Math.floor((Date.now() - startTime) / 1000)) : 1;
      const minutes = Math.max(0.01, elapsedSeconds / 60);
      const totalTyped = matchState.totalKeystrokes;
      const errors = matchState.errorsCount;

      const netWpm = Math.max(0, Math.round(((totalTyped - errors) / 5) / minutes));
      const accuracy = totalTyped > 0 ? Math.max(0, Math.round(((totalTyped - errors) / totalTyped) * 100)) : 100;

      recordSentenceCompletion(netWpm, accuracy, elapsedSeconds);
    }
  }, [matchState?.isCompleted, isSentenceCompleted]);

  if (!drill || !moduleInfo || !currentLevelData) {
    return (
      <div className="py-20 text-center text-[var(--text-muted)]">
        <p className="text-lg font-semibold">Drill session not found.</p>
        <Link href="/library/grammar" className="mt-4 inline-block text-sm text-[var(--brand-violet)] hover:underline">← Back to Grammar Library</Link>
      </div>
    );
  }

  const totalSentences = currentLevelData.sentences.length;
  const progressPercent = Math.round(((currentSentenceIndex + (isSentenceCompleted ? 1 : 0)) / totalSentences) * 100);

  const handleLevelSelect = (lvlNum: number) => {
    loadDrillLevel(drill.id, lvlNum);
  };

  const handleNextSentence = () => {
    if (currentSentenceIndex < totalSentences - 1) {
      advanceToNextSentence();
    }
  };

  const tierBadge = (tier: string) => {
    if (tier === 'guided') return { label: 'TIER 1 · GUIDED MUSCLE MEMORY', color: 'bg-[var(--brand-emerald)]/10 text-[var(--brand-emerald)] border-[var(--brand-emerald)]/20' };
    if (tier === 'fading') return { label: 'TIER 2 · FADING SUPPORT', color: 'bg-[var(--brand-amber)]/10 text-[var(--brand-amber)] border-[var(--brand-amber)]/20' };
    return { label: 'TIER 3 · STRESS TESTING & EDGE CASES', color: 'bg-rose-500/10 text-rose-500 border-rose-500/20' };
  };

  const currentTier = tierBadge(currentLevelData.tier);

  // Compute aggregate level metrics
  const avgWpm = sentenceResults.length > 0 ? Math.round(sentenceResults.reduce((acc, r) => acc + r.netWpm, 0) / sentenceResults.length) : 0;
  const avgAcc = sentenceResults.length > 0 ? Math.round(sentenceResults.reduce((acc, r) => acc + r.accuracy, 0) / sentenceResults.length) : 100;
  const totalTime = sentenceResults.reduce((acc, r) => acc + r.timeElapsedSeconds, 0);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
        <Link href="/library" className="hover:text-[var(--brand-violet)] transition-colors">Library</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/library/grammar" className="hover:text-[var(--brand-violet)] transition-colors">Grammar Library</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={`/library/grammar/${moduleId}`} className="hover:text-[var(--brand-violet)] transition-colors">{moduleInfo.title}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-[var(--text-main)] font-bold">{drill.title}</span>
      </div>

      <Link href={`/library/grammar/${moduleId}`} className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--brand-violet)] transition-colors -mt-4">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to {moduleInfo.title}
      </Link>

      {/* 30-Level Navigation Bar */}
      <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 space-y-3 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-bold text-[var(--text-main)] flex items-center gap-2">
              <Layers className="h-4 w-4 text-[var(--brand-violet)]" />
              SELECT DRILL LEVEL (1 TO 30)
            </span>
            <p className="text-[11px] text-[var(--text-muted)] font-mono">Free level access · Progressively scales visual scaffolding &amp; sentence complexity</p>
          </div>
          <span className={cn('rounded-full px-3 py-1 text-[10px] font-mono font-bold border uppercase', currentTier.color)}>
            {currentTier.label}
          </span>
        </div>

        {/* Level Pills Row (1 to 30) */}
        <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-30 gap-1.5 pt-1">
          {drill.levels.map((lvl) => {
            const isSelected = lvl.level === currentLevel;
            let levelColor = 'bg-[var(--brand-emerald)]/10 text-[var(--brand-emerald)] border-[var(--brand-emerald)]/20';
            if (lvl.tier === 'fading') levelColor = 'bg-[var(--brand-amber)]/10 text-[var(--brand-amber)] border-[var(--brand-amber)]/20';
            if (lvl.tier === 'stress') levelColor = 'bg-rose-500/10 text-rose-500 border-rose-500/20';

            return (
              <button
                key={lvl.level}
                onClick={() => handleLevelSelect(lvl.level)}
                className={cn(
                  'h-8 w-full rounded-lg flex items-center justify-center font-mono text-xs font-bold border transition-all',
                  isSelected
                    ? 'bg-[var(--brand-violet)] text-white border-[var(--brand-violet)] shadow-md shadow-violet-600/30 scale-105'
                    : cn(levelColor, 'hover:scale-105')
                )}
                title={`Level ${lvl.level} (${lvl.tier.toUpperCase()} Tier)`}
              >
                {lvl.level}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Briefing Sidebar + Canvas */}
      {!isDrillCompleted ? (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* ── Left Column: Drill Briefing Panel ── */}
          <div className="space-y-6 lg:col-span-1">
            
            {/* Header info */}
            <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[var(--brand-violet)]/10 border border-[var(--brand-violet)]/20 px-3 py-1 text-[10px] font-mono font-bold text-[var(--brand-violet)] uppercase">
                  Level {currentLevel} of 30
                </span>
                <span className="text-xs font-mono font-bold text-[var(--text-subtle)]">
                  {currentSentenceIndex + 1} / {totalSentences} Sentences
                </span>
              </div>

              <h2 className="text-xl font-bold text-[var(--text-main)] leading-snug">
                {drill.title}
              </h2>

              {/* Scaffolding Formula Box: Shown in Levels 1-10, Hidden in 11-30 */}
              {currentLevelData.showFormula ? (
                <div className="rounded-2xl bg-[var(--brand-emerald)]/10 border border-[var(--brand-emerald)]/30 p-4 text-xs font-mono text-[var(--brand-emerald)] space-y-1">
                  <div className="flex items-center justify-between font-bold text-[10px] uppercase tracking-wider text-[var(--brand-emerald)]">
                    <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> GUIDED FORMULA VISIBLE</span>
                    <span>TIER 1</span>
                  </div>
                  <div className="text-sm font-extrabold text-[var(--text-main)] pt-1">
                    {drill.ruleFormula}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-[var(--brand-amber)]/10 border border-[var(--brand-amber)]/30 p-4 text-xs font-mono text-[var(--brand-amber)] space-y-1">
                  <div className="flex items-center justify-between font-bold text-[10px] uppercase tracking-wider text-[var(--brand-amber)]">
                    <span className="flex items-center gap-1"><EyeOff className="h-3.5 w-3.5" /> FORMULA HIDDEN</span>
                    <span>RECALL MODE</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] pt-0.5">
                    Visual scaffolding removed. Rely on muscle memory to structure clauses correctly.
                  </p>
                </div>
              )}

              {/* Summary */}
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {drill.ruleSummary}
              </p>

              {/* Perfect Streak Tracker */}
              <div className="flex items-center justify-between rounded-xl bg-[var(--bg-input)] p-3 text-xs font-mono border border-[var(--border-color)]">
                <span className="flex items-center gap-1.5 text-[var(--brand-amber)] font-bold">
                  <Flame className="h-4 w-4 fill-[var(--brand-amber)]" /> Perfect Streak:
                </span>
                <span className="font-extrabold text-[var(--text-main)]">
                  {perfectStreak} Sentences (0 Typos)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2 border-t border-[var(--border-color)]">
                <div className="flex justify-between text-[10px] font-mono text-[var(--text-subtle)]">
                  <span>LEVEL PROGRESS</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[var(--bg-input)] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--brand-violet)] to-[var(--brand-emerald)] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Explanation callout */}
            <div className="rounded-2xl border border-[var(--brand-violet)]/20 bg-[var(--brand-violet)]/5 p-5 space-y-1.5 text-xs">
              <div className="font-mono font-bold text-[var(--brand-violet)] flex items-center gap-1.5">
                <Zap className="h-4 w-4" /> LINGUISTIC FOCUS
              </div>
              <p className="text-[var(--text-muted)] leading-relaxed">
                {drill.explanation}
              </p>
            </div>

          </div>

          {/* ── Right Column: Interactive Typing Canvas & Session Controls ── */}
          <div className="space-y-6 lg:col-span-2">
            
            {/* Live Metrics HUD */}
            <SessionHUD />

            {/* Canvas */}
            <TypingCanvas />

            {/* Between-Sentence Transition Control Card */}
            {isSentenceCompleted && !isDrillCompleted && (
              <div className="rounded-2xl border border-[var(--brand-emerald)]/30 bg-[var(--brand-emerald)]/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-emerald)] text-white font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--text-main)] text-sm">Sentence Completed!</h4>
                    <p className="text-xs text-[var(--text-muted)] font-mono">
                      Net WPM: {sentenceResults[sentenceResults.length - 1]?.netWpm} · Accuracy: {sentenceResults[sentenceResults.length - 1]?.accuracy}%
                      {sentenceResults[sentenceResults.length - 1]?.hadBackspaces && ' (Backspace used)'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNextSentence}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-emerald)] hover:opacity-90 px-6 py-3 text-xs font-bold text-white transition-all shadow-lg"
                >
                  <span>Next Sentence</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

          </div>

        </div>
      ) : (
        /* ── Level Completion Overview Screen ── */
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
          
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[var(--brand-violet)] to-[var(--brand-emerald)] text-white shadow-2xl">
              <Award className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--text-main)]">Level {currentLevel} Completed!</h2>
            <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
              You completed all sentences for <span className="font-bold text-[var(--text-main)]">{drill.title}</span> at Level {currentLevel}.
            </p>
          </div>

          {/* Performance Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 text-center">
              <div className="text-xs font-mono text-[var(--text-subtle)] uppercase">Avg Net WPM</div>
              <div className="text-3xl font-extrabold font-mono text-[var(--brand-emerald)] mt-1">{avgWpm}</div>
            </div>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 text-center">
              <div className="text-xs font-mono text-[var(--text-subtle)] uppercase">Avg Accuracy</div>
              <div className="text-3xl font-extrabold font-mono text-[var(--brand-emerald)] mt-1">{avgAcc}%</div>
            </div>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 text-center">
              <div className="text-xs font-mono text-[var(--text-subtle)] uppercase">Total Time</div>
              <div className="text-3xl font-extrabold font-mono text-[var(--brand-violet)] mt-1">{totalTime}s</div>
            </div>
          </div>

          {/* Per-Sentence Performance Breakdown */}
          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-[var(--text-main)] font-mono uppercase tracking-wider flex items-center gap-2">
              <Layers className="h-4 w-4 text-[var(--brand-violet)]" /> Sentence Breakdown
            </h3>

            <div className="space-y-3">
              {sentenceResults.map((res, idx) => (
                <div key={idx} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="font-mono text-[10px] text-[var(--text-subtle)]">SENTENCE {idx + 1}</div>
                    <p className="font-mono text-[var(--text-main)] font-medium">&ldquo;{res.sentenceText}&rdquo;</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
                    <span className="text-[var(--brand-emerald)] font-bold">{res.netWpm} WPM</span>
                    <span className="text-[var(--brand-emerald)]">{res.accuracy}% Acc</span>
                    <span className="text-[var(--text-subtle)]">{res.timeElapsedSeconds}s</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={resetDrillLevel}
              className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] py-3.5 text-xs font-bold text-[var(--text-main)] hover:bg-[var(--bg-card-hover)] transition-all"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retry Level {currentLevel}</span>
            </button>

            {currentLevel < 30 ? (
              <button
                onClick={advanceToNextLevel}
                className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--brand-violet)] hover:opacity-90 py-3.5 text-xs font-bold text-white transition-all shadow-lg"
              >
                <span>Unlock Level {currentLevel + 1}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <Link
                href={`/library/grammar/${moduleId}`}
                className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--brand-emerald)] hover:opacity-90 py-3.5 text-xs font-bold text-white transition-all shadow-lg"
              >
                <span>Module Complete — Back to Drills</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
