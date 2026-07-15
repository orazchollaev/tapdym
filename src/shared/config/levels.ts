import type { WordLength } from "./game"

export const LEVEL_COUNT = 20

/** Dereje → söz uzynlygy. Kynlyk ýokarlanýar. */
export function levelLength(level: number): WordLength {
  if (level <= 5) return 4 // 1–5
  if (level <= 10) return 5 // 6–10
  if (level <= 15) return 6 // 11–15
  return 7 // 16–20
}
