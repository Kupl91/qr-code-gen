/**
 * Worker Entity
 * 
 * Бизнес-сущность работника, содержащая типы данных, компоненты отображения,
 * Redux slice для управления состоянием и утилиты для работы с данными.
 * 
 * @module entities/worker
 */

// Типы данных
export type { WorkerDTO, WorkerState } from './api/types'
export { workerSchema } from './api/types'

// UI компоненты
export { WorkerInfo } from './ui/WorkerInfo'

// Redux
export { workerReducer, workerActions } from './model/slice'
export { selectWorkerData, selectWorkerLoading, selectWorkerError } from './model/selectors'

// Утилиты
export { generateVCard } from './lib/generate-vcard' 