'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, ArrowRight, Layers, Target, CheckCircle2, ShieldCheck, Flame, GitFork, Clock, Link2 } from 'lucide-react';
import { GRAMMAR_MODULES } from '@/lib/grammar/grammarLibrary';

export default function LibraryHubPage() {
  return (
    <div className="relative py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
      
      {/* Background Ambient Accents */}
      <div className="absolute left-1/4 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[130px]" />
      <div className="absolute right-1/4 top-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[130px]" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-900 px-4 py-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 border border-zinc-200 dark:border-zinc-800">
          <BookOpen className="h-4 w-4" /> CENTRAL PRACTICE HUB
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Fluency <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-violet-500 bg-clip-text text-transparent">Library</span>
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
          Build muscle memory for academic English. Synthesize your skills with full exam essays, or deconstruct the language into fundamental building blocks with rule-specific drills.
        </p>
      </div>

      {/* Two Path Split Hub Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Path 1: Exam Library Card */}
        <div className="group relative rounded-3xl border border-emerald-500/20 dark:border-emerald-500/20 bg-white/80 dark:bg-zinc-900/60 p-8 sm:p-10 backdrop-blur-2xl transition-all duration-300 hover:border-emerald-500/50 hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-inner">
                <Target className="h-7 w-7" />
              </div>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                FULL TRANSCRIPTION
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Exam Library</h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Full-length IELTS Academic, IELTS General, and TOEFL iBT prompts. Practice typing complete Band 9 model answers with embedded vocabulary annotations and grammatical highlights.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300 font-medium border-t border-zinc-100 dark:border-zinc-800/80 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>IELTS Task 1 Visuals, Maps &amp; Task 2 Essays</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>TOEFL Integrated Passages &amp; Academic Discussions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Hover C1/C2 Vocabulary Explanations</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <Link
              href="/library/exam"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 px-6 py-4 text-sm font-bold text-zinc-950 transition-all shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40"
            >
              <span>Explore Exam Library</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Path 2: Grammar Library Card */}
        <div className="group relative rounded-3xl border border-violet-500/20 dark:border-violet-500/20 bg-white/80 dark:bg-zinc-900/60 p-8 sm:p-10 backdrop-blur-2xl transition-all duration-300 hover:border-violet-500/50 hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-violet-500/10 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 shadow-inner">
                <Layers className="h-7 w-7" />
              </div>
              <span className="rounded-full bg-violet-500/10 border border-violet-500/20 px-3 py-1 text-xs font-mono font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                TARGETED SYNTAX DRILLING
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Grammar Library</h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Isolate specific English mechanics. Drill targeted, repetitive examples across 6 core modules: Tenses, Conditionals, Modals, Connectors, Sentence Structure, and Parts of Speech.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300 font-medium border-t border-zinc-100 dark:border-zinc-800/80 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-violet-500 shrink-0" />
                <span>6 Core Rule Categories (Conditionals, Connectors, etc.)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-violet-500 shrink-0" />
                <span>Formula Briefings &amp; Sentence-by-Sentence Typing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-violet-500 shrink-0" />
                <span>Isolate Weak Points (e.g. Third Conditional Regrets)</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <Link
              href="/library/grammar"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 hover:bg-violet-500 px-6 py-4 text-sm font-bold text-white transition-all shadow-lg shadow-violet-600/25 group-hover:shadow-violet-600/40"
            >
              <span>Explore Grammar Library</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      </div>

      {/* Grammar Modules Preview Bar */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-8 backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Grammar Drill Categories</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Select a category to jump directly into targeted syntax practice</p>
          </div>
          <Link
            href="/library/grammar"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-violet-600 dark:text-violet-400 hover:underline"
          >
            <span>View All Modules ({GRAMMAR_MODULES.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {GRAMMAR_MODULES.map(m => (
            <Link
              key={m.id}
              href={`/library/grammar/${m.id}`}
              className="group flex flex-col items-center text-center p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 hover:border-violet-500/40 hover:-translate-y-1 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 mb-3 group-hover:scale-110 transition-transform">
                <Layers className="h-5 w-5" />
              </div>
              <div className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-1">{m.title}</div>
              <div className="text-[10px] font-mono text-zinc-400 mt-1">{m.drillCount} Drills</div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
