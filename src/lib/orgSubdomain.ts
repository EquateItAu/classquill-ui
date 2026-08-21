/**
 * Tenant root domains: a hostname of the form `<slug>.<root>` maps to org `<slug>`.
 *
 * - `equateit.com.au` — the EquateIt tutoring company root.
 * - `classquill.com`  — the ClassQuill B2B root. `<org>.classquill.com` resolves
 *   here once `*.classquill.com` DNS is pointed at the app.
 *
 * Customer-owned custom domains (e.g. `portal.acme.com`) are NOT resolved here —
 * that needs a hostname→org lookup against `organizations.custom_domain`, which
 * lands in Phase 2. This function only covers subdomains of our own roots.
 */
export const TENANT_ROOT_DOMAINS = ['equateit.com.au', 'classquill.com'] as const

export const RESERVED_SLUGS = new Set([
  'www', 'app', 'api', 'auth', 'admin', 'staging', 'beta',
  'mail', 'support', 'static', 'assets', 'cdn', 'status', 'help',
  'docs',
  // App variants (not orgs)
  'methods',
])

/**
 * If the hostname is `<slug>.<tenant-root>` (e.g. `acme.equateit.com.au` or
 * `acme.classquill.com`), returns the slug. Returns null for a bare root domain,
 * a reserved slug, or any host not under a configured tenant root.
 *
 * Accepts an explicit hostname for testability; defaults to window.location.hostname.
 */
export function getOrgSlugFromHostname(hostname = window.location.hostname): string | null {
  const parts = hostname.split('.')
  for (const root of TENANT_ROOT_DOMAINS) {
    const rootParts = root.split('.')
    // Need at least one label before the root (e.g. `acme.` + root).
    if (parts.length <= rootParts.length) continue
    if (parts.slice(-rootParts.length).join('.') !== root) continue
    const slug = parts[0]
    return RESERVED_SLUGS.has(slug) ? null : slug
  }
  return null
}

/**
 * App hosts — the first-party `app.*` hosts where `/` must land on the APP entry (login),
 * NOT the ClassQuill marketing landing: `app.classquill.com`, `app.equateit.com.au` (and the
 * legacy `app.equateit.com`). The marketing site is served from its own build on the bare roots
 * (`classquill.com`), so within the app build the only hosts that should skip the marketing
 * landing are the `app.` subdomains (native shells are handled separately by `isNative()`).
 *
 * Accepts an explicit hostname for testability; defaults to window.location.hostname.
 */
export function isAppHost(hostname = window.location.hostname): boolean {
  return hostname.split('.')[0] === 'app'
}

/**
 * App hosts are the logged-in app entry (login), never a marketing surface — they must not be
 * indexed, or `app.classquill.com` / `app.equateit.com.au` would duplicate and compete with the
 * marketing site in search. Inject a robots `noindex` meta when on an app host. Host-specific so
 * tenant portals (`<slug>.classquill.com`) and customer custom domains — which MAY want indexing —
 * are left untouched. Idempotent. Uses the REAL hostname (not the `?tenantHost=` dev override).
 * Returns whether a noindex meta is present afterwards (for tests).
 */
export function applyNoindexForAppHost(
  doc: Document = document,
  hostname: string = typeof window !== 'undefined' ? window.location.hostname : '',
): boolean {
  if (!isAppHost(hostname)) return false
  const existing = doc.head.querySelector('meta[name="robots"]')
  if (existing) {
    existing.setAttribute('content', 'noindex, nofollow')
    return true
  }
  const meta = doc.createElement('meta')
  meta.setAttribute('name', 'robots')
  meta.setAttribute('content', 'noindex, nofollow')
  doc.head.appendChild(meta)
  return true
}

