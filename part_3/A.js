class BracketsStack {
    dictionary = ["()"];

    constructor() {
        this.brackets = [];
    }

    push(item) {
        this.brackets.push(item);

        const lastBrackets = this.brackets.slice(-2);

        if (this.dictionary.indexOf(lastBrackets.join("")) >= 0) {
            this.brackets.splice(-2, 2);
        }
    }

    isEmpty() {
        return this.brackets.length === 0;
    }
}

isCorrectBracketSeq = (brackets) => {
    const stack = new BracketsStack();

    for (let bracket of brackets) {
        stack.push(bracket);
    }

    return stack.isEmpty();
};

const generateBrackets = (n, prefix) => {
    if (n == 0) {
        if (isCorrectBracketSeq(prefix)) {
            console.log(prefix);
        }
    } else {
        generateBrackets(n - 1, prefix + "(");
        generateBrackets(n - 1, prefix + ")");
    }
};

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    const n = parseInt(line);

    generateBrackets(n * 2, "");

    rl.close();
});
