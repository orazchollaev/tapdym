<script setup lang="ts"></script>

<template>
  <div class="carpet pointer-events-none absolute inset-0 -z-0" aria-hidden="true">
    <svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="gul" width="72" height="72" patternUnits="userSpaceOnUse">
          <path
            d="M36 6 66 36 36 66 6 36Z"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <path d="M36 20 52 36 36 52 20 36Z" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="M36 30 42 36 36 42 30 36Z" fill="currentColor" />
          <path
            d="M36 0v6M36 66v6M0 36h6M66 36h6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gul)" />
    </svg>
  </div>
</template>

<style scoped>
.carpet {
  color: var(--primary);
  opacity: 0.09;
  -webkit-mask-image: radial-gradient(ellipse 62% 46% at 50% 45%, transparent 35%, black 100%);
  mask-image: radial-gradient(ellipse 62% 46% at 50% 45%, transparent 35%, black 100%);
}

:global(:root.dark) .carpet {
  opacity: 1s;
}

.carpet svg {
  background: transparent;
}
</style>
