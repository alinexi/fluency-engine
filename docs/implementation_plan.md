# Fluency Engine — Implementation Plan (v3)

**Project:** TypeCoach OS — Open-Source Grammar & Typing Tutor  
**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui  
**Repo:** `f:\Github\fluency-engine`  
**Deployment:** Vercel (API routes as serverless functions)

## Core Architecture: Two Independent Features

> [!IMPORTANT]
> The **Typing Studio** and the **Writing Coach** are two completely separate features. They do not feed into each other. A user can use one without ever touching the other. They share only the design system, navigation shell, and settings infrastructure.

```
fluency-engine/
├── app/
│   ├── page.tsx              ← Home / feature selector
│   ├── studio/               ← Feature 1: Typing Studio (no AI)
│   │   ├── page.tsx
│   │   └── session/page.tsx
│   ├── coach/                ← Feature 2: Writing Coach (AI)
│   │   ├── page.tsx
│   │   └── results/page.tsx
│   ├── settings/page.tsx     ← Shared BYOK + preferences
│   └── api/
│       └── evaluate/route.ts ← Only used by /coach
├── lib/
│   ├── engine/               ← Only used by /studio
│   └── plugins/              ← Only used by /coach
└── components/
    ├── typing/               ← Studio-only components
    ├── coaching/             ← Coach-only components
    └── ui/                   ← Shared design system
```

## Decisions Locked In

| Decision | Choice |
|---|---|
| **Deployment** | Vercel — API keys AES-GCM encrypted in `localStorage`; never stored server-side |
| **AI Providers** | OpenAI GPT-4o (reference), Ollama (local/OSS), DeepSeek |
| **Exam Modes** | IELTS Writing Task 2, TOEFL Independent/Integrated, Academic English B1→C1 |
| **Language Scope** | English only |
| **Feature Coupling** | **Zero** — Typing Studio and Writing Coach are fully independent |

---

## Proposed Changes

The project is currently empty (only `.gitignore` and `initialPrompt.txt`). All files below are **[NEW]**.

---

### Phase 0 — Project Scaffold & Design System

Bootstrap the Next.js app with the full toolchain, global design tokens, and a shared navigation shell that surfaces both features.

#### [NEW] `package.json` / Next.js app root
- `next`, `react`, `react-dom` (latest)
- `typescript`, `tailwindcss`, `postcss`
- `shadcn/ui` + `@radix-ui/*` headless primitives
- `framer-motion` — micro-animations, caret, slider transitions
- `zustand` — separate stores per feature (no cross-feature state leakage)
- `idb` — IndexedDB wrapper for session persistence
- `zod` — runtime validation of AI JSON payloads and plugin configs
- `recharts` — metrics charts in Studio; band score radar in Coach

#### [NEW] `app/layout.tsx`
Global shell: font loading (Geist Sans + Geist Mono), theme provider, persistent top nav with links to **Studio** and **Coach**.

#### [NEW] `app/globals.css`
Design tokens:
- Dark terminal base (`#0d0d0f`)
- Neon-green caret accent for Studio
- Deep violet accent for Coach
- Thermal heatmap palette: `indigo-500 → amber-400 → orange-500`

#### [NEW] `app/page.tsx` — Home / Feature Selector
Two large feature cards on a hero landing page:
- **Typing Studio** — "Build muscle memory. Upload a text, type it perfectly."
- **Writing Coach** — "Write under exam conditions. Get AI band-score feedback."
Each card links to its respective route. No functional overlap.

---

### Phase 1 — Feature 1: Typing Studio (`/studio`)

**What it is:** A standalone copywork engine. The user uploads a `.txt` file and types it character-by-character. The engine enforces accuracy. No AI, no internet required.

**What it is NOT:** It does not evaluate English proficiency. It does not send anything to an API. It has nothing to do with IELTS/TOEFL.

#### [NEW] `lib/engine/parser.ts`
Parses an uploaded `.txt` file into **typing blocks** (paragraphs → sentences → tokens). Handles CRLF normalization and smart quotes.

#### [NEW] `lib/engine/strictMatch.ts`
The core keystroke loop:
- Compares each character against the source block.
- **Halts progression on mismatch** — user must backspace to the error.
- Tracks insertions/deletions for accuracy.
- Emits typed events: `onCorrect`, `onError`, `onBlockComplete`, `onSessionComplete`.

#### [NEW] `lib/engine/metrics.ts`
Computes per-session:
- **Gross WPM** and **Net WPM**
- **Accuracy %**
- **Error map** — character positions misfired
- **Daily streak** — via `localStorage` date-stamping

#### [NEW] `store/studioStore.ts`
Zustand store scoped entirely to Studio:
- Current `.txt` source, parsed blocks, cursor position
- Live session metrics
- Session history (persisted via IndexedDB)

