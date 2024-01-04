const insert = (text, itemsToInsert) => {
    let result = "";
    let prevIndex = 0;

    itemsToInsert.sort((a, b) => {
        return a.index - b.index;
    });

    for (const itemToInsert of itemsToInsert) {
        const { substring, index } = itemToInsert;

        result += text.substring(prevIndex, index) + substring;
        prevIndex = index;
    }

    return result + text.substring(prevIndex);
};

const itemsToInsert = [];
let lineCounter = 0,
    substringsNumber,
    text;
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
});

rl.on("line", (line) => {
    if (lineCounter === 0) {
        text = line;
        lineCounter++;
        return;
    }

    if (lineCounter === 1) {
        substringsNumber = +line;
        lineCounter++;
        return;
    }

    if (lineCounter - 2 < substringsNumber) {
        const [substring, index] = line.split(" ");
        itemsToInsert.push({ substring, index: +index });
        lineCounter++;
    }

    if (lineCounter - 2 === substringsNumber) {
        process.stdout.write(insert(text, itemsToInsert));
        rl.close();
    }
});
