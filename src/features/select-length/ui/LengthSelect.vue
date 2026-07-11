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
      class="justify-between"
      @click="emit('select', len)"
    >
      <span class="font-semibold">{{ len }} harply söz</span>
      <span class="text-sm text-muted-foreground">{{ LENGTH_BASE[len] }}+ bal</span>
    </Button>
  </div>
</template>
