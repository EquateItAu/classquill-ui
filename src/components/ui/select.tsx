"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { nestedOverlayLayer } from "@/components/ui/overlay-layer"
import { HugeiconsIcon } from "@hugeicons/react"
import { UnfoldMoreIcon, Tick02Icon, ArrowUp01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

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
export const selectTriggerClass =
  "border-input data-[placeholder]:text-muted-foreground bg-background hover:bg-accent-hover hover:text-foreground data-open:bg-muted data-open:text-foreground focus-visible:border-primary/50 focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 gap-1.5 rounded-(--control-radius) border px-(--control-padding-x) py-2 text-sm shadow-(--control-shadow) transition-colors focus-visible:ring-1 aria-invalid:ring-[3px] data-[size=default]:h-(--control-height) data-[size=sm]:h-(--control-height-sm) data-[size=lg]:h-(--control-height-lg) pointer-coarse:min-h-(--control-height-touch) *:data-[slot=select-value]:flex *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0"

function SelectTrigger({
  className,
  size = "default",
  iconVariant = "chevron",
  hideIcon = false,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  /** "lg" (40px, `--control-height-lg`) matches a `SlidingPillNav` pill's actual
   *  rendered height when a `Select` sits inline beside one — the pill nav's own
   *  `p-1` wrapper plus its `py-1.5` button padding puts it 4px taller than the
   *  default 36px control height, which is invisible until the two share a row. */
  size?: "sm" | "default" | "lg"
  iconVariant?: "unfold" | "chevron"
  /** Drops the chevron entirely — for a trigger whose `children` is ALREADY a
   *  self-explanatory icon (e.g. a bare view-type glyph in an icon-only
   *  compact mode): the chevron then has nothing to add, and its width
   *  pushes that lone icon off-center inside a fixed-width trigger (the base
   *  class's `justify-between` splits the two apart instead of centering
   *  one). Not the default — every OTHER Select genuinely needs the chevron
   *  as its only "this opens a menu" affordance. */
  hideIcon?: boolean
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(selectTriggerClass, className)}
      {...props}
    >
      {children}
      {hideIcon ? null : (
        <SelectPrimitive.Icon asChild>
          <HugeiconsIcon
            icon={iconVariant === "chevron" ? ArrowDown01Icon : UnfoldMoreIcon}
            strokeWidth={2}
            className="text-muted-foreground size-4 pointer-events-none"
          />
        </SelectPrimitive.Icon>
      )}
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn("bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/5 min-w-36 rounded-(--popover-radius) shadow-(--overlay-shadow) ring-1 duration-100 relative max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto",
          // Select already survives inside a modal (its DismissableLayer passes
          // disableOutsidePointerEvents, so it self-rescues) — carried anyway so every portaled
          // overlay states the same contract and none of them depends on a Radix default.
          nestedOverlayLayer,
          position ==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          data-position={position}
          className={cn(
            "data-[position=popper]:h-[var(--radix-select-trigger-height)] data-[position=popper]:w-full data-[position=popper]:min-w-[var(--radix-select-trigger-width)]",
            position === "popper" && ""
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-3 py-2.5 text-sm", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-muted focus:text-foreground not-data-[variant=destructive]:focus:**:text-foreground gap-2.5 rounded-(--menu-item-radius) py-(--menu-item-padding-y) pointer-coarse:py-3 pr-8 pl-(--menu-item-padding-x) text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} className="pointer-events-none" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border/50 -mx-1 my-1 h-px pointer-events-none", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
