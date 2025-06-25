'use client'

import { Button } from '@/shared/ui/button'
import { useLogout } from '@/shared/lib/hooks/useAuth'

interface SignOutButtonProps {
  className?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function SignOutButton({ 
  className, 
  variant = 'outline', 
  size = 'sm' 
}: SignOutButtonProps = {}) {
  const logoutMutation = useLogout()

  return (
    <Button 
      variant={variant}
      size={size}
      className={className}
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending ? 'Выход...' : 'Выйти'}
    </Button>
  )
} 