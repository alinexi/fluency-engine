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

  spans.sort((a, b) => a.start - b.start);
  const resolved: Span[] = [];
  let cursor = 0;
  for (const span of spans) {
    if (span.start >= cursor) {
      resolved.push(span);
      cursor = span.end;
    }
  }

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
          title={`${v.cefr} — ${v.explanation}`}
          className="relative group cursor-help"
        >
          <span className="underline decoration-amber-400/70 decoration-2 underline-offset-2 text-amber-500 dark:text-amber-400 font-semibold">{segText}</span>
          <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-xl border border-amber-400/30 bg-white dark:bg-zinc-900 p-2.5 text-[11px] text-zinc-900 dark:text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-20 leading-snug">
            <span className="block font-bold text-amber-500 dark:text-amber-400 mb-0.5">{v.cefr} · {segText}</span>
            {v.explanation}
          </span>
        </span>
      );
    } else {
      const s = span.data as AnnotatedSpan;
      parts.push(
        <span
          key={span.start}
          title={`${s.label} — ${s.explanation}`}
          className="relative group cursor-help"
        >
          <span className="underline decoration-violet-400/60 decoration-dotted decoration-2 underline-offset-2 text-zinc-900 dark:text-white">{segText}</span>
          <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 rounded-xl border border-violet-400/30 bg-white dark:bg-zinc-900 p-2.5 text-[11px] text-zinc-900 dark:text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-20 leading-snug">
            <span className="block font-bold text-violet-500 dark:text-violet-400 mb-0.5">{s.label}</span>
            {s.explanation}
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

export default function ExamBriefingPage({ params }: { params: Promise<{ promptId: string }> }) {
  const { promptId } = use(params);
  const prompt = EXAM_PROMPTS.find(p => p.id === promptId);
  const loadText = useStudioStore(state => state.loadText);
  const router = useRouter();

  if (!prompt) {
    return (
      <div className="py-20 text-center text-zinc-500">
        <p className="text-lg font-semibold">Prompt not found.</p>
        <Link href="/library/exam" className="mt-4 inline-block text-sm text-emerald-500 hover:underline">← Back to Exam Library</Link>
      </div>
    );
  }

  const handleStart = () => {
    loadText(prompt.sampleAnswer, `${prompt.exam} · ${prompt.questionType}`, prompt.id);
    router.push(`/library/exam/${prompt.id}/session`);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <Link href="/library" className="hover:text-emerald-500 transition-colors">Library</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/library/exam" className="hover:text-emerald-500 transition-colors">Exam Library</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-zinc-400">{prompt.exam}</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-zinc-900 dark:text-white font-bold">{prompt.questionType}</span>
      </div>

      {/* Back link */}
      <Link href="/library/exam" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-emerald-500 transition-colors -mt-4">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Exam Library
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 items-start">

        {/* ── Left Column: Prompt Details ── */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-500">
            <Target className="h-4 w-4" />
            EXAM PROMPT
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 p-6 space-y-4 backdrop-blur-xl">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                {prompt.exam}
              </span>
              <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                {prompt.task} · {prompt.questionType}
              </span>
              <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                ~{prompt.targetWordCount} words
              </span>
            </div>
            <p className="text-zinc-900 dark:text-zinc-100 leading-relaxed text-sm">{prompt.promptText}</p>
          </div>

          {prompt.toeflReadingPassage && (
            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400">
                <BookOpen className="h-4 w-4" /> READING PASSAGE
              </div>
              <p className="text-sm text-zinc-900 dark:text-zinc-100 leading-relaxed">{prompt.toeflReadingPassage}</p>
            </div>
          )}

          {prompt.toeflStudentReplies && (
            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-violet-400">
                <MessageSquare className="h-4 w-4" /> CLASS DISCUSSION
              </div>
              <div className="space-y-3">
                <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4">
                  <div className="text-[10px] font-mono font-bold text-violet-400 mb-1.5">PROFESSOR</div>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100 leading-relaxed">{prompt.toeflStudentReplies.professorQuestion}</p>
                </div>
                <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-4 ml-4">
                  <div className="text-[10px] font-mono font-bold text-emerald-500 mb-1.5">{prompt.toeflStudentReplies.studentA.name.toUpperCase()}</div>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100 leading-relaxed">{prompt.toeflStudentReplies.studentA.text}</p>
                </div>
                <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-4 ml-4">
                  <div className="text-[10px] font-mono font-bold text-teal-400 mb-1.5">{prompt.toeflStudentReplies.studentB.name.toUpperCase()}</div>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100 leading-relaxed">{prompt.toeflStudentReplies.studentB.text}</p>
                </div>
              </div>
            </div>
          )}

          {prompt.promptImageUrl && (
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={prompt.promptImageUrl} alt="Exam chart or map" className="w-full object-contain max-h-72" />
            </div>
          )}
        </div>

        {/* ── Right Column: Sample Answer ── */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-500">
            <BookOpen className="h-4 w-4" />
            BAND 9 SAMPLE ANSWER
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-0.5 bg-amber-400 rounded" />
              Vocabulary (C1/C2)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-0.5 border-t-2 border-dashed border-violet-400 rounded" />
              Grammar structure
            </span>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 p-6 text-sm text-zinc-900 dark:text-zinc-100 leading-loose backdrop-blur-xl">
            <HighlightedText
              text={prompt.sampleAnswer}
              vocab={prompt.highlightedVocab}
              structures={prompt.highlightedStructures}
            />
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-1.5">
            <div className="text-xs font-mono font-bold text-emerald-500">WHY THIS ANSWER SCORES HIGHLY</div>
            <p className="text-sm text-zinc-900 dark:text-zinc-100 leading-relaxed">{prompt.scoringNotes}</p>
          </div>

          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm py-4 shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Play className="h-5 w-5 fill-zinc-950" />
            Start Typing Practice
          </button>
        </div>

      </div>
    </div>
  );
}
