const findPattern = (text) => {
    let openIndex = 0;

    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) === "[") {
            openIndex = i;
        }

        if (text.charAt(i) === "]") {
            return [openIndex - 1, i];
        }
    }

    return [];
};

const unpack = (text) => {
    let [start, end] = findPattern(text);

    while (start || end) {
        const multiplier = +text[start];
        const pattern = text.substring(start + 2, end);

        text = text.substring(0, start) + pattern.repeat(multiplier) + text.substring(end + 1);

        [start, end] = findPattern(text);
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
