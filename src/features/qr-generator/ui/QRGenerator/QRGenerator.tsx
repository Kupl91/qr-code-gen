'use client'

import { useState } from 'react'
import { WorkerForm } from '../WorkerForm'
import { QRCodePreview } from '../QRCodePreview'
import { WorkerDTO } from '@/entities/worker'
import { mockWorkerData } from '@/shared/api/mocks/worker'
import { useQRGeneration } from '../../model/hooks/useQRGeneration'
import { useDispatch, useSelector } from 'react-redux'
import { setWorkerData } from '@/entities/worker'
import { selectWorkerData } from '@/entities/worker'

export function QRGenerator() {
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useDispatch()
  const workerData = useSelector(selectWorkerData)
  const { generateVCard } = useQRGeneration()

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = (data: WorkerDTO) => {
    dispatch(setWorkerData(data))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
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