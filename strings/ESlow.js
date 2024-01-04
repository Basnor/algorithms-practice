const printInsert = (string, itemsToInsert) => {
    itemsToInsert.sort((a, b) => {
        return b.index - a.index;
    });

    for (const itemToInsert of itemsToInsert) {
        const { substring: stringToInsert, index: indexToInsert } = itemToInsert;
        const shift = stringToInsert.length;

        string = string.padEnd(string.length + shift);

        for (let i = string.length - shift - 1; i >= indexToInsert; i--) {
            console.log("1: ", string.substring(0, i + shift), "2: ", string.charAt(i), "3: ", string.substring(i + shift + 1));
            string = string.substring(0, i + shift) + string.charAt(i) + string.substring(i + shift + 1);
        }

        for (let i = 0; i < shift; i++) {
            console.log("1: ", string.substring(0, indexToInsert + i), "2: ", stringToInsert.charAt(i), "3: ", string.substring(indexToInsert + i + 1));
            string = string.substring(0, indexToInsert + i) + stringToInsert.charAt(i) + string.substring(indexToInsert + i + 1);
        }
    }

    return string;
};

const substrings = [];
let lineCounter = 0,
    substringsNumber,
    string;
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
});

rl.on("line", (line) => {
    if (lineCounter === 0) {
        string = line;
        lineCounter++;
        return;
    }

    if (lineCounter === 1) {
        substringsNumber = +line;
        lineCounter++;
        return;
    }

    if (lineCounter - 2 < substringsNumber) {
        const [stringToInsert, indexToInsert] = line.split(" ");
        substrings.push({ substring: stringToInsert, index: +indexToInsert });
        lineCounter++;
    }

    if (lineCounter - 2 === substringsNumber) {
        printInsert(string, substrings);
        rl.close();
    }
});
