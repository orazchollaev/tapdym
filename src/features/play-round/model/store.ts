import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { MAX_GUESSES, type WordLength } from '@/shared/config/game'
import { calcScore } from '@/shared/config/scoring'
import { splitGraphemes } from '@/shared/lib/text'
import { getRandomWord } from '@/entities/word'
import {
  bestLetterState,
  evaluateGuess,
  type Cell,
  type LetterState,
} from '@/entities/guess'
import { useProfileStore } from '@/entities/profile'

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost'

/**
 * Oyun oturumu (tek kelime turu) durumu. Kalici DEGIL — her tur sifirdan baslar.
 * Kalici puanlar profile store'unda tutulur.
 */
export const usePlayRoundStore = defineStore('play-round', () => {
  const profile = useProfileStore()

  const length = ref<WordLength>(5)
  const answer = ref('')
  const answerLetters = computed(() => splitGraphemes(answer.value))

  /** Gonderilmis (degerlendirilmis) satirlar. */
  const submittedRows = ref<Cell[][]>([])
  /** Aktif satirda yazilmakta olan harfler. */
  const currentGuess = ref<string[]>([])
  const status = ref<GameStatus>('idle')
  const keyStates = ref<Record<string, LetterState>>({})
  /** Ipucuyla acilan konumlar: position -> harf. */
  const revealed = ref<Record<number, string>>({})
  const hintsUsed = ref(0)
  /** Kazanilan turda kazanilan puan (sonuc ekrani icin). */
  const lastScore = ref(0)

  const currentRow = computed(() => submittedRows.value.length)
  const isFull = computed(() => currentGuess.value.length === length.value)
  const canPlay = computed(() => status.value === 'playing')

  /** Board'da gosterilecek tum satirlar (gecmis + aktif + bos). */
  const displayRows = computed<Cell[][]>(() => {
    const rows: Cell[][] = []
    for (let r = 0; r < MAX_GUESSES; r++) {
      if (r < submittedRows.value.length) {
        rows.push(submittedRows.value[r]!)
      } else if (r === currentRow.value && status.value === 'playing') {
        rows.push(
          Array.from({ length: length.value }, (_, i) => {
            const letter = currentGuess.value[i] ?? ''
            return { letter, state: letter ? 'filled' : 'empty' } as Cell
          }),
        )
      } else {
        rows.push(
          Array.from({ length: length.value }, () => ({
            letter: '',
            state: 'empty' as const,
          })),
        )
      }
    }
    return rows
  })

  /** Ipucu iskeleti: acilan harfler dolu, digerleri bos. */
  const revealedSkeleton = computed<string[]>(() =>
    Array.from({ length: length.value }, (_, i) => revealed.value[i] ?? ''),
  )

  const hasRevealed = computed(() =>
    Object.keys(revealed.value).length > 0,
  )

  function startGame(len: WordLength): void {
    length.value = len
    answer.value = getRandomWord(len)
    submittedRows.value = []
    currentGuess.value = []
    keyStates.value = {}
    revealed.value = {}
    hintsUsed.value = 0
    lastScore.value = 0
    status.value = 'playing'
  }

  function addLetter(letter: string): void {
    if (!canPlay.value || isFull.value) return
    currentGuess.value.push(letter)
  }

  function removeLetter(): void {
    if (!canPlay.value) return
    currentGuess.value.pop()
  }

  function submitGuess(): void {
    if (!canPlay.value || !isFull.value) return

    const guess = currentGuess.value.join('')
    const states = evaluateGuess(guess, answer.value)
    const letters = splitGraphemes(guess)

    const row: Cell[] = letters.map((letter, i) => ({
      letter,
      state: states[i]!,
    }))
    submittedRows.value.push(row)

    // Klavye renklerini guncelle (en iyi durum kalir).
    const next = { ...keyStates.value }
    letters.forEach((letter, i) => {
      const s = states[i]!
      const prev = next[letter]
      next[letter] = prev ? bestLetterState(prev, s) : s
    })
    keyStates.value = next

    currentGuess.value = []

    const won = guess === answer.value
    if (won) {
      const attemptsUsed = submittedRows.value.length
      lastScore.value = calcScore(length.value, attemptsUsed)
      profile.addPoints(lastScore.value)
      status.value = 'won'
    } else if (submittedRows.value.length >= MAX_GUESSES) {
      status.value = 'lost'
    }
  }

  /**
   * Rastgele (henuz acilmamis) bir konumdaki dogru harfi acar.
   * @returns bir harf acildiysa true.
   */
  function revealRandomLetter(): boolean {
    if (!canPlay.value) return false
    const closed: number[] = []
    for (let i = 0; i < length.value; i++) {
      if (!(i in revealed.value)) closed.push(i)
    }
    if (closed.length === 0) return false
    const pos = closed[Math.floor(Math.random() * closed.length)]!
    revealed.value = { ...revealed.value, [pos]: answerLetters.value[pos]! }
    hintsUsed.value += 1
    return true
  }

  function resetToIdle(): void {
    status.value = 'idle'
  }

  return {
    length,
    answer,
    status,
    keyStates,
    revealed,
    hintsUsed,
    lastScore,
    currentRow,
    isFull,
    canPlay,
    displayRows,
    revealedSkeleton,
    hasRevealed,
    startGame,
    addLetter,
    removeLetter,
    submitGuess,
    revealRandomLetter,
    resetToIdle,
  }
})
