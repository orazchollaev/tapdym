import { defineStore } from "pinia"
import { ref } from "vue"

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

    function addPoints(amount: number): void {
      if (amount > 0) totalPoints.value += amount
    }

    /** Yeterli bakiye varsa harcar ve true doner; yoksa false. */
    function spendPoints(amount: number): boolean {
      if (amount <= 0 || totalPoints.value < amount) return false
      totalPoints.value -= amount
      return true
    }

    return { totalPoints, addPoints, spendPoints }
  },
  {
    persist: {
      key: "tapdym-profile",
    },
  }
)
