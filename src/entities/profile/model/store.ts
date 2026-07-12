import { defineStore } from "pinia"
import { ref } from "vue"
import { LEVEL_COUNT } from "@/shared/config/levels"

/** Yeni oyuncuya verilen baslangic bakiyesi (ilk ipucular alinabilsin diye). */
export const STARTING_POINTS = 100

/**
 * Kalici oyuncu profili — puanlar localStorage'da saklanir.
 * Ileride ayarlar/istatistik gibi alanlar buraya eklenebilir.
 */
export const useProfileStore = defineStore(
  "profile",
  () => {
    const totalPoints = ref(STARTING_POINTS)
    /** Iň ýokary açylan dereje (1-nji elmydama açyk). */
    const maxLevel = ref(1)

    function addPoints(amount: number): void {
      if (amount > 0) totalPoints.value += amount
    }

    /** Yeterli bakiye varsa harcar ve true doner; yoksa false. */
    function spendPoints(amount: number): boolean {
      if (amount <= 0 || totalPoints.value < amount) return false
      totalPoints.value -= amount
      return true
    }

    /** Berlen derejäni açar (LEVEL_COUNT bilen çäklendirilýär). */
    function unlockLevel(level: number): void {
      if (level > maxLevel.value) maxLevel.value = Math.min(level, LEVEL_COUNT)
    }

    return { totalPoints, maxLevel, addPoints, spendPoints, unlockLevel }
  },
  {
    persist: {
      key: "tapdym-profile",
    },
  }
)
