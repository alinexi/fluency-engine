'use client';

import React, { useState, useEffect } from 'react';
import { Send, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { useCoachStore } from '@/store/coachStore';
import { getDecryptedApiKey } from '@/lib/crypto/keyStore';
import { useRouter } from 'next/navigation';

export function WritingEditor() {
  const {
    activePrompt,
    selectedMode,
    essayText,
    setEssayText,
    isEvaluating,
    setIsEvaluating,
    setError,
    setResult,
    activeProvider,
    ollamaBaseUrl,
    evaluationError,
  } = useCoachStore();

  const router = useRouter();
  const [secondsRemaining, setSecondsRemaining] = useState(
    (activePrompt?.timeLimitMinutes || 40) * 60
  );

  useEffect(() => {
    if (secondsRemaining <= 0) return;
    const interval = setInterval(() => setSecondsRemaining(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [secondsRemaining]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;
  const targetWords = activePrompt?.minWords || 250;
  const isWordCountMet = wordCount >= targetWords;

  const handleSubmit = async () => {
    if (!essayText.trim() || wordCount < 10) {
      setError('Please write at least a paragraph before submitting for AI review.');
      return;
    }

    setIsEvaluating(true);
    setError(null);

    try {
      const apiKey = await getDecryptedApiKey(activeProvider);
      
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          essay: essayText,
          promptText: activePrompt?.promptText || 'General Academic Essay Evaluation',
          mode: selectedMode,
          pluginId: activeProvider,
          apiKey: apiKey || undefined,
          baseUrl: activeProvider === 'ollama' ? ollamaBaseUrl : undefined,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Evaluation request failed with status ${res.status}`);
      }

      const evalData = await res.json();
      setResult(evalData);

      // Auto-save to user profile database if logged in
      const { useAuthStore } = await import('@/store/authStore');
      const { localDbAdapter } = await import('@/lib/db/localAdapter');
      const user = useAuthStore.getState().user;
      if (user) {
        await localDbAdapter.saveCoachResult({
          userId: user.id,
          promptTitle: activePrompt?.title || 'Custom Essay',
          examMode: selectedMode,
          date: new Date().toISOString(),
          essayText,
          result: evalData,
        });
        await useAuthStore.getState().refreshHistoryAndStats();
      }

      router.push('/coach/results');
    } catch (err: unknown) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : 'Failed to connect to AI plugin. Check API key in settings.';
      setError(errMsg);
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Active Prompt Card */}
      {activePrompt && (
        <div className="rounded-2xl border border-violet-500/20 bg-[var(--bg-card)] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-3">
            <span className="rounded-md bg-violet-500/10 px-2.5 py-1 text-xs font-mono font-semibold text-[var(--brand-violet)]">
              PROMPT · {activePrompt.title}
            </span>
            <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-[var(--brand-violet)]" />
                {formatTime(secondsRemaining)}
              </span>
              <span>Target: {activePrompt.minWords}+ words</span>
            </div>
          </div>
          <p className="text-sm text-[var(--text-main)] leading-relaxed font-medium">
            &ldquo;{activePrompt.promptText}&rdquo;
          </p>
        </div>
      )}


      {/* Main Free-Typing Textarea */}
      <div className="relative">
        <textarea
          aria-label="Essay writing editor"
          value={essayText}
          onChange={(e) => setEssayText(e.target.value)}
          placeholder="Begin writing your essay here under exam conditions..."
          className="w-full min-h-[360px] rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 text-[var(--text-main)] placeholder-[var(--text-subtle)] focus:border-[var(--brand-violet)] focus:outline-none text-base leading-relaxed resize-y font-sans shadow-xl"
        />

        {/* Live Footer Stats */}
        <div className="mt-3 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className={isWordCountMet ? 'text-[var(--brand-emerald)] font-semibold' : 'text-[var(--text-muted)]'}>
              Words: {wordCount} / {targetWords}
            </span>
          </div>
          <span className="text-[var(--text-subtle)]">Auto-save enabled</span>
        </div>
      </div>

      {/* Error Alert */}
      {evaluationError && (
        <div className="flex items-center gap-3 rounded-xl bg-rose-500/10 p-4 border border-rose-500/20 text-rose-500 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
          <span>{evaluationError}</span>
        </div>
      )}

      {/* Submit CTA */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSubmit}
          disabled={isEvaluating || wordCount < 10}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-violet-500 shadow-lg shadow-violet-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEvaluating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing with AI Examiner...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Submit for AI Coaching</span>
            </>
          )}
        </button>
      </div>

    </div>
  );

}
