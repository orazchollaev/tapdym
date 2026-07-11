/**
 * Türkmen (Latyn) klawiaturasy — resmi Windows KBDTURME düzeni (ÄWERTY).
 * Kaynak: https://kbdlayout.info/KBDTURME/
 *
 * Gerçek düzen:
 *  - Üst harf hatary:  ä w e r t y u i o p ň ö
 *  - Orta hatar:       a s d f g h j k l ş
 *  - Aşaky hatar:      z ü ç ý b n m
 *  - `ž` fiziki klawiaturada san hatarynda (backtick); bu ýerde `z` bilen
 *    toparlanyp aşaky hatara goşuldy.
 * Enter (Gönder) we Backspace tuşlary widget'da aýratyn.
 */
export const KEYBOARD_ROWS: readonly (readonly string[])[] = [
  ['ä', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'ň', 'ö'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ş'],
  ['ž', 'z', 'ü', 'ç', 'ý', 'b', 'n', 'm'],
] as const

/** Ähli dogry harplar (barlaglar/erişim üçin tekiz sanaw). */
export const ALPHABET: readonly string[] = KEYBOARD_ROWS.flat()
