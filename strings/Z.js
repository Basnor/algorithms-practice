function KMP(text, pattern) {
    const result = [];

    let lps = new Array(pattern.length).fill(0);
    computeLPS(pattern, lps);

    let i = 0;
    let j = 0;
    while (i < text.length) {
        if (pattern[j] == text[i]) {
            j++;
            i++;
        }

        if (j == pattern.length) {
            result.push(i - j);
            j = lps[j - 1];
        } else if (i < text.length && pattern[j] != text[i]) {
            if (j != 0) {
                j = lps[j - 1];
            } else {
                i = i + 1;
            }
        }
    }

    return result;
}

function computeLPS(pattern, lps) {
    let length = 0;
    let i = 1;

    while (i < pattern.length) {
        if (pattern[i] == pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if (length != 0) {
                length = lps[length - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
}

const dictionary = [];
let lineCounter = 0,
    linesNumber,
    cheatText;
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
});

rl.on("line", (line) => {
    if (lineCounter === 0) {
        cheatText = line;
        lineCounter++;
        return;
    }

    if (lineCounter === 1) {
        linesNumber = +line;
        lineCounter++;
        return;
    }

    if (lineCounter - 2 < linesNumber) {
        dictionary.push(line);
        lineCounter++;
    }

    if (lineCounter - 2 === linesNumber) {
        dictionary.sort((a, b) => b.length - a.length);
        let i = 0;

        for (const word of dictionary) {
            const indexes = KMP(cheatText, word);

            i += indexes.length * word.length;
        }

        if (i >= cheatText.length) {
            console.log("YES");
        } else {
            console.log("NO");
        }

        rl.close();
    }
});
