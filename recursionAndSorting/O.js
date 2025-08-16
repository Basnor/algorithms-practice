const readline = require('readline');
const rl = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numbers = [];

rl.on('line', (line) => {
    if (lineNumber === 0) {
        lineNumber = +line;
        return;
    }

    if (numbers.length !== lineNumber) {
        numbers = line.split(' ').map(Number).sort((a, b) => a - b);
        return;
    }

    const k = +line;

    let min = 0;
    let max = numbers[numbers.length - 1] - numbers[0];
    let result = max;

    const countPairs = (max) => {
        let count = 0;
        let j = 0;

        for (let i = 0; i < numbers.length; i++) {
            while (j < numbers.length && (numbers[j] - numbers[i]) <= max) {
                j++;
            }

            count += j - i - 1;
        }

        return count;
    }

    while (min <= max) {
        const mid = Math.floor((min + max) / 2);

        const pairsNumber = countPairs(mid);
        if (pairsNumber >= k) {
            result = mid;
            max = mid - 1;
        } else {
            min = mid + 1;
        }
    }

    console.log(result);
})
