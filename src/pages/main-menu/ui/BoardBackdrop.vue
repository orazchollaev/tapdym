<script setup lang="ts">
import type { CellState } from "@/entities/guess"

// Fon — bütin ekrany dolduryan tagta dokumasy: dürli sözler, hakyky bellik
// reňkleri, ýöne juda solgun we tekiz (grafiki stil, kölegesiz).
const WORDS = [
  "ýyldyz",
  "salkyn",
  "durmuş",
  "gowaça",
  "toprak",
  "menzil",
  "gapdal",
  "bahar",
  "gülzar",
  "çeşme",
  "aýdym",
  "deňiz",
  "sazlaw",
  "gyzyl",
  "kitap",
  "asman",
]

// Ekrandan artygrak — gyralary kesilip, dik we keseligine doly örtýär.
const COLS = 13
const ROWS = 24

// Deterministik "tötänlik" — her gezek şol bir tagta çykýar.
function pick(seed: number): CellState {
  const n = (seed * 2654435761) % 100
  if (n < 12) return "correct"
  if (n < 30) return "present"
  return "absent"
}

type Tile = { letter: string; state: CellState }

const board: Tile[][] = Array.from({ length: ROWS }, (_, r) => {
  // Her hatar birnäçe sözden düzülýär — ekranyň gyrasyna çenli dowam edýär.
  const letters = Array.from({ length: 4 }, (_, i) => WORDS[(r * 3 + i * 5) % WORDS.length]).join(
    ""
  )

  return Array.from({ length: COLS }, (_, c) => ({
    letter: letters[c % letters.length],
    state: pick(r * COLS + c + 7),
  }))
})

const stateClass: Record<CellState, string> = {
  empty: "border-2 border-border",
  filled: "bg-key-face",
  correct: "bg-correct text-correct-foreground",
  present: "bg-present text-present-foreground",
  absent: "bg-absent text-absent-foreground",
}

const MAX_OPACITY = 0.18
const MIN_OPACITY = 0.005

function tileOpacity(r: number, c: number): number {
  const dr = Math.abs(r - (ROWS - 1) / 2) / ((ROWS - 1) / 2)
  const dc = Math.abs(c - (COLS - 1) / 2) / ((COLS - 1) / 2)
  const distance = Math.min(1, Math.hypot(dr, dc) / Math.SQRT2)
  const falloff = (1 - distance) ** 1.4

  return MIN_OPACITY + (MAX_OPACITY - MIN_OPACITY) * falloff
}
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-[0.22em] overflow-hidden text-[min(6vw,30px)]"
    aria-hidden="true"
  >
    <div v-for="(row, r) in board" :key="r" class="flex shrink-0 gap-[0.22em]">
      <div
        v-for="(tile, c) in row"
        :key="c"
        :style="{ opacity: tileOpacity(r, c) }"
        :class="[
          'flex aspect-square w-[1.7em] shrink-0 items-center justify-center rounded-[0.4em] text-[0.6em] font-semibold uppercase',
          stateClass[tile.state],
        ]"
      >
        {{ tile.letter }}
      </div>
    </div>
  </div>
</template>
