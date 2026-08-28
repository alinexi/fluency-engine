import { CoachingPlugin, EvalResult, ExamMode } from './types';

export const ollamaPlugin: CoachingPlugin = {
  id: 'ollama',
  name: 'Ollama (Local Open Source)',
  description: 'Runs offline via local Ollama models (Llama 3, Mistral, Qwen, etc.). No API key required.',
  requiresApiKey: false,

  async evaluate(
    essay: string,
    promptText: string,
    mode: ExamMode,
    _apiKey?: string,
    baseUrl = 'http://localhost:11434'
  ): Promise<EvalResult> {
    const systemPrompt = `You are a certified IELTS/TOEFL and Academic English Examiner.
Evaluate the user's essay against the prompt: "${promptText}" for mode: "${mode}".
Return ONLY a valid JSON object matching this schema:
{
  "overallBand": 7.0,
  "overallMax": 9,
  "examMode": "${mode}",
  "taskAchievement": { "score": 7, "maxScore": 9, "label": "Task Achievement", "feedback": "Good task response." },
  "coherenceCohesion": { "score": 7, "maxScore": 9, "label": "Coherence & Cohesion", "feedback": "Well organized." },
  "lexicalResource": { "score": 7, "maxScore": 9, "label": "Lexical Resource", "feedback": "Varied vocabulary." },
  "grammaticalRange": { "score": 7, "maxScore": 9, "label": "Grammatical Range", "feedback": "Accurate grammar." },
  "summaryFeedback": "Strong submission with minor areas for refinement.",
  "coachingCards": [
    {
      "id": "card_1",
      "type": "grammar",
      "originalSentence": "quoted sentence from essay",
      "suggestedRewrite": "Band 9 version",
      "explanation": "explanation",
      "severity": "medium"
    }
  ],
  "vocabularyMap": [
    { "word": "sample", "cefr": "B2" }
  ]
}`;

    const res = await fetch(`${baseUrl.replace(/\/$/, '')}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3', // Default local model
        prompt: `${systemPrompt}\n\nPrompt: ${promptText}\n\nEssay:\n${essay}`,
        format: 'json',
        stream: false,
      }),
    });

    if (!res.ok) {
      throw new Error(`Ollama connection failed at ${baseUrl}. Ensure Ollama is running.`);
    }

    const data = await res.json();
    if (!data.response) throw new Error('Received empty response from Ollama');

    return JSON.parse(data.response) as EvalResult;
  },
};
