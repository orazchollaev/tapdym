<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { APP_AUTHOR, APP_VERSION } from '@/shared/config/app'
import { Button } from '@/shared/ui/button'
import { useProfileStore } from '@/entities/profile'

const router = useRouter()
const profile = useProfileStore()
const { totalPoints } = storeToRefs(profile)

function exit(): void {
  // Web ortaminda pencereyi kapatmaya calis (mumkun olmayabilir).
  window.close()
}
</script>

<template>
  <main
    class="mx-auto flex min-h-full max-w-md flex-col items-center px-6 py-10"
  >
    <div class="flex flex-1 flex-col items-center justify-center gap-8 w-full">
      <header class="text-center">
        <h1 class="text-5xl font-extrabold tracking-tight text-primary">
          Tapdym
        </h1>
        <p class="mt-2 text-muted-foreground">Türkmen söz tapmaça oýny</p>
      </header>

      <div
        class="rounded-lg bg-card px-4 py-2 text-sm text-card-foreground border border-border"
      >
        Jemi bal: <span class="font-bold text-primary">{{ totalPoints }}</span>
      </div>

      <nav class="flex w-full flex-col gap-3">
        <Button size="lg" @click="router.push('/select')">Başla</Button>
        <Button size="lg" variant="secondary" @click="router.push('/settings')">
          Sazlamalar
        </Button>
        <Button size="lg" variant="ghost" @click="exit">Çykyş</Button>
      </nav>
    </div>

    <footer class="pt-8 text-center text-xs text-muted-foreground">
      v{{ APP_VERSION }} · {{ APP_AUTHOR }}
    </footer>
  </main>
</template>
