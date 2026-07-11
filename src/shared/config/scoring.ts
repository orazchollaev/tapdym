import type { WordLength } from "./game";
import { MAX_GUESSES } from "./game";

export const LENGTH_BASE: Record<WordLength, number> = {
  4: 40,
  5: 60,
  6: 80,
};

export const PER_GUESS_BONUS: Record<WordLength, number> = {
  4: 12,
  5: 15,
  6: 18,
};

export const HINT_COST = 15;

/**
 * Kazanilan puan: taban + (kullanilmayan hak) * bonus.
 * Az tahminle + uzun kelime = yuksek puan.
 * @param length kelime uzunlugu
 * @param attemptsUsed kazanmak icin kullanilan tahmin sayisi (1..MAX_GUESSES)
 */
export function calcScore(length: WordLength, attemptsUsed: number): number {
  const remaining = Math.max(0, MAX_GUESSES - attemptsUsed);
  return LENGTH_BASE[length] + remaining * PER_GUESS_BONUS[length];
}
