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
