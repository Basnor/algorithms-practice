const compare = (a, b) => {
    if (a?.points !== b?.points) {
        return b?.points - a?.points;
    }

    if (a?.penalty !== b?.penalty) {
        return a?.penalty - b?.penalty;
    }

    return a?.name.localeCompare(b?.name);
};

function siftDown(heap, index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    if (left >= heap.length) {
        return;
    }

    let indexLargest = left;
    if (right < heap.length && compare(heap[left], heap[right]) > 0) {
        indexLargest = right;
    }

    if (compare(heap[index], heap[indexLargest]) > 0) {
        [heap[index], heap[indexLargest]] = [heap[indexLargest], heap[index]];
        siftDown(heap, indexLargest);
    }
}

function popMax(heap) {
    const result = heap[0];
    heap[0] = heap[heap.length - 1];
    heap.pop();
    siftDown(heap, 0);
    return result;
}

function siftUp(heap, index) {
    if (index === 1) {
        return;
    }

    const parentIndex = Math.floor(index / 2);
    if (compare(heap[parentIndex - 1], heap[index - 1]) > 0) {
        [heap[parentIndex - 1], heap[index - 1]] = [heap[index - 1], heap[parentIndex - 1]];
        siftUp(heap, parentIndex);
    }
}

function heapAdd(heap, key) {
    const index = heap.length + 1;
    heap.push(key);
    siftUp(heap, index);
}

const heapSort = (array) => {
    // Создадим пустую бинарную кучу.
    let heap = [];

    // Вставим в неё по одному все элементы массива, сохраняя свойства кучи.
    for (let item of array) {
        heapAdd(heap, item);
    }

    // Будем извлекать из неё наиболее приоритетные элементы, удаляя их из кучи.
    let sortedArray = [];
    while (heap.length > 0) {
        let max = popMax(heap);
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
