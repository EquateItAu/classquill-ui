import * as React from "react"

const SM_BREAKPOINT = 640
export const MOBILE_BREAKPOINT = 768
const LG_BREAKPOINT = 1024

/**
 * The viewport width, or `null` when it cannot be measured.
 *
 * 🔴 `window.innerWidth` is **0** in a background/hidden tab and in some
 * headless/automation contexts. Seeding a breakpoint from 0 makes every
 * `>= breakpoint` comparison false, so a desktop surface silently renders its
 * MOBILE branch — most visibly `<Credenza>` mounts a vaul Drawer instead of a
 * Dialog, which is a different component tree with different dismiss and focus
 * behaviour. Found 2026-08-07 while debugging a session dialog that rendered as
 * a drawer on a 1564px page whose `innerWidth` reported 0.
 *
 * 0 means "cannot measure", not "zero pixels wide", so it takes the same branch
 * as SSR (assume desktop) instead of asserting mobile.
 */
function viewportWidth(): number | null {
  if (typeof window === "undefined") return null
  const width = window.innerWidth
  return width > 0 ? width : null
}

/**
 * Subscribe to a breakpoint. `resolve` maps a measured width to the boolean;
 * `fallback` is used when the width is unmeasurable (SSR, hidden tab).
 *
 * A media-query event that arrives while the width is unmeasurable is IGNORED
 * rather than allowed to flip the value — otherwise backgrounding a tab could
 * swap a Dialog for a Drawer mid-session.
 */
function useBreakpoint(
  query: string,
  resolve: (width: number) => boolean,
  fallback: boolean,
): boolean {
  const [matches, setMatches] = React.useState<boolean>(() => {
    const width = viewportWidth()
    return width === null ? fallback : resolve(width)
  })

  React.useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => {
      const width = viewportWidth()
      if (width !== null) setMatches(resolve(width))
    }
    mql.addEventListener("change", onChange)
    onChange()
    return () => mql.removeEventListener("change", onChange)
    // `resolve` is a stable module-level predicate at every call site.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return matches
}

const atLeastMd = (w: number) => w >= MOBILE_BREAKPOINT
const atLeastLg = (w: number) => w >= LG_BREAKPOINT
const belowMd = (w: number) => w < MOBILE_BREAKPOINT
const belowSm = (w: number) => w < SM_BREAKPOINT

/**
 * @deprecated Prefer `useIsMd()` in new code (see frontend/CLAUDE.md). Kept for
 * the existing call sites; the unmeasurable-width fallback is `false` (desktop),
 * matching its long-standing `undefined` initial state.
 */
export function useIsMobile() {
  return useBreakpoint(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`, belowMd, false)
}

export function useIsLg() {
  return useBreakpoint(`(min-width: ${LG_BREAKPOINT}px)`, atLeastLg, true)
}

export function useIsMd() {
  return useBreakpoint(`(min-width: ${MOBILE_BREAKPOINT}px)`, atLeastMd, true)
}

export function useIsSm() {
  return useBreakpoint(`(max-width: ${SM_BREAKPOINT - 1}px)`, belowSm, false)
}
