import { AlertCircle, AlertTriangle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QueryErrorStateProps {
  message?: string
  onRetry?: () => void
  retryLabel?: string
  layout?: "column" | "row"
}

export function QueryErrorState({
  message = "Failed to load data.",
  onRetry,
  retryLabel = "Retry",
  layout = "column",
}: QueryErrorStateProps) {
  if (layout === "row") {
    return (
      <div className="flex items-center justify-between gap-4 p-6">
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="size-5" />
          <span className="text-sm">{message}</span>
        </div>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RotateCcw className="size-4 mr-2" />
            {retryLabel}
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2 py-6 text-muted-foreground">
      <AlertCircle className="size-5" />
      <p className="text-sm">{message}</p>
      {onRetry && <Button variant="outline" size="sm" onClick={onRetry}>{retryLabel}</Button>}
    </div>
  )
}
