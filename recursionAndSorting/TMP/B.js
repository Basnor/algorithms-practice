/*
## ID: 90562447

## ПРИНЦИП РАБОТЫ

Я реализовала "in-place" модификацию быстрой сортировки. В функции 
quickSortInPlace выбрается опорный элемент (pivot) и два указателя 
left и right на границы отрезка. Затем,двигаем левый указатель вправо 
до тех пор, пока он не будет указывать на элемент, меньший опорного. 
Аналогично будем двигать правый указатель влево, пока он стоит на 
элементе, превосходящем опорный. Элементы, на которых стоят указатели, 
нарушают порядок. Мы меняем их местами используя функцию swap().

В итоге получим, что левее от left все элементы точно принадлежат 
первой группе, а правее от right — второй. Будем повторять это действие 
до тех пор, пока left и right не столкнутся.

## ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ

Исходный массив представляет собой массив объектов с данными. Алгоритм 
берет из него pivot объект и сравнивает его с с объектами по left 
и right указателям. Если нашлись элементы стоящие в неверном порядке 
относительно pivot, меняем их местами. Как только указатели столкнулись, 
делим исхоный участок по индексу на котором столкнулись элементы и 
реркурсивно сортируем их. Базовым случаем считаем участок из одного 
элемента.

## ВРЕМЕННАЯ СЛОЖНОСТЬ

Для находжения элементов в некорректом порядке относительно pivot 
потрбуется n итераций, что выполнится за O(n) времени. Мы не может 
предсказать количество рекурсивных уровней, так как за опорный элемент 
принимается средний элемент отрезка. Но в среднем считаем, что глубина 
рекурсии составит O(log n).

Итого, временная сложность составляет O(n log n).

## ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ

Модификация быстрой сортировки "in-place" не может потреблять больше 
O(n) дополнительной памяти для промежуточных данных. Это объясняется 
тем, что нам нужно держать в памяти:
-   массив размера n;
-   указатели на обратные вызовы рекурсивных функций глубиной log n (можно откинуть);
-   константы (можно откинуть).
*/
const compare = (a, b) => {
    if (a.points !== b.points) {
        return b.points - a.points;
    }

    if (a.penalty !== b.penalty) {
        return a.penalty - b.penalty;
    }

    return a.name.localeCompare(b.name);
};

const swap = (array, i, j) => {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};

const quickSortInPlace = (array, leftmostIndex = 0, rightmostIndex = array.length - 1) => {
    if (rightmostIndex - leftmostIndex < 1) {
        return array;
    }

    let pivot = array[Math.floor((leftmostIndex + rightmostIndex) / 2)];
    let left = leftmostIndex;
    let right = rightmostIndex;

    while (left !== right) {
        if (compare(array[left], pivot) < 0) {
            left++;
            continue;
        }

        if (compare(array[right], pivot) > 0) {
            right--;
            continue;
        }

        swap(array, left, right);
    }

    quickSortInPlace(array, leftmostIndex, left);
    quickSortInPlace(array, left + 1, rightmostIndex);
};

const table = [];
let rowsNumber;

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    if (!rowsNumber) {
        rowsNumber = parseInt(line);
    } else {
        table.push(parseLine(line));
    }

    if (table.length === rowsNumber) {
        quickSortInPlace(table);

        console.log(table.map(({ name }) => name).join("\n"));

        rl.close();
    }
});

const parseLine = (line) => {
    const keys = ["name", "points", "penalty"];

    return line.split(" ").reduce((acc, item, index) => {
        const key = keys[index];

        switch (key) {
            case "name":
                return {
                    ...acc,
                    [key]: item,
                };

            case "points":
            case "penalty":
                return {
                    ...acc,
                    [key]: parseInt(item),
                };
        }
    }, {});
};
