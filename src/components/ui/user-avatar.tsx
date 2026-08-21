import { useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Derives up to 2 initials from a name, falling back to email or "?".
 */
export function getInitials(name?: string | null, email?: string | null): string {
  if (name && name.trim()) {
    return name
      .trim()
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }
  if (email) return email[0].toUpperCase()
  return "?"
}

interface UserAvatarProps {
  name?: string | null
  email?: string | null
  avatarUrl?: string | null
  size?: "sm" | "default" | "lg" | null
  className?: string
}

const sizeClasses = {
  sm: "size-6 text-xs rounded-md",  // rounded-md at 24px avoids the circle (rounded-lg 12px = 50% of 24px)
  default: "size-8 text-sm",
  lg: "size-10 text-sm",
} as const

export function UserAvatar({ name, email, avatarUrl, size = "default", className }: UserAvatarProps) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const showImg = avatarUrl && !imgError

  return (
    <div
      className={cn(
        // The shared decorative well (see ui/icon-tile.tsx). `ring-1 ring-border` is
        // load-bearing, not decoration: unlike `<Avatar>` (which has its own
        // `after:border-border`) this has no edge of its own, and the well is a pale
        // tint — without the ring the initials read as floating text on a white card.
        "relative flex items-center justify-center rounded-lg bg-badge-subdued ring-1 ring-border font-medium select-none shrink-0 overflow-hidden",
        size && sizeClasses[size],
        className
      )}
    >
      {/* Initials fallback — always rendered underneath */}
      {(!showImg || !imgLoaded) && (
        <span className="text-badge-subdued-foreground">
          {getInitials(name, email)}
        </span>
      )}

      {/* Image — rendered on top when available */}
      {showImg && (
        <img
          src={avatarUrl}
          alt={name || ""}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          className={cn(
            "absolute inset-0 size-full rounded-[inherit] object-cover",
            !imgLoaded && "opacity-0"
          )}
        />
      )}
    </div>
  )
}
