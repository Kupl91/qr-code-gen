import { WorkerDTO } from "../api/types"

export function generateVCard(data: WorkerDTO): string {
  const {
    firstname,
    lastname,
    position,
    organization,
    phoneWork,
    phoneMobile,
    email,
    website
  } = data

  const vCard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastname};${firstname};;;`,
    `FN:${firstname} ${lastname}`,
    `ORG:${organization}`,
    `TITLE:${position}`,
    `TEL;TYPE=WORK:${phoneWork}`,
    phoneMobile ? `TEL;TYPE=CELL:${phoneMobile}` : '',
    `EMAIL:${email}`,
    `URL:${website}`,
    'END:VCARD'
  ]
    .filter(Boolean)
    .join('\n')

  return vCard
} 