// EU/EEA/UK cookie-consent gating — shared orchestration consumed both by the
// inline bootstrap <script type="module"> in index.html (the authenticated app
// shell, which loads Clarity + ELU) and by CookieConsentBanner.tsx (the
// marketing landing, which additionally gates the landing PostHog project via
// scheduleLandingPostHogInit). Mirrors equateit-site's Base.astro bootstrap +
// CookieConsent.astro, just `cq_` prefixed and framework-ported to React/TS.
//
// Everyone outside EU/EEA/UK keeps today's unconditional behaviour — this
// module only ever adds a gate, never removes tracking that already ran.

/** Set by frontend/functions/api/geo.js; read directly on a cache hit. */
export const EU_COOKIE_NAME = 'cq_eu_visitor'
/** localStorage key for the visitor's accept/reject decision. */
export const CONSENT_STORAGE_KEY = 'cq_cookie_consent'
/** Dispatched on `window` the moment a decision is recorded. */
export const CONSENT_EVENT = 'cq:consent-changed'

export type ConsentDecision = 'granted' | 'denied'

declare global {
  interface Window {
    __cqLoadClarity?: () => void
    __cqLoadElu?: () => void
  }
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

/**
 * Resolve whether this visitor is in an EU/EEA/UK GDPR-gated jurisdiction.
 * Reads the `cq_eu_visitor` cookie first (set by a previous call to
 * /api/geo); on a cache miss, calls the endpoint and lets it set the cookie
 * for next time.
 *
 * On any fetch failure this FAILS CLOSED (returns `true`) — the cautious
 * default, matching equateit-site's Base.astro: never silently skip consent
 * for a visitor we couldn't classify.
 *
 * Note: in local Vite dev there is no Cloudflare Pages Functions runtime, so
 * /api/geo 404s and this always fails closed — the banner will always show in
 * local dev. That mirrors the reference implementation's own tradeoff and is
 * not something to "fix" here; it only matters on a real Pages deploy.
 */
export async function resolveEuGated(): Promise<boolean> {
  const cached = readCookie(EU_COOKIE_NAME)
  if (cached === '1') return true
  if (cached === '0') return false

  try {
    const res = await fetch('/api/geo', { credentials: 'same-origin' })
    const data = (await res.json()) as { euGated?: boolean }
    return Boolean(data.euGated)
  } catch {
    return true
  }
}

export function getStoredConsent(): ConsentDecision | null {
  try {
    const v = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

export function setStoredConsent(value: ConsentDecision): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value)
  } catch {
    // Ignore — worst case the banner reappears next visit, not a functional break.
  }
  try {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: { decision: value } }))
  } catch {
    // CustomEvent unavailable (shouldn't happen in a browser) — nothing else to do.
  }
}

/** Loads whichever gated scripts exist on this shell — both are optional no-ops elsewhere. */
export function loadGatedScripts(): void {
  window.__cqLoadClarity?.()
  window.__cqLoadElu?.()
}
