'use client'

import { useEffect, useState } from 'react'
import { WorkerForm } from '../WorkerForm'
import { QRCodePreview } from '../QRCodePreview'
import { WorkerFormData } from '@/entities/worker/model/types'
import { mockUserData } from '@/shared/api/mock'
import { generateVCard } from '@/widgets/qr-generator/lib/generate-vcard'

export function QRGenerator() {
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

  const [formData, setFormData] = useState<WorkerFormData>(defaultValues)

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      <WorkerForm 
        defaultValues={defaultValues}
        onValuesChange={setFormData}
      />
      <QRCodePreview value={generateVCard(formData)} />
    </div>
  )
} 