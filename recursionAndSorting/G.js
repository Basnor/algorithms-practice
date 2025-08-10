const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let lineNumber = 0;

rl.on('line', (line) => {
    if (lineNumber === 0) {
        lineNumber++;
        return;
    }

    const pink = [];
    const yellow = [];
    const berry = [];

    if (!line) {
        console.log();
        return;
    }

    line.split(' ').map((str) => {
        const item = +str;

        if (item === 0) {
            pink.push(item);
        }

        if (item === 1) {
            yellow.push(item);
        }

        if (item === 2) {
            berry.push(item);
        }

        return item;
    });

    console.log([...pink, ...yellow, ...berry].join(' '));
});