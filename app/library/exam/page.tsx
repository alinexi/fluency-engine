'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronRight, Tag, ArrowLeft } from 'lucide-react';
import { EXAM_PROMPTS } from '@/lib/exam/examData';
import { ExamName, TaskName, QuestionType } from '@/lib/exam/examLibrary';
import { cn } from '@/lib/utils';

const EXAMS: ExamName[] = ['IELTS Academic', 'IELTS General', 'TOEFL iBT'];

const TASK_MAP: Record<ExamName, TaskName[]> = {
  'IELTS Academic': ['Task 1', 'Task 2'],
  'IELTS General': ['Task 2'],
  'TOEFL iBT': ['Integrated', 'Academic Discussion'],
};

const EXAM_COLORS: Record<ExamName, string> = {
  'IELTS Academic': 'emerald',
  'IELTS General': 'teal',
  'TOEFL iBT': 'violet',
};

const TASK_LABELS: Record<TaskName, string> = {
  'Task 1': 'Task 1 — Visual Description',
  'Task 2': 'Task 2 — Essay',
  'Integrated': 'Task 1 — Integrated',
  'Academic Discussion': 'Task 2 — Academic Discussion',
};

export default function ExamLibraryPage() {
  const [activeExam, setActiveExam] = useState<ExamName>('IELTS Academic');
  const [activeTask, setActiveTask] = useState<TaskName>('Task 1');
  const [activeType, setActiveType] = useState<QuestionType | 'All'>('All');

  const tasks = TASK_MAP[activeExam];
  const safeTask: TaskName = tasks.includes(activeTask) ? activeTask : tasks[0];

  const filteredByExamTask = useMemo(
    () => EXAM_PROMPTS.filter(p => p.exam === activeExam && p.task === safeTask),
    [activeExam, safeTask]
  );

  const questionTypes = useMemo(() => {
    const types = Array.from(new Set(filteredByExamTask.map(p => p.questionType)));
    return types as QuestionType[];
  }, [filteredByExamTask]);

  const displayed = useMemo(
    () => activeType === 'All'
      ? filteredByExamTask
      : filteredByExamTask.filter(p => p.questionType === activeType),
    [filteredByExamTask, activeType]
  );

  const color = EXAM_COLORS[activeExam];

  const handleExamChange = (exam: ExamName) => {
    setActiveExam(exam);
    setActiveTask(TASK_MAP[exam][0]);
    setActiveType('All');
  };

  const handleTaskChange = (task: TaskName) => {
    setActiveTask(task);
    setActiveType('All');
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
      
      {/* Back to Hub */}
      <Link href="/library" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-emerald-500 transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Central Library Hub
      </Link>

      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono mb-2 text-emerald-500">
          <BookOpen className="h-4 w-4" />
          EXAM LIBRARY
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          IELTS &amp; TOEFL Practice Prompts
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
          Choose an exam type, task, and question format — then practice typing Band 9 model answers.
        </p>
      </div>

      {/* Level 1 — Exam Tabs */}
      <div className="flex flex-wrap gap-3">
        {EXAMS.map(exam => {
          const c = EXAM_COLORS[exam];
          const isActive = exam === activeExam;
          return (
            <button
              key={exam}
              onClick={() => handleExamChange(exam)}
              className={cn(
                'rounded-2xl px-5 py-2.5 text-sm font-bold border transition-all shadow-sm',
                isActive
                  ? c === 'emerald'
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 shadow-emerald-500/10'
                    : c === 'teal'
                    ? 'bg-teal-500/20 text-teal-600 dark:text-teal-400 border-teal-500/40'
                    : 'bg-violet-500/20 text-violet-600 dark:text-violet-400 border-violet-500/40'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              )}
            >
              {exam}
            </button>
          );
        })}
      </div>

      {/* Level 2 — Task Sub-tabs */}
      <div className="flex flex-wrap gap-2 -mt-4">
        {tasks.map(task => (
          <button
            key={task}
            onClick={() => handleTaskChange(task)}
            className={cn(
              'rounded-xl px-4 py-2 text-xs font-mono font-bold border transition-all',
              task === safeTask
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border-emerald-500/40'
                : 'bg-transparent text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900'
            )}
          >
            {TASK_LABELS[task]}
          </button>
        ))}
      </div>

      {/* Level 3 — Question Type Filter Chips */}
      {questionTypes.length > 1 && (
        <div className="flex flex-wrap gap-2 -mt-4">
          <button
            onClick={() => setActiveType('All')}
            className={cn(
              'rounded-full px-3 py-1 text-[11px] font-mono font-bold border transition-all',
              activeType === 'All'
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-200 dark:border-zinc-800'
            )}
          >
            All Types
          </button>
          {questionTypes.map(qt => (
            <button
              key={qt}
              onClick={() => setActiveType(qt)}
              className={cn(
                'rounded-full px-3 py-1 text-[11px] font-mono font-bold border transition-all',
                activeType === qt
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-200 dark:border-zinc-800'
              )}
            >
              {qt}
            </button>
          ))}
        </div>
      )}

      {/* Prompt Cards Grid */}
      {displayed.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-12 text-center">
          <p className="text-zinc-500 text-sm">No prompts found for this selection.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map(prompt => (
            <Link
              key={prompt.id}
              href={`/library/exam/${prompt.id}`}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 p-5 backdrop-blur-xl transition-all hover:border-emerald-500/40 hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                {/* Question Type Badge */}
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {prompt.questionType}
                </div>

                {/* Prompt Text */}
                <p className="text-sm text-zinc-900 dark:text-zinc-100 font-medium leading-relaxed line-clamp-4">
                  {prompt.promptText}
                </p>

                {/* Tag pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {prompt.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400"
                    >
                      <Tag className="h-2.5 w-2.5" />
                      {tag.replace('#', '')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3 text-[11px] font-mono">
                <span className="text-zinc-500">~{prompt.targetWordCount} words</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform font-bold">
                  Start Practice <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
