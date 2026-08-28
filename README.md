<div align="center">

# 🧠 Fluency Engine

### *The open-source typing & language-learning platform*

**Practice writing at the highest level — without an internet connection.**
Transcribe Band 9 essays, get AI coaching on your own writing, and build vocabulary through deliberate repetition.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## What Is This?

Fluency Engine is a **three-in-one language learning tool** built for serious IELTS and TOEFL candidates, writers, and anyone who wants to internalize high-quality English through deliberate practice.

| Module | What it does | Needs API? |
|--------|-------------|------------|
| **Typing Studio** | Upload any `.txt` file and transcribe it character-by-character. Builds muscle memory for complex grammar patterns. | ❌ No |
| **Exam Library** | Browse 14+ Band 9 / TOEFL high-score annotated sample answers organized by exam type, task, and question format. Type them to internalize vocabulary and structure. | ❌ No |
| **Writing Coach** | Write a free response to an exam prompt and get detailed AI feedback: Band Score, Coaching Cards, Vocabulary Heatmap, Grammar analysis. | ✅ Yes (BYOK) |

**BYOK = Bring Your Own Key.** The AI coaching layer is fully optional. The rest of the app works entirely offline with zero API dependencies.

---

## Screenshots

> *The app runs on three themes: Dark, Light, and Coffee. All screenshots below are in Coffee mode.*

| Exam Library Browser | Briefing Room | Post-Match Analysis |
|---|---|---|
| *(coming soon)* | *(coming soon)* | *(coming soon)* |

---

## Quickstart

### Prerequisites

