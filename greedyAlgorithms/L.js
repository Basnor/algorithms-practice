const getMaxWeight = (weights, capacity, dp) => {
    let max = 0;
    dp[0] = 1;

    for (const weight of weights) {
        for (let i = capacity; i >= weight; i--) {
            if (dp[i - weight] === 1) {
                dp[i] = 1;
                max = Math.max(max, i);
            }
        }
    }

    return max;
};

let capacity,
    lineCounter = 0;
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    if (!lineCounter) {
        [_, capacity] = line.split(" ").map((item) => +item);
    } else {
        const dp = new Array(capacity + 1).fill(0);
        const weights = line.split(" ").map((item) => +item);
        const maxWeight = getMaxWeight(weights, capacity, dp);
        console.log(maxWeight);

        rl.close();
    }

    lineCounter++;
});
