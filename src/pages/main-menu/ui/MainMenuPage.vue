<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { LogOut, Play, Settings, Star } from "@lucide/vue"
import { APP_AUTHOR, APP_VERSION } from "@/shared/config/app"
import { Button } from "@/shared/ui/button"
import { useProfileStore } from "@/entities/profile"
import { SettingsDialog } from "@/widgets/settings-dialog"

const router = useRouter()
const profile = useProfileStore()
const { totalPoints } = storeToRefs(profile)

const settingsOpen = ref(false)

function exit(): void {
  window.close()
}
</script>

<template>
  <main
    class="relative mx-auto flex min-h-full max-w-md flex-col items-center overflow-hidden px-6 py-10"
  >
    <div class="relative z-10 flex w-full flex-1 flex-col items-center justify-center gap-8">
      <header class="text-center">
        <h1 class="anim-fade-up font-display text-6xl font-extrabold tracking-tight text-primary">
          Tapdym
        </h1>
        <svg
          class="woven mx-auto mt-2 w-40 text-primary"
          viewBox="0 0 160 8"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            d="M0 6 L8 2 L16 6 L24 2 L32 6 L40 2 L48 6 L56 2 L64 6 L72 2 L80 6 L88 2 L96 6 L104 2 L112 6 L120 2 L128 6 L136 2 L144 6 L152 2 L160 6"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="anim-fade-up mt-3 text-muted-foreground" style="animation-delay: 80ms">
          Türkmen söz tapmaça oýny
        </p>
      </header>

      <div
        class="anim-fade-up flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-card-foreground"
        style="animation-delay: 140ms"
      >
        <Star class="size-4 text-primary" />
        Jemi bal:
        <span class="font-bold text-primary">{{ totalPoints }}</span>
      </div>

      <nav class="anim-fade-up flex w-full flex-col gap-3" style="animation-delay: 200ms">
        <Button size="lg" class="gap-2" @click="router.push('/select')">
          <Play class="size-5" />
          Başla
        </Button>
        <Button size="lg" variant="secondary" class="gap-2" @click="settingsOpen = true">
          <Settings class="size-5" />
          Sazlamalar
        </Button>
        <Button size="lg" variant="ghost" class="gap-2" @click="exit">
          <LogOut class="size-5" />
          Çykyş
        </Button>
      </nav>
    </div>

    <footer
      class="anim-fade-up relative pt-8 text-center text-xs text-muted-foreground"
      style="animation-delay: 260ms"
    >
      v{{ APP_VERSION }} · {{ APP_AUTHOR }}
    </footer>

    <SettingsDialog v-model:open="settingsOpen" />
  </main>
</template>

<style scoped>
.woven path {
  stroke-dasharray: 260;
  animation: stitch-draw 0.8s ease-out 0.25s both;
}
@media (prefers-reduced-motion: reduce) {
  .woven path {
    animation: none !important;
  }
}
</style>
