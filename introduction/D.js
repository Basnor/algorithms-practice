const lines = [];
const linesNumber = 2;

const result = () => {
    const n = parseInt(lines[0]);

    if (n === 1) {
        return 1;
    }

    let count = 0;
    const numbers = lines[1].split(" ").map((item) => parseInt(item));

    for (let i = 0; i < n; i++) {
        if (i - 1 < 0 && numbers[i] > numbers[i + 1]) {
            count++;
            continue;
        }

        if (i + 1 === n && numbers[i] > numbers[i - 1]) {
            count++;
            continue;
        }

        if (numbers[i] > numbers[i - 1] && numbers[i] > numbers[i + 1]) {
            count++;
        }
    }

    return count;
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
