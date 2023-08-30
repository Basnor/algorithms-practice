/*
-- ID: 89962724 --

-- ПРИНЦИП РАБОТЫ --
Я реализовала дэк с помощью класса Deque на основе массива. 
Новые элементы можно добавлять в начало и конец массива.
Существующие элементы можно удалять с начала и конца массива.
Размер массива фиксирован и представляет собой кольцевой буфер.

Если на момент добавления в дек он полон, то в консоль выкиывается 
ошибка 'error'. 
Если на момент извлечения из дека он пуст, то в консоль выкиывается 
ошибка 'error'. 

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Дек представляет собой двухстороннюю очередь, которая позволяет 
добавлять и извлекать элементы с обоих концов. В интерфейсе реализованы
два указателя:

head - указывает на элемент, добавленный в очередь раньше всех остальных
tail - eказывает на первую свободную для записи ячейку

При выполнении операций добавления и удаления эти указатели смещаются на 
соседнюю ячейку массива. Например, при добавлении элемента в конец дека,
индекс tail увеличивается на 1. При удалении элемента с конца дека, в ячейку
массива записывается null, индекс tail уменьшается на 1.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Операции вставки и удаления элемента очереди выполняются за O(1).

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Дек имеет фиксированный размер - m, поэтому он будет занимать O(m) памяти.
Массив lines из n команд и 2 постоянных строк можно оценить
сложностью O(n). 

Итого, пространственная сложность составляет O(n + m).
*/

class Deque {
    constructor(size) {
        this.deque = new Array(size).fill(null);
        this.max_n = size;
        this.head = 0; // Указывает на элемент, добавленный в очередь раньше всех остальных
        this.tail = 0; // Указывает на первую свободную для записи ячейку
        this.size = 0;
    }

    #is_empty() {
        return this.size === 0;
    }

    #is_full() {
        return this.size === this.max_n;
    }

    push_back(value) {
        if (this.#is_full()) {
            throw new Error("error");
        }

        this.deque[this.tail] = value;
        this.tail = (this.tail + 1) % this.max_n;
        this.size += 1;
    }

    push_front(value) {
        if (this.#is_full()) {
            throw new Error("error");
        }

        this.head = this.head === 0 ? this.max_n - 1 : this.head - 1;
        this.deque[this.head] = value;
        this.size += 1;
    }

    pop_front() {
        if (this.#is_empty()) {
            throw new Error("error");
        }

        const value = this.deque[this.head];
        this.deque[this.head] = null;
        this.head = (this.head + 1) % this.max_n;
        this.size -= 1;

        return value;
    }

    pop_back() {
        if (this.#is_empty()) {
            throw new Error("error");
        }

        this.tail = this.tail === 0 ? this.max_n - 1 : this.tail - 1;
        const value = this.deque[this.tail];
        this.deque[this.tail] = null;
        this.size -= 1;

        return value;
    }
}

let deque;
let lines = [];

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    lines.push(line);

    if (lineWithDequeSize()) {
        deque = new Deque(parseInt(lines[1]));
    }

    if (lineWithCommand()) {
        const [command, param] = parseLine(line);

        try {
            const result = deque[command](param);

            if (result !== undefined) {
                process.stdout.write(result + "\n");
            }
        } catch (e) {
            process.stdout.write(e.message + "\n");
        }
    }
});

lineWithDequeSize = () => lines.length === 2;
lineWithCommand = () => lines.length > 2;
parseLine = (line) => {
    return line.split(" ").map((item, index) => (index === 0 ? item : parseInt(item)));
};
