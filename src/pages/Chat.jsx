import { useState, useRef, useEffect } from 'react';
import { Send, Globe } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import { QUICK_REPLIES } from '../utils/constants';
import { sendMessage } from '../api/geminiApi';

const SEED_MESSAGES = [
  {
    id: 'seed-1',
    role: 'user',
    content: 'Where can I find wheelchair accessible seating?',
    timestamp: '67:12',
  },
  {
    id: 'seed-2',
    role: 'ai',
    content: `Great question! For MetLife Stadium, accessible seating is available in sections 120-A, 230-B, and the premium level 340-C. All accessible areas have companion seating.\n\nEnter via Gate A or Gate F — both have step-free access and lifts to all levels. Need me to show you the route? 🦽`,
    timestamp: '67:13',
  },
];

export default function Chat() {
  const [messages, setMessages]   = useState(SEED_MESSAGES);
  const [input, setInput]         = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef            = useRef(null);
  const textareaRef               = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage(content, messages);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: response,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Gemini error:', err);
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        role: 'ai',
        content: "I'm having trouble connecting right now. Please try again in a moment! ⚡",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-base flex flex-col">
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col flex-1" style={{ minHeight: 'calc(100vh - 96px)' }}>

        {/* Header Card */}
        <div className="bg-surface1 border border-surface3 rounded-2xl p-4 flex items-center gap-3 mb-4 shadow-card">
          <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center flex-shrink-0">
            <span className="text-gold text-lg">⚡</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-navy">StadiumIQ AI</div>
            <div className="text-xs text-muted">World Cup 2026 · Multilingual Guide</div>
          </div>
          <div className="flex items-center gap-1.5 bg-surface2 border border-surface3 rounded-full px-3 py-1.5 text-xs text-muted">
            <Globe size={12} />
            <span>English</span>
            <span className="text-surface3">▾</span>
          </div>
        </div>

        {/* Language Banner */}
        <div className="bg-gold/10 border border-gold/30 rounded-xl p-3 flex items-start gap-2.5 mb-4">
          <Globe size={14} className="text-gold flex-shrink-0 mt-0.5" />
          <p className="text-xs text-navy leading-relaxed">
            Speak to me in <strong>any language</strong> — Arabic, Español, Português, Français, 日本語, हिंदी, and more. I'll reply in yours.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-surface2 rounded-xl p-3 mb-4">
          <p className="text-xs text-muted leading-relaxed">
            For official FIFA information visit{' '}
            <a href="https://fifa.com" target="_blank" rel="noreferrer" className="text-sky underline">fifa.com</a>.
            {' '}StadiumIQ AI provides general venue and tournament guidance.
          </p>
        </div>

        {/* Messages Area */}
        <div
          className="flex-1 overflow-y-auto bg-surface1 border border-surface3 rounded-2xl p-4 mb-4 space-y-4"
          role="log"
          aria-live="polite"
          aria-label="Chat messages"
          style={{ minHeight: '320px', maxHeight: '480px' }}
        >
          {messages.map(msg => (
            <ChatBubble
              key={msg.id}
              role={msg.role}
              content={msg.content}
              timestamp={msg.timestamp}
            />
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-start gap-2.5 animate-fade-in">
              <div className="w-8 h-8 rounded-xl bg-navy flex items-center justify-center flex-shrink-0">
                <span className="text-gold text-sm">⚡</span>
              </div>
              <div className="bg-surface1 border border-surface3 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-2 h-2 rounded-full bg-muted/40 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Reply Chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-3">
          {QUICK_REPLIES.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleSend(chip)}
              disabled={isLoading}
              className="flex-shrink-0 bg-surface1 border border-surface3 rounded-full px-3.5 py-1.5 text-xs text-navy hover:border-gold hover:text-gold transition-all whitespace-nowrap disabled:opacity-50"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="bg-surface1 border border-surface3 rounded-2xl p-3 flex gap-3 items-end shadow-card">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask in any language — English, Español, Français, 日本語..."
            rows={1}
            disabled={isLoading}
            className="flex-1 resize-none outline-none text-sm text-navy placeholder:text-muted/60 bg-transparent leading-relaxed max-h-32 disabled:opacity-50"
            style={{ minHeight: '24px' }}
            onInput={e => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
            }}
          />
          <button
            id="chat-send-btn"
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 w-9 h-9 bg-navy rounded-xl flex items-center justify-center text-white hover:bg-navy/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
