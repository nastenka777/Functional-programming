/**
 * Представление: чистые функции построения разметки
 * и единственная функция с побочным эффектом — render.
 */
const View = (() => {
  /** Экранирование символов, опасных для разметки. */
  const escapeHTML = (text) =>
    text.replace(
      /[&<>"']/g,
      (char) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[char],
    );

  /** Разметка одной задачи. */
  const taskHTML = (task) => `
    <li class="task ${task.done ? 'task--done' : ''}" data-id="${task.id}">
      <label class="task__label">
        <input type="checkbox" class="task__check" ${
          task.done ? 'checked' : ''
        } data-action="toggle">
        <span class="task__title">${escapeHTML(task.title)}</span>
      </label>
      <button class="task__remove" data-action="remove" title="Удалить">
        &times;
      </button>
    </li>`;

  /** Разметка всего списка либо сообщения о пустом списке. */
  const listHTML = (tasks, filter) =>
    tasks.length > 0
      ? tasks.map(taskHTML).join('')
      : `<li class="empty">${emptyText(filter)}</li>`;

  /** Текст для пустого списка в зависимости от фильтра. */
  const emptyText = (filter) =>
    ({
      all: 'Список пуст. Добавьте первую задачу.',
      active: 'Невыполненных задач нет.',
      done: 'Выполненных задач пока нет.',
    })[filter] ?? 'Список пуст.';

  /** Текст счётчика задач. */
  const counterText = (counts) =>
    `Всего: ${counts.total} · Осталось: ${counts.active} ` +
    `· Выполнено: ${counts.done}`;

  /** Побочный эффект: отображение состояния в DOM. */
  const render = (elements, state) => {
    const visible = TaskModel.filterTasks(state.tasks, state.filter);
    const counts = TaskModel.countTasks(state.tasks);

    elements.list.innerHTML = listHTML(visible, state.filter);
    elements.counter.textContent = counterText(counts);

    elements.filters.forEach((button) => {
      const isActive = button.dataset.filter === state.filter;
      button.classList.toggle('filter--active', isActive);
    });
  };

  return Object.freeze({
    escapeHTML,
    taskHTML,
    listHTML,
    emptyText,
    counterText,
    render,
  });
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = View;
}
