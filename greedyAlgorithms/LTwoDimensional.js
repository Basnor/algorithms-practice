const getMaxWeight = (items, capacity, dp) => {
    for (const item of items) {
        for (let i = 0; i <= capacity; i++) {
            const prevValue = dp[item.index - 1][i];
            const nextValue = item.weight + dp[item.index - 1][i - item.weight];

            if (i - item.weight < 0) {
                dp[item.index][i] = prevValue;
                continue;
            }

            dp[item.index][i] = Math.max(prevValue, nextValue);
        }
    }

    return Math.min(dp[items.length][capacity], capacity);
};

let capacity,
    lineCounter = 0;
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    if (!lineCounter) {
        [_, capacity] = line.split(" ").map((item) => +item);
    } else {
        const items = line.split(" ").map((weight, index) => {
            return {
                index: index + 1,
                weight: +weight,
            };
        });

        const dp = new Array(items.length + 1).fill([]);
        for (let i = 0; i <= items.length; i++) {
            dp[i] = new Array(capacity + 1).fill(0);
        }

        const maxWeight = getMaxWeight(items, capacity, dp);

        console.log(maxWeight);

        rl.close();
    }

    lineCounter++;
});
