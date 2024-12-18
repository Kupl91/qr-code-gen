'use client'

import { QRCode } from '@jackybaby/react-custom-qrcode'
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { useDownloadQR } from '@/shared/lib/useDownloadQr'
import { useState } from 'react'

interface QRCodePreviewProps {
  value: string
  logoUrl?: string
}

export function QRCodePreview({ value, logoUrl = "/main-logo.svg" }: QRCodePreviewProps) {
  const { downloadQRCode } = useDownloadQR()
  const [isDownloading, setIsDownloading] = useState(false)
  
  const qrCodeId = "qr-code-canvas"

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      await downloadQRCode(qrCodeId)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Card className="flex-1">
      <div className="p-6 space-y-6">
        <div className="aspect-square relative">
          <QRCode
            value={value}
            size={256}
            ecLevel="H"
            quietZone={0}
            id={qrCodeId}
            qrStyle="dots"
            logoImage={logoUrl}
            logoWidth={56}
            logoHeight={40}
            removeQrCodeBehindLogo={true}
            eyeRadius={1080}
            eyeColor={['#000000', '#000000', '#000000']}
            bgColor="#FFFFFF"
            fgColor="#000000"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <Button 
          onClick={handleDownload} 
          disabled={isDownloading}
          className="w-full"
        >
          {isDownloading ? 'Скачивание...' : 'Скачать PNG'}
        </Button>
      </div>
    </Card>
  )
} 