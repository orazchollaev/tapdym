<script setup lang="ts">
import type { Cell, CellState } from "@/entities/guess"
import { cn } from "@/shared/lib/cn"

defineProps<{ rows: Cell[][] }>()

const stateClass: Record<CellState, string> = {
  empty: "border-2 border-border bg-transparent",
  filled: "border-2 border-muted-foreground/50 bg-transparent text-foreground",
  correct: "border-2 border-transparent bg-correct text-correct-foreground",
  present: "border-2 border-transparent bg-present text-present-foreground",
  absent: "border-2 border-transparent bg-absent text-absent-foreground",
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <div v-for="(row, r) in rows" :key="r" class="flex gap-1.5 justify-center">
      <div
        v-for="(cell, c) in row"
        :key="c"
        :class="
          cn(
            'flex aspect-square w-full max-w-14 items-center justify-center rounded-md text-2xl font-bold uppercase transition-colors',
            stateClass[cell.state]
          )
        "
      >
        {{ cell.letter }}
      </div>
    </div>
  </div>
</template>
