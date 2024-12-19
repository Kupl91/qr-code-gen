import { WorkerDTO } from '../../api/types'

interface WorkerInfoProps {
  data: WorkerDTO
}

export function WorkerInfo({ data }: WorkerInfoProps) {
  return (
    <div className="space-y-2 text-center">
      <h2 className="text-xl font-semibold">
        {data.firstname} {data.lastname}
      </h2>
      <p className="text-sm text-gray-500">{data.position}</p>
      <p className="text-sm">{data.organization}</p>
    </div>
  )
} 