<script setup lang="ts">
import { ref } from "vue"
import { Delete, SendHorizontal } from "@lucide/vue"
import { KEYBOARD_ROWS, KEY_VARIANTS } from "@/shared/config/keyboard"
import type { LetterState } from "@/entities/guess"
import { cn } from "@/shared/lib/cn"

const props = defineProps<{
  keyStates: Record<string, LetterState>
  disabled?: boolean
}>()

const emit = defineEmits<{
  letter: [ch: string]
  submit: []
  backspace: []
}>()

const lastRow = KEYBOARD_ROWS.length - 1

const stateClass: Record<LetterState, string> = {
  correct: "bg-correct text-correct-foreground",
  present: "bg-present text-present-foreground",
  absent: "bg-absent text-absent-foreground",
}
const baseKey =
  "key-btn flex h-full w-full items-center justify-center rounded-md font-semibold uppercase select-none transition-colors active:scale-95 disabled:opacity-60"

/** Häzir popover açyk bolan esasy harp (ýa-da null). */
const activeKey = ref<string | null>(null)
let pressTimer: ReturnType<typeof setTimeout> | undefined
const LONG_PRESS_MS = 300

function variantsOf(ch: string): readonly string[] {
  return KEY_VARIANTS[ch] ?? []
}

function clearTimer(): void {
  if (pressTimer !== undefined) {
    clearTimeout(pressTimer)
    pressTimer = undefined
  }
}

function onPointerDown(ch: string): void {
  if (props.disabled) return
  if (variantsOf(ch).length) {
    pressTimer = setTimeout(() => {
      pressTimer = undefined
      activeKey.value = ch
    }, LONG_PRESS_MS)
  }
}

function onPointerUp(ch: string): void {
  if (props.disabled) return
  // Popover açyk däl bolsa (basyp-saklama işlemedi) -> adaty basyş.
  if (activeKey.value !== ch) {
    clearTimer()
    emit("letter", ch)
  }
  // Popover açyk bolsa: goýbermek harp saýlamaýar, ulanyjy görnüşi saýlaýar.
}

function onPointerLeave(): void {
  clearTimer()
}

function selectVariant(v: string): void {
  emit("letter", v)
  activeKey.value = null
}

function closePopover(): void {
  activeKey.value = null
}
</script>

<template>
  <div class="keyboard">
    <div v-for="(row, r) in KEYBOARD_ROWS" :key="r" class="row">
      <!-- Gönder: aşaky hataryň çep tarapynda -->
      <button
        v-if="r === lastRow"
        type="button"
        :disabled="disabled"
        aria-label="Gönder"
        :class="cn(baseKey, 'key key--control bg-primary text-primary-foreground')"
        @click="emit('submit')"
      >
        <SendHorizontal class="size-5" />
      </button>

      <div v-for="ch in row" :key="ch" class="key">
        <button
          type="button"
          :disabled="disabled"
          :class="
            cn(baseKey, keyStates[ch] ? stateClass[keyStates[ch]] : 'bg-card text-card-foreground')
          "
          @pointerdown="onPointerDown(ch)"
          @pointerup="onPointerUp(ch)"
          @pointerleave="onPointerLeave"
          @pointercancel="onPointerLeave"
          @contextmenu.prevent
        >
          {{ ch }}
          <!-- Ek harply tuşlaryň sag ýokarsynda nokat. -->
          <span
            v-if="variantsOf(ch).length"
            class="pointer-events-none absolute right-1 top-1 size-1.5 rounded-full bg-primary/70"
          />
        </button>

        <!-- Long-press popover: aksentli görnüşler. -->
        <div
          v-if="activeKey === ch"
          class="absolute bottom-full left-1/2 z-50 mb-1.5 flex -translate-x-1/2 gap-1 rounded-lg border border-border bg-card p-1 shadow-lg"
        >
          <button
            v-for="v in variantsOf(ch)"
            :key="v"
            type="button"
            class="flex h-11 min-w-11 items-center justify-center rounded-md bg-muted px-2 text-xl font-semibold uppercase text-foreground active:scale-95"
            @click="selectVariant(v)"
          >
            {{ v }}
          </button>
        </div>
      </div>

      <!-- Poz (backspace): aşaky hataryň sag tarapynda -->
      <button
        v-if="r === lastRow"
        type="button"
        :disabled="disabled"
        aria-label="Poz"
        :class="cn(baseKey, 'key key--control bg-muted text-foreground')"
        @click="emit('backspace')"
      >
        <Delete class="size-5" />
      </button>
    </div>

    <!-- Popover açykka daşyna basylsa ýapylýar. -->
    <button
      v-if="activeKey"
      type="button"
      aria-hidden="true"
      tabindex="-1"
      class="fixed inset-0 z-40 cursor-default"
      @click="closePopover"
    />
  </div>
</template>

<style scoped>
/* Ölçeg/ýerleşiş ulgamy — Wordle-görnüşli klawiatura düzgüni. */
.keyboard {
  position: relative;
  display: grid;
  grid-template-rows: repeat(3, 3.5rem);
  margin: 0 calc(-1rem + 5px);
  touch-action: manipulation;
}

@media (min-height: 44rem) {
  .keyboard {
    grid-template-rows: repeat(3, 4rem);
  }
}

@media (min-height: 50rem) {
  .keyboard {
    grid-template-rows: repeat(3, 4.2rem);
  }
}

.row {
  display: flex;
  width: 100%;
  margin: 0 auto;
}

.row + .row {
  margin-top: 5px;
}

/* Orta hatar — girintili we ortalanan. */
.row:nth-of-type(2) {
  max-width: calc(100% - 2.5rem);
}

.key {
  position: relative;
  display: flex;
  flex: 1 1 3ch;
}

.key + .key {
  margin-left: 5px;
}

/* Gönder / Poz — has giň. */
.key--control {
  flex: 1 1 5ch;
  padding: 0 0.5ch;
}

.key-btn {
  position: relative;
  padding: 0;
  font-size: 1.1rem;
  line-height: 1;
}

@media (min-width: 26rem) {
  .key-btn {
    font-size: 1.2rem;
  }
}
</style>
