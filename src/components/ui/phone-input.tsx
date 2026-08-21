import { useEffect, useMemo, useState, type Ref } from "react"
import { useTranslation } from "react-i18next"
import "flag-icons/css/flag-icons.min.css"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  PHONE_COUNTRIES,
  dialCodeForCountry,
  phoneCountry,
  validatePhone,
  type CountryCode,
  type PhoneCountry,
  type PhoneValidation,
} from "@/lib/phone"

function Flag({ iso, className }: { iso: CountryCode; className?: string }) {
  return <span aria-hidden="true" className={cn("fi shrink-0 rounded-[2px]", `fi-${iso.toLowerCase()}`, className)} />
}

export interface PhoneInputProps {
  /** ISO country, not a dial code — see the note on `PHONE_COUNTRIES`. */
  country: CountryCode
  onCountryChange: (country: CountryCode) => void
  /** Raw text exactly as typed. The caller stores `validation.local`, not this. */
  value: string
  onValueChange: (value: string) => void
  /** Fires whenever the verdict changes, so forms can gate submit on `.ok`. */
  onValidationChange?: (validation: PhoneValidation) => void
  id?: string
  name?: string
  disabled?: boolean
  className?: string
  /** Overrides the country's own example number. */
  placeholder?: string
  /** Reveal errors without waiting for blur — set this once a form is submitted. */
  showErrors?: boolean
  /** Form-level error text, shown instead of the component's own message. */
  error?: string | null
  /** Suppress the built-in error/hint line, for forms that render their own. */
  hideMessages?: boolean
  inputRef?: Ref<HTMLInputElement>
  "aria-label"?: string
  "aria-describedby"?: string
}

/**
 * Dial-code dropdown + local-number field as one control, with per-country
 * validation. The single home for phone entry across the app — the Select+Input
 * pair used to be copy-pasted into Settings, student intake (twice) and org
 * settings, none of which bounded the number's length.
 *
 * Three behaviours worth knowing about:
 *
 *  - **The country switches itself** when the typed number carries its own code,
 *    so pasting "+64 21 123 4567" into an Australian field moves the dropdown to
 *    New Zealand rather than storing a New Zealand number under "+61".
 *  - **Blur rewrites a valid number to its national grouping**, without the
 *    trunk zero. Typing "0447043900" leaves "447 043 900" in the field, which is
 *    what actually gets stored — previously that zero vanished silently.
 *  - **Errors wait for blur** (or `showErrors`), so the field doesn't go red
 *    while the number is still half-typed.
 */
