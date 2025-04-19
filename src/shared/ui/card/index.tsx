import * as React from "react"

import { cn } from "@/shared/lib/utils"

/**
 * Фабрика компонентов с общей структурой для уменьшения дублирования кода
 */
function createCardComponent<T extends keyof JSX.IntrinsicElements = "div">(
  displayName: string,
  defaultClassNames: string
) {
  const Component = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement>
  >(({ className, ...props }, ref) => {
    return React.createElement(
      "div" as unknown as T,
      {
        ref,
        className: cn(defaultClassNames, className),
        ...props,
      },
      props.children
    )
  })

  Component.displayName = displayName
  return Component
}

const Card = createCardComponent(
  "Card",
  "rounded-card border bg-card text-card-foreground shadow-sm"
)

const CardHeader = createCardComponent(
  "CardHeader",
  "flex flex-col space-y-1.5 p-6"
)

const CardTitle = createCardComponent(
  "CardTitle",
  "text-2xl font-semibold leading-none tracking-tight"
)

const CardDescription = createCardComponent(
  "CardDescription",
  "text-sm text-muted-foreground"
)

const CardContent = createCardComponent("CardContent", "p-6 pt-0")

const CardFooter = createCardComponent(
  "CardFooter",
  "flex items-center p-6 pt-0"
)

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
