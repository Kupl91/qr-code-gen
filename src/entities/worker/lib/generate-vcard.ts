/**
 * Утилита для генерации vCard формата из данных работника
 * 
 * @module entities/worker/lib/generate-vcard
 */

import { WorkerDTO } from "../api/types"

/**
 * Генерирует строку в формате vCard 3.0 из данных работника
 * 
 * @param {WorkerDTO} data - Данные работника для генерации vCard
 * @returns {string} Строка в формате vCard 3.0
 * 
 * @example
 * const workerData = {
 *   fullname: "Иванов Иван Иванович",
 *   position: "Разработчик",
 *   // ...остальные поля
 * }
 * const vcard = generateVCard(workerData)
 */
export function generateVCard(data: WorkerDTO): string {
  const {
    fullname,
    position,
    organization,
    phoneWork,
    phoneMobile,
    email,
    website
  } = data

  // Разбираем полное имя на компоненты для поля N
  const nameParts = fullname.trim().split(' ')
  let lastName = ''
  let firstName = ''
  let middleName = ''

  if (nameParts.length >= 3) {
    // Формат: "Фамилия Имя Отчество"
    lastName = nameParts[0]
    firstName = nameParts[1]
    middleName = nameParts[2]
  } else if (nameParts.length === 2) {
    // Формат: "Фамилия Имя"
    lastName = nameParts[0]
    firstName = nameParts[1]
  } else if (nameParts.length === 1) {
    // Только одно слово - считаем именем
    firstName = nameParts[0]
  }

  const vCard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};${middleName};;`, // Структурированное имя: Фамилия;Имя;Отчество;Префикс;Суффикс
    `FN:${fullname}`, // Отображаемое полное имя
    `ORG:${organization}`,
    `TITLE:${position}`,
    `TEL;TYPE=WORK:${phoneWork}`,
    phoneMobile ? `TEL;TYPE=CELL:${phoneMobile}` : '',
    `EMAIL:${email}`,
    website ? `URL:${website}` : '',
    'END:VCARD'
  ]
    .filter(Boolean)
    .join('\n')

  return vCard
} 