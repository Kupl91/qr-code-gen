import { generateVCard } from '../generate-vcard'
import { WorkerDTO } from '../../api/types'

describe('generateVCard', () => {
  it('генерирует корректный vCard формат', () => {
    const data: WorkerDTO = {
      fullname: 'Смит Джон Александрович',
      organization: 'ООО Бюро 1440',
      position: 'Старший разработчик',
      phoneWork: '+7 (495) 123-45-67',
      phoneMobile: undefined,
      email: 'john.smith@example.com',
      website: 'https://1440.space/'
    }

    const vcard = generateVCard(data)

    // Проверяем базовую структуру
    expect(vcard).toContain('BEGIN:VCARD')
    expect(vcard).toContain('VERSION:3.0')
    expect(vcard).toContain('END:VCARD')

    // Проверяем данные
    expect(vcard).toContain('N:Смит;Джон;Александрович;;') // Структурированное имя
    expect(vcard).toContain('FN:Смит Джон Александрович') // Отображаемое имя
    expect(vcard).toContain('ORG:ООО Бюро 1440')
    expect(vcard).toContain('TITLE:Старший разработчик')
    expect(vcard).toContain('TEL;TYPE=WORK:+7 (495) 123-45-67')
    expect(vcard).toContain('EMAIL:john.smith@example.com')
    expect(vcard).toContain('URL:https://1440.space/')
  })

  it('корректно обрабатывает имя с двумя словами', () => {
    const data: WorkerDTO = {
      fullname: 'Петров Иван',
      organization: 'ООО Бюро 1440',
      position: 'Разработчик',
      phoneWork: '+7 (495) 123-45-67',
      email: 'ivan.petrov@example.com'
    }

    const vcard = generateVCard(data)
    expect(vcard).toContain('N:Петров;Иван;;;')
    expect(vcard).toContain('FN:Петров Иван')
  })

  it('корректно обрабатывает имя с одним словом', () => {
    const data: WorkerDTO = {
      fullname: 'Иван',
      organization: 'ООО Бюро 1440',
      position: 'Разработчик',
      phoneWork: '+7 (495) 123-45-67',
      email: 'ivan@example.com'
    }

    const vcard = generateVCard(data)
    expect(vcard).toContain('N:;Иван;;;')
    expect(vcard).toContain('FN:Иван')
  })
}) 