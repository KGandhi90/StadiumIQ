import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar'

/**
 * Shared layout for fan-facing pages.
 * Provides skip-link, Navbar, and main content wrapper.
 */
export function FanLayout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main
        id="main-content"
        className="max-w-2xl mx-auto w-full px-4 sm:px-6 pt-20 pb-24"
      >
        <Outlet />
      </main>
    </>
  )
}
