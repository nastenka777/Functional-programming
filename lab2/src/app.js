/**
 * Связывание модели, хранилища и представления.
 * Здесь сосредоточена работа с DOM и событиями,
 * вся логика обработки данных вынесена в чистые функции.
 */
(() => {
  const elements = {
    form: document.querySelector('#task-form'),
    input: document.querySelector('#task-input'),
    list: document.querySelector('#task-list'),
    counter: document.querySelector('#counter'),
    filters: Array.from(document.querySelectorAll('[data-filter]')),
  };

  const store = Store.createStore(Store.reducer, Store.initialState);

  store.subscribe((state) => View.render(elements, state));

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!TaskModel.isValidTitle(elements.input.value)) {
      return;
    }

    store.dispatch({ type: 'ADD', title: elements.input.value });
    elements.input.value = '';
    elements.input.focus();
  });

  elements.list.addEventListener('click', (event) => {
    const action = event.target.dataset.action;
    const item = event.target.closest('.task');

    if (action === undefined || item === null) {
      return;
    }

    const id = Number(item.dataset.id);
    store.dispatch({ type: action === 'toggle' ? 'TOGGLE' : 'REMOVE', id });
  });

  elements.filters.forEach((button) => {
    button.addEventListener('click', () => {
      store.dispatch({ type: 'FILTER', filter: button.dataset.filter });
    });
  });

  View.render(elements, store.getState());
})();
