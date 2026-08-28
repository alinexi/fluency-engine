'use client';

import Link from 'next/link';
import { Keyboard, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Flame, Cpu } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden py-12 md:py-20">
      {/* Radial Gradient Background Accent */}
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="absolute right-0 top-1/3 -z-10 h-[400px] w-[500px] bg-violet-500/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-mono text-emerald-400 border border-zinc-800">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            TypeCoach OS v2.0 · Open Source Platform
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Master Language & Typing with <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-violet-400 bg-clip-text text-transparent">Precision</span>
          </h1>

          <p className="text-lg text-zinc-400 leading-relaxed">
            Choose your mode: practice copying high-quality prose character-by-character to build muscle memory, or write essays under exam conditions with instant AI band-score coaching.
          </p>
        </div>

        {/* Feature Split Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          
          {/* Studio Feature Card */}
          <div className="group relative rounded-2xl border border-emerald-500/20 bg-zinc-900/60 p-8 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/50 hover:bg-zinc-900/80 shadow-xl hover:shadow-emerald-500/5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
              <Keyboard className="h-6 w-6" />
            </div>

            <div className="inline-block rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 font-mono mb-3">
              FEATURE 1 · ZERO API REQUIRED
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">Typing Studio</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Upload any <code className="text-emerald-300 font-mono">.txt</code> document or copywork file. The engine enforces character-level precision by halting progression on typos, training your fingers to write fluent English without hesitation.
            </p>

            <ul className="space-y-2.5 text-xs text-zinc-300 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Strict-Match Copywork Engine</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Real-Time WPM & Net Accuracy HUD</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Daily Streaks & IndexedDB Local Analytics</span>
              </li>
            </ul>

            <Link
              href="/studio"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
            >
              <span>Open Typing Studio</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Writing Coach Feature Card */}
          <div className="group relative rounded-2xl border border-violet-500/20 bg-zinc-900/60 p-8 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/50 hover:bg-zinc-900/80 shadow-xl hover:shadow-violet-500/5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-6">
              <Sparkles className="h-6 w-6" />
            </div>

            <div className="inline-block rounded-md bg-violet-500/10 px-2.5 py-1 text-xs font-semibold text-violet-400 font-mono mb-3">
              FEATURE 2 · AI EXAMINER ENGINE
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">Writing Coach</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Write essays under simulated IELTS, TOEFL, or Academic B1–C1 timed conditions. Receive instant multi-criteria band scores, interactive Before/After sliders, and CEFR vocabulary heatmaps.
            </p>

            <ul className="space-y-2.5 text-xs text-zinc-300 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-violet-400" />
                <span>IELTS Task 2, TOEFL & Academic B1-C1 Rubrics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-violet-400" />
                <span>Interactive Before & After Sentence Sliders</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-violet-400" />
                <span>Pluggable Providers (OpenAI, Ollama, DeepSeek)</span>
              </li>
            </ul>

            <Link
              href="/coach"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-500 shadow-lg shadow-violet-600/20"
            >
              <span>Launch Writing Coach</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <ShieldCheck className="h-5 w-5 text-emerald-400 mb-2" />
            <h3 className="font-semibold text-white text-sm">Bring Your Own Key (BYOK)</h3>
            <p className="text-zinc-400 text-xs mt-1">API keys are AES-GCM encrypted in your local browser storage. Never saved to any external database.</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <Cpu className="h-5 w-5 text-violet-400 mb-2" />
            <h3 className="font-semibold text-white text-sm">Local-First with Ollama</h3>
            <p className="text-zinc-400 text-xs mt-1">Run open-source LLMs locally (Llama 3, Mistral) without needing an internet connection or API subscription.</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <Flame className="h-5 w-5 text-amber-400 mb-2" />
            <h3 className="font-semibold text-white text-sm">Modular & Extensible</h3>
            <p className="text-zinc-400 text-xs mt-1">Easily write community plugins or contribute system prompt rubrics to the public repository.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
