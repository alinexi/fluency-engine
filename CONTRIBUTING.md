# Contributing to TypeCoach OS (Fluency Engine)

Thank you for your interest in contributing to **TypeCoach OS**! This project is designed from day one to be modular and community-friendly.

---

## 1. Modular Architecture Overview

The codebase is strictly separated into two independent modules:

1. **Typing Studio (`/studio`)**: A client-side copywork engine that parses `.txt` files, calculates WPM/accuracy, and enforces strict character matching. **Zero API calls.**
2. **Writing Coach (`/coach`)**: An AI essay examiner that evaluates free-form essays against IELTS, TOEFL, or Academic B1–C1 rubrics. Powered by a pluggable provider interface.

---

## 2. Writing a New AI Provider Plugin

All AI plugins implement the `CoachingPlugin` interface found in `lib/plugins/types.ts`:

```typescript
export interface CoachingPlugin {
  id: string;
  name: string;
  description: string;
  requiresApiKey: boolean;
  evaluate(
    essay: string,
    promptText: string,
    mode: ExamMode,
    apiKey?: string,
    baseUrl?: string
  ): Promise<EvalResult>;
}
```

To add a new provider (e.g. Anthropic Claude, Mistral API, HuggingFace):
1. Create a new file in `lib/plugins/myprovider.plugin.ts`.
2. Implement the `CoachingPlugin` contract and return a valid `EvalResult` object.
3. Register your plugin in `lib/plugins/registry.ts`.
4. Add the option to the Settings UI in `app/settings/page.tsx`.

---

## 3. Adding New Prompts & Rubrics

System prompts for exam modes are located in `prompts/prompts.ts`. You can add new prompts by extending the `PROMPT_CATALOG` array or creating `.json` files in the `prompts/` directory.

---

## 4. Local Offline Development with Ollama

You can develop and test the Writing Coach locally without any cloud API keys:
1. Install [Ollama](https://ollama.com).
2. Pull your preferred model (e.g., `ollama pull llama3`).
3. Set your active provider to **Ollama (Local)** in `/settings`.
4. Submit essays for local evaluation.

---

## 5. Development Setup

```bash
git clone https://github.com/alinexi/fluency-engine.git
cd fluency-engine
npm install
npm run dev
```

Visit `http://localhost:3000` to start developing!
