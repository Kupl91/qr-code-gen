import { WorkerFormData } from "@/entities/worker/model/types"

export const generateVCard = (data: WorkerFormData) => {
  const fields = [
    { label: 'Имя', value: data.firstname },
    { label: 'Фамилия', value: data.lastname },
    { label: 'Организация', value: data.organization },
    { label: 'Должность', value: data.position },
    { label: 'Рабочий телефон', value: data.phoneWork },
    { label: 'Мобильный телефон', value: data.phoneMobile },
    { label: 'Email', value: data.email },
    { label: 'Веб-сайт', value: data.website }
  ]
  .filter(field => field.value) // Убираем пустые поля
  .map(field => `${field.label}${field.value}`)
  .join('\n')

  return `BEGIN:VCARD
VERSION:3.0
${fields}
END:VCARD`
}
