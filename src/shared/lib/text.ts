/**
 * Bir kelimeyi Unicode code point'lerine boler.
 * Turkmen harfleri (ç ä ö ü ş ň ž ý) tek code point olsa da, cok baytli
 * karakterleri dogru bolmek icin Array.from kullanilir.
 */
export function splitGraphemes(word: string): string[] {
  return Array.from(word)
}
