export const KEYBOARD_ROWS: readonly (readonly string[])[] = [
  ["ä", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "ž", "ý", "ç", "b", "n", "m"],
] as const

export const KEY_VARIANTS: Record<string, readonly string[]> = {
  n: ["ň"],
  o: ["ö"],
  s: ["ş"],
  u: ["ü"],
}

export const ALPHABET: readonly string[] = [
  ...KEYBOARD_ROWS.flat(),
  ...Object.values(KEY_VARIANTS).flat(),
]
