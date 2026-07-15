// @ts-check

/**
 * @typedef {Object} MockReplyResult
 * @property {string} text - Reply text
 * @property {string} detectedLang - ISO code
 */

/** @type {Array<{keywords: string[], lang: string[], reply: Record<string,string>}>} */
const REPLY_PATTERNS = [
  {
    keywords: ['seat', 'section', 'row', 'asiento', 'place', 'platz'],
    lang: ['es', 'fr', 'de'],
    reply: {
      en:
        'Your seat is in Section C, Row 14, Seat 22. From Gate A, ' +
        'head straight down Concourse 1 and look for the Section C ' +
        'signs. Takes about 4 minutes.',
      es:
        'Tu asiento está en la Sección C, Fila 14, Asiento 22. ' +
        'Desde la Puerta A, sigue por el Pasillo 1 hasta las señales ' +
        'de la Sección C. Son unos 4 minutos.',
      fr:
        'Votre siège est en Section C, Rangée 14, Siège 22. ' +
        "Depuis la Porte A, suivez le Couloir 1 jusqu'aux panneaux " +
        'Section C. Environ 4 minutes à pied.',
    },
  },
  {
    keywords: [
      'food',
      'eat',
      'hungry',
      'snack',
      'comida',
      'manger',
      'nourriture',
      'essen',
      'طعام',
    ],
    lang: ['es', 'fr', 'ar'],
    reply: {
      en:
        'Food Court 2 in the central concourse has the shortest ' +
        'queue right now — about 4 minutes. Hot dogs, tacos, ' +
        'veggie wraps, and more available!',
      es:
        'La Zona de Comida 2 en el pasillo central tiene la cola ' +
        'más corta ahora — unos 4 minutos. ¡Perritos calientes, ' +
        'tacos, wraps vegetarianos y más!',
      fr:
        "La Cafétéria 2 au niveau central a la file d'attente la " +
        'plus courte actuellement — environ 4 minutes.',
      ar: 'منطقة الطعام 2 في الممر المركزي لديها أقصر طابور الآن — حوالي 4 دقائق.',
    },
  },
  {
    keywords: [
      'toilet',
      'restroom',
      'bathroom',
      'wc',
      'baño',
      'banos',
      'toilette',
      'dónde',
      'donde',
    ],
    lang: ['es', 'fr'],
    reply: {
      en:
        'Nearest restrooms are at Block R1 by Gate A (2 min walk) ' +
        'and Block R4 in the lower stand (3 min). Both are currently ' +
        'low wait. 🚻',
      es:
        'Los baños más cercanos están en el Bloque R1 junto a la ' +
        'Puerta A (2 min) y el Bloque R4 en la tribuna baja (3 min). ' +
        'Ambos con espera baja. 🚻',
      fr:
        'Les toilettes les plus proches sont au Bloc R1 près de la ' +
        'Porte A (2 min) et au Bloc R4 (3 min).',
    },
  },
  {
    keywords: [
      'halftime',
      'half time',
      'break',
      'interval',
      'descanso',
      'mi-temps',
    ],
    lang: ['es', 'fr'],
    reply: {
      en:
        'Halftime is at the 45-minute mark — about 22 minutes away. ' +
        "Pro tip: head to Gate A or F for food — they'll be 60% less " +
        'crowded than Gate D. Metro runs every 8 min from Stop 2.',
      es:
        'El descanso es al minuto 45 — en unos 22 minutos. Consejo: ' +
        've a la Puerta A o F para comer — estarán 60% menos ' +
        'concurridas que la Puerta D.',
      fr:
        'La mi-temps est à la 45e minute — dans environ 22 minutes. ' +
        'Conseil: allez à la Porte A ou F pour manger — 60% moins ' +
        'fréquentées que la Porte D.',
    },
  },
  {
    keywords: [
      'transport',
      'train',
      'metro',
      'bus',
      'uber',
      'lyft',
      'taxi',
      'subway',
      'tren',
    ],
    lang: ['es'],
    reply: {
      en:
        'NJ Transit is running on time — next train in 12 min from ' +
        'Stadium Stop 2. Stadium Express Bus is delayed +8 min. ' +
        'Rideshare has surge pricing (x2.4) right now.',
      es:
        'NJ Transit está a tiempo — próximo tren en 12 min desde la ' +
        'Parada 2. El autobús expreso tiene +8 min de retraso. Los ' +
        'VTCs tienen precio dinámico (x2.4) ahora mismo.',
      fr:
        "NJ Transit est à l'heure — prochain train dans 12 min. " +
        'Le bus express a 8 min de retard.',
    },
  },
  {
    keywords: [
      'accessible',
      'wheelchair',
      'disability',
      'lift',
      'elevator',
      'discapacidad',
      'silla de ruedas',
    ],
    lang: ['es'],
    reply: {
      en:
        'Accessible seating is in sections 120-A, 230-B, and 340-C ' +
        '(premium). Enter via Gate A or Gate F — both step-free with ' +
        'lifts to all levels. Need me to show the route? 🦽',
      es:
        'Los asientos accesibles están en las secciones 120-A, 230-B ' +
        'y 340-C. Entra por la Puerta A o la Puerta F — ambas sin ' +
        'escalones con ascensores a todos los niveles. 🦽',
      fr:
        'Les places accessibles sont dans les sections 120-A, 230-B ' +
        'et 340-C. Entrez par la Porte A ou F — toutes deux ' +
        'accessibles avec ascenseurs. 🦽',
    },
  },
  {
    keywords: [
      'lost',
      'lost and found',
      'perdido',
      'perdu',
      'lost bag',
      'lost phone',
      'left behind',
    ],
    lang: ['es', 'fr'],
    reply: {
      en:
        'Lost & Found is at Gate A, staffed throughout the event. ' +
        'You can also ask any volunteer in an orange vest. Describe ' +
        'your item and I can log it for you here. 📋',
      es:
        'Objetos Perdidos está en la Puerta A. También puedes ' +
        'preguntar a cualquier voluntario con chaleco naranja. ' +
        'Descríbeme el objeto y lo anoto. 📋',
      fr:
        'Les objets trouvés sont à la Porte A. Vous pouvez aussi ' +
        "demander à n'importe quel bénévole en gilet orange. " +
        'Décrivez votre objet et je le note. 📋',
    },
  },
  {
    keywords: [
      'sustainability',
      'green',
      'environment',
      'carbon',
      'eco',
      'planet',
    ],
    lang: [],
    reply: {
      en:
        'MetLife Stadium runs on 100% renewable energy for WC 2026! ' +
        '68% of fans today arrived by public transport — a new FIFA ' +
        'record. The Green Goals 2026 target is 50% carbon reduction ' +
        "vs 2018. You're part of it! 🌱",
    },
  },
  {
    keywords: [
      'schedule',
      'fixture',
      'match',
      'game',
      'horario',
      'calendario',
    ],
    lang: ['es'],
    reply: {
      en:
        "Current match: Brazil vs Argentina, Group C, 67' — MetLife " +
        'Stadium. Next at this venue: France vs Germany (Jun 20). ' +
        'Full schedule at fifa.com/wc2026.',
      es:
        "Partido actual: Brasil vs Argentina, Grupo C, 67' — MetLife " +
        'Stadium. Próximo partido aquí: Francia vs Alemania (20 Jun). ' +
        'Calendario completo en fifa.com.',
    },
  },
]

