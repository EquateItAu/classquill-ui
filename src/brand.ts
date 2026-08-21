// Central brand config for the B2B (TMS software) landing page.
//
// Central brand config for the B2B (TMS software) landing page.
// Do NOT scatter the literal name through the landing components.

// Brand name: ClassQuill (decided 2026-06-16).
export const PRODUCT_NAME = "ClassQuill";

export const PRODUCT_TAGLINE = "The operating system for your tutoring business.";

// Public base URL for canonicals / sitemap / structured data (Phase 3 SEO).
export const BASE_URL = "https://classquill.com";

// Inbound entry for the automation (Hermes) upsell — see ClassQuill GTM §3.
// A mailto for now; swap to a routed page when the automation funnel ships.
// Copy rule (revised 2026-07-24): "AI" is now used directly in pricing/
// comparison copy — the AI Assistant add-on and the pricing page's "With AI /
// Without AI" breakdown say it plainly. Elsewhere on the site, still prefer
// describing what the automation DOES over a bare "AI" claim; this
// email/subject pair is specifically the Hermes automation upsell, a
// different feature from the AI Assistant add-on.
export const AI_INTEGRATION_EMAIL = "info@classquill.com";
export const AI_INTEGRATION_SUBJECT = "Automation enquiry";
export const AI_INTEGRATION_MAILTO = `mailto:${AI_INTEGRATION_EMAIL}?subject=${encodeURIComponent(
  AI_INTEGRATION_SUBJECT,
)}`;

// Marketplace (consumer demand side) entry — existing Find-a-Tutor surface.
export const FIND_A_TUTOR_PATH = "/find-tutor";

// Social profiles (canonical).
export const LINKEDIN_URL = "https://www.linkedin.com/company/classquill/";

// Contact.
export const CONTACT_EMAIL = "info@classquill.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
export const CONTACT_PATH = "/contact/";

// Cross-sell — EquateIt is the tutoring company that runs on ClassQuill.
// When a non-owner lands on ClassQuill (parent, student, solo tutor looking for
// clients), this hands them off to the right product instead of a dead end.
export const EQUATEIT_URL = "https://equateit.com.au";

// Conversion paths.
export const DEMO_PATH = "/demo/";
export const PRICING_PATH = "/pricing/";
// intent=educator pre-highlights the Educator tile in the signup wizard.
// (The old ?label=trial is still accepted by /auth-card for live links.)
export const SIGNUP_PATH = "/auth-card?mode=signup&intent=educator";

// The app (login, signup, marketplace) lives at the central origin. The marketing build
// bakes VITE_CENTRAL_AUTH_ORIGIN = app.classquill.com (set in CI); the app build / local dev
// leave it unset → fall back to the CURRENT origin so in-app + local clicks stay put. This
// mirrors config.ts's CENTRAL_AUTH_ORIGIN but is read inline on purpose: brand.ts is imported
// by tsx build scripts (generate-landing-sitemap) where import.meta.env is undefined and `@/`
// aliases don't resolve, so importing @/config (it reads import.meta.env at load) crashes them.
const APP_ENV = import.meta.env as unknown as Record<string, string | undefined> | undefined;
export const APP_URL =
  APP_ENV?.VITE_CENTRAL_AUTH_ORIGIN ??
  (typeof window !== "undefined" ? window.location.origin : "https://app.classquill.com");

/** Absolute URL for an app route (login, signup, marketplace). Pure → unit-tested. */
export function buildAppUrl(path: string): string {
  return `${APP_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Hard-navigate to an app route — the marketing build can't route to it client-side. */
export function goToApp(path: string): void {
  window.location.assign(buildAppUrl(path));
}

// Store listings are still EquateIt-named (known product decision — see ASSETS.md
// "Brand note"). The com.equateit.app package id IS the real live listing; do not
// "fix" it to a classquill id until a ClassQuill-branded listing actually exists.
export const APP_STORE_URL = "https://apps.apple.com/app/id6766400569";
export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.equateit.app";
