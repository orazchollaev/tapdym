import type { WordLength } from './game'
import { MAX_GUESSES } from './game'

/** Kelime uzunluguna gore taban puan. Uzun kelime = daha cok puan. */
export const LENGTH_BASE: Record<WordLength, number> = {
  4: 40,
  5: 60,
  6: 80,
}

/** Kullanilmayan her tahmin hakki icin (uzunluga bagli) bonus. */
export const PER_GUESS_BONUS: Record<WordLength, number> = {
  4: 12,
  5: 15,
  6: 18,
}

/** Bir harf acmanin (ipucu) puan maliyeti. */
export const HINT_COST = 25

/**
 * Kazanilan puan: taban + (kullanilmayan hak) * bonus.
 * Az tahminle + uzun kelime = yuksek puan.
 * @param length kelime uzunlugu
 * @param attemptsUsed kazanmak icin kullanilan tahmin sayisi (1..MAX_GUESSES)
 */
export function calcScore(length: WordLength, attemptsUsed: number): number {
  const remaining = Math.max(0, MAX_GUESSES - attemptsUsed)
  return LENGTH_BASE[length] + remaining * PER_GUESS_BONUS[length]
}
