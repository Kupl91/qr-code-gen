/**
 * Типы данных для сущности Worker
 * 
 * Содержит основные интерфейсы, типы и схемы валидации для работы с данными сотрудника.
 * 
 * @module entities/worker/api/types
 */

import { z } from 'zod'

/**
 * Схема валидации данных работника
 * 
 * @constant
 */
export const workerSchema = z.object({
  fullname: z.string().min(2, 'Минимум 2 символа'),
  position: z.string().min(2, 'Минимум 2 символа'),
  organization: z.string().min(2, 'Минимум 2 символа'),
  phoneWork: z.string().min(10, 'Некорректный номер'),
  phoneMobile: z.string().min(10, 'Некорректный номер').optional(),
  email: z.string().email('Некорректный email'),
  website: z.string().url('Некорректный URL').optional(),
  photo: z.string().optional() // base64 фотография пользователя
})

/**
 * Тип данных работника
 * 
 * @interface WorkerDTO
 */
export type WorkerDTO = z.infer<typeof workerSchema>

/**
 * Состояние сущности Worker в Redux store
 * 
 * @interface WorkerState
 * @property {WorkerDTO | null} data - Данные работника
 * @property {boolean} loading - Флаг загрузки
 * @property {string | null} error - Текст ошибки
 */
export interface WorkerState {
  data: WorkerDTO | null
  loading: boolean
  error: string | null
} 