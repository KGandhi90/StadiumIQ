import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar'

/**
 * Shared layout for fan-facing pages.
 * Provides skip-link, Navbar, and main content wrapper.
 * locationKey triggers page-enter animation on every navigation.
 * @param {object} props
 * @param {string} props.locationKey - React Router location key
 */
export function FanLayout({ locationKey }) {
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
        <Outlet key={locationKey} />
      </main>
    </>
  )
}

FanLayout.propTypes = {
  locationKey: PropTypes.string.isRequired,
}
