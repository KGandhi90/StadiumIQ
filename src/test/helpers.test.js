import { describe, it, expect } from 'vitest'
import {
  detectLanguage,
  getMockReply,
  formatMatchTime,
  getCrowdLevel,
  clamp,
} from '../utils/helpers'

describe('detectLanguage', () => {
  it('detects English as default', () => {
    expect(detectLanguage('where is my seat')).toBe('en')
  })
  it('detects Spanish', () => {
    expect(detectLanguage('¿dónde están los baños?')).toBe('es')
  })
  it('detects Arabic script', () => {
    expect(detectLanguage('مرحبا كيف حالك')).toBe('ar')
  })
  it('detects French', () => {
    expect(detectLanguage('où sont les toilettes')).toBe('fr')
  })
  it('detects Portuguese', () => {
    expect(detectLanguage('onde fica o banheiro')).toBe('pt')
  })
  it('always returns a string for any input', () => {
    ;['', 'hello', '日本語', 'Português'].forEach((t) => {
      expect(typeof detectLanguage(t)).toBe('string')
    })
  })
})

describe('getMockReply', () => {
  it('returns an object with text and detectedLang', () => {
    const res = getMockReply('where is my seat')
    expect(res).toHaveProperty('text')
    expect(res).toHaveProperty('detectedLang')
  })
  it('returns Spanish for Spanish input', () => {
    const res = getMockReply('¿dónde están los baños?')
    expect(res.detectedLang).toBe('es')
    expect(res.text.length).toBeGreaterThan(0)
  })
  it('returns a non-empty reply for unknown input', () => {
    const res = getMockReply('xyzabc123unknown')
    expect(res.text.length).toBeGreaterThan(10)
  })
  it('handles empty string without throwing', () => {
    const res = getMockReply('')
    expect(typeof res.text).toBe('string')
  })
  it('detectedLang is always a string', () => {
    expect(typeof getMockReply('test').detectedLang).toBe('string')
  })
})

describe('formatMatchTime', () => {
  it('formats normal minutes with an apostrophe', () => {
    expect(formatMatchTime(67)).toBe("67'")
  })
  it('shows 90+ for stoppage time at 90', () => {
    expect(formatMatchTime(90)).toBe("90+'")
  })
  it('shows 90+ for minutes beyond 90', () => {
    expect(formatMatchTime(95)).toBe("90+'")
  })
  it('formats first minute correctly', () => {
    expect(formatMatchTime(1)).toBe("1'")
  })
  it('formats 45 (half time) correctly', () => {
    expect(formatMatchTime(45)).toBe("45'")
  })
})

describe('getCrowdLevel', () => {
  it('returns low for waits at or below lowMax', () => {
    expect(getCrowdLevel(1, 3, 7)).toBe('low')
    expect(getCrowdLevel(3, 3, 7)).toBe('low')
  })
  it('returns medium for waits between thresholds', () => {
    expect(getCrowdLevel(5, 3, 7)).toBe('medium')
    expect(getCrowdLevel(7, 3, 7)).toBe('medium')
  })
  it('returns high for waits above medMax', () => {
    expect(getCrowdLevel(9, 3, 7)).toBe('high')
    expect(getCrowdLevel(15, 3, 7)).toBe('high')
  })
  it('uses default thresholds when args omitted', () => {
    expect(getCrowdLevel(2)).toBe('low')
    expect(getCrowdLevel(5)).toBe('medium')
    expect(getCrowdLevel(10)).toBe('high')
  })
})

describe('clamp', () => {
  it('clamps values below min to min', () => {
    expect(clamp(-5, 0, 100)).toBe(0)
  })
  it('clamps values above max to max', () => {
    expect(clamp(150, 0, 100)).toBe(100)
  })
  it('returns value unchanged when within range', () => {
    expect(clamp(50, 0, 100)).toBe(50)
  })
  it('returns min when value equals min', () => {
    expect(clamp(0, 0, 100)).toBe(0)
  })
  it('handles equal min and max', () => {
    expect(clamp(5, 3, 3)).toBe(3)
  })
})
