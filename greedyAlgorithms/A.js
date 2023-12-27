const getGreedyProfit = (prices) => {
    let profit = 0;
    let priceToSub = null;

    for (let i = 0; i < prices.length - 1; i++) {
        if (priceToSub !== null) {
            if (prices[i] > prices[i + 1]) {
                profit += prices[i] - priceToSub;
                priceToSub = null;
            }
        } else {
            if (prices[i] < prices[i + 1]) {
                priceToSub = prices[i];
            }
        }
    }

    if (priceToSub !== null) {
        profit += prices[prices.length - 1] - priceToSub;
    }

    return profit;
};

let lineCounter = 0;
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    if (lineCounter) {
        const profit = getGreedyProfit(line.split(" ").map((item) => +item));
        console.log(profit);

        rl.close();
    }

    lineCounter++;
});
