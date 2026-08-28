'use client';

import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useStudioStore } from '@/store/studioStore';
import { cn } from '@/lib/utils';
import { Keyboard, CheckCircle2, Settings } from 'lucide-react';

export function TypingCanvas() {
  const {
    parsedText,
    matchState,
    processKey,
    isPaused,
    strictMode,
    toggleStrictMode,
    showCharBoxes,
    toggleCharBoxes,
    showActiveHighlight,
    toggleActiveHighlight,
    boldTypedText,
    toggleBoldTypedText,
  } = useStudioStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const refocusCanvas = () => {
    setTimeout(() => {
      containerRef.current?.focus();
    }, 10);
  };

  // Focus container on mount and recover focus when user types anywhere
  useEffect(() => {
    refocusCanvas();

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }

      if (['Control', 'Alt', 'Shift', 'Meta', 'CapsLock', 'Escape'].includes(e.key)) {
        return;
      }

      if (containerRef.current && document.activeElement !== containerRef.current) {
        containerRef.current.focus();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isPaused) return;

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
      onClick={() => refocusCanvas()}
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

          {/* Settings Gear Popover Button */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsSettingsOpen(prev => !prev);
                refocusCanvas();
              }}
              className="flex items-center gap-1.5 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-card-hover)] text-[var(--text-main)] px-3 py-1 text-xs font-mono border border-[var(--border-color)] transition-all shadow-sm"
              title="Canvas Preferences"
            >
              <Settings className={cn('h-3.5 w-3.5 transition-transform duration-200', isSettingsOpen ? 'text-[var(--brand-emerald)] rotate-45' : 'text-[var(--text-muted)]')} />
              <span>Settings</span>
            </button>

            {/* Gear Dropdown Menu */}
            {isSettingsOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 shadow-2xl backdrop-blur-2xl z-30 space-y-3 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2 text-xs font-mono font-bold text-[var(--text-main)]">
                  <span>CANVAS PREFERENCES</span>
                  <span className="text-[10px] text-[var(--brand-emerald)] font-normal">Auto-saved</span>
                </div>

                {/* 1. Bold Typed Words Toggle */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-main)] font-medium">Bold Typed Text</span>
                  <button
                    type="button"
                    onClick={() => {
                      toggleBoldTypedText();
                      refocusCanvas();
                    }}
                    className={cn(
                      'rounded-lg px-2.5 py-1 font-mono font-bold text-[11px] border transition-all',
                      boldTypedText
                        ? 'bg-emerald-500/15 text-[var(--brand-emerald)] border-emerald-500/30'
                        : 'bg-[var(--bg-input)] text-[var(--text-muted)] border-[var(--border-color)]'
                    )}
                  >
                    {boldTypedText ? 'BOLD ON' : 'BOLD OFF'}
                  </button>
                </div>

                {/* 2. Strict Mode Toggle */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-main)] font-medium">Strict Match Mode</span>
                  <button
                    type="button"
                    onClick={() => {
                      toggleStrictMode();
                      refocusCanvas();
                    }}
                    className={cn(
                      'rounded-lg px-2.5 py-1 font-mono font-bold text-[11px] border transition-all',
                      strictMode
                        ? 'bg-emerald-500/15 text-[var(--brand-emerald)] border-emerald-500/30'
                        : 'bg-[var(--bg-input)] text-[var(--text-muted)] border-[var(--border-color)]'
                    )}
                  >
                    {strictMode ? 'STRICT ON' : 'STRICT OFF'}
                  </button>
                </div>

                {/* 3. Character Background Boxes Toggle */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-main)] font-medium">Character Boxes</span>
                  <button
                    type="button"
                    onClick={() => {
                      toggleCharBoxes();
                      refocusCanvas();
                    }}
                    className={cn(
                      'rounded-lg px-2.5 py-1 font-mono font-bold text-[11px] border transition-all',
                      showCharBoxes
                        ? 'bg-violet-500/15 text-[var(--brand-violet)] border-violet-500/30'
                        : 'bg-[var(--bg-input)] text-[var(--text-muted)] border-[var(--border-color)]'
                    )}
                  >
                    {showCharBoxes ? 'BOXES ON' : 'BOXES OFF'}
                  </button>
                </div>

                {/* 4. Active Character Highlight Toggle */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-main)] font-medium">Active Box Outline</span>
                  <button
                    type="button"
                    onClick={() => {
                      toggleActiveHighlight();
                      refocusCanvas();
                    }}
                    className={cn(
                      'rounded-lg px-2.5 py-1 font-mono font-bold text-[11px] border transition-all',
                      showActiveHighlight
                        ? 'bg-emerald-500/15 text-[var(--brand-emerald)] border-emerald-500/30'
                        : 'bg-[var(--bg-input)] text-[var(--text-muted)] border-[var(--border-color)]'
                    )}
                  >
                    {showActiveHighlight ? 'OUTLINE ON' : 'OUTLINE OFF'}
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>

      {/* Character Grid — Grouped by word to prevent words breaking across lines */}
      <div className="font-mono text-xl sm:text-2xl leading-loose tracking-wide flex flex-wrap gap-y-3 gap-x-0.5">
        {wordTokens.map((token, tokenIdx) => (
          <span key={tokenIdx} className="inline-block whitespace-nowrap">
            {token.map(({ globalIdx, char }) => {
              const isCurrent = globalIdx === currentIndex;
              const charState = matchState.charStates[globalIdx];

              let stateStyles = 'text-[var(--untyped-text)] font-normal';
              if (charState === 'correct') {
                const weight = boldTypedText ? 'font-bold' : 'font-normal';
                stateStyles = showCharBoxes
                  ? `text-[var(--typed-text)] ${weight} bg-emerald-500/15 rounded-md border border-emerald-500/20`
                  : `text-[var(--typed-text)] ${weight}`;
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
                    isCurrent && showActiveHighlight && 'bg-[var(--bg-card-hover)] ring-1 ring-[var(--brand-emerald)]/40 rounded-md'
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

