'use client';

import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  originalText: string;
  suggestedText: string;
}

export function BeforeAfterSlider({ originalText, suggestedText }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50); // 0% = Original, 100% = Band 9 Rewrite

  return (
    <div className="space-y-3 rounded-xl border border-violet-500/20 bg-zinc-950/80 p-5">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-rose-400 font-semibold">YOUR ORIGINAL</span>
        <span className="flex items-center gap-1 text-zinc-400">
          <SlidersHorizontal className="h-3.5 w-3.5 text-violet-400" />
          Drag to compare ({sliderPos}%)
        </span>
        <span className="text-emerald-400 font-semibold">BAND 9 REWRITE</span>
      </div>

      {/* Comparison Text Container */}
      <div className="relative overflow-hidden rounded-lg bg-zinc-900 p-4 min-h-[80px] border border-zinc-800 text-sm font-serif leading-relaxed">
        {/* Original Text Layer */}
        <div
          className="transition-opacity duration-150"
          style={{ opacity: 1 - sliderPos / 100 }}
        >
          <span className="text-rose-300 font-medium">{originalText}</span>
        </div>

        {/* Suggested Text Layer (Overlaid) */}
        <div
          className="absolute inset-0 p-4 transition-opacity duration-150"
          style={{ opacity: sliderPos / 100 }}
        >
          <span className="text-emerald-300 font-semibold">{suggestedText}</span>
        </div>
      </div>

      {/* Range Slider Control */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
      />
    </div>
  );
}
