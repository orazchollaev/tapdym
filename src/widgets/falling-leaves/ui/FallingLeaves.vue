<script setup lang="ts">
import { Cannabis, Clover, Leaf, LeafyGreen } from "@lucide/vue"

const LEAF_ICONS = [Leaf, Clover, Cannabis, LeafyGreen]

// 60-30-10: köpüsi ýumşak fon-ýakyn ton (60%), azy esasy reňk (30%), az sanlysy urgu reňki (10%).
const LEAF_COLORS = [
  "var(--present)",
  "var(--present)",
  "var(--present)",
  "var(--primary)",
  "var(--primary)",
  "var(--accent)",
  "var(--present)",
  "var(--primary)",
]

const leaves = LEAF_COLORS.map((color, i) => ({
  id: i,
  color,
  icon: LEAF_ICONS[Math.floor(Math.random() * LEAF_ICONS.length)],
  left: Math.random() * 100,
  duration: 14 + Math.random() * 12,
  delay: -Math.random() * 20,
  scale: 0.6 + Math.random() * 0.6,
  sway: 20 + Math.random() * 30,
}))
</script>

<template>
  <div class="falling-leaves" aria-hidden="true">
    <component
      :is="leaf.icon"
      v-for="leaf in leaves"
      :key="leaf.id"
      class="leaf"
      :style="{
        left: `${leaf.left}%`,
        animationDuration: `${leaf.duration}s`,
        animationDelay: `${leaf.delay}s`,
        '--sway': `${leaf.sway}px`,
        '--scale': leaf.scale,
        color: leaf.color,
      }"
    />
  </div>
</template>

<style scoped>
.falling-leaves {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.leaf {
  position: absolute;
  top: -10%;
  width: calc(1.1rem * var(--scale));
  height: calc(1.1rem * var(--scale));
  animation-name: leaf-fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes leaf-fall {
  0% {
    transform: translateY(-10vh) translateX(0) rotate(0deg);
  }
  25% {
    transform: translateY(30vh) translateX(var(--sway)) rotate(90deg);
  }
  50% {
    transform: translateY(60vh) translateX(0) rotate(180deg);
  }
  75% {
    transform: translateY(90vh) translateX(calc(var(--sway) * -1)) rotate(270deg);
  }
  100% {
    transform: translateY(115vh) translateX(0) rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .falling-leaves {
    display: none;
  }
}
</style>
