import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface IconTileProps {
  children: ReactNode
  /** sm=size-8 (default, list/stat rows), smd=size-9 (compact cards), md=size-10 (hero stats), lg=size-12 (feature cards). */
  size?: "sm" | "smd" | "md" | "lg"
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
  tone?: "default" | "warning" | "success" | "destructive"
  /**
   * rounded = rounded-lg (default). xl = rounded-xl (softer card-style tiles).
   * full = rounded-full (avatar-style / status circles).
   */
  shape?: "rounded" | "xl" | "full"
  className?: string
}

const sizeClasses: Record<NonNullable<IconTileProps["size"]>, string> = {
  sm: "size-8",
  smd: "size-9",
  md: "size-10",
  lg: "size-12",
}

const toneClasses: Record<NonNullable<IconTileProps["tone"]>, string> = {
  default: "bg-badge-subdued text-badge-subdued-foreground",
  warning: "bg-warning-subdued text-warning-subdued-foreground",
  success: "bg-success-subdued text-success-subdued-foreground",
  destructive: "bg-destructive-subdued text-destructive-subdued-foreground",
}

const shapeClasses: Record<NonNullable<IconTileProps["shape"]>, string> = {
  rounded: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
}

/**
 * The icon swatch used next to stat values, list rows and feature cards
 * (dashboard, analytics, coverage). One primitive instead of every page
 * re-rolling `size-N rounded-lg bg-* flex items-center justify-center`.
 *
 * Leave `tone` alone unless the tile represents a status the user must act on.
 */
export function IconTile({ children, size = "sm", tone = "default", shape = "rounded", className }: IconTileProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0",
        shapeClasses[shape],
        sizeClasses[size],
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </div>
  )
}
