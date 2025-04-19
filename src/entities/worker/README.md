# Worker Entity

Бизнес-сущность работника, содержащая данные и логику для генерации QR-кода.

## Модель данных

### WorkerDTO
```typescript
interface WorkerDTO {
  firstname: string     // Имя сотрудника
  lastname: string      // Фамилия сотрудника
  position: string      // Должность
  organization: string  // Организация
  phoneWork: string     // Рабочий телефон
  phoneMobile?: string  // Мобильный телефон (опционально)
  email: string         // Email адрес
  website: string       // Веб-сайт
}
```

### Валидация
- Схема Zod для валидации данных
- Минимальная длина строк: 2 символа
- Валидация email и URL
- Опциональный мобильный телефон
- Кастомные сообщения об ошибках

## Состояние

### WorkerState
```typescript
interface WorkerState {
  data: WorkerDTO | null   // Данные работника
  loading: boolean         // Состояние загрузки
  error: string | null     // Ошибки
}
```

## Redux

### Slice
- Начальное состояние
- Редьюсеры:
  - setWorkerData
  - setLoading
  - setError
- Типизация actions

### Селекторы
- selectWorkerData: получение данных
- selectWorkerLoading: состояние загрузки
- selectWorkerError: получение ошибок

## UI Компоненты

### WorkerInfo
- Отображение информации о работнике
- Компоненты:
  - Avatar с инициалами
  - Информационный блок
- Стилизация:
  - Адаптивная верстка
  - Типографика
  - Цветовые темы
- Доступность:
  - ARIA атрибуты
  - Семантическая разметка

## Утилиты

### Форматирование
- Форматирование телефонов
- Генерация инициалов
- Валидация данных

### Типы
- Общие типы данных
- Типы для API
- Типы состояния

## Экспорты
- Публичное API через index.ts
- Типы данных
- UI компоненты
- Redux сущности