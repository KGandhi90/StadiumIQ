// @ts-check
import { useState, useCallback } from 'react'
import { getMockReply, detectLanguage } from '../utils/helpers'
import { trackEvent } from '../utils/analytics'
import { TYPING_MS } from '../utils/constants'

/**
 * Manages AI Concierge chat state.
 * Uses multilingual mock replies — replaced
 * with real Gemini in Phase 3.
 * @param {Array<{id:number,role:string,content:string,timestamp:string,lang:string}>} seedMessages
 * @returns {{
 *   messages: Array,
 *   input: string,
 *   isTyping: boolean,
 *   error: string|null,
 *   detectedLang: string,
 *   apiHistory: Array,
 *   setInput: (v: string) => void,
 *   sendMessage: (override?: string) => Promise<void>,
 *   handleKeyDown: (e: any) => void
 * }}
 */
export function useChat(seedMessages) {
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
   * Sends a message and triggers a multilingual mock AI reply.
   * Detects language from user input and responds in kind.
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

      setApiHistory((prev) => [
        ...prev,
        { role: 'user', content: text },
      ])

      await new Promise((r) => setTimeout(r, TYPING_MS))

      const { text: replyText } = getMockReply(text)

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
        { role: 'model', content: replyText },
      ])
      setIsTyping(false)
    },
    [input, isTyping]
  )

  /**
   * Handles Enter key to send without Shift.
   * Shift+Enter inserts a newline.
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
    apiHistory,
    setInput,
    sendMessage,
    handleKeyDown,
  }
}
