import type { WordLength } from "@/shared/config/game"
import { WORDS_BY_LENGTH, type WordEntry } from "./words"

/** Verilen uzunluktaki havuzdan rastgele bir kelime (metin + kategori) dondurur. */
export function getRandomWord(length: WordLength): WordEntry {
  const pool = WORDS_BY_LENGTH[length]
  const index = Math.floor(Math.random() * pool.length)
  return pool[index]!
}
