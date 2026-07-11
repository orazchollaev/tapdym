export const WORD_LENGTHS = [4, 5, 6] as const
export type WordLength = (typeof WORD_LENGTHS)[number]

export const MAX_GUESSES = 6

export const FREE_REVEALS: Record<WordLength, number> = {
  4: 1,
  5: 1,
  6: 2,
}

export const MAX_REVEALS: Record<WordLength, number> = {
  4: 2,
  5: 3,
  6: 4,
}
