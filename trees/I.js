const factorial = (n) => {
    return n === 1 ? 1 : n * factorial(n - 1);
};

const countTrees = (n) => {
    return Math.ceil(factorial(2 * n) / (factorial(n) * factorial(n + 1)));
};

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    console.log(countTrees(+line));
    rl.close();
});
