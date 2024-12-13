'use client'

import { useState } from 'react'
import { QRCode } from '@jackybaby/react-custom-qrcode'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface PersonInfo {
  firstname: string
  lastname: string
  organization: string
  position: string
  phoneWork: string
  phoneMobile: string
  email: string
  website: string
}

export default function QRGenerator() {
  const [personInfo, setPersonInfo] = useState<PersonInfo>({
    firstname: '',
    lastname: '',
    organization: '',
    position: '',
    phoneWork: '',
    phoneMobile: '',
    email: '',
    website: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPersonInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const generateVCardData = () => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${personInfo.firstname} ${personInfo.lastname}
ORG:${personInfo.organization}
TITLE:${personInfo.position}
TEL;TYPE=WORK:${personInfo.phoneWork}
TEL;TYPE=CELL:${personInfo.phoneMobile}
EMAIL:${personInfo.email}
URL:${personInfo.website}
END:VCARD`
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById(qrCodeId) as HTMLCanvasElement
    if (canvas) {
      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = "qr-code.png"
      downloadLink.href = pngFile
      downloadLink.click()
    }
  }

  const qrCodeId = "qr-code-canvas"

  return (
    <div className="container mx-auto p-4 grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <Card className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstname">Firstname</Label>
              <Input
                id="firstname"
                name="firstname"
                value={personInfo.firstname}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="lastname">Lastname</Label>
              <Input
                id="lastname"
                name="lastname"
                value={personInfo.lastname}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                name="organization"
                value={personInfo.organization}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="position">Position (Work)</Label>
              <Input
                id="position"
                name="position"
                value={personInfo.position}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="phoneWork">Phone (Work)</Label>
              <Input
                id="phoneWork"
                name="phoneWork"
                value={personInfo.phoneWork}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="phoneMobile">Phone (Mobile)</Label>
              <Input
                id="phoneMobile"
                name="phoneMobile"
                value={personInfo.phoneMobile}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={personInfo.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={personInfo.website}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </Card>
      </div>
      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex justify-center mb-4">
            <QRCode
              value={generateVCardData()}
              size={256}
              ecLevel="Q"
              quietZone={10}
              id={qrCodeId}
              qrStyle="dots"
              logoImage="/placeholder.svg"
              logoWidth={24}
              logoHeight={24}
              removeQrCodeBehindLogo={true}
              eyeRadius={50}
              eyeColor={[
                '#000000',
                '#000000',
                '#000000'
              ]}
              bgColor="#FFFFFF"
              fgColor="#000000"
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            />
          </div>
          <div className="flex justify-center">
            <Button onClick={downloadQRCode}>
              Download PNG
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

