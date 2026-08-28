'use client';

import React from 'react';
import { GitGraph } from 'lucide-react';

export function SyntaxTree() {
  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 backdrop-blur-xl space-y-4 shadow-xl">
      <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
        <GitGraph className="h-5 w-5 text-[var(--brand-violet)]" />
        <h3 className="text-base font-bold text-[var(--text-main)]">Syntax Decomposition Tree</h3>
      </div>

      <div className="flex flex-col items-center justify-center p-6 bg-[var(--bg-input)] rounded-xl border border-[var(--border-color)]">
        
        {/* SVG Syntax Diagram */}
        <svg className="w-full max-w-md h-44" viewBox="0 0 400 160">
          {/* Connecting Lines */}
          <line x1="200" y1="30" x2="100" y2="80" stroke="#64748b" strokeWidth="2" />
          <line x1="200" y1="30" x2="300" y2="80" stroke="#64748b" strokeWidth="2" />
          <line x1="300" y1="80" x2="250" y2="130" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
          <line x1="300" y1="80" x2="350" y2="130" stroke="#10b981" strokeWidth="2" />

          {/* Root Node: Sentence */}
          <g transform="translate(200, 30)">
            <rect x="-40" y="-15" width="80" height="30" rx="6" fill="var(--bg-card)" stroke="#8b5cf6" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontFamily="monospace" fontWeight="bold">S (Clause)</text>
          </g>

          {/* Left Branch: Subject NP */}
          <g transform="translate(100, 80)">
            <rect x="-45" y="-15" width="90" height="30" rx="6" fill="var(--bg-card)" stroke="#3b82f6" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fill="#3b82f6" fontSize="12" fontFamily="monospace" fontWeight="bold">NP (Subject)</text>
          </g>

          {/* Right Branch: Verb VP */}
          <g transform="translate(300, 80)">
            <rect x="-45" y="-15" width="90" height="30" rx="6" fill="var(--bg-card)" stroke="#f59e0b" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fill="#d97706" fontSize="12" fontFamily="monospace" fontWeight="bold">VP (Predicate)</text>
          </g>

          {/* Broken Agreement Node (Red) */}
          <g transform="translate(250, 130)">
            <rect x="-45" y="-15" width="90" height="30" rx="6" fill="var(--bg-card)" stroke="#ef4444" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fill="#ef4444" fontSize="11" fontFamily="monospace" fontWeight="bold">Verb Disconnect</text>
          </g>

          {/* Object NP Node (Green) */}
          <g transform="translate(350, 130)">
            <rect x="-40" y="-15" width="80" height="30" rx="6" fill="var(--bg-card)" stroke="#10b981" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fill="#10b981" fontSize="11" fontFamily="monospace" fontWeight="bold">Compl (OK)</text>
          </g>
        </svg>

        <p className="text-xs text-[var(--text-subtle)] font-mono mt-2 text-center">
          Visualizing subject-verb agreement breakdown across distant clause boundaries.
        </p>
      </div>
    </div>
  );

}
