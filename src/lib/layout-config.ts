/**
 * Shared layout constants and route-to-layout mapping.
 * Single source of truth for skeleton layout matching.
 *
 * This is the THIRD route registry in the app, after `lib/shell-chrome.ts` (which mount
 * owns the chrome) and each contextual layout's own `backDestination`. It answers a
 * different question — how WIDE is the rail the skeleton should draw — so it stays
 * separate, but a route missing here is not harmless: it falls through to
 * `'full-width'`, the skeleton paints with no rail at all, and the real rail snaps in
 * on hydration. That was happening on EVERY load of the tutor and parent home pages
 * until 2026-08-09, because the map had no entry for either. `layout-config.unit.test.ts`
 * now asserts that every AppShell route resolves to a sidebar hint, so the next route
 * added without an entry fails a test instead of shipping a flash.
 */

export type LayoutHint = 'full-width' | 'sidebar-64' | 'sidebar-72' | 'sidebar-80' | 'sidebar-icon'

// First match wins — more specific prefixes must come first
const ROUTE_LAYOUT_MAP: Array<[RegExp, LayoutHint]> = [
  // sidebar-icon (shadcn collapsible="icon" sidebar — 4rem/64px collapsed)
  [/^\/classrooms/, 'sidebar-icon'],
  [/^\/my-students/, 'sidebar-icon'],
  [/^\/group\//, 'sidebar-icon'],

  // sidebar-72 (conversation/list sidebars — w-72)
  [/^\/my-tutor\/teachers/, 'sidebar-72'],
  [/^\/my-tutor\/messages/, 'sidebar-72'],
  [/^\/parent\/chats/, 'sidebar-72'],
  [/^\/parent\/dashboard\/teachers\//, 'sidebar-72'],
  [/^\/messages/, 'sidebar-72'],
  [/^\/admin\/exam-maker/, 'sidebar-72'],

  // sidebar-80 (detail/search sidebars — w-80)
  [/^\/parent\/find-tutor/, 'sidebar-80'],
  [/^\/parent\/tutor\//, 'sidebar-80'],

  // sidebar-64 (collapsible nav sidebars — w-64)
  // Everything a sidebar role (teacher / company / parent) reaches through AppShell
  // belongs here, plus the student routes that mount StudentSidebar.
  [/^\/dashboard/, 'sidebar-64'],
  [/^\/settings/, 'sidebar-64'],
  [/^\/my-tutor/, 'sidebar-64'],
  [/^\/my-bookings/, 'sidebar-64'],
  [/^\/org/, 'sidebar-64'],
  [/^\/tutor-dashboard/, 'sidebar-64'],
  [/^\/payments/, 'sidebar-64'],
  [/^\/earnings/, 'sidebar-64'],
  [/^\/calendar/, 'sidebar-64'],
  [/^\/billing/, 'sidebar-64'],
  [/^\/programs/, 'sidebar-64'],
  [/^\/news/, 'sidebar-64'],
  [/^\/parent\/dashboard/, 'sidebar-64'],
  [/^\/parent\/calendar/, 'sidebar-64'],
  [/^\/parent\/bookings/, 'sidebar-64'],
  [/^\/parent\/classrooms/, 'sidebar-64'],
  [/^\/parent\/payment-methods/, 'sidebar-64'],
  [/^\/parent\/student\//, 'sidebar-64'],
  [/^\/parent\/students\//, 'sidebar-64'],
  [/^\/progress/, 'sidebar-64'],
  [/^\/study/, 'sidebar-64'],
  [/^\/worksheets/, 'sidebar-64'],
  [/^\/exam$/, 'sidebar-64'],
]

export function getLayoutHint(pathname: string): LayoutHint {
  for (const [pattern, hint] of ROUTE_LAYOUT_MAP) {
    if (pattern.test(pathname)) return hint
  }
  return 'full-width'
}

export function getSidebarWidthClass(hint: LayoutHint): string {
  switch (hint) {
    case 'sidebar-64': return 'w-64'
    case 'sidebar-72': return 'w-72'
    case 'sidebar-80': return 'w-80'
    case 'sidebar-icon': return 'w-64'
    default: return ''
  }
}
