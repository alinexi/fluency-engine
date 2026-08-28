import { CoachingPlugin, EvalResult, ExamMode } from './types';

export const deepseekPlugin: CoachingPlugin = {
  id: 'deepseek',
  name: 'DeepSeek Chat',
  description: 'High-speed, cost-effective evaluation powered by DeepSeek AI.',
  requiresApiKey: true,

  async evaluate(essay: string, promptText: string, mode: ExamMode, apiKey?: string): Promise<EvalResult> {
    if (!apiKey) {
      throw new Error('DeepSeek API key is required. Please set your key in Settings.');
    }

    const systemPrompt = `You are a certified IELTS/TOEFL and Academic English Examiner.
Evaluate the user's essay against the prompt: "${promptText}" for mode: "${mode}".
Return ONLY a valid JSON object with overallBand, overallMax, examMode, taskAchievement, coherenceCohesion, lexicalResource, grammaticalRange, summaryFeedback, coachingCards, and vocabularyMap.`;

    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Prompt: ${promptText}\n\nEssay:\n${essay}` },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.2,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `DeepSeek request failed with status ${res.status}`);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error('Received empty response from DeepSeek API');

    return JSON.parse(content) as EvalResult;
  },
};
