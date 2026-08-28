export interface TextChar {
  id: string;
  char: string;
}

export interface TextBlock {
  id: number;
  text: string;
  chars: TextChar[];
}

export interface ParsedText {
  title: string;
  fullText: string;
  blocks: TextBlock[];
  totalChars: number;
  totalWords: number;
}

/**
 * Parses raw text input into clean, structured typing blocks.
 * Handles CRLF normalization, smart quote replacement, and paragraph splitting.
 */
export function parseText(rawText: string, title: string = 'Custom Text'): ParsedText {
  // Normalize line endings and smart punctuation
  const normalized = rawText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .trim();

  // Split into non-empty blocks (paragraphs or chunks)
  const rawBlocks = normalized
    .split(/\n\s*\n/)
    .map(b => b.replace(/\s+/g, ' ').trim())
    .filter(b => b.length > 0);

  let globalCharIndex = 0;

  const blocks: TextBlock[] = rawBlocks.map((blockText, blockIdx) => {
    const chars: TextChar[] = [];
    for (let i = 0; i < blockText.length; i++) {
      chars.push({
        id: `c_${globalCharIndex++}`,
        char: blockText[i],
      });
    }
    return {
      id: blockIdx,
      text: blockText,
      chars,
    };
  });

  const totalChars = blocks.reduce((acc, b) => acc + b.chars.length, 0);
  const totalWords = normalized.split(/\s+/).filter(Boolean).length;

  return {
    title,
    fullText: normalized,
    blocks,
    totalChars,
    totalWords,
  };
}
