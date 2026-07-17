// @ts-nocheck
import { useState, useContext, useCallback } from 'react'
import { detectLanguage } from '../utils/helpers'
import { trackEvent } from '../utils/analytics'
import { TYPING_MS } from '../utils/constants'
import { AppContext } from '../context/AppContext'

/**
 * Manages AI Concierge chat state.
 * Routes messages through Gemini AI (via AppContext) with full
 * multi-turn history. Falls back to mock replies if Gemini unavailable.
 *
 * @param {Array<{id:number,role:string,content:string,timestamp:string,lang:string}>} seedMessages
 * @returns {{
 *   messages: Array,
 *   input: string,
 *   isTyping: boolean,
 *   error: string|null,
 *   detectedLang: string,
 *   setInput: Function,
 *   sendMessage: Function,
 *   handleKeyDown: Function
 * }}
 */
export function useChat(seedMessages) {
  const ctx = useContext(AppContext)

  const [messages, setMessages] = useState(() => [...seedMessages])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(
    /** @type {string|null} */ (null)
  )
  const [apiHistory, setApiHistory] = useState(
    /** @type {Array} */ ([])
  )
  const [detectedLang, setDetectedLang] = useState('en')

  /**
   * Sends a message to Gemini AI and appends the reply.
   * Maintains full conversation history for multi-turn context.
   * @param {string} [overrideText] - Pre-filled quick reply text
   * @returns {Promise<void>}
   */
  const sendMessage = useCallback(
    async (overrideText) => {
      const text = (overrideText || input).trim()
      if (!text || isTyping) return

      setError(null)

      const lang = detectLanguage(text)
      setDetectedLang(lang)

      const now = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })

      const userMsg = {
        id: Date.now(),
        role: 'user',
        content: text,
        timestamp: now,
        lang,
      }

      setMessages((prev) => [...prev, userMsg])
      setInput('')
      setIsTyping(true)

      trackEvent(
        'Chat',
        overrideText ? 'QuickReplyUsed' : 'MessageSent'
      )
      trackEvent('Chat', 'LanguageDetected', lang)

      // Brief typing delay for UX — Gemini calls are async anyway
      await new Promise((r) => setTimeout(r, TYPING_MS))

      let replyText = ''
      try {
        // Use Gemini via context (falls back to mock internally)
        replyText =
          (await ctx?.sendConciergeMessage(text, apiHistory)) ?? ''
      } catch (_err) {
        setError('Unable to reach AI — please try again.')
        replyText = ''
      }

      if (replyText) {
        const aiMsg = {
          id: Date.now() + 1,
          role: 'assistant',
          content: replyText,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          lang,
        }

        setMessages((prev) => [...prev, aiMsg])
        setApiHistory((prev) => [
          ...prev,
          { role: 'user', content: text },
          { role: 'assistant', content: replyText },
        ])
      }

      setIsTyping(false)
    },
    [input, isTyping, apiHistory, ctx]
  )

  /**
   * Handles Enter key to send (Shift+Enter = newline).
   * @param {React.KeyboardEvent<HTMLTextAreaElement>} e
   */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        sendMessage()
      }
    },
    [sendMessage]
  )

  return {
    messages,
    input,
    isTyping,
    error,
    detectedLang,
    setInput,
    sendMessage,
    handleKeyDown,
  }
}
