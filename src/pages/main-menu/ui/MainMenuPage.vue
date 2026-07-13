<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { Capacitor } from "@capacitor/core"
import { App } from "@capacitor/app"
import { ListOrdered, LogOut, Play, Settings, Star } from "@lucide/vue"
import { APP_AUTHOR, APP_VERSION } from "@/shared/config/app"
import { Button } from "@/shared/ui/button"
import { useProfileStore } from "@/entities/profile"
import { SettingsDialog } from "@/widgets/settings-dialog"

const router = useRouter()
const profile = useProfileStore()
const { totalPoints } = storeToRefs(profile)

const settingsOpen = ref(false)

function exit(): void {
  if (Capacitor.isNativePlatform()) {
    App.exitApp()
  } else {
    window.close()
  }
}
</script>

<template>
  <main
    class="relative mx-auto flex min-h-full max-w-md flex-col items-center overflow-hidden px-6 py-10"
  >
    <div class="relative z-10 flex w-full flex-1 flex-col items-center justify-center gap-8">
      <header class="text-center">
        <img src="/logo.png" alt="Tapdym" class="anim-fade-up mx-auto w-128 max-w-full" />
        <p class="anim-fade-up mt-3 text-muted-foreground" style="animation-delay: 80ms">
          Türkmençe söz tapmaça oýuny
        </p>
      </header>

      <div
        class="anim-fade-up flex items-center gap-2 rounded-full bg-present px-4 py-2 text-sm font-bold text-present-foreground shadow-[0_4px_0_var(--present-shadow)]"
        style="animation-delay: 140ms"
      >
        <Star class="size-4 fill-current" />
        Jemi bal:
        <span class="text-base font-black">{{ totalPoints }}</span>
      </div>

      <nav class="anim-fade-up flex w-full flex-col gap-3" style="animation-delay: 200ms">
        <Button size="lg" class="gap-2" @click="router.push('/levels')">
          <ListOrdered class="size-5" />
          Seriýalar
        </Button>
        <Button size="lg" variant="secondary" class="gap-2" @click="router.push('/select')">
          <Play class="size-5" />
          Bir gezeklik
        </Button>
        <Button size="lg" variant="ghost" class="gap-2" @click="settingsOpen = true">
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
