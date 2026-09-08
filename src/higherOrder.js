/**
 * Функции высшего порядка.
 */

/**
 * Применяет переданную функцию к каждому элементу массива
 * и возвращает новый массив с результатами (аналог Array.prototype.map).
 * @param {(value: *, index: number, array: *[]) => *} fn - применяемая функция
 * @param {*[]} items - исходный массив
 * @returns {*[]} новый массив результатов
 */
export const applyToEach = (fn, items) =>
  items.reduce((acc, item, index) => [...acc, fn(item, index, items)], []);
