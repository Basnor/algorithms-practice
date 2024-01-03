const find = (text, pattern, start = 0) => {
    if (text.length < pattern.length) {
        return -1;
    }

    for (let pos = start; pos <= text.length - pattern.length; pos++) {
        let match = true;

        for (let offset = 0; offset < pattern.length; offset++) {
            const diff = text[pos] - pattern[0];

            if (text[pos + offset] !== pattern[offset] + diff) {
                match = false;
                break;
            }
        }

        if (match) {
            return pos;
        }
    }

    return -1;
};

const findAll = (text, pattern) => {
    let occurrences = [];
    let start = 0;

    while ((pos = find(text, pattern, start)) !== -1) {
        occurrences.push(pos + 1);
        start = pos + 1;
    }

    return occurrences;
};

const lines = [];
let lineCounter = 1;
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
});

rl.on("line", (line) => {
    if (lineCounter % 2 === 0) {
        lines.push(line.split(" ").map((item) => +item));
    }

    if (lineCounter === 4) {
        console.log(findAll(...lines).join(" "));

        rl.close();
    }

    lineCounter++;
});