- [Node.js](https://nodejs.org) **≥ 18.17** (LTS recommended)
- `npm` (included with Node.js) or `yarn` / `pnpm`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/fluency-engine.git
cd fluency-engine

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The full Typing Studio and Exam Library are immediately usable — no setup required.

### Production Build

```bash
npm run build
npm start
```

---

## Dependency Overview

All dependencies are declared in [`package.json`](package.json). Nothing is hidden.

| Package | Purpose |
|---------|---------|
| `next` 16 | App router, API routes, server components |
| `react` 19 | UI framework |
| `zustand` | Lightweight global state management (studio, auth, coach) |
| `tailwindcss` 4 | Utility-first styling |
| `framer-motion` | Smooth UI animations and transitions |
| `lucide-react` | Icon set |
| `recharts` | Performance charts on result cards |
| `zod` | Runtime validation for AI plugin responses |
| `idb` | IndexedDB wrapper (reserved for future local persistence) |
| `clsx` + `tailwind-merge` | Conditional class utilities |

No external database, no telemetry, no hidden network calls. Everything runs in the browser.

---

## Connecting an AI Provider (Writing Coach)

The Writing Coach is powered by a **pluggable AI layer**. You bring your own API key — it is stored locally in your browser using AES-GCM encryption via the Web Crypto API and is never sent to any server we control.

### Supported Providers

| Provider | Model | Notes |
|----------|-------|-------|
| **OpenAI** | `gpt-4o` (recommended), `gpt-4-turbo`, `gpt-3.5-turbo` | Requires OpenAI API key |
| **DeepSeek** | `deepseek-chat` | Cheaper alternative; very capable for essay grading |
| **Ollama** | Any local model | Run entirely offline; requires [Ollama](https://ollama.ai) installed locally |

### Setup Steps

1. Go to **Settings** (`/settings`) in the app.
2. Select your AI provider (OpenAI, DeepSeek, or Ollama).
3. Paste your API key into the secure key field.
   - For OpenAI: get a key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - For DeepSeek: get a key at [platform.deepseek.com](https://platform.deepseek.com)
   - For Ollama: no key needed — just ensure Ollama is running at `http://localhost:11434`
4. Click **Save**. Your key is encrypted locally and never leaves your device.
5. Navigate to **Writing Coach** and start a session.

### Adding Your Own AI Plugin

The coaching system uses a standardized `CoachingPlugin` interface defined in [`lib/plugins/types.ts`](lib/plugins/types.ts). To add a new provider:

```typescript
// lib/plugins/my-provider.plugin.ts
import { CoachingPlugin, EvalResult } from './types';

export const myProviderPlugin: CoachingPlugin = {
  id: 'my-provider',
  name: 'My Provider',
  description: 'Custom AI provider',
  requiresApiKey: true,
  async evaluate(essay, promptText, mode, apiKey) {
    // Call your API here, return an EvalResult
  },
};
```

Then register it in [`lib/plugins/registry.ts`](lib/plugins/registry.ts).

---

## Project Structure

```
fluency-engine/
├── app/
│   ├── page.tsx              # Home / landing page
│   ├── studio/               # Typing Studio (upload + session)
│   ├── library/              # Exam Library browser + Briefing Room
│   │   └── [promptId]/       # Dynamic prompt detail + session
│   ├── coach/                # Writing Coach + AI evaluation
│   ├── profile/              # User profile + history
│   ├── settings/             # Preferences + API key management
│   └── login/                # Auth (local, no backend required)
│
├── components/
│   ├── typing/               # TypingCanvas, SessionHUD, ResultCard, ExamResultCard
│   └── coaching/             # BandScoreRadar, CoachingDeck, VocabularyHeatmap…
│
├── lib/
│   ├── engine/               # parser.ts, strictMatch.ts, metrics.ts (zero-dependency)
│   ├── exam/                 # examLibrary.ts (types), examData.ts (14 annotated prompts)
│   ├── plugins/              # AI plugin interface + OpenAI / DeepSeek / Ollama adapters
│   └── db/                   # DatabaseAdapter interface + localAdapter (localStorage)
│
└── store/
    ├── studioStore.ts        # Typing session state + user preferences
    ├── authStore.ts          # Authentication state
    └── coachStore.ts         # Writing Coach session state
```

---

## Security & Privacy

- **No account required.** The app works fully offline with local browser storage.
- **Passwords** are hashed with SHA-256 via the Web Crypto API before being stored in `localStorage` — no plaintext credentials are ever written.
- **API keys** are encrypted at rest using AES-GCM (256-bit) via `window.crypto.subtle` before storage.
- **No telemetry, no analytics, no tracking** of any kind is included.
- `.env*` files are listed in `.gitignore` and will never be committed.

---

## Implementation Roadmap

### ✅ Done

- [x] **Typing Studio** — strict-match copywork engine with WPM, accuracy, error distribution
- [x] **Gear settings panel** — bold typed text, char boxes, active highlight, strict mode — all persisted to `localStorage`
- [x] **Theme system** — Dark / Light / Coffee (warm brown), persisted per-user
- [x] **User authentication** — local signup/login with SHA-256 password hashing
- [x] **Profile page** — session history, stats, Writing Coach report viewer
- [x] **Writing Coach** — free-type mode with OpenAI / DeepSeek / Ollama evaluation
- [x] **Band Score Radar chart** — visual breakdown of IELTS/TOEFL scoring criteria
- [x] **Vocabulary Heatmap** — CEFR-coded word-level colour overlay on your essay
- [x] **Before/After Slider** — compare your original sentence vs AI's Band 9 suggestion
- [x] **Coaching Cards** — grammar, coherence, lexical, task achievement feedback cards
- [x] **Exam Library** — 3-level drill-down browser (Exam → Task → Question Type)
- [x] **Briefing Room** — annotated Band 9 sample answers with C1/C2 vocab tooltips and grammar structure highlights
- [x] **Post-Match Analysis** — `ExamResultCard` with vocabulary, grammar, and scoring rationale sections
- [x] **Daily streak tracker** — current streak + best streak
- [x] **TOEFL Academic Discussion** — classroom-style thread UI (professor + two students)
- [x] **Pluggable AI architecture** — `CoachingPlugin` interface for easy provider additions

### 🔨 In Progress / Near-Term

- [ ] **Exam content expansion** — more IELTS Task 1 visual prompts (with actual chart images), IELTS General Letter writing (Task 1), more TOEFL Integrated stubs
- [ ] **Mobile responsive polish** — optimize Briefing Room and TypingCanvas for small screens
- [ ] **Dark/Light Navbar collapse** — hamburger menu for mobile viewports

### 🗺️ Planned Features

- [ ] **Supabase adapter** — drop-in cloud database replacement for `localAdapter.ts` (the interface is already defined)
- [ ] **Exam content admin panel** — a clean dashboard for adding new exam prompts with rich text, image upload for charts/maps, and tag management — so contributors can add material found anywhere online without touching code
- [ ] **Shared community library** — user-submitted exam prompts that the community can vote on, rate by quality, and flag for accuracy
- [ ] **Flashcard system** — spaced repetition for vocabulary extracted from typed sessions
- [ ] **Personal word database** — the system tracks every word you have typed, classifies it by CEFR level, and when you upload a new text shows you which words are *new*, which are in *active learning*, and which are *mastered*
- [ ] **TOEFL Integrated audio** — play the lecture audio clip alongside the reading passage for authentic TOEFL Task 1 practice
- [ ] **Typing analytics dashboard** — charts of WPM and accuracy trends over time, weakest characters heatmap
- [ ] **Offline PWA** — installable Progressive Web App with full offline support

---

## 💡 Ideas & Open Questions

This section tracks experimental ideas and unresolved design questions. Contributions and opinions are very welcome.

### Feature Ideas

**🗃️ Flashcard System with Personal Word Database**
> When you type any text in the Studio, the engine extracts every word and classifies it by CEFR level (A1–C2). Over time, the system builds a personal vocabulary profile. When you load a *new* text, it highlights words in three states: ✅ Mastered · 🔄 In active learning · 🆕 Never seen before. A dedicated flashcard mode (spaced repetition algorithm, e.g., SM-2) would surface due cards daily, pulling example sentences from essays you actually typed.

**🖼️ Exam Content Admin Dashboard**
> A clean, form-based UI (accessible only to contributors or self-hosted admins) for adding exam prompts found anywhere on the internet — including image upload for IELTS Task 1 charts and maps, rich-text for reading passages, and structured vocabulary/grammar annotation fields. This removes the need to edit TypeScript data files directly and would dramatically lower the barrier for content contributions.

**🌐 Shared Community Library**
> A community-curated pool of exam prompts that any user can access. Contributors submit prompts, moderators approve them, and the community can rate and tag them. Design question: should this be opt-in (users choose to sync to a shared library) or default-on for all public instances?

### Open Design Questions

**Q: What is the best way to add material easily?**
Options under consideration:
- **Option A — JSON import:** Contributors write a `.json` file following the `ExamPrompt` schema and open a PR. Simple, zero UI needed, git-versioned.
- **Option B — Admin UI:** A password-protected in-app form for adding prompts without code. Best for non-technical contributors.
- **Option C — External CMS (Contentlayer / Sanity):** Exam prompts live in a headless CMS, fetched at build time. Best for a large content team.
- **Option D — Community submissions via GitHub Issues template:** A structured issue template that a maintainer processes into `examData.ts`. Lowest friction for contributors.

**Q: Can users share a library between each other?**
This depends on infrastructure choice. Without a backend, sharing requires everyone to pull from the same git repo (Option A above). With a Supabase adapter (already designed), a shared library table becomes trivial. The key design tension: **privacy vs. community**. Some users may want their typed sessions private; others want to share progress.

**Q: What are the most effective ways to practice vocabulary?**
Research-backed approaches being considered for integration:
1. **Copywork (already implemented)** — transcribing high-quality text builds implicit familiarity with syntax and collocations.
2. **Spaced Repetition Flashcards** — the SM-2 algorithm (used in Anki) is optimal for long-term retention of individual word forms.
3. **Contextual recall** — showing a word in the sentence where you first encountered it (not an isolated definition) dramatically improves retention.
4. **Productive use** — having to *use* a word in your own Writing Coach essay, rather than just recognise it, is the gold standard for acquisition.
5. **Error-driven drilling** — automatically creating flashcard sets from your *typo* patterns (characters you mistype most) for targeted motor practice.

**Q: How should IELTS Task 1 chart images be handled?**
Options: embed as base64 in `examData.ts` (no extra files, but huge file size), store as `/public/` assets (clean, requires git-tracking images), or link to external URLs (fragile). Currently the `promptImageUrl` field in `ExamPrompt` supports any of these.

---

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

The highest-value contributions right now are:
1. **New exam prompts** — add entries to [`lib/exam/examData.ts`](lib/exam/examData.ts) following the existing `ExamPrompt` schema
2. **New AI plugins** — implement the `CoachingPlugin` interface for providers not yet supported
3. **Bug reports and UX feedback** — open a GitHub Issue

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">
<sub>Built with deliberate practice in mind. No subscriptions. No tracking. Just typing.</sub>
</div>
