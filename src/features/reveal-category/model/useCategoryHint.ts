import { computed } from "vue"
import { CATEGORY_REVEAL_COST } from "@/shared/config/scoring"
import { useProfileStore } from "@/entities/profile"
import { usePlayRoundStore } from "@/features/play-round"

/**
 * Kategori ipucu: puan harcayarak gizli kelimenin kategorisini acar.
 * Bakiye yeterli, oyun oynanabilir ve kategori henuz acilmamis olmali.
 */
export function useCategoryHint() {
  const profile = useProfileStore()
  const game = usePlayRoundStore()

  const canAfford = computed(() => profile.totalPoints >= CATEGORY_REVEAL_COST)
  const canReveal = computed(() => game.canPlay && canAfford.value && !game.categoryRevealed)

  function reveal(): boolean {
    if (!canReveal.value) return false
    if (!profile.spendPoints(CATEGORY_REVEAL_COST)) return false
    game.revealCategory()
    return true
  }

  return { cost: CATEGORY_REVEAL_COST, canAfford, canReveal, reveal }
}
