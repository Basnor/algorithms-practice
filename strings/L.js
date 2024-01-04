const prefixFc = (string) => {
    const N = string.length;
    const dp = new Array(N);
    dp[0] = 0;

    for (let i = 1; i < N; i++) {
        let prefixLength = dp[i - 1];

        while (prefixLength > 0 && string.charAt(prefixLength) !== string.charAt(i)) {
            prefixLength = dp[prefixLength - 1];
        }

        if (string.charAt(prefixLength) === string.charAt(i)) {
            prefixLength++;
        }

        dp[i] = prefixLength;
    }

    return dp;
};

const readline = require("readline");
const fs = require("fs");
const path = require("path");
const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
});

rl.on("line", (line) => {
    console.log(prefixFc(line).join(" "));
    rl.close();
});
