import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-(--button-radius) border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-1 aria-invalid:ring-[3px] [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition duration-(--button-press-duration) motion-safe:active:scale-(--button-press-scale) disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default: "rounded-(--button-radius-primary) bg-primary text-primary-foreground shadow-(--control-shadow) hover:bg-primary-hover active:bg-primary-hover",
        cta: "rounded-(--button-radius-primary) gradient-cta text-primary-foreground shadow-(--control-shadow) hover:brightness-110",
        outline: "border-border bg-background shadow-(--control-shadow) hover:bg-accent-hover hover:text-foreground active:bg-accent-hover aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-(--control-shadow) hover:bg-secondary-hover active:bg-secondary-hover aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost: "bg-background hover:bg-accent-hover hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive: "bg-destructive/20 hover:bg-destructive/30 active:bg-destructive/40 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/30 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/40 dark:active:bg-destructive/50",
        // A text link is not a pressable slab — scaling it reads as a glitch, not feedback.
        link: "text-primary underline-offset-4 hover:underline motion-safe:active:scale-100",
      },
      // ── The touch tier ─────────────────────────────────────────────────────────
      // `pointer-coarse:min-h-(--control-height-touch)` (44px) on EVERY size, not just
      // `default` and `lg`. Until 2026-08-09 the other six carried nothing while
      // mobile-design.md told authors "<Button> already applies it… a real <Button>
      // needs nothing from you" — so the doc was actively certifying 24–40px targets.
      // 731 call sites use these six sizes.
      //
      // `min-h` grows a box and never shrinks it, and `pointer-coarse:` is a capability
      // query, so a mouse-driven desktop keeps every compact size exactly as it was.
      //
      // The `icon-*` sizes need BOTH axes: they are square, and a 24px-wide control that
      // is 44px tall is still a 24px-wide target. `size-N` sets width/height, `min-*`
      // beats it in the cascade, so the square just grows to 44 on touch.
      size: {
        default: "h-(--control-height) pointer-coarse:min-h-(--control-height-touch) gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 pointer-coarse:min-h-(--control-height-touch) gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-(--control-height-sm) pointer-coarse:min-h-(--control-height-touch) gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-(--control-height-lg) pointer-coarse:min-h-(--control-height-touch) gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9 pointer-coarse:min-h-(--control-height-touch) pointer-coarse:min-w-(--control-height-touch)",
        "icon-xs": "size-6 pointer-coarse:min-h-(--control-height-touch) pointer-coarse:min-w-(--control-height-touch) [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 pointer-coarse:min-h-(--control-height-touch) pointer-coarse:min-w-(--control-height-touch)",
        "icon-lg": "size-10 pointer-coarse:min-h-(--control-height-touch) pointer-coarse:min-w-(--control-height-touch)",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean
    }
>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button"

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }