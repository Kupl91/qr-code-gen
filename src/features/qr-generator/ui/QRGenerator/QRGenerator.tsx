'use client'

import { useState } from 'react'
import { WorkerForm } from '../WorkerForm'
import { QRCodePreview } from '../QRCodePreview'
import { WorkerFormData } from '@/entities/worker/model/types'
import { mockUserData } from '@/shared/api/mock'
import { generateVCard } from '@/widgets/qr-generator/lib/generate-vcard'
import { useDispatch, useSelector } from 'react-redux'
import { setWorkerData } from '@/entities/worker/model/slice'
import { RootState } from '@/app/store/store'

export function QRGenerator() {
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useDispatch()
  const workerData = useSelector((state: RootState) => state.worker.data)

  const defaultValues = {
    firstname: mockUserData.firstName,
    lastname: mockUserData.lastName,
    organization: mockUserData.organizationName,
    position: mockUserData.positionName,
    phoneWork: mockUserData.phone,
    phoneMobile: '',
    email: mockUserData.email,
    website: mockUserData.website
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = (data: WorkerFormData) => {
    dispatch(setWorkerData(data))
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      {isEditing ? (
        <WorkerForm 
          defaultValues={workerData || defaultValues}
          onSave={handleSave}
        />
      ) : (
        <QRCodePreview 
          value={generateVCard(workerData || defaultValues)} 
          onEdit={handleEdit}
        />
      )}
    </div>
  )
} 