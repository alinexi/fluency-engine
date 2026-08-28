'use client';

import Link from 'next/link';
import { Keyboard, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Flame, Cpu } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden py-12 md:py-24">
      {/* Radial Gradient Ambient Accents */}
      <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="absolute right-0 top-1/3 -z-10 h-[500px] w-[600px] bg-violet-500/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--bg-input)] px-4 py-1.5 text-xs font-mono text-[var(--brand-emerald)] border border-[var(--border-color)] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            TypeCoach OS v2.0 · Open Source Platform
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text-main)] leading-[1.15]">
            Master Language & Typing with <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-violet-500 bg-clip-text text-transparent">Precision</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-normal">
            Choose your mode: transcribe copywork files character-by-character to build muscle memory, or write essays under exam conditions with instant AI band-score coaching.
          </p>
        </div>

        {/* Feature Split Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          
          {/* Studio Feature Card */}
          <div className="group relative rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 sm:p-10 backdrop-blur-2xl transition-all duration-300 hover:border-emerald-500/50 hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-[var(--brand-emerald)] border border-emerald-500/20 mb-6 shadow-inner">
              <Keyboard className="h-7 w-7" />
            </div>

            <div className="inline-block rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-bold text-[var(--brand-emerald)] font-mono mb-3 uppercase tracking-wider">
              FEATURE 1 · ZERO API REQUIRED
            </div>

            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-3">Typing Studio</h2>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8">
              Upload any <code className="text-[var(--brand-emerald)] font-mono">.txt</code> document or copywork file. The engine enforces character-level precision by halting progression on typos, training your fingers to write fluent English without hesitation.
            </p>

            <ul className="space-y-3 text-xs text-[var(--text-main)] mb-8 font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[var(--brand-emerald)] shrink-0" />
                <span>Strict-Match Copywork Character Engine</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[var(--brand-emerald)] shrink-0" />
                <span>Real-Time WPM & Net Accuracy HUD</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[var(--brand-emerald)] shrink-0" />
                <span>Daily Streaks & Local Session History Persistence</span>
              </li>
            </ul>

            <Link
              href="/studio"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--brand-emerald)] hover:opacity-90 px-6 py-4 text-sm font-bold text-white transition-all shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40"
            >
              <span>Open Typing Studio</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Writing Coach Feature Card */}
          <div className="group relative rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 sm:p-10 backdrop-blur-2xl transition-all duration-300 hover:border-violet-500/50 hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-violet-500/10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-[var(--brand-violet)] border border-violet-500/20 mb-6 shadow-inner">
              <Sparkles className="h-7 w-7" />
            </div>

            <div className="inline-block rounded-md bg-violet-500/10 px-3 py-1 text-xs font-bold text-[var(--brand-violet)] font-mono mb-3 uppercase tracking-wider">
              FEATURE 2 · AI EXAMINER ENGINE
            </div>

            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-3">Writing Coach</h2>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8">
              Write essays under simulated IELTS, TOEFL, or Academic B1–C1 timed conditions. Receive instant multi-criteria band scores, interactive Before/After sliders, and CEFR vocabulary heatmaps.
            </p>

            <ul className="space-y-3 text-xs text-[var(--text-main)] mb-8 font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[var(--brand-violet)] shrink-0" />
                <span>IELTS Task 2, TOEFL & Academic B1-C1 Rubrics</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[var(--brand-violet)] shrink-0" />
                <span>Interactive Before & After Sentence Sliders</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[var(--brand-violet)] shrink-0" />
                <span>Pluggable Providers (OpenAI, Ollama, DeepSeek)</span>
              </li>
            </ul>

            <Link
              href="/coach"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 hover:bg-violet-500 px-6 py-4 text-sm font-bold text-white transition-all shadow-lg shadow-violet-600/25 group-hover:shadow-violet-600/40"
            >
              <span>Launch Writing Coach</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 backdrop-blur-xl">
            <ShieldCheck className="h-6 w-6 text-emerald-500 mb-3" />
            <h3 className="font-bold text-[var(--text-main)] text-base">Bring Your Own Key (BYOK)</h3>
            <p className="text-[var(--text-muted)] text-xs mt-1 leading-relaxed">API keys are AES-GCM encrypted in your local browser storage. Never saved to external databases.</p>
          </div>
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 backdrop-blur-xl">
            <Cpu className="h-6 w-6 text-violet-500 mb-3" />
            <h3 className="font-bold text-[var(--text-main)] text-base">Local-First with Ollama</h3>
            <p className="text-[var(--text-muted)] text-xs mt-1 leading-relaxed">Run open-source LLMs locally (Llama 3, Mistral) without needing internet connection or API subscriptions.</p>
          </div>
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 backdrop-blur-xl">
            <Flame className="h-6 w-6 text-amber-500 mb-3" />
            <h3 className="font-bold text-[var(--text-main)] text-base">Pluggable DB & Analytics</h3>
            <p className="text-[var(--text-muted)] text-xs mt-1 leading-relaxed">Built with a pluggable Database Adapter pattern ready to connect Supabase or PostgreSQL seamlessly.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

