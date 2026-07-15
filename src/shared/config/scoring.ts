import type { WordLength } from "./game"
import { MAX_GUESSES } from "./game"

export const LENGTH_BASE: Record<WordLength, number> = {
  4: 10,
  5: 15,
  6: 20,
  7: 30,
}

export const PER_GUESS_BONUS: Record<WordLength, number> = {
  4: 1,
  5: 2,
  6: 4,
  7: 6,
}

export const HINT_COST = 15

export const CATEGORY_REVEAL_COST = 5

/**
 * @param length kelime uzunlugu
 * @param attemptsUsed kazanmak icin kullanilan tahmin sayisi (1..MAX_GUESSES)
 */
export function calcScore(length: WordLength, attemptsUsed: number): number {
  const remaining = Math.max(0, MAX_GUESSES - attemptsUsed)
  return LENGTH_BASE[length] + remaining * PER_GUESS_BONUS[length]
}
