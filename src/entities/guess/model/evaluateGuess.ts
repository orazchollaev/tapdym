import { splitGraphemes } from "@/shared/lib/text"
import type { LetterState } from "./types"

/**
 *
 * @param guess tahmin edilen kelime
 * @param answer gizli kelime
 * @returns her harf icin LetterState dizisi (guess uzunlugunda)
 */
export function evaluateGuess(guess: string, answer: string): LetterState[] {
  const g = splitGraphemes(guess)
  const a = splitGraphemes(answer)

  const result: LetterState[] = new Array(g.length).fill("absent")
  const remaining = new Map<string, number>()

  for (let i = 0; i < g.length; i++) {
    if (g[i] === a[i]) {
      result[i] = "correct"
    } else {
      const letter = a[i]!
      remaining.set(letter, (remaining.get(letter) ?? 0) + 1)
    }
  }

  for (let i = 0; i < g.length; i++) {
    if (result[i] === "correct") continue
    const letter = g[i]!
    const count = remaining.get(letter) ?? 0
    if (count > 0) {
      result[i] = "present"
      remaining.set(letter, count - 1)
    }
  }

  return result
}

export function bestLetterState(a: LetterState, b: LetterState): LetterState {
  const rank: Record<LetterState, number> = { absent: 0, present: 1, correct: 2 }
  return rank[b] > rank[a] ? b : a
}
