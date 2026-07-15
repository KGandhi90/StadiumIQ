// @ts-check

/**
 * Wraps an async function with consistent
 * error handling. Never throws to callers —
 * always returns a safe fallback value.
 * @template T
 * @param {() => Promise<T>} fn - Async fn
 * @param {string} context - For logging
 * @param {T} fallback - Value on error
 * @returns {Promise<T>}
 */
export async function safeAsync(fn, context, fallback) {
  try {
    return await fn()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(
      `[${context}] failed:`,
      /** @type {Error} */ (error).message
    )
    return fallback
  }
}
