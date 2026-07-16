import { describe, it, expect, vi } from 'vitest'
import { safeAsync } from '../utils/errorHandler'

describe('safeAsync', () => {
  it('returns the function result on success', async () => {
    const result = await safeAsync(
      async () => 'ok',
      'test',
      'fallback'
    )
    expect(result).toBe('ok')
  })

  it('returns the fallback value on error', async () => {
    const result = await safeAsync(
      async () => {
        throw new Error('intentional failure')
      },
      'test',
      'fallback'
    )
    expect(result).toBe('fallback')
  })

  it('returns null fallback on error when fallback is null', async () => {
    const result = await safeAsync(
      async () => {
        throw new Error('x')
      },
      'test',
      null
    )
    expect(result).toBeNull()
  })

  it('never throws regardless of the inner error', async () => {
    await expect(
      safeAsync(
        async () => {
          throw new Error('should not propagate')
        },
        'test',
        null
      )
    ).resolves.not.toThrow()
  })

  it('logs a warning via console.warn on error', async () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    await safeAsync(
      async () => {
        throw new Error('error to warn about')
      },
      'context-label',
      null
    )
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('passes the result through for non-string return values', async () => {
    const obj = { data: 42 }
    const result = await safeAsync(async () => obj, 'test', null)
    expect(result).toEqual(obj)
  })
})
