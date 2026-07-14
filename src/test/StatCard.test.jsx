import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatCard from '../components/StatCard';

describe('StatCard', () => {
  it('renders value and label', () => {
    render(<StatCard value="48" label="Teams" />);
    expect(screen.getByText('48')).toBeInTheDocument();
    expect(screen.getByText('Teams')).toBeInTheDocument();
  });

  it('renders dark variant', () => {
    render(<StatCard value="247" label="Volunteers" dark />);
    expect(screen.getByText('247')).toBeInTheDocument();
    expect(screen.getByText('Volunteers')).toBeInTheDocument();
  });

  it('renders numeric value as string', () => {
    render(<StatCard value={79340} label="Fans" />);
    expect(screen.getByText('79340')).toBeInTheDocument();
  });
});
