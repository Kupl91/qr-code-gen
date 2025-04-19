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
 *   firstname: "Иван",
 *   lastname: "Иванов",
 *   position: "Разработчик",
 *   // ...остальные поля
 * }
 * const vcard = generateVCard(workerData)
 */
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