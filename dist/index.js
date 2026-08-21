// src/components/ui/badge.tsx
import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function tokenValue(name, fallback = "") {
  if (typeof window === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

// src/components/ui/badge.tsx
import { jsx } from "react/jsx-runtime";
var badgeVariants = cva(
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
        info: "bg-info-subdued text-info-subdued-foreground"
      },
      // "sm" is the one canonical small/status/metadata badge (dense chips, table
      // rows, subscription/status labels). It replaces the ~460 call sites that
      // hand-roll one of six different size overrides via `className` (`text-xs`,
      // `text-2xs`, `h-4 px-1.5 text-xs`, `h-5 ...`, etc. — 2026-08-09 audit).
      // Text floors at `text-2xs`, the sanctioned micro-label size.
      size: {
        default: "h-6 gap-1 px-2 py-0.5 text-sm has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3!",
        sm: "h-5 gap-0.5 px-1.5 py-0 text-2xs has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 [&>svg]:size-2.5!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Badge = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot.Root : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      "data-slot": "badge",
      "data-variant": variant,
      className: cn(badgeVariants({ variant, size }), className),
      ...props
    }
  );
});
Badge.displayName = "Badge";

// src/components/ui/button.tsx
import * as React2 from "react";
import { cva as cva2 } from "class-variance-authority";
import { Slot as Slot2 } from "radix-ui";
import { jsx as jsx2 } from "react/jsx-runtime";
var buttonVariants = cva2(
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
        link: "text-primary underline-offset-4 hover:underline motion-safe:active:scale-100"
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
        "icon-lg": "size-10 pointer-coarse:min-h-(--control-height-touch) pointer-coarse:min-w-(--control-height-touch)"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React2.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot2.Root : "button";
    return /* @__PURE__ */ jsx2(
      Comp,
      {
        ref,
        "data-slot": "button",
        "data-variant": variant,
        "data-size": size,
        className: cn(buttonVariants({ variant, size, className })),
        ...props
      }
    );
  }
);
Button.displayName = "Button";

// src/components/ui/empty.tsx
import { cva as cva3 } from "class-variance-authority";
import { jsx as jsx3 } from "react/jsx-runtime";
function Empty({ className, ...props }) {
  return /* @__PURE__ */ jsx3(
    "div",
    {
      "data-slot": "empty",
      className: cn(
        // `p-12` is 96px of horizontal padding — a quarter of a 375px viewport
        // spent on nothing, before the card this sits in adds its own. Mobile
        // base first, the roomy desktop value behind `sm:`.
        "gap-4 rounded-lg border-dashed p-6 sm:p-12 flex w-full min-w-0 flex-1 flex-col items-center justify-center text-center text-balance",
        className
      ),
      ...props
    }
  );
}
function EmptyHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx3(
    "div",
    {
      "data-slot": "empty-header",
      className: cn(
        "gap-2 flex max-w-sm flex-col items-center",
        className
      ),
      ...props
    }
  );
}
var emptyMediaVariants = cva3(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-badge-subdued text-badge-subdued-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function EmptyMedia({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": variant,
      className: cn(emptyMediaVariants({ variant, className })),
      ...props
    }
  );
}
function EmptyTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx3(
    "div",
    {
      "data-slot": "empty-title",
      className: cn("text-lg font-medium tracking-tight", className),
      ...props
    }
  );
}
function EmptyDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx3(
    "div",
    {
      "data-slot": "empty-description",
      className: cn(
        "text-sm/relaxed text-muted-foreground [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      ),
      ...props
    }
  );
}
function EmptyContent({ className, ...props }) {
  return /* @__PURE__ */ jsx3(
    "div",
    {
      "data-slot": "empty-content",
      className: cn(
        "gap-4 text-sm flex w-full max-w-sm min-w-0 flex-col items-center text-balance",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/icon-tile.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var sizeClasses = {
  sm: "size-8",
  smd: "size-9",
  md: "size-10",
  lg: "size-12"
};
var toneClasses = {
  default: "bg-badge-subdued text-badge-subdued-foreground",
  warning: "bg-warning-subdued text-warning-subdued-foreground",
  success: "bg-success-subdued text-success-subdued-foreground",
  destructive: "bg-destructive-subdued text-destructive-subdued-foreground"
};
var shapeClasses = {
  rounded: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full"
};
function IconTile({ children, size = "sm", tone = "default", shape = "rounded", className }) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      className: cn(
        "flex items-center justify-center shrink-0",
        shapeClasses[shape],
        sizeClasses[size],
        toneClasses[tone],
        className
      ),
      children
    }
  );
}

// src/components/ui/empty-state.tsx
import { jsx as jsx5, jsxs } from "react/jsx-runtime";
var containerVariants = {
  default: "rounded-2xl border border-dashed bg-card px-4 py-8 sm:px-6 sm:py-10",
  card: "rounded-xl border border-solid bg-card px-4 py-6 sm:px-6 sm:py-8",
  plain: "border-none bg-transparent px-3 py-6 sm:px-4 sm:py-8"
};
function EmptyState({
  icon,
  title,
  description,
  action,
  variant = "default",
  className,
  titleClassName,
  tone = "default"
}) {
  return /* @__PURE__ */ jsxs(
    Empty,
    {
      className: cn(
        "relative overflow-hidden",
        containerVariants[variant],
        className
      ),
      children: [
        /* @__PURE__ */ jsxs(EmptyHeader, { className: "relative", children: [
          icon && /* @__PURE__ */ jsx5(IconTile, { size: "md", tone, className: "[&>svg]:size-5", children: icon }),
          /* @__PURE__ */ jsx5(EmptyTitle, { className: titleClassName, children: title }),
          description && /* @__PURE__ */ jsx5(EmptyDescription, { children: description })
        ] }),
        action && /* @__PURE__ */ jsx5(EmptyContent, { className: "relative", children: action })
      ]
    }
  );
}

// src/components/ui/input.tsx
import * as React3 from "react";
import { jsx as jsx6, jsxs as jsxs2 } from "react/jsx-runtime";
var Input = React3.forwardRef(
  function Input2({ className, type, prefix, suffix, wrapperClassName, ...props }, ref) {
    return /* @__PURE__ */ jsxs2("div", { className: cn("relative flex items-center w-full h-(--control-height) pointer-coarse:h-(--control-height-touch) border rounded-(--control-radius) overflow-hidden bg-background shadow-(--control-shadow) focus-within:ring-1 focus-within:ring-ring/50 focus-within:border-primary/50 border-border transition-all", wrapperClassName), children: [
      prefix && /* @__PURE__ */ jsx6("div", { className: "absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none", children: prefix }),
      /* @__PURE__ */ jsx6(
        "input",
        {
          ref,
          type,
          "data-slot": "input",
          className: cn(
            "bg-transparent border-none focus-visible:ring-0 shadow-none h-(--control-height) pointer-coarse:h-(--control-height-touch) px-(--control-padding-x) py-1 text-base transition-colors file:h-7 file:text-sm file:font-medium aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 aria-invalid:ring-[3px] file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            suffix && "pr-10",
            className
          ),
          ...props
        }
      ),
      suffix && /* @__PURE__ */ jsx6("div", { className: "absolute right-0 inset-y-0 flex items-center pr-1", children: suffix })
    ] });
  }
);

// src/components/ui/interactive.ts
import { cva as cva4 } from "class-variance-authority";
var interactiveSurface = cva4(
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
        icon: "inline-flex items-center justify-center rounded-md hover:bg-accent-hover"
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
        false: ""
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
      selected: { true: "", false: "" }
    },
    compoundVariants: [
      {
        // `icon` is included: omitting it silently rendered NO selected styling at all,
        // and being a valid variant + a valid prop, nothing caught it.
        variant: ["card", "row", "tile", "chip", "icon"],
        selected: true,
        // `active:` is pinned alongside `hover:` for the same reason: a selected surface is a
        // terminal state, so pressing it must not flash back to the unselected fill.
        class: "bg-primary-subdued text-primary-subdued-foreground hover:bg-primary-subdued active:bg-primary-subdued"
      },
      {
        // An icon hit-area is square, so the floor has to apply on BOTH axes — a 20px-wide
        // button that is 44px tall is still a 20px-wide target.
        variant: "icon",
        touch: true,
        class: "pointer-coarse:min-w-(--control-height-touch)"
      }
    ],
    defaultVariants: { variant: "card", selected: false, touch: true }
  }
);
function activateProps(onActivate, opts) {
  const role = opts?.role ?? "button";
  const guardNested = opts?.guardNested ?? false;
  return {
    role,
    tabIndex: 0,
    onKeyDown: (e) => {
      if (guardNested && e.target !== e.currentTarget) return;
      const hit = role === "link" ? e.key === "Enter" : e.key === "Enter" || e.key === " ";
      if (hit) {
        e.preventDefault();
        onActivate();
      }
    }
  };
}

