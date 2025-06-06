# App Layer

Корневой уровень приложения, отвечающий за глобальную конфигурацию и инициализацию.

## Структура
```
app/
├── layout.tsx      # Корневой layout
├── page.tsx        # Главная страница
├── globals.css     # Глобальные стили
└── providers/      # Провайдеры приложения
    ├── Providers.tsx    
    └── StoreProvider.tsx
```

## Компоненты

### Layout (`layout.tsx`)
- Настройка метаданных и SEO
- Подключение кастомных шрифтов:
  - Geist Sans для основного текста
  - Geist Mono для монospace
- Инициализация глобальных стилей
- Оборачивание в провайдеры

### Page (`page.tsx`)
- Серверный компонент
- Монтирование QRGeneratorWidget
- Базовая разметка страницы

## Стили

### Глобальные стили (`globals.css`)
- Подключение Tailwind директив
- CSS переменные:
  - Цветовая схема
  - Размеры отступов
  - Типографика
- Кастомные утилиты
- Сброс стилей

## Провайдеры

### StoreProvider
- Инициализация Redux store
- Подключение middleware
- Типизация state и dispatch
- Интеграция с Redux DevTools

### Композиционный провайдер
- Объединение всех провайдеров
- Обработка серверного рендеринга
- Управление контекстами

## Конфигурация

### Шрифты
- Подключение через next/font
- Оптимизация загрузки
- Настройка fallback

### Метаданные
- Title и description
- OpenGraph теги
- Favicon и иконки

## Утилиты
- Хелперы для работы с layout
- Типы для страниц и layout
- Константы конфигурации