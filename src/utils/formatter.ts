import { CombinedVerse, SearchResult } from '../types/index.js';

export function formatSingleAyah(verse: CombinedVerse): string {
  return [
    `📖 ${verse.surahTransliteration}`,
    `🔢 ${verse.chapter}:${verse.verse}`,
    '',
    verse.arabic,
    '',
    `🇧🇩 ${verse.bangla}`,
    '━━━━━━━━━━━━━━',
  ].join('\n');
}

export function formatResults(results: SearchResult[], query: string): string {
  if (results.length === 0) {
    return `😔 No results found for "${query}".`;
  }

  const lines: string[] = [];

  for (const result of results) {
    const { item } = result;
    lines.push(
      `📖 ${item.surahTransliteration}`,
      `🔢 ${item.chapter}:${item.verse}`,
      '',
      item.arabic,
      '',
      `🇧🇩 ${item.bangla}`,
      '━━━━━━━━━━━━━━',
    );
  }

  return lines.join('\n');
}
