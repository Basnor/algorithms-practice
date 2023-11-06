class Heap {
    constructor() {
        this.heap = [];
    }

    get length() {
        return this.heap.length;
    }

    add(key) {
        this.heap.push(key);

        this.#siftUp(this.heap.length);
    }

    popMax() {
        const result = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();

        this.#siftDown(0);

        return result;
    }

    #siftUp(index) {
        if (index === 1) {
            return;
        }

        const parentIndex = Math.floor(index / 2);
        if (compare(this.heap[parentIndex - 1], this.heap[index - 1]) > 0) {
            [this.heap[parentIndex - 1], this.heap[index - 1]] = [this.heap[index - 1], this.heap[parentIndex - 1]];

            this.#siftUp(parentIndex);
        }
    }

    #siftDown(index) {
        const left = 2 * index + 1;
        const right = 2 * index + 2;

        if (left >= this.heap.length) {
            return;
        }

        let indexLargest = left;
        if (right < this.heap.length && compare(this.heap[left], this.heap[right]) > 0) {
            indexLargest = right;
        }

        if (compare(this.heap[index], this.heap[indexLargest]) > 0) {
            [this.heap[index], this.heap[indexLargest]] = [this.heap[indexLargest], this.heap[index]];
            this.#siftDown(indexLargest);
        }
    }
}

const compare = (a, b) => {
    if (a.points !== b.points) {
        return b.points - a.points;
    }

    if (a.penalty !== b.penalty) {
        return a.penalty - b.penalty;
    }

    return a.name.localeCompare(b.name);
};

const heapSort = (array) => {
    let heap = new Heap();

    for (let item of array) {
        heap.add(item);
    }

    // Будем извлекать из неё наиболее приоритетные элементы, удаляя их из кучи.
    const sortedArray = [];

    while (heap.length > 0) {
        const max = heap.popMax();
        sortedArray.push(max);
    }

    return sortedArray;
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
        const sortedTable = heapSort(table);

        console.log(sortedTable.map(({ name }) => name).join("\n"));

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
