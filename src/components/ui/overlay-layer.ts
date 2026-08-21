/**
 * The nested-overlay contract: what a portaled overlay (Popover, Select, DropdownMenu, …) must
 * carry so it still works when it is opened *inside* an open modal.
 *
 * ── THE BUG THIS EXISTS TO PREVENT ────────────────────────────────────────────────────────────
 *
 * A Radix Popover inside a modal Dialog has already shipped here rendered but **unclickable**.
 * Measured on 2026-08-05 (frontend/scripts/responsive/nested-overlay.mjs), inside an open Credenza:
 *
 *     body            pointer-events: none      <- set by the Dialog's DismissableLayer
 *     dialog-content  pointer-events: auto      <- restored for the modal itself
 *     popover-content pointer-events: none      <- INHERITED from body. Dead.
 *
 * Radix has machinery for exactly this: every `DismissableLayer` registers in a shared context, and
 * a layer stacked above the one that disabled outside pointer events re-enables them on itself
 * (`isPointerEventsEnabled` -> inline `pointer-events: auto`). It never fired here.
 *
 * ── WHY IT NEVER FIRED (the actual root cause) ────────────────────────────────────────────────
 *
 * `DismissableLayerContext` is a MODULE-LEVEL singleton — `React.createContext(...)` with no
 * Provider anywhere. It therefore only works if every overlay shares one copy of the module. This
 * tree installs **five**, because npm nested a copy under each consumer and `vite.config.ts`
 * deduped only react/react-dom/react-router-dom/three:
 *
 *     radix-ui > Dialog       @radix-ui/react-dialog/node_modules/@radix-ui/react-dismissable-layer
 *     radix-ui > Popover      radix-ui/node_modules/@radix-ui/react-dismissable-layer
 *     radix-ui > Select       @radix-ui/react-select/node_modules/@radix-ui/react-dismissable-layer
 *     radix-ui > Tooltip      @radix-ui/react-tooltip/node_modules/@radix-ui/react-dismissable-layer
 *     radix-ui > DropdownMenu @radix-ui/react-dismissable-layer
 *
 * Five copies, five private layer registries. The Popover's registry cannot see that the Dialog
 * disabled outside pointer events, so it reports `isBodyPointerEventsDisabled === false`, writes no
 * inline style, and inherits `none`.
 *
 * Select, DropdownMenu and ContextMenu escape this by accident: they pass
 * `disableOutsidePointerEvents: true`, so each disables pointer events *in its own registry* and is
 * therefore the top layer there — it self-rescues. Popover (`modal={false}` by default), Tooltip and
 * HoverCard pass `false`, and are the ones that die. That is precisely the observed pattern: a
 * `Select` inside a Credenza has always worked, a `DatePicker` (a Popover underneath) has not.
 *
 * ── THE FIX ───────────────────────────────────────────────────────────────────────────────────
 *
 * Write what Radix would have written if the module were shared. `pointer-events-auto` on the
 * overlay's own content is a no-op when no modal is open (body is already `auto`) and is exactly
 * the value Radix computes when one is, so it is correct in both states rather than a workaround
 * for one of them.
 *
 * The layer token replaces DOM-insertion-order luck. Before this, every overlay in the app — modal
 * shells and nested dropdowns alike — was `z-50`, so "the popover paints above the dialog" held
 * only because the popover's portal happened to be appended later. `--z-overlay-nested` states it
 * instead of relying on it.
 *
 * ── THE RULE ──────────────────────────────────────────────────────────────────────────────────
 *
 * Fix it here, once. A feature component must never need to know: if a call site has to add
 * `pointer-events-auto`, a `container={dialogRef}` or a hand-rolled `zIndex: 9999` portal to make a
 * dropdown work inside a modal, the primitive is still wrong. An ESLint fence
 * (eslint.nested-overlay-fence-baseline.mjs) enforces that.
 *
 * The root cause could also be fixed at the resolver — adding
 * `@radix-ui/react-dismissable-layer` to `resolve.dedupe` in vite.config.ts, plus an npm
 * `overrides` entry to collapse the five copies to one. That is the smaller and more complete fix
 * and it would also repair Tooltip/HoverCard/NavigationMenu, but it depends on the shape of the
 * installed tree (which changes on every `npm install`) and could not be validated here because
 * `npm install` currently fails EPERM on the `equate-monorepo` symlink. This class-level fix does
 * not depend on the tree shape at all, so it holds either way — keep it even if the dedupe lands.
 */

/**
 * ── WHO CARRIES THIS ──────────────────────────────────────────────────────────────────────────
 *
 * Carrying it:  popover (and therefore date-picker + time-select), select, dropdown-menu, combobox.
 *               Every one of these demonstrably opens inside a modal in this app.
 *
 * NOT carrying it, deliberately: context-menu, menubar, hover-card, navigation-menu. They are
 * still `z-50` and still inherit `pointer-events: none` inside a modal — left alone only because
 * nothing in this app opens one inside a modal, and changing the stacking of surfaces nobody is
 * testing buys risk for no coverage. **If you put one inside a modal, add `nestedOverlayLayer` to
 * it and add a case to scripts/responsive/nested-overlay.mjs** — do not rediscover this from
 * scratch.
 *
 * Tooltip is the one exception that needed a fix rather than a shrug: it sits on its own
 * `--z-tooltip: 70` tier (index.css), ABOVE `--z-overlay-nested`'s 55 — a tooltip must out-rank
 * any overlay it can be triggered from, nested-in-a-modal or not. Before 2026-08-07 `TooltipContent`
 * hardcoded `z-50`, which lost to a plain (non-modal) Popover at `z-55` — hovering the "mark all
 * read" tick in the GlobalHeader notification Popover rendered its tooltip UNDER the popover panel.
 * `pointer-events: none` inside a modal is still nobody's problem here: nothing in this app clicks
 * a tooltip, only hovers/focuses it.
 */

/**
 * Apply to the CONTENT of any portaled overlay that can be opened from inside a modal.
 * Not for the modal shells themselves (Dialog/Drawer/Sheet/AlertDialog) — those own
 * `--z-overlay`, the layer this one deliberately sits above.
 */
export const nestedOverlayLayer = "z-(--z-overlay-nested) pointer-events-auto"
