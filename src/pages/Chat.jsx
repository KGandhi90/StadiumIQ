import { useRef, useEffect, useCallback } from 'react'
import { Globe, SendHorizontal } from 'lucide-react'
import { ChatBubble } from '../components/ChatBubble'
import { useAppContext } from '../context/AppContext'
import { useChat } from '../hooks/useChat'

/** @type {Record<string,string>} */
const LANG_NAMES = {
  es: 'Español',
  fr: 'Français',
  ar: 'العربية',
  pt: 'Português',
  ja: '日本語',
  de: 'Deutsch',
}

/** @type {Record<string,string>} */
const LANG_FLAGS = {
  es: 'ES',
  fr: 'FR',
  ar: 'AR',
  pt: 'PT',
  ja: 'JA',
  de: 'DE',
}

export function Chat() {
  const ctx = useAppContext()
  const {
    messages,
    input,
    isTyping,
    detectedLang,
    setInput,
    sendMessage,
    handleKeyDown,
  } = useChat(ctx.chatSeedMessages)
  const messagesEndRef = useRef(
    /** @type {HTMLDivElement|null} */ (null)
  )
  const textareaRef = useRef(
    /** @type {HTMLTextAreaElement|null} */ (null)
  )

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleInput = useCallback(
    (/** @type {React.ChangeEvent<HTMLTextAreaElement>} */ e) => {
      setInput(e.target.value)
      e.target.style.height = 'auto'
      e.target.style.height = `${e.target.scrollHeight}px`
    },
    [setInput]
  )

  const handleSendClick = useCallback(
    () => sendMessage(),
    [sendMessage]
  )

  /** @param {React.MouseEvent<HTMLButtonElement>} e */
  const handleQuickReply = useCallback(
    (e) => {
      const text = e.currentTarget.dataset.text || ''
      sendMessage(text)
    },
    [sendMessage]
  )

  /** @param {React.KeyboardEvent<HTMLButtonElement>} e */
  const handleChipKey = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        const text = e.currentTarget.dataset.text || ''
        sendMessage(text)
      }
    },
    [sendMessage]
  )

  return (
    <div className="page-enter flex flex-col min-h-[calc(100vh-8rem)]">
      {/* Header */}
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
          🌐 {LANG_FLAGS[detectedLang] || 'EN'}
        </span>
      </div>

      {/* Language banner */}
      <div className="bg-gold/5 border border-gold/20 rounded-xl px-4 py-3 mb-3 flex gap-2 items-center">
        <Globe
          size={14}
          className="text-gold flex-shrink-0"
          aria-hidden="true"
        />
        <p className="text-xs text-navy leading-relaxed">
          Speak to me in any language — Arabic, Español, Português,
          Français, 日本語, हिंदी, and more.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-surface2 rounded-xl px-4 py-2.5 mb-3">
        <p className="text-xs text-muted">
          For official FIFA information visit{' '}
          <a
            href="https://www.fifa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-navy"
          >
            fifa.com
          </a>
          . StadiumIQ AI provides general guidance.
        </p>
      </div>

      {/* Messages */}
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
        {isTyping && (
          <div
            role="status"
            aria-label="StadiumIQ AI is typing"
            className="flex items-start gap-2.5"
          >
            <div
              className="w-8 h-8 rounded-xl bg-navy flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <span className="text-white text-sm">⚡</span>
            </div>
            <div className="bg-surface1 border border-surface3 rounded-2xl rounded-bl-none px-4 py-3 flex gap-1 items-center shadow-card">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-muted animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                  aria-hidden="true"
                />
              ))}
              {detectedLang !== 'en' && (
                <span className="ml-2 text-xs text-muted bg-surface2 rounded-full px-2 py-0.5">
                  Replying in {LANG_NAMES[detectedLang]}
                </span>
              )}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div
        role="group"
        aria-label="Suggested questions"
        className={`flex flex-wrap gap-2 mb-3 transition-opacity duration-300 ${messages.length > 2 ? 'opacity-0 pointer-events-none h-0 overflow-hidden' : ''}`}
      >
        {ctx.quickReplies.map((qr) => (
          <button
            key={qr.id}
            type="button"
            data-text={qr.text}
            onClick={handleQuickReply}
            onKeyDown={handleChipKey}
            className={`rounded-xl px-3 py-2 text-xs font-medium transition-all border ${
              qr.lang !== 'en'
                ? 'border-gold/30 bg-gold/5 text-navy hover:border-gold hover:bg-gold/10'
                : 'bg-surface1 border-surface3 text-muted hover:border-navy hover:bg-surface2 hover:text-navy'
            }`}
          >
            {qr.text}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="bg-surface1 border border-surface3 rounded-2xl p-3 flex gap-3 items-end shadow-card">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          rows={1}
          className="flex-1 bg-transparent outline-none text-sm text-navy placeholder:text-muted resize-none leading-relaxed min-h-[2.5rem] max-h-32"
          placeholder="Ask in any language — English, Español, Français, العربية..."
          aria-label="Message StadiumIQ AI"
        />
        <button
          type="button"
          onClick={handleSendClick}
          disabled={!input.trim() || isTyping}
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
