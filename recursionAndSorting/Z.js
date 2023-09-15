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
