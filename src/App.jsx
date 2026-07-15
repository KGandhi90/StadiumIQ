import { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { FanLayout } from './FanLayout'
import { Home } from './pages/Home'
import { Navigate } from './pages/Navigate'
import { Chat } from './pages/Chat'
import { FanZone } from './pages/FanZone'
import { Dashboard } from './pages/Dashboard'
import { initAnalytics, trackPageView } from './utils/analytics'

/** @type {Record<string,string>} */
const PAGE_TITLES = {
  '/': 'Home — StadiumIQ 2026',
  '/navigate': 'Navigate — StadiumIQ 2026',
  '/chat': 'AI Concierge — StadiumIQ 2026',
  '/dashboard': 'Ops Center — StadiumIQ 2026',
  '/fanzone': 'Fan Zone — StadiumIQ 2026',
}

/**
 * Inner component so it can use useLocation
 * (must be inside BrowserRouter).
 */
function InnerApp() {
  const location = useLocation()

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    const title = PAGE_TITLES[location.pathname] || 'StadiumIQ 2026'
    document.title = title
    trackPageView(location.pathname, title)
  }, [location])

  return (
    <Routes>
      <Route element={<FanLayout locationKey={location.key} />}>
        <Route index element={<Home />} />
        <Route path="navigate" element={<Navigate />} />
        <Route path="chat" element={<Chat />} />
        <Route path="fanzone" element={<FanZone />} />
      </Route>
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  )
}

/**
 * Root application component.
 * Wraps tree in BrowserRouter and AppProvider.
 */
export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <InnerApp />
      </AppProvider>
    </BrowserRouter>
  )
}
