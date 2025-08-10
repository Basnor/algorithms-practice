const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let lineNumber = 0;
let total = 0;
let costs;

const countHomes = () => {
    let index = 0;
    let sum = costs[index];

    while (sum <= total) {
        index++;
        sum += costs[index];
    }

    return index;
}

rl.on('line', (line) => {
    if (lineNumber === 0) {
        total = line.split(' ').map(Number)[1];
    }

    if (lineNumber === 1) {
        costs = line.split(' ').map(Number).sort((a, b) => a - b);
        rl.close();
    }

    lineNumber++;
}).on('close', () => console.log(countHomes()));