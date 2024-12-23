/**
 * Основной компонент генератора QR-кодов
 * 
 * Управляет состоянием редактирования данных работника и отображением QR-кода.
 * Интегрируется с Redux store для хранения данных.
 * 
 * @module features/qr-generator/ui/QRGenerator
 */

'use client'

import { useState } from 'react'
import { WorkerForm } from '../WorkerForm'
import { QRCodePreview } from '../QRCodePreview'
import { 
  WorkerDTO, 
  workerActions, 
  selectWorkerData,
  generateVCard
} from '@/entities/worker'
import { mockWorkerData } from '@/shared/api/mocks/worker'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'

/**
 * Компонент QRGenerator
 * 
 * @component
 * @example
 * return (
 *   <QRGenerator />
 * )
 */
export function QRGenerator() {
  // Состояние режима редактирования
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useAppDispatch()
  const workerData = useAppSelector(selectWorkerData)

  /**
   * Обработчик включения режима редактирования
   */
  const handleEdit = () => {
    setIsEditing(true)
  }

  /**
   * Обработчик сохранения данных работника
   * @param {WorkerDTO} data - Новые данные работника
   */
  const handleSave = (data: WorkerDTO) => {
    dispatch(workerActions.setWorkerData(data))
    setIsEditing(false)
  }

  /**
   * Обработчик отмены редактирования
   */
  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-fluid-2">
      {isEditing ? (
        <WorkerForm 
          defaultValues={workerData || mockWorkerData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <QRCodePreview 
          value={generateVCard(workerData || mockWorkerData)}
          data={workerData || mockWorkerData}
          onEdit={handleEdit}
        />
      )}
    </div>
  )
} 