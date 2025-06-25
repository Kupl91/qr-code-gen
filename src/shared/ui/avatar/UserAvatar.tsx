import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from './index'
import { cn } from '@/shared/lib/utils'

interface UserAvatarProps {
  fullname: string
  photo?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeVariants = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-16 w-16 text-base',
}

export function UserAvatar({ fullname, photo, className, size = 'md' }: UserAvatarProps) {
  // Получаем инициалы из полного имени
  const getInitials = (name: string): string => {
    if (!name) return 'Пользователь'.substring(0, 2).toUpperCase()
    
    return name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const initials = getInitials(fullname)

  return (
    <Avatar className={cn(sizeVariants[size], className)}>
      {photo && <AvatarImage src={photo} alt={fullname} />}
      <AvatarFallback className="bg-primary/10 text-primary font-medium">
        {initials}
      </AvatarFallback>
    </Avatar>
  )
} 