import type { WorkerDTO } from '../api/types'

export interface WorkerSchema {
  data: WorkerDTO | null
  loading: boolean
  error: string | null
} 