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
  correct: "bg-correct text-correct-foreground shadow-[0_3px_0_var(--correct-shadow)]",
  present: "bg-present text-present-foreground shadow-[0_3px_0_var(--present-shadow)]",
  absent: "bg-absent text-absent-foreground shadow-[0_3px_0_var(--absent-shadow)]",
}
/** Galgan tuş: aşaky dodak + basylanda aşak gysylýar. */
const baseKey =
  "key-btn flex h-full w-full items-center justify-center rounded-lg font-bold uppercase select-none transition-[transform,box-shadow,background-color] duration-100 active:translate-y-[2px] active:shadow-[0_1px_0_var(--key-shadow)] disabled:opacity-60"

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
  if (activeKey.value !== ch) {
    clearTimer()
    emit("letter", ch)
  }
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
        :class="
          cn(
            baseKey,
            'key key--control bg-primary text-primary-foreground shadow-[0_3px_0_var(--primary-shadow)]'
          )
        "
        @click="emit('submit')"
      >
        <SendHorizontal class="size-5" />
      </button>

      <div v-for="ch in row" :key="ch" class="key">
        <button
          type="button"
          :disabled="disabled"
          :class="
            cn(
              baseKey,
              keyStates[ch]
                ? stateClass[keyStates[ch]]
                : 'bg-key-face text-foreground shadow-[0_3px_0_var(--key-shadow)]'
            )
          "
          @pointerdown="onPointerDown(ch)"
          @pointerup="onPointerUp(ch)"
          @pointerleave="onPointerLeave"
          @pointercancel="onPointerLeave"
          @contextmenu.prevent
        >
          {{ ch }}
          <span
            v-if="variantsOf(ch).length"
            class="pointer-events-none absolute right-1 top-1 size-1.5 rounded-full bg-primary/70"
          />
        </button>

        <div
          v-if="activeKey === ch"
          class="absolute bottom-full left-1/2 z-50 mb-1.5 flex -translate-x-1/2 gap-1 rounded-xl border-2 border-border bg-card p-1.5 shadow-xl"
        >
          <button
            v-for="v in variantsOf(ch)"
            :key="v"
            type="button"
            class="flex h-11 min-w-11 items-center justify-center rounded-lg bg-key-face px-2 text-xl font-bold uppercase text-foreground shadow-[0_3px_0_var(--key-shadow)] transition-transform active:translate-y-[2px] active:shadow-[0_1px_0_var(--key-shadow)]"
            @click="selectVariant(v)"
          >
            {{ v }}
          </button>
        </div>
      </div>

      <button
        v-if="r === lastRow"
        type="button"
        :disabled="disabled"
        aria-label="Poz"
        :class="
          cn(
            baseKey,
            'key key--control bg-key-face text-foreground shadow-[0_3px_0_var(--key-shadow)]'
          )
        "
        @click="emit('backspace')"
      >
        <Delete class="size-5" />
      </button>
    </div>

    <button
      v-if="activeKey"
      type="button"
      aria-hidden="true"
      tabindex="-1"
      class="fixed inset-0 z-40 cursor-default"
      @pointerdown="closePopover"
    />
  </div>
</template>

<style scoped>
.keyboard {
  position: relative;
  display: grid;
  grid-template-rows: repeat(3, 50px);
  margin: 0 calc(-1rem + 6px);
  touch-action: manipulation;
}

.row {
  display: flex;
  width: 100%;
  margin: 0 auto;
}

.row + .row {
  margin-top: 7px;
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
  margin-left: 7px;
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
}

@media (min-width: 26rem) {
  .key-btn {
    font-size: 1.2rem;
  }
}
</style>
