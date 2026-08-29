<div align="center">

# 🧠 Fluency Engine

### *The open-source typing & language-learning platform*

**Practice writing at the highest level — without an internet connection.**  
Transcribe Band 9 essays, drill 30 levels of English syntax mechanics, get AI coaching on your writing, and build vocabulary through deliberate repetition.

[![Live Demo](https://img.shields.io/badge/Live_Demo-fluency--engine--mocha.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://fluency-engine-mocha.vercel.app/)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

### 🚀 [Try the Free Live Demo](https://fluency-engine-mocha.vercel.app/)

</div>

---

## 📌 Project Overview

**Fluency Engine** is an interactive, browser-first language learning and typing platform designed for IELTS/TOEFL candidates, academic writers, and language learners. It operates on a tight core loop: **deliberate sentence-by-sentence pattern typing** to turn complex English syntax into intuitive muscle memory.

### 🌐 Live Public Demo (Zero-Config Browser Storage)
The live demo hosted at **[fluency-engine-mocha.vercel.app](https://fluency-engine-mocha.vercel.app/)** runs entirely inside your web browser. 
- **100% Free & Private**: Practice data and progress stay saved in your browser (`localStorage` / IndexedDB).
- **$0 API Cost**: Typing Studio, Exam Library, and 30-Level Grammar Drills require zero API keys or external database setup.

---

## 🛠️ Feature Modules

| Module | What It Does | Needs API / DB? |
|--------|--------------|----------------|
| **Typing Studio** | Upload any `.txt` file and transcribe it character-by-character with strict typo-halting and WPM metrics. | ❌ No |
| **Exam Library** | Browse Band 9 IELTS & TOEFL iBT prompts. Practice typing full sample answers with C1/C2 vocabulary annotations. | ❌ No |
| **Grammar Library** | 30-level progressive difficulty drills across 6 core rule categories (Tenses, Conditionals, Modals, Connectors, Structure, Mechanics). | ❌ No |
| **Writing Coach** | Write essays under exam timers and get AI band scores, Coaching Cards, Vocabulary Heatmaps, and Grammar trees. | 🔑 Optional (BYOK) |

> **BYOK = Bring Your Own Key.** You can connect OpenAI (GPT-4o), DeepSeek, or run completely offline with local **Ollama** LLMs.

---

## 💾 Dual Database Storage Architecture

Fluency Engine features a **Pluggable Database Adapter Architecture** (`DatabaseAdapter` interface) allowing seamless switching between local browser storage and cloud database sync:

- **Browser Storage Mode (`localAdapter`)**: Default for public demos. Uses browser `localStorage` and Web Crypto SHA-256 password hashing.
- **Supabase Cloud Mode (`supabaseAdapter`)**: Add your Supabase environment variables to sync user accounts, copywork history, and AI essay reports across all your devices.

---

## Quickstart

### Prerequisites

- [Node.js](https://nodejs.org) **≥ 18.17** (LTS recommended)
- `npm` (included with Node.js)

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

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
