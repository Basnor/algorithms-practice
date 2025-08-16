const readline = require('readline');
const rl = readline.createInterface({input: process.stdin});

let lineNumber = 0;

rl.on('line', (line) => {
    if (lineNumber === 0) {
        lineNumber = 1;
        return;
    }

    const numbers = line.split(' ').map(Number);

    let result = 0;
    let max = 0;

    for (let i = 0; i < numbers.length; i++) {
        max = Math.max(max, numbers[i]);

        if (max === i) {
            result++
        }
    }

    console.log(result);
});
