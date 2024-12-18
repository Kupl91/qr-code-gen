'use client'

import { QRCode } from '@jackybaby/react-custom-qrcode'
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { useDownloadQR } from '@/shared/lib/useDownloadQr'

interface QRCodePreviewProps {
  value: string
  logoUrl?: string
  onEdit: () => void
}

export function QRCodePreview({ value, logoUrl = "/main-logo.svg", onEdit }: QRCodePreviewProps) {
  const { downloadQRCode } = useDownloadQR()
  const qrCodeId = "qr-code-canvas"

  return (
    <Card className="w-full h-screen flex flex-col justify-center items-center p-4">
      <div className="max-w-[512px] w-full aspect-square relative mb-6">
        <QRCode
          value={value}
          size={512}
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
        onClick={onEdit} 
        className="w-full max-w-[512px]"
      >
        Редактировать
      </Button>
    </Card>
  )
} 