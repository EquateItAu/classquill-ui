import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * `forwardRef` + `asChild` mirror `Button`'s contract, and both exist because a
 * card is not always a `<div>`: a list of card-shaped rows must stay `<li>`s
 * inside their `<ul>` (dropping the list semantics is an a11y regression), and
 * grid/scroll containers need a ref. Without these, those surfaces had to
 * hand-roll the border/radius/fill triple inline and drift off the shared
 * radius and shadow tokens — which is the whole point of the primitive.
 * (Spelling that triple out here would trip the drift grep in
 * `scripts/check-design-drift.mjs`, which does not skip comments.)
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { size?: "default" | "sm"; asChild?: boolean }
>(({ className, size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      ref={ref}
      data-slot="card"
      data-size={size}
      className={cn("border border-border shadow-(--card-shadow) bg-card text-card-foreground gap-6 overflow-hidden rounded-(--card-radius) py-(--card-padding) text-sm has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-(--card-padding-sm) *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg group/card flex flex-col", className)}
      {...props}
    />
  )
})

Card.displayName = "Card"

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "gap-2 rounded-t-xl px-(--card-padding) group-data-[size=sm]/card:px-(--card-padding-sm) [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      // 16px SEMIBOLD app-wide (decision 2026-07-13, style guide §3b) — clear
      // hierarchy over rows' text-sm font-medium without hand-rolled 18px h2s.
      className={cn("text-base font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-padding) group-data-[size=sm]/card:px-(--card-padding-sm)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("rounded-b-xl px-(--card-padding) group-data-[size=sm]/card:px-(--card-padding-sm) [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4 flex items-center", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
