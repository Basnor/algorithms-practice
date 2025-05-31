const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

let lineNumber = 0;

let initString = '';
let resultString = '';

rl.on("line", line => {
    if (lineNumber === 0) {
        initString = line;
    }
    else if (lineNumber === 1) {
        resultString = line;

        rl.close();
    }

    lineNumber++;
});

rl.on("close", () => {
    for (const ch of initString) {
        resultString = resultString.replace(ch, '');
    }

    console.log(resultString);
});
