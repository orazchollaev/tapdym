<script setup lang="ts">
/**
 * Gül — türkmen halysynyň medalýon motiwi (geometrik). `currentColor` bilen
 * boýalýar; fon suraty (watermark) hökmünde pes opaklyk bilen ulanylýar.
 */
</script>

<template>
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Basgançakly daşky sekizburçluk -->
    <polygon
      points="50,4 68,14 86,14 86,32 96,50 86,68 86,86 68,86 50,96 32,86 14,86 14,68 4,50 14,32 14,14 32,14"
      stroke-width="2"
    />
    <!-- Orta göwher -->
    <polygon points="50,18 82,50 50,82 18,50" stroke-width="2" />
    <!-- Iç göwher (doldurylan) -->
    <polygon points="50,32 68,50 50,68 32,50" fill="currentColor" stroke="none" />
    <!-- Merkez nokat -->
    <circle cx="50" cy="50" r="4" fill="var(--background)" stroke="none" />
    <!-- Burç motiwleri -->
    <path d="M50 4 L50 18 M96 50 L82 50 M50 96 L50 82 M4 50 L18 50" stroke-width="2" />
  </svg>
</template>
