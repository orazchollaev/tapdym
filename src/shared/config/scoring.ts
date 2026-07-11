import type { WordLength } from "./game"
import { MAX_GUESSES } from "./game"

export const LENGTH_BASE: Record<WordLength, number> = {
  4: 20,
  5: 30,
  6: 50,
}

export const PER_GUESS_BONUS: Record<WordLength, number> = {
  4: 2,
  5: 4,
  6: 6,
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
