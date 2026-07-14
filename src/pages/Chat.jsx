import { useState, useRef, useEffect } from 'react'
import { Globe, SendHorizontal } from 'lucide-react'
import { ChatBubble } from '../components/ChatBubble'
import { chatSeedMessages, quickReplies } from '../data/mockData'

/**
 * AI Concierge chat page. Multilingual
 * Gemini-powered assistant for World Cup
 * fan navigation and tournament guidance.
 */

export function Chat() {
  const [messages, setMessages] = useState(chatSeedMessages)
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend() {
    const text = inputValue.trim()
    if (!text) return

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: 'user',
        content: text,
        timestamp: new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        lang: 'en',
      },
    ])
    setInputValue('')

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleQuickReply(text) {
    const timestamp = new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: 'user',
        content: text,
        timestamp,
        lang: 'en',
      },
    ])
  }

  function handleInput(e) {
    setInputValue(e.target.value)
    // Auto-grow textarea
    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  return (
    <div className="page-enter flex flex-col min-h-[calc(100vh-8rem)]">
      {/* ── Header Card ─────────────────────── */}
      <div className="bg-surface1 border border-surface3 rounded-2xl p-4 mb-3 shadow-card flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <span className="text-white text-lg">⚡</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-navy">
            StadiumIQ AI
          </p>
          <p className="text-xs text-muted mt-0.5">
            World Cup 2026 · Multilingual Guide
          </p>
        </div>
        <span className="text-xs border border-surface3 rounded-full px-2.5 py-1 text-muted">
          🌐 EN
        </span>
      </div>

      {/* ── Language Banner ──────────────────── */}
      <div className="bg-gold/5 border border-gold/20 rounded-xl px-4 py-3 mb-3 flex gap-2 items-center">
        <Globe
          size={14}
          className="text-gold flex-shrink-0"
          aria-hidden="true"
        />
        <p className="text-xs text-navy leading-relaxed">
          Speak to me in any language — Arabic, Español, Português,
          Français, 日本語, हिंदी, and more. I&apos;ll reply in yours.
        </p>
      </div>

      {/* ── Disclaimer ───────────────────────── */}
      <div className="bg-surface2 rounded-xl px-4 py-2.5 mb-3">
        <p className="text-xs text-muted leading-relaxed">
          For official FIFA information visit{' '}
          <a
            href="https://www.fifa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-navy"
          >
            fifa.com
          </a>
          . StadiumIQ AI provides general venue and tournament
          guidance.
        </p>
      </div>

      {/* ── Messages Area ────────────────────── */}
      <div
        role="log"
        aria-label="Conversation with StadiumIQ AI"
        aria-live="polite"
        aria-relevant="additions"
        className="flex-1 overflow-y-auto no-scrollbar bg-surface1 border border-surface3 rounded-2xl p-4 mb-3 flex flex-col gap-4 min-h-48"
      >
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            role={msg.role}
            content={msg.content}
            timestamp={msg.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Quick Reply Chips ────────────────── */}
      <div
        role="group"
        aria-label="Suggested questions"
        className="flex flex-wrap gap-2 mb-3"
      >
        {quickReplies.map((qr) => (
          <button
            key={qr.id}
            type="button"
            onClick={() => handleQuickReply(qr.text)}
            className={`rounded-xl px-3 py-2 text-xs font-medium transition-all duration-150 border ${
              qr.lang !== 'en'
                ? 'border-gold/30 bg-gold/5 text-navy hover:border-gold hover:bg-gold/10'
                : 'bg-surface1 border-surface3 text-muted hover:border-navy hover:bg-surface2 hover:text-navy'
            }`}
          >
            {qr.text}
          </button>
        ))}
      </div>

      {/* ── Input Bar ───────────────────────── */}
      <div className="bg-surface1 border border-surface3 rounded-2xl p-3 flex gap-3 items-end shadow-card">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          rows={1}
          className="flex-1 bg-transparent outline-none text-sm text-navy placeholder:text-muted resize-none leading-relaxed min-h-[2.5rem] max-h-32"
          placeholder="Ask in any language — English, Español, Français, العربية..."
          aria-label="Message StadiumIQ AI"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-navy/80 transition-colors disabled:opacity-40"
          aria-label="Send message"
        >
          <SendHorizontal
            size={16}
            className="text-white"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  )
}
