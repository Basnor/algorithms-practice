const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

let lineNumber = 0;
let greedFactors;
let cookies;

const getSortedArray = (line) => line.split(' ').map(Number).sort((a, b) => a - b);

const countSatisfied = () => {
    let satisfied = 0;

    let factorIndex = 0;
    let cookieIndex = 0;

    while (factorIndex < greedFactors.length && cookieIndex < cookies.length) {
        if (greedFactors[factorIndex] <= cookies[cookieIndex]) {
            factorIndex++;
            satisfied++;
        }

        cookieIndex++;
    }

    return satisfied;
}

rl.on('line', (line) => {
    if (lineNumber === 1) {
        greedFactors = getSortedArray(line);
    }

    if (lineNumber === 3) {
        cookies = getSortedArray(line);

        rl.close();
    }

    lineNumber++;
}).on('close', () => console.log(countSatisfied()));