// @ts-check
import { useState, useCallback } from 'react'
import { trackEvent } from '../utils/analytics'

/**
 * Manages Navigate page state — active map filter,
 * route display, and accessibility routing mode.
 * @returns {{
 *   activeFilter: string,
 *   showRoute: boolean,
 *   accessibilityMode: boolean,
 *   setFilter: (filter: string) => void,
 *   toggleRoute: () => void,
 *   toggleAccessibility: () => void
 * }}
 */
export function useVenueNavigate() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showRoute, setShowRoute] = useState(false)
  const [accessibilityMode, setAccessibilityMode] = useState(false)

  /**
   * Sets the active map overlay filter.
   * @param {string} filter - Filter id
   */
  const setFilter = useCallback((filter) => {
    setActiveFilter(filter)
    trackEvent('Navigate', 'FilterChanged', filter)
  }, [])

  /**
   * Toggles the animated route path to seat.
   * Fires GA event on first activation.
   */
  const toggleRoute = useCallback(() => {
    setShowRoute((prev) => {
      if (!prev) trackEvent('Navigate', 'RouteShown')
      return !prev
    })
  }, [])

  /**
   * Toggles accessibility routing mode.
   * Highlights step-free Gates A, C, F.
   */
  const toggleAccessibility = useCallback(() => {
    setAccessibilityMode((prev) => !prev)
    trackEvent('Navigate', 'AccessibilityToggled')
  }, [])

  return {
    activeFilter,
    showRoute,
    accessibilityMode,
    setFilter,
    toggleRoute,
    toggleAccessibility,
  }
}
