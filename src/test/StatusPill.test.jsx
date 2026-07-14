import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatusPill from '../components/StatusPill';

describe('StatusPill', () => {
  it('renders with high status', () => {
    render(<StatusPill status="high" />);
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('renders with low status', () => {
    render(<StatusPill status="low" />);
    expect(screen.getByText('Low')).toBeInTheDocument();
  });

  it('renders with moderate status', () => {
    render(<StatusPill status="moderate" />);
    expect(screen.getByText('Moderate')).toBeInTheDocument();
  });

  it('renders custom label', () => {
    render(<StatusPill status="high" label="Critical" />);
    expect(screen.getByText('Critical')).toBeInTheDocument();
  });

  it('renders LIVE status with dot', () => {
    render(<StatusPill status="live" />);
    expect(screen.getByText('LIVE')).toBeInTheDocument();
  });

  it('renders dark variant', () => {
    render(<StatusPill status="high" dark />);
    expect(screen.getByText('High')).toBeInTheDocument();
  });
});
