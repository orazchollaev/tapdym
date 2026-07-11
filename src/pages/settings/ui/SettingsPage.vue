<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import { Button } from '@/shared/ui/button'

const router = useRouter()
</script>

<template>
  <main class="mx-auto flex min-h-full max-w-md flex-col px-6 py-8">
    <div class="flex items-center gap-3">
      <Button variant="ghost" size="icon" aria-label="Yza" @click="router.push('/')">
        <ArrowLeft class="size-5" />
      </Button>
      <h2 class="text-xl font-bold">Sazlamalar</h2>
    </div>

    <div class="flex flex-1 items-center justify-center">
      <p class="text-center text-muted-foreground">
        Sazlamalar ýakynda goşular.
      </p>
    </div>
  </main>
</template>
