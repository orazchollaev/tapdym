<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { ArrowLeft, Lock } from "@lucide/vue"
import { LEVEL_COUNT } from "@/shared/config/levels"
import { Button } from "@/shared/ui/button"
import { useProfileStore } from "@/entities/profile"
import { usePlayRoundStore } from "@/features/play-round"

const router = useRouter()
const game = usePlayRoundStore()
const profile = useProfileStore()
const { maxLevel } = storeToRefs(profile)

const levels = computed(() => Array.from({ length: LEVEL_COUNT }, (_, i) => i + 1))

function start(level: number): void {
  game.startLevel(level)
  router.push("/game")
}
</script>

<template>
  <main class="mx-auto flex min-h-full max-w-md flex-col px-6 py-8">
    <div class="flex items-center gap-3">
      <Button variant="secondary" size="icon" aria-label="Yza" @click="router.push('/')">
        <ArrowLeft class="size-5" />
      </Button>
      <h2 class="font-display text-2xl font-bold">Seriýalar</h2>
    </div>

    <div class="anim-fade-up flex flex-1 flex-col justify-center">
      <div class="grid grid-cols-4 gap-3">
        <Button
          v-for="n in levels"
          :key="n"
          :variant="n <= maxLevel ? 'default' : 'secondary'"
          :disabled="n > maxLevel"
          class="aspect-square h-auto text-xl font-semibold"
          :aria-label="`Dereje ${n}`"
          @click="start(n)"
        >
          <Lock v-if="n > maxLevel" class="size-5" />
          <span v-else>{{ n }}</span>
        </Button>
      </div>
      <p class="mt-6 text-center text-sm text-muted-foreground">
        Sözi tap — indiki dereje açylýar.
      </p>
    </div>
  </main>
</template>
