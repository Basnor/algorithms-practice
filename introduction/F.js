const lines = [];
const linesNumber = 1;

const result = () => {
    const symbols = lines[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/gm, "")
        .split("");

    for (let i = 0; i < symbols.length / 2; i++) {
        if (symbols[i] !== symbols[symbols.length - i - 1]) {
            return "False";
        }
    }

    return "True";
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
