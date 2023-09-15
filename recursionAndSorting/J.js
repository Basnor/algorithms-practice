const bubbleSort = (arr) => {
    let everyInOrder;

    for (let i = 0; i < arr.length - 1; i++) {
        everyInOrder = true;

        for (let j = 1; j < arr.length; j++) {
            const prev = arr[j - 1];

            if (prev > arr[j]) {
                arr[j - 1] = arr[j];
                arr[j] = prev;

                everyInOrder = false;
            }
        }

        if (!everyInOrder || (everyInOrder && i === 0)) {
            console.log(arr.join(" "));
        }

        if (everyInOrder) {
            break;
        }
    }
};

const lines = [];
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    lines.push(line);

    if (lines.length === 2) {
        bubbleSort(parseLine(lines[1]));

        rl.close();
    }
});

const parseLine = (line) => line.split(" ").map((item) => parseInt(item));
