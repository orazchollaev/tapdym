<script setup lang="ts">
import { storeToRefs } from "pinia"
import { Moon, Sun } from "@lucide/vue"
import { Button } from "@/shared/ui/button"
import { Dialog } from "@/shared/ui/dialog"
import { useThemeStore } from "@/entities/theme"

defineProps<{ open: boolean }>()
const emit = defineEmits<{ "update:open": [value: boolean] }>()

const themeStore = useThemeStore()
const { mode } = storeToRefs(themeStore)
</script>

<template>
  <Dialog :open="open" title="Sazlamalar" @update:open="emit('update:open', $event)">
    <div class="mt-4">
      <p class="text-sm font-medium text-muted-foreground">Tema</p>
      <div class="mt-2 grid grid-cols-2 gap-2">
        <Button
          :variant="mode === 'light' ? 'default' : 'secondary'"
          class="gap-2"
          @click="themeStore.setMode('light')"
        >
          <Sun class="size-4" />
          Açyk
        </Button>
        <Button
          :variant="mode === 'dark' ? 'default' : 'secondary'"
          class="gap-2"
          @click="themeStore.setMode('dark')"
        >
          <Moon class="size-4" />
          Garaňky
        </Button>
      </div>
    </div>
  </Dialog>
</template>
