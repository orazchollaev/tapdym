/** Degerlendirilmis bir harfin durumu. */
export type LetterState = 'correct' | 'present' | 'absent'

/** Board hucresinin durumu: bos, yazilmis (henuz gonderilmedi) veya degerlendirilmis. */
export type CellState = 'empty' | 'filled' | LetterState

/** Board'daki tek bir hucre. */
export interface Cell {
  letter: string
  state: CellState
}
