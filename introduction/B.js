const lines = [];
const linesNumber = 1;

const result = () => {
    const remainders = lines[0].split(" ").map((item) => Math.abs(parseInt(item)) % 2);

    const isEveryEven = remainders.every((item) => item === 0);
    const isEveryOdd = remainders.every((item) => item === 1);

    if (isEveryEven || isEveryOdd) {
        return "WIN";
    } else {
        return "FAIL";
    }
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
