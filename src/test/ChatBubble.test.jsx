import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ChatBubble from '../components/ChatBubble';

describe('ChatBubble', () => {
  it('renders user message', () => {
    render(<ChatBubble role="user" content="Hello!" />);
    expect(screen.getByText('Hello!')).toBeInTheDocument();
  });

  it('renders AI message with content', () => {
    render(<ChatBubble role="ai" content="Here is the information you need." />);
    expect(screen.getByText('Here is the information you need.')).toBeInTheDocument();
  });

  it('renders AI avatar emoji', () => {
    render(<ChatBubble role="ai" content="Test" />);
    expect(screen.getByText('⚡')).toBeInTheDocument();
  });

  it('renders timestamp when provided', () => {
    render(<ChatBubble role="user" content="Hi" timestamp="18:30" />);
    expect(screen.getByText('18:30')).toBeInTheDocument();
  });
});
