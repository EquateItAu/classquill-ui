import { Skeleton } from '@/components/ui/skeleton'

// ---------------------------------------------------------------------------
// ItemListSkeleton — sidebar list items (avatar + two text lines)
// Use for: student list sidebar, notification lists, any avatar+name list
// ---------------------------------------------------------------------------
export function ItemListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
          <Skeleton className="size-9 rounded-full shrink-0" />
          <div className="flex-1 space-y-1.5 min-w-0">
            <Skeleton className="h-3.5 w-28 rounded-md" />
            <Skeleton className="h-3 w-20 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// CardListSkeleton — session/booking cards (icon + text + badge)
// Use for: session cards, booking cards, teacher/student cards
// ---------------------------------------------------------------------------
export function CardListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border rounded-lg bg-card p-3 flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-md shrink-0" />
          <div className="flex-1 space-y-1.5 min-w-0">
            <Skeleton className="h-3.5 w-40 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full shrink-0" />
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// ChatSkeleton — chat message placeholders aligned to bottom
// Use for: message lists, conversation views
// ---------------------------------------------------------------------------
export function ChatSkeleton() {
  return (
    <div className="flex flex-col justify-end gap-3 h-full pb-2">
      <div className="flex items-end gap-2">
        <Skeleton className="size-7 rounded-full shrink-0" />
        <Skeleton className="h-9 w-48 rounded-2xl rounded-bl-sm" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-9 w-40 rounded-2xl rounded-br-sm" />
      </div>
      <div className="flex items-end gap-2">
        <Skeleton className="size-7 rounded-full shrink-0" />
        <Skeleton className="h-6 w-52 rounded-2xl rounded-bl-sm" />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// PageGridSkeleton — full-page grid of cards
// Use for: dashboards, classroom pages, complex pages with unknown shape
// ---------------------------------------------------------------------------
export function PageGridSkeleton({
  cols = 2,
  count = 4,
}: {
  cols?: 2 | 3
  count?: number
}) {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-48 rounded-md" />
      {/* Single-column base: `cols` is the DESKTOP column count, not an absolute one.
          A hard grid-cols-3 gave three ~104px columns at 375px, each holding a
          w-32 (128px) skeleton that overflowed its own cell. */}
      <div
        className={
          cols === 3
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
            : 'grid grid-cols-1 sm:grid-cols-2 gap-4'
        }
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-2">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}

