import { NextRequest, NextResponse } from 'next/server';
import { getPlugin } from '@/lib/plugins/registry';
import { ExamMode } from '@/lib/plugins/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { essay, promptText, mode, pluginId = 'openai', apiKey, baseUrl } = body;

    if (!essay || typeof essay !== 'string' || essay.trim().length < 10) {
      return NextResponse.json({ error: 'Essay text is too short or missing.' }, { status: 400 });
    }

    if (!promptText || typeof promptText !== 'string') {
      return NextResponse.json({ error: 'Prompt text is missing.' }, { status: 400 });
    }

    const plugin = getPlugin(pluginId);
    const authHeader = req.headers.get('authorization');
    const effectiveApiKey = apiKey || (authHeader ? authHeader.replace('Bearer ', '') : undefined);

    const result = await plugin.evaluate(
      essay.trim(),
      promptText.trim(),
      mode as ExamMode,
      effectiveApiKey,
      baseUrl
    );

    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error('Error in /api/evaluate route:', err);
    const errMsg = err instanceof Error ? err.message : 'Internal server error during essay evaluation';
    return NextResponse.json(
      { error: errMsg },
      { status: 500 }
    );
  }

}
