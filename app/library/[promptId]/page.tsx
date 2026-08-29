'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { ArrowLeft, ChevronRight, Play, BookOpen, Target, MessageSquare } from 'lucide-react';
import { EXAM_PROMPTS } from '@/lib/exam/examData';
import { useStudioStore } from '@/store/studioStore';
import { AnnotatedWord, AnnotatedSpan } from '@/lib/exam/examLibrary';

function HighlightedText({
  text,
  vocab,
  structures,
}: {
  text: string;
  vocab: AnnotatedWord[];
  structures: AnnotatedSpan[];
}) {
  // Build sorted list of all annotation spans
  type Span = { start: number; end: number; type: 'vocab' | 'structure'; data: AnnotatedWord | AnnotatedSpan };
  const spans: Span[] = [];

  vocab.forEach(v => {
    let idx = 0;
    while (idx < text.length) {
      const pos = text.toLowerCase().indexOf(v.word.toLowerCase(), idx);
      if (pos === -1) break;
      spans.push({ start: pos, end: pos + v.word.length, type: 'vocab', data: v });
      idx = pos + v.word.length;
    }
  });

  structures.forEach(s => {
    const pos = text.toLowerCase().indexOf(s.phrase.toLowerCase());
    if (pos !== -1) {
      spans.push({ start: pos, end: pos + s.phrase.length, type: 'structure', data: s });
    }
  });

  // Sort by start, resolve overlaps (first wins)
  spans.sort((a, b) => a.start - b.start);
  const resolved: Span[] = [];
  let cursor = 0;
  for (const span of spans) {
    if (span.start >= cursor) {
      resolved.push(span);
      cursor = span.end;
    }
  }

  // Build JSX
  const parts: React.ReactNode[] = [];
  let pos = 0;
  for (const span of resolved) {
    if (span.start > pos) {
      parts.push(<span key={pos}>{text.slice(pos, span.start)}</span>);
    }
    const segText = text.slice(span.start, span.end);
    if (span.type === 'vocab') {
      const v = span.data as AnnotatedWord;
      parts.push(
        <span
          key={span.start}
          className="relative group cursor-help"
        >
          <span className="underline decoration-[var(--brand-amber)]/70 decoration-2 underline-offset-2 text-[var(--brand-amber)] font-bold">{segText}</span>
          <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-3 text-xs text-[var(--text-main)] shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity z-30 leading-snug">
            <span className="flex items-center justify-between font-bold text-[var(--brand-amber)] mb-1">
              <span>{segText}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--brand-amber)]/10 border border-[var(--brand-amber)]/20">{v.cefr}</span>
            </span>
            <span className="text-[var(--text-muted)] text-[11px] block">{v.explanation}</span>
          </span>
        </span>
      );
    } else {
      const s = span.data as AnnotatedSpan;
      parts.push(
        <span
          key={span.start}
          className="relative group cursor-help"
        >
          <span className="underline decoration-[var(--brand-violet)]/60 decoration-dashed decoration-2 underline-offset-2 text-[var(--text-main)] font-medium">{segText}</span>
          <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-3 text-xs text-[var(--text-main)] shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity z-30 leading-snug">
            <span className="block font-bold text-[var(--brand-violet)] mb-1">{s.label}</span>
            <span className="text-[var(--text-muted)] text-[11px] block">{s.explanation}</span>
          </span>
        </span>
      );
    }
    pos = span.end;
  }
  if (pos < text.length) {
    parts.push(<span key={pos}>{text.slice(pos)}</span>);
  }

  return <span className="leading-loose">{parts}</span>;
}

