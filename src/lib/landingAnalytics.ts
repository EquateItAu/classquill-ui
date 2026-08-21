// PostHog for the MARKETING landing (classquill.com) — a separate PostHog
// project (classquill-landing) from the app SPA, which keeps using
// VITE_PUBLIC_POSTHOG_KEY. Never share keys across surfaces.
//
// Design constraints (docs/analytics-landing.md):
// - persistence 'localStorage' — first-party storage only, identity survives
//   full page loads (the landing is prerendered static HTML, so cross-page nav
//   is a full load).
// - No session replay on the marketing surface.
// - Init is deferred to window load + idle so it never competes with first
//   paint or hydration of the prerendered page.
// - Consent: for EU/EEA/UK visitors, init is gated behind explicit accept via
//   CookieConsentBanner.tsx (see src/lib/gdprConsent.ts) — scheduleLandingPostHogInit
//   is called from the banner's mount effect (not-gated / already-granted) or its
//   Accept handler, never unconditionally at module load. For every other visitor
//   (the large majority of traffic) init still fires unconditionally, unchanged.
// - navigator.webdriver guard: the Playwright prerender (build:landing) loads
//   every route headlessly on every build — without this guard each deploy
//   would pollute the data with fake pageviews. scripts/prerender-landing.ts
//   additionally FAILS THE BUILD if any posthog request escapes.
// - The landing scrolls an inner container, not the window, so PostHog's
//   built-in scroll depth needs scroll_root_selector — every landing page's
//   scroll container carries the `ph-scroll-root` class.
import posthog from "posthog-js";

const KEY = import.meta.env.VITE_POSTHOG_KEY_LANDING as string | undefined;

export { posthog };

/** All CTA identifiers — keep in sync with docs/analytics-landing.md. */
export type LandingCtaId =
  | "hero_demo"
  | "hero_trial"
  | "nav_demo"
  | "nav_trial"
  | "nav_login"
  | "pricing_trial"
  | "pricing_demo"
  | "pricing_addon_demo"
  | "pricing_page_trial"
  | "pricing_page_demo"
  | "cta_demo"
  | "cta_trial"
  | "footer_demo"
  | "about_demo"
  | "about_trial"
  | "compare_demo"
  | "compare_trial"
  | "compare_hub_demo"
  | "compare_hub_trial"
  | "changelog_demo"
  | "changelog_trial"
  | "features_hub_demo"
  | "features_hub_trial"
  | "feature_page_demo"
  | "feature_page_trial"
  | "segment_demo"
  | "segment_trial"
  | "segments_hub_demo"
  | "segments_hub_trial"
  | "vertical_demo"
  | "vertical_trial"
  | "verticals_hub_demo"
  | "verticals_hub_trial"
  // /solutions — the hub above both families (the Solutions ▾ nav destination).
  | "solutions_hub_demo"
  | "solutions_hub_trial"
  | "switch_page_demo"
  | "switch_page_trial"
  | "integration_demo"
  | "integration_trial"
  | "au_category_demo"
  | "au_category_trial"
  // FaqPage has passed location="faq_page" since it was written, but neither id
  // was ever declared — so its two CTAs emitted undeclared event names. Found
  // by the CtaLocation guard below the moment it was given real teeth.
  | "faq_page_demo"
  | "faq_page_trial"
  | "offer_trial"
  | "offer_demo"
  // Hero "What you get" tab clicks — one id per tab, derived from the label.
  | `hero_tab_${string}`;

/**
 * The hand-written ids only. `hero_tab_${string}` MUST be excluded before any
 * stem inference: matching an open template literal against `${infer Stem}_x`
 * infers `Stem = string`, which widens the derived union to plain `string` and
 * silently turns the guard below into a no-op that accepts anything.
 */
type ExplicitCtaId = Exclude<LandingCtaId, `hero_tab_${string}`>;

/** Every explicit LandingCtaId ending in `_<suffix>`, reduced to its stem. */
type StemsWith<S extends string> = ExplicitCtaId extends infer T
  ? T extends `${infer Stem}_${S}`
    ? Stem
    : never
  : never;

