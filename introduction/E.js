const lines = [];
const linesNumber = 2;

const result = () => {
    const wordsMap = new Map();
    lines[1]
        .trim()
        .split(" ")
        .forEach((item) => {
            const key = item.length;
            if (wordsMap.has(key)) {
                return;
            }

            wordsMap.set(key, item);
        });

    const maxLength = Math.max(...wordsMap.keys());

    return [wordsMap.get(maxLength), maxLength];
};

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    lines.push(line);

    if (lines.length === linesNumber) {
        rl.close();
    }
}).on("close", () => {
    process.stdout.write(result().join("\n") + "\n");
});