// src/components/ui/label.tsx
import { Label as LabelPrimitive } from "radix-ui";
import { jsx as jsx7 } from "react/jsx-runtime";
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx7(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "gap-2 text-sm leading-tight font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/overlay-layer.ts
var nestedOverlayLayer = "z-(--z-overlay-nested) pointer-events-auto";

// src/components/ui/phone-input.tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "flag-icons/css/flag-icons.min.css";

// src/components/ui/select.tsx
import { Select as SelectPrimitive } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import { UnfoldMoreIcon, Tick02Icon, ArrowUp01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { jsx as jsx8, jsxs as jsxs3 } from "react/jsx-runtime";
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx8(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx8(
    SelectPrimitive.Group,
    {
      "data-slot": "select-group",
      className: cn("scroll-my-1 p-1", className),
      ...props
    }
  );
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx8(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
var selectTriggerClass = "border-input data-[placeholder]:text-muted-foreground bg-background hover:bg-accent-hover hover:text-foreground data-open:bg-muted data-open:text-foreground focus-visible:border-primary/50 focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 gap-1.5 rounded-(--control-radius) border px-(--control-padding-x) py-2 text-sm shadow-(--control-shadow) transition-colors focus-visible:ring-1 aria-invalid:ring-[3px] data-[size=default]:h-(--control-height) data-[size=sm]:h-(--control-height-sm) data-[size=lg]:h-(--control-height-lg) pointer-coarse:min-h-(--control-height-touch) *:data-[slot=select-value]:flex *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0";
function SelectTrigger({
  className,
  size = "default",
  iconVariant = "chevron",
  hideIcon = false,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs3(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(selectTriggerClass, className),
      ...props,
      children: [
        children,
        hideIcon ? null : /* @__PURE__ */ jsx8(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx8(
          HugeiconsIcon,
          {
            icon: iconVariant === "chevron" ? ArrowDown01Icon : UnfoldMoreIcon,
            strokeWidth: 2,
            className: "text-muted-foreground size-4 pointer-events-none"
          }
        ) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}) {
  return /* @__PURE__ */ jsx8(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs3(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/5 min-w-36 rounded-(--popover-radius) shadow-(--overlay-shadow) ring-1 duration-100 relative max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto",
        // Select already survives inside a modal (its DismissableLayer passes
        // disableOutsidePointerEvents, so it self-rescues) — carried anyway so every portaled
        // overlay states the same contract and none of them depends on a Radix default.
        nestedOverlayLayer,
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      align,
      ...props,
      children: [
        /* @__PURE__ */ jsx8(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx8(
          SelectPrimitive.Viewport,
          {
            "data-position": position,
            className: cn(
              "data-[position=popper]:h-[var(--radix-select-trigger-height)] data-[position=popper]:w-full data-[position=popper]:min-w-[var(--radix-select-trigger-width)]",
              position === "popper" && ""
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx8(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx8(
    SelectPrimitive.Label,
    {
      "data-slot": "select-label",
      className: cn("text-muted-foreground px-3 py-2.5 text-sm", className),
      ...props
    }
  );
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs3(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-muted focus:text-foreground not-data-[variant=destructive]:focus:**:text-foreground gap-2.5 rounded-(--menu-item-radius) py-(--menu-item-padding-y) pointer-coarse:py-3 pr-8 pl-(--menu-item-padding-x) text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx8("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ jsx8(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx8(HugeiconsIcon, { icon: Tick02Icon, strokeWidth: 2, className: "pointer-events-none" }) }) }),
        /* @__PURE__ */ jsx8(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx8(
    SelectPrimitive.Separator,
    {
      "data-slot": "select-separator",
      className: cn("bg-border/50 -mx-1 my-1 h-px pointer-events-none", className),
      ...props
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx8(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4", className),
      ...props,
      children: /* @__PURE__ */ jsx8(HugeiconsIcon, { icon: ArrowUp01Icon, strokeWidth: 2 })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx8(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4", className),
      ...props,
      children: /* @__PURE__ */ jsx8(HugeiconsIcon, { icon: ArrowDown01Icon, strokeWidth: 2 })
    }
  );
}

// src/lib/phone.ts
import {
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
  getCountryCallingCode
} from "libphonenumber-js/max";
var PHONE_COUNTRIES = [
  { iso: "AU", dialCode: "+61", name: "Australia", example: "412 345 678", digits: 9, trunkPrefix: "0" },
  { iso: "NZ", dialCode: "+64", name: "New Zealand", example: "21 123 4567", digits: [8, 10], trunkPrefix: "0" },
  { iso: "US", dialCode: "+1", name: "United States", example: "(415) 555-2671", digits: 10 },
  { iso: "CA", dialCode: "+1", name: "Canada", example: "(416) 555-0123", digits: 10 },
  { iso: "GB", dialCode: "+44", name: "United Kingdom", example: "7400 123456", digits: [9, 10], trunkPrefix: "0" },
  { iso: "IE", dialCode: "+353", name: "Ireland", example: "85 012 3456", digits: [7, 9], trunkPrefix: "0" },
  { iso: "DE", dialCode: "+49", name: "Germany", example: "1512 3456789", digits: [6, 11], trunkPrefix: "0" },
  { iso: "FR", dialCode: "+33", name: "France", example: "6 12 34 56 78", digits: 9, trunkPrefix: "0" },
  { iso: "ES", dialCode: "+34", name: "Spain", example: "612 345 678", digits: 9 },
  { iso: "NL", dialCode: "+31", name: "Netherlands", example: "6 12345678", digits: 9, trunkPrefix: "0" },
  { iso: "SG", dialCode: "+65", name: "Singapore", example: "8123 4567", digits: 8 },
  { iso: "IN", dialCode: "+91", name: "India", example: "81234 56789", digits: 10 }
];
var DEFAULT_PHONE_COUNTRY = "AU";
var DEFAULT_COUNTRY_CODE = "+61";
var BY_ISO = new Map(PHONE_COUNTRIES.map((c) => [c.iso, c]));
function phoneCountry(iso) {
  return (iso ? BY_ISO.get(iso) : void 0) ?? BY_ISO.get(DEFAULT_PHONE_COUNTRY);
}
function countryForDialCode(dial) {
  if (!dial) return DEFAULT_PHONE_COUNTRY;
  const normalized = dial.trim().replace(/[^\d+]/g, "");
  if (!normalized) return DEFAULT_PHONE_COUNTRY;
  const withPlus = normalized.startsWith("+") ? normalized : `+${normalized}`;
  return PHONE_COUNTRIES.find((c) => c.dialCode === withPlus)?.iso ?? DEFAULT_PHONE_COUNTRY;
}
function dialCodeForCountry(iso) {
  return phoneCountry(iso).dialCode;
}
function phoneCountryFromGeo(country) {
  if (!country) return DEFAULT_PHONE_COUNTRY;
  const upper = country.trim().toUpperCase();
  return PHONE_COUNTRIES.find((c) => c.iso === upper)?.iso ?? DEFAULT_PHONE_COUNTRY;
}
var COUNTRY_CODES = PHONE_COUNTRIES.filter(
  (c, i, all) => all.findIndex((o) => o.dialCode === c.dialCode) === i
).map((c) => ({ label: `${c.iso} ${c.dialCode}`, value: c.dialCode }));
var EMPTY = {
  ok: true,
  local: null,
  e164: null,
  formatted: null,
  issue: null,
  messageKey: null,
  expectedDigits: null,
  actualDigits: 0,
  strippedTrunkPrefix: false,
  detectedCountry: null
};
function expectedDigitsText(country) {
  return Array.isArray(country.digits) ? `${country.digits[0]}-${country.digits[1]}` : String(country.digits);
}
var MESSAGE_KEY = {
  too_short: "phone.tooShort",
  too_long: "phone.tooLong",
  // Digit counts say nothing useful about a wrong prefix, so there's only the
  // one form.
  invalid: "phone.invalidGeneric",
  unsupported_country: "phone.unsupportedCountry"
};
function lengthVerdict(country, count) {
  const [min, max] = Array.isArray(country.digits) ? country.digits : [country.digits, country.digits];
  if (count < min) return "short";
  if (count > max) return "long";
  return "in_range";
}
function nationalDisplay(parsed) {
  const intl = parsed.formatInternational();
  const prefix = `+${parsed.countryCallingCode}`;
  return intl.startsWith(prefix) ? intl.slice(prefix.length).trim() : intl;
}
function validatePhone(iso, raw) {
  const trimmed = (raw ?? "").trim();
  if (trimmed === "") return EMPTY;
  if (!/\d/.test(trimmed)) {
    return trimmed === "+" ? EMPTY : { ...EMPTY, ok: false, issue: "invalid", messageKey: MESSAGE_KEY.invalid };
  }
  const carriesOwnCode = trimmed.startsWith("+") || /^00\d/.test(trimmed);
  const text = trimmed.startsWith("00") ? `+${trimmed.slice(2)}` : trimmed;
  const defaultCountry = carriesOwnCode ? void 0 : iso;
  const parsed = parsePhoneNumberFromString(text, defaultCountry);
  const detectedCountry = carriesOwnCode ? parsed?.country ?? null : null;
  if (detectedCountry && !BY_ISO.has(detectedCountry)) {
    return {
      ...EMPTY,
      ok: false,
      issue: "unsupported_country",
      messageKey: MESSAGE_KEY.unsupported_country,
      actualDigits: parsed?.nationalNumber.length ?? 0,
      detectedCountry
    };
  }
  const country = phoneCountry(detectedCountry ?? iso);
  const expected = expectedDigitsText(country);
  let actualDigits;
  let strippedTrunkPrefix = false;
  const rawDigits = trimmed.replace(/\D/g, "");
  if (parsed) {
    actualDigits = parsed.nationalNumber.length;
    strippedTrunkPrefix = !carriesOwnCode && !!country.trunkPrefix && rawDigits.startsWith(country.trunkPrefix) && rawDigits.length > parsed.nationalNumber.length;
  } else {
    let national = rawDigits;
    if (carriesOwnCode) {
      const cc = getCountryCallingCode(country.iso);
      if (national.startsWith(cc)) national = national.slice(cc.length);
    }
    if (country.trunkPrefix && national.startsWith(country.trunkPrefix)) {
      national = national.slice(country.trunkPrefix.length);
      strippedTrunkPrefix = true;
    }
    actualDigits = national.length;
  }
  const fail = (issue) => ({
    ...EMPTY,
    ok: false,
    issue,
    // When the counted digits match what's expected, quoting the count would
    // read as a contradiction ("that's 9 digits, expected 9") — fall back to
    // copy that only states the expectation.
    messageKey: (issue === "too_long" || issue === "too_short") && String(actualDigits) === expected ? `${MESSAGE_KEY[issue]}Generic` : MESSAGE_KEY[issue],
    expectedDigits: expected,
    actualDigits,
    strippedTrunkPrefix,
    detectedCountry
  });
  if (parsed?.isValid()) {
    return {
      ok: true,
      local: parsed.nationalNumber,
      e164: parsed.number,
      formatted: nationalDisplay(parsed),
      issue: null,
      messageKey: null,
      expectedDigits: expected,
      actualDigits,
      strippedTrunkPrefix,
      detectedCountry
    };
  }
  const lengthIssue = validatePhoneNumberLength(text, defaultCountry);
  if (lengthIssue === "TOO_SHORT") return fail("too_short");
  if (lengthIssue === "TOO_LONG") return fail("too_long");
  const verdict = lengthVerdict(country, actualDigits);
  if (verdict === "short") return fail("too_short");
  if (verdict === "long") return fail("too_long");
  return fail("invalid");
}
function normalizeLocalNumber(raw) {
  if (!raw) return null;
  let digits = raw.replace(/[^\d]/g, "");
  if (digits.length === 0) return null;
  if (digits.startsWith("0")) digits = digits.replace(/^0/, "");
  if (digits.length < 6) return null;
  return digits;
}
function formatTelHref(countryCode, localNumber) {
  const local = normalizeLocalNumber(localNumber);
  if (!local) return null;
  const cc = (countryCode || DEFAULT_COUNTRY_CODE).replace(/[^\d+]/g, "");
  return `tel:${cc}${local}`;
}
function formatPhoneDisplay(countryCode, localNumber) {
  const local = normalizeLocalNumber(localNumber);
  if (!local) return null;
  const cc = (countryCode || DEFAULT_COUNTRY_CODE).replace(/[^\d+]/g, "");
  const parsed = parsePhoneNumberFromString(`${cc.startsWith("+") ? cc : `+${cc}`}${local}`);
  return parsed?.isValid() ? parsed.formatInternational() : `${cc} ${local}`;
}

// src/components/ui/phone-input.tsx
import { jsx as jsx9, jsxs as jsxs4 } from "react/jsx-runtime";
function Flag({ iso, className }) {
  return /* @__PURE__ */ jsx9("span", { "aria-hidden": "true", className: cn("fi shrink-0 rounded-[2px]", `fi-${iso.toLowerCase()}`, className) });
}
function PhoneInput({
  country,
  onCountryChange,
  value,
  onValueChange,
  onValidationChange,
  id,
  name,
  disabled,
  className,
  placeholder,
  showErrors,
  error,
  hideMessages,
  inputRef,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy
}) {
  const { t } = useTranslation("common");
  const [touched, setTouched] = useState(false);
  const selected = phoneCountry(country);
  const validation = useMemo(() => validatePhone(country, value), [country, value]);
  useEffect(() => {
    onValidationChange?.(validation);
  }, [validation]);
  const detected = validation.detectedCountry;
  useEffect(() => {
    if (detected && detected !== country && PHONE_COUNTRIES.some((c) => c.iso === detected) && dialCodeForCountry(detected) !== dialCodeForCountry(country)) {
      onCountryChange(detected);
    }
  }, [detected, country]);
  function handleBlur() {
    setTouched(true);
    if (validation.ok && validation.formatted && validation.formatted !== value) {
      onValueChange(validation.formatted);
    }
  }
  const showError = !disabled && (error != null || (touched || showErrors) && !validation.ok);
  const message = error ?? phoneMessage(t, validation, selected);
  const hint = !showError && validation.ok && validation.strippedTrunkPrefix && validation.formatted ? t("phone.trunkPrefixHint", { formatted: validation.formatted, dial: selected.dialCode }) : null;
  const messageId = id ? `${id}-phone-message` : void 0;
  const describedBy = [ariaDescribedBy, (showError || hint) && !hideMessages ? messageId : null].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs4("div", { className: cn("flex flex-col gap-1.5", className), children: [
    /* @__PURE__ */ jsxs4("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxs4(
        Select,
        {
          value: selected.iso,
          onValueChange: (v) => onCountryChange(v),
          disabled,
          children: [
            /* @__PURE__ */ jsx9(SelectTrigger, { className: "w-30 shrink-0", "aria-label": t("phone.dialCodeLabel"), children: /* @__PURE__ */ jsxs4("span", { className: "flex items-center gap-2 truncate", children: [
              /* @__PURE__ */ jsx9(Flag, { iso: selected.iso }),
              /* @__PURE__ */ jsx9("span", { className: "truncate", children: selected.dialCode })
            ] }) }),
            /* @__PURE__ */ jsx9(SelectContent, { children: PHONE_COUNTRIES.map((c) => /* @__PURE__ */ jsx9(SelectItem, { value: c.iso, children: /* @__PURE__ */ jsxs4("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx9(Flag, { iso: c.iso }),
              /* @__PURE__ */ jsx9("span", { children: c.name }),
              /* @__PURE__ */ jsx9("span", { className: "text-muted-foreground", children: c.dialCode })
            ] }) }, c.iso)) })
          ]
        }
      ),
      /* @__PURE__ */ jsx9(
        Input,
        {
          ref: inputRef,
          id,
          name,
          type: "tel",
          inputMode: "tel",
          autoComplete: "tel-national",
          value,
          onChange: (e) => onValueChange(e.target.value),
          onBlur: handleBlur,
          placeholder: placeholder ?? selected.example,
          disabled,
          "aria-label": ariaLabel,
          "aria-invalid": showError || void 0,
          "aria-describedby": describedBy || void 0,
          className: "flex-1"
        }
      )
    ] }),
    !hideMessages && showError && message && /* @__PURE__ */ jsx9("p", { id: messageId, role: "alert", className: "text-xs text-destructive", children: message }),
    !hideMessages && !showError && hint && /* @__PURE__ */ jsx9("p", { id: messageId, className: "text-xs text-muted-foreground", children: hint })
  ] });
}
function phoneMessage(t, validation, country) {
  if (validation.ok || !validation.messageKey) return null;
  const vars = {
    digits: validation.actualDigits,
    expected: validation.expectedDigits ?? "",
    country: country.name,
    dial: country.dialCode
  };
  switch (validation.messageKey) {
    case "phone.tooLong":
      return t("phone.tooLong", vars);
    case "phone.tooLongGeneric":
      return t("phone.tooLongGeneric", vars);
    case "phone.tooShort":
      return t("phone.tooShort", vars);
    case "phone.tooShortGeneric":
      return t("phone.tooShortGeneric", vars);
    case "phone.unsupportedCountry":
      return t("phone.unsupportedCountry", vars);
    default:
      return t("phone.invalidGeneric", vars);
  }
}
function PhoneCountrySelect({
  value,
  onValueChange,
  disabled,
  className,
  id,
  "aria-label": ariaLabel
}) {
  const selected = phoneCountry(value);
  return /* @__PURE__ */ jsxs4(Select, { value: selected.iso, onValueChange: (v) => onValueChange(v), disabled, children: [
    /* @__PURE__ */ jsx9(SelectTrigger, { id, className: cn("w-full", className), "aria-label": ariaLabel, children: /* @__PURE__ */ jsxs4("span", { className: "flex items-center gap-2 truncate", children: [
      /* @__PURE__ */ jsx9(Flag, { iso: selected.iso }),
      /* @__PURE__ */ jsx9("span", { className: "truncate", children: selected.name }),
      /* @__PURE__ */ jsx9("span", { className: "text-muted-foreground", children: selected.dialCode })
    ] }) }),
    /* @__PURE__ */ jsx9(SelectContent, { children: PHONE_COUNTRIES.map((c) => /* @__PURE__ */ jsx9(SelectItem, { value: c.iso, children: /* @__PURE__ */ jsxs4("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx9(Flag, { iso: c.iso }),
      /* @__PURE__ */ jsx9("span", { children: c.name }),
      /* @__PURE__ */ jsx9("span", { className: "text-muted-foreground", children: c.dialCode })
    ] }) }, c.iso)) })
  ] });
}

// src/components/ui/query-error-state.tsx
import { AlertCircle, AlertTriangle, RotateCcw } from "lucide-react";
import { jsx as jsx10, jsxs as jsxs5 } from "react/jsx-runtime";
function QueryErrorState({
  message = "Failed to load data.",
  onRetry,
  retryLabel = "Retry",
  layout = "column"
}) {
  if (layout === "row") {
    return /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between gap-4 p-6", children: [
      /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-2 text-destructive", children: [
        /* @__PURE__ */ jsx10(AlertTriangle, { className: "size-5" }),
        /* @__PURE__ */ jsx10("span", { className: "text-sm", children: message })
      ] }),
      onRetry && /* @__PURE__ */ jsxs5(Button, { variant: "outline", size: "sm", onClick: onRetry, children: [
        /* @__PURE__ */ jsx10(RotateCcw, { className: "size-4 mr-2" }),
        retryLabel
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs5("div", { className: "flex flex-col items-center gap-2 py-6 text-muted-foreground", children: [
    /* @__PURE__ */ jsx10(AlertCircle, { className: "size-5" }),
    /* @__PURE__ */ jsx10("p", { className: "text-sm", children: message }),
    onRetry && /* @__PURE__ */ jsx10(Button, { variant: "outline", size: "sm", onClick: onRetry, children: retryLabel })
  ] });
}

// src/components/ui/skeleton.tsx
import { jsx as jsx11, jsxs as jsxs6 } from "react/jsx-runtime";
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx11(
    "div",
    {
      "data-slot": "skeleton",
      "aria-hidden": "true",
      className: cn("bg-muted rounded-xl animate-pulse", className),
      ...props
    }
  );
}
function SkeletonGroup({
  className,
  label = "Loading",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      "data-slot": "skeleton-group",
      role: "status",
      "aria-busy": "true",
      "aria-live": "polite",
      className,
      ...props,
      children: [
        /* @__PURE__ */ jsx11("span", { className: "sr-only", children: label }),
        children
      ]
    }
  );
}

// src/components/ui/skeleton-compounds.tsx
import { jsx as jsx12, jsxs as jsxs7 } from "react/jsx-runtime";
function ItemListSkeleton({ count = 6 }) {
  return /* @__PURE__ */ jsx12("div", { children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-3 px-3 py-2.5 rounded-lg", children: [
    /* @__PURE__ */ jsx12(Skeleton, { className: "size-9 rounded-full shrink-0" }),
    /* @__PURE__ */ jsxs7("div", { className: "flex-1 space-y-1.5 min-w-0", children: [
      /* @__PURE__ */ jsx12(Skeleton, { className: "h-3.5 w-28 rounded-md" }),
      /* @__PURE__ */ jsx12(Skeleton, { className: "h-3 w-20 rounded-md" })
    ] })
  ] }, i)) });
}
function CardListSkeleton({ count = 3 }) {
  return /* @__PURE__ */ jsx12("div", { className: "space-y-2", children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsxs7("div", { className: "border rounded-lg bg-card p-3 flex items-center gap-3", children: [
    /* @__PURE__ */ jsx12(Skeleton, { className: "w-10 h-10 rounded-md shrink-0" }),
    /* @__PURE__ */ jsxs7("div", { className: "flex-1 space-y-1.5 min-w-0", children: [
      /* @__PURE__ */ jsx12(Skeleton, { className: "h-3.5 w-40 rounded-md" }),
      /* @__PURE__ */ jsx12(Skeleton, { className: "h-3 w-24 rounded-md" })
    ] }),
    /* @__PURE__ */ jsx12(Skeleton, { className: "h-5 w-16 rounded-full shrink-0" })
  ] }, i)) });
}
function ChatSkeleton() {
  return /* @__PURE__ */ jsxs7("div", { className: "flex flex-col justify-end gap-3 h-full pb-2", children: [
    /* @__PURE__ */ jsxs7("div", { className: "flex items-end gap-2", children: [
      /* @__PURE__ */ jsx12(Skeleton, { className: "size-7 rounded-full shrink-0" }),
      /* @__PURE__ */ jsx12(Skeleton, { className: "h-9 w-48 rounded-2xl rounded-bl-sm" })
    ] }),
    /* @__PURE__ */ jsx12("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx12(Skeleton, { className: "h-9 w-40 rounded-2xl rounded-br-sm" }) }),
    /* @__PURE__ */ jsxs7("div", { className: "flex items-end gap-2", children: [
      /* @__PURE__ */ jsx12(Skeleton, { className: "size-7 rounded-full shrink-0" }),
      /* @__PURE__ */ jsx12(Skeleton, { className: "h-6 w-52 rounded-2xl rounded-bl-sm" })
    ] })
  ] });
}
function PageGridSkeleton({
  cols = 2,
  count = 4
}) {
  return /* @__PURE__ */ jsxs7("div", { className: "p-6 space-y-4", children: [
    /* @__PURE__ */ jsx12(Skeleton, { className: "h-8 w-48 rounded-md" }),
    /* @__PURE__ */ jsx12(
      "div",
      {
        className: cols === 3 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "grid grid-cols-1 sm:grid-cols-2 gap-4",
        children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsxs7("div", { className: "border rounded-lg p-4 space-y-2", children: [
          /* @__PURE__ */ jsx12(Skeleton, { className: "h-4 w-32 rounded-md" }),
          /* @__PURE__ */ jsx12(Skeleton, { className: "h-3 w-24 rounded-md" })
        ] }, i))
      }
    )
  ] });
}

// src/lib/layout-config.ts
var ROUTE_LAYOUT_MAP = [
  // sidebar-icon (shadcn collapsible="icon" sidebar — 4rem/64px collapsed)
  [/^\/classrooms/, "sidebar-icon"],
  [/^\/my-students/, "sidebar-icon"],
  [/^\/group\//, "sidebar-icon"],
  // sidebar-72 (conversation/list sidebars — w-72)
  [/^\/my-tutor\/teachers/, "sidebar-72"],
  [/^\/my-tutor\/messages/, "sidebar-72"],
  [/^\/parent\/chats/, "sidebar-72"],
  [/^\/parent\/dashboard\/teachers\//, "sidebar-72"],
  [/^\/messages/, "sidebar-72"],
  [/^\/admin\/exam-maker/, "sidebar-72"],
  // sidebar-80 (detail/search sidebars — w-80)
  [/^\/parent\/find-tutor/, "sidebar-80"],
  [/^\/parent\/tutor\//, "sidebar-80"],
  // sidebar-64 (collapsible nav sidebars — w-64)
  // Everything a sidebar role (teacher / company / parent) reaches through AppShell
  // belongs here, plus the student routes that mount StudentSidebar.
  [/^\/dashboard/, "sidebar-64"],
  [/^\/settings/, "sidebar-64"],
  [/^\/my-tutor/, "sidebar-64"],
  [/^\/my-bookings/, "sidebar-64"],
  [/^\/org/, "sidebar-64"],
  [/^\/tutor-dashboard/, "sidebar-64"],
  [/^\/payments/, "sidebar-64"],
  [/^\/earnings/, "sidebar-64"],
  [/^\/calendar/, "sidebar-64"],
  [/^\/billing/, "sidebar-64"],
  [/^\/programs/, "sidebar-64"],
  [/^\/news/, "sidebar-64"],
  [/^\/parent\/dashboard/, "sidebar-64"],
  [/^\/parent\/calendar/, "sidebar-64"],
  [/^\/parent\/bookings/, "sidebar-64"],
  [/^\/parent\/classrooms/, "sidebar-64"],
  [/^\/parent\/payment-methods/, "sidebar-64"],
  [/^\/parent\/student\//, "sidebar-64"],
  [/^\/parent\/students\//, "sidebar-64"],
  [/^\/progress/, "sidebar-64"],
  [/^\/study/, "sidebar-64"],
  [/^\/worksheets/, "sidebar-64"],
  [/^\/exam$/, "sidebar-64"]
];
function getLayoutHint(pathname) {
  for (const [pattern, hint] of ROUTE_LAYOUT_MAP) {
    if (pattern.test(pathname)) return hint;
  }
  return "full-width";
}
function getSidebarWidthClass(hint) {
  switch (hint) {
    case "sidebar-64":
      return "w-64";
    case "sidebar-72":
      return "w-72";
    case "sidebar-80":
      return "w-80";
    case "sidebar-icon":
      return "w-64";
    default:
      return "";
  }
}

// src/components/ui/ShellSkeleton.tsx
import { jsx as jsx13, jsxs as jsxs8 } from "react/jsx-runtime";
function ShellSkeleton({ layout = "full-width" } = {}) {
  return /* @__PURE__ */ jsxs8(SkeletonGroup, { label: "Loading page", className: "flex h-screen flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsx13("div", { className: "shrink-0 w-full bg-background border-b border-border", children: /* @__PURE__ */ jsxs8("div", { className: "flex items-center justify-between px-3 w-full h-14 max-sm:h-[calc(48px+env(safe-area-inset-top,0px))] max-sm:pt-[env(safe-area-inset-top,0px)]", children: [
      /* @__PURE__ */ jsx13(Skeleton, { className: "h-8 w-8 rounded-lg shrink-0" }),
      /* @__PURE__ */ jsxs8("div", { className: "hidden md:flex items-center gap-2", children: [
        /* @__PURE__ */ jsx13(Skeleton, { className: "h-7 w-20 rounded-full" }),
        /* @__PURE__ */ jsx13(Skeleton, { className: "h-7 w-24 rounded-full" }),
        /* @__PURE__ */ jsx13(Skeleton, { className: "h-7 w-20 rounded-full" }),
        /* @__PURE__ */ jsx13(Skeleton, { className: "h-7 w-16 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx13(Skeleton, { className: "h-8 w-8 rounded-full" }),
        /* @__PURE__ */ jsx13(Skeleton, { className: "h-8 w-8 rounded-full" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx13("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ jsx13(SkeletonContent, { layout }) })
  ] });
}
function SkeletonContent({ layout = "full-width" } = {}) {
  if (layout === "full-width") {
    return /* @__PURE__ */ jsx13(PageGridSkeleton, {});
  }
  if (layout === "sidebar-icon") {
    return /* @__PURE__ */ jsxs8("div", { className: "flex h-full overflow-hidden", children: [
      /* @__PURE__ */ jsxs8("aside", { className: "hidden md:flex shrink-0 w-64 border-r border-border flex-col pt-3 px-2 gap-1", children: [
        /* @__PURE__ */ jsx13(Skeleton, { className: "h-5 w-32 rounded-md mx-2 mb-2" }),
        Array.from({ length: 7 }).map((_, i) => /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-2.5 px-2 py-1.5", children: [
          /* @__PURE__ */ jsx13(Skeleton, { className: "size-4 rounded-sm shrink-0" }),
          /* @__PURE__ */ jsx13(Skeleton, { className: "h-3.5 rounded-md", style: { width: `${60 + i % 3 * 20}px` } })
        ] }, i))
      ] }),
      /* @__PURE__ */ jsx13("div", { className: "flex-1 p-6 space-y-3", children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxs8("div", { className: "border rounded-lg bg-card p-4 space-y-3", children: [
        /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx13(Skeleton, { className: "size-9 rounded-full shrink-0" }),
          /* @__PURE__ */ jsxs8("div", { className: "space-y-1.5 flex-1", children: [
            /* @__PURE__ */ jsx13(Skeleton, { className: "h-3.5 w-28 rounded-md" }),
            /* @__PURE__ */ jsx13(Skeleton, { className: "h-3 w-20 rounded-md" })
          ] })
        ] }),
        /* @__PURE__ */ jsx13(Skeleton, { className: "h-3.5 w-full rounded-md" }),
        /* @__PURE__ */ jsx13(Skeleton, { className: "h-3 w-3/4 rounded-md" })
      ] }, i)) })
    ] });
  }
  const widthClass = getSidebarWidthClass(layout);
  return /* @__PURE__ */ jsxs8("div", { className: "flex h-full overflow-hidden", children: [
    /* @__PURE__ */ jsx13("aside", { className: cn("hidden md:flex shrink-0 border-r border-border flex-col", widthClass), children: /* @__PURE__ */ jsxs8("div", { className: "p-3 space-y-2", children: [
      /* @__PURE__ */ jsx13(Skeleton, { className: "h-8 w-full rounded-md" }),
      /* @__PURE__ */ jsx13(ItemListSkeleton, { count: 6 })
    ] }) }),
    /* @__PURE__ */ jsx13("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsx13(PageGridSkeleton, {}) })
  ] });
}

// src/components/ui/textarea.tsx
import { jsx as jsx14 } from "react/jsx-runtime";
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx14(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-border bg-background focus-visible:border-primary/50 focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 resize-none rounded-(--control-radius) border px-(--control-padding-x) py-3 text-base shadow-(--control-shadow) transition-colors focus-visible:ring-1 aria-invalid:ring-[3px] placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/user-avatar.tsx
import { useState as useState2 } from "react";
import { jsx as jsx15, jsxs as jsxs9 } from "react/jsx-runtime";
function getInitials(name, email) {
  if (name && name.trim()) {
    return name.trim().split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  }
  if (email) return email[0].toUpperCase();
  return "?";
}
var sizeClasses2 = {
  sm: "size-6 text-xs rounded-md",
  // rounded-md at 24px avoids the circle (rounded-lg 12px = 50% of 24px)
  default: "size-8 text-sm",
  lg: "size-10 text-sm"
};
function UserAvatar({ name, email, avatarUrl, size = "default", className }) {
  const [imgLoaded, setImgLoaded] = useState2(false);
  const [imgError, setImgError] = useState2(false);
  const showImg = avatarUrl && !imgError;
  return /* @__PURE__ */ jsxs9(
    "div",
    {
      className: cn(
        // The shared decorative well (see ui/icon-tile.tsx). `ring-1 ring-border` is
        // load-bearing, not decoration: unlike `<Avatar>` (which has its own
        // `after:border-border`) this has no edge of its own, and the well is a pale
        // tint — without the ring the initials read as floating text on a white card.
        "relative flex items-center justify-center rounded-lg bg-badge-subdued ring-1 ring-border font-medium select-none shrink-0 overflow-hidden",
        size && sizeClasses2[size],
        className
      ),
      children: [
        (!showImg || !imgLoaded) && /* @__PURE__ */ jsx15("span", { className: "text-badge-subdued-foreground", children: getInitials(name, email) }),
        showImg && /* @__PURE__ */ jsx15(
          "img",
          {
            src: avatarUrl,
            alt: name || "",
            onLoad: () => setImgLoaded(true),
            onError: () => setImgError(true),
            className: cn(
              "absolute inset-0 size-full rounded-[inherit] object-cover",
              !imgLoaded && "opacity-0"
            )
          }
        )
      ]
    }
  );
}

// src/lib/analytics.ts
import posthog from "posthog-js";
function ready() {
  return Boolean(posthog.__loaded);
}
function identifyAnalytics(user) {
  if (!ready()) return;
  if (user) {
    posthog.identify(user.id, {
      email: user.email ?? void 0,
      name: user.name ?? void 0
    });
  } else {
    posthog.reset();
  }
}
function trackEvent(event, props) {
  if (!ready()) return;
  posthog.capture(event, props);
}

// src/lib/badgeEmbed.ts
var BADGE_BASE_URL = "https://classquill.com";
function badgeHref(orgSlug) {
  if (!orgSlug) return BADGE_BASE_URL;
  return `${BADGE_BASE_URL}/?utm_source=badge&utm_medium=referral&utm_campaign=${encodeURIComponent(orgSlug)}`;
}
function badgeEmbedCode(variant, orgSlug) {
  return `<a href="${badgeHref(orgSlug)}" target="_blank" rel="noopener noreferrer">
  <img src="${BADGE_BASE_URL}/badge/badge_${variant}.svg" alt="Powered by ClassQuill" width="160" height="44" />
</a>`;
}

// src/lib/domain/blogRelated.ts
function getRelatedPosts(current, all, limit = 3) {
  const currentTags = new Set(current.tags);
  const candidates = all.filter((post) => post.slug !== current.slug).map((post) => ({
    post,
    overlap: post.tags.reduce(
      (count, tag) => currentTags.has(tag) ? count + 1 : count,
      0
    )
  })).sort((a, b) => {
    if (b.overlap !== a.overlap) return b.overlap - a.overlap;
    return b.post.date.localeCompare(a.post.date);
  });
  return candidates.slice(0, limit).map(({ post }) => post);
}

// src/lib/format/blogReadingTime.ts
var WORDS_PER_MINUTE = 200;
function getReadingTimeMinutes(content) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

// src/lib/gdprConsent.ts
var EU_COOKIE_NAME = "cq_eu_visitor";
var CONSENT_STORAGE_KEY = "cq_cookie_consent";
var CONSENT_EVENT = "cq:consent-changed";
function readCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}
async function resolveEuGated() {
  const cached = readCookie(EU_COOKIE_NAME);
  if (cached === "1") return true;
  if (cached === "0") return false;
  try {
    const res = await fetch("/api/geo", { credentials: "same-origin" });
    const data = await res.json();
    return Boolean(data.euGated);
  } catch {
    return true;
  }
}
function getStoredConsent() {
  try {
    const v = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}
function setStoredConsent(value) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
  }
  try {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: { decision: value } }));
  } catch {
  }
}
function loadGatedScripts() {
  window.__cqLoadClarity?.();
  window.__cqLoadElu?.();
}

// src/lib/landingAnalytics.ts
import posthog2 from "posthog-js";
var KEY = import.meta.env.VITE_POSTHOG_KEY_LANDING;
function initLandingPostHog() {
  if (!KEY) return;
  if (typeof navigator !== "undefined" && navigator.webdriver) return;
  if (posthog2.__loaded) return;
  posthog2.init(KEY, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
    defaults: "2025-05-24",
    // history_change pageviews + pageleave w/ max scroll
    persistence: "localStorage",
    capture_exceptions: true,
    disable_session_recording: true,
    scroll_root_selector: [".ph-scroll-root"],
    debug: import.meta.env.MODE === "development"
  });
  tagInternalUserIfRequested();
}
var INTERNAL_FLAG_KEY = "cq_internal_user";
function tagInternalUserIfRequested() {
  if (typeof window === "undefined" || !posthog2.__loaded) return;
  try {
    if (new URLSearchParams(window.location.search).get("internal") === "1") {
      window.localStorage.setItem(INTERNAL_FLAG_KEY, "1");
    }
    if (window.localStorage.getItem(INTERNAL_FLAG_KEY) === "1") {
      posthog2.setPersonProperties({ $internal_or_test_user: true });
    }
  } catch {
  }
}
function scheduleLandingPostHogInit() {
  if (typeof window === "undefined") return;
  const whenIdle = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(() => initLandingPostHog(), { timeout: 4e3 });
    } else {
      window.setTimeout(initLandingPostHog, 1);
    }
  };
  if (document.readyState === "complete") whenIdle();
  else window.addEventListener("load", whenIdle, { once: true });
}
function trackCta(cta) {
  if (!posthog2.__loaded) return;
  posthog2.capture("cta_clicked", { cta, page: window.location.pathname });
}
function trackSignupStart(source) {
  if (!posthog2.__loaded) return;
  posthog2.capture(
    "signup_started",
    { source, page: window.location.pathname },
    { send_instantly: true }
  );
}
function withAttribution(path, ctaId) {
  const params = new URLSearchParams({
    utm_source: "classquill-landing",
    utm_medium: "cta",
    utm_content: ctaId
  });
  try {
    if (posthog2.__loaded) params.set("ph_did", posthog2.get_distinct_id());
  } catch {
  }
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}${params.toString()}`;
}

// src/lib/native.ts
import { Capacitor } from "@capacitor/core";
import { Browser } from "@capacitor/browser";

// src/hooks/platform/use-mobile.ts
import * as React4 from "react";
var MOBILE_BREAKPOINT = 768;

// src/lib/native.ts
function isIPadWeb() {
  return /iPad/.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
}
function getDeviceClass() {
  const platform = Capacitor.getPlatform();
  if (platform === "android") return "mobile";
  if (platform === "ios") return window.innerWidth >= MOBILE_BREAKPOINT ? "tablet" : "mobile";
  if (isIPadWeb()) return "tablet";
  if (window.innerWidth < MOBILE_BREAKPOINT) return "mobile";
  return "desktop";
}
function isNative() {
  return Capacitor.isNativePlatform();
}
function getPlatform() {
  return Capacitor.getPlatform();
}
async function openExternalUrl(url) {
  if (Capacitor.isNativePlatform()) {
    await Browser.open({ url });
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

// src/lib/orgSubdomain.ts
var TENANT_ROOT_DOMAINS = ["equateit.com.au", "classquill.com"];
var RESERVED_SLUGS = /* @__PURE__ */ new Set([
  "www",
  "app",
  "api",
  "auth",
  "admin",
  "staging",
  "beta",
  "mail",
  "support",
  "static",
  "assets",
  "cdn",
  "status",
  "help",
  "docs",
  // App variants (not orgs)
  "methods"
]);
function getOrgSlugFromHostname(hostname = window.location.hostname) {
  const parts = hostname.split(".");
  for (const root of TENANT_ROOT_DOMAINS) {
    const rootParts = root.split(".");
    if (parts.length <= rootParts.length) continue;
    if (parts.slice(-rootParts.length).join(".") !== root) continue;
    const slug = parts[0];
    return RESERVED_SLUGS.has(slug) ? null : slug;
  }
  return null;
}
function isAppHost(hostname = window.location.hostname) {
  return hostname.split(".")[0] === "app";
}
function applyNoindexForAppHost(doc = document, hostname = typeof window !== "undefined" ? window.location.hostname : "") {
  if (!isAppHost(hostname)) return false;
  const existing = doc.head.querySelector('meta[name="robots"]');
  if (existing) {
    existing.setAttribute("content", "noindex, nofollow");
    return true;
  }
  const meta = doc.createElement("meta");
  meta.setAttribute("name", "robots");
  meta.setAttribute("content", "noindex, nofollow");
  doc.head.appendChild(meta);
  return true;
}
function isUnderTenantRoot(host) {
  return TENANT_ROOT_DOMAINS.some((root) => host === root || host.endsWith("." + root));
}
function isLocalOrPreviewHost(host) {
  if (host === "localhost" || host.endsWith(".localhost")) return true;
  if (host === "127.0.0.1" || host === "::1") return true;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return true;
  if (host.endsWith(".web.app") || host.endsWith(".firebaseapp.com")) return true;
  if (host.endsWith(".pages.dev")) return true;
  return false;
}
function resolveTenant(hostname = getEffectiveHostname()) {
  const slug = getOrgSlugFromHostname(hostname);
  if (slug) return { kind: "subdomain", slug, host: hostname };
  if (isUnderTenantRoot(hostname)) return { kind: "main" };
  if (isLocalOrPreviewHost(hostname)) return { kind: "main" };
  return { kind: "custom_domain", host: hostname };
}
var TENANT_HOST_OVERRIDE_KEY = "classquill:tenant_host_override";
function getEffectiveHostname() {
  if (typeof window === "undefined") return "";
  const realHost = window.location.hostname;
  const isDev = realHost === "localhost" || realHost === "127.0.0.1" || realHost.endsWith(".localhost");
  if (isDev) {
    try {
      const q = new URLSearchParams(window.location.search).get("tenantHost");
      if (q) {
        sessionStorage.setItem(TENANT_HOST_OVERRIDE_KEY, q);
        return q;
      }
      const stored = sessionStorage.getItem(TENANT_HOST_OVERRIDE_KEY);
      if (stored) return stored;
    } catch {
    }
    return realHost;
  }
  try {
    sessionStorage.removeItem(TENANT_HOST_OVERRIDE_KEY);
  } catch {
  }
  return realHost;
}

// src/lib/sentry.ts
import * as Sentry from "@sentry/react";
var ERROR_FIELD_KEYS = ["code", "details", "hint", "status", "statusCode"];
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
function safeStringify(value) {
  try {
    const json = JSON.stringify(value);
    if (json && json !== "{}" && json !== "null") return json;
  } catch {
  }
  return Object.prototype.toString.call(value);
}
function normalizeError(error) {
  if (error instanceof Error) {
    return { error, fields: {} };
  }
  if (typeof error === "string") {
    return { error: new Error(error), fields: {} };
  }
  if (isRecord(error)) {
    const fields = {};
    for (const key of ERROR_FIELD_KEYS) {
      if (error[key] !== void 0 && error[key] !== null) fields[`error_${key}`] = error[key];
    }
    const rawMessage = error.message;
    const message = typeof rawMessage === "string" && rawMessage.trim() !== "" ? rawMessage : safeStringify(error);
    const err = new Error(message);
    if (typeof error.name === "string" && error.name) err.name = error.name;
    return { error: err, fields };
  }
  return { error: new Error(String(error)), fields: {} };
}
function reportError(error, context, extra, severity) {
  const { error: err, fields } = normalizeError(error);
  console.error(`[${context}]`, error);
  Sentry.captureException(err, {
    level: severity ?? "error",
    extra: { context, ...fields, ...extra }
  });
}
function reportMessage(message, context, extra, severity) {
  console.error(`[${context}] ${message}`);
  Sentry.captureMessage(message, {
    level: severity ?? "error",
    extra: { context, ...extra }
  });
}
function identifyUser(user) {
  if (user) {
    Sentry.setUser({ id: user.id, email: user.email, username: user.name });
  } else {
    Sentry.setUser(null);
  }
}
function addBreadcrumb2(category, message, data, level) {
  Sentry.addBreadcrumb({ category, message, data, level: level ?? "info" });
}

// src/i18n/languages.ts
var SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", flag: "\u{1F1EC}\u{1F1E7}", flagCountry: "gb" },
  { code: "de", label: "Deutsch", flag: "\u{1F1E9}\u{1F1EA}", flagCountry: "de" },
  { code: "es", label: "Espa\xF1ol", flag: "\u{1F1EA}\u{1F1F8}", flagCountry: "es" },
  { code: "fr", label: "Fran\xE7ais", flag: "\u{1F1EB}\u{1F1F7}", flagCountry: "fr" },
  { code: "nl", label: "Nederlands", flag: "\u{1F1F3}\u{1F1F1}", flagCountry: "nl" }
];
var SUPPORTED_CODES = SUPPORTED_LANGUAGES.map((l) => l.code);
function isSupportedLanguage(code) {
  return SUPPORTED_CODES.includes(code);
}

// src/brand.ts
var PRODUCT_NAME = "ClassQuill";
var PRODUCT_TAGLINE = "The operating system for your tutoring business.";
var BASE_URL = "https://classquill.com";
var AI_INTEGRATION_EMAIL = "info@classquill.com";
var AI_INTEGRATION_SUBJECT = "Automation enquiry";
var AI_INTEGRATION_MAILTO = `mailto:${AI_INTEGRATION_EMAIL}?subject=${encodeURIComponent(
  AI_INTEGRATION_SUBJECT
)}`;
var FIND_A_TUTOR_PATH = "/find-tutor";
var LINKEDIN_URL = "https://www.linkedin.com/company/classquill/";
var CONTACT_EMAIL = "info@classquill.com";
var CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
var CONTACT_PATH = "/contact/";
var EQUATEIT_URL = "https://equateit.com.au";
var DEMO_PATH = "/demo/";
var PRICING_PATH = "/pricing/";
var SIGNUP_PATH = "/auth-card?mode=signup&intent=educator";
var APP_ENV = import.meta.env;
var APP_URL = APP_ENV?.VITE_CENTRAL_AUTH_ORIGIN ?? (typeof window !== "undefined" ? window.location.origin : "https://app.classquill.com");
function buildAppUrl(path) {
  return `${APP_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
function goToApp(path) {
  window.location.assign(buildAppUrl(path));
}
var APP_STORE_URL = "https://apps.apple.com/app/id6766400569";
var GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.equateit.app";

// src/regions.ts
import { useEffect as useEffect3, useState as useState4 } from "react";
var REGIONS = [
  {
    code: "au",
    segment: "",
    label: "Australia",
    htmlLang: "en-AU",
    ogLocale: "en_AU",
    curriculum: "the Australian Curriculum (ACARA F\u201310 & VCE)",
    curriculumShort: "Australian Curriculum (ACARA F\u201310 & VCE)",
    currencySymbol: "A$",
    taxTerm: "GST",
    complianceTerm: "WWCC",
    spelling: "au",
    published: true
  },
  {
    code: "uk",
    segment: "uk",
    label: "the UK",
    htmlLang: "en-GB",
    ogLocale: "en_GB",
    curriculum: "the National Curriculum (GCSE & A-Level)",
    curriculumShort: "National Curriculum (GCSE & A-Level)",
    currencySymbol: "\xA3",
    taxTerm: "VAT",
    complianceTerm: "DBS check",
    spelling: "au",
    published: false
    // GATE: needs UK curriculum content + £ pricing before publish
  },
  {
    code: "us",
    segment: "us",
    label: "the US",
    htmlLang: "en-US",
    ogLocale: "en_US",
    curriculum: "Common Core & AP",
    curriculumShort: "Common Core & AP",
    currencySymbol: "US$",
    taxTerm: "sales tax",
    complianceTerm: "background check",
    spelling: "us",
    published: false
    // GATE: needs US curriculum content + US$ pricing before publish
  }
];
var DEFAULT_REGION = "au";
var BY_CODE = Object.fromEntries(
  REGIONS.map((r) => [r.code, r])
);
var getRegion = (code) => BY_CODE[code];
var publishedRegions = () => REGIONS.filter((r) => r.published);
function resolveRegion(pathname) {
  const first = pathname.replace(/^\/+/, "").split("/")[0]?.toLowerCase();
  const match = REGIONS.find((r) => r.segment !== "" && r.segment === first);
  return match && match.published ? match.code : DEFAULT_REGION;
}
function stripRegion(pathname) {
  const region = resolveRegion(pathname);
  const seg = getRegion(region).segment;
  if (!seg) return pathname;
  const stripped = pathname.replace(new RegExp(`^/${seg}(?=/|$)`), "");
  return stripped === "" ? "/" : stripped;
}
function regionUrl(region, neutralPath) {
  const base = region.segment ? `/${region.segment}` : "";
  const path = neutralPath === "/" ? "/" : neutralPath;
  const full = `${base}${path}`;
  const slashed = full.endsWith("/") ? full : `${full}/`;
  return `${BASE_URL}${slashed}`;
}
function hreflangAlternates(currentPath) {
  const neutral = stripRegion(currentPath);
  const alts = publishedRegions().map((r) => ({
    hreflang: r.htmlLang.toLowerCase(),
    href: regionUrl(r, neutral)
  }));
  const def = getRegion(DEFAULT_REGION);
  alts.push({ hreflang: "x-default", href: regionUrl(def, neutral) });
  return alts;
}
var CURRENCIES = {
  USD: { code: "USD", symbol: "$", flag: "\u{1F1FA}\u{1F1F8}", rateFromUsd: 1 },
  AUD: { code: "AUD", symbol: "A$", flag: "\u{1F1E6}\u{1F1FA}", rateFromUsd: 1.5 },
  GBP: { code: "GBP", symbol: "\xA3", flag: "\u{1F1EC}\u{1F1E7}", rateFromUsd: 0.8 },
  EUR: { code: "EUR", symbol: "\u20AC", flag: "\u{1F1EA}\u{1F1FA}", rateFromUsd: 0.93 }
};
var DEFAULT_CURRENCY = "USD";
var EUROZONE = /* @__PURE__ */ new Set([
  "AT",
  "BE",
  "CY",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PT",
  "SK",
  "SI",
  "ES"
]);
function currencyForCountry(country) {
  if (!country) return DEFAULT_CURRENCY;
  const c = country.toUpperCase();
  if (c === "AU") return "AUD";
  if (c === "GB" || c === "IE") return "GBP";
  if (EUROZONE.has(c)) return "EUR";
  return DEFAULT_CURRENCY;
}
function convert(usdAmount, currency) {
  return Math.round(usdAmount * CURRENCIES[currency].rateFromUsd);
}
function injectedCountry() {
  if (typeof window === "undefined") return void 0;
  return window.__GEO_COUNTRY__;
}
function detectCountry() {
  const real = injectedCountry();
  if (real) return real;
  if (typeof Intl !== "undefined") {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.startsWith("Australia/")) return "AU";
    if (tz === "Europe/London" || tz === "Europe/Dublin") return "GB";
    if (tz.startsWith("Europe/")) return "DE";
  }
  if (typeof navigator === "undefined" || typeof Intl === "undefined") {
    return void 0;
  }
  try {
    const region = new Intl.Locale(navigator.language || "en-US").region;
    if (region) return region;
  } catch {
  }
  return void 0;
}
function useLandingCurrency() {
  const [currencyCode, setCurrencyCode] = useState4(DEFAULT_CURRENCY);
  useEffect3(() => {
    setCurrencyCode(detectCurrency());
  }, []);
  return CURRENCIES[currencyCode];
}
function detectCurrency() {
  return currencyForCountry(detectCountry());
}

// src/seo/faqs.ts
var faqs = [
  {
    question: "We already use Wise / TutorCruncher / Teachworks. Why switch?",
    answer: "They run your operations \u2014 scheduling, billing, payroll. We add the part they leave out: proof your students are actually learning. Keep your ops tool or replace it; either way you get a built-in learning platform, auto-marked homework, and outcomes you can show parents."
  },
  {
    question: "Will my tutors actually use it, or resist it?",
    answer: "It saves them time. They set homework once and it auto-marks, and parent updates generate from real results \u2014 so it's less admin, not more. Tutors walk into each session already knowing where the student dropped marks."
  },
  {
    question: "How does migration and data import work?",
    answer: "We help you bring students, tutors and your schedule across from your current tool or a spreadsheet. Most centres are up and running in days. Book a demo and we'll map your migration on the call."
  },
  {
    question: "Can I brand it as my own?",
    answer: "Yes \u2014 white-label branding is included. Your students and parents see your centre name and logo, not ours."
  },
  {
    question: "How does pricing work?",
    answer: "US$20/mo for your first tutor, then US$6/mo for each additional tutor \u2014 the full learning platform is included for every tutor. The AI Assistant add-on is optional and priced per active user, whether that's a student or a tutor \u2014 same price either way. See your total on the pricing page, or we'll size your quote on the demo."
  },
  {
    question: "Is my data secure, and do I own it?",
    answer: "Your data is yours. We take minors' data seriously, payments run through Stripe, and accounting syncs to Xero. You can export your data at any time."
  },
  {
    question: "What about invoicing and getting paid?",
    answer: "Invoices auto-draft when a session completes, with Stripe payment links and Xero sync. (Fully-automatic send and dunning is on the roadmap \u2014 drafts are reviewed and sent today.) Tutor payroll runs through Stripe Connect direct payouts."
  },
  {
    question: "Does ClassQuill include a whiteboard for online lessons?",
    answer: "Yes \u2014 a live whiteboard is built into every session alongside our built-in video, with a maths-teacher stencil library included. You don't need a separate app like Pencil Spaces or Lessonspace."
  },
  {
    question: "Can students ask their tutor about a specific question?",
    answer: "Yes. On any question, a student can bookmark it for revision or send it to their tutor with their draft answer and whiteboard working attached. The tutor gets it in chat and can reply or work through the question directly. Tutors also see which questions multiple students in a class have saved \u2014 a ready-made revision list for the next session."
  }
];

// src/seo/StructuredData.tsx
import { Helmet } from "react-helmet-async";
import { jsx as jsx16 } from "react/jsx-runtime";
var ORG_ID = `${BASE_URL}/#organization`;
var WEBSITE_ID = `${BASE_URL}/#website`;
var organizationNode = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: PRODUCT_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/classquill-logo.svg`,
  sameAs: [LINKEDIN_URL],
  description: "The operating system for tutoring businesses \u2014 scheduling, billing and payroll, plus a built-in learning platform with auto-marked practice and tutor review.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@classquill.com",
    contactType: "sales",
    areaServed: "AU"
  }
};
var websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: PRODUCT_NAME,
  url: BASE_URL,
  publisher: { "@id": ORG_ID }
};
var softwareApplicationNode = {
  // Multi-typed so AI search + Google read it as a product, not just an app.
  "@type": ["SoftwareApplication", "Product"],
  name: PRODUCT_NAME,
  url: BASE_URL,
  brand: { "@id": ORG_ID },
  category: "Tutoring business management software",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: `${PRODUCT_NAME} is ${PRODUCT_TAGLINE.charAt(0).toLowerCase()}${PRODUCT_TAGLINE.slice(1)} Scheduling, billing and payroll, plus a built-in learning platform your tutors teach in: set homework once, it's auto-marked with tutor review, and every result is visible to you and to parents.`,
  audience: {
    "@type": "BusinessAudience",
    name: "Tutoring businesses"
  },
  // AggregateOffer with only lowPrice: the real published entry price (matches
  // the Hero + pricing page). Pricing scales per tutor and per active-student
  // add-on, so there is deliberately no single `price`.
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "20",
    priceCurrency: "USD",
    description: "From US$20/mo for your first tutor, US$6/mo each additional tutor. Unlimited students are free; the optional AI Assistant add-on is priced per active user \u2014 same price for a student or a tutor."
  }
};
function StructuredData({ software, faqs: faqs2, breadcrumbs }) {
  const graph = [organizationNode, websiteNode];
  if (software) graph.push(softwareApplicationNode);
  if (faqs2 && faqs2.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs2.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer }
      }))
    });
  }
  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: `${BASE_URL}${b.path}`
      }))
    });
  }
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
  return /* @__PURE__ */ jsx16(Helmet, { children: /* @__PURE__ */ jsx16("script", { type: "application/ld+json", children: json }) });
}

