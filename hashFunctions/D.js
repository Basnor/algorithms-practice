const linesSet = (lines) => {
    const linesSet = new Set();

    for (const line of lines) {
        if (!linesSet.has(line)) {
            linesSet.add(line);
        }
    }

    return linesSet;
};

const lines = [];
let linesNumber;

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    if (!linesNumber) {
        linesNumber = parseInt(line);
    } else {
        lines.push(line);
    }

    if (lines.length === linesNumber) {
        for (const uniqueLine of linesSet(lines)) {
            console.log(uniqueLine);
        }

        rl.close();
    }
});