/** @type {Record<string,string>} */
const DEFAULT_REPLIES = {
  en:
    "I'm your World Cup companion! Ask me about your seat, food, " +
    'transport, accessibility, lost items, or anything about MetLife ' +
    'Stadium and WC 2026. You can ask in any language! ⚽',
  es:
    '¡Soy tu compañero del Mundial! Pregúntame sobre tu asiento, ' +
    'comida, transporte, accesibilidad o cualquier cosa sobre el ' +
    'MetLife Stadium. ⚽',
  fr:
    'Je suis votre compagnon de la Coupe du Monde! Posez-moi des ' +
    'questions sur votre siège, la nourriture, le transport ou ' +
    "l'accessibilité. ⚽",
  ar: 'أنا رفيقك في كأس العالم! اسألني عن مقعدك أو الطعام أو المواصلات أو إمكانية الوصول. ⚽',
  pt: 'Sou seu companheiro da Copa do Mundo! Pergunte sobre seu assento, comida, transporte ou acessibilidade. ⚽',
}

/**
 * Simple language detection based on
 * character sets and common words.
 * @param {string} text - Input text
 * @returns {string} ISO 639-1 language code
 */
export function detectLanguage(text) {
  const t = text.toLowerCase()
  if (/[\u0600-\u06FF]/.test(text)) return 'ar'
  if (/[\u3040-\u30FF\u4E00-\u9FAF]/.test(text)) return 'ja'
  if (/\b(ção|não|obrigado|onde|estão|banh)\b/.test(t)) return 'pt'
  if (
    /\b(dónde|donde|baños|comida|asiento|gracias|cómo|están|puerta)\b/.test(
      t
    )
  )
    return 'es'
  if (
    /\b(où|toilette|manger|merci|bonjour|siège|porte|comment)\b/.test(
      t
    )
  )
    return 'fr'
  if (/\b(wo|essen|danke|bitte|eingang|hilfe)\b/.test(t)) return 'de'
  return 'en'
}

/**
 * Returns keyword-matched mock AI response
 * in the detected language.
 * Used as fallback when Gemini is unavailable.
 * @param {string} input - User message
 * @returns {MockReplyResult}
 */
export function getMockReply(input) {
  const msg = input.toLowerCase()
  const lang = detectLanguage(input)
  const matched = REPLY_PATTERNS.find((p) =>
    p.keywords.some((k) => msg.includes(k))
  )

  if (!matched) {
    return {
      text: DEFAULT_REPLIES[lang] || DEFAULT_REPLIES.en,
      detectedLang: lang,
    }
  }

  return {
    text:
      matched.reply[lang] || matched.reply.en || DEFAULT_REPLIES.en,
    detectedLang: lang,
  }
}

/**
 * Returns formatted match time string.
 * @param {number} minute - Match minute
 * @returns {string}
 */
export function formatMatchTime(minute) {
  if (minute >= 90) return "90+'"
  return `${minute}'`
}

/**
 * Returns crowd level from gate wait minutes.
 * @param {number} waitMin - Wait in minutes
 * @returns {'low'|'medium'|'high'}
 */
export function getCrowdLevel(waitMin) {
  if (waitMin <= 3) return 'low'
  if (waitMin <= 7) return 'medium'
  return 'high'
}

/**
 * Clamps a number within min/max bounds.
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val))
}
