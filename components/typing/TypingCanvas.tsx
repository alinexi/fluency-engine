'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { useStudioStore } from '@/store/studioStore';
import { cn } from '@/lib/utils';

export function TypingCanvas() {
  const { parsedText, matchState, processKey, isPaused, showCharBoxes, showActiveHighlight } = useStudioStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus container to capture keyboard events
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isPaused) return;

    // Prevent default browser actions for Space, Tab, Backspace, etc.
    if (['Space', 'Backspace', 'Tab'].includes(e.code)) {
      e.preventDefault();
    }

    processKey(e.key);
  };

  const targetChars = parsedText?.fullText.split('') || [];
  const currentIndex = matchState?.currentIndex ?? 0;

  // Group characters into word tokens so words wrap together as unbroken units
  const wordTokens = useMemo(() => {
    if (!targetChars.length) return [];

    const tokens: { globalIdx: number; char: string }[][] = [];
    let currentToken: { globalIdx: number; char: string }[] = [];

    for (let i = 0; i < targetChars.length; i++) {
      const ch = targetChars[i];
      currentToken.push({ globalIdx: i, char: ch });

      // End token after space or at text end
      if (ch === ' ' || i === targetChars.length - 1) {
        tokens.push(currentToken);
        currentToken = [];
      }
    }
    return tokens;
  }, [parsedText?.fullText]);

  if (!parsedText || !matchState) return null;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative outline-none cursor-default select-none rounded-2xl border border-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/90 bg-white/90 p-8 sm:p-12 shadow-2xl backdrop-blur-xl min-h-[300px]"
    >
      {/* Focus overlay header */}
      <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-6 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          COPYWORK CANVAS · KEYBOARD LISTEN ACTIVE
        </span>
        <span>{currentIndex} / {targetChars.length} CHARS</span>
      </div>

      {/* Character Grid — Grouped by word to prevent words breaking across lines */}
      <div className="font-mono text-xl sm:text-2xl leading-relaxed tracking-wide text-zinc-400 dark:text-zinc-500 flex flex-wrap gap-y-2">
        {wordTokens.map((token, tokenIdx) => (
          <span key={tokenIdx} className="inline-block whitespace-nowrap">
            {token.map(({ globalIdx, char }) => {
              const isCurrent = globalIdx === currentIndex;
              const charState = matchState.charStates[globalIdx];

              let stateStyles = 'text-zinc-400 dark:text-zinc-500';
              if (charState === 'correct') {
                stateStyles = showCharBoxes
                  ? 'text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/15 dark:bg-emerald-500/10 rounded-sm'
                  : 'text-emerald-600 dark:text-emerald-400 font-semibold';
              } else if (charState === 'incorrect') {
                stateStyles = showCharBoxes
                  ? 'text-rose-600 dark:text-rose-400 font-bold bg-rose-500/25 dark:bg-rose-500/20 underline decoration-rose-500 rounded-sm'
                  : 'text-rose-600 dark:text-rose-400 font-bold underline decoration-rose-500';
              }

              return (
                <span
                  key={globalIdx}
                  className={cn(
                    'relative transition-colors duration-100 px-[1px]',
                    stateStyles,
                    isCurrent && (showActiveHighlight
                      ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold ring-2 ring-emerald-400 rounded-sm'
                      : 'text-zinc-900 dark:text-white font-bold'
                    )
                  )}
                >
                  {/* Caret Line */}
                  {isCurrent && (
                    <span className="absolute -left-[1px] top-0 bottom-0 w-[3px] bg-emerald-400 animate-caret rounded-full shadow-[0_0_8px_#10b981]" />
                  )}
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </span>
        ))}
      </div>

      {/* Completion Overlay */}
      {matchState.isCompleted && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-zinc-950/90 backdrop-blur-md">
          <div className="text-center space-y-4">
            <div className="text-4xl">🎉</div>
            <h3 className="text-2xl font-bold text-emerald-400">Copywork Completed!</h3>
            <p className="text-sm text-zinc-400">Great job! Check your stats summary below.</p>
          </div>
        </div>
      )}
    </div>
  );
}
