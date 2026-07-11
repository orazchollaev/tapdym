<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from "vue"
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import confetti from "canvas-confetti"
import { ArrowLeft, Lightbulb, Star } from "@lucide/vue"
import { ALPHABET } from "@/shared/config/keyboard"
import { Button } from "@/shared/ui/button"
import { useProfileStore } from "@/entities/profile"
import { usePlayRoundStore } from "@/features/play-round"
import { useHint } from "@/features/reveal-letter"
import { GameBoard } from "@/widgets/game-board"
import { VirtualKeyboard } from "@/widgets/virtual-keyboard"

const router = useRouter()
const game = usePlayRoundStore()
const profile = useProfileStore()
const hint = useHint()

const { status, keyStates, displayRows, revealedSkeleton, hasRevealed, lastScore, answer } =
  storeToRefs(game)
const { totalPoints } = storeToRefs(profile)

// Oyun oturumu yoksa (dogrudan gezinme) uzunluk secimine don.
if (game.status === "idle") {
  router.replace("/select")
}

const isOver = computed(() => status.value === "won" || status.value === "lost")

// Yeňişde konfetti.
watch(status, (s) => {
  if (s === "won") {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } })
  }
})

function handleLetter(ch: string): void {
  game.addLetter(ch)
}

function onKeydown(e: KeyboardEvent): void {
  if (isOver.value) return
  if (e.key === "Enter") {
    game.submitGuess()
  } else if (e.key === "Backspace") {
    game.removeLetter()
  } else if (e.key.length === 1 && ALPHABET.includes(e.key.toLowerCase())) {
    game.addLetter(e.key.toLowerCase())
  }
}

function playAgain(): void {
  game.resetToIdle()
  router.replace("/select")
}

function goMenu(): void {
  game.resetToIdle()
  router.replace("/")
}

onMounted(() => window.addEventListener("keydown", onKeydown))
onUnmounted(() => window.removeEventListener("keydown", onKeydown))
</script>

<template>
  <main class="mx-auto flex h-full max-w-md flex-col px-4 py-3">
    <!-- Ust bar -->
    <header class="flex items-center justify-between gap-2">
      <Button variant="ghost" size="icon" aria-label="Yza" @click="goMenu">
        <ArrowLeft class="size-5" />
      </Button>
      <div
        class="flex items-center gap-1.5 rounded-md bg-card px-3 py-1 text-sm border border-border"
      >
        <Star class="size-4 text-primary" />
        <span class="font-bold text-primary">{{ totalPoints }}</span>
      </div>
      <Button
        variant="secondary"
        size="default"
        :disabled="!hint.canReveal.value"
        class="gap-1.5 text-sm"
        @click="hint.reveal()"
      >
        <Lightbulb class="size-4" />
        Harp aç · {{ hint.cost }}
      </Button>
    </header>

    <!-- Ipucu iskeleti -->
    <div v-if="hasRevealed" class="mt-3 flex justify-center gap-1.5">
      <div
        v-for="(ch, i) in revealedSkeleton"
        :key="i"
        class="flex h-8 w-8 items-center justify-center rounded border border-dashed border-primary/50 text-lg font-bold uppercase text-primary"
      >
        {{ ch }}
      </div>
    </div>

    <!-- Board -->
    <section class="flex flex-1 items-center justify-center py-4">
      <div class="w-full">
        <GameBoard :rows="displayRows" />
      </div>
    </section>

    <!-- Sonuc -->
    <div v-if="isOver" class="mb-3 rounded-lg bg-card p-4 text-center border border-border">
      <p v-if="status === 'won'" class="text-lg font-bold text-correct">
        Berekella! +{{ lastScore }} bal
      </p>
      <p v-else class="text-lg font-bold text-muted-foreground">
        Söz:
        <span class="uppercase text-foreground">{{ answer }}</span>
      </p>
      <div class="mt-3 flex gap-2">
        <Button class="flex-1" @click="playAgain">Täzeden</Button>
        <Button variant="secondary" class="flex-1" @click="goMenu">Menýu</Button>
      </div>
    </div>

    <!-- Klavye -->
    <section class="pb-2">
      <VirtualKeyboard
        :key-states="keyStates"
        :disabled="isOver"
        @letter="handleLetter"
        @submit="game.submitGuess()"
        @backspace="game.removeLetter()"
      />
    </section>
  </main>
</template>
