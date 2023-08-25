const lines = [];
const linesNumber = 1;

const result = () => {
    const [a, x, b, c] = lines[0].split(" ").map((item) => parseInt(item));

    return a * x * x + b * x + c;
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
