# TypeCoach OS — Architectural Blueprint

```
                     ┌──────────────────────────────────────────────┐
                     │          Top Navigation Shell                │
                     └──────────────────────┬───────────────────────┘
                                            │
               ┌────────────────────────────┴────────────────────────────┐
               ▼                                                         ▼
  ┌─────────────────────────┐                               ┌─────────────────────────┐
  │   Feature 1: Studio     │                               │    Feature 2: Coach     │
  │   Route: /studio        │                               │    Route: /coach        │
  └────────────┬────────────┘                               └────────────┬────────────┘
               │                                                         │
               ▼                                                         ▼
┌──────────────────────────────┐                           ┌──────────────────────────────┐
│  lib/engine/parser.ts        │                           │  lib/plugins/registry.ts     │
│  lib/engine/strictMatch.ts   │                           │  OpenAI / Ollama / DeepSeek  │
│  lib/engine/metrics.ts       │                           └──────────────┬───────────────┘
└──────────────┬───────────────┘                                          │
               │ (Client-Side Only)                                       ▼
               ▼                                           ┌──────────────────────────────┐
┌──────────────────────────────┐                           │  POST /api/evaluate          │
│  components/typing/          │                           └──────────────┬───────────────┘
│  - TypingCanvas              │                                          │
│  - SessionHUD                │                                          ▼
│  - ResultCard                │                           ┌──────────────────────────────┐
└──────────────────────────────┘                           │  components/coaching/        │
                                                           │  - BandScoreRadar            │
                                                           │  - CoachingDeck              │
                                                           │  - BeforeAfterSlider         │
                                                           │  - VocabularyHeatmap         │
                                                           │  - SyntaxTree                │
                                                           └──────────────────────────────┘
                                          │
                                          ▼
                         ┌─────────────────────────────────┐
                         │   Pluggable Database Adapter    │
                         │   (lib/db/dbAdapter.ts)         │
                         └────────────────┬────────────────┘
                                          │
                         ┌────────────────┴────────────────┐
                         ▼                                 ▼
           ┌──────────────────────────┐      ┌──────────────────────────┐
           │ localAdapter.ts          │      │ supabaseAdapter.ts       │
           │ (Web Crypto SHA-256)     │      │ (Future Cloud Integration)│
           └──────────────────────────┘      └──────────────────────────┘
```

## Key Architectural Principles

1. **Strict Separation of Concerns**: Typing Studio (`/studio`) and Writing Coach (`/coach`) are decoupled into independent routes with zero shared domain logic.
2. **Bring Your Own Key (BYOK)**: API keys are encrypted at rest using AES-GCM via `window.crypto.subtle` and stored in local browser storage. They are sent directly to API routes or third-party providers.
3. **Pluggable AI Interface**: Writing Coach uses a standardized `CoachingPlugin` interface, enabling painless integration of cloud models (OpenAI, DeepSeek) or local offline engines (Ollama).
4. **Pluggable Database Adapter Interface**: User authentication and test history are governed by the `DatabaseAdapter` interface (`lib/db/dbAdapter.ts`). Ships with `localAdapter.ts` (using Web Crypto SHA-256 password hashing) for immediate zero-config use, allowing seamless future swap to Supabase or Firebase with zero UI changes.
