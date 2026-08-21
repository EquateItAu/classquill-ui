import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React$1 from 'react';
import { ReactNode, KeyboardEvent, Ref, ComponentProps } from 'react';
import { VariantProps } from 'class-variance-authority';
import { Label as Label$1, Select as Select$1 } from 'radix-ui';
import { CountryCode } from 'libphonenumber-js/max';
export { CountryCode } from 'libphonenumber-js/max';
import * as Sentry from '@sentry/react';
import { ClassValue } from 'clsx';
export { default as posthog } from 'posthog-js';

declare const badgeVariants: (props?: ({
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "warning" | "success" | "info" | null | undefined;
    size?: "default" | "sm" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const Badge: React$1.ForwardRefExoticComponent<Omit<React$1.ClassAttributes<HTMLSpanElement> & React$1.HTMLAttributes<HTMLSpanElement> & VariantProps<(props?: ({
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "warning" | "success" | "info" | null | undefined;
    size?: "default" | "sm" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & {
    asChild?: boolean;
}, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;

declare const buttonVariants: (props?: ({
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "cta" | null | undefined;
    size?: "default" | "sm" | "xs" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const Button: React$1.ForwardRefExoticComponent<Omit<React$1.ClassAttributes<HTMLButtonElement> & React$1.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<(props?: ({
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "cta" | null | undefined;
    size?: "default" | "sm" | "xs" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & {
    asChild?: boolean;
}, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

declare function Empty({ className, ...props }: React.ComponentProps<"div">): React$1.JSX.Element;
declare function EmptyHeader({ className, ...props }: React.ComponentProps<"div">): React$1.JSX.Element;
declare const emptyMediaVariants: (props?: ({
    variant?: "default" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function EmptyMedia({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>): React$1.JSX.Element;
declare function EmptyTitle({ className, ...props }: React.ComponentProps<"div">): React$1.JSX.Element;
declare function EmptyDescription({ className, ...props }: React.ComponentProps<"p">): React$1.JSX.Element;
declare function EmptyContent({ className, ...props }: React.ComponentProps<"div">): React$1.JSX.Element;

interface EmptyStateProps {
    /** Lucide icon element. Optional — omit for text-only empties (e.g. compact sidebars). */
    icon?: ReactNode;
    title: string;
    description?: string;
    /** Action element(s), e.g. a Button. Rendered below the header. */
    action?: ReactNode;
    /**
     * default — dashed-border card, for standalone page/section empties.
     * card — solid-border card, replaces the old EmptyStateCard look.
     * plain — no container chrome, for embedded contexts (sidebars, table cells, popovers).
     */
    variant?: "default" | "card" | "plain";
    className?: string;
    /** Override the title's default text-lg — e.g. a small size to match a tight list's row text. */
    titleClassName?: string;
    /**
     * Forwarded to the icon's `IconTile`. Leave at `default` (neutral) unless the empty
     * state itself represents a genuine status ("nothing needs attention" = success).
     * Don't recolour the icon element directly with a `text-*` class — that leaves the
     * tile's neutral background mismatched against a coloured icon.
     */
    tone?: "default" | "warning" | "success" | "destructive";
}
declare function EmptyState({ icon, title, description, action, variant, className, titleClassName, tone, }: EmptyStateProps): React$1.JSX.Element;

interface IconTileProps {
    children: ReactNode;
    /** sm=size-8 (default, list/stat rows), smd=size-9 (compact cards), md=size-10 (hero stats), lg=size-12 (feature cards). */
    size?: "sm" | "smd" | "md" | "lg";
    /**
     * Decorative tiles are deliberately ONE tone. `default` is the shared well — the same
     * fill as `<Badge variant="secondary">`, `UserAvatar` and `CountBadge` — so every
     * decorative swatch in the app reads as one family.
     *
     * The other tones are reserved for genuine STATUS, where the colour carries meaning.
     * Don't reach for one to make a tile "stand out"; use size or placement.
     *
     * (Until 2026-08-06 there were `neutral` / `brand` / `subdued` variants too. They
     * rendered as three near-identical greys — `brand` was `bg-primary/10`, and a 10%
     * brand wash over white composites to a pale grey, not blue — and every one of them
     * resolved to a single shared value on a branded org, so the API was promising a
     * distinction it could not deliver.)
     */
    tone?: "default" | "warning" | "success" | "destructive";
    /**
     * rounded = rounded-lg (default). xl = rounded-xl (softer card-style tiles).
     * full = rounded-full (avatar-style / status circles).
     */
    shape?: "rounded" | "xl" | "full";
    className?: string;
}
/**
 * The icon swatch used next to stat values, list rows and feature cards
 * (dashboard, analytics, coverage). One primitive instead of every page
 * re-rolling `size-N rounded-lg bg-* flex items-center justify-center`.
 *
 * Leave `tone` alone unless the tile represents a status the user must act on.
 */
declare function IconTile({ children, size, tone, shape, className }: IconTileProps): React$1.JSX.Element;

interface InputProps extends Omit<React$1.ComponentProps<"input">, "prefix"> {
    prefix?: React$1.ReactNode;
    suffix?: React$1.ReactNode;
    wrapperClassName?: string;
}
declare const Input: React$1.ForwardRefExoticComponent<Omit<InputProps, "ref"> & React$1.RefAttributes<HTMLInputElement>>;

/**
 * Shared styling for clickable **non-button** surfaces — cards, list rows,
 * chips, selectable tiles, and icon hit-areas. Apply it to a raw `<button>`
 * (or `<a>`) instead of hand-rolling hover / focus / radius every time.
 *
 * For a standard action button (submit / cancel / CTA / icon action) use
 * `<Button>` from `@/components/ui/button` instead — not this.
 *
 * Why this exists: clickable cards/chips kept reinventing their own
 * `hover:` / `rounded-*` / focus styling (and most omitted a focus-visible
 * ring entirely — an a11y gap). This centralises all of that.
 *
 * @example
 * <button className={cn(interactiveSurface({ variant: "card" }), "p-3")}>
 *   …arbitrary card content…
 * </button>
 *
 * @example  selectable tile
 * <button className={cn(interactiveSurface({ variant: "tile", selected: isActive }))}>
 */
declare const interactiveSurface: (props?: ({
    variant?: "row" | "icon" | "card" | "chip" | "tile" | null | undefined;
    touch?: boolean | null | undefined;
    selected?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type InteractiveSurfaceVariants = VariantProps<typeof interactiveSurface>;
/**
 * a11y props for a clickable NON-button element (div/li/tr/span acting as a
 * control). Spread onto the element next to its existing `onClick`.
 * - role "button" activates on Enter+Space; "link" activates on Enter only.
 * - guardNested: when the element contains its own interactive children
 *   (buttons, links, inputs), pass true so key events that bubbled up from
 *   those children are ignored (only the element itself activates).
 */
declare function activateProps(onActivate: () => void, opts?: {
    role?: "button" | "link";
    guardNested?: boolean;
}): {
    role: "link" | "button";
    tabIndex: 0;
    onKeyDown: (e: KeyboardEvent) => void;
};

declare function Label({ className, ...props }: React$1.ComponentProps<typeof Label$1.Root>): React$1.JSX.Element;

/**
 * The nested-overlay contract: what a portaled overlay (Popover, Select, DropdownMenu, …) must
 * carry so it still works when it is opened *inside* an open modal.
 *
 * ── THE BUG THIS EXISTS TO PREVENT ────────────────────────────────────────────────────────────
 *
 * A Radix Popover inside a modal Dialog has already shipped here rendered but **unclickable**.
 * Measured on 2026-08-05 (frontend/scripts/responsive/nested-overlay.mjs), inside an open Credenza:
 *
 *     body            pointer-events: none      <- set by the Dialog's DismissableLayer
 *     dialog-content  pointer-events: auto      <- restored for the modal itself
 *     popover-content pointer-events: none      <- INHERITED from body. Dead.
 *
 * Radix has machinery for exactly this: every `DismissableLayer` registers in a shared context, and
 * a layer stacked above the one that disabled outside pointer events re-enables them on itself
 * (`isPointerEventsEnabled` -> inline `pointer-events: auto`). It never fired here.
 *
 * ── WHY IT NEVER FIRED (the actual root cause) ────────────────────────────────────────────────
 *
 * `DismissableLayerContext` is a MODULE-LEVEL singleton — `React.createContext(...)` with no
 * Provider anywhere. It therefore only works if every overlay shares one copy of the module. This
 * tree installs **five**, because npm nested a copy under each consumer and `vite.config.ts`
 * deduped only react/react-dom/react-router-dom/three:
 *
 *     radix-ui > Dialog       @radix-ui/react-dialog/node_modules/@radix-ui/react-dismissable-layer
 *     radix-ui > Popover      radix-ui/node_modules/@radix-ui/react-dismissable-layer
 *     radix-ui > Select       @radix-ui/react-select/node_modules/@radix-ui/react-dismissable-layer
 *     radix-ui > Tooltip      @radix-ui/react-tooltip/node_modules/@radix-ui/react-dismissable-layer
 *     radix-ui > DropdownMenu @radix-ui/react-dismissable-layer
 *
 * Five copies, five private layer registries. The Popover's registry cannot see that the Dialog
 * disabled outside pointer events, so it reports `isBodyPointerEventsDisabled === false`, writes no
 * inline style, and inherits `none`.
 *
 * Select, DropdownMenu and ContextMenu escape this by accident: they pass
 * `disableOutsidePointerEvents: true`, so each disables pointer events *in its own registry* and is
 * therefore the top layer there — it self-rescues. Popover (`modal={false}` by default), Tooltip and
 * HoverCard pass `false`, and are the ones that die. That is precisely the observed pattern: a
 * `Select` inside a Credenza has always worked, a `DatePicker` (a Popover underneath) has not.
 *
 * ── THE FIX ───────────────────────────────────────────────────────────────────────────────────
 *
 * Write what Radix would have written if the module were shared. `pointer-events-auto` on the
 * overlay's own content is a no-op when no modal is open (body is already `auto`) and is exactly
 * the value Radix computes when one is, so it is correct in both states rather than a workaround
 * for one of them.
 *
 * The layer token replaces DOM-insertion-order luck. Before this, every overlay in the app — modal
 * shells and nested dropdowns alike — was `z-50`, so "the popover paints above the dialog" held
 * only because the popover's portal happened to be appended later. `--z-overlay-nested` states it
 * instead of relying on it.
 *
 * ── THE RULE ──────────────────────────────────────────────────────────────────────────────────
 *
 * Fix it here, once. A feature component must never need to know: if a call site has to add
 * `pointer-events-auto`, a `container={dialogRef}` or a hand-rolled `zIndex: 9999` portal to make a
 * dropdown work inside a modal, the primitive is still wrong. An ESLint fence
 * (eslint.nested-overlay-fence-baseline.mjs) enforces that.
 *
 * The root cause could also be fixed at the resolver — adding
 * `@radix-ui/react-dismissable-layer` to `resolve.dedupe` in vite.config.ts, plus an npm
 * `overrides` entry to collapse the five copies to one. That is the smaller and more complete fix
 * and it would also repair Tooltip/HoverCard/NavigationMenu, but it depends on the shape of the
 * installed tree (which changes on every `npm install`) and could not be validated here because
 * `npm install` currently fails EPERM on the `equate-monorepo` symlink. This class-level fix does
 * not depend on the tree shape at all, so it holds either way — keep it even if the dedupe lands.
 */
/**
 * ── WHO CARRIES THIS ──────────────────────────────────────────────────────────────────────────
 *
 * Carrying it:  popover (and therefore date-picker + time-select), select, dropdown-menu, combobox.
 *               Every one of these demonstrably opens inside a modal in this app.
 *
 * NOT carrying it, deliberately: context-menu, menubar, hover-card, navigation-menu. They are
 * still `z-50` and still inherit `pointer-events: none` inside a modal — left alone only because
 * nothing in this app opens one inside a modal, and changing the stacking of surfaces nobody is
 * testing buys risk for no coverage. **If you put one inside a modal, add `nestedOverlayLayer` to
 * it and add a case to scripts/responsive/nested-overlay.mjs** — do not rediscover this from
 * scratch.
 *
 * Tooltip is the one exception that needed a fix rather than a shrug: it sits on its own
 * `--z-tooltip: 70` tier (index.css), ABOVE `--z-overlay-nested`'s 55 — a tooltip must out-rank
 * any overlay it can be triggered from, nested-in-a-modal or not. Before 2026-08-07 `TooltipContent`
 * hardcoded `z-50`, which lost to a plain (non-modal) Popover at `z-55` — hovering the "mark all
 * read" tick in the GlobalHeader notification Popover rendered its tooltip UNDER the popover panel.
 * `pointer-events: none` inside a modal is still nobody's problem here: nothing in this app clicks
 * a tooltip, only hovers/focuses it.
 */
/**
 * Apply to the CONTENT of any portaled overlay that can be opened from inside a modal.
 * Not for the modal shells themselves (Dialog/Drawer/Sheet/AlertDialog) — those own
 * `--z-overlay`, the layer this one deliberately sits above.
 */
declare const nestedOverlayLayer = "z-(--z-overlay-nested) pointer-events-auto";

interface PhoneCountry {
    iso: CountryCode;
    dialCode: string;
    name: string;
    /** Sample national number, used as the field placeholder. */
    example: string;
    /**
     * National digit count, or an inclusive range. Used to *classify* a rejection
     * as too short vs too long and to name the counts in the message —
     * `isValid()` still owns the pass/fail call, so a stale entry here makes a
     * message vaguer, never a verdict wrong.
     */
    digits: number | [number, number];
    /** National trunk prefix, dropped when the number is written with a dial code. */
    trunkPrefix?: string;
}
/**
 * Keyed by ISO country, not dial code. Dial codes aren't unique (US and Canada
 * both use +1), and libphonenumber needs a country — not a calling code — to
 * apply the right digit rules.
 *
 * Order matters: `countryForDialCode` resolves a shared dial code to whichever
 * country appears first, so the primary for +1 is US.
 */
declare const PHONE_COUNTRIES: readonly PhoneCountry[];
declare const DEFAULT_PHONE_COUNTRY: CountryCode;
declare const DEFAULT_COUNTRY_CODE = "+61";
/** Country metadata for an ISO code, falling back to the default country. */
declare function phoneCountry(iso: CountryCode | null | undefined): PhoneCountry;
/**
 * Map a stored dial code back to an ISO country. Ambiguous codes resolve to the
 * first match in `PHONE_COUNTRIES` (+1 → US), which is all we can do — the
 * columns only ever held a dial code, so US and Canada were never
 * distinguishable in the first place.
 */
declare function countryForDialCode(dial: string | null | undefined): CountryCode;
/** Dial code for an ISO country, e.g. "AU" → "+61". */
declare function dialCodeForCountry(iso: CountryCode | null | undefined): string;
/**
 * Narrow a loose geo-IP country signal to a country we actually offer.
 *
 * The landing site's `detectCountry()` returns whatever Cloudflare reports —
 * any ISO code, or `undefined` in local dev — so it can name a country that
 * isn't in `PHONE_COUNTRIES`. Anything unrecognised falls back to the default
 * rather than being trusted into a dial code we can't store.
 */
declare function phoneCountryFromGeo(country: string | null | undefined): CountryCode;
/**
 * Legacy dial-code list, kept for the `{ label, value }` Select shape. Deduped
 * by dial code because Select values must be unique — that's why Canada isn't
 * here even though it is in `PHONE_COUNTRIES`.
 *
 * New code should use `PHONE_COUNTRIES` via `PhoneInput` instead.
 */
declare const COUNTRY_CODES: {
    label: string;
    value: string;
}[];
type PhoneIssue = "too_short" | "too_long" | "invalid" | "unsupported_country";
interface PhoneValidation {
    /** False only when a non-empty input failed. Empty is fine — phone is optional everywhere. */
    ok: boolean;
    /** National digits to store in `phone_number`. Null when the input was empty or invalid. */
    local: string | null;
    e164: string | null;
    /** National format for display, e.g. "447 043 900". */
    formatted: string | null;
    issue: PhoneIssue | null;
    /** i18n key under the `common` namespace. Null when there's nothing to report. */
    messageKey: string | null;
    /** Expected national digit count as copy, e.g. "9" or "8-10". */
    expectedDigits: string | null;
    /** National digits the user actually supplied, after dial code + trunk prefix. */
    actualDigits: number;
    /** True when a leading trunk zero was dropped — drives the "you don't need the 0" hint. */
    strippedTrunkPrefix: boolean;
    /** Set when the input carried its own country code, so the caller can switch the dropdown. */
    detectedCountry: CountryCode | null;
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
declare function validatePhone(iso: CountryCode, raw: string | null | undefined): PhoneValidation;
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
declare function normalizeLocalNumber(raw: string | null | undefined): string | null;
/**
 * Build a `tel:` href from a country code + local number, e.g.
 * formatTelHref("+61", "412345678") → "tel:+61412345678". Returns null when
 * the number is missing/too short so callers can hide the link.
 */
declare function formatTelHref(countryCode: string | null | undefined, localNumber: string | null | undefined): string | null;
/**
 * Human-readable phone for display, e.g. "+61 412 345 678". Grouped the way the
 * number's own country writes it when it parses; falls back to "<code> <digits>"
 * for rows that don't (older free-text values, unlisted countries).
 */
declare function formatPhoneDisplay(countryCode: string | null | undefined, localNumber: string | null | undefined): string | null;

interface PhoneInputProps {
    /** ISO country, not a dial code — see the note on `PHONE_COUNTRIES`. */
    country: CountryCode;
    onCountryChange: (country: CountryCode) => void;
    /** Raw text exactly as typed. The caller stores `validation.local`, not this. */
    value: string;
    onValueChange: (value: string) => void;
    /** Fires whenever the verdict changes, so forms can gate submit on `.ok`. */
    onValidationChange?: (validation: PhoneValidation) => void;
    id?: string;
    name?: string;
    disabled?: boolean;
    className?: string;
    /** Overrides the country's own example number. */
    placeholder?: string;
    /** Reveal errors without waiting for blur — set this once a form is submitted. */
    showErrors?: boolean;
    /** Form-level error text, shown instead of the component's own message. */
    error?: string | null;
    /** Suppress the built-in error/hint line, for forms that render their own. */
    hideMessages?: boolean;
    inputRef?: Ref<HTMLInputElement>;
    "aria-label"?: string;
    "aria-describedby"?: string;
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
declare function PhoneInput({ country, onCountryChange, value, onValueChange, onValidationChange, id, name, disabled, className, placeholder, showErrors, error, hideMessages, inputRef, "aria-label": ariaLabel, "aria-describedby": ariaDescribedBy, }: PhoneInputProps): React$1.JSX.Element;
/**
 * Resolve a validation result to display copy.
 *
 * Every key is written out literally rather than passed through as
 * `t(validation.messageKey)` — `scripts/check-i18n-keys.mjs` only verifies
 * static keys, and a dynamic one would silently skip the guard that exists
 * precisely because raw keys once shipped to production.
 */
declare function phoneMessage(t: (key: string, vars?: Record<string, unknown>) => string, validation: PhoneValidation, country: PhoneCountry): string | null;
interface PhoneCountrySelectProps {
    value: CountryCode;
    onValueChange: (country: CountryCode) => void;
    disabled?: boolean;
    className?: string;
    id?: string;
    "aria-label"?: string;
}
/**
 * The country dropdown on its own, for places that pick a country without
 * taking a number alongside it — the roster importer's "what country are these
 * numbers from?" step.
 */
declare function PhoneCountrySelect({ value, onValueChange, disabled, className, id, "aria-label": ariaLabel, }: PhoneCountrySelectProps): React$1.JSX.Element;

interface QueryErrorStateProps {
    message?: string;
    onRetry?: () => void;
    retryLabel?: string;
    layout?: "column" | "row";
}
declare function QueryErrorState({ message, onRetry, retryLabel, layout, }: QueryErrorStateProps): React$1.JSX.Element;

declare function Select({ ...props }: React$1.ComponentProps<typeof Select$1.Root>): React$1.JSX.Element;
declare function SelectGroup({ className, ...props }: React$1.ComponentProps<typeof Select$1.Group>): React$1.JSX.Element;
declare function SelectValue({ ...props }: React$1.ComponentProps<typeof Select$1.Value>): React$1.JSX.Element;
/**
 * The dropdown-trigger chrome (border, radius, control height, focus ring).
 *
 * Exported because `Select` is not the only control that must wear it — the
 * multi-select facet filter opens a Popover, not a Radix Select, yet has to be
 * pixel-identical beside one in a filter row. Importing this is the ONLY
 * sanctioned way to get that look; hand-copying the string is what put six
 * different `border-primary/N` values into the codebase, and the design-drift
 * ratchet now fails the build for it.
 */
declare const selectTriggerClass = "border-input data-[placeholder]:text-muted-foreground bg-background hover:bg-accent-hover hover:text-foreground data-open:bg-muted data-open:text-foreground focus-visible:border-primary/50 focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 gap-1.5 rounded-(--control-radius) border px-(--control-padding-x) py-2 text-sm shadow-(--control-shadow) transition-colors focus-visible:ring-1 aria-invalid:ring-[3px] data-[size=default]:h-(--control-height) data-[size=sm]:h-(--control-height-sm) data-[size=lg]:h-(--control-height-lg) pointer-coarse:min-h-(--control-height-touch) *:data-[slot=select-value]:flex *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0";
declare function SelectTrigger({ className, size, iconVariant, hideIcon, children, ...props }: React$1.ComponentProps<typeof Select$1.Trigger> & {
    /** "lg" (40px, `--control-height-lg`) matches a `SlidingPillNav` pill's actual
     *  rendered height when a `Select` sits inline beside one — the pill nav's own
     *  `p-1` wrapper plus its `py-1.5` button padding puts it 4px taller than the
     *  default 36px control height, which is invisible until the two share a row. */
    size?: "sm" | "default" | "lg";
    iconVariant?: "unfold" | "chevron";
    /** Drops the chevron entirely — for a trigger whose `children` is ALREADY a
     *  self-explanatory icon (e.g. a bare view-type glyph in an icon-only
     *  compact mode): the chevron then has nothing to add, and its width
     *  pushes that lone icon off-center inside a fixed-width trigger (the base
     *  class's `justify-between` splits the two apart instead of centering
     *  one). Not the default — every OTHER Select genuinely needs the chevron
     *  as its only "this opens a menu" affordance. */
    hideIcon?: boolean;
}): React$1.JSX.Element;
declare function SelectContent({ className, children, position, align, ...props }: React$1.ComponentProps<typeof Select$1.Content>): React$1.JSX.Element;
declare function SelectLabel({ className, ...props }: React$1.ComponentProps<typeof Select$1.Label>): React$1.JSX.Element;
declare function SelectItem({ className, children, ...props }: React$1.ComponentProps<typeof Select$1.Item>): React$1.JSX.Element;
declare function SelectSeparator({ className, ...props }: React$1.ComponentProps<typeof Select$1.Separator>): React$1.JSX.Element;
declare function SelectScrollUpButton({ className, ...props }: React$1.ComponentProps<typeof Select$1.ScrollUpButton>): React$1.JSX.Element;
declare function SelectScrollDownButton({ className, ...props }: React$1.ComponentProps<typeof Select$1.ScrollDownButton>): React$1.JSX.Element;

/**
 * Shared layout constants and route-to-layout mapping.
 * Single source of truth for skeleton layout matching.
 *
 * This is the THIRD route registry in the app, after `lib/shell-chrome.ts` (which mount
 * owns the chrome) and each contextual layout's own `backDestination`. It answers a
 * different question — how WIDE is the rail the skeleton should draw — so it stays
 * separate, but a route missing here is not harmless: it falls through to
 * `'full-width'`, the skeleton paints with no rail at all, and the real rail snaps in
 * on hydration. That was happening on EVERY load of the tutor and parent home pages
 * until 2026-08-09, because the map had no entry for either. `layout-config.unit.test.ts`
 * now asserts that every AppShell route resolves to a sidebar hint, so the next route
 * added without an entry fails a test instead of shipping a flash.
 */
type LayoutHint = 'full-width' | 'sidebar-64' | 'sidebar-72' | 'sidebar-80' | 'sidebar-icon';
declare function getLayoutHint(pathname: string): LayoutHint;
declare function getSidebarWidthClass(hint: LayoutHint): string;

/**
 * Shell-shaped skeleton that mirrors the authenticated layout structure.
 *
 * ONLY for the two callers that render before any shell chrome exists at all:
 * ProtectedRoute and App.tsx's RouteSpinner. Anything mounted inside the shell's
 * <Outlet/> — the RequireRole / RequireOrgRole / RequireAdmin guards — already
 * has a real GlobalHeader above it and must use `SkeletonContent` instead;
 * using this there drew a second header stacked under the real one.
 *
 * Structure mirrors BaseAuthenticatedLayout: a viewport-height flex COLUMN with an
 * in-flow `shrink-0` header and a `flex-1 min-h-0` content region. It used to render the
 * header `fixed top-0` — which the old docstring called "identical positioning to the real
 * Navbar", but GlobalHeader is in-flow (`shrink-0`), not fixed. The consequence was that the
 * content region started at y=0 and rendered UNDERNEATH the header skeleton. That was
 * invisible while the sidebar-* content area was blank; it stopped being invisible the moment
 * that area started rendering anything.
 *
 * `h-screen` IS correct here, unlike inside the shell: ShellSkeleton renders *instead of*
 * BaseAuthenticatedLayout (from ProtectedRoute / RouteSpinner), so it genuinely owns the
 * viewport. `SkeletonContent` is the variant used inside the shell, and that one is `h-full`.
 *
 * Accepts a `layout` hint so the content area matches the target page structure.
 */
declare function ShellSkeleton({ layout }?: {
    layout?: LayoutHint;
}): React$1.JSX.Element;
/**
 * Content-area-only skeleton (no navbar).
 * For every caller that renders inside the shell, where the real GlobalHeader is
 * already mounted: BaseAuthenticatedLayout's Suspense fallback and the
 * RequireRole / RequireOrgRole / RequireAdmin guards.
 */
declare function SkeletonContent({ layout }?: {
    layout?: LayoutHint;
}): React$1.JSX.Element;

/**
 * Decorative loading placeholder. Hidden from assistive tech — screen readers
 * should hear ONE announcement per loading region, not a pile of empty divs.
 * Wrap a skeleton layout in <SkeletonGroup> to get that announcement
 * (role="status" live region + visually-hidden label + aria-busy).
 * See docs/standards/loading-states.md.
 */
declare function Skeleton({ className, ...props }: React.ComponentProps<"div">): React$1.JSX.Element;
/**
 * Accessible container for a skeleton layout. Announces its label once via a
 * polite live region; the pulse divs inside stay decorative. Replace the whole
 * group with real content when data arrives (the live region disappears with it).
 */
declare function SkeletonGroup({ className, label, children, ...props }: React.ComponentProps<"div"> & {
    label?: string;
}): React$1.JSX.Element;

declare function ItemListSkeleton({ count }: {
    count?: number;
}): React$1.JSX.Element;
declare function CardListSkeleton({ count }: {
    count?: number;
}): React$1.JSX.Element;
declare function ChatSkeleton(): React$1.JSX.Element;
declare function PageGridSkeleton({ cols, count, }: {
    cols?: 2 | 3;
    count?: number;
}): React$1.JSX.Element;

declare function Textarea({ className, ...props }: React$1.ComponentProps<"textarea">): React$1.JSX.Element;

/**
 * Derives up to 2 initials from a name, falling back to email or "?".
 */
declare function getInitials(name?: string | null, email?: string | null): string;
interface UserAvatarProps {
    name?: string | null;
    email?: string | null;
    avatarUrl?: string | null;
    size?: "sm" | "default" | "lg" | null;
    className?: string;
}
declare function UserAvatar({ name, email, avatarUrl, size, className }: UserAvatarProps): React$1.JSX.Element;

type EventProps = Record<string, string | number | boolean | null | undefined>;
/**
 * Identify the signed-in user to PostHog, or reset on sign-out.
 * Call this beside `identifyUser()` (Sentry) so both stay in sync.
 */
declare function identifyAnalytics(user: {
    id: string;
    email?: string | null;
    name?: string | null;
} | null): void;
/** Capture a product-analytics event. No-ops when PostHog isn't initialised. */
declare function trackEvent(event: string, props?: EventProps): void;

/** Marketing-site origin the badge links back to. Mirrors
 *  components/landing/brand.ts BASE_URL (which stays the landing bundle's
 *  canonical constant — re-exported here so lib/ has no landing import). */
declare const BADGE_BASE_URL = "https://classquill.com";
type BadgeVariant = "dark" | "light";
declare function badgeEmbedCode(variant: BadgeVariant, orgSlug?: string | null): string;

/** Which brand's public marketing blog a post belongs to. */
type BlogBrand = "classquill" | "equateit";
/** Author social links — the platform set is variable over time, so this is a
 *  loose bag rather than fixed columns. */
interface AuthorSocialLinks {
    twitter?: string;
    linkedin?: string;
    website?: string;
}
/** One author of a post — either an internal team member (profileId set, with a
 *  resolved profile + author_profiles row) or a lightweight guest credit. */
interface BlogAuthor {
    profileId: string | null;
    guestName: string | null;
    guestAvatarUrl: string | null;
    displayOrder: number;
    /** Resolved from profiles (internal authors only). */
    fullName: string | null;
    avatarUrl: string | null;
    /** author_profiles.slug — internal authors only; drives /blog/author/<slug>. */
    slug: string | null;
    bio: string | null;
    socialLinks: AuthorSocialLinks;
}
interface BlogPostMeta {
    id: string;
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    /** Denormalised primary-author display name — cache + fallback when `authors`
     *  is empty (legacy/unmigrated posts). */
    author: string;
    /** Ordered authors (display_order asc; index 0 = primary). May be empty. */
    authors: BlogAuthor[];
    tags: string[];
    featuredImage?: string;
    status: "draft" | "published";
    brand: BlogBrand;
    scheduledAt?: string;
    /** Overrides for <title>/<meta description> — decoupled from the editorial
     *  title/excerpt shown as the H1/teaser, which can run longer than an ideal
     *  SEO title/description. Falls back to title/excerpt when unset. */
    metaTitle?: string;
    metaDescription?: string;
    /** Canonical URL override for syndicated copies; unset ⇒ self-canonical. */
    canonicalUrl?: string;
}
interface BlogPost extends BlogPostMeta {
    content: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Pick the posts most related to `current` from `all`, ranked by tag overlap,
 * then FILLED to `limit` with the most-recent remaining posts when tag matches
 * run short.
 *
 * Ranking: most shared tags first; ties broken by newest `date`. If fewer than
 * `limit` posts share a tag, the remainder is topped up with the newest
 * non-matching posts so the "Read next" module never silently disappears just
 * because tags don't overlap. The current post is always excluded. Returns
 * fewer than `limit` only when there genuinely aren't enough other posts.
 *
 * Mirrors the edge function's `relatedWithFallback` (supabase/functions/
 * _shared/blogRender.ts) so tenant SSR and the first-party marketing blog
 * behave identically.
 */
declare function getRelatedPosts(current: BlogPostMeta, all: BlogPostMeta[], limit?: number): BlogPostMeta[];

/**
 * Estimate reading time for a post body, in whole minutes.
 *
 * Counts whitespace-separated words and divides by an average adult reading
 * speed (~200 wpm), rounded to the nearest minute with a floor of 1 — even a
 * one-line post reads as "1 min read", never "0".
 */
declare function getReadingTimeMinutes(content: string): number;

/** Set by frontend/functions/api/geo.js; read directly on a cache hit. */
declare const EU_COOKIE_NAME = "cq_eu_visitor";
/** localStorage key for the visitor's accept/reject decision. */
declare const CONSENT_STORAGE_KEY = "cq_cookie_consent";
/** Dispatched on `window` the moment a decision is recorded. */
declare const CONSENT_EVENT = "cq:consent-changed";
type ConsentDecision = 'granted' | 'denied';
declare global {
    interface Window {
        __cqLoadClarity?: () => void;
        __cqLoadElu?: () => void;
    }
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
declare function resolveEuGated(): Promise<boolean>;
declare function getStoredConsent(): ConsentDecision | null;
declare function setStoredConsent(value: ConsentDecision): void;
/** Loads whichever gated scripts exist on this shell — both are optional no-ops elsewhere. */
declare function loadGatedScripts(): void;

/** All CTA identifiers — keep in sync with docs/analytics-landing.md. */
type LandingCtaId = "hero_demo" | "hero_trial" | "nav_demo" | "nav_trial" | "nav_login" | "pricing_trial" | "pricing_demo" | "pricing_addon_demo" | "pricing_page_trial" | "pricing_page_demo" | "cta_demo" | "cta_trial" | "footer_demo" | "about_demo" | "about_trial" | "compare_demo" | "compare_trial" | "compare_hub_demo" | "compare_hub_trial" | "changelog_demo" | "changelog_trial" | "features_hub_demo" | "features_hub_trial" | "feature_page_demo" | "feature_page_trial" | "segment_demo" | "segment_trial" | "segments_hub_demo" | "segments_hub_trial" | "vertical_demo" | "vertical_trial" | "verticals_hub_demo" | "verticals_hub_trial" | "solutions_hub_demo" | "solutions_hub_trial" | "switch_page_demo" | "switch_page_trial" | "integration_demo" | "integration_trial" | "au_category_demo" | "au_category_trial" | "faq_page_demo" | "faq_page_trial" | "offer_trial" | "offer_demo" | `hero_tab_${string}`;
/**
 * The hand-written ids only. `hero_tab_${string}` MUST be excluded before any
 * stem inference: matching an open template literal against `${infer Stem}_x`
 * infers `Stem = string`, which widens the derived union to plain `string` and
 * silently turns the guard below into a no-op that accepts anything.
 */
type ExplicitCtaId = Exclude<LandingCtaId, `hero_tab_${string}`>;
/** Every explicit LandingCtaId ending in `_<suffix>`, reduced to its stem. */
type StemsWith<S extends string> = ExplicitCtaId extends infer T ? T extends `${infer Stem}_${S}` ? Stem : never : never;
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
type CtaLocation = StemsWith<"trial"> & StemsWith<"demo">;
declare function initLandingPostHog(): void;
/** Defer init past first paint: window load → idle callback. */
declare function scheduleLandingPostHogInit(): void;
declare function trackCta(cta: LandingCtaId): void;
/**
 * Trial CTA click. send_instantly because a hard navigation to the app origin
 * follows immediately — the default batching would lose the event.
 */
declare function trackSignupStart(source: LandingCtaId): void;
/**
 * Append cross-domain attribution to an app path for the signup hand-off.
 * The app project auto-captures the utm_* params on its own $pageview; the
 * app-side `signup_completed` event additionally records utm_content (source)
 * and ph_did (this surface's distinct_id) as plain properties. We deliberately
 * accept split funnels across the two projects — no identity stitching.
 */
declare function withAttribution(path: string, ctaId: LandingCtaId): string;

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
declare const TENANT_ROOT_DOMAINS: readonly ["equateit.com.au", "classquill.com"];
declare const RESERVED_SLUGS: Set<string>;
/**
 * If the hostname is `<slug>.<tenant-root>` (e.g. `acme.equateit.com.au` or
 * `acme.classquill.com`), returns the slug. Returns null for a bare root domain,
 * a reserved slug, or any host not under a configured tenant root.
 *
 * Accepts an explicit hostname for testability; defaults to window.location.hostname.
 */
declare function getOrgSlugFromHostname(hostname?: string): string | null;
/**
 * App hosts — the first-party `app.*` hosts where `/` must land on the APP entry (login),
 * NOT the ClassQuill marketing landing: `app.classquill.com`, `app.equateit.com.au` (and the
 * legacy `app.equateit.com`). The marketing site is served from its own build on the bare roots
 * (`classquill.com`), so within the app build the only hosts that should skip the marketing
 * landing are the `app.` subdomains (native shells are handled separately by `isNative()`).
 *
 * Accepts an explicit hostname for testability; defaults to window.location.hostname.
 */
declare function isAppHost(hostname?: string): boolean;
/**
 * App hosts are the logged-in app entry (login), never a marketing surface — they must not be
 * indexed, or `app.classquill.com` / `app.equateit.com.au` would duplicate and compete with the
 * marketing site in search. Inject a robots `noindex` meta when on an app host. Host-specific so
 * tenant portals (`<slug>.classquill.com`) and customer custom domains — which MAY want indexing —
 * are left untouched. Idempotent. Uses the REAL hostname (not the `?tenantHost=` dev override).
 * Returns whether a noindex meta is present afterwards (for tests).
 */
declare function applyNoindexForAppHost(doc?: Document, hostname?: string): boolean;
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
type Tenant = {
    kind: 'main';
} | {
    kind: 'subdomain';
    slug: string;
    host: string;
} | {
    kind: 'custom_domain';
    host: string;
};
declare function resolveTenant(hostname?: string): Tenant;
/**
 * The hostname tenant resolution should use. Honours a `?tenantHost=<host>` query param (persisted
 * to sessionStorage, mirroring appVariant's `?variant=`) so a developer can drive the subdomain /
 * custom-domain code paths on localhost without real DNS. Falls back to the real hostname.
 */
declare function getEffectiveHostname(): string;

type ErrorSeverity = 'fatal' | 'error' | 'warning';
interface NormalizedError {
    /** A real Error with a human-readable message — never "[object Object]". */
    error: Error;
    /** Structured fields pulled off the original (e.g. PostgREST code/hint), prefixed `error_*`. */
    fields: Record<string, unknown>;
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
declare function normalizeError(error: unknown): NormalizedError;
declare function reportError(error: unknown, context: string, extra?: Record<string, unknown>, severity?: ErrorSeverity): void;
declare function reportMessage(message: string, context: string, extra?: Record<string, unknown>, severity?: ErrorSeverity): void;
declare function identifyUser(user: {
    id: string;
    email?: string;
    name?: string;
} | null): void;
declare function addBreadcrumb(category: string, message: string, data?: Record<string, unknown>, level?: Sentry.SeverityLevel): void;

declare function cn(...inputs: ClassValue[]): string;
/**
 * Resolve a design token to its current computed value.
 *
 * For the few consumers that cannot use a CSS class or a raw `var()` reference —
 * cross-origin iframes (Stripe Elements), canvas, and PDF generation. Reading the
 * token keeps those surfaces correct in dark mode and under org branding, which a
 * hard-coded hex silently would not be.
 *
 * Prefer a Tailwind class everywhere else. Note our tokens are raw hex, so
 * `hsl(var(--x))` is invalid CSS and gets dropped — pass `var(--x)` or use this.
 */
declare function tokenValue(name: string, fallback?: string): string;

type SupportedLanguageCode = 'en' | 'de' | 'es' | 'fr' | 'nl';
interface Language {
    code: SupportedLanguageCode;
    label: string;
    flag: string;
    /** ISO 3166-1 alpha-2 country code for the flag-icons package (`fi fi-<flagCountry>`). */
    flagCountry: string;
}
declare const SUPPORTED_LANGUAGES: Language[];
declare const SUPPORTED_CODES: readonly SupportedLanguageCode[];
/** Returns true if `code` is a supported language code. */
declare function isSupportedLanguage(code: string): code is SupportedLanguageCode;

declare const PRODUCT_NAME = "ClassQuill";
declare const PRODUCT_TAGLINE = "The operating system for your tutoring business.";
declare const BASE_URL = "https://classquill.com";
declare const AI_INTEGRATION_EMAIL = "info@classquill.com";
declare const AI_INTEGRATION_SUBJECT = "Automation enquiry";
declare const AI_INTEGRATION_MAILTO: string;
declare const FIND_A_TUTOR_PATH = "/find-tutor";
declare const LINKEDIN_URL = "https://www.linkedin.com/company/classquill/";
declare const CONTACT_EMAIL = "info@classquill.com";
declare const CONTACT_MAILTO = "mailto:info@classquill.com";
declare const CONTACT_PATH = "/contact/";
declare const EQUATEIT_URL = "https://equateit.com.au";
declare const DEMO_PATH = "/demo/";
declare const PRICING_PATH = "/pricing/";
declare const SIGNUP_PATH = "/auth-card?mode=signup&intent=educator";
declare const APP_URL: string;
/** Absolute URL for an app route (login, signup, marketplace). Pure → unit-tested. */
declare function buildAppUrl(path: string): string;
/** Hard-navigate to an app route — the marketing build can't route to it client-side. */
declare function goToApp(path: string): void;
declare const APP_STORE_URL = "https://apps.apple.com/app/id6766400569";
declare const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.equateit.app";

type RegionCode = "au" | "uk" | "us";
interface Region {
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
declare const REGIONS: Region[];
declare const DEFAULT_REGION: RegionCode;
declare const getRegion: (code: RegionCode) => Region;
/** Only regions safe to expose (routes / sitemap / hreflang). */
declare const publishedRegions: () => Region[];
/**
 * Resolve the active region from a pathname's first segment. Unknown or missing
 * segment → the default region. An UNPUBLISHED region segment also resolves to
 * default (its routes shouldn't exist, but never surface an ungated region).
 * Pure → unit-tested.
 */
declare function resolveRegion(pathname: string): RegionCode;
/** Strip a region segment from a path → the region-neutral route ("/uk/pricing" → "/pricing"). */
declare function stripRegion(pathname: string): string;
/** Absolute URL for a region + region-neutral route, trailing-slash normalised. */
declare function regionUrl(region: Region, neutralPath: string): string;
/**
 * hreflang alternates for a route: every PUBLISHED region's URL for the same
 * region-neutral path, plus x-default → the default region. Unpublished regions
 * are excluded (the honesty gate applied to SEO).
 */
declare function hreflangAlternates(currentPath: string): {
    hreflang: string;
    href: string;
}[];
type CurrencyCode = "USD" | "AUD" | "GBP" | "EUR";
interface Currency {
    code: CurrencyCode;
    symbol: string;
    /** Matches the flag-next-to-price affordance TutorBird uses. */
    flag: string;
    /** Multiplier from USD, e.g. 1 USD ≈ 1.5 AUD. */
    rateFromUsd: number;
}
declare const CURRENCIES: Record<CurrencyCode, Currency>;
declare const DEFAULT_CURRENCY: CurrencyCode;
/** ISO 3166-1 alpha-2 country code → currency. Pure → unit-tested. */
declare function currencyForCountry(country: string | undefined): CurrencyCode;
/** Round-trip USD → the target currency at the static approximate rate. */
declare function convert(usdAmount: number, currency: CurrencyCode): number;
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
declare function detectCountry(): string | undefined;
/**
 * Currency for the current visitor, resolved once and updated after mount
 * (see detectCurrency's doc comment on why USD is the safe initial value —
 * matches server-prerendered HTML, no hydration mismatch). Shared by every
 * landing surface that shows a price so they can never disagree with each
 * other about which currency is showing.
 */
declare function useLandingCurrency(): Currency;
declare function detectCurrency(): CurrencyCode;

interface LandingFaq {
    question: string;
    answer: string;
}
declare const faqs: LandingFaq[];

interface Breadcrumb {
    name: string;
    path: string;
}
interface StructuredDataProps {
    /** Include the SoftwareApplication/Product node (product/feature pages, home, pricing). */
    software?: boolean;
    /**
     * FAQs visibly rendered on the page. When present, an FAQPage node is emitted
     * whose questions/answers mirror this exact array (the same source the on-page
     * <FAQ> renders from), so the markup can never drift from the visible copy.
     * Google retired FAQ *rich results* on 7 May 2026, but the markup still feeds
     * AI-search/LLM answer extraction (Strategy 2 of the AEO pass) — so we emit it.
     */
    faqs?: LandingFaq[];
    /** Include a BreadcrumbList — sub-pages pass their trail from home. */
    breadcrumbs?: Breadcrumb[];
}
declare function StructuredData({ software, faqs, breadcrumbs }: StructuredDataProps): React$1.JSX.Element;

interface SEOHeadProps {
    title?: string;
    description?: string;
    path?: string;
    ogImage?: string;
    noIndex?: boolean;
    /** Brand name for the title suffix + og:site_name. Defaults to EquateIt (the B2C app). */
    siteName?: string;
    /** Canonical / OG base URL. Defaults to equateit.com.au; ClassQuill pages pass classquill.com. */
    baseUrl?: string;
    /** `<html lang>` — region locale (e.g. "en-AU"). Omitted → not set. */
    htmlLang?: string;
    /** og:locale — defaults to en_AU (the historical hardcoded value). */
    ogLocale?: string;
    /** hreflang alternates (region siblings + x-default). See landing/regions.ts. */
    alternates?: {
        hreflang: string;
        href: string;
    }[];
}
declare function SEOHead({ title, description, path, ogImage, noIndex, siteName, baseUrl, htmlLang, ogLocale, alternates, }: SEOHeadProps): React$1.JSX.Element;

type Props = Omit<ComponentProps<typeof SEOHead>, "siteName" | "baseUrl">;
declare function LandingSEOHead(props: Props): React$1.JSX.Element;

export { AI_INTEGRATION_EMAIL, AI_INTEGRATION_MAILTO, AI_INTEGRATION_SUBJECT, APP_STORE_URL, APP_URL, type AuthorSocialLinks, BADGE_BASE_URL, BASE_URL, Badge, type BadgeVariant, type BlogAuthor, type BlogBrand, type BlogPost, type BlogPostMeta, type Breadcrumb, Button, CONSENT_EVENT, CONSENT_STORAGE_KEY, CONTACT_EMAIL, CONTACT_MAILTO, CONTACT_PATH, COUNTRY_CODES, CURRENCIES, CardListSkeleton, ChatSkeleton, type ConsentDecision, type CtaLocation, type Currency, type CurrencyCode, DEFAULT_COUNTRY_CODE, DEFAULT_CURRENCY, DEFAULT_PHONE_COUNTRY, DEFAULT_REGION, DEMO_PATH, EQUATEIT_URL, EU_COOKIE_NAME, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyState, EmptyTitle, FIND_A_TUTOR_PATH, GOOGLE_PLAY_URL, IconTile, type IconTileProps, Input, type InteractiveSurfaceVariants, ItemListSkeleton, LINKEDIN_URL, Label, type LandingCtaId, type LandingFaq, LandingSEOHead, type Language, type LayoutHint, type NormalizedError, PHONE_COUNTRIES, PRICING_PATH, PRODUCT_NAME, PRODUCT_TAGLINE, PageGridSkeleton, type PhoneCountry, PhoneCountrySelect, type PhoneCountrySelectProps, PhoneInput, type PhoneInputProps, type PhoneIssue, type PhoneValidation, QueryErrorState, REGIONS, RESERVED_SLUGS, type Region, type RegionCode, SEOHead, SIGNUP_PATH, SUPPORTED_CODES, SUPPORTED_LANGUAGES, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, ShellSkeleton, Skeleton, SkeletonContent, SkeletonGroup, StructuredData, type SupportedLanguageCode, TENANT_ROOT_DOMAINS, type Tenant, Textarea, UserAvatar, activateProps, addBreadcrumb, applyNoindexForAppHost, badgeEmbedCode, badgeVariants, buildAppUrl, buttonVariants, cn, convert, countryForDialCode, currencyForCountry, detectCountry, detectCurrency, dialCodeForCountry, faqs, formatPhoneDisplay, formatTelHref, getEffectiveHostname, getInitials, getLayoutHint, getOrgSlugFromHostname, getReadingTimeMinutes, getRegion, getRelatedPosts, getSidebarWidthClass, getStoredConsent, goToApp, hreflangAlternates, identifyAnalytics, identifyUser, initLandingPostHog, interactiveSurface, isAppHost, isSupportedLanguage, loadGatedScripts, nestedOverlayLayer, normalizeError, normalizeLocalNumber, phoneCountry, phoneCountryFromGeo, phoneMessage, publishedRegions, regionUrl, reportError, reportMessage, resolveEuGated, resolveRegion, resolveTenant, scheduleLandingPostHogInit, selectTriggerClass, setStoredConsent, stripRegion, tokenValue, trackCta, trackEvent, trackSignupStart, useLandingCurrency, validatePhone, withAttribution };