export default function BriefingRoomPage({ params }: { params: Promise<{ promptId: string }> }) {
  const { promptId } = use(params);
  const prompt = EXAM_PROMPTS.find(p => p.id === promptId);
  const loadText = useStudioStore(state => state.loadText);
  const router = useRouter();

  if (!prompt) {
    return (
      <div className="py-20 text-center text-[var(--text-muted)] space-y-4">
        <p className="text-lg font-semibold">Prompt not found.</p>
        <Link href="/library" className="inline-block text-sm font-bold text-[var(--brand-emerald)] hover:underline">← Back to Library</Link>
      </div>
    );
  }

  const handleStart = () => {
    loadText(prompt.sampleAnswer, `${prompt.exam} · ${prompt.questionType}`, prompt.id);
    router.push(`/library/${prompt.id}/session`);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
        <Link href="/library" className="hover:text-[var(--brand-emerald)] transition-colors">Library</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-[var(--text-subtle)]">{prompt.exam}</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-[var(--text-subtle)]">{prompt.task}</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-[var(--text-main)] font-bold">{prompt.questionType}</span>
      </div>

      {/* Back link */}
      <Link href="/library" className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--brand-emerald)] transition-colors -mt-4">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Library
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 items-start">

        {/* ── Left Column: The Prompt ── */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--brand-emerald)]">
            <Target className="h-4 w-4" />
            EXAM PROMPT
          </div>

          {/* Main question card */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4 shadow-sm">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[var(--brand-emerald)]/10 border border-[var(--brand-emerald)]/20 px-3 py-1 text-[10px] font-mono font-bold text-[var(--brand-emerald)] uppercase tracking-wider">
                {prompt.exam}
              </span>
              <span className="rounded-full bg-[var(--bg-input)] border border-[var(--border-color)] px-3 py-1 text-[10px] font-mono text-[var(--text-subtle)]">
                {prompt.task} · {prompt.questionType}
              </span>
              <span className="rounded-full bg-[var(--bg-input)] border border-[var(--border-color)] px-3 py-1 text-[10px] font-mono text-[var(--text-subtle)]">
                ~{prompt.targetWordCount} words
              </span>
            </div>
            <p className="text-[var(--text-main)] leading-relaxed text-sm font-medium">{prompt.promptText}</p>
          </div>

          {/* TOEFL Reading Passage */}
          {prompt.toeflReadingPassage && (
            <div className="rounded-2xl border border-[var(--brand-violet)]/20 bg-[var(--brand-violet)]/5 p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--brand-violet)]">
                <BookOpen className="h-4 w-4" /> READING PASSAGE
              </div>
              <p className="text-sm text-[var(--text-main)] leading-relaxed">{prompt.toeflReadingPassage}</p>
            </div>
          )}

          {/* TOEFL Academic Discussion */}
          {prompt.toeflStudentReplies && (
            <div className="rounded-2xl border border-[var(--brand-violet)]/20 bg-[var(--brand-violet)]/5 p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--brand-violet)]">
                <MessageSquare className="h-4 w-4" /> CLASS DISCUSSION
              </div>
              <div className="space-y-3">
                {/* Professor */}
                <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] p-4">
                  <div className="text-[10px] font-mono font-bold text-[var(--brand-violet)] mb-1.5">PROFESSOR</div>
                  <p className="text-sm text-[var(--text-main)] leading-relaxed">{prompt.toeflStudentReplies.professorQuestion}</p>
                </div>
                {/* Student A */}
                <div className="rounded-xl bg-[var(--bg-input)] border border-[var(--border-color)] p-4 ml-4">
                  <div className="text-[10px] font-mono font-bold text-[var(--brand-emerald)] mb-1.5">{prompt.toeflStudentReplies.studentA.name.toUpperCase()}</div>
                  <p className="text-sm text-[var(--text-main)] leading-relaxed">{prompt.toeflStudentReplies.studentA.text}</p>
                </div>
                {/* Student B */}
                <div className="rounded-xl bg-[var(--bg-input)] border border-[var(--border-color)] p-4 ml-4">
                  <div className="text-[10px] font-mono font-bold text-[var(--brand-amber)] mb-1.5">{prompt.toeflStudentReplies.studentB.name.toUpperCase()}</div>
                  <p className="text-sm text-[var(--text-main)] leading-relaxed">{prompt.toeflStudentReplies.studentB.text}</p>
                </div>
              </div>
            </div>
          )}

          {/* Prompt Image (IELTS Task 1 charts/maps) */}
          {prompt.promptImageUrl && (
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-2 overflow-hidden shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={prompt.promptImageUrl} alt="Exam chart or map" className="w-full object-contain max-h-72 rounded-xl" />
            </div>
          )}
        </div>

        {/* ── Right Column: Sample Answer ── */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--brand-emerald)]">
            <BookOpen className="h-4 w-4" />
            BAND 9 SAMPLE ANSWER
            <span className="ml-auto text-[10px] text-[var(--text-subtle)] font-normal normal-case">Hover highlighted words for insights</span>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-[10px] font-mono text-[var(--text-subtle)]">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-0.5 bg-[var(--brand-amber)] rounded" />
              Vocabulary (C1/C2)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-0.5 border-t-2 border-dashed border-[var(--brand-violet)] rounded" />
              Grammar structure
            </span>
          </div>

          {/* Annotated answer */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 text-sm text-[var(--text-main)] leading-loose shadow-sm">
            <HighlightedText
              text={prompt.sampleAnswer}
              vocab={prompt.highlightedVocab}
              structures={prompt.highlightedStructures}
            />
          </div>

          {/* Scoring notes callout */}
          <div className="rounded-2xl border border-[var(--brand-emerald)]/30 bg-[var(--brand-emerald)]/5 p-5 space-y-1.5">
            <div className="text-xs font-mono font-bold text-[var(--brand-emerald)]">WHY THIS ANSWER SCORES HIGHLY</div>
            <p className="text-sm text-[var(--text-main)] leading-relaxed">{prompt.scoringNotes}</p>
          </div>

          {/* CTA */}
          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-3 rounded-2xl bg-[var(--brand-emerald)] hover:opacity-90 text-white font-bold text-sm py-4 shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Play className="h-5 w-5 fill-white" />
            Start Typing Practice
          </button>

          <p className="text-center text-[10px] text-[var(--text-subtle)] font-mono">
            You will type the sample answer above character-by-character using the strict-match engine.
          </p>
        </div>

      </div>
    </div>
  );
}
