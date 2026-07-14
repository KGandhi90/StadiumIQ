import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_SYSTEM_PROMPT } from '../utils/constants';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// ── Mock fallback responses (when no API key) ────────────────
const MOCK_RESPONSES = [
  "Welcome to MetLife Stadium! I'm StadiumIQ AI — your FIFA World Cup 2026 guide. How can I help you today? 🏟️",
  "Gates A and F are your best options for accessible entry — both have lifts to all levels and step-free access throughout the stadium. Your accessible seating in Section 120-A is a short walk from Gate A. 🦽",
  "For food, look for markers F1–F5 on your stadium map. The nearest food court to your seat (Section C) is F2 on the east concourse. Vegan and halal options are available at F3. 🍔",
  "Current transport: NJ Transit is on time — next train in 12 minutes from Stadium Stop 2. The Stadium Express bus runs every 8 minutes from Stop 3. Rideshare surge pricing is active (×2.4) — metro is your best bet! 🚇",
  "Brazil are looking dominant tonight! Vinicius Jr. has had 6 shots on goal — the most of any player this match. Argentina's pressing has intensified in the second half. It's a classic! ⚽",
];

let mockIndex = 0;

// ── Gemini client ────────────────────────────────────────────
let genAI = null;
let model = null;

function getModel() {
  if (!API_KEY) return null;
  if (!genAI) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: GEMINI_SYSTEM_PROMPT,
    });
  }
  return model;
}

/**
 * Send a message to Gemini and return the text response.
 * Falls back to mock responses if no API key is configured.
 *
 * @param {string} userMessage
 * @param {Array}  history - Previous messages [{role, content}]
 * @returns {Promise<string>}
 */
export async function sendMessage(userMessage, history = []) {
  const m = getModel();

  // ── Mock mode ────────────────────────────────────────────
  if (!m) {
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    const response = MOCK_RESPONSES[mockIndex % MOCK_RESPONSES.length];
    mockIndex++;
    return response;
  }

  // ── Real Gemini API ──────────────────────────────────────
  // Build chat history (skip seed messages, only real exchanges)
  const chatHistory = history
    .filter(msg => !msg.id?.startsWith('seed-'))
    .map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

  const chat = m.startChat({ history: chatHistory });
  const result = await chat.sendMessage(userMessage);
  return result.response.text();
}
