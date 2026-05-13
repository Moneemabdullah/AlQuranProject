import Fuse from 'fuse.js';
import { CombinedVerse, SearchResult } from '../types/index.js';
import { normalizeSearchInput } from '../utils/normalizer.js';

export class SearchService {
  private fuse: Fuse<CombinedVerse>;
  private verses: CombinedVerse[];

  constructor(verses: CombinedVerse[]) {
    this.verses = verses;
    this.fuse = new Fuse(verses, {
      keys: [
        { name: 'arabic', weight: 0.4 },
        { name: 'bangla', weight: 0.4 },
        { name: 'surahTransliteration', weight: 0.2 },
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 1,
      shouldSort: true,
    });
  }

  search(query: string, limit: number = 5): SearchResult[] {
    const normalized = normalizeSearchInput(query);
    if (!normalized) return [];
    return (this.fuse.search(normalized) as SearchResult[]).slice(0, limit);
  }

  getRandomAyah(): CombinedVerse {
    const index = Math.floor(Math.random() * this.verses.length);
    return this.verses[index];
  }
}
