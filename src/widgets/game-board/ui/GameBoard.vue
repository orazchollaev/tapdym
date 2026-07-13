<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue"
import type { Cell, CellState } from "@/entities/guess"
import { cn } from "@/shared/lib/cn"

const props = defineProps<{
  rows: Cell[][]
  revealRow?: number | null
  shakeRow?: number | null
  winRow?: number | null
}>()

const stateClass: Record<CellState, string> = {
  empty: "border-2 border-border bg-transparent text-foreground",
  filled: "bg-key-face text-foreground shadow-[inset_0_-0.16em_0_var(--key-shadow)]",
  correct: "bg-correct text-correct-foreground shadow-[inset_0_-0.18em_0_var(--correct-shadow)]",
  present: "bg-present text-present-foreground shadow-[inset_0_-0.18em_0_var(--present-shadow)]",
  absent: "bg-absent text-absent-foreground shadow-[inset_0_-0.18em_0_var(--absent-shadow)]",
}

// Reveal renkleri, harf zıplamasının tepe noktasında soldan sağa tek tek açılır
// (app logosundaki reveal animasyonuyla aynı ritim).
const REVEAL_STEP = 90
const REVEAL_FLIP = 160

// Açık hatarda: her sütun için, rengi henüz açıldı mı?
const flipped = ref<Record<number, boolean>>({})
let flipTimers: number[] = []

watch(
  () => props.revealRow,
  (r) => {
    flipTimers.forEach(clearTimeout)
    flipTimers = []
    flipped.value = {}
    if (r == null) return
    const cols = props.rows[r]?.length ?? 0
    for (let c = 0; c < cols; c++) {
      flipTimers.push(
        window.setTimeout(() => {
          flipped.value = { ...flipped.value, [c]: true }
        }, c * REVEAL_STEP + REVEAL_FLIP)
      )
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => flipTimers.forEach(clearTimeout))

// Açılış sırasında rengi henüz açılmamış hücre "filled" (nötr) görünür.
function cellState(r: number, c: number, cell: Cell): CellState {
  if (props.revealRow === r && !flipped.value[c]) return "filled"
  return cell.state
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
            'flex aspect-square w-full min-w-[1.4em] max-w-[1.9em] items-center justify-center rounded-xl text-[1.1em] font-extrabold uppercase transition-colors',
            stateClass[cellState(r, c, cell)],
            cell.state === 'filled' && 'cell-pop',
            revealRow === r && 'cell-reveal',
            winRow === r && 'cell-win'
          )
        "
      >
        {{ cell.letter }}
      </div>
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
.row-shake {
  animation: shake 0.4s ease;
}

@media (prefers-reduced-motion: reduce) {
  .cell-pop,
  .cell-reveal,
  .cell-win,
  .row-shake {
    animation: none !important;
  }
}
</style>
