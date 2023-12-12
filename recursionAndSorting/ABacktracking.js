const generateBrackets = (result, current, open, close) => {
    if (open === 0 && close === 0) {
        result.push(current);
        return;
    }

    if (open > 0) {
        generateBrackets(result, current + "(", open - 1, close + 1);
    }

    if (close > 0) {
        generateBrackets(result, current + ")", open, close - 1);
    }
};

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    const n = parseInt(line);
    const result = [];

    generateBrackets(result, "", n, 0);

    console.log(result.join("\n"));

    rl.close();
});
