/**
 * Лабораторная работа №1
 * Основные принципы функционального программирования в JavaScript.
 *
 * Точка входа: демонстрация работы чистых функций, функции высшего порядка
 * и построенных на их основе математических операций.
 */

import {
  filterEven,
  squareAll,
  filterByProperty,
  sum,
} from './src/arrayUtils.js';
import { applyToEach } from './src/higherOrder.js';
import { sumOfEvenSquares, averageAboveThreshold } from './src/operations.js';
import { inspect } from 'node:util';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const employees = [
  { name: 'Иванов', salary: 45000, department: 'IT' },
  { name: 'Петров', salary: 72000, department: 'IT' },
  { name: 'Сидорова', salary: 58000 },
  { name: 'Кузнецов', department: 'HR' },
  { name: 'Смирнова', salary: 91000, department: 'Finance' },
];

const title = (text) => console.log(`\n=== ${text} ===`);

const format = (value) =>
  Array.isArray(value)
    ? `[ ${value.map((item) => inspect(item)).join(', ')} ]`
    : inspect(value);

const show = (label, value) => console.log(label.padEnd(32), format(value));

title('1. Чистые функции для работы с массивами');
show('Исходный массив:', numbers);
show('filterEven:', filterEven(numbers));
show('squareAll:', squareAll(numbers));
show('sum:', sum(numbers));
console.log("filterByProperty(employees, 'salary'):");
console.log(filterByProperty(employees, 'salary'));

title('2. Функция высшего порядка applyToEach');
show('Удвоение элементов:', applyToEach((n) => n * 2, numbers));
show('Приведение к строке:', applyToEach((n) => `№${n}`, [1, 2, 3]));
show('Имена сотрудников:', applyToEach((employee) => employee.name, employees));

title('3. Математические операции');
show('Сумма квадратов чётных чисел:', sumOfEvenSquares(numbers));
show('Среднее зарплат > 50000:', averageAboveThreshold(employees, 'salary', 50000));

title('4. Проверка чистоты функций');
const original = [1, 2, 3, 4];
const firstCall = filterEven(original);
const secondCall = filterEven(original);
show('Исходный массив не изменён:', original);
show('Результаты двух вызовов равны:', JSON.stringify(firstCall) === JSON.stringify(secondCall));
show('Возвращён новый массив:', firstCall !== secondCall);
