'use client'

import { Card } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { WorkerInfo } from "@/entities/worker"
import { QRCode } from '@jackybaby/react-custom-qrcode'
import { useDownloadQR } from "@/shared/lib/hooks"
import type { QRCodePreviewProps } from '../../api/types'

export function QRCodePreview({ value, data, onEdit }: QRCodePreviewProps) {
  const { downloadQRCode } = useDownloadQR()
  const qrCodeId = "qr-code-canvas"

  return (
    <Card className="w-full flex flex-col items-center p-fluid-1 
      sm:max-w-[320px] md:max-w-[400px] lg:max-w-[480px]">
      <div className="w-full flex flex-col items-center gap-fluid-1">
        <WorkerInfo data={data} />
        
        <div 
          className="w-full max-w-[256px] aspect-square mt-fluid-2 cursor-pointer
            sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px]" 
          onClick={() => downloadQRCode(qrCodeId)}
        >
          <QRCode
            value={value}
            size={360}
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

        <Button 
          onClick={onEdit} 
          className="w-full mt-fluid-2 sm:max-w-[280px]"
        >
          Редактировать
        </Button>
      </div>
    </Card>
  )
} 