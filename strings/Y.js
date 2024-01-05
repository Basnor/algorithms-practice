const findPattern = (text, length) => {
    const regex = new RegExp(`(\\d)\\[(\\w){${length}}\\]`, "g");
    const occurrences = [];

    let match;
    while ((match = regex.exec(text)) !== null) {
        occurrences.push(match.index);
    }

    return occurrences;
};

const unpack = (text) => {
    let i = 1;
    while (i !== text.length) {
        const indexes = findPattern(text, i).sort((a, b) => b - a);

        for (const index of indexes) {
            const multiplier = +text[index];
            const pattern = text.substring(index + 2, index + i + 2);

            text = text.substring(0, index) + pattern.repeat(multiplier) + text.substring(index + i + 3);
        }

        if (!indexes.length) {
            i++;
        }
    }

    return text;
};

const findPrefix = (strings) => {
    let prefix = unpack(strings[0]);

    for (let i = 1; i < strings.length; i++) {
        const string = unpack(strings[i]);

        while (prefix && string.slice(0, prefix.length) !== prefix) {
            prefix = prefix.slice(0, -1);
        }
    }

    return prefix;
};

let lineCounter, lineNumber;
const packedStrings = [];
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
});

rl.on("line", (line) => {
    if (lineCounter === undefined) {
        lineNumber = +line;
        lineCounter = 0;
        return;
    }

    if (lineCounter < lineNumber) {
        packedStrings.push(line);
        lineCounter++;
    }

    if (lineCounter === lineNumber) {
        console.log(findPrefix(packedStrings));
        rl.close();
    }
});