/**
 * Unified tenant resolution (white-label Phase 3). Classifies the current host into one of:
 *
 *  - `main`          — the first-party app: a bare tenant root (`equateit.com.au`,
 *                      `classquill.com`), a reserved/variant subdomain (`www.*`, `methods.*`),
 *                      localhost / an IP, or a known deploy-preview host. Renders today's app.
 *  - `subdomain`     — `<slug>.<tenant-root>` for a non-reserved slug → a branded portal whose
 *                      org is known synchronously from the slug.
 *  - `custom_domain` — anything else: a candidate customer-owned domain. The org is NOT known
 *                      from the host alone; the caller resolves it via getOrgByCustomDomain.
 *
 * Accepts an explicit hostname for testability; defaults to the effective hostname (which honours
 * a `?tenantHost=` dev override so the portal paths can be exercised locally without DNS).
 */
export type Tenant =
  | { kind: 'main' }
  | { kind: 'subdomain'; slug: string; host: string }
  | { kind: 'custom_domain'; host: string }

function isUnderTenantRoot(host: string): boolean {
  return TENANT_ROOT_DOMAINS.some((root) => host === root || host.endsWith('.' + root))
}

function isLocalOrPreviewHost(host: string): boolean {
  if (host === 'localhost' || host.endsWith('.localhost')) return true
  if (host === '127.0.0.1' || host === '::1') return true
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return true // bare IPv4
  // Known first-party deploy / preview hosts (Firebase Hosting + Cloudflare Pages).
  if (host.endsWith('.web.app') || host.endsWith('.firebaseapp.com')) return true
  if (host.endsWith('.pages.dev')) return true
  return false
}

export function resolveTenant(hostname: string = getEffectiveHostname()): Tenant {
  const slug = getOrgSlugFromHostname(hostname)
  if (slug) return { kind: 'subdomain', slug, host: hostname }
  // A host under one of our roots that has no slug is a reserved subdomain or the bare root
  // (e.g. `methods.equateit.com.au`, `www.classquill.com`, `equateit.com.au`) → first-party.
  if (isUnderTenantRoot(hostname)) return { kind: 'main' }
  if (isLocalOrPreviewHost(hostname)) return { kind: 'main' }
  // Otherwise it's an external host → a candidate customer custom domain.
  return { kind: 'custom_domain', host: hostname }
}

const TENANT_HOST_OVERRIDE_KEY = 'classquill:tenant_host_override'

/**
 * The hostname tenant resolution should use. Honours a `?tenantHost=<host>` query param (persisted
 * to sessionStorage, mirroring appVariant's `?variant=`) so a developer can drive the subdomain /
 * custom-domain code paths on localhost without real DNS. Falls back to the real hostname.
 */
export function getEffectiveHostname(): string {
  if (typeof window === 'undefined') return ''
  const realHost = window.location.hostname
  // The `?tenantHost=` override is a DEV-ONLY affordance for driving the subdomain /
  // custom-domain code paths on localhost without real DNS. Honouring it on a real host is a
  // cross-tenant XSS vector: `https://victim.classquill.com?tenantHost=portal.attacker.com`
  // would resolve the victim's page to the attacker's org and inject that org's
  // tracking_scripts into the victim's origin. Only trust the override on a dev host.
  const isDev =
    realHost === 'localhost' || realHost === '127.0.0.1' || realHost.endsWith('.localhost')
  if (isDev) {
    try {
      const q = new URLSearchParams(window.location.search).get('tenantHost')
      if (q) {
        sessionStorage.setItem(TENANT_HOST_OVERRIDE_KEY, q)
        return q
      }
      const stored = sessionStorage.getItem(TENANT_HOST_OVERRIDE_KEY)
      if (stored) return stored
    } catch {
      // sessionStorage unavailable (SSR / privacy mode) — fall through to the real hostname.
    }
    return realHost
  }
  // Not a dev host: never honour the override, and clear any value a previous dev session — or
  // an attacker-crafted `?tenantHost=` URL — may have persisted to sessionStorage.
  try {
    sessionStorage.removeItem(TENANT_HOST_OVERRIDE_KEY)
  } catch {
    // sessionStorage unavailable — nothing to clear.
  }
  return realHost
}
