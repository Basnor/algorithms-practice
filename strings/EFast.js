const printInsertResult = (text, itemsToInsert) => {
    itemsToInsert.sort((a, b) => {
        return a.index - b.index;
    });

    let i = 0;
    for (const itemToInsert of itemsToInsert) {
        const { substring: stringToInsert, index: indexToInsert } = itemToInsert;

        if (indexToInsert === i) {
            process.stdout.write(stringToInsert);
        } else {
            process.stdout.write(text.substring(i, indexToInsert) + stringToInsert);
            i = indexToInsert;
        }
    }

    process.stdout.write(text.substring(i, text.length));
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
        printInsertResult(string, substrings);
        rl.close();
    }
});