export function PhoneInput({
  country,
  onCountryChange,
  value,
  onValueChange,
  onValidationChange,
  id,
  name,
  disabled,
  className,
  placeholder,
  showErrors,
  error,
  hideMessages,
  inputRef,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}: PhoneInputProps) {
  const { t } = useTranslation("common")
  const [touched, setTouched] = useState(false)
  const selected = phoneCountry(country)
  const validation = useMemo(() => validatePhone(country, value), [country, value])

  useEffect(() => {
    onValidationChange?.(validation)
    // `onValidationChange` is usually an inline arrow; depending on it would
    // re-fire every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validation])

  // A number that names its own country wins over the dropdown. Switching here
  // rather than on blur keeps the dial code honest while the user is still
  // typing; the field text is only rewritten once they leave it.
  //
  // Only when the *dial code* would actually change, though. Countries sharing
  // one (US and Canada on +1) are indistinguishable in what we store, and
  // libphonenumber resolves a given +1 number to whichever of the two owns its
  // area code — so without this guard, picking Canada and typing a US-area-code
  // number yanks the dropdown back to the US on every keystroke.
  const detected = validation.detectedCountry
  useEffect(() => {
    if (
      detected &&
      detected !== country &&
      PHONE_COUNTRIES.some((c) => c.iso === detected) &&
      dialCodeForCountry(detected) !== dialCodeForCountry(country)
    ) {
      onCountryChange(detected)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detected, country])

  function handleBlur() {
    setTouched(true)
    if (validation.ok && validation.formatted && validation.formatted !== value) {
      onValueChange(validation.formatted)
    }
  }

  const showError = !disabled && (error != null || ((touched || showErrors) && !validation.ok))
  const message = error ?? phoneMessage(t, validation, selected)
  const hint =
    !showError && validation.ok && validation.strippedTrunkPrefix && validation.formatted
      ? t("phone.trunkPrefixHint", { formatted: validation.formatted, dial: selected.dialCode })
      : null

  const messageId = id ? `${id}-phone-message` : undefined
  const describedBy = [ariaDescribedBy, (showError || hint) && !hideMessages ? messageId : null]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex gap-2">
        <Select
          value={selected.iso}
          onValueChange={(v) => onCountryChange(v as CountryCode)}
          disabled={disabled}
        >
          <SelectTrigger className="w-30 shrink-0" aria-label={t("phone.dialCodeLabel")}>
            <span className="flex items-center gap-2 truncate">
              <Flag iso={selected.iso} />
              <span className="truncate">{selected.dialCode}</span>
            </span>
          </SelectTrigger>
          <SelectContent>
            {PHONE_COUNTRIES.map((c) => (
              <SelectItem key={c.iso} value={c.iso}>
                <span className="flex items-center gap-2">
                  <Flag iso={c.iso} />
                  <span>{c.name}</span>
                  <span className="text-muted-foreground">{c.dialCode}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          ref={inputRef}
          id={id}
          name={name}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder ?? selected.example}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-invalid={showError || undefined}
          aria-describedby={describedBy || undefined}
          className="flex-1"
        />
      </div>
      {!hideMessages && showError && message && (
        <p id={messageId} role="alert" className="text-xs text-destructive">
          {message}
        </p>
      )}
      {!hideMessages && !showError && hint && (
        <p id={messageId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  )
}

/**
 * Resolve a validation result to display copy.
 *
 * Every key is written out literally rather than passed through as
 * `t(validation.messageKey)` — `scripts/check-i18n-keys.mjs` only verifies
 * static keys, and a dynamic one would silently skip the guard that exists
 * precisely because raw keys once shipped to production.
 */
export function phoneMessage(
  t: (key: string, vars?: Record<string, unknown>) => string,
  validation: PhoneValidation,
  country: PhoneCountry,
): string | null {
  if (validation.ok || !validation.messageKey) return null
  // `digits`, not `count` — i18next treats `count` as a pluralisation signal.
  const vars = {
    digits: validation.actualDigits,
    expected: validation.expectedDigits ?? "",
    country: country.name,
    dial: country.dialCode,
  }
  switch (validation.messageKey) {
    case "phone.tooLong":
      return t("phone.tooLong", vars)
    case "phone.tooLongGeneric":
      return t("phone.tooLongGeneric", vars)
    case "phone.tooShort":
      return t("phone.tooShort", vars)
    case "phone.tooShortGeneric":
      return t("phone.tooShortGeneric", vars)
    case "phone.unsupportedCountry":
      return t("phone.unsupportedCountry", vars)
    default:
      return t("phone.invalidGeneric", vars)
  }
}

export interface PhoneCountrySelectProps {
  value: CountryCode
  onValueChange: (country: CountryCode) => void
  disabled?: boolean
  className?: string
  id?: string
  "aria-label"?: string
}

/**
 * The country dropdown on its own, for places that pick a country without
 * taking a number alongside it — the roster importer's "what country are these
 * numbers from?" step.
 */
export function PhoneCountrySelect({
  value,
  onValueChange,
  disabled,
  className,
  id,
  "aria-label": ariaLabel,
}: PhoneCountrySelectProps) {
  const selected = phoneCountry(value)
  return (
    <Select value={selected.iso} onValueChange={(v) => onValueChange(v as CountryCode)} disabled={disabled}>
      <SelectTrigger id={id} className={cn("w-full", className)} aria-label={ariaLabel}>
        <span className="flex items-center gap-2 truncate">
          <Flag iso={selected.iso} />
          <span className="truncate">{selected.name}</span>
          <span className="text-muted-foreground">{selected.dialCode}</span>
        </span>
      </SelectTrigger>
      <SelectContent>
        {PHONE_COUNTRIES.map((c) => (
          <SelectItem key={c.iso} value={c.iso}>
            <span className="flex items-center gap-2">
              <Flag iso={c.iso} />
              <span>{c.name}</span>
              <span className="text-muted-foreground">{c.dialCode}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