#### [NEW] `components/typing/TypingCanvas.tsx`
The primary Studio interactive component:
- Renders source text with per-character `<span>` states: `correct` / `incorrect` / `pending`.
- Animated blinking caret (framer-motion).
- Keyboard capture — blocks paste, right-click, and modifier shortcuts.
- Responsive from mobile to ultrawide.

#### [NEW] `components/typing/SessionHUD.tsx`
Live stats overlay during a session: real-time WPM, accuracy bar, elapsed time, streak badge.

#### [NEW] `components/typing/FileDropzone.tsx`
Drag-and-drop `.txt` uploader with file validation and a 200-character source preview before starting.

#### [NEW] `components/typing/ResultCard.tsx`
Post-session summary: WPM, accuracy, errors, time, streak milestone. Has a "Try Again" and "Upload New File" CTA. No link to the Coach feature.

#### [NEW] `components/analytics/StreakCalendar.tsx`
GitHub-style contribution heatmap of Studio session days.

#### [NEW] `components/analytics/MetricsChart.tsx`
Line chart of WPM and accuracy trend across the last N sessions.

#### [NEW] `app/studio/page.tsx`
Studio entry point:
- Shows the `FileDropzone` if no file is loaded.
- Shows recent session history below.
- Links to the full-screen session.

#### [NEW] `app/studio/session/page.tsx`
Full-screen typing session:
- `TypingCanvas` + `SessionHUD`.
- Escape → pause modal.
- On completion → `ResultCard`. Nothing else happens. No AI prompt.

---

### Phase 2 — Feature 2: Writing Coach (`/coach`)

**What it is:** A standalone AI essay evaluator. The user chooses an exam mode, reads a writing prompt, types a free-form response in a blank editor, submits it, and receives structured AI feedback.

**What it is NOT:** It does not measure typing speed. It does not use the Studio engine. The user is not copying any text.

#### [NEW] `lib/plugins/types.ts`
The **plugin interface contract** (used exclusively by the Coach):
```ts
type ExamMode = 'ielts-task2' | 'toefl-independent' | 'toefl-integrated' | 'academic-b1' | 'academic-b2' | 'academic-c1';

interface CoachingPlugin {
  id: string;
  name: string;
  evaluate(essay: string, promptText: string, mode: ExamMode): Promise<EvalResult>;
}

interface EvalResult {
  taskAchievement:  BandScore;
  coherenceCohesion: BandScore;
  lexicalResource:  BandScore;
  grammaticalRange: BandScore;
  overallBand:      number;
  coachingCards:    CoachingCard[];
  vocabularyMap:    VocabToken[];   // each word + CEFR level A1–C2
}
```

#### [NEW] `lib/plugins/openai.plugin.ts`
**Reference plugin.** GPT-4o with `response_format: json_schema` structured outputs. Ships six system prompts — one per exam mode.

#### [NEW] `lib/plugins/ollama.plugin.ts`
**Local/OSS plugin.** Sends to `http://localhost:11434`. No API key. Compatible with any Ollama model (Llama 3, Mistral, Phi-3, Qwen…).

#### [NEW] `lib/plugins/deepseek.plugin.ts`
**DeepSeek plugin.** Targets `api.deepseek.com`. Cost-effective; same structured-output contract as the reference plugin.

#### [NEW] `lib/plugins/registry.ts`
Maps plugin IDs to implementations. Loaded dynamically — Studio users never download plugin code.

#### [NEW] `app/api/evaluate/route.ts`
`POST /api/evaluate` — Vercel serverless function:
- Decrypts BYOK API key passed in `Authorization` header.
- Routes to correct plugin via registry.
- Streams or returns `EvalResult` JSON.
- IP-based rate limiting.

#### [NEW] `prompts/` — Exam Prompt Repository
Six prompt config files for the Coach (not relevant to Studio):

| File | Mode | Scoring Scale |
|---|---|---|
| `prompts/ielts-writing-task2.json` | IELTS Writing Task 2 | Band 0–9 |
| `prompts/toefl-independent.json` | TOEFL Independent Essay | Score 0–30 |
| `prompts/toefl-integrated.json` | TOEFL Integrated Essay | Score 0–30 |
| `prompts/academic-b1.json` | Academic English B1 | CEFR B1 rubric |
| `prompts/academic-b2.json` | Academic English B2 | CEFR B2 rubric |
| `prompts/academic-c1.json` | Academic English C1 | CEFR C1 rubric |

Each file defines: `systemPrompt`, `mode`, `scoringRubric`, `cefrLevel`, `wordCountTarget`, `timeLimitMinutes`.

#### [NEW] `store/coachStore.ts`
Zustand store scoped entirely to the Coach:
- Selected exam mode, active prompt, essay text
- `EvalResult` from the last submission
- Evaluation loading state

#### [NEW] `app/coach/page.tsx`
Coach entry point:
- **Mode selector** — large cards for IELTS / TOEFL / Academic B1–C1.
- **Prompt picker** — randomly selected or user-chosen from the prompt library.
- Word count target, time limit, and a "Start Writing" CTA.
- No reference to the Studio feature.