/**
 * The stems `FinalCTA` accepts — exactly those with BOTH a `_trial` and a
 * `_demo` id above, computed rather than hand-listed.
 *
 * FinalCTA builds two ids from one stem, so a stem missing either half emits an
 * event name that does not exist. `location` used to be a plain `string` cast
 * to LandingCtaId inside the component, so nothing checked the ids were real —
 * which is how the FAQ page shipped emitting `faq_page_trial`/`faq_page_demo`
 * with neither declared here.
 */
export type CtaLocation = StemsWith<"trial"> & StemsWith<"demo">;

export function initLandingPostHog(): void {
  // No key (local dev default, forks) → analytics stays off silently.
  if (!KEY) return;
  // Headless automation (the Playwright prerender, e2e) must never report.
  if (typeof navigator !== "undefined" && navigator.webdriver) return;
  if (posthog.__loaded) return;
  posthog.init(KEY, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
    defaults: "2025-05-24", // history_change pageviews + pageleave w/ max scroll
    persistence: "localStorage",
    capture_exceptions: true,
    disable_session_recording: true,
    scroll_root_selector: [".ph-scroll-root"],
    debug: import.meta.env.MODE === "development",
  });
  tagInternalUserIfRequested();
}

const INTERNAL_FLAG_KEY = "cq_internal_user";

/**
 * Visiting once with ?internal=1 permanently marks this browser as internal
 * traffic (persisted via the same localStorage this client already uses for
 * identity), so Brandon's own testing doesn't pollute reports. Tags the
 * PostHog person property `$internal_or_test_user`, which the "Internal /
 * Test users" cohort (project classquill-landing) filters on — same pattern
 * as equateit-landing.
 */
function tagInternalUserIfRequested(): void {
  if (typeof window === "undefined" || !posthog.__loaded) return;
  try {
    if (new URLSearchParams(window.location.search).get("internal") === "1") {
      window.localStorage.setItem(INTERNAL_FLAG_KEY, "1");
    }
    if (window.localStorage.getItem(INTERNAL_FLAG_KEY) === "1") {
      posthog.setPersonProperties({ $internal_or_test_user: true });
    }
  } catch {
    // localStorage unavailable (private mode, etc.) — fail open to "not internal"
  }
}

/** Defer init past first paint: window load → idle callback. */
export function scheduleLandingPostHogInit(): void {
  if (typeof window === "undefined") return;
  const whenIdle = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(() => initLandingPostHog(), { timeout: 4000 });
    } else {
      window.setTimeout(initLandingPostHog, 1);
    }
  };
  if (document.readyState === "complete") whenIdle();
  else window.addEventListener("load", whenIdle, { once: true });
}

export function trackCta(cta: LandingCtaId): void {
  if (!posthog.__loaded) return;
  posthog.capture("cta_clicked", { cta, page: window.location.pathname });
}

/**
 * Trial CTA click. send_instantly because a hard navigation to the app origin
 * follows immediately — the default batching would lose the event.
 */
export function trackSignupStart(source: LandingCtaId): void {
  if (!posthog.__loaded) return;
  posthog.capture(
    "signup_started",
    { source, page: window.location.pathname },
    { send_instantly: true },
  );
}

/**
 * Append cross-domain attribution to an app path for the signup hand-off.
 * The app project auto-captures the utm_* params on its own $pageview; the
 * app-side `signup_completed` event additionally records utm_content (source)
 * and ph_did (this surface's distinct_id) as plain properties. We deliberately
 * accept split funnels across the two projects — no identity stitching.
 */
export function withAttribution(path: string, ctaId: LandingCtaId): string {
  const params = new URLSearchParams({
    utm_source: "classquill-landing",
    utm_medium: "cta",
    utm_content: ctaId,
  });
  try {
    if (posthog.__loaded) params.set("ph_did", posthog.get_distinct_id());
  } catch {
    // not inited — attribution still works via utm_* alone
  }
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}${params.toString()}`;
}
