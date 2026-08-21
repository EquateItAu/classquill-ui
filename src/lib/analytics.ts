// Thin PostHog wrapper for product analytics.
//
// Mirrors the Sentry `identifyUser` pattern used in AuthContext: call
// `identifyAnalytics()` at the same points you identify the Sentry user, and
// `trackEvent()` at conversion/funnel moments.
//
// Safe to call before or without PostHog being initialised — on white-label
// portal hosts, when `VITE_DISABLE_POSTHOG=true`, or when the key is unset,
// PostHogProvider never inits the SDK, so these helpers no-op instead of
// throwing or logging warnings.
import posthog from 'posthog-js';

type EventProps = Record<string, string | number | boolean | null | undefined>;

function ready(): boolean {
  // posthog-js sets `__loaded = true` once `init()` has run (done by the
  // PostHogProvider in main.tsx / main-landing.tsx).
  return Boolean((posthog as unknown as { __loaded?: boolean }).__loaded);
}

/**
 * Identify the signed-in user to PostHog, or reset on sign-out.
 * Call this beside `identifyUser()` (Sentry) so both stay in sync.
 */
export function identifyAnalytics(
  user: { id: string; email?: string | null; name?: string | null } | null,
): void {
  if (!ready()) return;
  if (user) {
    posthog.identify(user.id, {
      email: user.email ?? undefined,
      name: user.name ?? undefined,
    });
  } else {
    posthog.reset();
  }
}

/** Capture a product-analytics event. No-ops when PostHog isn't initialised. */
export function trackEvent(event: string, props?: EventProps): void {
  if (!ready()) return;
  posthog.capture(event, props);
}
