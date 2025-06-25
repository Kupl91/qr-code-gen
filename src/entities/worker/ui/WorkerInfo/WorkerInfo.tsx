import { UserAvatar } from "@/shared/ui/avatar"
import { WorkerDTO } from '../../api/types'

interface WorkerInfoProps {
  data: WorkerDTO
}

export function WorkerInfo({ data }: WorkerInfoProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <UserAvatar 
        fullname={data.fullname} 
        photo={data.photo} 
        size="lg"
      />
      <div className="text-center">
        <div className="text-[16px] leading-[20px] font-medium text-input-text">
          {data.fullname}
        </div>
        <div className="text-[14px] leading-[20px] text-label-text">
          {data.email}
        </div>
      </div>
    </div>
  )
} 