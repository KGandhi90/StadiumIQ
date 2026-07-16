import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatCard } from '../components/StatCard'

describe('StatCard', () => {
  it('renders the value', () => {
    render(<StatCard value="79,340" label="Fans Checked In" />)
    expect(screen.getByText('79,340')).toBeInTheDocument()
  })

  it('renders the label', () => {
    render(<StatCard value="79,340" label="Fans Checked In" />)
    expect(screen.getByText('Fans Checked In')).toBeInTheDocument()
  })

  it('renders in dark mode without crashing', () => {
    expect(() =>
      render(<StatCard value="12" label="Alerts" dark />)
    ).not.toThrow()
  })

  it('renders with a custom color prop', () => {
    expect(() =>
      render(
        <StatCard value="247" label="Volunteers" color="green" />
      )
    ).not.toThrow()
  })

  it('renders with ops-gold color', () => {
    expect(() =>
      render(
        <StatCard
          value="5 min"
          label="Avg Wait"
          color="ops-gold"
          dark
        />
      )
    ).not.toThrow()
  })
})
