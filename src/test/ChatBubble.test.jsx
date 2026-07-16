import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChatBubble } from '../components/ChatBubble'

describe('ChatBubble', () => {
  it('renders user message content', () => {
    render(
      <ChatBubble
        role="user"
        content="Where is Gate A?"
        timestamp="18:00"
      />
    )
    expect(screen.getByText('Where is Gate A?')).toBeInTheDocument()
  })

  it('renders assistant message content', () => {
    render(
      <ChatBubble
        role="assistant"
        content="Gate A is on the north side."
        timestamp="18:01"
      />
    )
    expect(
      screen.getByText('Gate A is on the north side.')
    ).toBeInTheDocument()
  })

  it('renders the timestamp', () => {
    render(<ChatBubble role="user" content="Hi" timestamp="18:24" />)
    expect(screen.getByText('18:24')).toBeInTheDocument()
  })

  it('renders AI avatar emoji for assistant', () => {
    render(
      <ChatBubble
        role="assistant"
        content="Hello"
        timestamp="18:00"
      />
    )
    expect(screen.getByText('⚡')).toBeInTheDocument()
  })

  it('has aria-label containing "your message" for user bubble', () => {
    render(
      <ChatBubble role="user" content="test" timestamp="18:00" />
    )
    expect(
      screen.getByRole('article', { name: /your message/i })
    ).toBeInTheDocument()
  })

  it('has aria-label containing "matchmate ai response" for assistant bubble', () => {
    render(
      <ChatBubble role="assistant" content="test" timestamp="18:00" />
    )
    expect(
      screen.getByRole('article', {
        name: /matchmate ai response|stadiumiq ai/i,
      })
    ).toBeInTheDocument()
  })

  it('renders without crashing for either role', () => {
    expect(() =>
      render(
        <ChatBubble role="user" content="test" timestamp="00:00" />
      )
    ).not.toThrow()
    expect(() =>
      render(
        <ChatBubble
          role="assistant"
          content="test"
          timestamp="00:00"
        />
      )
    ).not.toThrow()
  })
})
