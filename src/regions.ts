// Region axis for the marketing site (AU / UK / US). This is a *region* concern
// (all English), NOT the i18n *language* axis (en/de/es/fr/nl). Curriculum,
// currency, tax, compliance and spelling vary by region; components read this
// config instead of hardcoding "ACARA" / "A$".
//
// HONESTY GATE: `published` is the single switch that gates a region everywhere —
// routes, sitemap, and hreflang all include a region ONLY when published. A region
// stays `published: false` until the product genuinely supports its curriculum
// (subjectConfig.ts + question banks) and its pricing (Stripe region prices). Never
// flip a region live on content that isn't built. See
// docs/plans/multi-region-curriculum-landing.md.

import { useEffect, useState } from "react";
import { BASE_URL } from "@/brand";

export type RegionCode = "au" | "uk" | "us";

export interface Region {
  code: RegionCode;
  /** URL segment; "" for the default region (served at root, no prefix). */
  segment: "" | "au" | "uk" | "us";
  label: string;
  /** <html lang> value. */
  htmlLang: string;
  /** og:locale value. */
  ogLocale: string;
  /** Curriculum phrase used in copy (must be true for a published region). */
  curriculum: string;
  /** Short curriculum tag for pills/badges. */
  curriculumShort: string;
  currencySymbol: string;
  taxTerm: string;
  complianceTerm: string;
  spelling: "au" | "us";
  /** The single honesty gate — false regions are invisible everywhere. */
  published: boolean;
}

// AU is the default region: served at root ("") today, canonicalised to /au once
// other regions publish. UK/US are fully configured but `published: false` — the
// system is ready; they light up when the product + pricing exist.
export const REGIONS: Region[] = [
  {
    code: "au",
    segment: "",
    label: "Australia",
    htmlLang: "en-AU",
    ogLocale: "en_AU",
    curriculum: "the Australian Curriculum (ACARA F–10 & VCE)",
    curriculumShort: "Australian Curriculum (ACARA F–10 & VCE)",
    currencySymbol: "A$",
    taxTerm: "GST",
    complianceTerm: "WWCC",
    spelling: "au",
    published: true,
  },
  {
    code: "uk",
    segment: "uk",
    label: "the UK",
    htmlLang: "en-GB",
    ogLocale: "en_GB",
    curriculum: "the National Curriculum (GCSE & A-Level)",
    curriculumShort: "National Curriculum (GCSE & A-Level)",
    currencySymbol: "£",
    taxTerm: "VAT",
    complianceTerm: "DBS check",
    spelling: "au",
    published: false, // GATE: needs UK curriculum content + £ pricing before publish
  },
  {
    code: "us",
    segment: "us",
    label: "the US",
    htmlLang: "en-US",
    ogLocale: "en_US",
    curriculum: "Common Core & AP",
    curriculumShort: "Common Core & AP",
    currencySymbol: "US$",
    taxTerm: "sales tax",
    complianceTerm: "background check",
    spelling: "us",
    published: false, // GATE: needs US curriculum content + US$ pricing before publish
  },
];

export const DEFAULT_REGION: RegionCode = "au";

const BY_CODE: Record<RegionCode, Region> = Object.fromEntries(
  REGIONS.map((r) => [r.code, r]),
) as Record<RegionCode, Region>;

export const getRegion = (code: RegionCode): Region => BY_CODE[code];

/** Only regions safe to expose (routes / sitemap / hreflang). */
export const publishedRegions = (): Region[] => REGIONS.filter((r) => r.published);

/**
 * Resolve the active region from a pathname's first segment. Unknown or missing
 * segment → the default region. An UNPUBLISHED region segment also resolves to
 * default (its routes shouldn't exist, but never surface an ungated region).
 * Pure → unit-tested.
 */
export function resolveRegion(pathname: string): RegionCode {
  const first = pathname.replace(/^\/+/, "").split("/")[0]?.toLowerCase();
  const match = REGIONS.find((r) => r.segment !== "" && r.segment === first);
  return match && match.published ? match.code : DEFAULT_REGION;
}

/** Strip a region segment from a path → the region-neutral route ("/uk/pricing" → "/pricing"). */
export function stripRegion(pathname: string): string {
  const region = resolveRegion(pathname);
  const seg = getRegion(region).segment;
  if (!seg) return pathname;
  const stripped = pathname.replace(new RegExp(`^/${seg}(?=/|$)`), "");
  return stripped === "" ? "/" : stripped;
}

/** Absolute URL for a region + region-neutral route, trailing-slash normalised. */
export function regionUrl(region: Region, neutralPath: string): string {
  const base = region.segment ? `/${region.segment}` : "";
  const path = neutralPath === "/" ? "/" : neutralPath;
  const full = `${base}${path}`;
  const slashed = full.endsWith("/") ? full : `${full}/`;
  return `${BASE_URL}${slashed}`;
}

/**
 * hreflang alternates for a route: every PUBLISHED region's URL for the same
 * region-neutral path, plus x-default → the default region. Unpublished regions
 * are excluded (the honesty gate applied to SEO).
 */
export function hreflangAlternates(
  currentPath: string,
): { hreflang: string; href: string }[] {
  const neutral = stripRegion(currentPath);
  const alts = publishedRegions().map((r) => ({
    hreflang: r.htmlLang.toLowerCase(),
    href: regionUrl(r, neutral),
  }));
  const def = getRegion(DEFAULT_REGION);
  alts.push({ hreflang: "x-default", href: regionUrl(def, neutral) });
  return alts;
}

