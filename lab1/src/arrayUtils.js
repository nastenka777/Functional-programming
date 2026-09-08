/**
 * Набор чистых функций для работы с массивами.
 * Все функции не изменяют входные данные и не имеют побочных эффектов.
 */

/**
 * Возвращает новый массив, содержащий только чётные числа.
 * @param {number[]} numbers - исходный массив чисел
 * @returns {number[]} новый массив чётных чисел
 */
export const filterEven = (numbers) => numbers.filter((n) => n % 2 === 0);

/**
 * Возвращает новый массив квадратов исходных чисел.
 * @param {number[]} numbers - исходный массив чисел
 * @returns {number[]} новый массив квадратов
 */
export const squareAll = (numbers) => numbers.map((n) => n ** 2);

/**
 * Возвращает новый массив объектов с заданным свойством.
 * @param {Object[]} items - исходный массив объектов
 * @param {string} property - имя искомого свойства
 * @returns {Object[]} новый массив отфильтрованных объектов
 */
export const filterByProperty = (items, property) =>
  items.filter((item) =>
    Object.prototype.hasOwnProperty.call(item, property),
  );

/**
 * Возвращает сумму элементов массива чисел.
 * @param {number[]} numbers - исходный массив чисел
 * @returns {number} сумма элементов
 */
export const sum = (numbers) => numbers.reduce((acc, n) => acc + n, 0);
