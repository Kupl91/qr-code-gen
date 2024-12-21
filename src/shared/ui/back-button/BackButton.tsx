interface BackButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function BackButton({ 
  onClick, 
  className,
  disabled,
  loading 
}: BackButtonProps) {
  return (
    <Button 
      variant="ghost" 
      onClick={onClick}
      size="medium"
      className={cn("back-button", className)}
      disabled={disabled}
      data-state={loading ? "loading" : disabled ? "disabled" : "default"}
    >
      <ArrowLeft className="back-button-icon" />
      <span className="back-button-text">Назад</span>
    </Button>
  )
} 