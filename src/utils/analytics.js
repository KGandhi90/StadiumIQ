// @ts-check
import ReactGA from 'react-ga4'

/**
 * Initialize Google Analytics 4.
 * Safe to call multiple times — GA4 handles deduplication.
 */
export function initAnalytics() {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID
  if (!id) return
  ReactGA.initialize(id)
}

/**
 * Track a page view.
 * @param {string} path - Route path
 * @param {string} title - Page title
 */
export function trackPageView(path, title) {
  ReactGA.send({ hitType: 'pageview', page: path, title })
}

/**
 * Track a custom event.
 * @param {string} category
 * @param {string} action
 * @param {string} [label]
 */
export function trackEvent(category, action, label) {
  ReactGA.event({ category, action, label })
}
