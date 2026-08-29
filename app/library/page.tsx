'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, Layers, Target, CheckCircle2 } from 'lucide-react';
import { GRAMMAR_MODULES } from '@/lib/grammar/grammarLibrary';

export default function LibraryHubPage() {
  return (
    <div className="relative py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
      
      {/* Background Ambient Accents */}
      <div className="absolute left-1/4 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-[var(--brand-emerald)]/10 blur-[130px]" />
      <div className="absolute right-1/4 top-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-[var(--brand-violet)]/10 blur-[130px]" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--bg-input)] px-4 py-1.5 text-xs font-mono text-[var(--brand-emerald)] border border-[var(--border-color)]">
          <BookOpen className="h-4 w-4" /> CENTRAL PRACTICE HUB
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-main)]">
          Fluency <span className="bg-gradient-to-r from-[var(--brand-emerald)] to-[var(--brand-violet)] bg-clip-text text-transparent">Library</span>
        </h1>
        <p className="text-base text-[var(--text-muted)] leading-relaxed font-normal">
          Build muscle memory for academic English. Synthesize your skills with full exam essays, or deconstruct the language into fundamental building blocks with rule-specific drills.
        </p>
      </div>

      {/* Two Path Split Hub Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Path 1: Exam Library Card */}
        <div className="group relative rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 sm:p-10 transition-all duration-300 hover:border-[var(--brand-emerald)]/50 hover:-translate-y-1 shadow-xl hover:shadow-2xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand-emerald)]/10 text-[var(--brand-emerald)] border border-[var(--brand-emerald)]/20 shadow-inner">
                <Target className="h-7 w-7" />
              </div>
              <span className="rounded-full bg-[var(--brand-emerald)]/10 border border-[var(--brand-emerald)]/20 px-3 py-1 text-xs font-mono font-bold text-[var(--brand-emerald)] uppercase tracking-wider">
                FULL TRANSCRIPTION
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2">Exam Library</h2>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                Full-length IELTS Academic, IELTS General, and TOEFL iBT prompts. Practice typing complete Band 9 model answers with embedded vocabulary annotations and grammatical highlights.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-[var(--text-muted)] font-medium border-t border-[var(--border-color)] pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--brand-emerald)] shrink-0" />
                <span>IELTS Task 1 Visuals, Maps &amp; Task 2 Essays</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--brand-emerald)] shrink-0" />
                <span>TOEFL Integrated Passages &amp; Academic Discussions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--brand-emerald)] shrink-0" />
                <span>Hover C1/C2 Vocabulary Explanations</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <Link
              href="/library/exam"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--brand-emerald)] hover:opacity-90 px-6 py-4 text-sm font-bold text-white transition-all shadow-lg"
            >
              <span>Explore Exam Library</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Path 2: Grammar Library Card */}
        <div className="group relative rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 sm:p-10 transition-all duration-300 hover:border-[var(--brand-violet)]/50 hover:-translate-y-1 shadow-xl hover:shadow-2xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand-violet)]/10 text-[var(--brand-violet)] border border-[var(--brand-violet)]/20 shadow-inner">
                <Layers className="h-7 w-7" />
              </div>
              <span className="rounded-full bg-[var(--brand-violet)]/10 border border-[var(--brand-violet)]/20 px-3 py-1 text-xs font-mono font-bold text-[var(--brand-violet)] uppercase tracking-wider">
                TARGETED SYNTAX DRILLING
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2">Grammar Library</h2>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                Isolate specific English mechanics. Drill targeted, repetitive examples across 6 core modules: Tenses, Conditionals, Modals, Connectors, Sentence Structure, and Parts of Speech.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-[var(--text-muted)] font-medium border-t border-[var(--border-color)] pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--brand-violet)] shrink-0" />
                <span>6 Core Rule Categories (Conditionals, Connectors, etc.)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--brand-violet)] shrink-0" />
                <span>Formula Briefings &amp; Sentence-by-Sentence Typing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--brand-violet)] shrink-0" />
                <span>Isolate Weak Points (e.g. Third Conditional Regrets)</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <Link
              href="/library/grammar"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--brand-violet)] hover:opacity-90 px-6 py-4 text-sm font-bold text-white transition-all shadow-lg"
            >
              <span>Explore Grammar Library</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      </div>

      {/* Grammar Modules Preview Bar */}
      <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-[var(--text-main)]">Grammar Drill Categories</h3>
            <p className="text-xs text-[var(--text-muted)] mt-1">Select a category to jump directly into targeted syntax practice</p>
          </div>
          <Link
            href="/library/grammar"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--brand-violet)] hover:underline"
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
              className="group flex flex-col items-center text-center p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-input)] hover:border-[var(--brand-violet)]/40 hover:bg-[var(--bg-card-hover)] hover:-translate-y-1 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-violet)]/10 text-[var(--brand-violet)] border border-[var(--brand-violet)]/20 mb-3 group-hover:scale-110 transition-transform">
                <Layers className="h-5 w-5" />
              </div>
              <div className="text-xs font-bold text-[var(--text-main)] line-clamp-1">{m.title}</div>
              <div className="text-[10px] font-mono text-[var(--text-subtle)] mt-1">{m.drillCount} Drills</div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
