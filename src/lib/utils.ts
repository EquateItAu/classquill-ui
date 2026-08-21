import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
export function tokenValue(name: string, fallback = ""): string {
  if (typeof window === "undefined") return fallback
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}
