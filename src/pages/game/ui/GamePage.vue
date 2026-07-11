<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import confetti from "canvas-confetti"
import { ArrowLeft, Lightbulb, Settings, Star } from "@lucide/vue"
import { ALPHABET } from "@/shared/config/keyboard"
import { splitGraphemes } from "@/shared/lib/text"
import { Button } from "@/shared/ui/button"
import { Dialog } from "@/shared/ui/dialog"
import { useProfileStore } from "@/entities/profile"
import { usePlayRoundStore } from "@/features/play-round"
import { useHint } from "@/features/reveal-letter"
import { GameBoard } from "@/widgets/game-board"
import { SettingsDialog } from "@/widgets/settings-dialog"
import { VirtualKeyboard } from "@/widgets/virtual-keyboard"

const router = useRouter()
const game = usePlayRoundStore()
const profile = useProfileStore()
const hint = useHint()

const {
  status,
  keyStates,
  displayRows,
  revealedSkeleton,
  hasRevealed,
  lastScore,
  answer,
  revealRow,
  shakeNonce,
  currentRow,
  length,
} = storeToRefs(game)
const { totalPoints } = storeToRefs(profile)

// Oýun oturumy ýok bolsa (göni gezelenç) uzynlyk saýlawyna dolan.
if (game.status === "idle") {
  router.replace("/select")
}

const isOver = computed(() => status.value === "won" || status.value === "lost")
const answerLetters = computed(() => splitGraphemes(answer.value))

const shakeRow = ref<number | null>(null)
const winRow = ref<number | null>(null)
const dialogOpen = ref(false)
const settingsOpen = ref(false)

const revealDuration = () => length.value * 90 + 450

watch(revealRow, (r) => {
  if (r !== null) {
    window.setTimeout(() => game.clearReveal(), revealDuration())
  }
})

watch(shakeNonce, () => {
  shakeRow.value = currentRow.value
  window.setTimeout(() => (shakeRow.value = null), 450)
})

watch(status, (s) => {
  if (s === "won") {
    const delay = revealDuration()
    window.setTimeout(() => {
      winRow.value = currentRow.value - 1
      confetti({
        particleCount: 130,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#9b2d22", "#c08a2a", "#f7efdf", "#33415c"],
      })
    }, delay)
    window.setTimeout(() => (dialogOpen.value = true), delay + 750)
  } else if (s === "lost") {
    window.setTimeout(() => (dialogOpen.value = true), revealDuration() + 350)
  }
})

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
  dialogOpen.value = false
  winRow.value = null
  game.resetToIdle()
  router.replace("/select")
}

function goMenu(): void {
  dialogOpen.value = false
  winRow.value = null
  game.resetToIdle()
  router.replace("/")
}

onMounted(() => window.addEventListener("keydown", onKeydown))
onUnmounted(() => window.removeEventListener("keydown", onKeydown))
</script>

<template>
  <main class="game-scale mx-auto flex h-full max-w-[30rem] flex-col px-4 py-3">
    <header class="flex items-center justify-between gap-2 text-base">
      <Button variant="ghost" size="icon" aria-label="Yza" @click="goMenu">
        <ArrowLeft class="size-5" />
      </Button>
      <div
        class="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-sm"
      >
        <Star class="size-4 text-primary" />
        <span class="font-bold text-primary">{{ totalPoints }}</span>
      </div>
      <div class="flex items-center gap-1.5">
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
        <Button variant="ghost" size="icon" aria-label="Sazlamalar" @click="settingsOpen = true">
          <Settings class="size-5" />
        </Button>
      </div>
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
      <GameBoard
        class="w-full"
        :rows="displayRows"
        :reveal-row="revealRow"
        :shake-row="shakeRow"
        :win-row="winRow"
      />
    </section>

    <!-- Klavye -->
    <section class="pb-2">
      <VirtualKeyboard
        :key-states="keyStates"
        :disabled="isOver"
        @letter="game.addLetter"
        @submit="game.submitGuess()"
        @backspace="game.removeLetter()"
      />
    </section>

    <!-- Netije penjiresi -->
    <Dialog v-model:open="dialogOpen">
      <div class="text-center">
        <p class="font-display text-3xl font-extrabold text-primary">
          {{ status === "won" ? "Berekella!" : "Söz tapylmady" }}
        </p>

        <p v-if="status === 'won'" class="mt-2 text-lg">
          <span class="font-bold text-primary">+{{ lastScore }}</span>
          bal
        </p>

        <div v-else class="mt-3 flex justify-center gap-1">
          <span
            v-for="(ch, i) in answerLetters"
            :key="i"
            class="anim-fade-up flex h-9 w-9 items-center justify-center rounded-md bg-correct text-lg font-bold uppercase text-correct-foreground"
            :style="{ animationDelay: `${i * 70}ms` }"
          >
            {{ ch }}
          </span>
        </div>

        <div class="mt-5 flex gap-2">
          <Button class="flex-1" @click="playAgain">Täzeden</Button>
          <Button variant="secondary" class="flex-1" @click="goMenu">Menýu</Button>
        </div>
      </div>
    </Dialog>

    <SettingsDialog v-model:open="settingsOpen" />
  </main>
</template>
