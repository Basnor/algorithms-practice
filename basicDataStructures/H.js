class BracketsStack {
    dictionary = ["()", "{}", "[]"];

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

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    const bracketsSeq = line.split("");

    if (isCorrectBracketSeq(bracketsSeq)) {
        process.stdout.write("True\n");
    } else {
        process.stdout.write("False\n");
    }

    rl.close();
}).on("close", () => {});
