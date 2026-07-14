<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue"
import { cn } from "@/shared/lib/cn"
import type { CellState } from "@/entities/guess"

type LogoCell = {
  letter: string
  state: CellState
  anim: string
}

const SIZE = 6
const TYPE_STEP = 110
const REVEAL_STEP = 90
const REVEAL_FLIP = 160

const firstGuess = ["t", "u", "t", "m", "a", "k"]
const firstClue: CellState[] = ["correct", "absent", "absent", "present", "present", "absent"]
const answer = ["t", "a", "p", "d", "y", "m"]

const cells = ref<LogoCell[]>(
  Array.from({ length: SIZE }, () => ({ letter: "", state: "empty" as CellState, anim: "" }))
)

const stateClass: Record<CellState, string> = {
  empty: "border-2 border-border bg-transparent text-foreground",
  filled: "bg-key-face text-foreground shadow-[inset_0_-0.16em_0_var(--key-shadow)]",
  correct: "bg-correct text-correct-foreground shadow-[inset_0_-0.18em_0_var(--correct-shadow)]",
  present: "bg-present text-present-foreground shadow-[inset_0_-0.18em_0_var(--present-shadow)]",
  absent: "bg-absent text-absent-foreground shadow-[inset_0_-0.18em_0_var(--absent-shadow)]",
}

const timers: number[] = []
const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms))

function typeWord(start: number, word: string[]) {
  word.forEach((letter, i) => {
    at(start + i * TYPE_STEP, () => {
      const cell = cells.value[i]
      cell.letter = letter
      cell.state = "filled"
      cell.anim = ""
      requestAnimationFrame(() => (cell.anim = "cell-pop"))
    })
  })
  return start + word.length * TYPE_STEP
}

function revealRow(start: number, clue: CellState[]) {
  clue.forEach((state, i) => {
    const delay = start + i * REVEAL_STEP
    at(delay, () => {
      cells.value[i].anim = ""
      requestAnimationFrame(() => (cells.value[i].anim = "cell-reveal"))
    })
    at(delay + REVEAL_FLIP, () => (cells.value[i].state = state))
  })
  return start + (clue.length - 1) * REVEAL_STEP + 400
}

onMounted(() => {
  let t = 250
  t = typeWord(t, firstGuess) + 200
  t = revealRow(t, firstClue) + 450

  t = typeWord(t, answer) + 200
  t = revealRow(
    t,
    answer.map(() => "correct" as CellState)
  )

  at(t + 200, () => {
    cells.value.forEach((cell, i) => {
      at(i * REVEAL_STEP, () => {
        cell.anim = "cell-win"
      })
    })
  })
})

onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<template>
  <div class="flex w-full items-center justify-center gap-[0.25em] text-[min(7vw,36px)]">
    <div
      v-for="(cell, i) in cells"
      :key="i"
      :class="
        cn(
          'flex aspect-square w-[1.7em] items-center justify-center rounded-xl text-[1em] font-semibold uppercase transition-colors select-none',
          stateClass[cell.state],
          cell.anim
        )
      "
    >
      {{ cell.letter }}
    </div>
  </div>
</template>

<style scoped>
.cell-pop {
  animation: pop-in 0.16s cubic-bezier(0.22, 1, 0.36, 1);
}
.cell-reveal {
  animation: reveal-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.cell-win {
  animation: bounce-win 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  .cell-pop,
  .cell-reveal,
  .cell-win {
    animation: none !important;
  }
}
</style>
