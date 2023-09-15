let lineNumber = 0;
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    if (lineNumber === 1) {
        const maxNumber = line
            .split(" ")
            .sort((a, b) => parseInt(b + a) - parseInt(a + b))
            .reduce((sum, item) => sum + item, "");

        console.log(maxNumber);

        rl.close();
    }

    lineNumber++;
});
