'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight, Play, CheckCircle2, RotateCcw, Award, Layers, Target, ArrowRight, Zap } from 'lucide-react';
import { GRAMMAR_DRILLS } from '@/lib/grammar/grammarData';
import { GRAMMAR_MODULES, GrammarModuleId } from '@/lib/grammar/grammarLibrary';
import { useGrammarStore } from '@/store/grammarStore';
import { useStudioStore } from '@/store/studioStore';
import { TypingCanvas } from '@/components/typing/TypingCanvas';
import { SessionHUD } from '@/components/typing/SessionHUD';

export default function GrammarDrillSessionPage({
  params,
}: {
  params: Promise<{ moduleId: string; drillId: string }>;
}) {
  const { moduleId, drillId } = use(params);
  const router = useRouter();

  const moduleInfo = GRAMMAR_MODULES.find(m => m.id === moduleId as GrammarModuleId);
  const drill = GRAMMAR_DRILLS.find(d => d.id === drillId);

  const {
    currentSentenceIndex,
    sentenceResults,
    isSentenceCompleted,
    isDrillCompleted,
    loadDrill,
    recordSentenceCompletion,
    advanceToNextSentence,
    resetDrill,
  } = useGrammarStore();

  const loadText = useStudioStore(state => state.loadText);
  const matchState = useStudioStore(state => state.matchState);
  const startTime = useStudioStore(state => state.startTime);

  // Initialize drill
  useEffect(() => {
    if (drill) {
      loadDrill(drill.id);
      loadText(drill.sentences[0], `${drill.title} (1/${drill.sentences.length})`, drill.id);
    }
  }, [drillId]);

  // Load sentence into studio store whenever sentence index advances
  useEffect(() => {
    if (drill && currentSentenceIndex < drill.sentences.length) {
      const sentenceText = drill.sentences[currentSentenceIndex];
      loadText(sentenceText, `${drill.title} (${currentSentenceIndex + 1}/${drill.sentences.length})`, drill.id);
    }
  }, [currentSentenceIndex, drill]);

  // Watch for studio store completion of current sentence
  useEffect(() => {
    if (matchState?.isCompleted && !isSentenceCompleted && drill) {
      const elapsedSeconds = startTime ? Math.max(1, Math.floor((Date.now() - startTime) / 1000)) : 1;
      const minutes = Math.max(0.01, elapsedSeconds / 60);
      const totalTyped = matchState.totalKeystrokes;
      const errors = matchState.errorsCount;

      const netWpm = Math.max(0, Math.round(((totalTyped - errors) / 5) / minutes));
      const accuracy = totalTyped > 0 ? Math.max(0, Math.round(((totalTyped - errors) / totalTyped) * 100)) : 100;

      recordSentenceCompletion(netWpm, accuracy, elapsedSeconds);
    }
  }, [matchState?.isCompleted, isSentenceCompleted]);

  if (!drill || !moduleInfo) {
    return (
      <div className="py-20 text-center text-zinc-500">
        <p className="text-lg font-semibold">Drill session not found.</p>
        <Link href="/library/grammar" className="mt-4 inline-block text-sm text-violet-500 hover:underline">← Back to Grammar Library</Link>
      </div>
    );
  }

  const totalSentences = drill.sentences.length;
  const progressPercent = Math.round(((currentSentenceIndex + (isSentenceCompleted ? 1 : 0)) / totalSentences) * 100);

  const handleNextSentence = () => {
    if (currentSentenceIndex < totalSentences - 1) {
      advanceToNextSentence();
    }
  };

  const handleRestartDrill = () => {
    resetDrill();
    loadText(drill.sentences[0], `${drill.title} (1/${drill.sentences.length})`, drill.id);
  };

  // Compute aggregate drill completion metrics
  const avgWpm = sentenceResults.length > 0 ? Math.round(sentenceResults.reduce((acc, r) => acc + r.netWpm, 0) / sentenceResults.length) : 0;
  const avgAcc = sentenceResults.length > 0 ? Math.round(sentenceResults.reduce((acc, r) => acc + r.accuracy, 0) / sentenceResults.length) : 100;
  const totalTime = sentenceResults.reduce((acc, r) => acc + r.timeElapsedSeconds, 0);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <Link href="/library" className="hover:text-violet-500 transition-colors">Library</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/library/grammar" className="hover:text-violet-500 transition-colors">Grammar Library</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={`/library/grammar/${moduleId}`} className="hover:text-violet-500 transition-colors">{moduleInfo.title}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-zinc-900 dark:text-white font-bold">{drill.title}</span>
      </div>

      <Link href={`/library/grammar/${moduleId}`} className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-violet-500 transition-colors -mt-4">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to {moduleInfo.title}
      </Link>

      {/* Main Grid: Briefing Sidebar + Canvas */}
      {!isDrillCompleted ? (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* ── Left Column: Drill Briefing Panel ── */}
          <div className="space-y-6 lg:col-span-1">
            
            {/* Header info */}
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 p-6 space-y-4 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-violet-500/10 border border-violet-500/20 px-3 py-1 text-[10px] font-mono font-bold text-violet-600 dark:text-violet-400 uppercase">
                  {drill.targetCategory}
                </span>
                <span className="text-xs font-mono font-bold text-zinc-500">
                  {currentSentenceIndex + 1} of {totalSentences}
                </span>
              </div>

              <h2 className="text-xl font-bold text-zinc-900 dark:text-white leading-snug">
                {drill.title}
              </h2>

              {/* Formula Badge */}
              {drill.ruleFormula && (
                <div className="rounded-xl bg-violet-500/10 border border-violet-500/20 p-3 text-xs font-mono text-violet-600 dark:text-violet-400 font-bold leading-relaxed">
                  <div className="text-[10px] text-violet-400 uppercase mb-1 font-mono">RULE FORMULA</div>
                  {drill.ruleFormula}
                </div>
              )}

              {/* Summary */}
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {drill.ruleSummary}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>DRILL PROGRESS</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Explanation box */}
            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5 space-y-1.5 text-xs">
              <div className="font-mono font-bold text-indigo-400 flex items-center gap-1.5">
                <Zap className="h-4 w-4" /> LINGUISTIC FOCUS
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
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
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-zinc-950 font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Sentence Completed!</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                      Net WPM: {sentenceResults[sentenceResults.length - 1]?.netWpm} · Accuracy: {sentenceResults[sentenceResults.length - 1]?.accuracy}%
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNextSentence}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3 text-xs font-bold text-zinc-950 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <span>Next Sentence</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

          </div>

        </div>
      ) : (
        /* ── Drill Completion Overview Screen ── */
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
          
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-emerald-400 text-white shadow-2xl shadow-violet-500/20">
              <Award className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Grammar Drill Completed!</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              You successfully drilled all {totalSentences} sentences for <span className="font-bold text-zinc-900 dark:text-white">{drill.title}</span>.
            </p>
          </div>

          {/* Performance Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 p-5 text-center">
              <div className="text-xs font-mono text-zinc-400 uppercase">Avg Net WPM</div>
              <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mt-1">{avgWpm}</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 p-5 text-center">
              <div className="text-xs font-mono text-zinc-400 uppercase">Avg Accuracy</div>
              <div className="text-3xl font-extrabold font-mono text-teal-600 dark:text-teal-400 mt-1">{avgAcc}%</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 p-5 text-center">
              <div className="text-xs font-mono text-zinc-400 uppercase">Total Time</div>
              <div className="text-3xl font-extrabold font-mono text-violet-600 dark:text-violet-400 mt-1">{totalTime}s</div>
            </div>
          </div>

          {/* Per-Sentence Performance Breakdown */}
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 p-6 space-y-4 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Layers className="h-4 w-4 text-violet-500" /> Sentence Performance Breakdown
            </h3>

            <div className="space-y-3">
              {sentenceResults.map((res, idx) => (
                <div key={idx} className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="font-mono text-[10px] text-zinc-400">SENTENCE {idx + 1}</div>
                    <p className="font-mono text-zinc-900 dark:text-zinc-100 font-medium">"{res.sentenceText}"</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
                    <span className="text-emerald-500 font-bold">{res.netWpm} WPM</span>
                    <span className="text-teal-400">{res.accuracy}% Acc</span>
                    <span className="text-zinc-500">{res.timeElapsedSeconds}s</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleRestartDrill}
              className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-3.5 text-xs font-bold text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retry This Drill</span>
            </button>

            <Link
              href={`/library/grammar/${moduleId}`}
              className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 hover:bg-violet-500 py-3.5 text-xs font-bold text-white transition-all shadow-lg shadow-violet-600/20"
            >
              <span>More {moduleInfo.title} Drills</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}
