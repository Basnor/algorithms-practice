const findPattern = (text) => {
    const regex = new RegExp(`(?<multiplier>\\d)\\[(?<symbols>\\w+)\\]`, "g");
    const matches = text.matchAll(regex);
    const result = [];

    for (const match of matches) {
        let { multiplier, symbols } = match.groups;

        const pattern = symbols.repeat(multiplier);
        const start = match.index;
        const end = match.index + match[0].length;

        result.push([pattern, start, end]);
    }

    return result;
};

const unpack = (text) => {
    let patterns = findPattern(text);
    let pointer = 0;

    while (patterns.length) {
        let unpacked = text.substring(pointer, patterns[0][1]);
        pointer = unpacked.length;

        for (const [pattern, start, end] of patterns) {
            unpacked += text.substring(pointer, start) + pattern;
            pointer = end;
        }

        unpacked += text.substring(pointer);
        patterns = findPattern((text = unpacked));
        pointer = 0;
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
