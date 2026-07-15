// @ts-check
import { useState, useEffect, useCallback } from 'react'
import { clamp } from '../utils/helpers'
import { trackEvent } from '../utils/analytics'

/** @type {string[]} */
const MOCK_COMMENTARY_ENTRIES = [
  'The intensity in MetLife Stadium is electric — 79,000 fans on their feet.',
  'Brazil looking to kill the game — their counter-attack pace is lethal.',
  'Argentina pressing high. De Paul wins another duel in the engine room.',
  'The noise from the Brazilian end is deafening as they build another move.',
  'World Cup football at its finest under the New Jersey sky.',
  "Goalkeeper Dibu Martínez comes off his line brilliantly — Brazil can't find a way through.",
  'Rodrigo scores! MetLife erupts as Brazil extend their lead! 3–1!',
  "Argentina won't give up. This is what the World Cup is all about.",
]

/**
 * Manages Fan Zone live match stats and
 * AI commentary feed state.
 * Stats simulate updates every 30 seconds.
 * @param {{
 *   commentary: Array<{minute:string,text:string}>,
 *   matchStats: {
 *     possession: {home:number,away:number},
 *     shots: {home:number,away:number},
 *     passes: {home:number,away:number},
 *     corners: {home:number,away:number}
 *   }
 * }} ctx - Context data
 * @returns {{
 *   commentary: Array<{minute:string,text:string}>,
 *   isGenerating: boolean,
 *   stats: object,
 *   generateCommentary: (minute: number) => Promise<void>
 * }}
 */
export function useFanZone(ctx) {
  const [commentary, setCommentary] = useState(() => [
    ...ctx.commentary,
  ])
  const [isGenerating, setIsGenerating] = useState(false)
  const [stats, setStats] = useState(() => ({ ...ctx.matchStats }))

  // Live stats simulation — every 30 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setStats((prev) => {
        const newHomePoss = clamp(
          prev.possession.home + (Math.random() > 0.5 ? 1 : -1),
          40,
          65
        )
        return {
          possession: { home: newHomePoss, away: 100 - newHomePoss },
          shots: {
            home:
              Math.random() > 0.85
                ? prev.shots.home + 1
                : prev.shots.home,
            away:
              Math.random() > 0.9
                ? prev.shots.away + 1
                : prev.shots.away,
          },
          passes: {
            home: prev.passes.home + Math.floor(Math.random() * 4),
            away: prev.passes.away + Math.floor(Math.random() * 3),
          },
          corners: {
            home:
              Math.random() > 0.9
                ? prev.corners.home + 1
                : prev.corners.home,
            away:
              Math.random() > 0.92
                ? prev.corners.away + 1
                : prev.corners.away,
          },
        }
      })
    }, 30000)
    return () => clearInterval(id)
  }, [])

  /**
   * Generates a new mock commentary entry and prepends it to the feed.
   * In Phase 3 this will call the Gemini API.
   * @param {number} currentMinute - Current match minute
   * @returns {Promise<void>}
   */
  const generateCommentary = useCallback(async (currentMinute) => {
    setIsGenerating(true)

    await new Promise((r) => setTimeout(r, 1500))

    const text =
      MOCK_COMMENTARY_ENTRIES[
        Math.floor(Math.random() * MOCK_COMMENTARY_ENTRIES.length)
      ]

    setCommentary((prev) => [
      { minute: String(currentMinute), text },
      ...prev,
    ])
    setIsGenerating(false)

    trackEvent('FanZone', 'CommentaryGenerated')
  }, [])

  return { commentary, isGenerating, stats, generateCommentary }
}
