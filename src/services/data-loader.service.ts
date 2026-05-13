import { readFileSync } from 'fs';
import { join } from 'path';
import { Verse, Chapter, CombinedVerse } from '../types/index.js';

export class DataLoaderService {
  static load(): CombinedVerse[] {
    const dataDir = join(process.cwd(), 'data');

    const quranData: Record<string, Verse[]> = JSON.parse(
      readFileSync(join(dataDir, 'quran.json'), 'utf-8'),
    );
    const bnData: Record<string, Verse[]> = JSON.parse(
      readFileSync(join(dataDir, 'bn.json'), 'utf-8'),
    );
    const chapters: Chapter[] = JSON.parse(
      readFileSync(join(dataDir, 'chapter.json'), 'utf-8'),
    );

    const chapterMap = new Map<number, Chapter>();
    for (const ch of chapters) {
      chapterMap.set(ch.id, ch);
    }

    const combined: CombinedVerse[] = [];

    for (const [chapterKey, arabicVerses] of Object.entries(quranData)) {
      const chNum = Number(chapterKey);
      const chapter = chapterMap.get(chNum);
      if (!chapter) continue;

      const banglaVerses = bnData[chapterKey];
      if (!banglaVerses) continue;

      const bnVerseMap = new Map<number, Verse>();
      for (const v of banglaVerses) {
        bnVerseMap.set(v.verse, v);
      }

      for (const arabicVerse of arabicVerses) {
        const banglaVerse = bnVerseMap.get(arabicVerse.verse);
        if (!banglaVerse) continue;

        combined.push({
          key: `${chNum}:${arabicVerse.verse}`,
          chapter: chNum,
          verse: arabicVerse.verse,
          arabic: arabicVerse.text,
          bangla: banglaVerse.text,
          surahName: chapter.name,
          surahTransliteration: chapter.transliteration,
          surahTranslation: chapter.translation,
        });
      }
    }

    return combined;
  }
}
