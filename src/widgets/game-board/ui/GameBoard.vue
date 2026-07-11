<script setup lang="ts">
import type { Cell, CellState } from "@/entities/guess"
import { cn } from "@/shared/lib/cn"

const props = defineProps<{
  rows: Cell[][]
  /** "reveal" pop animasiýasy geçjek hatar. */
  revealRow?: number | null
  /** Sarsylma (shake) hatary. */
  shakeRow?: number | null
  /** Ýeňişde bökýän hatar. */
  winRow?: number | null
}>()

const stateClass: Record<CellState, string> = {
  empty: "border-2 border-border bg-transparent",
  filled: "border-2 border-muted-foreground/50 bg-transparent text-foreground",
  correct: "border-2 border-transparent bg-correct text-correct-foreground",
  present: "border-2 border-transparent bg-present text-present-foreground",
  absent: "border-2 border-transparent bg-absent text-absent-foreground",
}
</script>

<template>
  <div class="flex flex-col gap-[0.3em]">
    <div
      v-for="(row, r) in rows"
      :key="r"
      :class="cn('flex justify-center gap-[0.3em]', shakeRow === r && 'row-shake')"
    >
      <div
        v-for="(cell, c) in row"
        :key="`${r}-${c}-${cell.letter}`"
        :style="revealRow === r || winRow === r ? { animationDelay: `${c * 90}ms` } : undefined"
        :class="
          cn(
            'flex aspect-square w-full max-w-[1.5em] items-center justify-center rounded-md text-[1.4em] font-bold uppercase transition-colors',
            stateClass[cell.state],
            cell.state === 'filled' && 'cell-pop',
            revealRow === r && 'cell-reveal',
            winRow === r && 'cell-win'
          )
        "
      >
        {{ cell.letter }}
      </div>
    </div>

    <!-- Signature: ýeňişde dokma dikişi çyzylýar. -->
    <svg
      v-if="winRow !== null && winRow !== undefined"
      class="stitch mt-[0.15em] w-[70%] self-center text-primary"
      viewBox="0 0 120 8"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        d="M0 6 L6 2 L12 6 L18 2 L24 6 L30 2 L36 6 L42 2 L48 6 L54 2 L60 6 L66 2 L72 6 L78 2 L84 6 L90 2 L96 6 L102 2 L108 6 L114 2 L120 6"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
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
  animation: bounce-win 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.row-shake {
  animation: shake 0.4s ease;
}
.stitch path {
  --stitch-len: 200;
  stroke-dasharray: 200;
  animation: stitch-draw 0.7s ease-out 0.2s both;
}

@media (prefers-reduced-motion: reduce) {
  .cell-pop,
  .cell-reveal,
  .cell-win,
  .row-shake,
  .stitch path {
    animation: none !important;
  }
}
</style>
