const getGreedyRucksack = (items, size) => {
    let availableSize = size;

    return items
        .sort((a, b) => b.cost - a.cost)
        .reduce((sum, item) => {
            if (availableSize > item.size) {
                sum += item.cost * item.size;
                availableSize -= item.size;
            } else {
                sum += availableSize * item.cost;
                availableSize = 0;
            }

            return sum;
        }, 0);
};

const items = [];
let linesCounter = 0,
    linesNumber,
    size;
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
});

rl.on("line", (line) => {
    if (size === undefined) {
        size = +line;

        return;
    }

    if (linesNumber === undefined) {
        linesNumber = +line;

        return;
    }

    if (linesCounter < linesNumber) {
        const [itemCost, itemSize] = line.split(" ").map((item) => +item);
        items.push({ cost: itemCost, size: itemSize });

        linesCounter++;

        if (linesCounter === linesNumber) {
            console.log(getGreedyRucksack(items, size));

            rl.close();
        }
    }
});
