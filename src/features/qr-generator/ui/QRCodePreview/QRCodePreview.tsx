'use client'

import { Card } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { WorkerInfo } from "@/entities/worker"
import { QRCode } from '@jackybaby/react-custom-qrcode'
import { useDownloadQR } from "@/shared/lib/hooks"
import type { QRCodePreviewProps } from '../../api/types'
import { useEffect, useState } from 'react'

export function QRCodePreview({ value, data, onEdit }: QRCodePreviewProps) {
  const { downloadQRCode } = useDownloadQR()
  const qrCodeId = "qr-code-canvas"
  const [qrSize, setQrSize] = useState(256)
  const [isLogoLoaded, setIsLogoLoaded] = useState(false)

  useEffect(() => {
    // Предварительная загрузка логотипа
    const logo = new Image()
    logo.src = "/main-logo.svg"
    logo.onload = () => setIsLogoLoaded(true)
  }, [])

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth
      let newSize = 256

      if (width >= 1024) {
        newSize = 360
      } else if (width >= 768) {
        newSize = 320
      } else if (width >= 640) {
        newSize = 280
      }

      setQrSize(newSize)
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const logoSize = Math.floor(qrSize * 0.15)

  const qrConfig = {
    value,
    size: qrSize,
    ecLevel: "M" as const,
    quietZone: 10,
    id: qrCodeId,
    qrStyle: "dots" as const,
    logoImage: isLogoLoaded ? "/main-logo.svg" : undefined,
    logoWidth: logoSize,
    logoHeight: logoSize,
    removeQrCodeBehindLogo: true,
    logoPadding: 5,
    logoOpacity: 1,
    eyeRadius: 1080,
    eyeColor: ['#000000', '#000000', '#000000'],
    bgColor: "#FFFFFF",
    fgColor: "#000000",
  }

  return (
    <Card className="w-full flex flex-col p-fluid-2 
      sm:max-w-[320px] md:max-w-[400px] lg:max-w-[480px]">
      <div className="w-full flex flex-col gap-fluid-2">
        {/* Информация о сотруднике */}
        <div className="w-full flex justify-center">
          <WorkerInfo data={data} />
        </div>
        
        {/* QR код */}
        <div className="w-full flex justify-center">
          <div 
            className="w-full aspect-square cursor-pointer
              hover:opacity-90 transition-opacity"
            style={{
              maxWidth: `${qrSize}px`,
            }}
            onClick={() => downloadQRCode(qrCodeId)}
          >
            <QRCode {...qrConfig} />
          </div>
        </div>

        {/* Кнопка редактирования */}
        <div className="w-full flex justify-center">
          <Button 
            onClick={onEdit} 
            className="w-full sm:max-w-[280px]"
          >
            Редактировать
          </Button>
        </div>
      </div>
    </Card>
  )
} 