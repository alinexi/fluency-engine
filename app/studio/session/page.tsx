'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStudioStore } from '@/store/studioStore';
import { SessionHUD } from '@/components/typing/SessionHUD';
import { TypingCanvas } from '@/components/typing/TypingCanvas';
import { ResultCard } from '@/components/typing/ResultCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function StudioSessionPage() {
  const { parsedText, matchState } = useStudioStore();
  const router = useRouter();

  useEffect(() => {
    if (!parsedText) {
      router.push('/studio');
    }
  }, [parsedText, router]);

  if (!parsedText || !matchState) return null;

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
      
      {/* Top Header & Navigation */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <Link
          href="/studio"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Exit Session</span>
        </Link>
        <div className="text-sm font-semibold text-white font-mono truncate max-w-xs sm:max-w-md">
          {parsedText.title}
        </div>
        <div className="text-xs font-mono text-zinc-500">
          {parsedText.totalWords} words
        </div>
      </div>

      {/* Main Content Area */}
      {matchState.isCompleted ? (
        <ResultCard />
      ) : (
        <div className="space-y-6">
          <SessionHUD />
          <TypingCanvas />
        </div>
      )}

    </div>
  );
}
