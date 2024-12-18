'use client'

import { Card } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { WorkerInfo } from "@/entities/worker/ui/WorkerInfo/WorkerInfo"
import { WorkerFormData } from "@/entities/worker/model/types"
import { QRCode } from '@jackybaby/react-custom-qrcode'
import { useDownloadQR } from "@/shared/lib/useDownloadQr"

interface QRCodePreviewProps {
  value: string
  data: WorkerFormData
  onEdit: () => void
}

export function QRCodePreview({ value, data, onEdit }: QRCodePreviewProps) {
  const { downloadQRCode } = useDownloadQR()
  const qrCodeId = "qr-code-canvas"

  return (
    <Card className="flex-1 flex items-center justify-center">
      <div className="p-8 flex flex-col items-center max-w-[256px]">
        <WorkerInfo data={data} />
        <div 
          className="cursor-pointer mt-8" 
          onClick={() => downloadQRCode(qrCodeId)}
        >
          <div className="w-[256px] aspect-square relative">
            <QRCode
              value={value}
              size={256}
              ecLevel="H"
              quietZone={0}
              id={qrCodeId}
              qrStyle="dots"
              logoImage="/main-logo.svg"
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
        </div>
        <Button onClick={onEdit} className="mt-8 w-[256px]">
          Редактировать
        </Button>
      </div>
    </Card>
  )
} 