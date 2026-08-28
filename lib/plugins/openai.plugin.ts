import { CoachingPlugin, EvalResult, ExamMode } from './types';

export const openAIPlugin: CoachingPlugin = {
  id: 'openai',
  name: 'OpenAI (GPT-4o)',
  description: 'Official OpenAI GPT-4o reference plugin with strict JSON schema evaluation.',
  requiresApiKey: true,

  async evaluate(essay: string, promptText: string, mode: ExamMode, apiKey?: string): Promise<EvalResult> {
    if (!apiKey) {
      throw new Error('OpenAI API key is required. Please set your key in Settings.');
    }

    const systemPrompt = `You are a certified IELTS/TOEFL and Academic English Examiner.
Evaluate the user's essay against the prompt: "${promptText}" for exam mode: "${mode}".
You MUST return a JSON object matching this schema EXACTLY:
{
  "overallBand": number (e.g. 7.5 for IELTS 0-9, or 25 for TOEFL 0-30),
  "overallMax": number (9 for IELTS/Academic, 30 for TOEFL),
  "examMode": "${mode}",
  "taskAchievement": { "score": number, "maxScore": number, "label": "Task Achievement", "feedback": "string" },
  "coherenceCohesion": { "score": number, "maxScore": number, "label": "Coherence & Cohesion", "feedback": "string" },
  "lexicalResource": { "score": number, "maxScore": number, "label": "Lexical Resource", "feedback": "string" },
  "grammaticalRange": { "score": number, "maxScore": number, "label": "Grammatical Range", "feedback": "string" },
  "summaryFeedback": "Overall examiner feedback summary paragraph.",
  "coachingCards": [
    {
      "id": "card_1",
      "type": "grammar" | "lexical" | "coherence" | "taskAchievement",
      "originalSentence": "exact quote from essay",
      "suggestedRewrite": "Band 9 / C1 rewrite",
      "explanation": "why it was improved",
      "severity": "high" | "medium" | "low"
    }
  ],
  "vocabularyMap": [
    { "word": "example", "cefr": "A1"|"A2"|"B1"|"B2"|"C1"|"C2", "suggestion": "optional C1 synonym" }
  ]
}`;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Prompt: ${promptText}\n\nEssay:\n${essay}` },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `OpenAI API request failed with status ${res.status}`);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error('Received empty response from OpenAI');

    return JSON.parse(content) as EvalResult;
  },
};
