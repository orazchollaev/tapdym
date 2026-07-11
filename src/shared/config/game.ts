/** Oyunun cekirdek sabitleri — tek yerden ayarlanabilir. */

/** Secilebilir kelime uzunluklari. */
export const WORD_LENGTHS = [4, 5, 6] as const
export type WordLength = (typeof WORD_LENGTHS)[number]

/** Her kelime icin tahmin (satir) hakki. */
export const MAX_GUESSES = 6
