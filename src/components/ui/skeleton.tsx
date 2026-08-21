import { cn } from "@/lib/utils"

/**
 * Decorative loading placeholder. Hidden from assistive tech — screen readers
 * should hear ONE announcement per loading region, not a pile of empty divs.
 * Wrap a skeleton layout in <SkeletonGroup> to get that announcement
 * (role="status" live region + visually-hidden label + aria-busy).
 * See docs/standards/loading-states.md.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn("bg-muted rounded-xl animate-pulse", className)}
      {...props}
    />
  )
}

/**
 * Accessible container for a skeleton layout. Announces its label once via a
 * polite live region; the pulse divs inside stay decorative. Replace the whole
 * group with real content when data arrives (the live region disappears with it).
 */
function SkeletonGroup({
  className,
  label = "Loading",
  children,
  ...props
}: React.ComponentProps<"div"> & { label?: string }) {
  return (
    <div
      data-slot="skeleton-group"
      role="status"
      aria-busy="true"
      aria-live="polite"
      className={className}
      {...props}
    >
      <span className="sr-only">{label}</span>
      {children}
    </div>
  )
}

export { Skeleton, SkeletonGroup }
