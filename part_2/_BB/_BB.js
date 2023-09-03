class OperandsStack {
    constructor() {
        this.operands = [];
    }

    push(item) {
        this.operands.push(item);
    }

    pop() {
        return this.operands.pop();
    }

    apply(operator) {
        switch (operator) {
            case "+":
                this.push(this.pop() + this.pop());
                break;

            case "-":
                const subtrahend = this.pop();
                const minuend = this.pop();

                this.push(minuend - subtrahend);
                break;

            case "*":
                this.push(this.pop() * this.pop());
                break;

            case "/":
                const divider = this.pop();
                const divident = this.pop();

                this.push(Math.floor(divident / divider));
                break;
        }
    }
}

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    const operands = new OperandsStack();
    const expression = parseLine(line);

    for (let item of expression) {
        if (typeof item === "number") {
            operands.push(item);
        } else {
            operands.apply(item);
        }
    }

    process.stdout.write(operands.pop() + "\n");

    rl.close();
}).on("close", () => {});

parseLine = (line) => {
    return line.split(" ").map((item) => (isNaN(parseInt(item)) ? item : parseInt(item)));
};