#### [NEW] `app/coach/results/page.tsx`
Coach results page — rendered after `EvalResult` is received. Hosts all feedback UI components below.

#### [NEW] `components/coaching/WritingEditor.tsx`
Full-screen plain-text editor for the Coach:
- Live word count and countdown timer.
- No character-matching, no halt-on-error.
- "Submit for Review" button — triggers `POST /api/evaluate`.
- Completely separate from `TypingCanvas`.

#### [NEW] `components/coaching/CoachingDeck.tsx`
The **Coach's Desk** — right-side sliding panel:
- Coaching cards per flagged sentence.
- Card types: `grammar` · `lexical` · `coherence` · `taskAchievement`.
- Clicking a card highlights the relevant sentence in the essay view.

#### [NEW] `components/coaching/BeforeAfterSlider.tsx`
Interactive drag slider per coaching card:
- Left: user's original phrasing.
- Right: AI's Band 9 / C1 rewrite.
- Words animate between versions via framer-motion layout animations.

#### [NEW] `components/coaching/VocabularyHeatmap.tsx`
Post-evaluation word-level thermal heatmap:
- `indigo` (A1/A2) → `amber` (B1/B2) → `orange` (C1/C2) per word.
- Hover: shows CEFR level + synonym suggestion.

#### [NEW] `components/coaching/SyntaxTree.tsx`
Animated SVG syntax decomposition for flagged sentences:
- Subject → Verb → Object nodes.
- Broken agreement pulses red with an explanatory label.
- Lightweight hand-rolled tree layout (no D3 bundle).

#### [NEW] `components/coaching/BandScoreRadar.tsx`
Four-axis radar chart (recharts `RadarChart`): Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range — with overall band in the center.

---

### Phase 3 — Shared: Settings, BYOK & Open-Source Tooling

Settings are the only shared infrastructure between Studio and Coach.

#### [NEW] `app/settings/page.tsx`
Settings dashboard with two clear sections:

**Writing Coach Settings**
- AI Provider selector: OpenAI · Ollama · DeepSeek · (community).
- API Key per provider — AES-GCM encrypted via SubtleCrypto, stored in `localStorage`. Never sent to Vercel.
- Ollama base URL field (default `http://localhost:11434`) + model name picker.
- Default exam mode.

**Typing Studio Settings**
- Strict Mode toggle (halt-on-error vs. flag-and-continue).
- Theme (dark / light / high-contrast).

#### [NEW] `lib/crypto/keyStore.ts`
Wraps `window.crypto.subtle` for AES-GCM encrypt/decrypt of API keys at rest.

#### [NEW] `CONTRIBUTING.md`
- How to add a new AI plugin to the Coach.
- How to add a new prompt JSON.
- How to run Ollama locally for fully offline Coach development.
- How to contribute Studio improvements.

#### [NEW] `ARCHITECTURE.md`
Diagram showing the hard boundary between Studio (pure client) and Coach (client + API route), plus the plugin registry flow.

---

## Verification Plan

### Phase 1 — Studio Tests
```bash
pnpm test lib/engine/   # strictMatch, metrics, parser unit tests
pnpm run build          # No TypeScript errors
```
Key cases:
- `strictMatch`: mismatch halts; backspace recovers; block completion fires.
- `metrics`: WPM formula; streak day-boundary logic.
- `parser`: CRLF, blank lines, smart quotes.

Manual:
- Upload `.txt` → session starts, source renders correctly.
- Typo → engine halts at error character (red highlight).
- Complete session → `ResultCard` shown, no AI prompt or Coach link appears.
- Refresh → session history persists (IndexedDB).

### Phase 2 — Coach Tests
```bash
pnpm test lib/plugins/   # Plugin interface mocks, EvalResult schema validation
```
Key cases:
- Mock plugin returns fixture → `CoachingDeck` renders correct card count.
- `VocabularyHeatmap` applies correct CSS class per CEFR level.
- `BeforeAfterSlider` renders both sides and slider handle.

Manual:
- Navigate to `/coach` — no Studio elements visible.
- Select IELTS mode, pick prompt, write essay, submit.
- Coaching cards appear; clicking one highlights the sentence.
- Drag Before/After slider → words animate.
- Vocab heatmap visible; hover shows CEFR level.
- Switch provider OpenAI → DeepSeek in Settings → next evaluation uses DeepSeek.
- Set Ollama URL → evaluation routes to localhost with no API key.

---

## Phased Delivery Timeline

| Phase | Scope | Deliverable |
|---|---|---|
| **0** | Scaffold, design system, shared nav | Deployable shell — two feature cards on home |
| **1** | Typing Studio complete | Fully functional copywork MVP, zero API deps |
| **2** | Writing Coach complete | AI essay evaluator with all 4 feedback widgets |
| **3** | Settings, BYOK, community docs | Open-source ready release on Vercel |
