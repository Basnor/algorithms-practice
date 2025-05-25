const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    const n = parseInt(line);

    if (isPowOfFour(n)) {
        console.log('True');
    } else {
        console.log("False");
    }

    rl.close();
});

function isPowOfFour(n) {
    if (n === 1) {
        return true;
    }

    let i = 4;
    while (i <= n) {
        if (n === i) {
            return true;
        }

        i *= 4;
    }

    return false;
}
