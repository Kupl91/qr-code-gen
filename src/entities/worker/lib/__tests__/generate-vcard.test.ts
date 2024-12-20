import { generateVCard } from '../generate-vcard'
import { mockWorkerData } from '@/shared/api/mocks/worker'

describe('generateVCard', () => {
  it('генерирует корректную vCard строку', () => {
    const vcard = generateVCard(mockWorkerData)

    expect(vcard).toContain('BEGIN:VCARD')
    expect(vcard).toContain('VERSION:3.0')
    expect(vcard).toContain(`FN:${mockWorkerData.firstname} ${mockWorkerData.lastname}`)
    expect(vcard).toContain('END:VCARD')
  })

  it('корректно обрабатывает опциональные поля', () => {
    const dataWithoutMobile = { ...mockWorkerData, phoneMobile: undefined }
    const vcard = generateVCard(dataWithoutMobile)

    expect(vcard).not.toContain('TEL;TYPE=CELL:')
  })

  it('экранирует специальные символы', () => {
    const dataWithSpecialChars = {
      ...mockWorkerData,
      firstname: 'John; Smith',
      email: 'john,smith@example.com'
    }
    const vcard = generateVCard(dataWithSpecialChars)

    expect(vcard).toContain('John\\; Smith')
    expect(vcard).toContain('john\\,smith@example.com')
  })
}) 