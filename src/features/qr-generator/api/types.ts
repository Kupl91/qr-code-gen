import { WorkerDTO } from '@/entities/worker'

export interface QRCodePreviewProps {
  value: string
  data: WorkerDTO
  onEdit: () => void
}

export interface WorkerFormProps {
  defaultValues?: Partial<WorkerDTO>
  onValuesChange?: (values: WorkerDTO) => void
  onSave: (data: WorkerDTO) => void
  onCancel: () => void
} 