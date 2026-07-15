export const WORD_LENGTHS = [4, 5, 6, 7] as const
export type WordLength = (typeof WORD_LENGTHS)[number]

export const MAX_GUESSES = 6

export const FREE_REVEALS: Record<WordLength, number> = {
  4: 1,
  5: 1,
  6: 2,
  7: 2,
}

export const MAX_REVEALS: Record<WordLength, number> = {
  4: 1,
  5: 2,
  6: 3,
  7: 3,
}
