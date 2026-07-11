<script setup lang="ts">
import { Delete, SendHorizontal } from "@lucide/vue";
import { KEYBOARD_ROWS } from "@/shared/config/keyboard";
import type { LetterState } from "@/entities/guess";
import { cn } from "@/shared/lib/cn";

defineProps<{
  keyStates: Record<string, LetterState>;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  letter: [ch: string];
  submit: [];
  backspace: [];
}>();

const lastRow = KEYBOARD_ROWS.length - 1;

const stateClass: Record<LetterState, string> = {
  correct: "bg-correct text-correct-foreground",
  present: "bg-present text-present-foreground",
  absent: "bg-absent text-absent-foreground",
};
const baseKey =
  "flex h-12 items-center justify-center rounded-md text-base font-semibold uppercase select-none transition-colors active:scale-95 disabled:opacity-60";
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <div
      v-for="(row, r) in KEYBOARD_ROWS"
      :key="r"
      class="flex justify-center gap-1"
    >
      <!-- Gönder: aşaky hataryň çep tarapynda (ž-den öň) -->
      <button
        v-if="r === lastRow"
        type="button"
        :disabled="disabled"
        aria-label="Gönder"
        :class="cn(baseKey, 'flex-[1.4] bg-primary text-primary-foreground')"
        @click="emit('submit')"
      >
        <SendHorizontal class="size-5" />
      </button>

      <button
        v-for="ch in row"
        :key="ch"
        type="button"
        :disabled="disabled"
        :class="
          cn(
            baseKey,
            'flex-1',
            keyStates[ch]
              ? stateClass[keyStates[ch]]
              : 'bg-card text-card-foreground',
          )
        "
        @click="emit('letter', ch)"
      >
        {{ ch }}
      </button>

      <!-- Poz (backspace): aşaky hataryň sag tarapynda (m-den soň) -->
      <button
        v-if="r === lastRow"
        type="button"
        :disabled="disabled"
        aria-label="Poz"
        :class="cn(baseKey, 'flex-[1.4] bg-muted text-foreground')"
        @click="emit('backspace')"
      >
        <Delete class="size-5" />
      </button>
    </div>
  </div>
</template>