// src/seo/SEOHead.tsx
import { Helmet as Helmet2 } from "react-helmet-async";
import { jsx as jsx17, jsxs as jsxs10 } from "react/jsx-runtime";
var DEFAULT_SITE_NAME = "EquateIt";
var DEFAULT_BASE_URL = "https://equateit.com.au";
function SEOHead({
  title,
  description,
  path = "/",
  ogImage,
  noIndex = false,
  siteName = DEFAULT_SITE_NAME,
  baseUrl = DEFAULT_BASE_URL,
  htmlLang,
  ogLocale = "en_AU",
  alternates
}) {
  const fullTitle = title ? title.includes(siteName) ? title : `${title} | ${siteName}` : `${siteName} | Maths & Science Tutoring for Years 7\u201312`;
  const canonicalPath = path.endsWith("/") ? path : `${path}/`;
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  const resolvedOgImage = ogImage ?? `${baseUrl}/og-image.png`;
  return /* @__PURE__ */ jsxs10(Helmet2, { children: [
    htmlLang && /* @__PURE__ */ jsx17("html", { lang: htmlLang }),
    /* @__PURE__ */ jsx17("title", { children: fullTitle }),
    description && /* @__PURE__ */ jsx17("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx17("link", { rel: "canonical", href: canonicalUrl }),
    noIndex && /* @__PURE__ */ jsx17("meta", { name: "robots", content: "noindex, nofollow" }),
    alternates?.map((alt) => /* @__PURE__ */ jsx17("link", { rel: "alternate", hrefLang: alt.hreflang, href: alt.href }, alt.hreflang)),
    /* @__PURE__ */ jsx17("meta", { property: "og:type", content: "website" }),
    /* @__PURE__ */ jsx17("meta", { property: "og:url", content: canonicalUrl }),
    /* @__PURE__ */ jsx17("meta", { property: "og:title", content: fullTitle }),
    description && /* @__PURE__ */ jsx17("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx17("meta", { property: "og:image", content: resolvedOgImage }),
    /* @__PURE__ */ jsx17("meta", { property: "og:locale", content: ogLocale }),
    /* @__PURE__ */ jsx17("meta", { property: "og:site_name", content: siteName }),
    /* @__PURE__ */ jsx17("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx17("meta", { name: "twitter:title", content: fullTitle }),
    description && /* @__PURE__ */ jsx17("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx17("meta", { name: "twitter:image", content: resolvedOgImage })
  ] });
}

// src/seo/LandingSEOHead.tsx
import { jsx as jsx18 } from "react/jsx-runtime";
function LandingSEOHead(props) {
  const region = getRegion(DEFAULT_REGION);
  return /* @__PURE__ */ jsx18(
    SEOHead,
    {
      htmlLang: region.htmlLang,
      ogLocale: region.ogLocale,
      alternates: props.noIndex ? void 0 : hreflangAlternates(props.path ?? "/"),
      ...props,
      siteName: PRODUCT_NAME,
      baseUrl: BASE_URL
    }
  );
}
export {
  AI_INTEGRATION_EMAIL,
  AI_INTEGRATION_MAILTO,
  AI_INTEGRATION_SUBJECT,
  APP_STORE_URL,
  APP_URL,
  BADGE_BASE_URL,
  BASE_URL,
  Badge,
  Button,
  CONSENT_EVENT,
  CONSENT_STORAGE_KEY,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  CONTACT_PATH,
  COUNTRY_CODES,
  CURRENCIES,
  CardListSkeleton,
  ChatSkeleton,
  DEFAULT_COUNTRY_CODE,
  DEFAULT_CURRENCY,
  DEFAULT_PHONE_COUNTRY,
  DEFAULT_REGION,
  DEMO_PATH,
  EQUATEIT_URL,
  EU_COOKIE_NAME,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyState,
  EmptyTitle,
  FIND_A_TUTOR_PATH,
  GOOGLE_PLAY_URL,
  IconTile,
  Input,
  ItemListSkeleton,
  LINKEDIN_URL,
  Label,
  LandingSEOHead,
  PHONE_COUNTRIES,
  PRICING_PATH,
  PRODUCT_NAME,
  PRODUCT_TAGLINE,
  PageGridSkeleton,
  PhoneCountrySelect,
  PhoneInput,
  QueryErrorState,
  REGIONS,
  RESERVED_SLUGS,
  SEOHead,
  SIGNUP_PATH,
  SUPPORTED_CODES,
  SUPPORTED_LANGUAGES,
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
  ShellSkeleton,
  Skeleton,
  SkeletonContent,
  SkeletonGroup,
  StructuredData,
  TENANT_ROOT_DOMAINS,
  Textarea,
  UserAvatar,
  activateProps,
  addBreadcrumb2 as addBreadcrumb,
  applyNoindexForAppHost,
  badgeEmbedCode,
  badgeVariants,
  buildAppUrl,
  buttonVariants,
  cn,
  convert,
  countryForDialCode,
  currencyForCountry,
  detectCountry,
  detectCurrency,
  dialCodeForCountry,
  faqs,
  formatPhoneDisplay,
  formatTelHref,
  getDeviceClass,
  getEffectiveHostname,
  getInitials,
  getLayoutHint,
  getOrgSlugFromHostname,
  getPlatform,
  getReadingTimeMinutes,
  getRegion,
  getRelatedPosts,
  getSidebarWidthClass,
  getStoredConsent,
  goToApp,
  hreflangAlternates,
  identifyAnalytics,
  identifyUser,
  initLandingPostHog,
  interactiveSurface,
  isAppHost,
  isNative,
  isSupportedLanguage,
  loadGatedScripts,
  nestedOverlayLayer,
  normalizeError,
  normalizeLocalNumber,
  openExternalUrl,
  phoneCountry,
  phoneCountryFromGeo,
  phoneMessage,
  posthog2 as posthog,
  publishedRegions,
  regionUrl,
  reportError,
  reportMessage,
  resolveEuGated,
  resolveRegion,
  resolveTenant,
  scheduleLandingPostHogInit,
  selectTriggerClass,
  setStoredConsent,
  stripRegion,
  tokenValue,
  trackCta,
  trackEvent,
  trackSignupStart,
  useLandingCurrency,
  validatePhone,
  withAttribution
};
//# sourceMappingURL=index.js.map