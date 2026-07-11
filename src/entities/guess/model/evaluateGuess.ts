import { splitGraphemes } from '@/shared/lib/text'
import type { LetterState } from './types'

/**
 * Bir tahmini gizli kelimeye gore degerlendirir (klasik Wordle algoritmasi).
 *
 * Iki gecis:
 *  1. Tam eslesen harfleri 'correct' isaretle ve o harfleri sayimdan dus.
 *  2. Kalanlarda: harf hala kaldiysa 'present', yoksa 'absent'.
 *     Sayim tuketildigi icin ayni harf gereginden fazla sarilmaz.
 *
 * @param guess tahmin edilen kelime
 * @param answer gizli kelime
 * @returns her harf icin LetterState dizisi (guess uzunlugunda)
 */
export function evaluateGuess(guess: string, answer: string): LetterState[] {
  const g = splitGraphemes(guess)
  const a = splitGraphemes(answer)

  const result: LetterState[] = new Array(g.length).fill('absent')
  const remaining = new Map<string, number>()

  // 1. gecis: tam eslesmeler
  for (let i = 0; i < g.length; i++) {
    if (g[i] === a[i]) {
      result[i] = 'correct'
    } else {
      const letter = a[i]!
      remaining.set(letter, (remaining.get(letter) ?? 0) + 1)
    }
  }

  // 2. gecis: yanlis konumdaki mevcut harfler
  for (let i = 0; i < g.length; i++) {
    if (result[i] === 'correct') continue
    const letter = g[i]!
    const count = remaining.get(letter) ?? 0
    if (count > 0) {
      result[i] = 'present'
      remaining.set(letter, count - 1)
    }
  }

  return result
}

/** Iki durum arasindan "daha iyi" olani secer (klavye rengi guncellemesi icin). */
export function bestLetterState(a: LetterState, b: LetterState): LetterState {
  const rank: Record<LetterState, number> = { absent: 0, present: 1, correct: 2 }
  return rank[b] > rank[a] ? b : a
}
