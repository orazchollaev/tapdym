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
import { AppLogo } from "@/widgets/app-logo"
import BoardBackdrop from "./BoardBackdrop.vue"

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
    <BoardBackdrop />

    <div class="relative z-10 flex w-full flex-1 flex-col items-center">
      <!-- Logo we bal ýokarky boş meýdanyň ortasynda durýar, menýu aşak süýşýär. -->
      <div class="flex flex-1 flex-col items-center justify-center gap-6">
        <header class="text-center">
          <AppLogo />
          <p class="anim-fade-up mt-3 text-muted-foreground" style="animation-delay: 80ms">
            Türkmençe söz tapmaça oýuny
          </p>
        </header>

        <div
          class="anim-fade-up flex items-center gap-1.5 rounded-full bg-present px-3 py-1 text-xs font-bold text-present-foreground shadow-[0_3px_0_var(--present-shadow)]"
          style="animation-delay: 140ms"
        >
          <Star class="size-3.5 fill-current" />
          Jemi bal:
          <span class="text-sm font-semibold">{{ totalPoints }}</span>
        </div>
      </div>

      <nav class="anim-fade-up flex w-full flex-col gap-2.5" style="animation-delay: 200ms">
        <Button class="gap-2" @click="router.push('/levels')">
          <ListOrdered class="size-4" />
          Seriýalar
        </Button>
        <Button variant="secondary" class="gap-2" @click="router.push('/select')">
          <Play class="size-4" />
          Bir gezeklik
        </Button>
        <Button variant="accent" class="gap-2" @click="settingsOpen = true">
          <Settings class="size-4" />
          Sazlamalar
        </Button>
        <Button variant="neutral" class="gap-2" @click="exit">
          <LogOut class="size-4" />
          Çykyş
        </Button>
      </nav>

      <div class="flex-[0.45]" aria-hidden="true" />
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
