// Single source of truth for the "Powered by ClassQuill" badge embed snippet.
// Consumed by BOTH the marketing /badge page (landing bundle) and the in-app
// Settings badge card — two surfaces handing out different markup for the same
// badge is exactly the drift this module prevents. Kept in lib/ (not
// components/landing/) so the app bundle can import it without pulling in
// landing-page modules.

/** Marketing-site origin the badge links back to. Mirrors
 *  components/landing/brand.ts BASE_URL (which stays the landing bundle's
 *  canonical constant — re-exported here so lib/ has no landing import). */
export const BADGE_BASE_URL = "https://classquill.com";

export type BadgeVariant = "dark" | "light";

/**
 * Build the badge link href, optionally attributed to the org handing it out.
 *
 * The embed carries no org identifier of its own, so a utm campaign is the only
 * way to tell which customer's footer a click came from. It is appended ONLY
 * when we know the slug (the in-app card); the marketing /badge page has no org
 * context and hands out the plain form.
 *
 * The verification crawler must keep accepting BOTH forms forever — every embed
 * already pasted into a customer's footer is frozen at whatever we emitted the
 * day they copied it, and nothing will ever go back and update them.
 */
function badgeHref(orgSlug?: string | null): string {
  if (!orgSlug) return BADGE_BASE_URL;
  return `${BADGE_BASE_URL}/?utm_source=badge&utm_medium=referral&utm_campaign=${encodeURIComponent(orgSlug)}`;
}

export function badgeEmbedCode(variant: BadgeVariant, orgSlug?: string | null): string {
  return `<a href="${badgeHref(orgSlug)}" target="_blank" rel="noopener noreferrer">
  <img src="${BADGE_BASE_URL}/badge/badge_${variant}.svg" alt="Powered by ClassQuill" width="160" height="44" />
</a>`;
}
