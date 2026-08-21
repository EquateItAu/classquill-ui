import { Skeleton, SkeletonGroup } from '@/components/ui/skeleton'
import { PageGridSkeleton, ItemListSkeleton } from '@/components/ui/skeleton-compounds'
import { type LayoutHint, getSidebarWidthClass } from '@/lib/layout-config'
import { cn } from '@/lib/utils'

/**
 * Shell-shaped skeleton that mirrors the authenticated layout structure.
 *
 * ONLY for the two callers that render before any shell chrome exists at all:
 * ProtectedRoute and App.tsx's RouteSpinner. Anything mounted inside the shell's
 * <Outlet/> — the RequireRole / RequireOrgRole / RequireAdmin guards — already
 * has a real GlobalHeader above it and must use `SkeletonContent` instead;
 * using this there drew a second header stacked under the real one.
 *
 * Structure mirrors BaseAuthenticatedLayout: a viewport-height flex COLUMN with an
 * in-flow `shrink-0` header and a `flex-1 min-h-0` content region. It used to render the
 * header `fixed top-0` — which the old docstring called "identical positioning to the real
 * Navbar", but GlobalHeader is in-flow (`shrink-0`), not fixed. The consequence was that the
 * content region started at y=0 and rendered UNDERNEATH the header skeleton. That was
 * invisible while the sidebar-* content area was blank; it stopped being invisible the moment
 * that area started rendering anything.
 *
 * `h-screen` IS correct here, unlike inside the shell: ShellSkeleton renders *instead of*
 * BaseAuthenticatedLayout (from ProtectedRoute / RouteSpinner), so it genuinely owns the
 * viewport. `SkeletonContent` is the variant used inside the shell, and that one is `h-full`.
 *
 * Accepts a `layout` hint so the content area matches the target page structure.
 */
export function ShellSkeleton({ layout = 'full-width' }: { layout?: LayoutHint } = {}) {
  return (
    <SkeletonGroup label="Loading page" className="flex h-screen flex-col overflow-hidden">
      {/* Header skeleton. Height must track GlobalHeader exactly or the content below it jumps
          on hydration: h-14 (56px), and below sm: 48px plus the notch inset — NOT h-16.
          Mirrors GlobalHeader.tsx's own class string. */}
      <div className="shrink-0 w-full bg-background border-b border-border">
        <div className="flex items-center justify-between px-3 w-full h-14 max-sm:h-[calc(48px+env(safe-area-inset-top,0px))] max-sm:pt-[env(safe-area-inset-top,0px)]">
          {/* Logo */}
          <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
          {/* Nav pills */}
          <div className="hidden md:flex items-center gap-2">
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-7 w-16 rounded-full" />
          </div>
          {/* Right icons */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <SkeletonContent layout={layout} />
      </div>
    </SkeletonGroup>
  )
}

/**
 * Content-area-only skeleton (no navbar).
 * For every caller that renders inside the shell, where the real GlobalHeader is
 * already mounted: BaseAuthenticatedLayout's Suspense fallback and the
 * RequireRole / RequireOrgRole / RequireAdmin guards.
 */
export function SkeletonContent({ layout = 'full-width' }: { layout?: LayoutHint } = {}) {
  if (layout === 'full-width') {
    return <PageGridSkeleton />
  }

  if (layout === 'sidebar-icon') {
    return (
      <div className="flex h-full overflow-hidden">
        {/* Expanded classroom sidebar — matches shadcn SIDEBAR_WIDTH default (16rem = w-64) */}
        <aside className="hidden md:flex shrink-0 w-64 border-r border-border flex-col pt-3 px-2 gap-1">
          {/* Classroom name */}
          <Skeleton className="h-5 w-32 rounded-md mx-2 mb-2" />
          {/* Section nav items */}
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2.5 px-2 py-1.5">
              <Skeleton className="size-4 rounded-sm shrink-0" />
              <Skeleton className="h-3.5 rounded-md" style={{ width: `${60 + (i % 3) * 20}px` }} />
            </div>
          ))}
        </aside>
        {/* Content — community post cards, matches ClassroomPageSkeleton + CommunityTabSkeleton */}
        <div className="flex-1 p-6 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg bg-card p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-full shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3.5 w-28 rounded-md" />
                  <Skeleton className="h-3 w-20 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-3.5 w-full rounded-md" />
              <Skeleton className="h-3 w-3/4 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const widthClass = getSidebarWidthClass(layout)

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar skeleton — hidden on mobile to match real page behaviour */}
      <aside className={cn('hidden md:flex shrink-0 border-r border-border flex-col', widthClass)}>
        <div className="p-3 space-y-2">
          <Skeleton className="h-8 w-full rounded-md" />
          <ItemListSkeleton count={6} />
        </div>
      </aside>
      {/* Main content. This used to be an empty `flex-1`, on the theory that "pages like the
          dashboard hero render static content immediately" — but in the ProtectedRoute path
          this skeleton REPLACES the whole shell before any page mounts, so nothing renders
          behind it. Below md the aside is hidden too, which left every
          sidebar-* route (~30 of them, all five roles) loading to a literally blank screen. */}
      <div className="flex-1 min-w-0">
        <PageGridSkeleton />
      </div>
    </div>
  )
}
