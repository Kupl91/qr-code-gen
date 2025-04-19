import { Avatar, AvatarFallback } from "@/shared/ui/avatar"
import { WorkerDTO } from '../../api/types'

interface WorkerInfoProps {
  data: WorkerDTO
}

export function WorkerInfo({ data }: WorkerInfoProps) {
  const initials = `${data.firstname[0]}${data.lastname[0]}`.toUpperCase()
  
  return (
    <div className="flex flex-col items-center space-y-2">
      <Avatar className="h-16 w-16">
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="text-center">
        <div className="text-[16px] leading-[20px] font-medium text-input-text">
          {data.firstname} {data.lastname}
        </div>
        <div className="text-[14px] leading-[20px] text-label-text">
          {data.email}
        </div>
      </div>
    </div>
  )
} 