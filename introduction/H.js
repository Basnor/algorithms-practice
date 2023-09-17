const binarySum = (a, b) => {
    let binarySum = "";

    let index = 0;
    let remainder = 0;

    while (index < a.length || index < b.length || remainder) {
        const argA = parseInt(a[a.length - index - 1]) || 0;
        const argB = parseInt(b[b.length - index - 1]) || 0;
        const sum = argA + argB + remainder;

        binarySum = (sum & 1) + binarySum;
        remainder = (sum >> 1) & 1;

        index++;
    }

    return binarySum || 0;
};

const numbers = [];
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    if (numbers.length < 2) {
        numbers.push(line);
    }

    if (numbers.length === 2) {
        console.log(binarySum(numbers[0], numbers[1]));

        rl.close();
    }
});
