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
import { QRCode } from '@jackybaby/react-custom-qrcode'
import { useDownloadQR } from "@/shared/lib/hooks"
import type { QRCodePreviewProps } from '../../api/types'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback } from "@/shared/ui/avatar"
import { cn } from "@/shared/lib/utils"
import { Download, MoreVertical, Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu"

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
  const [qrSize, setQrSize] = useState(320)
  const [isLogoLoaded, setIsLogoLoaded] = useState(false)

  useEffect(() => {
    const logo = new Image()
    logo.src = "/main-logo.svg"
    logo.onload = () => setIsLogoLoaded(true)
  }, [])

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth
      let newSize = 320

      if (width >= 1024) {
        newSize = 400
      } else if (width >= 768) {
        newSize = 360
      } else if (width >= 390) {
        newSize = 340
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
    ecLevel: "L" as const,
    quietZone: 0,
    id: qrCodeId,
    qrStyle: "dots" as const,
    logoImage: isLogoLoaded ? "/main-logo.svg" : undefined,
    logoWidth: 84,
    logoHeight: 60,
    removeQrCodeBehindLogo: true,
    eyeRadius: 1080,
    eyeColor: ['#000000', '#000000', '#000000'],
    bgColor: "#FFFFFF",
    fgColor: "#000000",
  }

  return (
    <div className={cn(
      "w-full",
      "h-screen",
      "relative",
      "flex flex-col",
      "pt-[48px]",
      "pb-[24px]",
      "sm:pt-[64px]",
      "overflow-hidden",
    )}>
      <div className={cn(
        "w-full",
        "h-full",
        "px-2",
        "mx-auto",
        "sm:px-6",
        "md:px-0",
        "md:max-w-[580px]",
        "flex flex-col",
        "justify-between",
        "pt-[24px]",
      )}>
        <Card className={cn(
          "w-full",
          "min-h-[380px]",
          "sm:min-h-[480px]",
          "bg-white",
          "rounded-[32px]",
          "shadow-sm",
          "overflow-visible",
          "relative",
          "flex flex-col",
          "pb-4",
        )}>
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10">
            <Avatar className="h-[64px] w-[64px]">
              <AvatarFallback className="text-[24px]">
                {`${data.firstname[0]}${data.lastname[0]}`.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className={cn(
            "w-full",
            "flex flex-col items-center",
            "pt-[32px]",
            "px-4",
            "sm:px-8",
            "gap-[8px]",
            "sm:gap-[16px]",
          )}>
            <div className="text-center">
              <div className={cn(
                "text-[20px]",
                "leading-[24px]",
                "font-fact font-medium",
                "text-[rgb(36,36,43)]",
                "mb-[4px]"
              )}>
                {data.firstname} {data.lastname}
              </div>
              <div className={cn(
                "text-[20px]",
                "leading-[24px]",
                "font-fact font-normal",
                "text-[rgb(169,169,178)]"
              )}>
                {data.email}
              </div>
            </div>

            <div className="w-full flex justify-center">
              <div 
                className="aspect-square cursor-pointer"
                style={{ width: `${qrSize}px` }}
                onClick={() => downloadQRCode(qrCodeId)}
              >
                <QRCode {...qrConfig} />
              </div>
            </div>
          </div>
        </Card>

        <div className={cn(
          "w-full",
          "px-2",
          "sm:px-6",
          "md:px-0",
          "mt-auto",
          "pb-2",
        )}>
          <div className="flex gap-2">
            <Button 
              onClick={onEdit} 
              className={cn(
                "flex-grow",
                "h-[44px]",
                "font-fact",
                "text-[14px]",
                "leading-[20px]",
                "font-medium",
                "bg-[#4855CB]",
                "hover:bg-[#3A45A3]",
                "text-white",
                "rounded-[8px]",
                "shadow-sm",
                "mt-4",
              )}
            >
              Редактировать личные данные
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-[44px] w-[44px] p-0 mt-4">
                  <MoreVertical className="h-5 w-5 text-[#4855CB]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                side="top" 
                align="end" 
                className="rounded-[8px] bg-[#4855CB] text-white border-none p-0 min-w-[200px]"
              >
                <DropdownMenuItem 
                  onClick={() => downloadQRCode(qrCodeId)}
                  className="hover:bg-[#3A45A3] rounded-[8px] h-[44px] px-4 font-fact text-[14px] leading-[20px] font-medium cursor-pointer"
                >
                  <Download className="mr-2 h-4 w-4" />
                  <span>Скачать QR-код</span>
                </DropdownMenuItem>
                
                <div className="h-[1px] bg-[#3A45A3] mx-2"></div>
                
                <DropdownMenuItem 
                  onClick={() => {/* Здесь будет функционал смены языка */}}
                  className="hover:bg-[#3A45A3] rounded-[8px] h-[44px] px-4 font-fact text-[14px] leading-[20px] font-medium cursor-pointer"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  <span>Сменить язык</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
} 