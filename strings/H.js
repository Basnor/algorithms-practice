const search = (text, pattern) => {
    let result = [];
    let combination = pattern + "#" + text;
    let prevPrefixLength = 0;
    let dp = new Array(pattern.length).fill(null);
    dp[0] = 0;

    for (let i = 1; i < combination.length; i++) {
        let prefixLength = prevPrefixLength;

        while (prefixLength > 0 && combination[prefixLength] !== combination[i]) {
            prefixLength = dp[prefixLength - 1];
        }

        if (combination[prefixLength] === combination[i]) {
            prefixLength++;
        }

        if (i < pattern.length) {
            dp[i] = prefixLength;
        }

        prevPrefixLength = prefixLength;

        if (prefixLength === pattern.length) {
            result.push(i - 2 * pattern.length);
        }
    }

    return result;
};

const printReplacedText = (text, pattern, replacement) => {
    const positions = search(text, pattern);
    let i = 0;

    for (const pos of positions) {
        process.stdout.write(text.substring(i, pos));
        process.stdout.write(replacement);
        i = pattern.length + pos;
    }

    if (i < text.length) {
        process.stdout.write(text.substring(i, text.length));
    }
};

let lineCounter = 0,
    text,
    pattern,
    replacement;
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
});

rl.on("line", (line) => {
    if (lineCounter === 0) {
        text = line;
        lineCounter++;
        return;
    }

    if (lineCounter === 1) {
        pattern = line;
        lineCounter++;
        return;
    }

    if (lineCounter === 2) {
        replacement = line;
    }

    printReplacedText(text, pattern, replacement);
    rl.close();
});
