const findPattern = (text) => {
    let openIndex = 0;
    let pattern = "";

    for (let i = 0; i < text.length; i++) {
        if (text[i] === "]") {
            return [pattern.repeat(+text[openIndex - 1]), openIndex - 1, i + 1];
        }

        if (openIndex > 0) {
            pattern += text[i];
        }

        if (text[i] === "[") {
            openIndex = i;
            pattern = "";
        }
    }

    return [];
};

const unpack = (text) => {
    let [pattern, start, end] = findPattern(text);

    while (pattern) {
        text = text.substring(0, start) + pattern + text.substring(end);

        [pattern, start, end] = findPattern(text);
    }

    return text;
};

const findPrefix = (strings) => {
    let prefix = unpack(strings.pop());

    for (const string of strings) {
        while (prefix && unpack(string).slice(0, prefix.length) !== prefix) {
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
