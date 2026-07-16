// @ts-check
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getMockReply } from '../utils/helpers'
import { safeAsync } from '../utils/errorHandler'

// ─── SYSTEM PROMPTS ───────────────────────────────────────────────────────────

/** @type {string} */
const CONCIERGE_SYSTEM_PROMPT = `
You are StadiumIQ AI — the official multilingual AI guide for FIFA World Cup 2026.

CRITICAL RULE: Detect the language the user is writing in and ALWAYS respond in that SAME language.
If they write in Spanish, respond in Spanish. Arabic → Arabic. French → French. English → English.
This is your most important instruction.

YOUR EXPERTISE:
  VENUE: MetLife Stadium, East Rutherford, NJ
    Capacity: 82,500 | Sections A–H
    Gates: A (north/accessible), B (northeast), C (east), D (southeast/busiest),
           E (south), F (west/accessible)
    YOUR SEAT: Section C, Row 14, Seat 22
    Accessible entrances: Gates A and F — step-free, lifts to all levels
    First Aid: Sections B-12 and D-8
    Lost & Found: Gate A, staffed 24/7

  CURRENT MATCH:
    Brazil vs Argentina — Group C, Matchday 2
    Venue: MetLife Stadium
    Status: LIVE — 67th minute
    Score: Brazil 2 – 1 Argentina

  TRANSPORT:
    NJ Transit: Running on time, departs every 8 min from Stadium Stop 2
    Bus: Stadium Express — check app for times
    Rideshare: Surge pricing likely during match end and halftime

  TOURNAMENT:
    48 teams, 104 matches, 16 host cities
    USA, Canada, Mexico — June 11–July 19 2026
    Defending champion: Argentina

  FOOD & DRINK:
    6 Food Courts (F1–F6)
    F2 (central) and F4 (upper) have shortest queues
    Vegan, halal, and kosher options at F2 and F6

  SUSTAINABILITY:
    MetLife runs on 100% renewable energy
    68% of fans arriving by public transport
    FIFA Green Goals 2026: 50% carbon reduction

YOUR STYLE:
  - Always reply in the user's language
  - Concise — under 80 words per response
  - Warm and helpful — like a knowledgeable local friend
  - Give specific, actionable answers
  - Use relevant emojis sparingly (1–2 max)
  - If asked something outside WC 2026 scope, warmly redirect to venue/match topics
  - Never say "As an AI" — just be StadiumIQ AI
`

/** @type {string} */
const COMMENTARY_SYSTEM_PROMPT = `
You are an expert football/soccer commentator covering Brazil vs Argentina at the FIFA World Cup 2026 at MetLife Stadium, NJ.

Current score: Brazil 2 – 1 Argentina. Match status: LIVE.

Generate ONE short, vivid commentary line (max 25 words) describing a fictional but plausible match moment.
Be specific — mention player positions, tactical observations, or crowd atmosphere.
Vary your focus: attacks, defending, midfield battles, set pieces, atmosphere, substitutions.

Return ONLY the commentary text. No quotes, no labels, no explanation.
`

/** @type {string} */
const OPS_INSIGHT_PROMPT = `
You are an AI operations advisor for MetLife Stadium during FIFA World Cup 2026.

Current data:
  Match: Brazil 2-1 Argentina, 67th minute
  Gate D: 11 min wait (HIGH)
  Gate B: 9 min wait (HIGH)
  Gate A: 2 min wait (LOW)
  Gate F: 2 min wait (LOW)
  Active volunteers: 247
  Checked in: 79,340 of 82,500

Generate ONE specific operational recommendation for stadium staff.
Be concrete: mention specific gates, volunteer counts, or timing.
Max 40 words. Return only the recommendation.
`

// ─── MODEL FACTORY ────────────────────────────────────────────────────────────

/**
 * Creates a Gemini model instance with the given system prompt.
 * Returns null if API key is not configured.
 * @param {string} systemPrompt - System instruction
 * @returns {import('@google/generative-ai').GenerativeModel | null}
 */
function getModel(systemPrompt) {
  const key = import.meta.env.VITE_GEMINI_API_KEY
  if (!key) return null
  const genAI = new GoogleGenerativeAI(key)
  return genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: systemPrompt,
    generationConfig: { maxOutputTokens: 200, temperature: 0.8 },
  })
}

// ─── PUBLIC API ───────────────────────────────────────────────────────────────

/**
 * Sends a message to the multilingual AI Concierge.
 * Maintains multi-turn conversation history for context.
 * Detects user language and responds in kind.
 * Falls back to getMockReply if Gemini is unavailable.
 *
 * @param {string} message - User's message
 * @param {Array<{role:string, content:string}>} history - Previous messages
 * @returns {Promise<string>} AI reply text
 */
export async function sendConciergeMessage(message, history = []) {
  const model = getModel(CONCIERGE_SYSTEM_PROMPT)
  if (!model) {
    const { text } = getMockReply(message)
    return text
  }

  return safeAsync(
    async () => {
      const chat = model.startChat({
        history: history.map((msg) => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        })),
      })
      const result = await chat.sendMessage(message)
      return result.response.text()
    },
    'sendConciergeMessage',
    getMockReply(message).text
  )
}

/**
 * Generates a single live match commentary line using Gemini.
 * Falls back to a curated fallback pool if Gemini is unavailable.
 * @returns {Promise<string>} Commentary text (max 25 words)
 */
export async function generateCommentary() {
  const model = getModel(COMMENTARY_SYSTEM_PROMPT)
  if (!model) {
    const FALLBACKS = [
      'Brazil building patiently through midfield — 79,000 fans anticipating the next move.',
      'Argentina pressing high, De Paul winning duels in the engine room.',
      'The atmosphere at MetLife is electric as Brazil break quickly on the counter.',
      'Rodrigo edges inside from the right — defenders scrambling to cover.',
      "Argentina's keeper sweeps up a dangerous cross as the crowd holds its breath.",
    ]
    return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)]
  }

  return safeAsync(
    async () => {
      const result = await model.generateContent(
        'Generate one commentary line now.'
      )
      return result.response.text().trim()
    },
    'generateCommentary',
    'An intense battle continues at MetLife Stadium as both teams push for the decisive goal.'
  )
}

/**
 * Generates an AI operational insight for the ops dashboard.
 * Falls back to static insight if Gemini is unavailable.
 * @returns {Promise<string>} Operational recommendation text
 */
export async function generateOpsInsight() {
  const model = getModel(OPS_INSIGHT_PROMPT)
  if (!model) {
    return 'Crowd modeling suggests 40% of fans in Section G will exit via Gate D at full time. Deploy 4 stewards to Gate D by the 74th minute.'
  }

  return safeAsync(
    async () => {
      const result = await model.generateContent(
        'Provide one operational recommendation.'
      )
      return result.response.text().trim()
    },
    'generateOpsInsight',
    'Redirect incoming crowd to Gate A — estimated wait reduction: 3.2 minutes.'
  )
}
