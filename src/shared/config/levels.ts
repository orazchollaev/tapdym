import type { WordLength } from "./game"

export const LEVEL_COUNT = 20

/** Dereje → söz uzynlygy. Kynlyk ýokarlanýar. */
export function levelLength(level: number): WordLength {
  if (level <= 7) return 4 // 1–7
  if (level <= 14) return 5 // 8–14
  return 6 // 15–20
}
