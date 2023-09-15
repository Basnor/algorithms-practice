const keyboard = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
};

const generateCombinations = (numbers, combinations, prefix = "") => {
    if (numbers.length === 0) {
        combinations.push(prefix);
    } else {
        for (const symbol of keyboard[numbers[0]]) {
            generateCombinations(numbers.slice(1), combinations, prefix + symbol);
        }
    }
};

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    const numbers = line.split("").map((item) => parseInt(item));
    const combinations = [];

    generateCombinations(numbers, combinations);

    console.log(combinations.join(" "));

    rl.close();
});
