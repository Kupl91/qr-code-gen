/**
 * Типы данных для QR Generator Feature
 * 
 * Содержит интерфейсы для пропсов компонентов QRCodePreview и WorkerForm.
 * 
 * @module features/qr-generator/api/types
 */

import { WorkerDTO } from '@/entities/worker'

/**
 * Пропсы для компонента предпросмотра QR-кода
 * 
 * @interface QRCodePreviewProps
 * @property {string} value - Значение для генерации QR-кода (строка vCard)
 * @property {WorkerDTO} data - Данные работника для отображения
 * @property {() => void} onEdit - Callback для перехода в режим редактирования
 */
export interface QRCodePreviewProps {
  value: string
  data: WorkerDTO
  onEdit: () => void
}

/**
 * Пропсы для формы редактирования данных работника
 * 
 * @interface WorkerFormProps
 * @property {Partial<WorkerDTO>} [defaultValues] - Начальные значения полей формы
 * @property {(values: WorkerDTO) => void} [onValuesChange] - Callback при изменении значений
 * @property {(data: WorkerDTO) => void} onSave - Callback для сохранения данных
 * @property {() => void} onCancel - Callback для отмены редактирования
 */
export interface WorkerFormProps {
  defaultValues?: Partial<WorkerDTO>
  onValuesChange?: (values: WorkerDTO) => void
  onSave: (data: WorkerDTO) => void
  onCancel: () => void
} 