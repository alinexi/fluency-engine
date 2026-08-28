'use client';

import React from 'react';
import { GitGraph } from 'lucide-react';

export function SyntaxTree() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur-xl space-y-4">
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
        <GitGraph className="h-5 w-5 text-violet-400" />
        <h3 className="text-base font-bold text-white">Syntax Decomposition Tree</h3>
      </div>

      <div className="flex flex-col items-center justify-center p-6 bg-zinc-950/60 rounded-xl border border-zinc-800/80">
        
        {/* SVG Syntax Diagram */}
        <svg className="w-full max-w-md h-44" viewBox="0 0 400 160">
          {/* Connecting Lines */}
          <line x1="200" y1="30" x2="100" y2="80" stroke="#4b5563" strokeWidth="2" />
          <line x1="200" y1="30" x2="300" y2="80" stroke="#4b5563" strokeWidth="2" />
          <line x1="300" y1="80" x2="250" y2="130" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
          <line x1="300" y1="80" x2="350" y2="130" stroke="#10b981" strokeWidth="2" />

          {/* Root Node: Sentence */}
          <g transform="translate(200, 30)">
            <rect x="-40" y="-15" width="80" height="30" rx="6" fill="#18181b" stroke="#8b5cf6" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fill="#c084fc" fontSize="12" fontFamily="monospace" fontWeight="bold">S (Clause)</text>
          </g>

          {/* Left Branch: Subject NP */}
          <g transform="translate(100, 80)">
            <rect x="-45" y="-15" width="90" height="30" rx="6" fill="#18181b" stroke="#3b82f6" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fill="#60a5fa" fontSize="12" fontFamily="monospace" fontWeight="bold">NP (Subject)</text>
          </g>

          {/* Right Branch: Verb VP */}
          <g transform="translate(300, 80)">
            <rect x="-45" y="-15" width="90" height="30" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fill="#fbbf24" fontSize="12" fontFamily="monospace" fontWeight="bold">VP (Predicate)</text>
          </g>

          {/* Broken Agreement Node (Red) */}
          <g transform="translate(250, 130)">
            <rect x="-45" y="-15" width="90" height="30" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fill="#fca5a5" fontSize="11" fontFamily="monospace" fontWeight="bold">Verb Disconnect</text>
          </g>

          {/* Object NP Node (Green) */}
          <g transform="translate(350, 130)">
            <rect x="-40" y="-15" width="80" height="30" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontFamily="monospace" fontWeight="bold">Compl (OK)</text>
          </g>
        </svg>

        <p className="text-xs text-zinc-400 font-mono mt-2 text-center">
          Visualizing subject-verb agreement breakdown across distant clause boundaries.
        </p>
      </div>
    </div>
  );
}
