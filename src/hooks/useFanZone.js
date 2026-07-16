// @ts-check
import { useState, useContext, useMemo, useCallback } from 'react'
import { AppContext } from '../context/AppContext'
import { trackEvent } from '../utils/analytics'
import { matchStats as mockStats } from '../data/mockData'

/**
 * Manages Fan Zone state.
 * Commentary comes from Firestore (via AppContext) — synced across all clients.
 * Match stats are client-side (minor variance acceptable for fan-facing data).
 * Generating commentary calls Gemini then saves to Firestore for all to see.
 *
 * @returns {{
 *   commentary: Array,
 *   isGenerating: boolean,
 *   stats: object,
 *   generateCommentary: function(): Promise<void>
 * }}
 */
export function useFanZone() {
  const ctx = useContext(AppContext)

  const [isGenerating, setIsGenerating] = useState(false)

  // Live stats — client-side simulation (fan-facing, per-client variance is fine)
  const [stats, setStats] = useState(mockStats)

  // Commentary comes from Firestore — all clients see the same feed
  const commentary = useMemo(() => ctx?.commentary ?? [], [ctx])

  const matchMinute = useMemo(
    () => ctx?.matchState?.minute ?? 67,
    [ctx]
  )

  /**
   * Generates a commentary line via Gemini and saves it to Firestore.
   * All subscribed clients receive the new entry via onSnapshot.
   * @returns {Promise<void>}
   */
  const generateCommentary = useCallback(async () => {
    if (isGenerating || !ctx) return
    setIsGenerating(true)

    const text = await ctx.generateCommentary()
    await ctx.saveCommentary(String(matchMinute), text)

    trackEvent('FanZone', 'CommentaryGenerated')
    setIsGenerating(false)
  }, [isGenerating, ctx, matchMinute])

  /**
   * Nudges match stats to simulate live updates.
   * Called by FanZone page on a 30s interval.
   * @returns {void}
   */
  const tickStats = useCallback(() => {
    setStats((prev) => ({
      possession: {
        home: Math.max(
          40,
          Math.min(
            65,
            prev.possession.home + Math.floor(Math.random() * 5 - 2)
          )
        ),
        away: Math.max(
          35,
          Math.min(
            60,
            prev.possession.away + Math.floor(Math.random() * 5 - 2)
          )
        ),
      },
      shots: {
        home: prev.shots.home + (Math.random() > 0.8 ? 1 : 0),
        away: prev.shots.away + (Math.random() > 0.85 ? 1 : 0),
      },
      passes: {
        home: prev.passes.home + Math.floor(Math.random() * 8 + 2),
        away: prev.passes.away + Math.floor(Math.random() * 6 + 1),
      },
    }))
  }, [])

  return {
    commentary,
    isGenerating,
    stats,
    generateCommentary,
    tickStats,
  }
}