// ── Currency ────────────────────────────────────────────────────────────
//
// Deliberately NOT behind the `published` honesty gate above. That gate exists
// because a Region also carries CAPABILITY claims (curriculum, compliance term)
// that must be genuinely true before they're shown — a UK visitor seeing
// "Designed for the National Curriculum" with no real UK content behind it would
// be false. Converting a price into the visitor's currency claims nothing about
// the product; it's display formatting. So currency can resolve for any visitor,
// in any country, today — independent of which regions are content-published.
//
// USD is the canonical/billed price (see Pricing.tsx TUTOR_RATE_USD). Rates are
// static approximations — refresh periodically, same spirit as the
// "AUD with (approx US$…)" v1 stopgap in the pricing strategy note.

export type CurrencyCode = "USD" | "AUD" | "GBP" | "EUR";

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  /** Matches the flag-next-to-price affordance TutorBird uses. */
  flag: string;
  /** Multiplier from USD, e.g. 1 USD ≈ 1.5 AUD. */
  rateFromUsd: number;
}

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: { code: "USD", symbol: "$", flag: "🇺🇸", rateFromUsd: 1 },
  AUD: { code: "AUD", symbol: "A$", flag: "🇦🇺", rateFromUsd: 1.5 },
  GBP: { code: "GBP", symbol: "£", flag: "🇬🇧", rateFromUsd: 0.8 },
  EUR: { code: "EUR", symbol: "€", flag: "🇪🇺", rateFromUsd: 0.93 },
};

export const DEFAULT_CURRENCY: CurrencyCode = "USD";

const EUROZONE = new Set([
  "AT", "BE", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT",
  "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES",
]);

/** ISO 3166-1 alpha-2 country code → currency. Pure → unit-tested. */
export function currencyForCountry(country: string | undefined): CurrencyCode {
  if (!country) return DEFAULT_CURRENCY;
  const c = country.toUpperCase();
  if (c === "AU") return "AUD";
  if (c === "GB" || c === "IE") return "GBP";
  if (EUROZONE.has(c)) return "EUR";
  return DEFAULT_CURRENCY;
}

/** Round-trip USD → the target currency at the static approximate rate. */
export function convert(usdAmount: number, currency: CurrencyCode): number {
  return Math.round(usdAmount * CURRENCIES[currency].rateFromUsd);
}

// The dial-code table that used to live here is gone: it was a third copy of the
// country list, and its `dialCodeForCountry` collided by name with the one in
// `@/lib/phone`. Feed `detectCountry()` through `phoneCountryFromGeo` instead —
// `PHONE_COUNTRIES` is the single source.

/**
 * Real geo-IP signal, when present — injected by the Cloudflare Pages
 * Function at frontend/functions/_middleware.js from `request.cf.country`
 * (see that file for the honesty-gate reasoning). `undefined` in local dev,
 * or on any deploy that hasn't picked the Function up yet.
 */
function injectedCountry(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { __GEO_COUNTRY__?: string }).__GEO_COUNTRY__;
}

/**
 * Best available country signal: the real Cloudflare geo-IP value when
 * present, otherwise a client-side heuristic — timezone FIRST, browser locale
 * as a fallback. Timezone tracks the OS clock/location setting, which is a
 * much stronger real-world signal than `navigator.language`: plenty of
 * Windows/Chrome installs report "en-US" regardless of where the machine
 * actually is (a real AU visitor got shown USD pricing this way — 2026-07-24),
 * so locale-first previously mis-detected real Australians as American. The
 * heuristic is still NOT real geolocation — a VPN or an expat's OS settings
 * will get it wrong either way — which is exactly why the Cloudflare signal
 * takes priority whenever it's available (see the deploy-pipeline fix in
 * release.yml that makes that signal actually reach the page).
 *
 * Used for two different things downstream, with two different safety bars:
 * currency (currencyForCountry/convert) is safe to use for any result, since
 * showing a converted price isn't a capability claim. Curriculum-specific
 * copy (WhyUs.tsx) must NOT use this to show an unpublished region's
 * curriculum claim — only to decide whether to show the real AU copy or a
 * generic, non-committal fallback. See regions.ts's HONESTY GATE note above.
 */
export function detectCountry(): string | undefined {
  const real = injectedCountry();
  if (real) return real;

  if (typeof Intl !== "undefined") {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.startsWith("Australia/")) return "AU";
    if (tz === "Europe/London" || tz === "Europe/Dublin") return "GB";
    if (tz.startsWith("Europe/")) return "DE"; // rough Eurozone proxy
  }

  if (typeof navigator === "undefined" || typeof Intl === "undefined") {
    return undefined;
  }
  try {
    const region = new Intl.Locale(navigator.language || "en-US").region;
    if (region) return region;
  } catch {
    // Intl.Locale unsupported, or the locale has no region subtag.
  }
  return undefined;
}

/**
 * Currency for the current visitor, resolved once and updated after mount
 * (see detectCurrency's doc comment on why USD is the safe initial value —
 * matches server-prerendered HTML, no hydration mismatch). Shared by every
 * landing surface that shows a price so they can never disagree with each
 * other about which currency is showing.
 */
export function useLandingCurrency(): Currency {
  const [currencyCode, setCurrencyCode] = useState(DEFAULT_CURRENCY);
  useEffect(() => {
    setCurrencyCode(detectCurrency());
  }, []);
  return CURRENCIES[currencyCode];
}

export function detectCurrency(): CurrencyCode {
  return currencyForCountry(detectCountry());
}
