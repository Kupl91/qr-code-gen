import { z } from 'zod'

export const workerSchema = z.object({
  firstname: z.string().min(2, 'Минимум 2 символа'),
  lastname: z.string().min(2, 'Минимум 2 символа'),
  position: z.string().min(2, 'Минимум 2 символа'),
  organization: z.string().min(2, 'Минимум 2 символа'),
  phoneWork: z.string().min(5, 'Введите корректный номер'),
  phoneMobile: z.string().optional(),
  email: z.string().email('Введите корректный email'),
  website: z.string().url('Введите корректный URL')
})

export type WorkerDTO = z.infer<typeof workerSchema>

export interface WorkerState {
  data: WorkerDTO | null
  loading: boolean
  error: string | null
} 