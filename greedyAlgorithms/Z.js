const isEqualSplit = (items) => {
    const sum = items.reduce((sum, item) => sum + item, 0);
    const dp = Array(sum + 1).fill(false);
    dp[0] = true;

    if (sum % 2 !== 0) {
        return false;
    }

    for (const item of items) {
        for (let i = sum; i >= item; i--) {
            if (dp[i - item] === true) {
                dp[i] = true;
            }
        }
    }

    return dp[sum / 2];
};

let lineCounter = 0;
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    if (lineCounter) {
        if (isEqualSplit(line.split(" ").map((item) => +item))) {
            console.log("True");
        } else {
            console.log("False");
        }

        rl.close();
    }

    lineCounter++;
});
