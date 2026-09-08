/**
 * Математические операции, построенные из ранее описанных чистых функций.
 */

import { filterEven, filterByProperty, sum } from './arrayUtils.js';
import { applyToEach } from './higherOrder.js';

/**
 * Сумма квадратов всех чётных чисел массива.
 * @param {number[]} numbers - исходный массив чисел
 * @returns {number} сумма квадратов чётных чисел
 */
export const sumOfEvenSquares = (numbers) =>
  sum(applyToEach((n) => n ** 2, filterEven(numbers)));

/**
 * Среднее арифметическое значений свойства, превышающих заданный порог.
 * @param {Object[]} items - массив объектов
 * @param {string} property - имя числового свойства
 * @param {number} threshold - пороговое значение
 * @returns {number} среднее арифметическое (0, если элементов нет)
 */
export const averageAboveThreshold = (items, property, threshold) => {
  const values = applyToEach(
    (item) => item[property],
    filterByProperty(items, property),
  ).filter((value) => value > threshold);

  return values.length === 0 ? 0 : sum(values) / values.length;
};
