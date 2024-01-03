const compare = (strings) => {
    const modifiedArray = strings.map((string) => {
        const modified = [];

        for (let i = 0; i < string.length; i++) {
            if (string.charCodeAt(i) % 2 === 0) {
                modified.push(string[i]);
            }
        }

        return modified;
    });

    return modifiedArray[0] < modifiedArray[1] ? -1 : modifiedArray[0] > modifiedArray[1] ? 1 : 0;
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
        console.log(compare(stringsToCompare));

        rl.close();
    }
});
