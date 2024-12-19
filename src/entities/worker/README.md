# Worker Entity

Бизнес-сущность для работы с данными сотрудника.

## API

### Types
- `WorkerDTO` - тип данных сотрудника
- `WorkerState` - тип состояния в store

### Components
- `WorkerInfo` - компонент для отображения информации о сотруднике

### Store
- `workerReducer` - редьюсер для работы с данными
- `workerActions` - actions для обновления данных
- `selectWorkerData` - селектор данных
- `selectWorkerLoading` - селектор состояния загрузки
- `selectWorkerError` - селектор ошибок 