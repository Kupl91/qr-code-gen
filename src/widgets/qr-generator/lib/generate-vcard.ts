import { WorkerFormData } from "@/entities/worker/model/types"

export const generateVCard = (data: WorkerFormData) => {
  return `BEGIN:VCARD
VERSION:3.0
FN:${data.firstname} ${data.lastname}
ORG:${data.organization}
TITLE:${data.position}
TEL;TYPE=WORK:${data.phoneWork}
TEL;TYPE=CELL:${data.phoneMobile}
EMAIL:${data.email}
URL:${data.website}
END:VCARD`
}
