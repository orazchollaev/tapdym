import { computed } from "vue"
import { HINT_COST } from "@/shared/config/scoring"
import { MAX_REVEALS } from "@/shared/config/game"
import { useProfileStore } from "@/entities/profile"
import { usePlayRoundStore } from "@/features/play-round"

/**
 * Ipucu aksiyonu: puan harcayarak gizli kelimeden rastgele bir dogru harf acar.
 * Once acilabilir konum var mi ve bakiye yeterli mi kontrol edilir; harf
 * acilamazsa harcanan puan iade edilir.
 */
export function useHint() {
  const profile = useProfileStore()
  const game = usePlayRoundStore()

  const canAfford = computed(() => profile.totalPoints >= HINT_COST)
  /** Ýene açyp bolýan harp sany (limit — açylan). */
  const remaining = computed(() =>
    Math.max(0, MAX_REVEALS[game.length] - Object.keys(game.revealed).length)
  )
  const canReveal = computed(() => game.canPlay && canAfford.value && remaining.value > 0)

  function reveal(): boolean {
    if (!canReveal.value) return false
    if (!profile.spendPoints(HINT_COST)) return false
    const ok = game.revealRandomLetter()
    if (!ok) {
      // Acilacak konum kalmadiysa puani iade et.
      profile.addPoints(HINT_COST)
      return false
    }
    return true
  }

  return { cost: HINT_COST, canAfford, canReveal, remaining, reveal }
}
