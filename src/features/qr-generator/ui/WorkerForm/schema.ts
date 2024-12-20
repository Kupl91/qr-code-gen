import { z } from 'zod'

export const workerSchema = z.object({
  firstname: z.string()
    .min(2, 'Минимум 2 символа')
    .max(50, 'Максимум 50 символов'),
  lastname: z.string()
    .min(2, 'Минимум 2 символа')
    .max(50, 'Максимум 50 символов'),
  organization: z.string()
    .min(2, 'Минимум 2 символа')
    .max(100, 'Максимум 100 символов'),
  position: z.string()
    .min(2, 'Минимум 2 символа')
    .max(100, 'Максимум 100 символов'),
  phoneWork: z.string()
    .min(10, 'Некорректный номер телефона')
    .max(20, 'Некорректный номер телефона')
    .optional()
    .nullable(),
  phoneMobile: z.string()
    .min(10, 'Некорректный номер телефона')
    .max(20, 'Некорректный номер телефона')
    .optional()
    .nullable(),
  email: z.string()
    .email('Некорректный email')
    .optional()
    .nullable(),
  website: z.string()
    .url('Некорректный URL')
    .optional()
    .nullable()
})

export type WorkerFormData = z.infer<typeof workerSchema> 