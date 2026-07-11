import type { WordLength } from "@/shared/config/game"
import { WORDS_BY_LENGTH } from "./words"

/** Verilen uzunluktaki havuzdan rastgele bir kelime dondurur. */
export function getRandomWord(length: WordLength): string {
  const pool = WORDS_BY_LENGTH[length]
  const index = Math.floor(Math.random() * pool.length)
  return pool[index]!
}
