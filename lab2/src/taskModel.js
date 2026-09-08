/**
 * Модель данных: чистые функции для работы со списком задач.
 * Ни одна функция не изменяет переданные аргументы —
 * каждая возвращает новое значение.
 */
const TaskModel = (() => {
  /** Проверка корректности названия задачи. */
  const isValidTitle = (title) =>
    typeof title === 'string' && title.trim().length > 0;

  /** Следующий свободный идентификатор. */
  const nextId = (tasks) =>
    tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;

  /** Создание новой задачи (объект защищён от изменения). */
  const createTask = (id, title) =>
    Object.freeze({ id, title: title.trim(), done: false });

  /** Новый список с добавленной задачей. */
  const addTask = (tasks, title) =>
    isValidTitle(title)
      ? [...tasks, createTask(nextId(tasks), title)]
      : tasks;

  /** Новый список, в котором у задачи id инвертирован статус. */
  const toggleTask = (tasks, id) =>
    tasks.map((task) =>
      task.id === id ? Object.freeze({ ...task, done: !task.done }) : task,
    );

  /** Новый список без задачи с указанным id. */
  const removeTask = (tasks, id) => tasks.filter((task) => task.id !== id);

  /** Предикаты фильтрации: функции как данные. */
  const predicates = Object.freeze({
    all: () => true,
    active: (task) => !task.done,
    done: (task) => task.done,
  });

  /** Новый список, отобранный по статусу задач. */
  const filterTasks = (tasks, filter) =>
    tasks.filter(predicates[filter] ?? predicates.all);

  /** Статистика по списку: всего, выполнено, осталось. */
  const countTasks = (tasks) =>
    tasks.reduce(
      (acc, task) => ({
        total: acc.total + 1,
        done: acc.done + (task.done ? 1 : 0),
        active: acc.active + (task.done ? 0 : 1),
      }),
      { total: 0, done: 0, active: 0 },
    );

  return Object.freeze({
    isValidTitle,
    nextId,
    createTask,
    addTask,
    toggleTask,
    removeTask,
    filterTasks,
    countTasks,
  });
})();

// Экспорт для запуска проверок в Node.js (в браузере не используется).
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TaskModel;
}
