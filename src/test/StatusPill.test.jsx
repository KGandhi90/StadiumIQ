import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusPill } from '../components/StatusPill'

describe('StatusPill', () => {
  it('renders "Low" for low status', () => {
    render(<StatusPill status="low" />)
    expect(screen.getByText('Low')).toBeInTheDocument()
  })

  it('renders "Moderate" for medium status', () => {
    render(<StatusPill status="medium" />)
    expect(screen.getByText('Moderate')).toBeInTheDocument()
  })

  it('renders "High" for high status', () => {
    render(<StatusPill status="high" />)
    expect(screen.getByText('High')).toBeInTheDocument()
  })

  it('renders "LIVE" for live status', () => {
    render(<StatusPill status="live" />)
    expect(screen.getByText('LIVE')).toBeInTheDocument()
  })

  it('renders "On Duty" for on-duty status', () => {
    render(<StatusPill status="on-duty" />)
    expect(screen.getByText('On Duty')).toBeInTheDocument()
  })

  it('renders "On Break" for break status', () => {
    render(<StatusPill status="break" />)
    expect(screen.getByText('On Break')).toBeInTheDocument()
  })

  it('renders a custom label override over the status', () => {
    render(<StatusPill status="low" label="Clear" />)
    expect(screen.getByText('Clear')).toBeInTheDocument()
  })

  it('renders without crashing for unknown status', () => {
    expect(() =>
      render(<StatusPill status="unknown-xyz" />)
    ).not.toThrow()
  })
})
