const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    const result = [];

    let n = parseInt(line);
    let i = 2;
    while (i * i <= n) {
        if (n % i === 0) {
            n /= i;
            result.push(i);
        }
        else {
            i++;
        }
    }

    result.push(n);

    console.log(result.join(" "));

    rl.close();
});
