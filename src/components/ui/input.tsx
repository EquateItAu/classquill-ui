import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends Omit<React.ComponentProps<"input">, "prefix"> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  wrapperClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, type, prefix, suffix, wrapperClassName, ...props }, ref) {
    // The wrapper owns the border AND the tier-1 shadow — a nested Input (InputGroup,
    // InputField) must cancel it via wrapperClassName, not className: className lands on
    // the inner <input>, so twMerge can't reach this element.
    return (
      <div className={cn("relative flex items-center w-full h-(--control-height) pointer-coarse:h-(--control-height-touch) border rounded-(--control-radius) overflow-hidden bg-background shadow-(--control-shadow) focus-within:ring-1 focus-within:ring-ring/50 focus-within:border-primary/50 border-border transition-all", wrapperClassName)}>
        {prefix && (
          <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
            {prefix}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={cn(
            "bg-transparent border-none focus-visible:ring-0 shadow-none h-(--control-height) pointer-coarse:h-(--control-height-touch) px-(--control-padding-x) py-1 text-base transition-colors file:h-7 file:text-sm file:font-medium aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 aria-invalid:ring-[3px] file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            suffix && "pr-10",
            className
          )}
          {...props}
        />
        {suffix && (
          <div className="absolute right-0 inset-y-0 flex items-center pr-1">
            {suffix}
          </div>
        )}
      </div>
    )
  }
)

export { Input }
