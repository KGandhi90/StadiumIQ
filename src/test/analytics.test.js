import { describe, it, expect } from 'vitest'
import ReactGA from 'react-ga4'
import {
  initAnalytics,
  trackPageView,
  trackEvent,
} from '../utils/analytics'

describe('analytics', () => {
  it('initAnalytics calls ReactGA.initialize', () => {
    initAnalytics()
    expect(ReactGA.initialize).toHaveBeenCalled()
  })

  it('trackPageView sends a pageview hit', () => {
    trackPageView('/', 'Home')
    expect(ReactGA.send).toHaveBeenCalledWith({
      hitType: 'pageview',
      page: '/',
      title: 'Home',
    })
  })

  it('trackEvent fires with category, action and label', () => {
    trackEvent('Chat', 'MessageSent', 'es')
    expect(ReactGA.event).toHaveBeenCalledWith({
      category: 'Chat',
      action: 'MessageSent',
      label: 'es',
    })
  })

  it('trackEvent does not throw when label is omitted', () => {
    expect(() =>
      trackEvent('FanZone', 'CommentaryGenerated')
    ).not.toThrow()
  })

  it('initAnalytics is idempotent — does not throw on repeated calls', () => {
    expect(() => {
      initAnalytics()
      initAnalytics()
    }).not.toThrow()
  })
})
