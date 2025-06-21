const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let [lineNumber, rowNumber, colNumber] = [0, 0, 0];
const matrix = [];

rl.on("line", (line) => {
    if (lineNumber === 0) {
        rowNumber = +line;
    }
    else if (lineNumber === 1) {
        colNumber = +line;
    }
    else if (lineNumber - 2 < rowNumber) {
        const row = line.split(' ').map((item) => +item);

        for (let i = 0; i <= row.length; i++) {
            if (matrix[i]) {
                matrix[i].push(row[i]);
            }
            else {
                matrix[i] = [row[i]];
            }
        }
    }

    lineNumber++;

    if (lineNumber - 2 === rowNumber) {
        rl.close();
    }
});

rl.on("close", () => {
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(' '));
    }
});
