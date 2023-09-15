const lines = [];
const linesNumber = 5;

const result = () => {
    const matrixSize = 4;
    const martixMap = new Map();

    for (let i = 0; i < matrixSize; i++) {
        lines[i + 1].split("").forEach((item) => {
            const cell = parseInt(item);

            if (!cell) {
                return;
            }

            if (martixMap.has(cell)) {
                martixMap.get(cell).count++;
            } else {
                martixMap.set(cell, { count: 1 });
            }
        });
    }

    let winCounter = 0;
    const fingers = parseInt(lines[0]) * 2;

    for (let value of martixMap.values()) {
        if (fingers >= value.count) {
            winCounter++;
        }
    }

    return winCounter;
};

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    lines.push(line);

    if (lines.length === linesNumber) {
        rl.close();
    }
}).on("close", () => {
    process.stdout.write(result() + "\n");
});
