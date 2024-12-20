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

export function QRGenerator() {
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useAppDispatch()
  const workerData = useAppSelector(selectWorkerData)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = (data: WorkerDTO) => {
    dispatch(workerActions.setWorkerData(data))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-fluid-2">
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