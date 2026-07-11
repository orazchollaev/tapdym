<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { WordLength } from '@/shared/config/game'
import { Button } from '@/shared/ui/button'
import { LengthSelect } from '@/features/select-length'
import { usePlayRoundStore } from '@/features/play-round'

const router = useRouter()
const game = usePlayRoundStore()

function start(length: WordLength): void {
  game.startGame(length)
  router.push('/game')
}
</script>

<template>
  <main class="mx-auto flex min-h-full max-w-md flex-col px-6 py-8">
    <div class="flex items-center gap-3">
      <Button variant="ghost" size="icon" @click="router.push('/')">←</Button>
      <h2 class="text-xl font-bold">Söz uzynlygyny saýla</h2>
    </div>

    <div class="flex flex-1 flex-col justify-center">
      <LengthSelect @select="start" />
      <p class="mt-6 text-center text-sm text-muted-foreground">
        Uzyn söz = köp bal. Az synanyşyk = köp bal.
      </p>
    </div>
  </main>
</template>
