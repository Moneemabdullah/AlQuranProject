const ARABIC_DIACRITICS = /[\u064B-\u065F\u0670\u0618-\u061A\u06D6-\u06ED]/g;
const ALEF_VARIANTS = /[أإآ]/g;
const TEH_MARBUTA = /ة/g;
const YEH_ALEF_MAKSURA = /ى/g;
const WAW_WITH_HAMZA = /ؤ/g;

function normalizeArabic(text: string): string {
  return text
    .normalize('NFD')
    .replace(ARABIC_DIACRITICS, '')
    .replace(ALEF_VARIANTS, 'ا')
    .replace(TEH_MARBUTA, 'ه')
    .replace(YEH_ALEF_MAKSURA, 'ي')
    .replace(WAW_WITH_HAMZA, 'و')
    .trim();
}

export function normalizeSearchInput(input: string): string {
  return normalizeArabic(input.normalize('NFC').trim());
}
