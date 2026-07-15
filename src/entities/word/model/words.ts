import type { WordLength } from "@/shared/config/game"
import { WORD_LENGTHS } from "@/shared/config/game"
import type { WordCategoryId } from "@/shared/config/categories"
import { WORD_CATEGORIES } from "@/shared/config/categories"
import rawWords from "./words.json"

export interface WordEntry {
  readonly text: string
  readonly category: WordCategoryId
}

function graphemeLength(text: string): number {
  return [...text].length
}

const wordLengths = new Set<number>(WORD_LENGTHS)

function isWordCategory(id: string): id is WordCategoryId {
  return Object.prototype.hasOwnProperty.call(WORD_CATEGORIES, id)
}

function buildWordsByLength(): Record<WordLength, readonly WordEntry[]> {
  const buckets: Record<WordLength, WordEntry[]> = { 4: [], 5: [], 6: [], 7: [] }
  const source = rawWords as Record<string, readonly string[]>

  for (const [category, texts] of Object.entries(source)) {
    if (!isWordCategory(category)) {
      if (import.meta.env.DEV) console.warn(`[words] näbelli category "${category}" düşürildi`)
      continue
    }
    for (const text of texts) {
      const len = graphemeLength(text)
      if (!wordLengths.has(len)) {
        if (import.meta.env.DEV) {
          console.warn(
            `[words] "${text}" uzynlygy ${len}, goldanýan ${[...wordLengths]} — düşürildi`
          )
        }
        continue
      }
      buckets[len as WordLength].push({ text, category })
    }
  }

  return buckets
}

export const WORDS_BY_LENGTH: Record<WordLength, readonly WordEntry[]> = buildWordsByLength()
