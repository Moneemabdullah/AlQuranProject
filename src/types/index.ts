export interface Verse {
  chapter: number;
  verse: number;
  text: string;
}

export interface Chapter {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
}

export interface CombinedVerse {
  key: string;
  chapter: number;
  verse: number;
  arabic: string;
  bangla: string;
  surahName: string;
  surahTransliteration: string;
  surahTranslation: string;
}

export interface SearchResult {
  item: CombinedVerse;
  score?: number;
}

export type CallbackAction = 'tafsir' | 'audio' | 'favorite' | 'more_results';

export type MenuAction = 'search' | 'random' | 'browse' | 'favorites' | 'help';

export interface CallbackData {
  action: CallbackAction;
  chapter?: number;
  verse?: number;
  offset?: number;
}

export interface UserSession {
  lastSearchQuery?: string;
  lastSearchOffset?: number;
}
