const readline = require("readline");
const rl = readline.createInterface({input: process.stdin});

const fibonacchi = (n) => {
    if (n === 0 || n === 1) {
        return 1;
    }

    return fibonacchi(n - 1) + fibonacchi(n - 2);
}

rl.on("line", (line) => {
    const n = +line;

    console.log(fibonacchi(n));
    rl.close();
}).on("close", () => {});
