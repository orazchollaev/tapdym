/**
 * Klawiatura düzeni — QWERTY esasy + basyp-saklama (long-press) bilen aksentli
 * türkmen harplary. Ä, Ç, Ž, Ň, Ö, Ş, Ü, Ý aýratyn tuş däl; esasy harpy basyp
 * saklanyňda ýokarsynda popover görünýär. Ol harplaryň sag ýokarsynda nokat bar.
 *
 * Sebäbi: 30 harpy bir hatarda görkezmek tuşlary hetden aşa inçe edýär.
 * QWERTY esasy (max 10 tuş/hatar) has giň, aňsat basylýan tuşlary berýär.
 */
export const KEYBOARD_ROWS: readonly (readonly string[])[] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
] as const

/** Esasy harp -> basyp-saklama bilen çykýan aksentli görnüşleri. */
export const KEY_VARIANTS: Record<string, readonly string[]> = {
  a: ["ä"],
  c: ["ç"],
  z: ["ž"],
  n: ["ň"],
  o: ["ö"],
  s: ["ş"],
  u: ["ü"],
  y: ["ý"],
}

/** Ähli girizilip bilinýän harplar (fiziki klawiatura süzgüji üçin). */
export const ALPHABET: readonly string[] = [
  ...KEYBOARD_ROWS.flat(),
  ...Object.values(KEY_VARIANTS).flat(),
]
