<script setup lang="ts">
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "reka-ui"
import { X } from "@lucide/vue"

defineProps<{
  open: boolean
  title?: string
  description?: string
}>()

const emit = defineEmits<{ "update:open": [value: boolean] }>()
</script>

<template>
  <DialogRoot :open="open" @update:open="emit('update:open', $event)">
    <DialogPortal>
      <DialogOverlay class="dialog-overlay fixed inset-0 z-40 bg-[rgb(0_0_0/0.55)]" />
      <!-- Doly ekran flex-ortalaýjy (translate-çaknyşyk ýok). -->
      <DialogContent
        class="fixed inset-0 z-50 flex items-center justify-center p-4 focus:outline-none"
      >
        <div
          class="dialog-card relative w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-2xl"
        >
          <DialogClose
            class="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Ýap"
          >
            <X class="size-4" />
          </DialogClose>
          <!-- Erişilebilirlik üçin DialogTitle hemişe bar (görünmese sr-only). -->
          <DialogTitle :class="title ? 'font-display text-2xl font-bold pr-6' : 'sr-only'">
            {{ title ?? "Maglumat" }}
          </DialogTitle>
          <DialogDescription v-if="description" class="mt-1 text-sm text-muted-foreground">
            {{ description }}
          </DialogDescription>
          <slot />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
.dialog-overlay[data-state="open"] {
  animation: overlay-in 0.24s ease both;
}
.dialog-overlay[data-state="closed"] {
  animation: overlay-out 0.18s ease both;
}
.dialog-card {
  animation: card-in 0.26s cubic-bezier(0.22, 1, 0.36, 1) both;
}
[data-state="closed"] .dialog-card {
  animation: card-out 0.18s ease both;
}

@keyframes overlay-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes overlay-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(1rem) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@keyframes card-out {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(0.5rem) scale(0.98);
  }
}

@media (prefers-reduced-motion: reduce) {
  .dialog-overlay,
  .dialog-card {
    animation: none !important;
  }
}
</style>
