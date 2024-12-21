import { cn } from "@/shared/lib/utils"

interface FormContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function FormContainer({ children, className }: FormContainerProps) {
  return (
    <div className={cn("form-container", className)}>
      {children}
    </div>
  )
} 