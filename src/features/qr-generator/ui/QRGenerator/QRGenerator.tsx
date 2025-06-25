/**
 * Основной компонент генератора QR-кодов
 * 
 * Управляет состоянием редактирования данных работника и отображением QR-кода.
 * Интегрируется с Redux store для хранения данных.
 * 
 * @module features/qr-generator/ui/QRGenerator
 */

'use client'

import { useState, useEffect } from 'react'
import { WorkerForm } from '../WorkerForm'
import { QRCodePreview } from '../QRCodePreview'
import { 
  WorkerDTO, 
  workerActions, 
  selectWorkerData,
  generateVCard
} from '@/entities/worker'
// Mock данные удалены
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { useCurrentWorkerData } from '@/shared/lib/hooks/useUserData'

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
  
  // Получаем данные пользователя из API
  const { data: userWorkerData, isLoading, error } = useCurrentWorkerData()

  // Инициализируем данные работника из API при загрузке
  useEffect(() => {
    if (userWorkerData && (!workerData || workerData.fullname !== userWorkerData.fullname)) {
      console.log('Загружены новые данные пользователя:', userWorkerData.fullname)
      // Обновляем данные только если пользователь изменился
      dispatch(workerActions.setWorkerData(userWorkerData))
    }
  }, [userWorkerData, workerData, dispatch])

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

  // Показываем загрузку, если данные еще загружаются
  if (isLoading) {
    return (
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка данных пользователя...</p>
        </div>
      </div>
    )
  }

  // Определяем данные для отображения (приоритет: Redux store, затем API данные)
  const displayData = workerData || userWorkerData

  // Если нет данных и произошла ошибка, показываем сообщение
  if (!displayData && error) {
    return (
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Ошибка загрузки данных</h3>
          <p className="text-red-700 text-sm mb-4">
            Не удалось загрузить данные пользователя. Проверьте соединение с сетью и попробуйте перезагрузить страницу.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Перезагрузить
          </button>
        </div>
      </div>
    )
  }

  // Если нет данных, но нет ошибки (еще загружаются), показываем загрузку
  if (!displayData) {
    return (
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка данных пользователя...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-fluid-2">
      {isEditing ? (
        <WorkerForm 
          defaultValues={displayData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <QRCodePreview 
          value={generateVCard(displayData)}
          data={displayData}
          onEdit={handleEdit}
        />
      )}
    </div>
  )
} 