# QR Generator Widget

Композиционный виджет для генерации QR-кодов с контактной информацией.

## Компоненты

### QRGeneratorWidget
- Композиция:
  - QRGenerator feature
  - Layout компоненты
  - Error boundaries
- Адаптивность:
  - Mobile: стековый layout
  - Desktop: side-by-side layout
  - Fluid spacing
- Состояния:
  - Loading
  - Error
  - Empty state

## Layout

### Container
- Максимальная ширина:
  - sm: 320px
  - md: 400px
  - lg: 480px
- Отступы:
  - Горизонтальные: fluid
  - Вертикальные: fixed
- Центрирование:
  - Горизонтальное
  - Вертикальное

### Spacing
- Между компонентами:
  - gap-fluid-2 (mobile)
  - gap-fluid-4 (desktop)
- Внутренние отступы:
  - p-fluid-1 (mobile)
  - p-fluid-2 (desktop)

## Стилизация
- Тема:
  - Цветовая схема
  - Типографика
  - Shadows
- Анимации:
  - Переходы между состояниями
  - Loading скелетоны
  - Fade эффекты

## Error Handling
- Boundary компонент
- Fallback UI
- Error логирование
- Retry механизм

## Оптимизация
- Lazy loading
- Code splitting
- Memoization
- Performance monitoring
  