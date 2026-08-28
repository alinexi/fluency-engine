'use client';

import React, { useState } from 'react';
import { Upload, FileText, Sparkles, BookOpen } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import { useRouter } from 'next/navigation';

const SAMPLE_TEXTS = [
  {
    title: 'The Art of Writing (Schopenhauer)',
    content: `Style is the physiognomy of the mind, and a safer guide to it than the body. To imitate another man's style is like wearing a mask. However fine the mask, it soon appears insipid and intolerable because it is lifeless; so that even the ugliest face is better.`,
  },
  {
    title: 'Academic Abstract: Neural Networks',
    content: `Deep neural networks have demonstrated unprecedented success in empirical cognitive modeling tasks. However, understanding their internal representational dynamics remains a pivotal challenge in artificial intelligence safety research.`,
  },
  {
    title: 'IELTS Band 9 Sample Essay',
    content: `Advancements in technology have fundamentally restructured modern communication paradigms. While critics argue that digital interactions undermine interpersonal relationships, evidence suggests that global connectivity enhances cross-cultural empathy.`,
  },
];

export function FileDropzone() {
  const loadText = useStudioStore(state => state.loadText);
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (!file.name.endsWith('.txt')) {
      alert('Please upload a .txt file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        loadText(text, file.name.replace('.txt', ''));
        router.push('/studio/session');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-8">
      {/* File Drag and Drop Box */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-200 cursor-pointer ${
          dragActive
            ? 'border-emerald-400 bg-emerald-500/10 scale-[1.01]'
            : 'border-zinc-800 bg-zinc-900/40 hover:border-emerald-500/40 hover:bg-zinc-900/70'
        }`}
      >
        <input
          type="file"
          accept=".txt"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
          <Upload className="h-6 w-6" />
        </div>

        <h3 className="text-lg font-semibold text-white">Drop a .txt file here</h3>
        <p className="mt-1 text-sm text-zinc-400">or click to browse from your computer</p>
        <span className="mt-3 inline-block rounded-full bg-zinc-800/80 px-3 py-1 text-xs font-mono text-zinc-400">
          Max file size: 500 KB · Pure client-side parsing
        </span>
      </div>

      {/* Preset Sample Copywork Files */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-4 w-4 text-emerald-400" />
          <h4 className="text-sm font-semibold text-zinc-300">Or try a preset sample text:</h4>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {SAMPLE_TEXTS.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                loadText(sample.content, sample.title);
                router.push('/studio/session');
              }}
              className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-left transition-all hover:border-emerald-500/40 hover:bg-zinc-800/60 group"
            >
              <div>
                <h5 className="font-semibold text-white text-sm group-hover:text-emerald-400 transition-colors">
                  {sample.title}
                </h5>
                <p className="mt-2 text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  "{sample.content}"
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span>{sample.content.length} chars</span>
                <span className="group-hover:translate-x-0.5 transition-transform">Start →</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
