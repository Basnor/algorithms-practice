const getSubsequence = (sequences, dp) => {
    const subsequence = [];
    const [seq1, seq2] = sequences;

    let i = seq1.length,
        j = seq2.length;

    while (i > 0 && j > 0) {
        if (seq1[i - 1] === seq2[j - 1]) {
            subsequence.push([i, j]);

            i--;
            j--;

            continue;
        }

        if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return subsequence.reverse();
};

const completeLCSTable = (sequences, dp) => {
    const [seq1, seq2] = sequences;

    for (let i = 1; i <= seq1.length; i++) {
        for (let j = 1; j <= seq2.length; j++) {
            if (seq1[i - 1] === seq2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
};

const sequences = [];
let lineCounter = 1;
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
});

rl.on("line", (line) => {
    if (lineCounter % 2 === 0) {
        sequences.push(line.split(" ").map((item) => +item));
    }

    lineCounter++;

    if (lineCounter > 4) {
        const dp = new Array(sequences[0].length + 1).fill([]);
        for (let i = 0; i <= sequences[0].length; i++) {
            dp[i] = new Array(sequences[1].length + 1).fill(0);
        }

        completeLCSTable(sequences, dp);

        const subsequence = getSubsequence(sequences, dp);
        console.log(subsequence.length);
        console.log(subsequence.map(([item, _]) => item).join(" "));
        console.log(subsequence.map(([_, item]) => item).join(" "));

        rl.close();
    }
});
