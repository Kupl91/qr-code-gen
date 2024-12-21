/**
 * Компонент предпросмотра QR-кода
 * 
 * Отображает сгенерированный QR-код с данными работника и предоставляет
 * возможность скачивания кода в формате PNG.
 * 
 * @module features/qr-generator/ui/QRCodePreview
 */

'use client'

import { Card } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { WorkerInfo } from "@/entities/worker"
import { QRCode } from '@jackybaby/react-custom-qrcode'
import { useDownloadQR } from "@/shared/lib/hooks"
import type { QRCodePreviewProps } from '../../api/types'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback } from "@/shared/ui/avatar"

/**
 * Компонент QRCodePreview
 * 
 * @component
 * @param {QRCodePreviewProps} props - Пропсы компонента
 * @example
 * return (
 *   <QRCodePreview
 *     value={vCardString}
 *     data={workerData}
 *     onEdit={handleEdit}
 *   />
 * )
 */
export function QRCodePreview({ value, data, onEdit }: QRCodePreviewProps) {
  const { downloadQRCode } = useDownloadQR()
  const qrCodeId = "qr-code-canvas"
  const [qrSize, setQrSize] = useState(256)
  const [isLogoLoaded, setIsLogoLoaded] = useState(false)

  useEffect(() => {
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

  const qrConfig = {
    value,
    size: qrSize,
    ecLevel: "M" as const,
    quietZone: 0,
    id: qrCodeId,
    qrStyle: "dots" as const,
    logoImage: isLogoLoaded ? "/main-logo.svg" : undefined,
    logoWidth: 56,
    logoHeight: 40,
    removeQrCodeBehindLogo: true,
    eyeRadius: 1080,
    eyeColor: ['#000000', '#000000', '#000000'],
    bgColor: "#FFFFFF",
    fgColor: "#000000",
  }

  return (
    <div className="relative w-[476px]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <Avatar className="h-[64px] w-[64px]">
          <AvatarFallback className="text-[24px]">
            {`${data.firstname[0]}${data.lastname[0]}`.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      <Card className="
        w-full
        min-h-[618px]
        bg-white 
        rounded-[32px_32px_32px_32px]
        mt-[32px]
        flex flex-col
        items-center
      ">
        <div className="
          w-full 
          flex flex-col 
          items-center 
          pt-[48px]
          px-0
          gap-[24px]
        ">
          <div className="text-center">
            <div className="
              text-[20px]
              leading-[24px]
              font-fact
              font-medium
              text-[rgb(36,36,43)]
              mb-[4px]
            ">
              {data.firstname} {data.lastname}
            </div>
            <div className="
              text-[20px]
              leading-[24px]
              font-fact
              font-normal
              text-[rgb(169,169,178)]
              text-left
            ">
              {data.email}
            </div>
          </div>
          
          <div className="w-full flex justify-center">
            <div 
              className="aspect-square cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                width: `${qrSize}px`,
              }}
              onClick={() => downloadQRCode(qrCodeId)}
            >
              <QRCode {...qrConfig} />
            </div>
          </div>

          <Button 
            onClick={onEdit} 
            style={{ width: `${qrSize}px` }}
            className="
              h-[44px]
              px-[24px]
              py-[12px]
              gap-[6px]
              font-fact
              text-[14px]
              leading-[20px]
              font-medium
              text-left
              bg-[#4855CB]
              hover:bg-[#3A45A3]
              rounded-[8px]
            "
          >
            Редактировать личные данные
          </Button>
        </div>
      </Card>
    </div>
  )
} 