import { defineStore } from "pinia"
import { ref, watch } from "vue"

export type ThemeMode = "light" | "dark"

function prefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

/** Ulanyjynyň saýlan temasy (açyk/garaňky) — localStorage'da saklanýar. */
export const useThemeStore = defineStore(
  "theme",
  () => {
    const mode = ref<ThemeMode>(prefersDark() ? "dark" : "light")

    function setMode(next: ThemeMode): void {
      mode.value = next
    }

    function toggle(): void {
      mode.value = mode.value === "dark" ? "light" : "dark"
    }

    watch(
      mode,
      (m) => {
        document.documentElement.classList.toggle("dark", m === "dark")
      },
      { immediate: true }
    )

    return { mode, setMode, toggle }
  },
  {
    persist: {
      key: "tapdym-theme",
    },
  }
)
