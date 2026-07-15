// @ts-check
import { useState, useEffect, useMemo } from 'react'
import {
  clamp,
  getCrowdLevel,
  formatMatchTime,
} from '../utils/helpers'
import { FULL_TIME_MINUTE, LIVE_UPDATE_MS } from '../utils/constants'

/**
 * Simulates live match data — match minute,
 * gate wait times, and crowd levels.
 * Match minute increments every 60s.
 * Gate waits randomize every 12s.
 * @param {object} initialMatch - Seed match data
 * @param {Array<{id:string,wait:number,crowd:string,open:boolean}>} initialGates - Seed gates
 * @returns {{
 *   minute: number,
 *   formattedMinute: string,
 *   gates: Array<{id:string,wait:number,crowd:string,open:boolean}>,
 *   avgWait: number,
 *   lastUpdated: number
 * }}
 */
export function useMatch(initialMatch, initialGates) {
  const [minute, setMinute] = useState(initialMatch.minute)
  const [gates, setGates] = useState(() =>
    initialGates.map((g) => ({ ...g }))
  )
  const [lastUpdated, setLastUpdated] = useState(() => Date.now())

  // Match minute — ticks every 60 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setMinute((prev) => (prev < FULL_TIME_MINUTE ? prev + 1 : prev))
    }, 60000)
    return () => clearInterval(id)
  }, [])

  // Gate wait times — randomize every 12 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setGates((prev) =>
        prev.map((gate) => {
          const nudge = Math.random() > 0.5 ? 1 : -1
          const wait = clamp(gate.wait + nudge, 1, 15)
          return { ...gate, wait, crowd: getCrowdLevel(wait) }
        })
      )
      setLastUpdated(Date.now())
    }, LIVE_UPDATE_MS)
    return () => clearInterval(id)
  }, [])

  const formattedMinute = useMemo(
    () => formatMatchTime(minute),
    [minute]
  )

  const avgWait = useMemo(
    () =>
      Math.round(
        (gates.reduce((s, g) => s + g.wait, 0) / gates.length) * 10
      ) / 10,
    [gates]
  )

  return { minute, formattedMinute, gates, avgWait, lastUpdated }
}
