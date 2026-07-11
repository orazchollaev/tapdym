<script setup lang="ts">
import { Delete } from 'lucide-vue-next'
import { KEYBOARD_ROWS } from '@/shared/config/keyboard'
import type { LetterState } from '@/entities/guess'
import { cn } from '@/shared/lib/cn'

defineProps<{
  keyStates: Record<string, LetterState>
  disabled?: boolean
}>()

const emit = defineEmits<{
  letter: [ch: string]
  submit: []
  backspace: []
}>()

const stateClass: Record<LetterState, string> = {
  correct: 'bg-correct text-correct-foreground',
  present: 'bg-present text-present-foreground',
  absent: 'bg-absent text-absent-foreground',
}
const baseKey =
  'flex h-12 flex-1 items-center justify-center rounded-md text-base font-semibold uppercase select-none transition-colors active:scale-95 disabled:opacity-60'
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <div
      v-for="(row, r) in KEYBOARD_ROWS"
      :key="r"
      class="flex justify-center gap-1"
    >
      <button
        v-for="ch in row"
        :key="ch"
        type="button"
        :disabled="disabled"
        :class="cn(baseKey, keyStates[ch] ? stateClass[keyStates[ch]] : 'bg-card text-card-foreground')"
        @click="emit('letter', ch)"
      >
        {{ ch }}
      </button>
    </div>

    <div class="flex gap-1">
      <button
        type="button"
        :disabled="disabled"
        :class="cn(baseKey, 'grow-[2] bg-primary text-primary-foreground text-sm')"
        @click="emit('submit')"
      >
        Gönder
      </button>
      <button
        type="button"
        :disabled="disabled"
        :class="cn(baseKey, 'grow-[2] bg-muted text-foreground')"
        aria-label="Poz"
        @click="emit('backspace')"
      >
        <Delete class="size-5" />
      </button>
    </div>
  </div>
</template>
