/**
 * Проверка чистоты и иммутабельности функций модели.
 * Запуск: node checks.js
 */
const TaskModel = require('./src/taskModel.js');

const show = (label, value) => console.log(label.padEnd(38), value);

const tasks = Object.freeze([
  Object.freeze({ id: 1, title: 'Купить продукты', done: false }),
  Object.freeze({ id: 2, title: 'Сделать лабораторную', done: true }),
]);

const withNew = TaskModel.addTask(tasks, 'Позвонить в деканат');
const toggled = TaskModel.toggleTask(tasks, 1);
const removed = TaskModel.removeTask(tasks, 2);

console.log('=== Проверка чистоты функций модели ===');
show('Исходный список не изменён:', tasks.length === 2);
show('addTask вернул новый массив:', withNew !== tasks);
show('Длина нового списка:', withNew.length);
show('toggleTask не изменил исходные данные:', tasks[0].done === false);
show('toggleTask инвертировал статус:', toggled[0].done === true);
show('removeTask вернул новый массив:', removed !== tasks);
show('Длина после удаления:', removed.length);

const first = TaskModel.filterTasks(tasks, 'active');
const second = TaskModel.filterTasks(tasks, 'active');

show('Повторный вызов дал тот же результат:',
  JSON.stringify(first) === JSON.stringify(second));
show('Каждый вызов создаёт новый массив:', first !== second);
show('Статистика по списку:', JSON.stringify(TaskModel.countTasks(tasks)));
