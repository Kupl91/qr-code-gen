import * as React from "react"
import { cn } from "@/shared/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full",
          "h-[36px]",
          "px-3 py-2",
          "text-[14px] leading-[20px]",
          "font-fact font-normal",
          "rounded-input",
          "border border-input-border",
          "bg-input-bg",
          "text-input-text placeholder:text-text-placeholder",
          "focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-input-focus",
          "hover:border-input-focus transition-colors",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
