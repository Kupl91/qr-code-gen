import { WorkerDTO } from '@/entities/worker'

export function useQRGeneration() {
  const generateVCard = (data: WorkerDTO): string => {
    return `BEGIN:VCARD
VERSION:3.0
N:${data.lastname};${data.firstname};;;
FN:${data.firstname} ${data.lastname}
ORG:${data.organization}
TITLE:${data.position}
TEL;TYPE=WORK:${data.phoneWork}
${data.phoneMobile ? `TEL;TYPE=CELL:${data.phoneMobile}` : ''}
EMAIL:${data.email}
URL:${data.website}
END:VCARD`
  }

  return { generateVCard }
} 