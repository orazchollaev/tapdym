import { computed, ref } from "vue"
import { defineStore } from "pinia"
import { MAX_GUESSES, FREE_REVEALS, type WordLength } from "@/shared/config/game"
import { levelLength } from "@/shared/config/levels"
import { calcScore } from "@/shared/config/scoring"
import type { WordCategoryId } from "@/shared/config/categories"
import { splitGraphemes } from "@/shared/lib/text"
import { getRandomWord } from "@/entities/word"
import { bestLetterState, evaluateGuess, type Cell, type LetterState } from "@/entities/guess"
import { useProfileStore } from "@/entities/profile"

export type GameStatus = "idle" | "playing" | "won" | "lost"
export type GameMode = "single" | "levels"

export const usePlayRoundStore = defineStore("play-round", () => {
  const profile = useProfileStore()

  const mode = ref<GameMode>("single")
  const level = ref(1)
  const length = ref<WordLength>(5)
  const answer = ref("")
  const answerCategory = ref<WordCategoryId>("adamlar")
  const categoryRevealed = ref(false)
  const answerLetters = computed(() => splitGraphemes(answer.value))

  const submittedRows = ref<Cell[][]>([])
  const currentGuess = ref<string[]>([])
  const status = ref<GameStatus>("idle")
  const keyStates = ref<Record<string, LetterState>>({})
  const revealed = ref<Record<number, string>>({})
  const hintsUsed = ref(0)
  const lastScore = ref(0)
  /** Häzir "reveal" animasiýasy geçýän hatar (ýa-da null). */
  const revealRow = ref<number | null>(null)
  /** Kem harply Enter — sarsylma tetigi (her gezek artýar). */
  const shakeNonce = ref(0)

  const currentRow = computed(() => submittedRows.value.length)
  const isFull = computed(() => currentGuess.value.length === length.value)
  const canPlay = computed(() => status.value === "playing")

  const displayRows = computed<Cell[][]>(() => {
    const rows: Cell[][] = []
    for (let r = 0; r < MAX_GUESSES; r++) {
      if (r < submittedRows.value.length) {
        rows.push(submittedRows.value[r]!)
      } else if (r === currentRow.value && status.value === "playing") {
        rows.push(
          Array.from({ length: length.value }, (_, i) => {
            const letter = currentGuess.value[i] ?? ""
            return { letter, state: letter ? "filled" : "empty" } as Cell
          })
        )
      } else {
        rows.push(
          Array.from({ length: length.value }, () => ({
            letter: "",
            state: "empty" as const,
          }))
        )
      }
    }
    return rows
  })

  const revealedSkeleton = computed<string[]>(() =>
    Array.from({ length: length.value }, (_, i) => revealed.value[i] ?? "")
  )

  const hasRevealed = computed(() => Object.keys(revealed.value).length > 0)

  function initRound(len: WordLength): void {
    length.value = len
    const entry = getRandomWord(len)
    answer.value = entry.text
    answerCategory.value = entry.category
    categoryRevealed.value = false
    submittedRows.value = []
    currentGuess.value = []
    keyStates.value = {}
    revealed.value = {}
    hintsUsed.value = 0
    lastScore.value = 0
    revealRow.value = null
    status.value = "playing"

    // Oýny ýeňilleşdirmek üçin: başda uzynlyga görä birnäçe harp mugt açylýar.
    const freeCount = Math.min(FREE_REVEALS[len], len)
    const positions = Array.from({ length: len }, (_, i) => i)
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[positions[i], positions[j]] = [positions[j]!, positions[i]!]
    }
    const opened: Record<number, string> = {}
    for (const pos of positions.slice(0, freeCount)) {
      opened[pos] = answerLetters.value[pos]!
    }
    revealed.value = opened
  }

  /** Ýeke oýun: uzynlyk saýlanýar, tötänleýin söz. */
  function startGame(len: WordLength): void {
    mode.value = "single"
    initRound(len)
  }

  /** Dereje oýny: uzynlyk derejä görä, tötänleýin söz. */
  function startLevel(lvl: number): void {
    mode.value = "levels"
    level.value = lvl
    initRound(levelLength(lvl))
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
    if (!canPlay.value) return
    if (!isFull.value) {
      // Kem harp bilen Enter — hatar sarsýar, tabşyrylmaýar.
      shakeNonce.value += 1
      return
    }

    const guess = currentGuess.value.join("")
    const states = evaluateGuess(guess, answer.value)
    const letters = splitGraphemes(guess)

    const row: Cell[] = letters.map((letter, i) => ({
      letter,
      state: states[i]!,
    }))
    submittedRows.value.push(row)
    revealRow.value = submittedRows.value.length - 1

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
      status.value = "won"
      if (mode.value === "levels") profile.unlockLevel(level.value + 1)
    } else if (submittedRows.value.length >= MAX_GUESSES) {
      status.value = "lost"
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

  /** Kelimenin kategorisini acar (puan kontrolu/harcamasi cagiran tarafta). */
  function revealCategory(): void {
    if (canPlay.value) categoryRevealed.value = true
  }

  /** Reveal animasiýasy gutaransoň hatar belligini arassalaýar. */
  function clearReveal(): void {
    revealRow.value = null
  }

  function resetToIdle(): void {
    status.value = "idle"
  }

  return {
    mode,
    level,
    length,
    answer,
    answerCategory,
    categoryRevealed,
    status,
    keyStates,
    revealed,
    hintsUsed,
    lastScore,
    revealRow,
    shakeNonce,
    currentRow,
    isFull,
    canPlay,
    displayRows,
    revealedSkeleton,
    hasRevealed,
    startGame,
    startLevel,
    addLetter,
    removeLetter,
    submitGuess,
    revealRandomLetter,
    revealCategory,
    clearReveal,
    resetToIdle,
  }
})
