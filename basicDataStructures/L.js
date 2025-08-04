const readline = require("readline");
const rl = readline.createInterface({input: process.stdin});

const fibonacchi = (n, k) => {
    if (n === 0 || n === 1) {
        return 1;
    }

    let x = 1;
    let y = 1;
    let i = 2;

    while (i <= n) {
        [x, y] = [y, (x + y) % (10 ** k)];
        i++;
    }

    return y;
}

rl.on("line", (line) => {
    const [n, k] = line.split(" ").map((item) => +item);

    console.log(fibonacchi(n, k));
    rl.close();
}).on("close", () => {});
