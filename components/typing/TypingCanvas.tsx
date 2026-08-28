'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { useStudioStore } from '@/store/studioStore';
import { cn } from '@/lib/utils';
import { Keyboard, CheckCircle2 } from 'lucide-react';

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

  const targetChars = useMemo(() => parsedText?.fullText.split('') || [], [parsedText?.fullText]);
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
  }, [targetChars]);


  if (!parsedText || !matchState) return null;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative outline-none cursor-default select-none rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 sm:p-12 shadow-2xl backdrop-blur-2xl min-h-[340px] transition-all"
    >
      {/* Focus overlay header */}
      <div className="text-xs font-mono text-[var(--text-muted)] mb-8 flex items-center justify-between border-b border-[var(--border-color)] pb-4">
        <span className="flex items-center gap-2 font-bold tracking-wide text-[var(--text-main)]">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand-emerald)] animate-pulse shadow-[0_0_8px_var(--brand-emerald)]" />
          <Keyboard className="h-4 w-4 text-[var(--brand-emerald)]" />
          COPYWORK CANVAS · KEYBOARD ACTIVE
        </span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[var(--text-subtle)] font-mono text-[11px]">
            <span>🌐</span> english
          </span>
          <span className="font-bold bg-[var(--bg-input)] text-[var(--text-main)] px-3 py-1 rounded-full border border-[var(--border-color)]">
            {currentIndex} / {targetChars.length} CHARS
          </span>
        </div>
      </div>

      {/* Character Grid — Grouped by word to prevent words breaking across lines */}
      <div className="font-mono text-xl sm:text-2xl leading-loose tracking-wide flex flex-wrap gap-y-3 gap-x-0.5">
        {wordTokens.map((token, tokenIdx) => (
          <span key={tokenIdx} className="inline-block whitespace-nowrap">
            {token.map(({ globalIdx, char }) => {
              const isCurrent = globalIdx === currentIndex;
              const charState = matchState.charStates[globalIdx];

              let stateStyles = 'text-[var(--untyped-text)]';
              if (charState === 'correct') {
                stateStyles = showCharBoxes
                  ? 'text-[var(--typed-text)] font-semibold bg-emerald-500/15 rounded-md border border-emerald-500/20'
                  : 'text-[var(--typed-text)] font-semibold';
              } else if (charState === 'incorrect') {
                stateStyles = showCharBoxes
                  ? 'text-rose-600 dark:text-rose-400 font-bold bg-rose-500/25 underline decoration-rose-500 rounded-md border border-rose-500/30'
                  : 'text-rose-600 dark:text-rose-400 font-bold underline decoration-rose-500';
              }

              return (
                <span
                  key={globalIdx}
                  className={cn(
                    'relative transition-colors duration-150 px-[2px] py-[1px]',
                    stateStyles,
                    isCurrent && (showActiveHighlight
                      ? 'bg-[var(--bg-card-hover)] text-[var(--text-main)] font-bold ring-2 ring-[var(--brand-emerald)] rounded-md shadow-sm'
                      : 'text-[var(--text-main)] font-bold'
                    )
                  )}
                >
                  {/* Caret Line */}
                  {isCurrent && (
                    <span className="absolute -left-[1px] top-0 bottom-0 w-[3px] bg-[var(--caret-color)] animate-caret rounded-full shadow-[0_0_10px_var(--caret-color)]" />
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
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-zinc-950/90 dark:bg-zinc-950/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="text-center space-y-4 max-w-sm px-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-2xl">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-3xl font-extrabold text-white tracking-tight">Copywork Completed!</h3>
            <p className="text-sm text-zinc-400">Excellent precision! Review your performance metrics below.</p>
          </div>
        </div>
      )}
    </div>
  );
}
