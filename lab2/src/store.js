/**
 * Хранилище состояния приложения.
 * Переход между состояниями описывает чистая функция reducer,
 * а изменяемая ссылка на текущее состояние существует
 * в единственном месте программы — внутри createStore.
 */
const Store = (() => {
  /** Начальное состояние приложения. */
  const initialState = Object.freeze({
    tasks: [],
    filter: 'all',
  });

  /**
   * Чистая функция перехода: (состояние, действие) -> новое состояние.
   * Исходное состояние не изменяется.
   */
  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return {
          ...state,
          tasks: TaskModel.addTask(state.tasks, action.title),
        };
      case 'TOGGLE':
        return {
          ...state,
          tasks: TaskModel.toggleTask(state.tasks, action.id),
        };
      case 'REMOVE':
        return {
          ...state,
          tasks: TaskModel.removeTask(state.tasks, action.id),
        };
      case 'FILTER':
        return { ...state, filter: action.filter };
      default:
        return state;
    }
  };

  /**
   * Создаёт хранилище: возвращает функции чтения состояния,
   * отправки действия и подписки на изменения.
   */
  const createStore = (reduce, preloadedState) => {
    let state = preloadedState;
    const listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
      listeners.push(listener);
      return () => listeners.splice(listeners.indexOf(listener), 1);
    };

    const dispatch = (action) => {
      state = reduce(state, action);
      listeners.forEach((listener) => listener(state));
      return state;
    };

    return Object.freeze({ getState, dispatch, subscribe });
  };

  return Object.freeze({ initialState, reducer, createStore });
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Store;
}
