/**
 * Чистые функции разбора данных, введённых пользователем.
 * Разбор строки не имеет побочных эффектов: одна и та же
 * строка всегда даёт одинаковый результат.
 */

/**
 * Преобразует строку в массив чисел.
 * Разделители — пробелы, запятые и точки с запятой.
 * @param {string} input - строка, введённая пользователем
 * @returns {number[]} массив чисел
 */
export const parseNumbers = (input) =>
  input
    .split(/[\s,;]+/)
    .filter((part) => part.length > 0)
    .map(Number)
    .filter((value) => Number.isFinite(value));

/**
 * Преобразует строку в массив объектов.
 * Элемент вида «имя:значение» даёт объект со свойством value,
 * элемент без двоеточия — объект без этого свойства.
 * @param {string} input - строка, введённая пользователем
 * @returns {Object[]} массив объектов
 */
export const parseObjects = (input) =>
  input
    .split(/[\s,;]+/)
    .filter((part) => part.length > 0)
    .map((part) => part.split(':'))
    .map(([name, value]) =>
      value === undefined || !Number.isFinite(Number(value))
        ? { name }
        : { name, value: Number(value) },
    );
