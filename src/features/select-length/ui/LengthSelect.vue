<script setup lang="ts">
import { WORD_LENGTHS, type WordLength } from "@/shared/config/game"
import { LENGTH_BASE } from "@/shared/config/scoring"
import { Button } from "@/shared/ui/button"

const emit = defineEmits<{ select: [length: WordLength] }>()
</script>

<template>
  <div class="flex flex-col gap-3">
    <Button
      v-for="len in WORD_LENGTHS"
      :key="len"
      variant="secondary"
      size="lg"
      class="justify-start gap-4"
      @click="emit('select', len)"
    >
      <span
        class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-2xl font-semibold text-primary-foreground shadow-[0_3px_0_var(--primary-shadow)]"
      >
        {{ len }}
      </span>
      <span class="font-bold">harply söz</span>
      <span
        class="ml-auto flex items-center gap-1 rounded-full bg-present px-2.5 py-1 text-sm font-bold text-present-foreground"
      >
        {{ LENGTH_BASE[len] }}+ bal
      </span>
    </Button>
  </div>
</template>
