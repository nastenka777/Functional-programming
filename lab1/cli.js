/**
 * Интерактивный режим: пользователь сам вводит исходные данные.
 * Ввод-вывод — единственный побочный эффект программы,
 * все вычисления выполняют чистые функции из каталога src.
 */

import { createInterface } from 'node:readline/promises';
import { inspect } from 'node:util';

import {
  filterEven,
  squareAll,
  filterByProperty,
  sum,
} from './src/arrayUtils.js';
import { applyToEach } from './src/higherOrder.js';
import {
  sumOfEvenSquares,
  averageAboveThreshold,
} from './src/operations.js';
import { parseNumbers, parseObjects } from './src/parse.js';

const format = (value) =>
  Array.isArray(value)
    ? `[ ${value.map((item) => inspect(item)).join(', ')} ]`
    : inspect(value);

const show = (label, value) =>
  console.log(label.padEnd(32), format(value));

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('=== Обработка массива чисел ===');
const numbers = parseNumbers(
  await rl.question('Введите числа через пробел: '),
);

if (numbers.length === 0) {
  console.log('Числа не распознаны, работа завершена.');
  rl.close();
  process.exit(0);
}

show('Введённый массив:', numbers);
show('Только чётные числа:', filterEven(numbers));
show('Квадраты чисел:', squareAll(numbers));
show('Сумма чисел:', sum(numbers));
show('Сумма квадратов чётных:', sumOfEvenSquares(numbers));
show('Утроение через applyToEach:', applyToEach((n) => n * 3, numbers));

console.log('\n=== Обработка массива объектов ===');
console.log('Формат: имя:значение (элемент без значения — объект');
console.log('без свойства value). Например: Иванов:45000 Кузнецов');

const objects = parseObjects(
  await rl.question('Введите объекты: '),
);

console.log('Введённые объекты:');
console.log(objects);
console.log("Объекты со свойством value:");
console.log(filterByProperty(objects, 'value'));

const threshold = Number(await rl.question('Введите порог: '));

if (Number.isFinite(threshold)) {
  show(
    `Среднее значений > ${threshold}:`,
    averageAboveThreshold(objects, 'value', threshold),
  );
} else {
  console.log('Порог не распознан.');
}

rl.close();
