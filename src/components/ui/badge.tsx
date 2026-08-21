import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "gap-1 rounded-4xl border border-transparent font-medium transition-all inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-colors overflow-hidden group/badge",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary-hover",
        secondary: "bg-badge-subdued text-badge-subdued-foreground [a]:hover:bg-badge-subdued-hover",
        destructive: "bg-destructive-subdued text-destructive-subdued-foreground [a]:hover:bg-destructive-subdued-hover focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "border-border text-muted-foreground [a]:hover:bg-accent-hover bg-background",
        ghost: "hover:bg-accent-hover hover:text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        warning: "bg-warning-subdued text-warning-subdued-foreground",
        success: "bg-success-subdued text-success-subdued-foreground",
        info: "bg-info-subdued text-info-subdued-foreground",
      },
      // "sm" is the one canonical small/status/metadata badge (dense chips, table
      // rows, subscription/status labels). It replaces the ~460 call sites that
      // hand-roll one of six different size overrides via `className` (`text-xs`,
      // `text-2xs`, `h-4 px-1.5 text-xs`, `h-5 ...`, etc. — 2026-08-09 audit).
      // Text floors at `text-2xs`, the sanctioned micro-label size.
      size: {
        default: "h-6 gap-1 px-2 py-0.5 text-sm has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3!",
        sm: "h-5 gap-0.5 px-1.5 py-0 text-2xs has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 [&>svg]:size-2.5!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Badge = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<"span"> &
    VariantProps<typeof badgeVariants> & { asChild?: boolean }
>(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      ref={ref}
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge, badgeVariants }
