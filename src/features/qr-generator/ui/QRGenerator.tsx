'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { QRCode } from '@jackybaby/react-custom-qrcode'
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Card } from "@/shared/ui/card"
import { workerSchema, WorkerFormData } from '@/entities/worker/model/types'
import { mockUserData } from '@/shared/api/mock'
import { setWorkerData } from '@/entities/worker/model/slice'
import { useDownloadQR } from '@/shared/lib/useDownloadQr'
import { generateVCard } from '@/widgets/qr-generator/lib/generate-vcard'

export function QRGenerator() {
  const dispatch = useDispatch()
  const { downloadQRCode } = useDownloadQR()
  
  const { register, setValue, watch } = useForm<WorkerFormData>({
    resolver: zodResolver(workerSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      organization: '',
      position: '',
      phoneWork: '',
      phoneMobile: '',
      email: '',
      website: ''
    }
  })

  useEffect(() => {
    const workerData = {
      firstname: mockUserData.firstName,
      lastname: mockUserData.lastName,
      organization: mockUserData.organizationName,
      position: mockUserData.positionName,
      phoneWork: mockUserData.phone,
      phoneMobile: '',
      email: mockUserData.email,
      website: ''
    }
    
    Object.entries(workerData).forEach(([key, value]) => {
      setValue(key as keyof WorkerFormData, value)
    })
    
    dispatch(setWorkerData(workerData))
  }, [setValue, dispatch])

  const formData = watch()
  const qrCodeId = "qr-code-canvas"

  return (
    <div className="container mx-auto p-4 grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <Card className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstname">Имя</Label>
              <Input
                id="firstname"
                {...register('firstname')}
              />
            </div>
            <div>
              <Label htmlFor="lastname">Фамилия</Label>
              <Input
                id="lastname"
                {...register('lastname')}
              />
            </div>
            <div>
              <Label htmlFor="organization">Организация</Label>
              <Input
                id="organization"
                {...register('organization')}
              />
            </div>
            <div>
              <Label htmlFor="position">Должность</Label>
              <Input
                id="position"
                {...register('position')}
              />
            </div>
            <div>
              <Label htmlFor="phoneWork">Рабочий телефон</Label>
              <Input
                id="phoneWork"
                {...register('phoneWork')}
              />
            </div>
            <div>
              <Label htmlFor="phoneMobile">Мобильный телефон</Label>
              <Input
                id="phoneMobile"
                {...register('phoneMobile')}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
              />
            </div>
            <div>
              <Label htmlFor="website">Веб-сайт</Label>
              <Input
                id="website"
                {...register('website')}
              />
            </div>
          </div>
        </Card>
      </div>
      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex justify-center mb-4">
            <QRCode
              value={generateVCard(formData)}
              size={256}
              ecLevel="H"
              quietZone={0}
              id={qrCodeId}
              qrStyle="dots"
              logoImage="/main-logo.svg"
              logoWidth={48}
              logoHeight={48}
              removeQrCodeBehindLogo={true}
              eyeRadius={1080}
              eyeColor={['#000000', '#000000', '#000000']}
              bgColor="#FFFFFF"
              fgColor="#000000"
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            />
          </div>
          <div className="flex justify-center">
            <Button onClick={() => downloadQRCode(qrCodeId)}>
              Скачать PNG
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
} 