import * as Sentry from '@sentry/react'

type ErrorSeverity = 'fatal' | 'error' | 'warning'

/** Structured fields we lift off common non-Error rejection shapes for Sentry `extra`. */
const ERROR_FIELD_KEYS = ['code', 'details', 'hint', 'status', 'statusCode'] as const

export interface NormalizedError {
  /** A real Error with a human-readable message — never "[object Object]". */
  error: Error
  /** Structured fields pulled off the original (e.g. PostgREST code/hint), prefixed `error_*`. */
  fields: Record<string, unknown>
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function safeStringify(value: unknown): string {
  try {
    const json = JSON.stringify(value)
    if (json && json !== '{}' && json !== 'null') return json
  } catch {
    /* circular / non-serialisable — fall through */
  }
  return Object.prototype.toString.call(value)
}

/**
 * Convert an unknown thrown/rejected value into a real Error with a meaningful
 * message, plus any structured fields worth attaching to Sentry.
 *
 * Why this exists: hundreds of services do `if (error) throw error`, throwing the
 * raw Supabase/PostgREST error OBJECT. The old `new Error(String(obj))` rendered
 * these as "[object Object]" in Sentry, destroying triage info — a 401
 * "Invalid API key" surfaced as "[object Object]". This recovers the real
 * message and the code/status/hint fields.
 */
export function normalizeError(error: unknown): NormalizedError {
  if (error instanceof Error) {
    return { error, fields: {} }
  }
  if (typeof error === 'string') {
    return { error: new Error(error), fields: {} }
  }
  if (isRecord(error)) {
    const fields: Record<string, unknown> = {}
    for (const key of ERROR_FIELD_KEYS) {
      if (error[key] !== undefined && error[key] !== null) fields[`error_${key}`] = error[key]
    }
    const rawMessage = error.message
    const message =
      typeof rawMessage === 'string' && rawMessage.trim() !== ''
        ? rawMessage
        : safeStringify(error)
    const err = new Error(message)
    if (typeof error.name === 'string' && error.name) err.name = error.name
    return { error: err, fields }
  }
  // number, boolean, null, undefined, symbol, bigint
  return { error: new Error(String(error)), fields: {} }
}

export function reportError(
  error: unknown,
  context: string,
  extra?: Record<string, unknown>,
  severity?: ErrorSeverity
): void {
  const { error: err, fields } = normalizeError(error)
  console.error(`[${context}]`, error)
  Sentry.captureException(err, {
    level: severity ?? 'error',
    extra: { context, ...fields, ...extra },
  })
}

export function reportMessage(
  message: string,
  context: string,
  extra?: Record<string, unknown>,
  severity?: ErrorSeverity
): void {
  console.error(`[${context}] ${message}`)
  Sentry.captureMessage(message, {
    level: severity ?? 'error',
    extra: { context, ...extra },
  })
}

export function identifyUser(user: { id: string; email?: string; name?: string } | null): void {
  if (user) {
    Sentry.setUser({ id: user.id, email: user.email, username: user.name })
  } else {
    Sentry.setUser(null)
  }
}

export function addBreadcrumb(
  category: string,
  message: string,
  data?: Record<string, unknown>,
  level?: Sentry.SeverityLevel
): void {
  Sentry.addBreadcrumb({ category, message, data, level: level ?? 'info' })
}
