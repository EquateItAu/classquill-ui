// Shared phone-number helpers, country list, and validation.
//
// Profiles store the local number (`phone_number`) and dialing code
// (`phone_country_code`, default "+61") in two columns, mirroring the
// organizations.notification_phone / notification_phone_cc pattern. That split
// is the storage contract — nothing here changes it.
//
// Validation runs on libphonenumber-js's `/max` metadata. `/min` only checks
// length, so it happily accepts numbers with impossible prefixes (e.g. the
// Singapore mobile "+6589555555"); `/max` carries the real per-country digit
// patterns, which is the whole point of validating at all.

import {
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js/max"

export type { CountryCode }

export interface PhoneCountry {
  iso: CountryCode
  dialCode: string
  name: string
  /** Sample national number, used as the field placeholder. */
  example: string
  /**
   * National digit count, or an inclusive range. Used to *classify* a rejection
   * as too short vs too long and to name the counts in the message —
   * `isValid()` still owns the pass/fail call, so a stale entry here makes a
   * message vaguer, never a verdict wrong.
   */
  digits: number | [number, number]
  /** National trunk prefix, dropped when the number is written with a dial code. */
  trunkPrefix?: string
}

/**
 * Keyed by ISO country, not dial code. Dial codes aren't unique (US and Canada
 * both use +1), and libphonenumber needs a country — not a calling code — to
 * apply the right digit rules.
 *
 * Order matters: `countryForDialCode` resolves a shared dial code to whichever
 * country appears first, so the primary for +1 is US.
 */
export const PHONE_COUNTRIES: readonly PhoneCountry[] = [
  { iso: "AU", dialCode: "+61", name: "Australia", example: "412 345 678", digits: 9, trunkPrefix: "0" },
  { iso: "NZ", dialCode: "+64", name: "New Zealand", example: "21 123 4567", digits: [8, 10], trunkPrefix: "0" },
  { iso: "US", dialCode: "+1", name: "United States", example: "(415) 555-2671", digits: 10 },
  { iso: "CA", dialCode: "+1", name: "Canada", example: "(416) 555-0123", digits: 10 },
  { iso: "GB", dialCode: "+44", name: "United Kingdom", example: "7400 123456", digits: [9, 10], trunkPrefix: "0" },
  { iso: "IE", dialCode: "+353", name: "Ireland", example: "85 012 3456", digits: [7, 9], trunkPrefix: "0" },
  { iso: "DE", dialCode: "+49", name: "Germany", example: "1512 3456789", digits: [6, 11], trunkPrefix: "0" },
  { iso: "FR", dialCode: "+33", name: "France", example: "6 12 34 56 78", digits: 9, trunkPrefix: "0" },
  { iso: "ES", dialCode: "+34", name: "Spain", example: "612 345 678", digits: 9 },
  { iso: "NL", dialCode: "+31", name: "Netherlands", example: "6 12345678", digits: 9, trunkPrefix: "0" },
  { iso: "SG", dialCode: "+65", name: "Singapore", example: "8123 4567", digits: 8 },
  { iso: "IN", dialCode: "+91", name: "India", example: "81234 56789", digits: 10 },
] as const

export const DEFAULT_PHONE_COUNTRY: CountryCode = "AU"
export const DEFAULT_COUNTRY_CODE = "+61"

const BY_ISO = new Map(PHONE_COUNTRIES.map((c) => [c.iso, c]))

/** Country metadata for an ISO code, falling back to the default country. */
export function phoneCountry(iso: CountryCode | null | undefined): PhoneCountry {
  return (iso ? BY_ISO.get(iso) : undefined) ?? BY_ISO.get(DEFAULT_PHONE_COUNTRY)!
}

/**
 * Map a stored dial code back to an ISO country. Ambiguous codes resolve to the
 * first match in `PHONE_COUNTRIES` (+1 → US), which is all we can do — the
 * columns only ever held a dial code, so US and Canada were never
 * distinguishable in the first place.
 */
export function countryForDialCode(dial: string | null | undefined): CountryCode {
  if (!dial) return DEFAULT_PHONE_COUNTRY
  const normalized = dial.trim().replace(/[^\d+]/g, "")
  if (!normalized) return DEFAULT_PHONE_COUNTRY
  const withPlus = normalized.startsWith("+") ? normalized : `+${normalized}`
  return PHONE_COUNTRIES.find((c) => c.dialCode === withPlus)?.iso ?? DEFAULT_PHONE_COUNTRY
}

/** Dial code for an ISO country, e.g. "AU" → "+61". */
export function dialCodeForCountry(iso: CountryCode | null | undefined): string {
  return phoneCountry(iso).dialCode
}

/**
 * Narrow a loose geo-IP country signal to a country we actually offer.
 *
 * The landing site's `detectCountry()` returns whatever Cloudflare reports —
 * any ISO code, or `undefined` in local dev — so it can name a country that
 * isn't in `PHONE_COUNTRIES`. Anything unrecognised falls back to the default
 * rather than being trusted into a dial code we can't store.
 */
export function phoneCountryFromGeo(country: string | null | undefined): CountryCode {
  if (!country) return DEFAULT_PHONE_COUNTRY
  const upper = country.trim().toUpperCase()
  return PHONE_COUNTRIES.find((c) => c.iso === upper)?.iso ?? DEFAULT_PHONE_COUNTRY
}

/**
 * Legacy dial-code list, kept for the `{ label, value }` Select shape. Deduped
 * by dial code because Select values must be unique — that's why Canada isn't
 * here even though it is in `PHONE_COUNTRIES`.
 *
 * New code should use `PHONE_COUNTRIES` via `PhoneInput` instead.
 */
export const COUNTRY_CODES = PHONE_COUNTRIES.filter(
  (c, i, all) => all.findIndex((o) => o.dialCode === c.dialCode) === i,
).map((c) => ({ label: `${c.iso} ${c.dialCode}`, value: c.dialCode }))

export type PhoneIssue = "too_short" | "too_long" | "invalid" | "unsupported_country"

export interface PhoneValidation {
  /** False only when a non-empty input failed. Empty is fine — phone is optional everywhere. */
  ok: boolean
  /** National digits to store in `phone_number`. Null when the input was empty or invalid. */
  local: string | null
  e164: string | null
  /** National format for display, e.g. "447 043 900". */
  formatted: string | null
  issue: PhoneIssue | null
  /** i18n key under the `common` namespace. Null when there's nothing to report. */
  messageKey: string | null
  /** Expected national digit count as copy, e.g. "9" or "8-10". */
  expectedDigits: string | null
  /** National digits the user actually supplied, after dial code + trunk prefix. */
  actualDigits: number
  /** True when a leading trunk zero was dropped — drives the "you don't need the 0" hint. */
  strippedTrunkPrefix: boolean
  /** Set when the input carried its own country code, so the caller can switch the dropdown. */
  detectedCountry: CountryCode | null
}

const EMPTY: PhoneValidation = {
  ok: true,
  local: null,
  e164: null,
  formatted: null,
  issue: null,
  messageKey: null,
  expectedDigits: null,
  actualDigits: 0,
  strippedTrunkPrefix: false,
  detectedCountry: null,
}

function expectedDigitsText(country: PhoneCountry): string {
  return Array.isArray(country.digits) ? `${country.digits[0]}-${country.digits[1]}` : String(country.digits)
}

/**
 * i18n key per issue. Written out rather than interpolated from the issue name —
 * the issues are snake_case and the locale keys are camelCase, and building
 * `phone.${issue}` silently produced `phone.too_long`, which matched nothing and
 * made every length error render the generic "not a valid number" copy.
 */
const MESSAGE_KEY: Record<PhoneIssue, string> = {
  too_short: "phone.tooShort",
  too_long: "phone.tooLong",
  // Digit counts say nothing useful about a wrong prefix, so there's only the
  // one form.
  invalid: "phone.invalidGeneric",
  unsupported_country: "phone.unsupportedCountry",
}

/** Which side of the country's expected digit range a count falls on. */
function lengthVerdict(country: PhoneCountry, count: number): "short" | "long" | "in_range" {
  const [min, max] = Array.isArray(country.digits) ? country.digits : [country.digits, country.digits]
  if (count < min) return "short"
  if (count > max) return "long"
  return "in_range"
}

/**
 * The number as it should appear next to its own dial code — international
 * grouping with the "+<cc> " lopped off, e.g. "447 043 900".
 *
 * Deliberately not `formatNational()`, which re-adds the national trunk prefix
 * ("0447 043 900") and so would show the very leading zero the dial code makes
 * redundant.
 */
function nationalDisplay(parsed: { formatInternational(): string; countryCallingCode: string }): string {
  const intl = parsed.formatInternational()
  const prefix = `+${parsed.countryCallingCode}`
  return intl.startsWith(prefix) ? intl.slice(prefix.length).trim() : intl
}

/**
 * Validate a phone number typed into a field that already has a dial code
 * selected beside it.
 *
 * Three things this catches that a bare digit-strip does not:
 *
 *  1. **Too many digits.** "04470439001" beside "+61" is 10 national digits
 *     where Australia allows 9 — reported as `too_long` with both counts, so
 *     the message can name them.
 *  2. **A doubled country code.** Typing "+61412345678" into the local field
 *     beside a "+61" dial code used to have the "+" stripped and be stored as
 *     "61412345678", producing "tel:+6161412345678". Input carrying its own
 *     country code is now parsed on its own terms and reported through
 *     `detectedCountry` so the caller can switch the dropdown instead.
 *  3. **An impossible prefix.** "+61 999 999 999" is the right length and still
 *     not a real Australian number.
 *
 * A leading trunk zero ("0412…") stays valid — it's how people write their own
 * number — but `strippedTrunkPrefix` is set so the UI can show what was stored.
 */
export function validatePhone(iso: CountryCode, raw: string | null | undefined): PhoneValidation {
  const trimmed = (raw ?? "").trim()
  if (trimmed === "") return EMPTY
  if (!/\d/.test(trimmed)) {
    // A lone "+" mid-typing is not yet a wrong number, but any other
    // digit-free text is.
    return trimmed === "+"
      ? EMPTY
      : { ...EMPTY, ok: false, issue: "invalid", messageKey: MESSAGE_KEY.invalid }
  }

  // "+61…" and the IDD form "0061…" both carry their own country code.
  const carriesOwnCode = trimmed.startsWith("+") || /^00\d/.test(trimmed)
  const text = trimmed.startsWith("00") ? `+${trimmed.slice(2)}` : trimmed
  const defaultCountry = carriesOwnCode ? undefined : iso

  const parsed = parsePhoneNumberFromString(text, defaultCountry)
  const detectedCountry = carriesOwnCode ? (parsed?.country ?? null) : null

  // A number from a country we don't stock can't be stored: `phone_country_code`
  // only ever holds a dial code from this list, so accepting it would file, say,
  // a Japanese number under "+61". Reject rather than mis-store.
  if (detectedCountry && !BY_ISO.has(detectedCountry)) {
    return {
      ...EMPTY,
      ok: false,
      issue: "unsupported_country",
      messageKey: MESSAGE_KEY.unsupported_country,
      actualDigits: parsed?.nationalNumber.length ?? 0,
      detectedCountry,
    }
  }

  // Digit rules come from whichever country the number actually belongs to, so
  // a pasted +64 number is judged as a New Zealand number even in an AU field.
  const country = phoneCountry(detectedCountry ?? iso)
  const expected = expectedDigitsText(country)

  // Count the national digits the user supplied so the error can name a number.
  // When the parse succeeded libphonenumber has already worked it out;
  // otherwise peel off the dial code and one trunk zero by hand.
  let actualDigits: number
  let strippedTrunkPrefix = false
  const rawDigits = trimmed.replace(/\D/g, "")
  if (parsed) {
    actualDigits = parsed.nationalNumber.length
    // Only claim a trunk prefix was dropped when one was actually typed.
    // libphonenumber also absorbs a bare country code ("61447043900" in an AU
    // field), and counting that made the UI say "you don't need the leading 0"
    // about a number with no leading 0 — or, for the US, about a country that has
    // no trunk prefix at all.
    strippedTrunkPrefix =
      !carriesOwnCode &&
      !!country.trunkPrefix &&
      rawDigits.startsWith(country.trunkPrefix) &&
      rawDigits.length > parsed.nationalNumber.length
  } else {
    let national = rawDigits
    if (carriesOwnCode) {
      const cc = getCountryCallingCode(country.iso)
      if (national.startsWith(cc)) national = national.slice(cc.length)
    }
    if (country.trunkPrefix && national.startsWith(country.trunkPrefix)) {
      national = national.slice(country.trunkPrefix.length)
      strippedTrunkPrefix = true
    }
    actualDigits = national.length
  }

  const fail = (issue: PhoneIssue): PhoneValidation => ({
    ...EMPTY,
    ok: false,
    issue,
    // When the counted digits match what's expected, quoting the count would
    // read as a contradiction ("that's 9 digits, expected 9") — fall back to
    // copy that only states the expectation.
    messageKey:
      (issue === "too_long" || issue === "too_short") && String(actualDigits) === expected
        ? `${MESSAGE_KEY[issue]}Generic`
        : MESSAGE_KEY[issue],
    expectedDigits: expected,
    actualDigits,
    strippedTrunkPrefix,
    detectedCountry,
  })

  if (parsed?.isValid()) {
    return {
      ok: true,
      local: parsed.nationalNumber,
      e164: parsed.number,
      formatted: nationalDisplay(parsed),
      issue: null,
      messageKey: null,
      expectedDigits: expected,
      actualDigits,
      strippedTrunkPrefix,
      detectedCountry,
    }
  }

  // `isValid()` is the verdict; everything below only decides how to explain it.
  //
  // `validatePhoneNumberLength` is checked first but rarely fires, because it
  // asks whether the length is possible for ANY number type in the country.
  // Australia's range spans service and short numbers, so it calls both "12345"
  // and a 10-digit mobile "possible" — which is exactly the case we're here to
  // catch. So when it abstains, classify against the country's own expected
  // digit count instead.
  const lengthIssue = validatePhoneNumberLength(text, defaultCountry)
  if (lengthIssue === "TOO_SHORT") return fail("too_short")
  if (lengthIssue === "TOO_LONG") return fail("too_long")

  const verdict = lengthVerdict(country, actualDigits)
  if (verdict === "short") return fail("too_short")
  if (verdict === "long") return fail("too_long")
  // Right length, wrong number — a prefix that country never issues.
  return fail("invalid")
}

/**
 * Clean a raw phone input down to the digits we store. Strips spaces, dashes,
 * parens, and a leading "0" (Australian trunk prefix) so it composes cleanly
 * with a "+61"-style country code. Returns null when there aren't enough
 * digits to be a plausible number (so callers store null rather than junk).
 *
 * This is the lenient read-side normaliser behind the display helpers below and
 * every `ContactLinks` render site — it has to keep accepting the rows already
 * in the database. Input forms use `validatePhone` instead, which is strict.
 */
export function normalizeLocalNumber(raw: string | null | undefined): string | null {
  if (!raw) return null
  let digits = raw.replace(/[^\d]/g, "")
  if (digits.length === 0) return null
  // Drop a single leading trunk zero (e.g. 0412… → 412…) so it pairs with +61.
  // Only one — stripping all leading zeros would mangle a pasted "00<cc>…" IDD
  // prefix or an accidental "0049…".
  if (digits.startsWith("0")) digits = digits.replace(/^0/, "")
  if (digits.length < 6) return null
  return digits
}

/**
 * Build a `tel:` href from a country code + local number, e.g.
 * formatTelHref("+61", "412345678") → "tel:+61412345678". Returns null when
 * the number is missing/too short so callers can hide the link.
 */
export function formatTelHref(
  countryCode: string | null | undefined,
  localNumber: string | null | undefined,
): string | null {
  const local = normalizeLocalNumber(localNumber)
  if (!local) return null
  const cc = (countryCode || DEFAULT_COUNTRY_CODE).replace(/[^\d+]/g, "")
  return `tel:${cc}${local}`
}

/**
 * Human-readable phone for display, e.g. "+61 412 345 678". Grouped the way the
 * number's own country writes it when it parses; falls back to "<code> <digits>"
 * for rows that don't (older free-text values, unlisted countries).
 */
export function formatPhoneDisplay(
  countryCode: string | null | undefined,
  localNumber: string | null | undefined,
): string | null {
  const local = normalizeLocalNumber(localNumber)
  if (!local) return null
  const cc = (countryCode || DEFAULT_COUNTRY_CODE).replace(/[^\d+]/g, "")
  const parsed = parsePhoneNumberFromString(`${cc.startsWith("+") ? cc : `+${cc}`}${local}`)
  return parsed?.isValid() ? parsed.formatInternational() : `${cc} ${local}`
}
