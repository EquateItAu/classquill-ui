import type { ReactNode } from "react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { IconTile } from "@/components/ui/icon-tile"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  /** Lucide icon element. Optional — omit for text-only empties (e.g. compact sidebars). */
  icon?: ReactNode
  title: string
  description?: string
  /** Action element(s), e.g. a Button. Rendered below the header. */
  action?: ReactNode
  /**
   * default — dashed-border card, for standalone page/section empties.
   * card — solid-border card, replaces the old EmptyStateCard look.
   * plain — no container chrome, for embedded contexts (sidebars, table cells, popovers).
   */
  variant?: "default" | "card" | "plain"
  className?: string
  /** Override the title's default text-lg — e.g. a small size to match a tight list's row text. */
  titleClassName?: string
  /**
   * Forwarded to the icon's `IconTile`. Leave at `default` (neutral) unless the empty
   * state itself represents a genuine status ("nothing needs attention" = success).
   * Don't recolour the icon element directly with a `text-*` class — that leaves the
   * tile's neutral background mismatched against a coloured icon.
   */
  tone?: "default" | "warning" | "success" | "destructive"
}

/**
 * Padding is written mobile-base-first (191 call sites). The desktop values are
 * unchanged behind `sm:`; only the phone gets narrower gutters, because these
 * empties are usually already nested inside a Card that pays its own `p-4`, so
 * the two stacked left ~275px of a 375px viewport for the message itself.
 */
const containerVariants: Record<NonNullable<EmptyStateProps["variant"]>, string> = {
  default: "rounded-2xl border border-dashed bg-card px-4 py-8 sm:px-6 sm:py-10",
  card: "rounded-xl border border-solid bg-card px-4 py-6 sm:px-6 sm:py-8",
  plain: "border-none bg-transparent px-3 py-6 sm:px-4 sm:py-8",
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  variant = "default",
  className,
  titleClassName,
  tone = "default",
}: EmptyStateProps) {
  return (
    <Empty
      className={cn(
        "relative overflow-hidden",
        containerVariants[variant],
        className,
      )}
    >
      <EmptyHeader className="relative">
        {icon && (
          <IconTile size="md" tone={tone} className="[&>svg]:size-5">
            {icon}
          </IconTile>
        )}
        <EmptyTitle className={titleClassName}>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {action && <EmptyContent className="relative">{action}</EmptyContent>}
    </Empty>
  )
}
