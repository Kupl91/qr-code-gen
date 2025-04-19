# Store Middleware

## cacheMiddleware

Middleware для кэширования состояния Redux в localStorage.

### Функционал
- Автоматическое сохранение данных работника
- Валидация срока действия кэша
- Восстановление данных при инициализации

### Конфигурация
- `CACHE_KEY`: ключ для localStorage
- `CACHE_EXPIRATION`: время жизни кэша (24 часа)

### API

#### `cacheMiddleware`
Основной middleware для Redux store.
- Отслеживает действия `setWorkerData`
- Сохраняет состояние в localStorage
- Добавляет timestamp для валидации

#### `isCacheValid(timestamp: number): boolean`
Проверяет валидность кэша по timestamp.

#### `getCachedData(): WorkerState | null`
Получает кэшированные данные из localStorage.
- Проверяет наличие данных
- Валидирует timestamp
- Парсит JSON данные 