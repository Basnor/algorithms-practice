const isSame = (strings) => {
    const [str1, str2] = strings.sort((a, b) => a.length - b.length);
    const difference = Math.abs(str1.length - str2.length);

    if (difference > 1) {
        return false;
    }

    let i = 0,
        j = 0,
        mistakes = 0;

    while (i < str1.length && j < str2.length) {
        if (str1[i] === str2[j]) {
            i++;
            j++;
            continue;
        }

        if (++mistakes > 1) {
            return false;
        }

        if (difference === 0) {
            i++;
            j++;
        } else {
            j++;
        }
    }

    return true;
};

const stringsToCompare = [];
let lineCounter = 0;
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
});

rl.on("line", (line) => {
    if (lineCounter < 2) {
        stringsToCompare.push(line);
        lineCounter++;
    }

    if (lineCounter === 2) {
        if (isSame(stringsToCompare)) {
            console.log("OK");
        } else {
            console.log("FAIL");
        }

        rl.close();
    }
});
