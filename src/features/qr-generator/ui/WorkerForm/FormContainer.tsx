import { cn } from "@/shared/lib/utils"
import { Card } from "@/shared/ui/card";

interface FormContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function FormContainer({ children, className }: FormContainerProps) {
  return (
    <div className={cn(
      // Mobile first - базовые стили
      "w-full min-h-screen",
      "px-4 py-6", // Мобильные отступы
      "bg-background",
      
      // Адаптивная ширина контейнера
      "sm:px-6 sm:py-8",
      "md:px-0",
      "md:max-w-[580px]",
      "md:min-h-0",
      "mx-auto",
      
      className
    )}>
      <Card className={cn(
        "w-full",
        "bg-white",
        "shadow-sm",
        "rounded-none sm:rounded-[8px]", // Скругления только на десктопе
        "overflow-hidden"
      )}>
        {children}
      </Card>
    </div>
  )
} 