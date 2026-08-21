import type { KeyboardEvent } from "react"
import { cva, type VariantProps } from "class-variance-authority"

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
export const interactiveSurface = cva(
  // `active:bg-accent-hover` is not decoration. On a touch device `hover:` never fires, so
  // without a press state these 236 surfaces give ZERO feedback that a tap registered — the
  // single biggest gap the mobile audit found (docs/reviews/2026-08-09-mobile-sm-ui-audit.md).
  // It sits in the base rather than per-variant because every variant's hover resolves to the
  // same fill; the `selected` compound below pins it, since a selected surface is terminal.
  "cursor-pointer outline-none transition-colors focus-visible:ring-1 focus-visible:ring-ring/50 active:bg-accent-hover disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        /** Bordered card surface (clickable panel/row that looks like a Card). */
        card: "text-left rounded-lg border border-border bg-card hover:bg-accent-hover",
        /** Flush list row — no border, subtle hover. */
        row: "text-left rounded-md hover:bg-accent-hover",
        /** Pill / tag toggle. */
        chip: "rounded-full border border-border px-2.5 py-1 hover:bg-accent-hover",
        /** Selectable option tile (grid of choices). */
        tile: "text-left rounded-lg border border-border hover:border-primary/40 hover:bg-accent-hover",
        /**
         * Bare icon hit-area (no surface until hover). Centres its glyph explicitly: with the
         * touch floor below, the box grows to 44px and an un-centred glyph would sit at the top
         * of it. Several call sites pass no width/height at all (the section drill-down's back
         * control rendered 20×20), so the variant has to own the geometry.
         */
        icon: "inline-flex items-center justify-center rounded-md hover:bg-accent-hover",
      },
      /**
       * Minimum tap target on a coarse pointer (finger/stylus), per the ≥44px tier in
       * `--control-height-touch`. **Defaults to on** — this cva is the single largest
       * clickable-surface population in the app and essentially none of its call sites set a
       * height, so opting in per site would leave the default broken.
       *
       * `pointer-coarse:` is a capability query, not a width query: a 375px desktop window keeps
       * the compact size, a touch laptop gets the floor. That deliberately disagrees with
       * `useIsTouchDevice()` on hybrid devices — see mobile-design.md; the CSS answer is the one
       * that matches what the finger actually needs.
       *
       * `min-h` only ever grows a box, so a surface already ≥44px is untouched. Pass `false`
       * only for a surface that is decorative or nested INSIDE another tap target, where a 44px
       * floor would break the parent's layout rather than help the finger.
       */
      touch: {
        true: "pointer-coarse:min-h-(--control-height-touch)",
        false: "",
      },
      /**
       * Active/selected state. Interaction ladder:
       * rest → hover `accent-hover` (every variant, incl. `card`) → selected `primary-subdued`.
       *
       * `primary-subdued` is the app-wide SELECTION fill. It is deliberately a
       * different token from `badge-subdued`, the decorative well behind icon tiles,
       * avatars and chips — a selected surface and a decorative one must never read
       * the same. (Both, plus `--muted`, resolved to a single shared hex on branded
       * orgs until 2026-08-06; see hooks/useOrgBranding.ts.)
       *
       * NOT the same fill as `.nav-active`, despite an earlier comment here claiming
       * so: `--sidebar-accent` became a translucent neutral overlay on 2026-07-17, so
       * the nav rail's selection lets its own surface show through while these opaque
       * surfaces do not. Don't "resync" them — the rail is intentionally lighter.
       *
       * `hover:bg-primary-subdued` pins the hover to the rest state: a selected
       * surface is a terminal state, so it deliberately has no hover step.
       */
      selected: { true: "", false: "" },
    },
    compoundVariants: [
      {
        // `icon` is included: omitting it silently rendered NO selected styling at all,
        // and being a valid variant + a valid prop, nothing caught it.
        variant: ["card", "row", "tile", "chip", "icon"],
        selected: true,
        // `active:` is pinned alongside `hover:` for the same reason: a selected surface is a
        // terminal state, so pressing it must not flash back to the unselected fill.
        class: "bg-primary-subdued text-primary-subdued-foreground hover:bg-primary-subdued active:bg-primary-subdued",
      },
      {
        // An icon hit-area is square, so the floor has to apply on BOTH axes — a 20px-wide
        // button that is 44px tall is still a 20px-wide target.
        variant: "icon",
        touch: true,
        class: "pointer-coarse:min-w-(--control-height-touch)",
      },
    ],
    defaultVariants: { variant: "card", selected: false, touch: true },
  }
)

export type InteractiveSurfaceVariants = VariantProps<typeof interactiveSurface>

/**
 * a11y props for a clickable NON-button element (div/li/tr/span acting as a
 * control). Spread onto the element next to its existing `onClick`.
 * - role "button" activates on Enter+Space; "link" activates on Enter only.
 * - guardNested: when the element contains its own interactive children
 *   (buttons, links, inputs), pass true so key events that bubbled up from
 *   those children are ignored (only the element itself activates).
 */
export function activateProps(
  onActivate: () => void,
  opts?: { role?: "button" | "link"; guardNested?: boolean },
) {
  const role = opts?.role ?? "button"
  const guardNested = opts?.guardNested ?? false
  return {
    role,
    tabIndex: 0 as const,
    onKeyDown: (e: KeyboardEvent) => {
      if (guardNested && e.target !== e.currentTarget) return
      const hit = role === "link" ? e.key === "Enter" : e.key === "Enter" || e.key === " "
      if (hit) { e.preventDefault(); onActivate() }
    },
  }
}
