/**
 * Turkmen alfabesi (30 harf) klavye duzeni.
 * Alfabetik sira ogrenilebilirlik icin; mobilde 3 satir x 10 tus.
 * Enter ve Backspace tuslari widget'ta ayri ele alinir.
 */
export const KEYBOARD_ROWS: readonly (readonly string[])[] = [
  ['a', 'ä', 'b', 'ç', 'd', 'e', 'f', 'g', 'h', 'i'],
  ['j', 'ž', 'k', 'l', 'm', 'n', 'ň', 'o', 'ö', 'p'],
  ['r', 's', 'ş', 't', 'u', 'ü', 'w', 'y', 'ý', 'z'],
] as const

/** Tum gecerli harfler (dogrulama/erisim icin duz liste). */
export const ALPHABET: readonly string[] = KEYBOARD_ROWS.flat()
