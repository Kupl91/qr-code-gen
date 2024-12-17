import { z } from 'zod'

export const workerSchema = z.object({
  firstname: z.string().min(1, 'Обязательное поле'),
  lastname: z.string().min(1, 'Обязательное поле'),
  organization: z.string().min(1, 'Обязательное поле'),
  position: z.string().min(1, 'Обязательное поле'),
  phoneWork: z.string().min(1, 'Обязательное поле'),
  phoneMobile: z.string().min(1, 'Обязательное поле'),
  email: z.string().email('Неверный формат email'),
  website: z.string().url('Неверный формат URL').optional()
})

export type WorkerFormData = z.infer<typeof workerSchema> 