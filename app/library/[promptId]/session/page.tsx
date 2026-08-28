'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import { SessionHUD } from '@/components/typing/SessionHUD';
import { TypingCanvas } from '@/components/typing/TypingCanvas';
import { ExamResultCard } from '@/components/typing/ExamResultCard';
import { EXAM_PROMPTS } from '@/lib/exam/examData';

export default function ExamSessionPage({ params }: { params: Promise<{ promptId: string }> }) {
  const { promptId } = use(params);
  const { parsedText, matchState } = useStudioStore();
  const router = useRouter();

  const prompt = EXAM_PROMPTS.find(p => p.id === promptId);

  useEffect(() => {
    if (!parsedText) {
      router.push(`/library/${promptId}`);
    }
  }, [parsedText, router, promptId]);

  if (!parsedText || !matchState) return null;

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
        <Link
          href={`/library/${promptId}`}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--brand-emerald)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Exit Session
        </Link>

        {/* Breadcrumb */}
        {prompt && (
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-subtle)]">
            <span>{prompt.exam}</span>
            <ChevronRight className="h-3 w-3" />
            <span>{prompt.task}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--text-main)] font-bold">{prompt.questionType}</span>
          </div>
        )}

        <div className="text-xs font-mono text-[var(--text-subtle)]">
          {parsedText.totalWords} words
        </div>
      </div>

      {/* Main Content */}
      {matchState.isCompleted ? (
        <ExamResultCard promptId={promptId} />
      ) : (
        <div className="space-y-6">
          <SessionHUD />
          <TypingCanvas />
        </div>
      )}
    </div>
  );
}
